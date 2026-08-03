import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaign } from '../stores/campaign.js';
import { $user } from '../stores/user.js';
import { suscribirNotificaciones, archivarNotificacion } from '../lib/db/notificaciones.js';

// ============================================================================
// BUZÓN (guía §18) — rincón de correspondencia.
//
//  · Pared de madera con un buzón antiguo; del buzón sobresale un sobre
//    cerrado con el número de cartas pendientes (§18.3).
//  · Al pulsar el sobre, las cartas salen flotando y se colocan en abanico
//    arriba en el centro; al pasar el ratón, la carta sobresale.
//  · Al pulsar una carta: gira, se centra, se amplía y el fondo se difumina
//    (§18.4). La parte trasera lleva asunto, fecha y los colores de la
//    campaña; la frontal usa versiones más claras para leer mejor.
//  · Leerla NO la archiva: sigue contando hasta pulsar «Archivar», que la
//    hace volar al álbum con un rastro de brillo (§18.5).
//  · El álbum guarda las archivadas por páginas (§18.6).
// ============================================================================

const POR_PAGINA_ALBUM = 8;

export default function BuzonView() {
  const campana = useStore($campaign);
  const user = useStore($user);
  const [notis, setNotis] = useState([]);
  const [sobreAbierto, setSobreAbierto] = useState(false);
  const [abierta, setAbierta] = useState(null);
  const [volando, setVolando] = useState(null);
  const [paginaAlbum, setPaginaAlbum] = useState(0);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  useEffect(() => {
    if (!campana?.id || !user?.nombre) return;
    return suscribirNotificaciones(campana.id, user.nombre, setNotis);
  }, [campana?.id, user?.nombre]);

  // El acceso rápido del sobre de la barra pide abrir el buzón ya desplegado.
  useEffect(() => {
    const abrir = () => setSobreAbierto(true);
    window.addEventListener('phaingea:abrir-buzon', abrir);
    return () => window.removeEventListener('phaingea:abrir-buzon', abrir);
  }, []);

  useEffect(() => {
    setSobreAbierto(false);
    setAbierta(null);
  }, [campana?.id]);

  if (!montado) return null;

  if (!user) {
    return <p className="muted center">Entra con tu cuenta para ver tu correspondencia.</p>;
  }

  const pendientes = notis.filter((n) => n.estado === 'pendiente');
  const archivadas = notis.filter((n) => n.estado === 'archivada');
  const colorA = campana?.colorTexto || '#efe6d2';
  const colorB = campana?.colorContorno || '#c9a45a';

  async function archivar(n) {
    setVolando(n.id);
    setAbierta(null);
    setTimeout(async () => {
      await archivarNotificacion(campana.id, user.nombre, n.id);
      setVolando(null);
    }, 620);
  }

  const totalPagsAlbum = Math.max(1, Math.ceil(archivadas.length / POR_PAGINA_ALBUM));
  const pagAlbum = Math.min(paginaAlbum, totalPagsAlbum - 1);
  const enAlbum = archivadas.slice(pagAlbum * POR_PAGINA_ALBUM, pagAlbum * POR_PAGINA_ALBUM + POR_PAGINA_ALBUM);

  return (
    <div className="buzon-view" style={{ '--camp-a': colorA, '--camp-b': colorB }}>
      {/* ---- escena: chimenea + pared con el buzón ---- */}
      <div className="buzon-escena" aria-hidden="true">
        <div className="fuego" />
      </div>

      <div className="buzon-conjunto">
        {/* abanico de cartas pendientes */}
        <div className="abanico">
          {sobreAbierto &&
            pendientes.map((n, i) => {
              const centro = (pendientes.length - 1) / 2;
              const ang = (i - centro) * 9;
              const desp = (i - centro) * 46;
              return (
                <button
                  key={n.id}
                  className={`carta ${volando === n.id ? 'volando' : ''}`}
                  style={{ transform: `translateX(${desp}px) rotate(${ang}deg)`, zIndex: 10 + i }}
                  onClick={() => setAbierta(n)}
                  title={n.asunto}
                >
                  <span className="sello" />
                  <span className="c-asunto">{n.asunto}</span>
                  <span className="c-fecha mono">{fecha(n.fecha)}</span>
                  <span className="c-logo">{(campana?.nombre || '?').charAt(0)}</span>
                </button>
              );
            })}
          {sobreAbierto && pendientes.length === 0 && (
            <p className="muted mono sin-cartas">No tienes cartas pendientes.</p>
          )}
        </div>

        {/* pared con el buzón */}
        <div className="pared">
          <button
            className={`buzon ${sobreAbierto ? 'abierto' : ''}`}
            onClick={() => setSobreAbierto((v) => !v)}
            aria-label={sobreAbierto ? 'Cerrar el sobre' : 'Abrir el sobre'}
          >
            <span className="buzon-cuerpo" />
            {!sobreAbierto && pendientes.length > 0 && <span className="sobre" />}
            {pendientes.length > 0 && <span className="contador">{pendientes.length}</span>}
          </button>
          <p className="mono muted pie-buzon">
            {pendientes.length === 0 ? 'Sin cartas pendientes' : sobreAbierto ? 'Sobre abierto' : 'Pulsa el sobre'}
          </p>
        </div>
      </div>

      {/* ---- carta ampliada ---- */}
      {abierta && (
        <div className="carta-fondo" onClick={() => setAbierta(null)}>
          <div className="carta-grande" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={() => setAbierta(null)} aria-label="Cerrar">✕</button>
            <p className="mono cg-fecha">{fecha(abierta.fecha)}</p>
            <h3>{abierta.asunto}</h3>
            <p className="cg-texto">{abierta.contenido || 'Sin más detalles.'}</p>
            {abierta.estado === 'pendiente' && (
              <button className="btn" onClick={() => archivar(abierta)}>Archivar</button>
            )}
            <p className="mono muted nota-cierre">Cerrar sin archivar la deja pendiente.</p>
          </div>
        </div>
      )}

      {/* ---- álbum de archivadas ---- */}
      <div className="album">
        <h3 className="album-titulo">Álbum</h3>
        {archivadas.length === 0 ? (
          <p className="muted mono">Todavía no has archivado ninguna carta.</p>
        ) : (
          <>
            <div className="album-paginas">
              {enAlbum.map((n) => (
                <button key={n.id} className="carta-album" onClick={() => setAbierta(n)} title={n.asunto}>
                  <span className="sello" />
                  <span className="c-asunto">{n.asunto}</span>
                  <span className="c-fecha mono">{fecha(n.fecha)}</span>
                </button>
              ))}
            </div>
            {totalPagsAlbum > 1 && (
              <div className="album-nav mono">
                <button onClick={() => setPaginaAlbum((p) => (p - 1 + totalPagsAlbum) % totalPagsAlbum)}>‹</button>
                <span>Página {pagAlbum + 1} / {totalPagsAlbum}</span>
                <button onClick={() => setPaginaAlbum((p) => (p + 1) % totalPagsAlbum)}>›</button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{css}</style>
    </div>
  );
}

function fecha(t) {
  if (!t) return '';
  return new Date(t).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

const css = `
.buzon-view { position: relative; display: grid; gap: 1.6rem; }
.buzon-escena {
  position: fixed; inset: var(--topbar-h) 0 0 0; z-index: 0; pointer-events: none;
  background:
    radial-gradient(55% 40% at 22% 88%, rgba(240,170,80,.16), transparent 62%),
    linear-gradient(180deg, rgba(46,32,20,.55), rgba(22,15,9,.75));
}
.buzon-escena .fuego {
  position: absolute; left: 12%; bottom: 6%; width: 220px; height: 120px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,170,70,.28), transparent 70%);
  filter: blur(18px); animation: latido 3.4s ease-in-out infinite;
}
@keyframes latido { 0%,100% { opacity:.65; transform: scale(1); } 50% { opacity:1; transform: scale(1.07); } }

.buzon-conjunto { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 1.4rem; align-items: start; min-height: 300px; }
.abanico { position: relative; display: grid; place-items: center; min-height: 240px; }
.sin-cartas { font-size: .8rem; }
.carta {
  position: absolute; top: 20px; width: 150px; height: 200px; cursor: pointer;
  border-radius: 6px; border: 1px solid rgba(0,0,0,.5); padding: .7rem .6rem;
  display: grid; align-content: space-between; justify-items: center; text-align: center;
  background: linear-gradient(160deg, var(--camp-b), color-mix(in srgb, var(--camp-b) 45%, #241609));
  box-shadow: 0 10px 26px rgba(0,0,0,.55);
  transition: transform .25s var(--ease), box-shadow .25s var(--ease);
  animation: salir .5s var(--ease) backwards;
}
@keyframes salir { from { transform: translateY(60px) scale(.8); opacity: 0; } }
.carta:hover { transform: translateY(-16px) !important; box-shadow: 0 18px 34px rgba(0,0,0,.6); }
.carta.volando { animation: volar .6s var(--ease) forwards; }
@keyframes volar {
  to { transform: translate(160px, 220px) rotate(22deg) scale(.35); opacity: 0; filter: brightness(1.8); }
}
.carta .sello { width: 26px; height: 26px; border-radius: 50%; background: rgba(0,0,0,.35); box-shadow: inset 0 0 0 2px rgba(255,255,255,.25); }
.c-asunto { font-family: var(--font-title); font-size: .88rem; color: var(--camp-a); text-shadow: 0 1px 3px rgba(0,0,0,.6); }
.c-fecha { font-size: .58rem; color: rgba(255,255,255,.75); }
.c-logo { font-family: var(--font-title); font-size: 1.1rem; color: rgba(255,255,255,.5); }

.pared {
  width: 190px; padding: 1.2rem 1rem; border-radius: 8px; display: grid; justify-items: center; gap: .6rem;
  background: linear-gradient(160deg, #5a3d26, #2e1d10);
  box-shadow: inset 0 0 0 2px rgba(0,0,0,.35), 0 14px 30px rgba(0,0,0,.5);
}
.buzon { position: relative; width: 120px; height: 96px; background: none; border: 0; cursor: pointer; }
.buzon-cuerpo {
  position: absolute; inset: 20px 0 0 0; border-radius: 10px 10px 4px 4px;
  background: linear-gradient(180deg, #6e7480, #3a3f48);
  box-shadow: inset 0 2px 0 rgba(255,255,255,.25), 0 8px 18px rgba(0,0,0,.5);
}
.sobre {
  position: absolute; left: 50%; top: 2px; width: 76px; height: 52px; transform: translateX(-50%);
  border-radius: 3px; background: linear-gradient(160deg, #f0e6cd, #cdbc98);
  box-shadow: 0 4px 10px rgba(0,0,0,.5);
}
.sobre::after {
  content: ''; position: absolute; inset: 0;
  border-top: 26px solid rgba(0,0,0,.12); border-left: 38px solid transparent; border-right: 38px solid transparent;
}
.buzon.abierto .buzon-cuerpo { background: linear-gradient(180deg, #7d8492, #454b55); }
.contador {
  position: absolute; right: -6px; top: 12px; min-width: 24px; height: 24px; border-radius: 999px;
  display: grid; place-items: center; padding: 0 .3rem;
  background: var(--gold); color: #241a12; font-family: ui-monospace, monospace; font-size: .72rem; font-weight: 700;
  box-shadow: 0 2px 8px rgba(0,0,0,.5);
}
.pie-buzon { font-size: .62rem; }

.carta-fondo {
  position: fixed; inset: 0; z-index: 150; display: grid; place-items: center; padding: 5vh 5vw;
  background: rgba(5,6,10,.78); backdrop-filter: blur(6px);
}
.carta-grande {
  position: relative; width: min(520px, 92vw); padding: 1.6rem 1.8rem;
  border-radius: 8px; color: #3a2a16;
  background: linear-gradient(160deg,
    color-mix(in srgb, var(--camp-b) 22%, #f4ead2),
    color-mix(in srgb, var(--camp-b) 12%, #e6d9ba));
  box-shadow: 0 26px 60px rgba(0,0,0,.65);
  animation: girar .45s var(--ease);
}
@keyframes girar { from { transform: rotateY(90deg) scale(.7); opacity: 0; } }
.carta-grande h3 { font-family: var(--font-title); margin: .2rem 0 .8rem; font-size: 1.35rem; color: #4a2f14; }
.cg-fecha { font-size: .64rem; color: #7a6444; }
.cg-texto { line-height: 1.6; margin: 0 0 1.1rem; }
.nota-cierre { font-size: .6rem; margin-top: .6rem; color: #7a6444; }
.carta-grande .cerrar {
  position: absolute; top: .6rem; right: .6rem; width: 26px; height: 26px; border-radius: 50%;
  background: rgba(0,0,0,.15); border: 1px solid rgba(0,0,0,.3); color: #4a2f14; cursor: pointer;
}

.album { position: relative; z-index: 1; }
.album-titulo { font-family: var(--font-title); color: var(--gold-soft); margin: 0 0 .6rem; }
.album-paginas { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: .8rem; }
.carta-album {
  height: 150px; border-radius: 5px; cursor: pointer; padding: .5rem;
  display: grid; align-content: space-between; justify-items: center; text-align: center;
  border: 1px solid rgba(0,0,0,.5);
  background: linear-gradient(160deg, color-mix(in srgb, var(--camp-b) 60%, #3a2a18), #241609);
  box-shadow: 0 6px 16px rgba(0,0,0,.45);
}
.carta-album:hover { filter: brightness(1.12); }
.album-nav { display: flex; align-items: center; gap: .8rem; justify-content: center; margin-top: .8rem; font-size: .7rem; color: var(--stone); }
.album-nav button { width: 26px; height: 26px; border-radius: 50%; cursor: pointer; background: rgba(14,17,22,.7); border: 1px solid rgba(201,164,90,.5); color: var(--gold); }
@media (max-width: 720px) { .buzon-conjunto { grid-template-columns: 1fr; } .pared { justify-self: center; } }
`;
