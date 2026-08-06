import { useEffect, useMemo, useRef, useState } from 'react';
import 'page-flip/src/Style/stPageFlip.css';
import { sonar } from '../lib/sonidos.js';

// ============================================================================
// LIBRO — componente compartido (guía §27).
//
// Usa StPageFlip (paquete `page-flip`) para el paso de página realista: la
// hoja se dobla y se levanta como en un libro de verdad, con su sombra.
//
// API:
//   <Libro
//     titulo="Panteón de Phaingea"
//     sub="Heredado de Base"
//     cubierta="cuero-rojo"              · cuero-rojo | cuero-verde | cuero-negro
//     paginas={[<div/>, …]}              · contenido de cada página
//     titulosPaginas={['Cap. 1', …]}     · para el índice y el buscador
//     alAbrirPagina={(i) => {}}
//   />
//
// Estructura del libro: PORTADA · ÍNDICE · páginas · CONTRAPORTADA.
// Alrededor: flechas, ir-a-página, volver al índice, buscador (§27.3) y
// pantalla completa (§9.3).
//
// OJO: el libro vive dentro de secciones que el SPA oculta con `hidden`. Si se
// inicializa sin tamaño, StPageFlip se rompe; por eso se espera a que el
// contenedor tenga ancho real (ResizeObserver) para montarlo.
// ============================================================================

// Extrae el texto plano de un nodo React (para el buscador).
function extraerTexto(nodo) {
  if (nodo == null || typeof nodo === 'boolean') return '';
  if (typeof nodo === 'string' || typeof nodo === 'number') return String(nodo);
  if (Array.isArray(nodo)) return nodo.map(extraerTexto).join(' ');
  if (nodo.props && nodo.props.children != null) return extraerTexto(nodo.props.children);
  return '';
}

export default function Libro({
  titulo = 'Libro',
  sub = '',
  cubierta = 'cuero-rojo',
  paginas = [],
  titulosPaginas = [],
  alAbrirPagina,
  // Portada propia: con un documento maquetado, su primera página ES la
  // portada del libro (guía §27.1), en vez de la tapa de cuero genérica.
  portada = null,
  // Contraportada propia: si el documento trae su última página como
  // contraportada, se usa esa en vez de la tapa genérica.
  contraportada = null,
  // Proporción de la hoja (alto ÷ ancho). Con documentos maquetados conviene
  // pasar la del original (p. ej. 792/612 en tamaño carta) para que la página
  // llene el libro sin bordes ni recortes.
  proporcion = 1.38,
}) {
  const [pagina, setPagina] = useState(0); // índice dentro del libro completo
  const [irA, setIrA] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [fs, setFs] = useState(false);
  const [listo, setListo] = useState(false);
  // ¿está abierto a doble página? Hace falta para reservarle el alto correcto:
  // si no, al pasar de la portada (una hoja) al interior (dos) el libro cambia
  // de tamaño y da un salto feo hacia arriba.
  const [dobles, setDobles] = useState(false);

  const contRef = useRef(null);
  const libroRef = useRef(null);
  const flipRef = useRef(null);

  const total = paginas.length;
  const tituloDe = (i) => titulosPaginas[i] || `Página ${i + 1}`;

  // Estructura: 0 = portada, 1 = índice, 2..(total+1) = contenido, último = contraportada
  const OFFSET = 2;
  const totalHojas = total + 3;

  // --- buscador (§27.3) ---
  const textos = useMemo(() => paginas.map((p) => extraerTexto(p).toLowerCase()), [paginas]);
  const resultados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (q.length < 2) return null;
    const res = [];
    textos.forEach((t, i) => {
      const pos = t.indexOf(q);
      if (pos === -1) return;
      const ini = Math.max(0, pos - 30);
      res.push({ pagina: i, contexto: (ini > 0 ? '…' : '') + t.slice(ini, pos + q.length + 30) + '…' });
    });
    return res;
  }, [busqueda, textos]);

  // --- montar StPageFlip cuando el contenedor tenga tamaño real ---
  // Se monta UNA sola vez (cuando el contenedor deja de estar oculto y mide).
  // Si luego cambian las páginas, se refresca con updateFromHtml en vez de
  // rehacer el libro: así no hay carreras que destruyan el recién montado.
  const montandoRef = useRef(false);
  const paginasRef = useRef(paginas);
  paginasRef.current = paginas;
  const proporcionRef = useRef(proporcion);
  proporcionRef.current = proporcion;

  useEffect(() => {
    let vivo = true;

    async function montar() {
      const el = libroRef.current;
      if (!el || flipRef.current || montandoRef.current) return;
      if (el.clientWidth < 50) return; // sigue oculto: esperamos al ResizeObserver
      montandoRef.current = true;
      try {
        // page-flip se publica como bundle UMD: PageFlip cuelga del default.
        const mod = await import('page-flip');
        const PageFlip = mod.PageFlip || mod.default?.PageFlip || mod.default;
        if (!vivo || flipRef.current || typeof PageFlip !== 'function') return;

        const ancho = Math.min(el.clientWidth / 2, 700);
        const flip = new PageFlip(el, {
          width: ancho,
          height: Math.round(ancho * proporcionRef.current),
          size: 'stretch',
          minWidth: 220,
          // Topes altos a propósito: en pantalla completa el libro tiene que
          // poder crecer hasta llenar el hueco (guía §9.3).
          maxWidth: 900,
          minHeight: 300,
          maxHeight: 1300,
          showCover: true,
          usePortrait: true,
          maxShadowOpacity: 0.5,
          mobileScrollSupport: false,
          drawShadow: true,
        });
        flip.loadFromHTML(el.querySelectorAll('.hoja'));
        flip.on('flip', (e) => {
          const n = e.data;
          setPagina(n);
          sonar('pagina');
          const cuantas = paginasRef.current.length;
          if (n >= OFFSET && n < OFFSET + cuantas && alAbrirPagina) alAbrirPagina(n - OFFSET);
        });
        flipRef.current = flip;
        setListo(true);
        setDobles(!!el.querySelector('.stf__wrapper.--landscape'));
      } catch (_) {
        // p. ej. el paquete no cargó: se reintenta desde el temporizador
      } finally {
        montandoRef.current = false;
      }
    }

    montar();
    // El ResizeObserver no siempre dispara al pasar de oculto a visible, así
    // que también reintentamos cuando el SPA anuncia el cambio de sala.
    const ro = new ResizeObserver(() => {
      montar();
      // el ancho manda: por debajo de cierto tamaño el libro pasa a una hoja
      setDobles(!!libroRef.current?.querySelector('.stf__wrapper.--landscape'));
    });
    if (libroRef.current) ro.observe(libroRef.current);
    const alCambiarVista = () => setTimeout(montar, 60);
    window.addEventListener('phaingea:vista', alCambiarVista);

    // Red de seguridad: si por lo que sea no llegó a montarse (el contenedor
    // todavía medía 0, o falló la carga del paquete), se reintenta un rato.
    // Sin esto, el libro se queda como una pila de hojas sueltas y hay que
    // recargar la página para verlo.
    let intentos = 0;
    const reintento = setInterval(() => {
      if (!vivo || flipRef.current || intentos > 20) {
        clearInterval(reintento);
        return;
      }
      intentos++;
      montar();
    }, 500);

    return () => {
      vivo = false;
      clearInterval(reintento);
      ro.disconnect();
      window.removeEventListener('phaingea:vista', alCambiarVista);
      try {
        flipRef.current?.destroy();
      } catch (_) {}
      flipRef.current = null;
    };
  }, []);

  // Pantalla completa: el hueco cambia de tamaño. StPageFlip se estira solo
  // (size: 'stretch') pero hay que avisarle de que el sitio ha cambiado.
  useEffect(() => {
    if (!flipRef.current) return;
    const t = setTimeout(() => {
      try {
        flipRef.current?.update?.();
      } catch (_) {}
      window.dispatchEvent(new Event('resize')); // el propio libro se recoloca
    }, 80);
    return () => clearTimeout(t);
  }, [fs]);

  // Si cambian las páginas (contenido cargado o nuevo), refrescar el libro.
  useEffect(() => {
    if (!flipRef.current) return;
    try {
      flipRef.current.updateFromHtml(libroRef.current.querySelectorAll('.hoja'));
    } catch (_) {}
  }, [total]);

  /**
   * Va a una hoja concreta (índice, buscador, "ir a página").
   * OJO: `flip()` anima el paso de página y en saltos largos se queda a medias
   * (pedir la última hoja te dejaba por la mitad del libro). Para saltar se usa
   * `turnToPage`, que va directo; la animación se reserva para pasar de una en
   * una con las flechas.
   */
  function irAHoja(n) {
    const f = flipRef.current;
    if (!f) return;
    const destino = Math.max(0, Math.min(totalHojas - 1, n));
    try {
      if (typeof f.turnToPage === 'function') f.turnToPage(destino);
      else f.flip(destino);
      setPagina(destino); // por si el componente no avisa del salto
    } catch (_) {}
  }
  const siguiente = () => flipRef.current?.flipNext();
  const anterior = () => flipRef.current?.flipPrev();

  // Teclado (solo con el libro visible y fuera de campos de texto).
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select')) return;
      if (!contRef.current || contRef.current.offsetParent === null) return;
      if (e.key === 'ArrowRight') siguiente();
      if (e.key === 'ArrowLeft') anterior();
      if (e.key === 'Escape' && fs) setFs(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fs]);

  function irAPagina(e) {
    e.preventDefault();
    const n = parseInt(irA, 10);
    if (!isNaN(n) && n >= 1 && n <= total) {
      irAHoja(OFFSET + n - 1);
      setIrA('');
    }
  }

  const enContenido = pagina >= OFFSET && pagina < OFFSET + total;

  /**
   * Qué páginas del contenido se están viendo. A doble página el libro abre de
   * dos en dos (portada sola, luego 1-2, 3-4…), así que el contador enseña las
   * DOS hojas abiertas. Antes solo enseñaba la de la izquierda y, al saltar
   * desde el índice a una página de la derecha, parecía que te llevaba una
   * página antes de la pedida.
   */
  function paginasALaVista() {
    const numero = (hoja) => hoja - OFFSET + 1;
    const dobles = !!libroRef.current?.querySelector('.stf__wrapper.--landscape');
    if (!dobles) return String(numero(pagina));
    const izquierda = pagina % 2 === 1 ? pagina : pagina - 1; // las impares van a la izquierda
    const a = numero(izquierda);
    const b = numero(izquierda + 1);
    if (a < 1) return String(b);
    if (b > total) return String(a);
    return `${a}–${b}`;
  }

  return (
    <div
      className={`libro-wrap ${fs ? 'fs' : ''}`}
      ref={contRef}
      /* proporción del libro ENTERO (alto ÷ ancho): a doble página es la mitad,
         porque se ven dos hojas una al lado de la otra. La usa el CSS de
         pantalla completa para darle el ancho correcto. */
      style={{ '--prop': dobles ? proporcion / 2 : proporcion }}
    >
      {fs && <div className="fs-fondo" onClick={() => setFs(false)} aria-hidden="true" />}

      {!fs && (
        <button className="btn-ampliar" onClick={() => setFs(true)} aria-label="Pantalla completa">
          ⛶<span className="tip-ampliar">Pantalla completa</span>
        </button>
      )}

      {/* El libro: cada .hoja es una página que StPageFlip anima */}
      <div
        className={`libro cubierta-${cubierta}`}
        ref={libroRef}
        style={{ aspectRatio: dobles ? `2 / ${proporcion}` : `1 / ${proporcion}` }}
      >
        {/* portada: la del documento si la hay, si no la tapa de cuero */}
        <div className="hoja tapa" data-density="hard">
          {portada ? (
            <div className="tapa-doc">{portada}</div>
          ) : (
            <div className="tapa-interior">
              <span className="esquina a" /><span className="esquina b" />
              <span className="esquina c" /><span className="esquina d" />
              <span className="portada-titulo">{titulo}</span>
              {sub && <span className="portada-sub">{sub}</span>}
              <span className="portada-abrir mono">ABRIR</span>
            </div>
          )}
        </div>

        {/* índice */}
        <div className="hoja">
          <div className="pagina indice">
            <h4 className="pagina-titulo">Índice</h4>
            <ol className="indice-lista">
              {paginas.map((_, i) => (
                <li key={i}>
                  <button onClick={() => irAHoja(OFFSET + i)}>
                    <span className="indice-titulo">{tituloDe(i)}</span>
                    <span className="indice-num mono">{i + 1}</span>
                  </button>
                </li>
              ))}
            </ol>
            {total === 0 && <p className="muted">Este libro aún no tiene páginas.</p>}
          </div>
        </div>

        {/* contenido */}
        {paginas.map((p, i) => (
          <div className="hoja" key={i}>
            <div className="pagina">
              <div className="pagina-contenido">{p}</div>
              <div className="pagina-pie mono">
                <button className="lnk" onClick={() => irAHoja(1)}>⌂ Índice</button>
                <span>{i + 1} / {total}</span>
              </div>
            </div>
          </div>
        ))}

        {/* contraportada: la del documento si la trae, si no la tapa de cuero */}
        <div className="hoja tapa" data-density="hard">
          {contraportada ? (
            <div className="tapa-doc">{contraportada}</div>
          ) : (
            <div className="tapa-interior">
              <span className="esquina a" /><span className="esquina b" />
              <span className="esquina c" /><span className="esquina d" />
              <span className="portada-sub">Fin</span>
            </div>
          )}
        </div>
      </div>

      {/* controles */}
      <div className="libro-controles">
        <button className="ctrl" onClick={anterior} disabled={!listo || pagina === 0} aria-label="Página anterior">‹</button>
        <button className="ctrl indice-btn" onClick={() => irAHoja(1)} disabled={!listo} aria-label="Ir al índice" title="Índice">⌂</button>
        <form onSubmit={irAPagina} className="ira mono">
          <input value={irA} onChange={(e) => setIrA(e.target.value)} placeholder="pág." aria-label="Ir a página" inputMode="numeric" />
        </form>
        <button className="ctrl" onClick={siguiente} disabled={!listo || pagina >= totalHojas - 1} aria-label="Página siguiente">›</button>

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
                    irAHoja(OFFSET + r.pagina);
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

      {enContenido && <p className="mono posicion">{paginasALaVista()} / {total}</p>}

      {fs && <button className="fs-cerrar" onClick={() => setFs(false)} aria-label="Salir de pantalla completa">✕</button>}

      <style>{css}</style>
    </div>
  );
}

const css = `
.libro-wrap { display: grid; justify-items: center; gap: .7rem; width: 100%; }
.libro { width: min(560px, 92vw); max-height: 74vh; margin: 0 auto; }
.libro .hoja { background: linear-gradient(120deg, var(--paper), var(--parchment) 85%); overflow: hidden; }
.libro .hoja.tapa { background: none; }
/* portada tomada del propio documento: llena la tapa de borde a borde */
.tapa-doc { position: absolute; inset: 0; overflow: hidden; border-radius: 4px; }
.tapa-doc img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* tapas de cuero con esquinas decorativas (guía §27.2) */
.cubierta-cuero-rojo  .tapa-interior { --cuero: var(--leather-red);   --fondo: #241610; }
.cubierta-cuero-verde .tapa-interior { --cuero: var(--leather-green); --fondo: #16200f; }
.cubierta-cuero-negro .tapa-interior { --cuero: var(--leather-black); --fondo: #0d0b09; }
.tapa-interior {
  position: absolute; inset: 0; display: grid; place-content: center; gap: .5rem; text-align: center; padding: 1.4rem;
  background: radial-gradient(120% 100% at 30% 20%, rgba(255,255,255,.08), transparent 55%),
              linear-gradient(135deg, var(--cuero, var(--leather-red)), var(--fondo, #241610));
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px rgba(255,255,255,.05);
}
.tapa-interior .esquina { position: absolute; width: 22px; height: 22px; border: 2px solid rgba(201,164,90,.55); }
.tapa-interior .esquina.a { top: 10px; left: 10px; border-right: 0; border-bottom: 0; }
.tapa-interior .esquina.b { top: 10px; right: 10px; border-left: 0; border-bottom: 0; }
.tapa-interior .esquina.c { bottom: 10px; left: 10px; border-right: 0; border-top: 0; }
.tapa-interior .esquina.d { bottom: 10px; right: 10px; border-left: 0; border-top: 0; }
.portada-titulo { font-family: var(--font-title); font-size: clamp(1.2rem, 3.4vw, 1.8rem); color: var(--gold-soft); letter-spacing: .05em; }
.portada-sub { font-family: var(--font-body); color: var(--parchment); opacity: .8; font-size: .85rem; }
.portada-abrir { margin-top: .8rem; color: var(--gold); font-size: .64rem; letter-spacing: .3em; border: 1px solid rgba(201,164,90,.5); border-radius: 999px; padding: .35rem .8rem; justify-self: center; }

/* páginas de papel */
.pagina { position: absolute; inset: 0; color: var(--ink); padding: 1.1rem 1.2rem 2rem; overflow-y: auto; }
/* Documento maquetado: la imagen llena la hoja de borde a borde (sin el
   margen de papel), tal como se ve el original. */
.pagina:has(.pagina-doc) { padding: 0; overflow: hidden; }
.pagina:has(.pagina-doc) .pagina-contenido { height: 100%; }
.pagina-doc { width: 100%; height: 100%; object-fit: cover; display: block; }
.pagina:has(.pagina-doc) .pagina-pie {
  background: linear-gradient(transparent, rgba(20,12,4,.55));
  color: rgba(255,245,225,.9);
}
.pagina:has(.pagina-doc) .pagina-pie .lnk { color: rgba(255,235,190,.95); }
.pagina-titulo { font-family: var(--font-title); color: #5a3d26; font-size: 1.2rem; margin: 0 0 .7rem; }
.indice-lista { list-style: none; margin: 0; padding: 0; display: grid; gap: .1rem; }
.indice-lista button {
  width: 100%; display: flex; justify-content: space-between; gap: 1rem; align-items: baseline;
  background: none; border: 0; cursor: pointer; padding: .32rem .3rem;
  font-family: var(--font-body); color: var(--ink); font-size: .92rem;
  border-bottom: 1px dotted rgba(90,61,38,.35);
}
.indice-lista button:hover .indice-titulo { color: #7a4a1a; }
.indice-num { color: #8a7350; font-size: .74rem; }
.pagina-contenido { font-family: var(--font-body); line-height: 1.55; }
.pagina-contenido img { width: 100%; height: auto; display: block; }
.pagina-pie {
  position: absolute; left: 0; right: 0; bottom: 0;
  display: flex; justify-content: space-between; align-items: center;
  padding: .3rem .9rem; font-size: .68rem; color: #8a7350;
  background: linear-gradient(transparent, rgba(90,61,38,.08));
}
.pagina-pie .lnk { background: none; border: 0; cursor: pointer; color: #7a4a1a; font: inherit; }
.pagina-pie .lnk:hover { text-decoration: underline; }

/* controles */
.libro-controles { display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; justify-content: center; }
.libro-controles .ctrl {
  width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 1.1rem;
  border: 1px solid rgba(201,164,90,.5); background: rgba(14,17,22,.7); color: var(--gold);
  transition: transform .15s var(--ease);
}
.libro-controles .ctrl:hover:not(:disabled) { transform: scale(1.08); }
.libro-controles .ctrl:disabled { opacity: .35; cursor: default; }
.libro-controles .ira input {
  width: 56px; text-align: center; padding: .32rem .3rem; border-radius: 999px;
  border: 1px solid rgba(201,164,90,.4); background: rgba(0,0,0,.3); color: var(--paper); font-size: .74rem;
}
.posicion { color: var(--stone); font-size: .68rem; }
.buscador { position: relative; }
.buscador input {
  width: 160px; padding: .38rem .7rem; border-radius: 999px;
  border: 1px solid rgba(201,164,90,.4); background: rgba(0,0,0,.3); color: var(--paper);
  font-size: .76rem; font-family: var(--font-body);
}
.buscador-resultados {
  position: absolute; top: calc(100% + 6px); right: 0; z-index: 40;
  width: min(320px, 80vw); max-height: 260px; overflow-y: auto;
  background: linear-gradient(180deg, #2a1e13, #1a120b);
  border: 1px solid rgba(201,164,90,.45); border-radius: 10px;
  box-shadow: 0 14px 40px rgba(0,0,0,.6); padding: .35rem;
}
.buscador-resultados button {
  display: grid; gap: .12rem; width: 100%; text-align: left; cursor: pointer;
  background: none; border: 0; padding: .42rem .5rem; border-radius: 6px;
}
.buscador-resultados button:hover { background: rgba(201,164,90,.12); }
.br-pag { color: var(--gold); font-size: .6rem; letter-spacing: .06em; }
.br-ctx { color: var(--parchment); font-size: .76rem; font-family: var(--font-body); }
.sin-resultados { color: var(--stone); font-size: .7rem; text-align: center; margin: .4rem 0; }

/* pantalla completa (§9.3) */
.btn-ampliar {
  position: relative; justify-self: end;
  width: 34px; height: 34px; border-radius: 8px; cursor: pointer; font-size: 1rem;
  border: 1px solid rgba(201,164,90,.5); background: rgba(14,17,22,.7); color: var(--gold);
}
.btn-ampliar:hover { background: rgba(201,164,90,.18); }
.tip-ampliar {
  position: absolute; right: 0; bottom: calc(100% + 6px);
  background: linear-gradient(#3a2415, #241609); color: var(--paper);
  border: 1px solid rgba(201,164,90,.5); border-radius: 6px;
  font-family: ui-monospace, monospace; font-size: .6rem; letter-spacing: .1em;
  text-transform: uppercase; padding: .25rem .5rem; white-space: nowrap;
  opacity: 0; pointer-events: none; transition: opacity .15s ease;
}
.btn-ampliar:hover .tip-ampliar { opacity: 1; }
.libro-wrap.fs { position: fixed; inset: 0; z-index: 140; display: grid; place-content: center; gap: .5rem; justify-items: center; padding: 1.5vh 2vw; }
.fs-fondo { position: fixed; inset: 0; z-index: -1; background: rgba(5,6,10,.72); backdrop-filter: blur(5px); }
/* En pantalla completa manda el ALTO: el libro llena casi toda la ventana.
   OJO: StPageFlip escribe width:100% en el propio libro, así que su tamaño se
   controla desde AQUÍ, dando ancho a la columna. El ancho sale de la proporción
   de la hoja (--prop = alto ÷ ancho), para que quepa entero de alto. */
.libro-wrap.fs { grid-template-columns: min(94vw, calc(84vh / var(--prop, 1.38))); }
.libro-wrap.fs .libro { max-height: 88vh; }
.fs-cerrar {
  justify-self: end; width: 38px; height: 38px; border-radius: 50%; cursor: pointer; font-weight: 700;
  background: linear-gradient(180deg, #f2dc94, #c9a45a 55%, #87692f);
  border: 1px solid #1c120a; color: #241a12; box-shadow: 0 4px 10px rgba(0,0,0,.5);
}
`;
