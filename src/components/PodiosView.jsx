import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaign } from '../stores/campaign.js';
import { $user } from '../stores/user.js';
import { puedeGestionar } from '../lib/permisos.js';
import { suscribirPersonajes, ordenAlfabetico, gruposDe, calcularXp, ESTADOS } from '../lib/db/personajes.js';
import { suscribirSesiones } from '../lib/db/sesiones.js';
import { paginar, tituloDePagina } from '../lib/markdown.js';
import { nivelDeXp } from '../lib/xp.js';
import BarraXP from './BarraXP.jsx';
import Libro from './Libro.jsx';
import Comentarios from './Comentarios.jsx';

// ============================================================================
// PODIOS (guía §11) — y LEYENDAS en Base de Phaingea (§12).
//
//  · El personaje en el centro sobre un podio de mármol con focos; se muestra
//    su ILUSTRACIÓN COMPLETA, no el recorte del avatar (§11.1).
//  · Alrededor: nombre con los colores de la campaña, edad, raza, nivel,
//    estado y jugador (§11.2).
//  · Flechas a los lados, orden alfabético y navegación circular (§11.3).
//  · Filtros por estado y por grupo (§11.4-§11.5).
//  · Botones: ampliar personaje y mostrar/ocultar diario (§11.6).
//  · Diario: markdown -> libro de máximo 8 páginas, con la barra de XP en la
//    primera (§11.7).
//  · Comentarios del personaje visible, con aprobación (§11.8).
//  · Privacidad: si está oculto, los demás ven barras negras y la imagen
//    tachada; máster y owner lo ven entero (§19.5).
// ============================================================================

const MAX_PAGINAS_DIARIO = 8;

export default function PodiosView() {
  const campana = useStore($campaign);
  const user = useStore($user);
  const [personajes, setPersonajes] = useState([]);
  const [sesiones, setSesiones] = useState([]);
  const [indice, setIndice] = useState(0);
  const [estados, setEstados] = useState([]); // vacío = todos
  const [grupo, setGrupo] = useState(null);
  const [ampliado, setAmpliado] = useState(false);
  const [diarioAbierto, setDiarioAbierto] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  useEffect(() => {
    if (!campana?.id) return;
    const off1 = suscribirPersonajes(campana.id, setPersonajes);
    const off2 = suscribirSesiones(campana.id, setSesiones);
    return () => {
      off1();
      off2();
    };
  }, [campana?.id]);

  useEffect(() => {
    setIndice(0);
    setDiarioAbierto(false);
  }, [campana?.id, estados.join(), grupo]);

  if (!montado) return null;

  const esBase = !!campana?.esBase;
  const esGestor = puedeGestionar(user, campana);
  const grupos = gruposDe(personajes);

  // filtros
  let lista = ordenAlfabetico(personajes);
  if (estados.length) lista = lista.filter((p) => estados.includes(p.estado));
  if (grupo) lista = lista.filter((p) => (p.grupos || []).includes(grupo));

  const total = lista.length;
  const actual = total ? lista[Math.min(indice, total - 1)] : null;

  // navegación circular
  const anterior = () => setIndice((i) => (i - 1 + total) % total);
  const siguiente = () => setIndice((i) => (i + 1) % total);

  function alternarEstado(e) {
    setEstados((prev) => (prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]));
  }

  if (total === 0) {
    return (
      <div className="empty">
        <div className="ico">🏛️</div>
        <p className="muted">
          {esBase ? 'Aún no hay leyendas registradas.' : 'Esta campaña todavía no tiene personajes.'}
        </p>
      </div>
    );
  }

  // privacidad (§19.5)
  const oculto = !!actual?.oculto && !esGestor && actual?.propietario !== user?.nombre;
  const xp = calcularXp(actual, sesiones);
  const progresion = campana?.progresionXP || 'media';

  // diario paginado
  const htmlDiario = paginar(actual?.diarioMd || '', { maxPaginas: MAX_PAGINAS_DIARIO });
  const paginasDiario = htmlDiario.map((h, i) => (
    <div key={i} className="pagina-md">
      {i === 0 && (
        <div className="diario-xp">
          <BarraXP general={xp.general} extra={xp.extra} progresion={progresion} compacta />
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: h }} />
    </div>
  ));

  return (
    <div className="podios">
      {/* ---- filtros ---- */}
      <div className="chips">
        <button className={`chip ${estados.length === 0 ? 'activo' : ''}`} onClick={() => setEstados([])}>
          Todos
        </button>
        {(esBase ? ['historico', ...ESTADOS] : ESTADOS).map((e) => (
          <button key={e} className={`chip ${estados.includes(e) ? 'activo' : ''}`} onClick={() => alternarEstado(e)}>
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </button>
        ))}
        {grupos.length > 0 && <span className="separador" aria-hidden="true" />}
        {grupos.map((g) => (
          <button key={g} className={`chip ${grupo === g ? 'activo' : ''}`} onClick={() => setGrupo(grupo === g ? null : g)}>
            {g}
          </button>
        ))}
      </div>

      {/* ---- escena del podio ---- */}
      <div className="escena-podio">
        <button className="flecha izq" onClick={anterior} aria-label="Personaje anterior" disabled={total < 2}>‹</button>

        <div className="podio-centro">
          <div className={`figura ${oculto ? 'oculta' : ''}`} onClick={() => !oculto && setAmpliado(true)}>
            {actual?.imagenUrl ? (
              <img src={actual.imagenUrl} alt={oculto ? 'Personaje oculto' : actual.nombre} />
            ) : (
              <div className="sin-imagen">{(actual?.nombre || '?').charAt(0)}</div>
            )}
            {oculto && <span className="mascara" aria-hidden="true" />}
          </div>

          <div className="podio" aria-hidden="true">
            <span className="foco izq" />
            <span className="foco der" />
          </div>

          <div className="datos">
            <h3
              className="nombre"
              style={{
                fontFamily: campana?.fuenteTitulo || 'var(--font-title)',
                color: campana?.colorTexto || 'var(--paper)',
                WebkitTextStrokeColor: campana?.colorContorno || 'transparent',
              }}
            >
              {oculto ? <span className="barra-negra">████████</span> : actual?.nombre}
            </h3>
            <p className="mono sub">
              {oculto ? (
                <span className="barra-negra">██████ · ██ · ██</span>
              ) : (
                [actual?.raza, actual?.edad && `${actual.edad} años`, actual?.sexo].filter(Boolean).join(' · ')
              )}
            </p>
            <p className="mono sub">
              Nivel {oculto ? '—' : nivelDe(xp.total, progresion)} · <span className={`badge ${actual?.estado}`}>{actual?.estado}</span>
              {actual?.propietario && !esBase && <> · Jugador: {oculto ? '—' : actual.propietario}</>}
            </p>
          </div>

          <div className="botones-podio">
            <button className="btn ghost" onClick={() => setAmpliado(true)} disabled={oculto}>Ampliar personaje</button>
            <button className="btn ghost" onClick={() => setDiarioAbierto((v) => !v)} disabled={oculto}>
              {diarioAbierto ? 'Ocultar diario' : 'Mostrar diario'}
            </button>
          </div>

          <p className="mono contador">{indice + 1} / {total}</p>
        </div>

        <button className="flecha der" onClick={siguiente} aria-label="Personaje siguiente" disabled={total < 2}>›</button>
      </div>

      {/* ---- diario ---- */}
      {diarioAbierto && !oculto && (
        <div className="diario">
          {paginasDiario.length > 0 ? (
            <Libro
              titulo={`Diario de ${actual.nombre}`}
              sub={actual.raza || ''}
              cubierta="cuero-rojo"
              paginas={paginasDiario}
              titulosPaginas={htmlDiario.map((h, i) => tituloDePagina(h, i))}
            />
          ) : (
            <div className="panel center">
              <BarraXP general={xp.general} extra={xp.extra} progresion={progresion} />
              <p className="muted" style={{ marginTop: '.8rem' }}>Este personaje aún no tiene diario.</p>
            </div>
          )}
        </div>
      )}

      {/* ---- ampliación (§11.6) ---- */}
      {ampliado && !oculto && (
        <div className="ampliado" onClick={() => setAmpliado(false)}>
          {actual?.imagenUrl ? (
            <img src={actual.imagenUrl} alt={actual.nombre} />
          ) : (
            <div className="sin-imagen grande">{(actual?.nombre || '?').charAt(0)}</div>
          )}
        </div>
      )}

      {/* ---- comentarios del personaje (§11.8) ---- */}
      {actual && (
        <Comentarios
          tipo="podios"
          refId={actual.id}
          titulo="Comentarios del personaje"
          requiereAprobacion
          puedeAprobarExtra={(u) => u.nombre === actual.propietario}
          exentoDeAprobacion={(u) => u.nombre === actual.propietario}
        />
      )}

      <style>{css}</style>
    </div>
  );
}

const nivelDe = (total, progresion) => nivelDeXp(total, progresion);

const css = `
.podios { display: grid; gap: 1rem; }
.chips .separador { width: 1px; height: 20px; background: rgba(201,164,90,.35); margin: 0 .3rem; }
.escena-podio { display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: .6rem; }
.flecha {
  width: 42px; height: 42px; border-radius: 50%; cursor: pointer; font-size: 1.4rem;
  background: rgba(14,17,22,.7); border: 1px solid rgba(201,164,90,.5); color: var(--gold);
}
.flecha:hover:not(:disabled) { background: rgba(201,164,90,.2); }
.flecha:disabled { opacity: .3; cursor: default; }
.podio-centro { display: grid; justify-items: center; }
.figura { position: relative; height: min(42vh, 380px); display: grid; place-items: end center; cursor: zoom-in; }
.figura img { max-height: 100%; max-width: min(90vw, 420px); object-fit: contain; filter: drop-shadow(0 18px 30px rgba(0,0,0,.6)); }
.sin-imagen {
  width: 150px; height: 220px; display: grid; place-items: center; border-radius: 8px;
  background: linear-gradient(160deg, var(--stone), #4a453c); color: var(--paper);
  font-family: var(--font-title); font-size: 3.6rem;
}
.sin-imagen.grande { width: 40vmin; height: 60vmin; font-size: 12vmin; }
.figura.oculta { cursor: default; }
.figura.oculta img { filter: grayscale(1) brightness(.35); }
.mascara {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(115deg, rgba(0,0,0,.92) 0 26px, rgba(0,0,0,0) 26px 42px);
}
.podio {
  position: relative; width: min(300px, 78vw); height: 34px; margin-top: -4px;
  border-radius: 6px 6px 3px 3px;
  background: linear-gradient(180deg, #efece4, #b9b2a4 60%, #8a8478);
  box-shadow: 0 16px 34px rgba(0,0,0,.55), inset 0 2px 0 rgba(255,255,255,.5);
}
.podio .foco {
  position: absolute; top: -180px; width: 130px; height: 190px; pointer-events: none;
  background: linear-gradient(to bottom, rgba(255,246,220,.22), transparent 75%);
  filter: blur(10px);
}
.podio .foco.izq { left: -50px; transform: rotate(12deg); }
.podio .foco.der { right: -50px; transform: rotate(-12deg); }
.datos { text-align: center; margin-top: .9rem; }
.datos .nombre { margin: 0; font-size: clamp(1.4rem, 4vw, 2rem); -webkit-text-stroke-width: 1px; paint-order: stroke fill; }
.datos .sub { color: var(--parchment); font-size: .78rem; margin: .25rem 0 0; }
.barra-negra { background: #000; color: transparent; border-radius: 2px; }
.badge { text-transform: capitalize; }
.botones-podio { display: flex; gap: .6rem; margin-top: .9rem; flex-wrap: wrap; justify-content: center; }
.contador { color: var(--stone); font-size: .68rem; margin-top: .6rem; }
.diario { margin-top: 1.4rem; }
.diario-xp { margin-bottom: .8rem; }
.ampliado {
  position: fixed; inset: 0; z-index: 140; display: grid; place-items: center; cursor: zoom-out;
  background: rgba(5,6,10,.8); backdrop-filter: blur(6px); padding: 4vh 4vw;
}
.ampliado img { max-height: 92vh; max-width: 92vw; object-fit: contain; }
@media (max-width: 720px) {
  .escena-podio { grid-template-columns: 1fr; }
  .flecha.izq { justify-self: start; }
  .flecha.der { justify-self: end; margin-top: -42px; }
}
`;
