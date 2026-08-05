import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaign } from '../stores/campaign.js';
import { db } from '../lib/firebase.js';
import { ref, onValue } from 'firebase/database';
import { paginar, tituloDePagina } from '../lib/markdown.js';
import { repartirDocumento } from '../lib/documento.js';
import Libro from './Libro.jsx';
import ModDocumento from './mod/ModDocumento.jsx';
import { $user } from '../stores/user.js';
import { puedeGestionar } from '../lib/permisos.js';

// Libro de reglas del Taller (guía §16.2). Lee /taller/{campanaId}:
//   { reglasMd: '...markdown...' }  ó  { documentoUrl: '...' }
// El markdown se reparte en páginas (marca ===salto=== o corte automático) y
// se muestra en el componente Libro, que ya trae índice, buscador, navegación
// rápida, paso de página y pantalla completa.
export default function TallerLibro() {
  const campana = useStore($campaign);
  const user = useStore($user);
  const [datos, setDatos] = useState(null);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  useEffect(() => {
    if (!campana?.id) return;
    const r = ref(db, 'taller/' + campana.id);
    return onValue(r, (snap) => setDatos(snap.exists() ? snap.val() : {}));
  }, [campana?.id]);

  if (!montado) return null;

  // Dos orígenes posibles (guía §16.2): un documento ya maquetado (cada página
  // es su imagen, se respeta su diseño tal cual, §27.1) o markdown propio.
  const docPaginas = Array.isArray(datos?.paginasUrl) ? datos.paginasUrl : [];
  // El máster decide si el documento trae sus propias tapas (§27.1).
  const doc = repartirDocumento(docPaginas, datos);
  let paginas, titulos;

  if (docPaginas.length) {
    paginas = doc.paginas.map((p) => (
      <img key={p.i} src={p.url} alt={p.titulo} className="pagina-doc" loading="lazy" />
    ));
    titulos = doc.paginas.map((p) => p.titulo);
  } else {
    const paginasHtml = paginar(datos?.reglasMd || '');
    paginas = paginasHtml.map((html, i) => (
      <div key={i} className="pagina-md" dangerouslySetInnerHTML={{ __html: html }} />
    ));
    titulos = paginasHtml.map((html, i) => tituloDePagina(html, i));
  }

  if (paginas.length === 0) {
    // Sin contenido todavía: el máster tiene que poder entrar a añadirlo, así
    // que el botón de moderación va también en este caso.
    return (
      <>
      <ModDocumento nodo="taller" campanaId={campana?.id} campoMd="reglasMd" visible={puedeGestionar(user, campana)} />
      <Libro
        titulo={campana?.nombre ? `Reglas de ${campana.nombre}` : 'Reglas'}
        sub="WIP"
        cubierta="cuero-negro"
      portada={doc.portadaUrl ? <img src={doc.portadaUrl} alt="Portada" className="pagina-doc" /> : null}
      contraportada={doc.contraportadaUrl ? <img src={doc.contraportadaUrl} alt="Contraportada" className="pagina-doc" /> : null}
      proporcion={docPaginas.length ? 792 / 612 : 1.38}
        paginas={[
          <div key="wip" className="pagina-md">
            <h3>WIP</h3>
            <p>El máster aún no ha escrito las reglas de esta campaña.</p>
          </div>,
        ]}
        titulosPaginas={['WIP']}
      />
      </>
    );
  }

  return (
    <>
      <ModDocumento nodo="taller" campanaId={campana?.id} campoMd="reglasMd" visible={puedeGestionar(user, campana)} />
      <Libro
      titulo={datos?.titulo || (campana?.nombre ? `Reglas de ${campana.nombre}` : 'Reglas')}
      sub={datos?.subtitulo || 'Pathfinder 1e · reglas de la casa'}
      cubierta="cuero-negro"
      portada={doc.portadaUrl ? <img src={doc.portadaUrl} alt="Portada" className="pagina-doc" /> : null}
      contraportada={doc.contraportadaUrl ? <img src={doc.contraportadaUrl} alt="Contraportada" className="pagina-doc" /> : null}
      proporcion={docPaginas.length ? 792 / 612 : 1.38}
      paginas={paginas}
      titulosPaginas={titulos}
      />
    </>
  );
}
