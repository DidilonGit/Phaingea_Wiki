import { useState } from 'react';
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
// ============================================================================

export default function BotonMod({
  visible = false,
  titulo = 'Moderar',
  destructivo = false,
  children,
  esquina = 'derecha', // 'derecha' | 'izquierda'
}) {
  const [abierto, setAbierto] = useState(false);

  if (!visible) return null; // sin permiso: ni existe en el DOM

  return (
    <>
      <button
        className="btn-mod"
        style={esquina === 'izquierda' ? { left: '0.5rem' } : { right: '0.5rem' }}
        onClick={() => setAbierto(true)}
        title={titulo}
        aria-label={titulo}
      >
        {/* pluma/engranaje discreto */}
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <path
            d="M20.7 5.6 18.4 3.3a1 1 0 0 0-1.4 0l-1.7 1.7 3.7 3.7 1.7-1.7a1 1 0 0 0 0-1.4ZM3 17.2V21h3.8L17.9 9.9l-3.7-3.7L3 17.2Z"
            fill="currentColor"
          />
        </svg>
        <span className="btn-mod-tip">{titulo}</span>
      </button>

      <Modal abierto={abierto} onCerrar={() => setAbierto(false)} titulo={titulo} destructivo={destructivo}>
        {children}
      </Modal>

      <style>{css}</style>
    </>
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
`;
