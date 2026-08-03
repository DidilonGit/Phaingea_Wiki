import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $user } from '../stores/user.js';
import { leerPrefs, guardarPrefs, aplicarPrefs } from '../lib/prefs.js';
import PerfilPersonaje from './PerfilPersonaje.jsx';
import PerfilJugador from './PerfilJugador.jsx';

// Ventana de Perfil (guía §19.1-19.2): se abre desde el avatar de la esquina
// superior derecha. Casi a pantalla completa con marco de madera; la sala
// sigue visible alrededor (fondo oscurecido y desenfocado). X, clic fuera y
// Esc cierran; botón Guardar (persistencia real en T63-T65).
// Pestañas: Personaje (campaña activa) · Jugador · Ajustes — placeholder.
export default function PerfilModal({ abierto, onCerrar }) {
  const user = useStore($user);
  const [tab, setTab] = useState('personaje');
  // Ajustes personales (T65): se editan en borrador y se aplican al Guardar.
  const [prefs, setPrefs] = useState(PREFS_VACIAS);
  const [sucio, setSucio] = useState(false);
  const [aviso, setAviso] = useState('');

  // Cargar las preferencias guardadas cada vez que se abre.
  useEffect(() => {
    if (!abierto) return;
    setPrefs(leerPrefs());
    setSucio(false);
    setAviso('');
  }, [abierto]);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e) => {
      if (e.key === 'Escape') cerrarConAviso();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [abierto, sucio]);

  function tocar(clave, valor) {
    setPrefs((p) => ({ ...p, [clave]: valor }));
    setSucio(true);
    setAviso('');
  }

  function guardar() {
    guardarPrefs(prefs);
    setSucio(false);
    onCerrar();
  }

  // Cerrar sin guardar: avisa una vez si hay cambios pendientes (guía §31).
  function cerrarConAviso() {
    if (sucio && !aviso) {
      setAviso('Tienes cambios sin guardar. Pulsa otra vez para cerrar sin guardar.');
      return;
    }
    aplicarPrefs(); // deshacer previsualizaciones
    onCerrar();
  }

  if (!abierto || !user) return null;

  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const marcoMadera = {
    backgroundColor: '#6b4a2c',
    backgroundImage: `linear-gradient(180deg, rgba(74,50,30,.5), rgba(32,21,11,.78)), url("${base}/textures/wood.png")`,
    backgroundSize: 'cover, cover',
    backgroundBlendMode: 'normal, multiply',
  };
  const inicial = (user.nombre || '?').charAt(0).toUpperCase();

  const TABS = [
    ['personaje', 'Personaje'],
    ['jugador', 'Jugador'],
    ['ajustes', 'Ajustes'],
  ];

  return (
    <>
      {/* fondo: la sala sigue visible, oscurecida y desenfocada */}
      <div style={st.backdrop} onClick={cerrarConAviso} aria-hidden="true" />

      <div role="dialog" aria-modal="true" aria-label="Perfil" style={{ ...st.marco, ...marcoMadera }}>
        <button style={st.cerrar} onClick={cerrarConAviso} aria-label="Cerrar perfil">✕</button>

        <div style={st.interior}>
          {/* pestañas */}
          <nav style={st.tabs} aria-label="Secciones del perfil">
            {TABS.map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                style={{ ...st.tab, ...(tab === k ? st.tabActiva : {}) }}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* contenido */}
          <div style={st.contenido}>
            {tab === 'personaje' && <PerfilPersonaje />}

            {tab === 'jugador' && <PerfilJugador />}

            {tab === 'ajustes' && (
              <div className="stack" style={{ maxWidth: '480px', margin: '0 auto' }}>
                <label style={st.check}>
                  <input
                    type="checkbox"
                    style={st.checkbox}
                    checked={!!prefs.sonidos}
                    onChange={(e) => tocar('sonidos', e.target.checked)}
                  />
                  Sonidos
                </label>
                <label style={st.check}>
                  <input
                    type="checkbox"
                    style={st.checkbox}
                    checked={!!prefs.autoRecarga}
                    onChange={(e) => tocar('autoRecarga', e.target.checked)}
                  />
                  Recargar al publicar nueva versión
                </label>
                <label style={st.check}>
                  <input
                    type="checkbox"
                    style={st.checkbox}
                    checked={!!prefs.altoContraste}
                    onChange={(e) => tocar('altoContraste', e.target.checked)}
                  />
                  Modo pergamino de alto contraste
                </label>
                <p className="mono muted" style={{ fontSize: '0.7rem' }}>
                  Se guardan en este dispositivo al pulsar Guardar.
                </p>
              </div>
            )}
          </div>

          {/* pie */}
          <div style={st.pie}>
            {aviso && <span style={st.aviso}>{aviso}</span>}
            {sucio && !aviso && <span style={st.sucio}>cambios sin guardar</span>}
            <button style={st.guardar} onClick={guardar}>Guardar</button>
          </div>
        </div>
      </div>
    </>
  );
}

const PREFS_VACIAS = { sonidos: true, autoRecarga: true, altoContraste: false };

const st = {
  aviso: {
    marginRight: 'auto', color: '#f0c98c', fontSize: '0.78rem',
    fontFamily: 'var(--font-body)',
  },
  sucio: {
    marginRight: 'auto', color: 'var(--stone)', fontSize: '0.72rem',
    fontFamily: 'ui-monospace, monospace',
  },
  backdrop: {
    position: 'fixed', inset: 0, zIndex: 150,
    background: 'rgba(6, 7, 12, 0.55)',
    backdropFilter: 'blur(4px)',
  },
  marco: {
    position: 'fixed', inset: 'clamp(0.8rem, 3vh, 2.2rem) clamp(0.8rem, 4vw, 3rem)',
    zIndex: 151,
    borderRadius: '14px',
    border: '2px solid #1c120a',
    boxShadow: '0 30px 90px rgba(0,0,0,.65), inset 0 0 0 1px rgba(201,164,90,.35)',
    padding: '14px', // grosor del marco de madera
    display: 'grid',
  },
  interior: {
    background: 'linear-gradient(180deg, rgba(26, 18, 11, 0.96), rgba(16, 11, 7, 0.97))',
    borderRadius: '8px',
    border: '1px solid rgba(201, 164, 90, 0.25)',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    overflow: 'hidden',
  },
  cerrar: {
    position: 'absolute', top: '-0.6rem', right: '-0.6rem', zIndex: 2,
    width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer',
    background: 'linear-gradient(180deg, #f2dc94, #c9a45a 55%, #87692f)',
    border: '1px solid #1c120a', color: '#241a12', fontWeight: 700,
    boxShadow: '0 4px 10px rgba(0,0,0,.5)',
  },
  tabs: {
    display: 'flex', gap: '0.4rem', padding: '0.8rem 1rem 0',
    borderBottom: '1px solid rgba(201,164,90,.25)',
  },
  tab: {
    background: 'rgba(201,164,90,.07)', color: 'var(--parchment)',
    border: '1px solid rgba(201,164,90,.3)', borderBottom: 'none',
    borderRadius: '8px 8px 0 0', padding: '0.5rem 1.1rem', cursor: 'pointer',
    fontFamily: 'var(--font-ui)', fontSize: '0.9rem',
  },
  tabActiva: {
    background: 'rgba(201,164,90,.25)', color: 'var(--paper)',
    fontWeight: 700,
  },
  contenido: { padding: '1.6rem', overflowY: 'auto' },
  pie: {
    display: 'flex', justifyContent: 'flex-end', padding: '0.8rem 1rem',
    borderTop: '1px solid rgba(201,164,90,.25)',
  },
  guardar: {
    padding: '0.6rem 1.6rem', borderRadius: '8px', cursor: 'pointer',
    background: 'linear-gradient(180deg, var(--gold-soft), var(--gold))',
    border: '1px solid #8a6d34', color: 'var(--ink)', fontWeight: 700,
    fontFamily: 'var(--font-ui)', fontSize: '0.95rem',
  },
  avatarGrande: {
    width: '72px', height: '72px', flex: 'none', borderRadius: '50%',
    display: 'grid', placeItems: 'center',
    background: 'linear-gradient(135deg, var(--stone), #5c554b)',
    color: 'var(--paper)', fontFamily: 'var(--font-title)', fontSize: '2.2rem',
  },
  nombre: {
    fontFamily: 'var(--font-title)', color: 'var(--gold-soft)',
    fontSize: '1.4rem', letterSpacing: '0.03em', margin: '0.1rem 0 0.15rem',
  },
  rol: {
    fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem',
    letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)',
  },
  check: {
    display: 'flex', alignItems: 'center', gap: '0.55rem',
    fontFamily: 'var(--font-body)', color: 'var(--paper)', cursor: 'pointer',
  },
  checkbox: { accentColor: '#c9a45a', width: '1rem', height: '1rem' },
};
