import { useEffect, useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { $user, guardarSesion, cerrarSesion, leerSesion } from '../stores/user.js';
import { iniciarCampanas, $campaign } from '../stores/campaign.js';
import { suscribirPersonajes } from '../lib/db/personajes.js';
import { login, registrar } from '../lib/auth.js';
import PerfilModal from './PerfilModal.jsx';
import AvisoBuzon from './AvisoBuzon.jsx';

// Puerta de acceso: mientras no hay sesión, muestra un overlay de login/registro
// que cubre la web. Con sesión, muestra una chapita de usuario (arriba dcha) con "Salir".
export default function AuthGate() {
  const user = useStore($user);
  const [modo, setModo] = useState('login'); // 'login' | 'registro'
  const [nombre, setNombre] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [perfilAbierto, setPerfilAbierto] = useState(false);
  const [personajeActivo, setPersonajeActivo] = useState(null);
  const cardRef = useRef(null);
  const backdropRef = useRef(null);

  // Arrancar la carga de campañas (AuthGate es la isla siempre montada).
  useEffect(() => {
    iniciarCampanas();
  }, []);

  // Personaje activo del usuario en la campaña actual: la guía (§31) pide que
  // se vea con claridad en todo momento, igual que la campaña.
  useEffect(() => {
    let off = null;
    const enlazar = (c) => {
      if (off) { off(); off = null; }
      setPersonajeActivo(null);
      const u = $user.get();
      if (!c?.id || !u?.nombre) return;
      off = suscribirPersonajes(c.id, (lista) =>
        setPersonajeActivo(lista.find((p) => p.propietario === u.nombre && p.estado === 'activo') || null)
      );
    };
    enlazar($campaign.get());
    const quitar = $campaign.subscribe(enlazar);
    return () => { quitar(); if (off) off(); };
  }, []);

  // La sesión ya se recupera al cargar el store (así no parpadea el login al
  // recargar). Aquí solo queda la animación de ENTRADA del overlay para quien
  // de verdad tiene que identificarse.
  useEffect(() => {
    if (leerSesion()?.nombre) return;
    backdropRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: 'ease' });
    cardRef.current?.animate(
      [
        { transform: 'scale(.9) translateY(14px)', opacity: 0 },
        { transform: 'scale(1) translateY(0)', opacity: 1 },
      ],
      { duration: 520, easing: 'cubic-bezier(.2,.7,.3,1)' }
    );
  }, []);

  // Sacudida cuando el login falla.
  function animarError() {
    cardRef.current?.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(9px)' },
        { transform: 'translateX(-7px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(0)' },
      ],
      { duration: 420, easing: 'ease-in-out' }
    );
  }

  // Salida al entrar bien: el panel se agranda, brilla y se cierra revelando la web.
  function animarSalida() {
    const card = cardRef.current;
    backdropRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 520, easing: 'ease', fill: 'forwards' });
    if (!card) return Promise.resolve();
    const a = card.animate(
      [
        { transform: 'scale(1)', opacity: 1, filter: 'brightness(1)' },
        { transform: 'scale(1.07)', opacity: 1, filter: 'brightness(1.18)', offset: 0.32 },
        { transform: 'scale(.5) translateY(-24px)', opacity: 0, filter: 'brightness(1.3)', offset: 1 },
      ],
      { duration: 560, easing: 'cubic-bezier(.55,.06,.68,.19)', fill: 'forwards' }
    );
    // Timeout de seguridad: garantiza que la promesa resuelve aunque finished no lo haga.
    return Promise.race([
      a.finished.catch(() => {}),
      new Promise((res) => setTimeout(res, 650)),
    ]);
  }

  async function enviar(e) {
    e.preventDefault();
    if (busy) return;
    setError('');
    setBusy(true);
    const fn = modo === 'login' ? login : registrar;
    const r = await fn(nombre, pass);
    setBusy(false);
    if (r.ok) {
      await animarSalida();
      guardarSesion(r.user);
      setPass('');
    } else {
      setError(r.error || 'Algo ha ido mal.');
      animarError();
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

  // --- logueado: avatar (abre el Perfil, guía §19) + salir ---
  if (user) {
    const inicial = (user.nombre || '?').charAt(0).toUpperCase();
    return (
      <>
        <div style={chip.wrap}>
          {/* el sobre del Buzón, dentro de la chapa para que no la pise */}
          <AvisoBuzon />
          <button
            style={chip.avatarBtn}
            onClick={() => setPerfilAbierto(true)}
            title="Abrir perfil"
            aria-label="Abrir perfil"
          >
            <span style={{ ...chip.avatar, ...(user.colorAvatar ? { background: user.colorAvatar } : {}) }}>{inicial}</span>
            <span style={chip.name}>{user.nombreVisible || user.nombre}</span>
            {personajeActivo && <span style={chip.personaje} title={`Personaje activo: ${personajeActivo.nombre}`}>· {personajeActivo.nombre}</span>}
          </button>
          <button style={chip.salir} onClick={cerrarSesion} title="Cerrar sesión">
            Salir
          </button>
        </div>
        <PerfilModal abierto={perfilAbierto} onCerrar={() => setPerfilAbierto(false)} />
      </>
    );
  }

  // --- no logueado: overlay ---
  return (
    <div
      ref={backdropRef}
      style={ov.backdrop}
      data-login
      role="dialog"
      aria-modal="true"
      aria-label="Acceso a Phaingea"
    >
      <form ref={cardRef} style={{ ...ov.card, ...woodBg }} onSubmit={enviar}>
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
    display: 'flex', alignItems: 'center', gap: '0.45rem',
    background: 'rgba(14,17,22,.8)', border: '1px solid rgba(201,164,90,.45)',
    borderRadius: '999px', padding: '0.22rem 0.35rem 0.22rem 0.28rem',
    fontFamily: 'ui-monospace, monospace', fontSize: '0.72rem', color: 'var(--paper)',
    boxShadow: '0 4px 14px rgba(0,0,0,.4)',
  },
  avatarBtn: {
    display: 'flex', alignItems: 'center', gap: '0.45rem',
    background: 'none', border: 0, cursor: 'pointer', padding: 0,
    color: 'var(--paper)',
  },
  avatar: {
    width: '26px', height: '26px', borderRadius: '50%',
    display: 'grid', placeItems: 'center', flex: 'none',
    // color por defecto; el usuario lo elegirá en T64
    background: 'linear-gradient(135deg, var(--stone), #5c554b)',
    fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: 'var(--paper)',
    border: '1px solid rgba(201,164,90,.5)',
  },
  name: { color: 'var(--paper)', fontFamily: 'ui-monospace, monospace', fontSize: '0.72rem' },
  personaje: { color: 'var(--gold)', fontFamily: 'var(--font-body)', fontSize: '0.72rem', maxWidth: '11ch', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  salir: {
    background: 'rgba(201,164,90,.15)', border: '1px solid rgba(201,164,90,.4)',
    color: 'var(--gold)', borderRadius: '999px', padding: '0.2rem 0.6rem', cursor: 'pointer',
    fontFamily: 'ui-monospace, monospace', fontSize: '0.68rem',
  },
};
