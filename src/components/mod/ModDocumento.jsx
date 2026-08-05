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
// También edita el título y el subtítulo de la portada.
//
//   <ModDocumento nodo="capilla" campanaId="…" campoMd="deidadesMd" />
// ============================================================================

export default function ModDocumento({ nodo, campanaId, campoMd, visible }) {
  const [datos, setDatos] = useState({});
  const [modo, setModo] = useState('documento'); // 'documento' | 'texto'
  const [subiendo, setSubiendo] = useState(false);
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
      await guardar({ paginasUrl: [...paginas, ...nuevas] });
    } catch (e) {
      setAviso('No se pudo subir: ' + e.message);
    } finally {
      setSubiendo(false);
    }
  }

  async function quitarPagina(i) {
    const resto = paginas.filter((_, j) => j !== i);
    await guardar({ paginasUrl: resto });
  }

  async function moverPagina(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= paginas.length) return;
    const copia = [...paginas];
    [copia[i], copia[j]] = [copia[j], copia[i]];
    await guardar({ paginasUrl: copia });
  }

  return (
    <BotonMod visible={visible} titulo="Contenido de la categoría">
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
                  exporta sus páginas a imagen y súbelas ordenadas.
                </p>
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
                  <div className="rejilla-paginas">
                    {paginas.map((url, i) => (
                      <div key={i} className="mini-pagina">
                        <img src={url} alt={`Página ${i + 1}`} />
                        <span className="mono num">{i + 1}</span>
                        <div className="mini-acciones mono">
                          <button onClick={() => moverPagina(i, -1)} title="Antes">↑</button>
                          <button onClick={() => moverPagina(i, 1)} title="Después">↓</button>
                          <button onClick={() => quitarPagina(i)} style={{ color: '#e99' }} title="Quitar">✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
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
      <style>{css}</style>
    </BotonMod>
  );
}

const css = `
.rejilla-paginas { display: grid; grid-template-columns: repeat(auto-fill, minmax(86px, 1fr)); gap: .5rem; max-height: 300px; overflow-y: auto; }
.mini-pagina { position: relative; border: 2px solid #3a2a18; border-radius: 3px; overflow: hidden; background: #201812; }
.mini-pagina img { width: 100%; display: block; }
.mini-pagina .num {
  position: absolute; top: 2px; left: 2px; background: rgba(0,0,0,.6); color: var(--paper);
  font-size: .58rem; padding: 0 .25rem; border-radius: 3px;
}
.mini-acciones { display: flex; justify-content: center; gap: .3rem; background: rgba(0,0,0,.45); }
.mini-acciones button { background: none; border: 0; cursor: pointer; color: var(--parchment); font-size: .68rem; padding: .1rem .2rem; }
.mini-acciones button:hover { color: var(--gold); }
.lbl { display: grid; gap: .25rem; font-family: var(--font-ui); font-size: .78rem; color: var(--parchment); }
.inp { padding: .45rem .6rem; border-radius: 7px; border: 1px solid rgba(201,164,90,.35);
  background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; width: 100%; }
`;
