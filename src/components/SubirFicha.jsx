import { useRef, useState } from 'react';
import Modal from './Modal.jsx';
import { comprimirImagen } from '../lib/db/galeria.js';
import { crearPersonaje, actualizarPersonaje } from '../lib/db/personajes.js';
import { registrar } from '../lib/db/notificaciones.js';

// ============================================================================
// SUBIR / EDITAR FICHA DE PERSONAJE (guía §11, §20).
//
// Formulario tal y como se pidió: la FOTO arriba del todo (con vista previa) y
// debajo nombre, clase, nivel y un texto libre.
//
//  · Un jugador solo puede tener UN personaje activo por campaña: lo impide
//    `crearPersonaje`, y el aviso lo explica.
//  · El máster (o el owner) puede subir fichas por otros indicando el jugador.
//  · La imagen se guarda comprimida como data URL, igual que en la Galería
//    (Storage necesitaría plan de pago).
//
// CÓMO EDITAR: los campos viven en `vacia()`; añadir uno es añadirlo ahí, en el
// formulario y —si hay que enseñarlo— en PodiosView.
// ============================================================================

const vacia = () => ({ nombre: '', clase: '', nivel: 1, descripcion: '', imagenUrl: '' });

export default function SubirFicha({ campanaId, user, esGestor, personaje = null, abierto, onCerrar }) {
  const editando = !!personaje;
  const [d, setD] = useState(() => (personaje ? { ...vacia(), ...personaje } : vacia()));
  const [propietario, setPropietario] = useState(personaje?.propietario || user?.nombre || '');
  const [aviso, setAviso] = useState('');
  const [guardando, setGuardando] = useState(false);
  const fotoRef = useRef(null);

  if (!abierto) return null;

  const campo = (k) => ({ value: d[k] ?? '', onChange: (e) => setD({ ...d, [k]: e.target.value }) });

  async function elegirFoto(archivo) {
    if (!archivo) return;
    try {
      const { dataUrl } = await comprimirImagen(archivo, { maxLado: 1200, maxBytes: 320 * 1024 });
      setD((x) => ({ ...x, imagenUrl: dataUrl }));
    } catch (e) {
      setAviso('No se pudo cargar la imagen: ' + e.message);
    }
  }

  async function guardar() {
    if (!d.nombre.trim()) {
      setAviso('El personaje necesita un nombre.');
      return;
    }
    setGuardando(true);
    setAviso('');
    const ficha = {
      nombre: d.nombre.trim(),
      clase: d.clase.trim(),
      nivel: Math.max(1, Number(d.nivel) || 1),
      descripcion: d.descripcion,
      imagenUrl: d.imagenUrl || '',
    };
    try {
      if (editando) {
        await actualizarPersonaje(campanaId, personaje.id, ficha);
      } else {
        await crearPersonaje(
          campanaId,
          { ...ficha, propietario: propietario || user?.nombre },
          { saltarLimite: esGestor }
        );
        await registrar(campanaId, { tipo: 'personaje_creado', actor: user?.nombre, resumen: ficha.nombre });
      }
      onCerrar();
    } catch (e) {
      setAviso(e.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <Modal abierto onCerrar={onCerrar} titulo={editando ? 'Editar ficha' : 'Subir ficha de personaje'} ancho="520px">
      <div className="ficha-form">
        {/* ---- foto, arriba del todo ---- */}
        <button className="foto" onClick={() => fotoRef.current?.click()} title="Elegir imagen">
          {d.imagenUrl ? (
            <img src={d.imagenUrl} alt="Vista previa" />
          ) : (
            <span className="mono vacia">
              <b>+</b>
              Foto del personaje
            </span>
          )}
        </button>
        <input ref={fotoRef} type="file" accept="image/*" hidden onChange={(e) => elegirFoto(e.target.files?.[0])} />
        {d.imagenUrl && (
          <button className="lnk mono" onClick={() => setD({ ...d, imagenUrl: '' })}>Quitar foto</button>
        )}

        {/* ---- datos ---- */}
        <label className="lbl">Nombre <input className="inp" {...campo('nombre')} autoFocus /></label>
        <div className="dos">
          <label className="lbl">Clase <input className="inp" placeholder="Guerrero, mago…" {...campo('clase')} /></label>
          <label className="lbl">Nivel
            <input className="inp" type="number" min="1" max="20" {...campo('nivel')} />
          </label>
        </div>
        <label className="lbl">Sobre el personaje
          <textarea className="inp" style={{ minHeight: '130px' }} placeholder="Historia, carácter, lo que quieras contar." {...campo('descripcion')} />
        </label>

        {/* el máster puede subir la ficha de otro jugador */}
        {esGestor && !editando && (
          <label className="lbl">Jugador
            <input className="inp" value={propietario} onChange={(e) => setPropietario(e.target.value)} />
          </label>
        )}

        <p className="mono muted" style={{ fontSize: '.64rem' }}>
          El nivel que pongas vale mientras el personaje no tenga experiencia registrada; en cuanto
          participe en sesiones, el nivel sale de su experiencia.
        </p>

        {aviso && <p style={{ color: '#f0a29c', margin: 0 }}>{aviso}</p>}

        <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
          <button className="btn ghost" onClick={onCerrar}>Cancelar</button>
          <button className="btn" onClick={guardar} disabled={guardando}>
            {guardando ? 'Guardando…' : editando ? 'Guardar cambios' : 'Subir ficha'}
          </button>
        </div>
      </div>
      <style>{css}</style>
    </Modal>
  );
}

const css = `
.ficha-form { display: grid; gap: .7rem; }
.ficha-form .foto {
  width: 100%; height: 210px; border-radius: 10px; cursor: pointer; overflow: hidden;
  display: grid; place-items: center; padding: 0;
  border: 1px dashed rgba(201,164,90,.5); background: rgba(0,0,0,.28);
}
.ficha-form .foto:hover { border-color: var(--gold); background: rgba(201,164,90,.1); }
.ficha-form .foto img { width: 100%; height: 100%; object-fit: contain; }
.ficha-form .vacia {
  display: grid; justify-items: center; gap: .3rem; color: var(--stone);
  font-size: .66rem; letter-spacing: .12em; text-transform: uppercase;
}
.ficha-form .vacia b { font-size: 1.8rem; color: var(--gold); line-height: 1; }
.ficha-form .dos { display: grid; grid-template-columns: 1fr 90px; gap: .6rem; }
.ficha-form .lnk {
  background: none; border: 0; cursor: pointer; color: var(--gold-soft);
  font-size: .62rem; letter-spacing: .1em; text-transform: uppercase; justify-self: end;
}
.ficha-form .lbl { display: grid; gap: .25rem; font-family: var(--font-ui); font-size: .78rem; color: var(--parchment); }
.ficha-form .inp {
  padding: .45rem .6rem; border-radius: 7px; border: 1px solid rgba(201,164,90,.35);
  background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; width: 100%;
}
`;
