import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal.jsx';

// ============================================================================
// BOTÓN DE MODERACIÓN CONTEXTUAL (guía §24).
//
// Todo elemento administrable (campaña, categoría, sesión, personaje, imagen,
// lugar, comentario, tip…) lleva uno. Se coloca SIEMPRE en la misma posición
// (esquina superior derecha del contenedor) y solo lo ve quien tiene permiso.
// Al pulsarlo abre un modal con las opciones SOLO de ese elemento.
//
//   <div style={{position:'relative'}}>
//     …contenido…
//     <BotonMod visible={puedeGestionar(user, campana)} titulo="Moderar sesión">
//       <label>…</label>
//       <details><summary>Opciones avanzadas</summary>…</details>
//     </BotonMod>
//   </div>
//
// El contenedor padre debe tener `position: relative`.
//
// MODERACIÓN DE LA SALA ENTERA: con `sala`, el botón NO se coloca donde esté
// escrito, sino en la ranura `.room-mod` de su vista (arriba a la derecha del
// contenido). Así está siempre en el mismo sitio en todas las categorías y no
// lo tapa nada. La ranura la pone cada vista en su `.room` (ver views.css).
//
//   <BotonMod sala visible={esGestor} titulo="Contenido de la categoría">…
// ============================================================================

export default function BotonMod({
  visible = false,
  titulo = 'Moderar',
  destructivo = false,
  children,
  esquina = 'derecha', // 'derecha' | 'izquierda'
  sala = false, // true: se coloca en la ranura de la sala
  etiqueta = 'Moderar categoría', // texto del botón de sala
}) {
  const [abierto, setAbierto] = useState(false);
  const [ranura, setRanura] = useState(null);
  const anclaRef = useRef(null);

  // Busca la ranura de la vista en la que vive este botón.
  useEffect(() => {
    if (!sala || !visible) return;
    const vista = anclaRef.current?.closest('.view');
    setRanura(vista?.querySelector('.room-mod') || null);
  }, [sala, visible]);

  if (!visible) return null; // sin permiso: ni existe en el DOM

  const boton = sala ? (
    <button className="btn-mod sala" onClick={() => setAbierto(true)} title={titulo}>
      <IconoPluma />
      <span>{etiqueta}</span>
    </button>
  ) : (
    <button
      className="btn-mod"
      style={esquina === 'izquierda' ? { left: '0.5rem' } : { right: '0.5rem' }}
      onClick={() => setAbierto(true)}
      title={titulo}
      aria-label={titulo}
    >
      <IconoPluma />
      <span className="btn-mod-tip">{titulo}</span>
    </button>
  );

  return (
    <>
      {/* ancla invisible: sirve para localizar la vista y su ranura */}
      {sala && <span ref={anclaRef} hidden />}
      {sala ? (ranura ? createPortal(boton, ranura) : null) : boton}

      <Modal abierto={abierto} onCerrar={() => setAbierto(false)} titulo={titulo} destructivo={destructivo}>
        {children}
      </Modal>

      <style>{css}</style>
    </>
  );
}

function IconoPluma() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path
        d="M20.7 5.6 18.4 3.3a1 1 0 0 0-1.4 0l-1.7 1.7 3.7 3.7 1.7-1.7a1 1 0 0 0 0-1.4ZM3 17.2V21h3.8L17.9 9.9l-3.7-3.7L3 17.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

const css = `
.btn-mod {
  position: absolute; top: .5rem; z-index: 5;
  width: 28px; height: 28px; border-radius: 7px; cursor: pointer;
  display: grid; place-items: center;
  background: rgba(14,17,22,.72); border: 1px solid rgba(201,164,90,.45);
  color: var(--gold); opacity: .55;
  transition: opacity .15s var(--ease), background .15s var(--ease);
}
.btn-mod:hover, .btn-mod:focus-visible { opacity: 1; background: rgba(201,164,90,.2); }
.btn-mod-tip {
  position: absolute; right: 0; top: calc(100% + 5px);
  background: linear-gradient(#3a2415, #241609); color: var(--paper);
  border: 1px solid rgba(201,164,90,.5); border-radius: 6px;
  font-family: ui-monospace, monospace; font-size: .6rem; letter-spacing: .1em;
  text-transform: uppercase; padding: .22rem .5rem; white-space: nowrap;
  opacity: 0; pointer-events: none; transition: opacity .15s ease;
}
.btn-mod:hover .btn-mod-tip { opacity: 1; }

/* variante de SALA: pastilla con texto, siempre visible y en la ranura fija */
.btn-mod.sala {
  position: static; width: auto; height: 30px; padding: 0 .7rem; gap: .4rem;
  grid-auto-flow: column; opacity: 1;
  font-family: ui-monospace, monospace; font-size: .62rem;
  letter-spacing: .12em; text-transform: uppercase;
}
`;
