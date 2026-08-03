import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaign } from '../stores/campaign.js';
import { $user } from '../stores/user.js';
import { puedeParticipar } from '../lib/permisos.js';
import {
  suscribirPersonajes,
  crearPersonaje,
  actualizarPersonaje,
} from '../lib/db/personajes.js';
import { comprimirImagen } from '../lib/db/galeria.js';
import { MARCA_SALTO } from '../lib/markdown.js';

// ============================================================================
// PERFIL · PESTAÑA DE PERSONAJE (guía §19.4-§19.5).
//
//  · Imagen completa (para Podios) + encuadre circular del avatar, que se
//    ajusta arrastrando y con el zoom, como una foto de perfil.
//  · Datos: nombre, edad, raza, sexo, descripción breve.
//  · Editor del diario en markdown, con la marca ===salto=== explicada.
//  · Estado: lo cambia el máster; el jugador solo lo ve.
//  · Privacidad: al ocultarlo, los demás jugadores ven barras negras y la
//    imagen tachada (máster y owner siguen viéndolo entero).
// ============================================================================

export default function PerfilPersonaje() {
  const campana = useStore($campaign);
  const user = useStore($user);
  const [personajes, setPersonajes] = useState([]);
  const [d, setD] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const inputImg = useRef(null);

  useEffect(() => {
    if (!campana?.id) return;
    return suscribirPersonajes(campana.id, setPersonajes);
  }, [campana?.id]);

  const mio = personajes.find((p) => p.propietario === user?.nombre && p.estado === 'activo');

  // Cargar el personaje en el formulario al cambiar de campaña o personaje.
  useEffect(() => {
    setD(
      mio
        ? { ...mio }
        : {
            nombre: '',
            edad: '',
            raza: '',
            sexo: '',
            descripcion: '',
            imagenUrl: '',
            recorte: { x: 50, y: 50, zoom: 1 },
            diarioMd: '',
            oculto: false,
          }
    );
    setMensaje('');
    setError('');
  }, [mio?.id, campana?.id]);

  if (!campana) return <p className="muted">Elige una campaña en el Observatorio.</p>;
  if (!puedeParticipar(user, campana)) {
    return (
      <div className="empty" style={{ minHeight: '10rem' }}>
        <div className="ico">❔</div>
        <p className="muted">No participas en «{campana.nombre}», así que no tienes personaje aquí.</p>
      </div>
    );
  }
  if (!d) return null;

  const campo = (k) => ({ value: d[k] ?? '', onChange: (e) => setD({ ...d, [k]: e.target.value }) });

  async function elegirImagen(archivo) {
    if (!archivo) return;
    setError('');
    try {
      const { dataUrl } = await comprimirImagen(archivo, { maxLado: 1000, maxBytes: 220 * 1024 });
      setD({ ...d, imagenUrl: dataUrl });
    } catch (e) {
      setError(e.message);
    }
  }

  async function guardar() {
    setGuardando(true);
    setError('');
    try {
      if (mio) {
        await actualizarPersonaje(campana.id, mio.id, {
          nombre: d.nombre,
          edad: d.edad,
          raza: d.raza,
          sexo: d.sexo,
          descripcion: d.descripcion,
          imagenUrl: d.imagenUrl,
          recorte: d.recorte,
          diarioMd: d.diarioMd,
          oculto: !!d.oculto,
        });
      } else {
        if (!d.nombre?.trim()) throw new Error('Ponle un nombre a tu personaje.');
        await crearPersonaje(campana.id, { ...d, propietario: user.nombre });
      }
      setMensaje('Guardado.');
      setTimeout(() => setMensaje(''), 2500);
    } catch (e) {
      setError(e.message);
    } finally {
      setGuardando(false);
    }
  }

  const rec = d.recorte || { x: 50, y: 50, zoom: 1 };

  return (
    <div className="perfil-personaje">
      <div className="pp-imagen">
        <div className="pp-completa" onClick={() => inputImg.current?.click()}>
          {d.imagenUrl ? <img src={d.imagenUrl} alt="" /> : <span className="mono muted">Pulsa para subir la ilustración</span>}
          <input ref={inputImg} type="file" accept="image/*" hidden onChange={(e) => elegirImagen(e.target.files?.[0])} />
        </div>

        {d.imagenUrl && (
          <div className="pp-recorte">
            <p className="mono muted">Encuadre del avatar</p>
            <div
              className="avatar-previa"
              style={{
                backgroundImage: `url(${d.imagenUrl})`,
                backgroundSize: `${rec.zoom * 100}%`,
                backgroundPosition: `${rec.x}% ${rec.y}%`,
              }}
            />
            <label className="mono">Horizontal
              <input type="range" min="0" max="100" value={rec.x}
                onChange={(e) => setD({ ...d, recorte: { ...rec, x: +e.target.value } })} />
            </label>
            <label className="mono">Vertical
              <input type="range" min="0" max="100" value={rec.y}
                onChange={(e) => setD({ ...d, recorte: { ...rec, y: +e.target.value } })} />
            </label>
            <label className="mono">Zoom
              <input type="range" min="1" max="3" step="0.05" value={rec.zoom}
                onChange={(e) => setD({ ...d, recorte: { ...rec, zoom: +e.target.value } })} />
            </label>
          </div>
        )}
      </div>

      <div className="pp-datos stack">
        <label className="lbl">Nombre <input className="inp" {...campo('nombre')} /></label>
        <div className="pp-fila">
          <label className="lbl">Edad <input className="inp" {...campo('edad')} /></label>
          <label className="lbl">Raza <input className="inp" {...campo('raza')} /></label>
          <label className="lbl">Sexo <input className="inp" {...campo('sexo')} /></label>
        </div>
        <label className="lbl">Descripción breve <input className="inp" {...campo('descripcion')} /></label>

        <label className="lbl">
          Diario (markdown)
          <textarea className="inp" style={{ minHeight: '150px' }} {...campo('diarioMd')} />
        </label>
        <p className="mono muted" style={{ fontSize: '.66rem' }}>
          Usa <code>#</code> para títulos, <code>**negrita**</code>, <code>- listas</code>… y escribe{' '}
          <code>{MARCA_SALTO}</code> en una línea suelta para forzar un cambio de página. Máximo 8 páginas.
        </p>

        <div className="pp-fila-estado">
          <span className="mono muted">Estado: <b>{mio?.estado || 'nuevo'}</b> (lo cambia el máster)</span>
          <label className="pp-check">
            <input type="checkbox" checked={!!d.oculto} onChange={(e) => setD({ ...d, oculto: e.target.checked })} />
            Ocultar mi personaje a los demás jugadores
          </label>
        </div>

        {error && <p style={{ color: '#f0a29c' }}>{error}</p>}
        {mensaje && <p style={{ color: '#9fd07a' }}>{mensaje}</p>}

        <button className="btn" onClick={guardar} disabled={guardando}>
          {guardando ? 'Guardando…' : mio ? 'Guardar personaje' : 'Crear personaje'}
        </button>
      </div>

      <style>{css}</style>
    </div>
  );
}

const css = `
.perfil-personaje { display: grid; grid-template-columns: minmax(0, 260px) minmax(0, 1fr); gap: 1.4rem; align-items: start; }
.pp-completa {
  height: 260px; border-radius: 8px; cursor: pointer; display: grid; place-items: center; overflow: hidden;
  border: 2px dashed rgba(201,164,90,.45); background: rgba(0,0,0,.25); text-align: center; padding: .6rem;
}
.pp-completa:hover { border-color: var(--gold); }
.pp-completa img { max-height: 100%; max-width: 100%; object-fit: contain; }
.pp-recorte { display: grid; gap: .3rem; margin-top: .8rem; }
.pp-recorte label { display: grid; gap: .15rem; font-size: .62rem; color: var(--stone); }
.avatar-previa {
  width: 92px; height: 92px; border-radius: 50%; justify-self: center; margin: .3rem 0;
  background-repeat: no-repeat; border: 2px solid rgba(201,164,90,.6); box-shadow: 0 4px 12px rgba(0,0,0,.5);
}
.pp-fila { display: grid; grid-template-columns: repeat(3, 1fr); gap: .6rem; }
.pp-fila-estado { display: grid; gap: .4rem; }
.pp-check { display: flex; align-items: center; gap: .5rem; font-family: var(--font-body); font-size: .84rem; color: var(--paper); cursor: pointer; }
.lbl { display: grid; gap: .25rem; font-family: var(--font-ui); font-size: .78rem; color: var(--parchment); }
.inp { padding: .45rem .6rem; border-radius: 7px; border: 1px solid rgba(201,164,90,.35);
  background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; width: 100%; }
@media (max-width: 720px) { .perfil-personaje { grid-template-columns: 1fr; } .pp-fila { grid-template-columns: 1fr; } }
`;
