import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { $campaign } from '../stores/campaign.js';

// ============================================================================
// NOTA DE CAMPAÑA (guía §8.5) — papel antiguo bajo el planeta del Observatorio.
//
// Muestra, con la identidad visual de la campaña activa:
//   · Título con SU fuente, SU color de texto y SU color de contorno
//   · Logo detrás/junto al título
//   · Línea divisoria
//   · Descripción (uno o varios párrafos) con fuente y color comunes legibles
//
// El papel se adapta al contenido y cambia con transición al cambiar de
// campaña. Los colores salen de /campanas (T06): colorTexto, colorContorno,
// fuenteTitulo, logoUrl.
// ============================================================================

export default function NotaCampana() {
  const c = useStore($campaign);
  const [montado, setMontado] = useState(false);
  const [fundido, setFundido] = useState(false);

  useEffect(() => setMontado(true), []);

  // Transición suave al cambiar de campaña.
  useEffect(() => {
    if (!montado) return;
    setFundido(true);
    const t = setTimeout(() => setFundido(false), 30);
    return () => clearTimeout(t);
  }, [c?.id, montado]);

  if (!montado || !c) return null;

  const parrafos = String(c.descripcion || '')
    .split(/\n{2,}|\r\n\r\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={`nota ${fundido ? 'fundiendo' : ''}`}>
      <div className="nota-cabecera">
        {c.logoUrl ? (
          <img className="nota-logo" src={c.logoUrl} alt="" />
        ) : (
          <span
            className="nota-logo marcador"
            style={{
              background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,.35), transparent 45%),
                           linear-gradient(140deg, ${c.planeta?.colorA || '#5b6a8a'}, ${c.planeta?.colorB || '#2b3350'} 72%)`,
            }}
            aria-hidden="true"
          />
        )}
        <h2
          className="nota-titulo"
          style={{
            fontFamily: c.fuenteTitulo || 'var(--font-title)',
            color: c.colorTexto || 'var(--ink)',
            WebkitTextStrokeColor: c.colorContorno || 'transparent',
          }}
        >
          {c.nombre}
        </h2>
      </div>

      <hr className="nota-divisoria" />

      <div className="nota-cuerpo">
        {parrafos.length > 0 ? (
          parrafos.map((p, i) => <p key={i}>{p}</p>)
        ) : (
          <p className="nota-vacia">Esta campaña aún no tiene descripción.</p>
        )}
      </div>

      <style>{css}</style>
    </div>
  );
}

const css = `
.nota {
  position: relative;
  width: min(680px, 92vw);
  margin: 1.4rem auto 0;
  padding: 1.3rem 1.6rem 1.5rem;
  color: #3a2a16;
  background:
    radial-gradient(120% 90% at 20% 10%, rgba(255,255,255,.5), transparent 55%),
    linear-gradient(160deg, #efe3c6, #ddcba2 70%, #d3bf93);
  border: 1px solid rgba(90,61,38,.35);
  border-radius: 3px;
  box-shadow: 0 14px 34px rgba(0,0,0,.5), inset 0 0 40px rgba(140,110,60,.18);
  /* bordes irregulares de papel viejo */
  clip-path: polygon(0% 2%, 2% 0%, 98% 1%, 100% 3%, 99.4% 97%, 97% 100%, 3% 99%, 0.4% 96%);
  transition: opacity .35s var(--ease), transform .35s var(--ease);
}
.nota.fundiendo { opacity: 0; transform: translateY(6px); }
.nota-cabecera { display: flex; align-items: center; gap: .6rem; }
.nota-logo { width: 28px; height: 28px; border-radius: 50%; flex: none; box-shadow: 0 2px 6px rgba(0,0,0,.4); object-fit: cover; }
.nota-titulo {
  margin: 0; font-size: clamp(1.5rem, 4vw, 2.2rem); letter-spacing: .03em; line-height: 1.1;
  -webkit-text-stroke-width: 1px;
  paint-order: stroke fill;
}
.nota-divisoria {
  border: 0; height: 1px; margin: .8rem 0 .9rem;
  background: linear-gradient(90deg, transparent, rgba(90,61,38,.55), transparent);
}
.nota-cuerpo { font-family: var(--font-body); font-size: .98rem; line-height: 1.6; color: #4a3a22; }
.nota-cuerpo p { margin: 0 0 .6rem; }
.nota-cuerpo p:last-child { margin-bottom: 0; }
.nota-vacia { opacity: .6; font-style: italic; }
`;
