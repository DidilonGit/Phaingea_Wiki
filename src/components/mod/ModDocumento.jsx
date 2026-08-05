import { useEffect, useRef, useState } from 'react';
import { db } from '../../lib/firebase.js';
import { ref, onValue, update } from 'firebase/database';
import { comprimirImagen } from '../../lib/db/galeria.js';
import BotonMod from '../BotonMod.jsx';
import { MARCA_SALTO } from '../../lib/markdown.js';

// ============================================================================
// MODERACIÓN DE UNA CATEGORÍA-LIBRO (guía §24, §27).
//
// Sirve para Capilla y Taller: el máster elige entre
//   · DOCUMENTO MAQUETADO -> sube las páginas como imágenes (se respeta su
//     diseño tal cual) o pega las URLs de las páginas.
//   · TEXTO PROPIO -> markdown, con ===salto=== para forzar página.
// También edita el título y el subtítulo de la portada, y el TÍTULO DE CADA
// PÁGINA (`paginasTitulos`, en paralelo a `paginasUrl`), que es lo que sale en
// el índice del libro. Si una página no tiene título, el índice pone su número.
//
//   <ModDocumento nodo="capilla" campanaId="…" campoMd="deidadesMd" />
// ============================================================================

export default function ModDocumento({
  nodo,
  campanaId,
  campoMd,
  visible,
  heredadoDe = '', // nombre de la campaña de la que se hereda ('' si es propia)
  alDejarHerencia = null, // corta la herencia para poder editar aquí
}) {
  const [datos, setDatos] = useState({});
  const [modo, setModo] = useState('documento'); // 'documento' | 'texto'
  const [subiendo, setSubiendo] = useState(false);
  const [arrastrando, setArrastrando] = useState(null); // índice que se está moviendo
  const [encima, setEncima] = useState(null); // hueco sobre el que se soltaría
  const [aviso, setAviso] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!campanaId) return;
    return onValue(ref(db, `${nodo}/${campanaId}`), (snap) => {
      const v = snap.exists() ? snap.val() : {};
      setDatos(v);
      setModo(Array.isArray(v.paginasUrl) && v.paginasUrl.length ? 'documento' : v[campoMd] ? 'texto' : 'documento');
    });
  }, [nodo, campanaId]);

  const paginas = Array.isArray(datos.paginasUrl) ? datos.paginasUrl : [];
  // Títulos en paralelo a las páginas (para el índice del libro).
  const titulos = paginas.map((_, i) => (Array.isArray(datos.paginasTitulos) ? datos.paginasTitulos[i] : '') || '');

  async function guardar(cambios) {
    await update(ref(db, `${nodo}/${campanaId}`), cambios);
    setAviso('Guardado.');
    setTimeout(() => setAviso(''), 2500);
  }

  async function subirPaginas(archivos) {
    if (!archivos?.length) return;
    setSubiendo(true);
    setAviso('');
    try {
      const nuevas = [];
      for (const f of [...archivos].sort((a, b) => a.name.localeCompare(b.name, 'es', { numeric: true }))) {
        const { dataUrl } = await comprimirImagen(f, { maxLado: 1400, maxBytes: 260 * 1024 });
        nuevas.push(dataUrl);
      }
      await guardar({
        paginasUrl: [...paginas, ...nuevas],
        paginasTitulos: [...titulos, ...nuevas.map(() => '')],
      });
    } catch (e) {
      setAviso('No se pudo subir: ' + e.message);
    } finally {
      setSubiendo(false);
    }
  }

  async function quitarPagina(i) {
    await guardar({
      paginasUrl: paginas.filter((_, j) => j !== i),
      paginasTitulos: titulos.filter((_, j) => j !== i),
    });
  }

  async function moverPagina(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= paginas.length) return;
    const url = [...paginas];
    const tit = [...titulos];
    [url[i], url[j]] = [url[j], url[i]];
    [tit[i], tit[j]] = [tit[j], tit[i]];
    await guardar({ paginasUrl: url, paginasTitulos: tit });
  }

  /** Saca la página `desde` y la vuelve a meter en la posición `hasta`. */
  async function reordenarPagina(desde, hasta) {
    if (desde === hasta || desde == null || hasta == null) return;
    const url = [...paginas];
    const tit = [...titulos];
    const [u] = url.splice(desde, 1);
    const [t] = tit.splice(desde, 1);
    url.splice(hasta, 0, u);
    tit.splice(hasta, 0, t);
    await guardar({ paginasUrl: url, paginasTitulos: tit });
  }

  /** Cómo se llama cada hoja según qué tapas traiga el documento. */
  function etiquetaPagina(i) {
    if (i === 0 && datos.portadaPropia !== false) return 'portada';
    if (i === paginas.length - 1 && datos.contraportadaPropia) return 'contraportada';
    return String(i + 1);
  }

  /** Renombra una página (lo que se ve en el índice del libro). */
  async function tituloPagina(i, texto) {
    if (titulos[i] === texto) return;
    const tit = [...titulos];
    tit[i] = texto;
    await guardar({ paginasTitulos: tit });
  }

  return (
    <BotonMod sala visible={visible} titulo="Contenido de la categoría" etiqueta="Moderar categoría">
      {heredadoDe ? (
        // Categoría heredada (§7): el botón existe igual en todas las campañas,
        // pero aquí lo único que se puede hacer es cortar la herencia.
        <div className="stack">
          <p>
            Esta categoría muestra el contenido de <b>{heredadoDe}</b>. Mientras lo herede no se
            puede editar desde aquí: lo que cambies en la campaña de origen se ve en todas las que
            heredan de ella.
          </p>
          <p className="mono muted" style={{ fontSize: '.68rem' }}>
            Si cortas la herencia, esta campaña arranca con la categoría vacía y podrás subir su
            propio documento o escribir su texto. Se puede volver a heredar desde Moderación.
          </p>
          <div>
            <button className="btn" onClick={() => alDejarHerencia?.()} disabled={!alDejarHerencia}>
              Dejar de heredar y editar aquí
            </button>
          </div>
        </div>
      ) : (
      <div className="stack">
            <label className="lbl">Título de la portada
              <input
                className="inp"
                defaultValue={datos.titulo || ''}
                onBlur={(e) => guardar({ titulo: e.target.value })}
              />
            </label>
            <label className="lbl">Subtítulo
              <input
                className="inp"
                defaultValue={datos.subtitulo || ''}
                onBlur={(e) => guardar({ subtitulo: e.target.value })}
              />
            </label>

            <div className="chips" style={{ justifyContent: 'flex-start' }}>
              <button className={`chip ${modo === 'documento' ? 'activo' : ''}`} onClick={() => setModo('documento')}>
                Documento maquetado
              </button>
              <button className={`chip ${modo === 'texto' ? 'activo' : ''}`} onClick={() => setModo('texto')}>
                Texto propio
              </button>
            </div>

            {modo === 'documento' ? (
              <>
                <p className="mono muted" style={{ fontSize: '.68rem' }}>
                  Cada imagen es una página y se muestra tal cual, respetando su diseño. Si tienes un PDF,
                  exporta sus páginas a imagen y súbelas ordenadas. El <b>título de cada página</b> es lo
                  que aparece en el índice del libro.
                </p>

                {/* ¿el documento trae sus propias tapas o se usan las de la web? */}
                <div className="tapas">
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={datos.portadaPropia !== false}
                      onChange={(e) => guardar({ portadaPropia: e.target.checked })}
                    />
                    La <b>primera página</b> es la portada del documento
                  </label>
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={!!datos.contraportadaPropia}
                      onChange={(e) => guardar({ contraportadaPropia: e.target.checked })}
                    />
                    La <b>última página</b> es la contraportada
                  </label>
                  <p className="mono muted" style={{ fontSize: '.64rem', margin: 0 }}>
                    Lo que dejes sin marcar usa la tapa de cuero de la web, y esa página pasa a ser una
                    página normal del libro.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                  <button className="btn" onClick={() => inputRef.current?.click()} disabled={subiendo}>
                    {subiendo ? 'Subiendo…' : '+ Añadir páginas'}
                  </button>
                  {paginas.length > 0 && (
                    <button className="btn ghost" onClick={() => guardar({ paginasUrl: [] })}>Quitar todas</button>
                  )}
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={(e) => subirPaginas(e.target.files)}
                  />
                </div>

                {paginas.length === 0 ? (
                  <p className="muted">Todavía no hay páginas.</p>
                ) : (
                  <>
                    <p className="mono muted" style={{ fontSize: '.64rem', margin: 0 }}>
                      Arrastra una página para cambiarla de sitio, o usa ‹ › para moverla un puesto.
                      La ✕ borra esa página sola.
                    </p>
                    <div className="rejilla-paginas">
                      {paginas.map((url, i) => (
                        <div
                          key={i}
                          className={`mini-pagina ${arrastrando === i ? 'cogida' : ''} ${encima === i ? 'diana' : ''}`}
                          draggable
                          onDragStart={(e) => {
                            setArrastrando(i);
                            e.dataTransfer.effectAllowed = 'move';
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            if (encima !== i) setEncima(i);
                          }}
                          onDragEnd={() => {
                            setArrastrando(null);
                            setEncima(null);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            reordenarPagina(arrastrando, i);
                            setArrastrando(null);
                            setEncima(null);
                          }}
                        >
                          <div className="mini-lienzo">
                            <img src={url} alt={`Página ${i + 1}`} draggable="false" />
                            <span className="mono num">{etiquetaPagina(i)}</span>
                          </div>
                          <input
                            className="mini-titulo"
                            defaultValue={titulos[i]}
                            placeholder={etiquetaPagina(i)}
                            title="Título en el índice del libro"
                            onBlur={(e) => tituloPagina(i, e.target.value.trim())}
                          />
                          <div className="mini-acciones">
                            <button onClick={() => moverPagina(i, -1)} disabled={i === 0} title="Mover una posición antes">‹</button>
                            <button onClick={() => moverPagina(i, 1)} disabled={i === paginas.length - 1} title="Mover una posición después">›</button>
                            <button className="borrar" onClick={() => quitarPagina(i)} title="Borrar esta página">✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <label className="lbl">Contenido en markdown
                  <textarea
                    className="inp"
                    style={{ minHeight: '220px', fontFamily: 'ui-monospace, monospace' }}
                    defaultValue={datos[campoMd] || ''}
                    onBlur={(e) => guardar({ [campoMd]: e.target.value })}
                  />
                </label>
                <p className="mono muted" style={{ fontSize: '.66rem' }}>
                  <code>#</code> títulos · <code>**negrita**</code> · <code>- listas</code> ·{' '}
                  <code>&gt; cita</code>. Escribe <code>{MARCA_SALTO}</code> en una línea suelta para cambiar de página.
                </p>
              </>
            )}

            {aviso && <p style={{ color: aviso.startsWith('No') ? '#f0a29c' : '#9fd07a' }}>{aviso}</p>}
        <p className="mono muted" style={{ fontSize: '.64rem' }}>Los cambios se guardan al salir de cada campo.</p>
      </div>
      )}
      <style>{css}</style>
    </BotonMod>
  );
}

const css = `
.rejilla-paginas {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
  gap: .6rem; max-height: 46vh; overflow-y: auto; padding: .2rem;
}
.mini-titulo {
  width: 100%; border: 1px solid rgba(201,164,90,.25); border-radius: 4px;
  background: rgba(0,0,0,.35); color: var(--paper);
  font-family: var(--font-body); font-size: .68rem; padding: .18rem .3rem; text-align: center;
}
.mini-titulo::placeholder { color: rgba(232,223,200,.35); }
.mini-titulo:focus { outline: 1px solid rgba(201,164,90,.6); }
.mini-pagina {
  display: grid; gap: .25rem; border: 2px solid #3a2a18; border-radius: 5px;
  background: #201812; padding: .25rem; cursor: grab;
}
.mini-pagina.cogida { opacity: .45; }
.mini-pagina.diana { border-color: var(--gold); box-shadow: 0 0 0 2px rgba(201,164,90,.35); }
.mini-lienzo { position: relative; height: 120px; overflow: hidden; border-radius: 3px; background: #120d09; }
.mini-lienzo img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
.mini-pagina .num {
  position: absolute; top: 3px; left: 3px; background: rgba(0,0,0,.72); color: var(--paper);
  font-size: .56rem; letter-spacing: .06em; text-transform: uppercase;
  padding: .05rem .3rem; border-radius: 3px;
}
.mini-acciones { display: flex; gap: .25rem; }
.mini-acciones button {
  flex: 1; height: 26px; border-radius: 5px; cursor: pointer; font-size: .9rem; line-height: 1;
  background: rgba(201,164,90,.14); border: 1px solid rgba(201,164,90,.4); color: var(--gold);
}
.mini-acciones button:hover:not(:disabled) { background: rgba(201,164,90,.32); }
.mini-acciones button:disabled { opacity: .3; cursor: default; }
.mini-acciones .borrar { color: #f0a29c; border-color: rgba(200,110,100,.5); background: rgba(164,68,58,.16); }
.mini-acciones .borrar:hover { background: rgba(164,68,58,.4); }
.tapas { display: grid; gap: .3rem; padding: .6rem .7rem; border-radius: 8px;
  border: 1px solid rgba(201,164,90,.25); background: rgba(0,0,0,.22); }
.check { display: flex; align-items: center; gap: .5rem; cursor: pointer;
  font-family: var(--font-body); font-size: .84rem; color: var(--paper); }
.lbl { display: grid; gap: .25rem; font-family: var(--font-ui); font-size: .78rem; color: var(--parchment); }
.inp { padding: .45rem .6rem; border-radius: 7px; border: 1px solid rgba(201,164,90,.35);
  background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; width: 100%; }
`;
