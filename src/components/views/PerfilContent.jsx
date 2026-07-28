import { useStore } from '@nanostores/react';
import { $user } from '../../stores/user.js';

// Contenido del Perfil: lee el usuario logueado ($user) y muestra su nombre.
// Estados vacíos por defecto: sin campañas y sin personaje/nivel (recién creada
// la cuenta no hay nada de eso todavía).
export default function PerfilContent() {
  const user = useStore($user);
  const nombre = user?.nombre || '—';
  const rol = user?.rol || 'jugador';
  const inicial = (user?.nombre || '?').charAt(0).toUpperCase();

  return (
    <>
      <div className="diary">
        {/* IZQUIERDA: el jugador (de la sesión) */}
        <div className="panel stack">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={avatarStyle} aria-hidden="true">
              {inicial}
            </div>
            <div>
              <p className="mono muted">Jugador</p>
              <h3 style={nombreStyle}>{nombre}</h3>
              <span style={rolStyle}>{rol}</span>
            </div>
          </div>
          <div>
            <p className="mono muted">Campañas</p>
            <p className="muted">No participas en ninguna campaña todavía.</p>
          </div>
        </div>

        {/* DERECHA: personaje de la campaña actual (vacío) */}
        <div className="panel stack">
          <p className="mono muted">Personaje actual</p>
          <div className="empty" style={{ minHeight: '9rem' }}>
            <div className="ico">❔</div>
            <p className="muted">No tienes ningún personaje todavía.</p>
          </div>
        </div>
      </div>
    </>
  );
}

const avatarStyle = {
  width: '72px',
  height: '72px',
  flex: 'none',
  display: 'grid',
  placeItems: 'center',
  background: 'linear-gradient(135deg, var(--stone), #5c554b)',
  color: 'var(--paper)',
  fontFamily: 'var(--font-title)',
  fontSize: '2.2rem',
  borderRadius: '8px',
};
const nombreStyle = {
  fontFamily: 'var(--font-title)',
  color: 'var(--gold-soft)',
  fontSize: '1.4rem',
  letterSpacing: '0.03em',
  margin: '0.1rem 0 0.15rem',
};
const rolStyle = {
  fontFamily: 'ui-monospace, monospace',
  fontSize: '0.62rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
};
