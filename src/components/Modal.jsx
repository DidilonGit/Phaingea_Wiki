import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// ============================================================================
// MODAL común (guía §4): ventana centrada con el resto de la pantalla
// oscurecido y desenfocado, X de cierre y cierre al pulsar fuera **solo si la
// acción no es destructiva**. Esc cierra igual que la X.
//
//   <Modal abierto={b} onCerrar={fn} titulo="..." destructivo={false} ancho="520px">
//     …contenido…
//   </Modal>
//
// Y el helper de DOBLE CONFIRMACIÓN para acciones destructivas (guía §4, §22.1):
//
//   const del = useDobleConfirmacion(() => borrar());
//   <button onClick={del.pulsar}>{del.texto('Eliminar')}</button>
//   // 1er clic -> "¿Seguro? No se puede deshacer" · 2º clic -> ejecuta
//   // Se cancela solo a los 4 s si no se confirma.
// ============================================================================

export default function Modal({
  abierto,
  onCerrar,
  titulo = '',
  destructivo = false,
  ancho = '520px',
  children,
}) {
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e) => e.key === 'Escape' && onCerrar();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [abierto, onCerrar]);

  if (!abierto || typeof document === 'undefined') return null;

  // Se pinta colgando del <body>: así ninguna capa de la sala (el atril, el
  // marco del mapa, la ranura de moderación…) puede quedar por encima y
  // robarle los clics a la X.
  return createPortal(
    <>
      <div
        style={st.fondo}
        onClick={destructivo ? undefined : onCerrar}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo || 'Ventana'}
        style={{ ...st.caja, width: `min(${ancho}, 94vw)` }}
      >
        {/* Cabecera fija: la X tiene que estar SIEMPRE a mano, aunque el
            contenido sea largo y haya que hacer scroll dentro de la ventana. */}
        <div style={st.cabecera}>
          <h3 style={st.titulo}>{titulo}</h3>
          <button style={st.cerrar} onClick={onCerrar} aria-label="Cerrar">✕</button>
        </div>
        <div style={st.cuerpo}>{children}</div>
      </div>
    </>,
    document.body
  );
}

/** Doble confirmación para acciones destructivas. */
export function useDobleConfirmacion(accion, ms = 4000) {
  const [armado, setArmado] = useState(false);

  useEffect(() => {
    if (!armado) return;
    const t = setTimeout(() => setArmado(false), ms);
    return () => clearTimeout(t);
  }, [armado, ms]);

  return {
    armado,
    pulsar() {
      if (armado) {
        setArmado(false);
        accion();
      } else {
        setArmado(true);
      }
    },
    cancelar: () => setArmado(false),
    texto: (normal, confirmacion = '¿Seguro? No se puede deshacer') =>
      armado ? confirmacion : normal,
  };
}

const st = {
  fondo: {
    position: 'fixed', inset: 0, zIndex: 160,
    background: 'rgba(6, 7, 12, 0.6)',
    backdropFilter: 'blur(4px)',
  },
  caja: {
    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    zIndex: 161, maxHeight: '88vh',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
    background: 'linear-gradient(180deg, rgba(42,30,19,.98), rgba(26,18,11,.99))',
    border: '1px solid rgba(201,164,90,.45)', borderRadius: '12px',
    boxShadow: '0 30px 80px rgba(0,0,0,.65)',
    color: 'var(--paper)',
  },
  cabecera: {
    flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: '1rem', padding: '1rem 1.2rem 0.7rem',
    borderBottom: '1px solid rgba(201,164,90,.2)',
  },
  cerrar: {
    flex: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer',
    background: 'rgba(201,164,90,.15)', border: '1px solid rgba(201,164,90,.45)',
    color: 'var(--gold)', fontSize: '0.8rem',
  },
  titulo: {
    fontFamily: 'var(--font-title)', color: 'var(--gold-soft)',
    fontSize: '1.2rem', letterSpacing: '0.03em', margin: 0,
  },
  cuerpo: {
    display: 'grid', gap: '0.8rem',
    overflowY: 'auto', padding: '1rem 1.2rem 1.3rem', minHeight: 0,
  },
};
