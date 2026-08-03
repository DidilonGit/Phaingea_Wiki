import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaign, $campaigns } from '../stores/campaign.js';
import { db } from '../lib/firebase.js';
import { ref, onValue } from 'firebase/database';
import { paginar, tituloDePagina } from '../lib/markdown.js';
import Libro from './Libro.jsx';

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

  if (Array.isArray(datos?.paginasUrl) && datos.paginasUrl.length) {
    // Documento maquetado: cada página es su imagen, tal cual (guía §27.1).
    paginas = datos.paginasUrl.map((url, i) => (
      <img key={i} src={url} alt={`Página ${i + 1}`} className="pagina-doc" />
    ));
    titulos = datos.paginasUrl.map((_, i) => `Página ${i + 1}`);
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

  return (
    <div className="capilla-libro">
      <Libro
        titulo={datos?.titulo || 'Panteón de Phaingea'}
        sub={heredado ? `Heredado de ${origen?.nombre || 'otra campaña'}` : datos?.subtitulo || ''}
        cubierta="cuero-verde"
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
