import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $user, guardarSesion, cerrarSesion, leerSesion } from '../stores/user.js';
import { login, registrar } from '../lib/auth.js';

// Puerta de acceso: mientras no hay sesión, muestra un overlay de login/registro
// que cubre la web. Con sesión, muestra una chapita de usuario (arriba dcha) con "Salir".
export default function AuthGate() {
  const user = useStore($user);
  const [modo, setModo] = useState('login'); // 'login' | 'registro'
  const [nombre, setNombre] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // Auto-login desde la sesión guardada.
  useEffect(() => {
    const s = leerSesion();
    if (s && s.nombre) $user.set(s);
  }, []);

  async function enviar(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const fn = modo === 'login' ? login : registrar;
    const r = await fn(nombre, pass);
    setBusy(false);
    if (r.ok) {
      guardarSesion(r.user);
      setPass('');
    } else {
      setError(r.error || 'Algo ha ido mal.');
    }
  }

  // Textura de madera (misma que el banner) para el card.
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const woodBg = {
    backgroundColor: '#6b4a2c',
    backgroundImage: `linear-gradient(180deg, rgba(74,50,30,.5), rgba(32,21,11,.78)), url("${base}/textures/wood.png")`,
    backgroundSize: 'cover, cover',
    backgroundPosition: 'center, center',
    backgroundBlendMode: 'normal, multiply',
  };

  // --- logueado: chapita de usuario ---
  if (user) {
    return (
      <div style={chip.wrap}>
        <span style={chip.dot} />
        <span style={chip.name}>{user.nombre}</span>
        <span style={chip.rol}>{user.rol}</span>
        <button style={chip.salir} onClick={cerrarSesion} title="Cerrar sesión">
          Salir
        </button>
      </div>
    );
  }

  // --- no logueado: overlay ---
  return (
    <div style={ov.backdrop} role="dialog" aria-modal="true" aria-label="Acceso a Phaingea">
      <form style={{ ...ov.card, ...woodBg }} onSubmit={enviar}>
        <div style={ov.brand}>PHAINGEA</div>
        <p style={ov.kicker}>{modo === 'login' ? 'Entrar en el archivo' : 'Crear una cuenta'}</p>

        <label style={ov.label}>
          Usuario
          <input
            style={ov.input}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="username"
            autoFocus
          />
        </label>
        <label style={ov.label}>
          Contraseña
          <input
            style={ov.input}
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            autoComplete={modo === 'login' ? 'current-password' : 'new-password'}
          />
        </label>

        {error && <p style={ov.error}>{error}</p>}

        <button style={ov.btn} type="submit" disabled={busy}>
          {busy ? '…' : modo === 'login' ? 'Entrar' : 'Registrarme'}
        </button>

        <button
          style={ov.switch}
          type="button"
          onClick={() => {
            setError('');
            setModo(modo === 'login' ? 'registro' : 'login');
          }}
        >
          {modo === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Entra'}
        </button>
      </form>
    </div>
  );
}

// --- estilos (inline; usan las variables del sistema) ---
const ov = {
  backdrop: {
    position: 'fixed', inset: 0, zIndex: 200,
    display: 'grid', placeItems: 'center', padding: '1.5rem',
    background: 'radial-gradient(120% 100% at 50% 30%, rgba(20,20,40,.75), rgba(6,7,10,.92))',
    backdropFilter: 'blur(4px)',
  },
  card: {
    width: 'min(380px, 100%)',
    display: 'grid', gap: '0.9rem',
    color: 'var(--paper)',
    border: '2px solid #1c120a', borderRadius: '12px',
    padding: '1.8rem 1.6rem 1.6rem',
    boxShadow: '0 30px 80px rgba(0,0,0,.6), inset 0 0 0 1px rgba(201,164,90,.35)',
  },
  brand: {
    fontFamily: 'var(--font-title)', fontWeight: 700, letterSpacing: '0.25em',
    textAlign: 'center', color: 'var(--gold)', fontSize: '1.5rem',
    textShadow: '0 1px 2px #000',
  },
  kicker: {
    textAlign: 'center', fontFamily: 'ui-monospace, monospace', fontSize: '0.7rem',
    letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--parchment)',
    opacity: 0.85, marginTop: '-0.4rem',
  },
  label: { display: 'grid', gap: '0.3rem', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'var(--parchment)' },
  input: {
    padding: '0.6rem 0.7rem', borderRadius: '8px', border: '1px solid rgba(201,164,90,.45)',
    background: 'rgba(239,230,210,.92)', color: 'var(--ink)', fontSize: '1rem',
  },
  error: { color: '#f0a29c', fontSize: '0.82rem', margin: 0, fontFamily: 'var(--font-body)' },
  btn: {
    marginTop: '0.3rem', padding: '0.7rem', borderRadius: '8px', border: '1px solid #8a6d34', cursor: 'pointer',
    background: 'linear-gradient(180deg, var(--gold-soft), var(--gold))', color: 'var(--ink)',
    fontFamily: 'var(--font-ui)', fontWeight: 700, letterSpacing: '0.05em', fontSize: '1rem',
    textShadow: '0 1px 0 rgba(255,255,255,.25)',
  },
  switch: {
    background: 'none', border: 0, cursor: 'pointer', color: 'var(--gold-soft)',
    fontFamily: 'var(--font-body)', fontSize: '0.82rem', textDecoration: 'underline',
  },
};

const chip = {
  wrap: {
    position: 'fixed', top: '0.5rem', right: '0.7rem', zIndex: 120,
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    background: 'rgba(14,17,22,.8)', border: '1px solid rgba(201,164,90,.45)',
    borderRadius: '999px', padding: '0.25rem 0.35rem 0.25rem 0.7rem',
    fontFamily: 'ui-monospace, monospace', fontSize: '0.72rem', color: 'var(--paper)',
    boxShadow: '0 4px 14px rgba(0,0,0,.4)',
  },
  dot: { width: '8px', height: '8px', borderRadius: '50%', background: '#7fae6f' },
  name: { color: 'var(--paper)' },
  rol: {
    color: 'var(--gold)', textTransform: 'uppercase', fontSize: '0.6rem', letterSpacing: '0.1em',
  },
  salir: {
    background: 'rgba(201,164,90,.15)', border: '1px solid rgba(201,164,90,.4)',
    color: 'var(--gold)', borderRadius: '999px', padding: '0.2rem 0.6rem', cursor: 'pointer',
    fontFamily: 'ui-monospace, monospace', fontSize: '0.68rem',
  },
};
