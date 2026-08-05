import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaign, $campaigns } from '../stores/campaign.js';
import { db } from '../lib/firebase.js';
import { ref, onValue } from 'firebase/database';
import { paginar, tituloDePagina } from '../lib/markdown.js';
import { repartirDocumento } from '../lib/documento.js';
import Libro from './Libro.jsx';
import ModDocumento from './mod/ModDocumento.jsx';
import { $user } from '../stores/user.js';
import { puedeGestionar } from '../lib/permisos.js';
import { dejarDeHeredar } from '../lib/db/campanas.js';

// ============================================================================
// LIBRO DE DEIDADES (guía §9.2) sobre el atril de la Capilla.
//
// Lee /capilla/{campanaId}:
//   { deidadesMd }               -> libro generado por la web
//   { paginasUrl: [url, …] }     -> documento ya maquetado (cada página, una
//                                   imagen: se respeta su diseño, §27.1)
//
// HERENCIA (§7): si la campaña tiene categorias.capilla.heredaDe apuntando a
// otra campaña, el contenido se lee de ESA y se avisa de dónde procede.
// ============================================================================

export default function CapillaLibro() {
  const campana = useStore($campaign);
  const campanas = useStore($campaigns);
  const user = useStore($user);
  const [datos, setDatos] = useState(null);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  // Campaña de la que sale el contenido (ella misma o de la que hereda).
  const origenId = campana?.categorias?.capilla?.heredaDe || campana?.id;
  const origen = campanas.find((c) => c.id === origenId);
  const heredado = !!origenId && origenId !== campana?.id;

  useEffect(() => {
    if (!origenId) return;
    return onValue(ref(db, 'capilla/' + origenId), (snap) => setDatos(snap.exists() ? snap.val() : {}));
  }, [origenId]);

  if (!montado) return null;

  let paginas = [];
  let titulos = [];
  const docPaginas = Array.isArray(datos?.paginasUrl) ? datos.paginasUrl : [];
  // El máster decide si el documento trae sus propias tapas (§27.1).
  const doc = repartirDocumento(docPaginas, datos);

  if (docPaginas.length) {
    // Documento maquetado: cada página es su imagen, tal cual (guía §27.1).
    // El índice muestra el título que el máster le haya puesto a cada página.
    paginas = doc.paginas.map((p) => (
      <img key={p.i} src={p.url} alt={p.titulo} className="pagina-doc" loading="lazy" />
    ));
    titulos = doc.paginas.map((p) => p.titulo);
  } else if (datos?.deidadesMd) {
    const html = paginar(datos.deidadesMd);
    paginas = html.map((h, i) => <div key={i} className="pagina-md" dangerouslySetInnerHTML={{ __html: h }} />);
    titulos = html.map((h, i) => tituloDePagina(h, i));
  }

  if (paginas.length === 0) {
    paginas = [
      <div key="wip" className="pagina-md">
        <h3>WIP</h3>
        <p>Aún no hay contenido de deidades para esta campaña.</p>
      </div>,
    ];
    titulos = ['WIP'];
  }

  const esGestor = puedeGestionar(user, campana);

  return (
    <div className="capilla-libro">
      {/* El máster edita el contenido de ESTA categoría (guía §24). El botón
          está en TODAS las campañas; si la categoría se hereda, el panel
          explica de dónde viene y permite cortar la herencia. */}
      <ModDocumento
        nodo="capilla"
        campanaId={campana?.id}
        campoMd="deidadesMd"
        visible={esGestor}
        heredadoDe={heredado ? origen?.nombre || origenId : ''}
        alDejarHerencia={() => dejarDeHeredar(campana?.id, 'capilla')}
      />
      <Libro
        titulo={datos?.titulo || 'Panteón de Phaingea'}
        sub={heredado ? `Heredado de ${origen?.nombre || 'otra campaña'}` : datos?.subtitulo || ''}
        cubierta="cuero-verde"
        portada={doc.portadaUrl ? <img src={doc.portadaUrl} alt="Portada" className="pagina-doc" /> : null}
        contraportada={
          doc.contraportadaUrl ? <img src={doc.contraportadaUrl} alt="Contraportada" className="pagina-doc" /> : null
        }
        proporcion={docPaginas.length ? 792 / 612 : 1.38}
        paginas={paginas}
        titulosPaginas={titulos}
      />
      {heredado && (
        <p className="mono aviso-herencia">
          Contenido heredado de «{origen?.nombre || origenId}» · solo lectura
        </p>
      )}
      <style>{`
        .capilla-libro { display: grid; justify-items: center; gap: .5rem; }
        .aviso-herencia { font-size: .64rem; letter-spacing: .1em; text-transform: uppercase; color: var(--stone); }
        .capilla-libro :global(.pagina-doc) { width: 100%; height: auto; display: block; }
        .capilla-libro :global(.pagina-md) { color: var(--ink); }
        .capilla-libro :global(.pagina-md h3) { font-family: var(--font-title); color: #5a3d26; margin: 0 0 .5rem; }
      `}</style>
    </div>
  );
}
