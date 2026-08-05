import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaign } from '../stores/campaign.js';
import { db } from '../lib/firebase.js';
import { ref, onValue } from 'firebase/database';
import { paginar, tituloDePagina } from '../lib/markdown.js';
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
  let paginas, titulos;

  if (docPaginas.length) {
    paginas = docPaginas.map((url, i) => (
      <img key={i} src={url} alt={`Página ${i + 1}`} className="pagina-doc" loading="lazy" />
    ));
    titulos = docPaginas.map((_, i) => `Página ${i + 1}`);
  } else {
    const paginasHtml = paginar(datos?.reglasMd || '');
    paginas = paginasHtml.map((html, i) => (
      <div key={i} className="pagina-md" dangerouslySetInnerHTML={{ __html: html }} />
    ));
    titulos = paginasHtml.map((html, i) => tituloDePagina(html, i));
  }

  if (paginas.length === 0) {
    return (
      <Libro
        titulo={campana?.nombre ? `Reglas de ${campana.nombre}` : 'Reglas'}
        sub="WIP"
        cubierta="cuero-negro"
        paginas={[
          <div key="wip" className="pagina-md">
            <h3>WIP</h3>
            <p>El máster aún no ha escrito las reglas de esta campaña.</p>
          </div>,
        ]}
        titulosPaginas={['WIP']}
      />
    );
  }

  return (
    <>
      <ModDocumento nodo="taller" campanaId={campana?.id} campoMd="reglasMd" visible={puedeGestionar(user, campana)} />
      <Libro
      titulo={datos?.titulo || (campana?.nombre ? `Reglas de ${campana.nombre}` : 'Reglas')}
      sub={datos?.subtitulo || 'Pathfinder 1e · reglas de la casa'}
      cubierta="cuero-negro"
      paginas={paginas}
      titulosPaginas={titulos}
      />
    </>
  );
}
