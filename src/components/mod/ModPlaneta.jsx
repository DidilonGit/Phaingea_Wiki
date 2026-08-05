import { useEffect, useRef, useState } from 'react';
import {
  suscribirPinesPlaneta,
  fijarPinPlaneta,
  quitarPinPlaneta,
} from '../../lib/db/planeta.js';
import { ordenAlfabetico } from '../../lib/db/lugares.js';

// ============================================================================
// PINES DEL PLANETA (guía §8.4) — sección dentro de "Moderar categoría" de
// Cartografía.
//
// Cada campaña tiene su planeta: puede ser el mismo mundo (y los mismos
// lugares, si hereda la cartografía), pero los pines que se ven sobre el globo
// del Observatorio se eligen POR CAMPAÑA. Por eso viven en /planeta/{campana}
// y no dentro del lugar.
//
// CÓMO SE USA: se elige un lugar de la lista y se pulsa sobre el planisferio
// para colocarlo. El planisferio es el planeta "desenrollado": izquierda-
// derecha es la longitud (−180 a 180) y arriba-abajo la latitud (90 a −90),
// justo lo que usa el globo para dibujar.
//
// Y para no colocar a ciegas, el planisferio DIBUJA LAS TIERRAS DEL PROPIO
// GLOBO: coge sus puntos (window.__engren.lista, vectores unitarios) y los
// pasa a latitud/longitud. Lo que ves aquí es exactamente lo que hay en el
// planeta del Observatorio.
// ============================================================================

export default function ModPlaneta({ campanaId, lugares }) {
  const [pines, setPines] = useState({});
  const [sel, setSel] = useState(null); // lugar que se va a colocar
  const [aviso, setAviso] = useState('');
  const mundoRef = useRef(null);

  useEffect(() => {
    if (!campanaId) return;
    return suscribirPinesPlaneta(campanaId, setPines);
  }, [campanaId]);

  // Dibuja las tierras del globo sobre el planisferio.
  useEffect(() => {
    let vivo = true;
    const pintar = () => {
      const cv = mundoRef.current;
      const puntos = typeof window !== 'undefined' ? window.__engren?.lista : null;
      if (!cv || !puntos?.length) return false;
      const ctx = cv.getContext('2d');
      cv.width = 720;
      cv.height = 360;
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const p of puntos) {
        const lat = (Math.asin(Math.max(-1, Math.min(1, p.y))) * 180) / Math.PI;
        const lon = (Math.atan2(p.x, p.z) * 180) / Math.PI;
        const x = ((lon + 180) / 360) * cv.width;
        const y = ((90 - lat) / 180) * cv.height;
        ctx.fillStyle = `rgba(200, 226, 205, ${0.35 + 0.4 * (p.b ?? 0.7)})`;
        ctx.fillRect(x, y, 2.4, 2.4);
      }
      return true;
    };
    if (!pintar()) {
      // el globo puede tardar en generarse: se reintenta un poco
      const t = setInterval(() => {
        if (!vivo || pintar()) clearInterval(t);
      }, 400);
      return () => {
        vivo = false;
        clearInterval(t);
      };
    }
  }, []);

  const lista = ordenAlfabetico(lugares || []);
  const porId = Object.fromEntries(lista.map((l) => [l.id, l]));
  const puestos = Object.entries(pines).filter(([id]) => porId[id]);

  /** Pulsar el planisferio coloca (o mueve) el lugar elegido. */
  async function colocar(e) {
    if (!sel) {
      setAviso('Elige antes un lugar de la lista.');
      setTimeout(() => setAviso(''), 2500);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const lon = ((e.clientX - r.left) / r.width) * 360 - 180;
    const lat = 90 - ((e.clientY - r.top) / r.height) * 180;
    try {
      await fijarPinPlaneta(campanaId, sel, { lat: +lat.toFixed(1), lon: +lon.toFixed(1) });
      setSel(null);
    } catch (err) {
      // Casi siempre: las reglas de la base de datos aún no permiten /planeta.
      setAviso('No se pudo guardar el pin (' + err.message + ').');
      setTimeout(() => setAviso(''), 6000);
    }
  }

  return (
    <div className="mod-planeta">
      <p className="mono muted" style={{ fontSize: '.68rem', margin: 0 }}>
        Los lugares que marques aquí aparecen como pin sobre el planeta del Observatorio de
        <b> esta campaña</b>. Aunque el mundo y los lugares sean los mismos que en otra campaña,
        cada una decide qué enseña en su planeta.
      </p>

      {/* lugares disponibles */}
      <div className="chips" style={{ justifyContent: 'flex-start' }}>
        {lista.map((l) => {
          const puesto = !!pines[l.id];
          return (
            <button
              key={l.id}
              className={`chip ${sel === l.id ? 'activo' : ''} ${puesto ? 'puesto' : ''}`}
              onClick={() => (sel === l.id ? setSel(null) : setSel(l.id))}
              title={puesto ? 'Ya está en el planeta: púlsalo y marca otro sitio para moverlo' : 'Colocar en el planeta'}
            >
              {puesto ? '● ' : '+ '}
              {l.nombre}
            </button>
          );
        })}
        {lista.length === 0 && <span className="muted mono">Esta campaña todavía no tiene lugares.</span>}
      </div>

      {/* planisferio: el planeta desenrollado */}
      <div className={`planisferio ${sel ? 'colocando' : ''}`} onClick={colocar}>
        <canvas ref={mundoRef} className="mundo" aria-hidden="true" />
        <span className="ecuador" aria-hidden="true" />
        <span className="meridiano" aria-hidden="true" />
        {puestos.map(([id, p]) => (
          <span
            key={id}
            className="pin-plan"
            style={{ left: `${((p.lon + 180) / 360) * 100}%`, top: `${((90 - p.lat) / 180) * 100}%` }}
          >
            <b />
            <em>{porId[id].nombre}</em>
          </span>
        ))}
        <span className="pista-plan mono">
          {sel ? `Pulsa dónde va «${porId[sel]?.nombre}»` : 'Elige un lugar y pulsa aquí'}
        </span>
      </div>

      {/* lo que ya está puesto */}
      {puestos.length > 0 && (
        <table className="tabla-planeta">
          <tbody>
            {puestos.map(([id, p]) => (
              <tr key={id}>
                <td>{porId[id].nombre}</td>
                <td className="mono">lat {p.lat} · lon {p.lon}</td>
                <td>
                  <button className="quitar" onClick={() => quitarPinPlaneta(campanaId, id)}>Quitar del planeta</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {aviso && <p style={{ color: '#f0a29c', margin: 0 }}>{aviso}</p>}
      <style>{css}</style>
    </div>
  );
}

const css = `
.mod-planeta { display: grid; gap: .6rem; }
.mod-planeta .chip.puesto { border-color: var(--gold); color: var(--gold); }
.planisferio {
  position: relative; height: 210px; border-radius: 8px; overflow: hidden; cursor: pointer;
  border: 1px solid rgba(201,164,90,.35);
  background: linear-gradient(180deg, #0b1119, #101a29 60%, #0a1017);
}
/* las tierras del propio globo, para no colocar los pines a ciegas */
.planisferio .mundo { position: absolute; inset: 0; width: 100%; height: 100%; }
.planisferio.colocando { outline: 2px dashed var(--gold); }
.planisferio .ecuador { position: absolute; left: 0; right: 0; top: 50%; border-top: 1px dashed rgba(201,164,90,.3); }
.planisferio .meridiano { position: absolute; top: 0; bottom: 0; left: 50%; border-left: 1px dashed rgba(201,164,90,.3); }
.pin-plan { position: absolute; transform: translate(-50%,-50%); display: flex; align-items: center; gap: .3rem; }
.pin-plan b { width: 9px; height: 9px; border-radius: 50%; flex: none;
  background: radial-gradient(circle at 35% 30%, #f4dfa6, var(--gold)); box-shadow: 0 0 0 2px rgba(0,0,0,.55); }
.pin-plan em { font-style: normal; font-size: .62rem; color: var(--paper); text-shadow: 0 1px 3px #000; white-space: nowrap; }
.pista-plan {
  position: absolute; left: 50%; bottom: .4rem; transform: translateX(-50%);
  font-size: .58rem; letter-spacing: .1em; text-transform: uppercase; color: var(--stone);
  background: rgba(0,0,0,.55); padding: .15rem .5rem; border-radius: 999px; pointer-events: none;
}
.tabla-planeta { width: 100%; border-collapse: collapse; font-size: .8rem; }
.tabla-planeta td { padding: .25rem .4rem; border-bottom: 1px solid rgba(201,164,90,.15); }
.tabla-planeta .mono { color: var(--stone); font-size: .68rem; }
.quitar {
  background: none; border: 1px solid rgba(200,110,100,.45); color: #f0a29c; border-radius: 999px;
  padding: .1rem .5rem; cursor: pointer; font-family: ui-monospace, monospace; font-size: .62rem;
}
.quitar:hover { background: rgba(164,68,58,.25); }
`;
