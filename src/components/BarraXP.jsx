import { progresoNivel } from '../lib/xp.js';

// Barra de experiencia (guía §23.1): UNA sola barra con DOS colores, para ver
// cuánto procede de la experiencia general y cuánto de la extra.
//
//   <BarraXP general={600} extra={166} progresion="rapida" />
//
// El nivel y el progreso se calculan siempre desde la XP total (nunca se
// guardan en la base de datos).
export default function BarraXP({ general = 0, extra = 0, progresion = 'media', compacta = false }) {
  const total = (Number(general) || 0) + (Number(extra) || 0);
  const p = progresoNivel(total, progresion);

  // Reparto del ancho de la barra entre general y extra, proporcional a lo
  // conseguido DENTRO del nivel actual.
  const dentro = p.dentro;
  const proporcionExtra = total > 0 ? (Number(extra) || 0) / total : 0;
  const anchoExtra = p.necesaria > 0 ? Math.min(100, ((dentro * proporcionExtra) / p.necesaria) * 100) : 0;
  const anchoGeneral = Math.max(0, p.porcentaje - anchoExtra);

  return (
    <div className="barraxp">
      <div
        className="barraxp-pista"
        role="progressbar"
        aria-label="Experiencia"
        aria-valuenow={dentro}
        aria-valuemin={0}
        aria-valuemax={p.necesaria}
        title={`General: ${general} · Extra: ${extra} · Total: ${total}`}
      >
        <i className="xp-general" style={{ width: `${anchoGeneral}%` }} />
        <i className="xp-extra" style={{ width: `${anchoExtra}%` }} />
      </div>

      <div className="barraxp-pie mono">
        <span>
          {p.nivel >= 20 ? 'Nivel 20 (máximo)' : `${dentro} / ${p.necesaria} — Nivel ${p.nivel}`}
        </span>
        {!compacta && (
          <span className="barraxp-leyenda">
            <b className="pt general" /> general {general}
            <b className="pt extra" /> extra {extra}
          </span>
        )}
      </div>

      <style>{css}</style>
    </div>
  );
}

const css = `
.barraxp { display: grid; gap: .3rem; }
.barraxp-pista {
  display: flex; height: 12px; border-radius: 999px; overflow: hidden;
  background: rgba(0,0,0,.4); border: 1px solid rgba(201,164,90,.3);
}
.barraxp-pista i { display: block; height: 100%; transition: width .4s var(--ease); }
.xp-general { background: linear-gradient(90deg, #b98a3c, var(--gold)); }
.xp-extra   { background: linear-gradient(90deg, #6f9e5c, #9fd07a); }
.barraxp-pie {
  display: flex; justify-content: space-between; gap: .8rem; flex-wrap: wrap;
  font-size: .72rem; color: var(--parchment);
}
.barraxp-leyenda { display: inline-flex; align-items: center; gap: .3rem; color: var(--stone); font-size: .66rem; }
.barraxp-leyenda .pt { width: 9px; height: 9px; border-radius: 2px; display: inline-block; margin-left: .5rem; }
.barraxp-leyenda .pt.general { background: var(--gold); }
.barraxp-leyenda .pt.extra { background: #9fd07a; }
`;
