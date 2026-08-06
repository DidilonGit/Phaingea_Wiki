import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaign } from '../stores/campaign.js';
import { $user } from '../stores/user.js';
import { puedeGestionar, puedeProponer } from '../lib/permisos.js';
import Modal, { useDobleConfirmacion } from './Modal.jsx';
import {
  suscribirImagenes,
  suscribirTags,
  subirImagen,
  aprobarImagen,
  denegarImagen,
  eliminarImagen,
  actualizarImagen,
  comprimirImagen,
  filtrarPorTags,
  normalizarTag,
  pendientesDe,
  MAX_PENDIENTES,
  MAX_TAGS_NUEVOS,
  TAGS_SUGERIDOS,
} from '../lib/db/galeria.js';
import { notificar, registrar } from '../lib/db/notificaciones.js';

// ============================================================================
// GALERÍA (guía §13) — museo de imágenes.
//
//  · Cuadros con marco de madera, hasta 16 por página, espaciados y sin
//    cortes (§13.1); flechas de madera con navegación circular (§13.3).
//  · Barra de tags expandible con selección múltiple en modo AND (§13.2).
//  · Vista ampliada con título, descripción, tags y autor (§13.4).
//  · Subida con arrastrar y soltar, título y tag obligatorios, hasta tres
//    tags nuevos, vista previa y envío a aprobación; máximo cinco pendientes
//    por jugador (§13.5-§13.6).
//  · Moderación del máster: aprobar, denegar, editar, eliminar y subir
//    directamente (§13.7).
// ============================================================================

const POR_PAGINA = 16;

export default function GaleriaView() {
  const campana = useStore($campaign);
  const user = useStore($user);
  const [imagenes, setImagenes] = useState([]);
  const [tags, setTags] = useState([]);
  const [activos, setActivos] = useState([]);
  const [tagsAbiertos, setTagsAbiertos] = useState(false);
  const [pagina, setPagina] = useState(0);
  const [ampliada, setAmpliada] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [verPendientes, setVerPendientes] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  useEffect(() => {
    if (!campana?.id) return;
    const offs = [suscribirImagenes(campana.id, setImagenes), suscribirTags(campana.id, setTags)];
    return () => offs.forEach((f) => f());
  }, [campana?.id]);

  useEffect(() => setPagina(0), [activos.join(), campana?.id, verPendientes]);

  if (!montado) return null;

  const esGestor = puedeGestionar(user, campana);
  const puedeSubir = puedeProponer(user, campana);

  const aprobadas = imagenes.filter((i) => i.estado === 'aprobada');
  const pendientes = imagenes.filter((i) => i.estado === 'pendiente');
  const misPendientes = user ? pendientes.filter((i) => i.autor === user.nombre) : [];

  // Al aprobar (o denegar) la última pendiente, la lista de pendientes se
  // queda vacía: se vuelve solo a la galería, que si no parecía que se habían
  // borrado todas las imágenes hasta salir y entrar de la categoría.
  const pendientesVisibles = esGestor ? pendientes : misPendientes;
  const enPendientes = verPendientes && pendientesVisibles.length > 0;
  const base = enPendientes ? pendientesVisibles : aprobadas;
  const filtradas = filtrarPorTags(base, activos);

  // paginación circular sobre el resultado del filtro (§13.3)
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA));
  const pag = ((pagina % totalPaginas) + totalPaginas) % totalPaginas;
  const visibles = filtradas.slice(pag * POR_PAGINA, pag * POR_PAGINA + POR_PAGINA);

  const tagsMostrados = tagsAbiertos ? tags : tags.slice(0, 8);

  return (
    <div className="galeria-view">
      {/* ---- barra de tags + subida ---- */}
      <div className="barra-tags">
        <div className="chips">
          <button className={`chip ${activos.length === 0 ? 'activo' : ''}`} onClick={() => setActivos([])}>Todos</button>
          {tagsMostrados.map((t) => (
            <button
              key={t}
              className={`chip ${activos.includes(t) ? 'activo' : ''}`}
              onClick={() => setActivos((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]))}
            >
              {t}
            </button>
          ))}
          {tags.length > 8 && (
            <button className="chip mas" onClick={() => setTagsAbiertos((v) => !v)}>
              {tagsAbiertos ? '− menos' : `+ ${tags.length - 8} más`}
            </button>
          )}
        </div>

        <div className="acciones-galeria">
          {(misPendientes.length > 0 || (esGestor && pendientes.length > 0)) && (
            <button className="btn ghost" onClick={() => setVerPendientes((v) => !v)}>
              {enPendientes ? 'Ver galería' : `Pendientes (${pendientesVisibles.length})`}
            </button>
          )}
          {puedeSubir && (
            <button className="btn subir" onClick={() => setSubiendo(true)} title="Proponer una imagen">
              ⬆ <span>Subir imagen</span>
            </button>
          )}
        </div>
      </div>

      {activos.length > 1 && (
        <p className="mono muted center" style={{ fontSize: '.66rem' }}>
          Mostrando solo imágenes con TODOS los tags seleccionados.
        </p>
      )}

      {/* ---- exposición ---- */}
      {filtradas.length === 0 ? (
        <div className="empty">
          <div className="ico">🖼️</div>
          <p className="muted">{enPendientes ? 'No hay imágenes pendientes.' : 'La galería está vacía.'}</p>
        </div>
      ) : (
        <div className="exposicion">
          {totalPaginas > 1 && (
            <button className="flecha-madera izq" onClick={() => setPagina((p) => p - 1)} aria-label="Página anterior">‹</button>
          )}

          <div className="cuadros">
            {visibles.map((img) => (
              <figure
                key={img.id}
                className={`cuadro ${img.ratio < 0.9 ? 'v' : img.ratio > 1.3 ? 'h' : ''}`}
                onClick={() => setAmpliada(img)}
                tabIndex={0}
              >
                <img src={img.imagen} alt={img.titulo} />
                <figcaption>{img.titulo}</figcaption>
                {img.estado === 'pendiente' && <span className="chip-pendiente mono">pendiente</span>}
              </figure>
            ))}
          </div>

          {totalPaginas > 1 && (
            <button className="flecha-madera der" onClick={() => setPagina((p) => p + 1)} aria-label="Página siguiente">›</button>
          )}
        </div>
      )}

      {totalPaginas > 1 && <p className="mono muted center">Página {pag + 1} / {totalPaginas}</p>}

      {/* ---- vista ampliada ---- */}
      {ampliada && (
        <div className="lightbox" onClick={() => setAmpliada(null)}>
          <div className="marco-grande" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={() => setAmpliada(null)} aria-label="Cerrar">✕</button>
            <img src={ampliada.imagen} alt={ampliada.titulo} />
            <div className="pie-ampliada">
              <h4>{ampliada.titulo}</h4>
              {ampliada.descripcion && <p>{ampliada.descripcion}</p>}
              <div className="chips">
                {(ampliada.tags || []).map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
              <p className="mono muted">Subido por {ampliada.autor}</p>

              {esGestor && (
                <div className="mod-imagen">
                  {ampliada.estado === 'pendiente' && (
                    <>
                      <button className="btn" onClick={async () => {
                        await aprobarImagen(campana.id, ampliada.id);
                        await notificar(campana.id, [ampliada.autor], { asunto: 'Imagen aprobada', tipo: 'galeria', contenido: `Tu imagen «${ampliada.titulo}» ya está en la galería.` });
                        await registrar(campana.id, { tipo: 'imagen_aprobada', actor: user?.nombre, resumen: ampliada.titulo });
                        setAmpliada(null);
                      }}>Aprobar</button>
                      <button className="btn ghost" onClick={async () => {
                        await denegarImagen(campana.id, ampliada.id);
                        await notificar(campana.id, [ampliada.autor], { asunto: 'Imagen denegada', tipo: 'galeria', contenido: `Tu propuesta «${ampliada.titulo}» no se ha publicado.` });
                        await registrar(campana.id, { tipo: 'imagen_denegada', actor: user?.nombre, resumen: ampliada.titulo });
                        setAmpliada(null);
                      }}>Denegar</button>
                    </>
                  )}
                  <BorrarImagen campanaId={campana.id} id={ampliada.id} alBorrar={() => setAmpliada(null)} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {subiendo && (
        <SubirImagen
          campanaId={campana.id}
          user={user}
          tagsExistentes={tags}
          aprobadaDirecta={esGestor}
          campana={campana}
          onCerrar={() => setSubiendo(false)}
        />
      )}

      <style>{css}</style>
    </div>
  );
}

function BorrarImagen({ campanaId, id, alBorrar }) {
  const del = useDobleConfirmacion(async () => {
    await eliminarImagen(campanaId, id);
    alBorrar();
  });
  return (
    <button className="btn ghost" style={{ borderColor: '#a44', color: '#e99' }} onClick={del.pulsar}>
      {del.texto('Eliminar')}
    </button>
  );
}

function SubirImagen({ campanaId, user, tagsExistentes, aprobadaDirecta, campana, onCerrar }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [seleccion, setSeleccion] = useState([]);
  const [nuevos, setNuevos] = useState([]);
  const [tagNuevo, setTagNuevo] = useState('');
  const [previa, setPrevia] = useState(null);
  const [error, setError] = useState('');
  const [ocupado, setOcupado] = useState(false);
  const inputFile = useRef(null);

  async function elegirArchivo(archivo) {
    if (!archivo) return;
    setError('');
    try {
      const { dataUrl, ratio } = await comprimirImagen(archivo);
      setPrevia({ dataUrl, ratio });
    } catch (e) {
      setError(e.message);
    }
  }

  function anadirTagNuevo() {
    const t = normalizarTag(tagNuevo);
    if (!t) return;
    if (tagsExistentes.includes(t) || nuevos.includes(t)) {
      setSeleccion((s) => (s.includes(t) ? s : [...s, t]));
      setTagNuevo('');
      return;
    }
    if (nuevos.length >= MAX_TAGS_NUEVOS) {
      setError(`Solo puedes crear ${MAX_TAGS_NUEVOS} tags nuevos en una misma subida.`);
      return;
    }
    setNuevos((n) => [...n, t]);
    setSeleccion((s) => [...s, t]);
    setTagNuevo('');
  }

  async function enviar(e) {
    e.preventDefault();
    setError('');
    setOcupado(true);
    try {
      await subirImagen(campanaId, {
        titulo,
        descripcion,
        tags: seleccion,
        autor: user.nombre,
        imagen: previa?.dataUrl,
        ratio: previa?.ratio,
        aprobadaDirecta,
      });
      if (!aprobadaDirecta) {
        // Avisar a quienes pueden aprobarla (guía §13.7)
        const aprobadores = Object.keys(campana?.masters || {});
        await notificar(campanaId, aprobadores, {
          asunto: 'Solicitud pendiente', tipo: 'galeria',
          contenido: `${user.nombre} ha propuesto la imagen «${titulo}» para la galería.`,
        });
      }
      onCerrar();
    } catch (err) {
      setError(err.message);
    } finally {
      setOcupado(false);
    }
  }

  const todos = [...new Set([...TAGS_SUGERIDOS, ...tagsExistentes, ...nuevos])];

  return (
    <Modal abierto onCerrar={onCerrar} titulo={aprobadaDirecta ? 'Subir imagen' : 'Proponer imagen'} ancho="560px">
      <form onSubmit={enviar} className="stack">
        <div
          className="zona-soltar"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            elegirArchivo(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputFile.current?.click()}
        >
          {previa ? (
            <img src={previa.dataUrl} alt="Vista previa" />
          ) : (
            <p className="mono muted">Arrastra una imagen aquí o pulsa para buscarla</p>
          )}
          <input
            ref={inputFile}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => elegirArchivo(e.target.files?.[0])}
          />
        </div>

        <label className="lbl">Título (obligatorio)
          <input className="inp" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </label>
        <label className="lbl">Descripción breve (opcional)
          <input className="inp" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>

        <div>
          <p className="mono muted" style={{ margin: '0 0 .3rem' }}>Tags (al menos uno)</p>
          <div className="chips">
            {todos.map((t) => (
              <button
                type="button"
                key={t}
                className={`chip ${seleccion.includes(t) ? 'activo' : ''}`}
                onClick={() => setSeleccion((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))}
              >
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '.4rem', marginTop: '.5rem' }}>
            <input
              className="inp"
              placeholder={`Crear tag nuevo (${nuevos.length}/${MAX_TAGS_NUEVOS})`}
              value={tagNuevo}
              onChange={(e) => setTagNuevo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), anadirTagNuevo())}
            />
            <button type="button" className="btn ghost" onClick={anadirTagNuevo}>Añadir</button>
          </div>
        </div>

        {error && <p style={{ color: '#f0a29c' }}>{error}</p>}
        {!aprobadaDirecta && (
          <p className="mono muted" style={{ fontSize: '.66rem' }}>
            Se enviará al máster para su aprobación (máximo {MAX_PENDIENTES} pendientes a la vez).
          </p>
        )}

        <div style={{ display: 'flex', gap: '.6rem' }}>
          <button className="btn" type="submit" disabled={ocupado}>
            {ocupado ? 'Enviando…' : aprobadaDirecta ? 'Subir' : 'Enviar a aprobación'}
          </button>
          <button className="btn ghost" type="button" onClick={onCerrar}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}

const css = `
.galeria-view { display: grid; gap: .9rem; }
.barra-tags { display: flex; gap: .8rem; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; }
.barra-tags .chips { flex: 1; justify-content: flex-start; }
.chip.mas { border-style: dashed; }
.acciones-galeria { display: flex; gap: .5rem; }
.btn.subir { display: inline-flex; align-items: center; gap: .4rem; }
.exposicion { display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: .6rem; }
.cuadros { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1.1rem; align-items: start; }
.cuadro {
  position: relative; margin: 0; cursor: pointer;
  border: 9px solid #3a2a18; border-radius: 3px; background: #201812;
  box-shadow: 0 10px 24px rgba(0,0,0,.55), inset 0 0 0 2px rgba(201,164,90,.35);
  transition: transform .18s var(--ease), filter .18s var(--ease);
}
.cuadro:hover { transform: translateY(-3px); filter: brightness(1.08); }
.cuadro img { width: 100%; display: block; }
.cuadro figcaption {
  padding: .35rem .5rem; text-align: center; background: rgba(0,0,0,.35);
  font-family: var(--font-body); font-size: .8rem; color: var(--paper);
}
.chip-pendiente {
  position: absolute; top: .3rem; right: .3rem; font-size: .55rem; letter-spacing: .1em;
  text-transform: uppercase; background: rgba(224,192,122,.9); color: #241a12;
  border-radius: 999px; padding: .1rem .4rem;
}
.flecha-madera {
  width: 40px; height: 70px; border-radius: 6px; cursor: pointer; font-size: 1.5rem;
  color: var(--gold); border: 1px solid rgba(0,0,0,.5);
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.3)), linear-gradient(135deg,#6b4a2c,#3a2618);
  box-shadow: 0 6px 16px rgba(0,0,0,.5);
}
.flecha-madera:hover { filter: brightness(1.15); }
.lightbox {
  position: fixed; inset: 0; z-index: 150; display: grid; place-items: center; padding: 4vh 4vw;
  background: rgba(5,6,10,.82); backdrop-filter: blur(6px);
}
.marco-grande {
  position: relative; max-width: min(92vw, 900px); max-height: 92vh; overflow: auto;
  border: 12px solid #3a2a18; border-radius: 4px; background: #1a120b;
  box-shadow: 0 26px 70px rgba(0,0,0,.7), inset 0 0 0 2px rgba(201,164,90,.4);
}
.marco-grande > img { width: 100%; display: block; max-height: 66vh; object-fit: contain; background: #0d0a07; }
.pie-ampliada { padding: .9rem 1.1rem; display: grid; gap: .5rem; }
.pie-ampliada h4 { font-family: var(--font-title); color: var(--gold-soft); margin: 0; font-size: 1.15rem; }
.pie-ampliada p { margin: 0; font-size: .88rem; color: var(--paper); }
.marco-grande .cerrar {
  position: absolute; top: .5rem; right: .5rem; z-index: 2; width: 30px; height: 30px; border-radius: 50%;
  background: rgba(14,17,22,.8); border: 1px solid rgba(201,164,90,.5); color: var(--gold); cursor: pointer;
}
.mod-imagen { display: flex; gap: .5rem; flex-wrap: wrap; margin-top: .3rem; }
.zona-soltar {
  border: 2px dashed rgba(201,164,90,.45); border-radius: 10px; min-height: 150px;
  display: grid; place-items: center; cursor: pointer; padding: .8rem; text-align: center;
}
.zona-soltar:hover { border-color: var(--gold); }
.zona-soltar img { max-height: 220px; max-width: 100%; border-radius: 6px; }
.lbl { display: grid; gap: .25rem; font-family: var(--font-ui); font-size: .78rem; color: var(--parchment); }
.inp { padding: .45rem .6rem; border-radius: 7px; border: 1px solid rgba(201,164,90,.35);
  background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; flex: 1; }
`;
