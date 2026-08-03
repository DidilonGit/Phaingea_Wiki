import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaign } from '../stores/campaign.js';
import { $user } from '../stores/user.js';
import { puedeGestionar } from '../lib/permisos.js';
import { db } from '../lib/firebase.js';
import { ref, onValue, set, update, remove, push } from 'firebase/database';
import Modal, { useDobleConfirmacion } from './Modal.jsx';

// ============================================================================
// PANEL DE TIPS (guía §16.3) y MASCOTA DEL TALLER (§16.4).
//
//  · Panel desplegable con tarjetas de consejos, recordatorios, noticias o
//    avisos de campaña. El máster decide el orden; el panel se expande y
//    contrae y tiene scroll interno para no comerse la pantalla.
//  · La mascota vive en la jaula junto al libro: se mueve de vez en cuando,
//    brilla suavemente para indicar que es interactiva y al pulsarla suelta un
//    tip al azar en un bocadillo que no tapa el libro.
//
// Datos: /taller/{campanaId}/tips/{id} = { texto, orden }
//        /taller/{campanaId}/mascotaUrl (si falta, se usa el logo de campaña)
// ============================================================================

export default function TallerTips({ soloMascota = false }) {
  const campana = useStore($campaign);
  const user = useStore($user);
  const [tips, setTips] = useState([]);
  const [mascotaUrl, setMascotaUrl] = useState('');
  const [abierto, setAbierto] = useState(false);
  const [editor, setEditor] = useState(null);
  const [bocadillo, setBocadillo] = useState(null);
  const [saltando, setSaltando] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  useEffect(() => {
    if (!campana?.id) return;
    const off1 = onValue(ref(db, `taller/${campana.id}/tips`), (snap) => {
      const val = snap.exists() ? snap.val() : {};
      setTips(
        Object.entries(val)
          .map(([id, t]) => ({ id, ...t }))
          .sort((a, b) => (a.orden || 0) - (b.orden || 0))
      );
    });
    const off2 = onValue(ref(db, `taller/${campana.id}/mascotaUrl`), (snap) =>
      setMascotaUrl(snap.exists() ? snap.val() : '')
    );
    return () => {
      off1();
      off2();
    };
  }, [campana?.id]);

  // La mascota se mueve sola de vez en cuando (§16.4).
  useEffect(() => {
    if (!montado) return;
    const id = setInterval(() => {
      setSaltando(true);
      setTimeout(() => setSaltando(false), 1400);
    }, 9000 + Math.random() * 6000);
    return () => clearInterval(id);
  }, [montado]);

  if (!montado) return null;

  const esGestor = puedeGestionar(user, campana);

  function decirTip() {
    if (tips.length === 0) {
      setBocadillo('Esta campaña aún no tiene tips.');
    } else {
      setBocadillo(tips[Math.floor(Math.random() * tips.length)].texto);
    }
    setTimeout(() => setBocadillo(null), 6000);
  }

  async function guardarTip(texto, id) {
    if (id) await update(ref(db, `taller/${campana.id}/tips/${id}`), { texto });
    else {
      const nodo = push(ref(db, `taller/${campana.id}/tips`));
      await set(nodo, { texto, orden: tips.length });
    }
    setEditor(null);
  }

  async function mover(t, dir) {
    const i = tips.findIndex((x) => x.id === t.id);
    const j = i + dir;
    if (j < 0 || j >= tips.length) return;
    await update(ref(db, `taller/${campana.id}/tips/${t.id}`), { orden: tips[j].orden ?? j });
    await update(ref(db, `taller/${campana.id}/tips/${tips[j].id}`), { orden: t.orden ?? i });
  }

  // --- solo la jaula con la mascota ---
  if (soloMascota) {
    return (
      <div className="mascota-zona">
        <button
          className={`mascota ${saltando ? 'salta' : ''}`}
          onClick={decirTip}
          title="Tips de esta campaña"
          aria-label="Tips de esta campaña"
        >
          {mascotaUrl || campana?.logoUrl ? (
            <img src={mascotaUrl || campana.logoUrl} alt="" />
          ) : (
            <span className="mascota-inicial">{(campana?.nombre || '?').charAt(0)}</span>
          )}
        </button>
        {bocadillo && <div className="bocadillo">{bocadillo}</div>}
        <style>{cssMascota}</style>
      </div>
    );
  }

  // --- panel de tips ---
  return (
    <div className="tips-panel">
      <button className="tips-cabecera" onClick={() => setAbierto((v) => !v)} aria-expanded={abierto}>
        <span className="mono">Tips de la campaña ({tips.length})</span>
        <span className={`flecha ${abierto ? 'abierta' : ''}`}>▾</span>
      </button>

      {abierto && (
        <div className="tips-lista">
          {tips.length === 0 && <p className="muted mono">Aún no hay tips.</p>}
          {tips.map((t) => (
            <div key={t.id} className="tarjeta-tip">
              <p>{t.texto}</p>
              {esGestor && (
                <div className="tip-acciones mono">
                  <button onClick={() => mover(t, -1)} title="Subir">↑</button>
                  <button onClick={() => mover(t, 1)} title="Bajar">↓</button>
                  <button onClick={() => setEditor({ id: t.id, texto: t.texto })}>editar</button>
                  <BorrarTip campanaId={campana.id} id={t.id} />
                </div>
              )}
            </div>
          ))}
          {esGestor && (
            <button className="btn ghost" onClick={() => setEditor({ texto: '' })}>+ Nuevo tip</button>
          )}
        </div>
      )}

      {editor && (
        <Modal abierto onCerrar={() => setEditor(null)} titulo={editor.id ? 'Editar tip' : 'Nuevo tip'}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              guardarTip(e.target.elements.texto.value.trim(), editor.id);
            }}
            className="stack"
          >
            <textarea name="texto" defaultValue={editor.texto} className="inp-tip" placeholder="Consejo, recordatorio, noticia…" />
            <div style={{ display: 'flex', gap: '.6rem' }}>
              <button className="btn" type="submit">Guardar</button>
              <button className="btn ghost" type="button" onClick={() => setEditor(null)}>Cancelar</button>
            </div>
          </form>
        </Modal>
      )}

      <style>{cssPanel}</style>
    </div>
  );
}

function BorrarTip({ campanaId, id }) {
  const del = useDobleConfirmacion(() => remove(ref(db, `taller/${campanaId}/tips/${id}`)));
  return (
    <button onClick={del.pulsar} style={{ color: '#e99' }}>
      {del.texto('borrar', '¿seguro?')}
    </button>
  );
}

const cssPanel = `
.tips-panel { margin-top: 1.2rem; }
.tips-cabecera {
  width: 100%; display: flex; justify-content: space-between; align-items: center; cursor: pointer;
  background: rgba(201,164,90,.08); border: 1px solid rgba(201,164,90,.35); border-radius: 8px;
  color: var(--parchment); padding: .5rem .8rem; font-size: .72rem; letter-spacing: .08em; text-transform: uppercase;
}
.tips-cabecera:hover { border-color: var(--gold); color: var(--gold); }
.flecha { transition: transform .2s var(--ease); }
.flecha.abierta { transform: rotate(180deg); }
.tips-lista { margin-top: .6rem; display: grid; gap: .6rem; max-height: 320px; overflow-y: auto; padding-right: .3rem; }
.tarjeta-tip {
  background: linear-gradient(160deg, #efe3c6, #d8c8a2); color: #3a2a16;
  border-radius: 4px; padding: .7rem .85rem; box-shadow: 0 6px 16px rgba(0,0,0,.4);
  transform: rotate(-.4deg);
}
.tarjeta-tip p { margin: 0; font-family: var(--font-body); font-size: .88rem; line-height: 1.45; }
.tip-acciones { display: flex; gap: .6rem; margin-top: .4rem; }
.tip-acciones button { background: none; border: 0; cursor: pointer; padding: 0; color: #7a6444; font-size: .66rem; font-family: ui-monospace, monospace; }
.tip-acciones button:hover { color: #4a2f14; text-decoration: underline; }
.inp-tip {
  min-height: 90px; padding: .6rem; border-radius: 8px; border: 1px solid rgba(201,164,90,.35);
  background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; width: 100%;
}
`;

const cssMascota = `
.mascota-zona { position: relative; display: grid; justify-items: center; }
.mascota {
  width: 54px; height: 54px; border-radius: 50%; cursor: pointer; padding: 0; overflow: hidden;
  border: 1px solid rgba(201,164,90,.5);
  background: radial-gradient(circle at 35% 30%, rgba(255,255,255,.25), rgba(90,61,38,.5));
  box-shadow: 0 0 14px rgba(201,164,90,.45);
  animation: brillo 2.8s ease-in-out infinite;
  transition: transform .3s var(--ease);
}
@keyframes brillo {
  0%, 100% { box-shadow: 0 0 10px rgba(201,164,90,.35); }
  50% { box-shadow: 0 0 20px rgba(201,164,90,.7); }
}
.mascota.salta { animation: brillo 2.8s ease-in-out infinite, paseo 1.4s ease-in-out; }
@keyframes paseo {
  0% { transform: translateX(0); }
  25% { transform: translateX(-12px) translateY(-6px); }
  50% { transform: translateX(10px) translateY(-3px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
}
.mascota img { width: 100%; height: 100%; object-fit: cover; }
.mascota-inicial { font-family: var(--font-title); font-size: 1.5rem; color: var(--paper); }
.bocadillo {
  position: absolute; top: calc(100% + 12px); right: 0; width: max(180px, 14vw); z-index: 20;
  background: linear-gradient(160deg, #efe3c6, #d8c8a2); color: #3a2a16;
  border-radius: 10px; padding: .7rem .85rem; font-family: var(--font-body); font-size: .84rem; line-height: 1.4;
  box-shadow: 0 10px 26px rgba(0,0,0,.5);
  animation: aparece .3s var(--ease);
}
.bocadillo::before {
  content: ''; position: absolute; bottom: 100%; right: 18px;
  border: 8px solid transparent; border-bottom-color: #efe3c6;
}
@keyframes aparece { from { opacity: 0; transform: translateY(-6px) scale(.94); } }
`;
