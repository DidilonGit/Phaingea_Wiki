import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $user, guardarSesion } from '../stores/user.js';
import { $campaigns } from '../stores/campaign.js';
import { puedeVerCampana, puedeParticipar, etiquetaRol } from '../lib/permisos.js';
import { db } from '../lib/firebase.js';
import { ref, update, onValue } from 'firebase/database';

// ============================================================================
// PERFIL · PESTAÑA DE JUGADOR (guía §19.3).
//
//  · Nombre visible, inicial y color de fondo del avatar (la imagen de perfil
//    general es la inicial sobre el color elegido).
//  · Campañas accesibles y campañas en las que participa.
//
// Se guarda en /usuarios/{nombre}: nombreVisible y colorAvatar.
// ============================================================================

export const COLORES_AVATAR = [
  '#5a3d26', '#7a2e26', '#3f5236', '#2b3350', '#5b2f5a',
  '#8a6d34', '#2f5a56', '#6b4a2c', '#4a4a52', '#7a4a1a',
];

export default function PerfilJugador() {
  const user = useStore($user);
  const campanas = useStore($campaigns);
  const [datos, setDatos] = useState({ nombreVisible: '', colorAvatar: COLORES_AVATAR[0] });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (!user?.nombre) return;
    return onValue(ref(db, 'usuarios/' + user.nombre), (snap) => {
      const v = snap.exists() ? snap.val() : {};
      setDatos({
        nombreVisible: v.nombreVisible || user.nombre,
        colorAvatar: v.colorAvatar || COLORES_AVATAR[0],
      });
    });
  }, [user?.nombre]);

  if (!user) return null;

  const inicial = (datos.nombreVisible || user.nombre).charAt(0).toUpperCase();
  const accesibles = campanas.filter((c) => puedeVerCampana(user, c));
  const participa = campanas.filter((c) => puedeParticipar(user, c));

  async function guardar() {
    await update(ref(db, 'usuarios/' + user.nombre), {
      nombreVisible: datos.nombreVisible.trim() || user.nombre,
      colorAvatar: datos.colorAvatar,
    });
    // refrescar la sesión para que el avatar de la barra cambie al momento
    guardarSesion({ ...user, colorAvatar: datos.colorAvatar, nombreVisible: datos.nombreVisible });
    setMensaje('Guardado.');
    setTimeout(() => setMensaje(''), 2500);
  }

  return (
    <div className="perfil-jugador stack">
      <div className="pj-cabecera">
        <div className="pj-avatar" style={{ background: datos.colorAvatar }}>{inicial}</div>
        <div className="stack" style={{ gap: '.4rem', flex: 1 }}>
          <label className="lbl">Nombre visible
            <input
              className="inp"
              value={datos.nombreVisible}
              onChange={(e) => setDatos({ ...datos, nombreVisible: e.target.value })}
            />
          </label>
          <p className="mono muted" style={{ fontSize: '.66rem' }}>Cuenta: {user.nombre} · rol {user.rol}</p>
        </div>
      </div>

      <div>
        <p className="mono muted" style={{ margin: '0 0 .35rem' }}>Color del avatar</p>
        <div className="pj-colores">
          {COLORES_AVATAR.map((c) => (
            <button
              key={c}
              className={`pj-color ${datos.colorAvatar === c ? 'sel' : ''}`}
              style={{ background: c }}
              onClick={() => setDatos({ ...datos, colorAvatar: c })}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="pj-campanas">
        <div>
          <p className="mono muted">Campañas accesibles ({accesibles.length})</p>
          <ul>
            {accesibles.map((c) => (
              <li key={c.id}>
                {c.nombre} <span className="mono muted">· {etiquetaRol(user, c)}</span>
              </li>
            ))}
            {accesibles.length === 0 && <li className="muted">Ninguna todavía.</li>}
          </ul>
        </div>
        <div>
          <p className="mono muted">Participas en ({participa.length})</p>
          <ul>
            {participa.map((c) => <li key={c.id}>{c.nombre}</li>)}
            {participa.length === 0 && <li className="muted">Ninguna todavía.</li>}
          </ul>
        </div>
      </div>

      {mensaje && <p style={{ color: '#9fd07a' }}>{mensaje}</p>}
      <button className="btn" onClick={guardar} style={{ justifySelf: 'start' }}>Guardar perfil</button>

      <style>{`
        .pj-cabecera { display: flex; gap: 1rem; align-items: center; }
        .pj-avatar {
          width: 76px; height: 76px; border-radius: 50%; flex: none; display: grid; place-items: center;
          font-family: var(--font-title); font-size: 2.2rem; color: var(--paper);
          border: 2px solid rgba(201,164,90,.6); box-shadow: 0 6px 16px rgba(0,0,0,.5);
        }
        .pj-colores { display: flex; gap: .4rem; flex-wrap: wrap; }
        .pj-color { width: 28px; height: 28px; border-radius: 50%; cursor: pointer; border: 1px solid rgba(0,0,0,.5); }
        .pj-color.sel { box-shadow: 0 0 0 2px var(--gold); }
        .pj-campanas { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .pj-campanas ul { list-style: none; margin: .3rem 0 0; padding: 0; display: grid; gap: .2rem;
          font-family: var(--font-body); font-size: .86rem; color: var(--paper); }
        .lbl { display: grid; gap: .25rem; font-family: var(--font-ui); font-size: .78rem; color: var(--parchment); }
        .inp { padding: .45rem .6rem; border-radius: 7px; border: 1px solid rgba(201,164,90,.35);
          background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; }
        @media (max-width: 640px) { .pj-campanas { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
