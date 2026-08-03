// Galería (guía §13): museo de imágenes con tags, aprobación y filtros.
//
// Nodo: /galeria/{campanaId}/imagenes/{id}
//   titulo, descripcion?, tags:[string], autor, fecha
//   estado    'pendiente' | 'aprobada' | 'denegada'
//   imagen    string  · la imagen en base64 (data URL) ya comprimida
//   ratio     number  · ancho/alto, para colocar los marcos sin cortes
//         /galeria/{campanaId}/tags/{tag}: true
//
// ALMACENAMIENTO: las imágenes se guardan como data URL en la propia base,
// redimensionadas y comprimidas en el navegador (máx ~1200 px y ~180 KB).
// Firebase Storage exige plan de pago, así que esta es la vía sin coste; si
// algún día se cambia, basta con guardar una URL en el mismo campo.
import { db } from '../firebase.js';
import { ref, get, set, update, remove, onValue, push } from 'firebase/database';

export const MAX_PENDIENTES = 5; // por jugador (§13.6)
export const MAX_TAGS_NUEVOS = 3; // por subida (§13.5)
export const TAGS_SUGERIDOS = [
  'personaje', 'grupal', 'paisaje', 'compañero', 'mascota',
  'aliado', 'villano', 'objeto', 'outfit', 'lugar', 'evento',
];

function rutaImgs(campanaId, id = '') {
  return `galeria/${campanaId}/imagenes${id ? '/' + id : ''}`;
}

export function suscribirImagenes(campanaId, cb) {
  if (!campanaId) return () => {};
  return onValue(ref(db, rutaImgs(campanaId)), (snap) => {
    const val = snap.exists() ? snap.val() : {};
    cb(
      Object.entries(val)
        .map(([id, i]) => ({ id, ...i }))
        .sort((a, b) => (b.fecha || 0) - (a.fecha || 0))
    );
  });
}

export function suscribirTags(campanaId, cb) {
  if (!campanaId) return () => {};
  return onValue(ref(db, `galeria/${campanaId}/tags`), (snap) => {
    cb(snap.exists() ? Object.keys(snap.val()) : []);
  });
}

export async function registrarTags(campanaId, tags) {
  for (const t of tags) {
    await set(ref(db, `galeria/${campanaId}/tags/${normalizarTag(t)}`), true);
  }
}

export function normalizarTag(t) {
  return String(t || '')
    .trim()
    .toLowerCase()
    .replace(/[.#$/[\]]/g, '') // caracteres prohibidos como clave
    .slice(0, 30);
}

/** Cuántas propuestas pendientes tiene un jugador (tope de 5, §13.6). */
export async function pendientesDe(campanaId, autor) {
  const snap = await get(ref(db, rutaImgs(campanaId)));
  if (!snap.exists()) return [];
  return Object.entries(snap.val())
    .map(([id, i]) => ({ id, ...i }))
    .filter((i) => i.autor === autor && i.estado === 'pendiente');
}

export async function subirImagen(campanaId, { titulo, descripcion = '', tags, autor, imagen, ratio, aprobadaDirecta = false }) {
  const limpio = String(titulo || '').trim();
  if (!limpio) throw new Error('La imagen necesita un título.');
  const listaTags = (tags || []).map(normalizarTag).filter(Boolean);
  if (listaTags.length === 0) throw new Error('Elige al menos un tag.');
  if (!imagen) throw new Error('Falta la imagen.');

  if (!aprobadaDirecta) {
    const pend = await pendientesDe(campanaId, autor);
    if (pend.length >= MAX_PENDIENTES) {
      throw new Error(`Ya tienes ${MAX_PENDIENTES} imágenes pendientes de aprobación. Espera a que el máster resuelva alguna.`);
    }
  }

  await registrarTags(campanaId, listaTags);
  const nodo = push(ref(db, rutaImgs(campanaId)));
  const datos = {
    titulo: limpio,
    descripcion,
    tags: listaTags,
    autor,
    imagen,
    ratio: Number(ratio) || 1,
    estado: aprobadaDirecta ? 'aprobada' : 'pendiente',
    fecha: Date.now(),
  };
  await set(nodo, datos);
  return { id: nodo.key, ...datos };
}

export async function actualizarImagen(campanaId, id, cambios) {
  if (cambios.tags) await registrarTags(campanaId, cambios.tags);
  await update(ref(db, rutaImgs(campanaId, id)), cambios);
}

export async function aprobarImagen(campanaId, id) {
  await update(ref(db, rutaImgs(campanaId, id)), { estado: 'aprobada' });
}

export async function denegarImagen(campanaId, id) {
  await update(ref(db, rutaImgs(campanaId, id)), { estado: 'denegada' });
}

export async function eliminarImagen(campanaId, id) {
  await remove(ref(db, rutaImgs(campanaId, id)));
}

/**
 * Comprime una imagen en el navegador antes de guardarla.
 * Devuelve { dataUrl, ratio }. Reduce a `maxLado` px y baja la calidad hasta
 * que quepa en `maxBytes` (para no engordar la base de datos).
 */
export function comprimirImagen(archivo, { maxLado = 1200, maxBytes = 180 * 1024 } = {}) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    lector.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('El archivo no es una imagen válida.'));
      img.onload = () => {
        const escala = Math.min(1, maxLado / Math.max(img.width, img.height));
        const w = Math.round(img.width * escala);
        const h = Math.round(img.height * escala);
        const cv = document.createElement('canvas');
        cv.width = w;
        cv.height = h;
        cv.getContext('2d').drawImage(img, 0, 0, w, h);
        let calidad = 0.82;
        let dataUrl = cv.toDataURL('image/jpeg', calidad);
        while (dataUrl.length * 0.75 > maxBytes && calidad > 0.3) {
          calidad -= 0.12;
          dataUrl = cv.toDataURL('image/jpeg', calidad);
        }
        resolve({ dataUrl, ratio: w / h });
      };
      img.src = lector.result;
    };
    lector.readAsDataURL(archivo);
  });
}

/** Filtro AND: la imagen debe llevar TODOS los tags activos (§13.2). */
export function filtrarPorTags(imagenes, tagsActivos) {
  if (!tagsActivos || tagsActivos.length === 0) return imagenes;
  return imagenes.filter((i) => tagsActivos.every((t) => (i.tags || []).includes(t)));
}
