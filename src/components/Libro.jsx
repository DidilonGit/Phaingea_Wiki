import { useEffect, useMemo, useRef, useState } from 'react';

// Extrae el texto plano de un nodo React (para el buscador, T10).
function extraerTexto(nodo) {
  if (nodo == null || typeof nodo === 'boolean') return '';
  if (typeof nodo === 'string' || typeof nodo === 'number') return String(nodo);
  if (Array.isArray(nodo)) return nodo.map(extraerTexto).join(' ');
  if (nodo.props && nodo.props.children != null) return extraerTexto(nodo.props.children);
  return '';
}

// ============================================================================
// LIBRO — componente compartido de libros (guía §27).
//
// API:
//   <Libro
//     titulo="Panteón de Phaingea"       · título de la portada
//     sub="Heredado de Base"             · subtítulo de la portada (opcional)
//     cubierta="cuero-rojo"              · cuero-rojo | cuero-verde | cuero-negro
//     paginas={[<div>…</div>, …]}        · contenido de cada página (nodos React)
//     titulosPaginas={['Cap. 1', …]}     · para el índice (opcional; si falta,
//                                          se usa "Página N")
//     alAbrirPagina={(i) => {}}          · callback opcional
//   />
//
// El libro empieza en la PORTADA. Al abrirlo va al ÍNDICE (página especial),
// que lista las páginas y navega con animación de paso. Controles: flechas
// (también ← → de teclado), "ir a página", y volver al índice desde cualquier
// página. La animación es un giro 3D (CSS) breve y suave (guía §28).
// El buscador (T10) y la pantalla completa (T11) se añaden sobre esta base.
// ============================================================================

export default function Libro({
  titulo = 'Libro',
  sub = '',
  cubierta = 'cuero-rojo',
  paginas = [],
  titulosPaginas = [],
  alAbrirPagina,
}) {
  // vista: 'portada' | 'indice' | número de página (0-based)
  const [vista, setVista] = useState('portada');
  const [girando, setGirando] = useState(null); // 'adelante' | 'atras' | null
  const [irA, setIrA] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const contRef = useRef(null);

  const total = paginas.length;
  const tituloDe = (i) => titulosPaginas[i] || `Página ${i + 1}`;

  // --- Buscador (T10): índice de texto plano por página, calculado una vez ---
  const textos = useMemo(() => paginas.map((p) => extraerTexto(p).toLowerCase()), [paginas]);
  const resultados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (q.length < 2) return null;
    const res = [];
    textos.forEach((t, i) => {
      const pos = t.indexOf(q);
      if (pos === -1) return;
      const ini = Math.max(0, pos - 30);
      res.push({
        pagina: i,
        contexto: (ini > 0 ? '…' : '') + t.slice(ini, pos + q.length + 30) + '…',
      });
    });
    return res;
  }, [busqueda, textos]);

  // Navegar con animación de giro: se marca la dirección, a mitad de la
  // animación se cambia el contenido y se completa el giro.
  function navegar(destino, dir = 'adelante') {
    if (girando) return;
    setGirando(dir);
    setTimeout(() => {
      setVista(destino);
      if (typeof destino === 'number' && alAbrirPagina) alAbrirPagina(destino);
      setTimeout(() => setGirando(null), 180);
    }, 180);
  }

  const puedeAtras = vista !== 'portada';
  const siguiente = () => {
    if (vista === 'portada') navegar('indice');
    else if (vista === 'indice') total && navegar(0);
    else if (vista < total - 1) navegar(vista + 1);
  };
  const anterior = () => {
    if (vista === 'indice') navegar('portada', 'atras');
    else if (vista === 0) navegar('indice', 'atras');
    else if (typeof vista === 'number') navegar(vista - 1, 'atras');
  };

  // Teclado (solo cuando el ratón está sobre el libro no hace falta: global
  // pero ignorando inputs).
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select')) return;
      if (!contRef.current || contRef.current.offsetParent === null) return; // libro oculto
      if (e.key === 'ArrowRight') siguiente();
      if (e.key === 'ArrowLeft') anterior();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  function irAPagina(e) {
    e.preventDefault();
    const n = parseInt(irA, 10);
    if (!isNaN(n) && n >= 1 && n <= total) {
      navegar(n - 1, typeof vista === 'number' && n - 1 < vista ? 'atras' : 'adelante');
      setIrA('');
    }
  }

  return (
    <div className="libro-wrap" ref={contRef}>
      <div className={`libro cubierta-${cubierta} ${girando ? 'girando-' + girando : ''} ${vista === 'portada' ? 'cerrado' : 'abierto'}`}>
        {/* esquinas decorativas de la cubierta (guía §27.2) */}
        <span className="esquina a" aria-hidden="true" />
        <span className="esquina b" aria-hidden="true" />
        <span className="esquina c" aria-hidden="true" />
        <span className="esquina d" aria-hidden="true" />

        {vista === 'portada' && (
          <button className="portada" onClick={() => navegar('indice')} aria-label={`Abrir ${titulo}`}>
            <span className="portada-titulo">{titulo}</span>
            {sub && <span className="portada-sub">{sub}</span>}
            <span className="portada-abrir mono">ABRIR</span>
          </button>
        )}

        {vista === 'indice' && (
          <div className="pagina indice" role="navigation" aria-label="Índice del libro">
            <h4 className="pagina-titulo">Índice</h4>
            <ol className="indice-lista">
              {paginas.map((_, i) => (
                <li key={i}>
                  <button onClick={() => navegar(i)}>
                    <span className="indice-titulo">{tituloDe(i)}</span>
                    <span className="indice-num mono">{i + 1}</span>
                  </button>
                </li>
              ))}
            </ol>
            {total === 0 && <p className="muted">Este libro aún no tiene páginas.</p>}
          </div>
        )}

        {typeof vista === 'number' && paginas[vista] != null && (
          <div className="pagina" aria-label={tituloDe(vista)}>
            <div className="pagina-contenido">{paginas[vista]}</div>
            <div className="pagina-pie mono">
              <button className="lnk" onClick={() => navegar('indice', 'atras')}>⌂ Índice</button>
              <span>{vista + 1} / {total}</span>
            </div>
          </div>
        )}
      </div>

      {/* controles bajo el libro */}
      <div className="libro-controles">
        <button className="ctrl" onClick={anterior} disabled={!puedeAtras || !!girando} aria-label="Página anterior">‹</button>
        <form onSubmit={irAPagina} className="ira mono">
          <input
            value={irA}
            onChange={(e) => setIrA(e.target.value)}
            placeholder="pág."
            aria-label="Ir a página"
            inputMode="numeric"
          />
        </form>
        <button className="ctrl" onClick={siguiente} disabled={(vista === total - 1 && total > 0) || !!girando} aria-label="Página siguiente">›</button>
        <div className="buscador">
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="🔎 buscar en el libro…"
            aria-label="Buscar en el libro"
          />
          {resultados && (
            <div className="buscador-resultados" role="listbox" aria-label="Resultados de búsqueda">
              {resultados.length === 0 && <p className="sin-resultados mono">Sin resultados</p>}
              {resultados.map((r) => (
                <button
                  key={r.pagina}
                  onClick={() => {
                    navegar(r.pagina, typeof vista === 'number' && r.pagina < vista ? 'atras' : 'adelante');
                    setBusqueda('');
                  }}
                >
                  <span className="mono br-pag">{tituloDe(r.pagina)} · pág. {r.pagina + 1}</span>
                  <span className="br-ctx">{r.contexto}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{css}</style>
    </div>
  );
}

// Estilos del libro (inyectados con el componente; solo se montan una vez por
// libro y son baratos). Colores del sistema (tokens.css).
const css = `
.libro-wrap { display: grid; justify-items: center; gap: 0.7rem; }
.libro {
  position: relative;
  width: min(560px, 92vw);
  aspect-ratio: 4 / 3;
  border-radius: 6px 14px 14px 6px;
  border: 1px solid rgba(0,0,0,.55);
  box-shadow: 8px 12px 34px rgba(0,0,0,.55), inset 0 0 0 2px rgba(255,255,255,.05);
  perspective: 1200px;
  transition: transform .25s var(--ease);
  overflow: hidden;
}
.libro.cerrado { width: min(360px, 80vw); aspect-ratio: 3 / 4; }
.cubierta-cuero-rojo   { background: radial-gradient(120% 100% at 30% 20%, rgba(255,255,255,.08), transparent 55%), linear-gradient(135deg, var(--leather-red), #241610); }
.cubierta-cuero-verde  { background: radial-gradient(120% 100% at 30% 20%, rgba(255,255,255,.08), transparent 55%), linear-gradient(135deg, var(--leather-green), #16200f); }
.cubierta-cuero-negro  { background: radial-gradient(120% 100% at 30% 20%, rgba(255,255,255,.08), transparent 55%), linear-gradient(135deg, var(--leather-black), #0d0b09); }
.libro .esquina { position: absolute; width: 22px; height: 22px; border: 2px solid rgba(201,164,90,.55); pointer-events: none; z-index: 3; }
.libro .esquina.a { top: 7px; left: 7px; border-right: 0; border-bottom: 0; }
.libro .esquina.b { top: 7px; right: 7px; border-left: 0; border-bottom: 0; }
.libro .esquina.c { bottom: 7px; left: 7px; border-right: 0; border-top: 0; }
.libro .esquina.d { bottom: 7px; right: 7px; border-left: 0; border-top: 0; }
.portada {
  position: absolute; inset: 0; display: grid; place-content: center; gap: .6rem;
  background: none; border: 0; cursor: pointer; text-align: center; padding: 1.5rem;
}
.portada-titulo { font-family: var(--font-title); font-size: clamp(1.4rem, 4vw, 2rem); color: var(--gold-soft); letter-spacing: .05em; }
.portada-sub { font-family: var(--font-body); color: var(--parchment); opacity: .8; font-size: .9rem; }
.portada-abrir { margin-top: 1rem; color: var(--gold); font-size: .7rem; letter-spacing: .3em; border: 1px solid rgba(201,164,90,.5); border-radius: 999px; padding: .4rem .9rem; justify-self: center; }
.portada:hover .portada-abrir { background: rgba(201,164,90,.15); }
.pagina {
  position: absolute; inset: 10px;
  background: linear-gradient(120deg, var(--paper), var(--parchment) 85%);
  color: var(--ink);
  border-radius: 4px 10px 10px 4px;
  padding: 1.2rem 1.4rem 2.2rem;
  overflow-y: auto;
  transform-origin: left center;
  backface-visibility: hidden;
}
.girando-adelante .pagina, .girando-adelante .portada { animation: libroGiroA .36s var(--ease); }
.girando-atras .pagina, .girando-atras .portada { animation: libroGiroB .36s var(--ease); }
@keyframes libroGiroA { 0% { transform: rotateY(0); } 50% { transform: rotateY(-24deg); opacity: .35; } 100% { transform: rotateY(0); } }
@keyframes libroGiroB { 0% { transform: rotateY(0); } 50% { transform: rotateY(18deg); opacity: .35; } 100% { transform: rotateY(0); } }
.pagina-titulo { font-family: var(--font-title); color: #5a3d26; font-size: 1.25rem; margin: 0 0 .8rem; }
.indice-lista { list-style: none; margin: 0; padding: 0; display: grid; gap: .15rem; max-height: 100%; overflow-y: auto; }
.indice-lista button {
  width: 100%; display: flex; justify-content: space-between; gap: 1rem; align-items: baseline;
  background: none; border: 0; cursor: pointer; padding: .35rem .3rem;
  font-family: var(--font-body); color: var(--ink); font-size: .95rem;
  border-bottom: 1px dotted rgba(90,61,38,.35);
}
.indice-lista button:hover .indice-titulo { color: #7a4a1a; }
.indice-num { color: #8a7350; font-size: .75rem; }
.pagina-contenido { min-height: calc(100% - 1.6rem); font-family: var(--font-body); line-height: 1.55; }
.pagina-pie {
  position: absolute; left: 0; right: 0; bottom: 0;
  display: flex; justify-content: space-between; align-items: center;
  padding: .35rem .9rem; font-size: .7rem; color: #8a7350;
  background: linear-gradient(transparent, rgba(90,61,38,.08));
}
.pagina-pie .lnk { background: none; border: 0; cursor: pointer; color: #7a4a1a; font-family: inherit; font-size: inherit; }
.pagina-pie .lnk:hover { text-decoration: underline; }
.libro-controles { display: flex; align-items: center; gap: .5rem; }
.libro-controles .ctrl {
  width: 38px; height: 38px; border-radius: 50%; cursor: pointer; font-size: 1.2rem;
  border: 1px solid rgba(201,164,90,.5); background: rgba(14,17,22,.7); color: var(--gold);
  transition: transform .15s var(--ease);
}
.libro-controles .ctrl:hover:not(:disabled) { transform: scale(1.08); }
.libro-controles .ctrl:disabled { opacity: .35; cursor: default; }
.libro-controles .ira input {
  width: 58px; text-align: center; padding: .35rem .3rem; border-radius: 999px;
  border: 1px solid rgba(201,164,90,.4); background: rgba(0,0,0,.3); color: var(--paper);
  font-size: .75rem;
}
.buscador { position: relative; }
.buscador input {
  width: 170px; padding: .4rem .7rem; border-radius: 999px;
  border: 1px solid rgba(201,164,90,.4); background: rgba(0,0,0,.3); color: var(--paper);
  font-size: .78rem; font-family: var(--font-body);
}
.buscador-resultados {
  position: absolute; top: calc(100% + 6px); right: 0; z-index: 40;
  width: min(320px, 80vw); max-height: 260px; overflow-y: auto;
  background: linear-gradient(180deg, #2a1e13, #1a120b);
  border: 1px solid rgba(201,164,90,.45); border-radius: 10px;
  box-shadow: 0 14px 40px rgba(0,0,0,.6); padding: .35rem;
}
.buscador-resultados button {
  display: grid; gap: .15rem; width: 100%; text-align: left; cursor: pointer;
  background: none; border: 0; padding: .45rem .5rem; border-radius: 6px;
}
.buscador-resultados button:hover { background: rgba(201,164,90,.12); }
.br-pag { color: var(--gold); font-size: .62rem; letter-spacing: .06em; }
.br-ctx { color: var(--parchment); font-size: .78rem; font-family: var(--font-body); }
.sin-resultados { color: var(--stone); font-size: .7rem; text-align: center; margin: .4rem 0; }
`;
