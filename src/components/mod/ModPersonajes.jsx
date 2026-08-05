import { useEffect, useState } from 'react';
import { actualizarPersonaje, eliminarPersonaje, ESTADOS } from '../../lib/db/personajes.js';
import { notificar, registrar } from '../../lib/db/notificaciones.js';
import { useDobleConfirmacion } from '../Modal.jsx';
import BotonMod from '../BotonMod.jsx';

// ============================================================================
// MODERACIÓN DE PODIOS (guía §11, §24).
//
// El máster gestiona el personaje que está en el podio: cambiar su estado
// (activo / fallecido / delegado), sus grupos, y eliminarlo. Al marcarlo como
// fallecido o delegado, su jugador queda libre para crear otro (§18) y recibe
// el aviso correspondiente.
// ============================================================================

export default function ModPersonajes({ campanaId, personaje, autor, visible }) {
  const [estado, setEstado] = useState(personaje?.estado || 'activo');
  const [grupos, setGrupos] = useState((personaje?.grupos || []).join(', '));
  const [aviso, setAviso] = useState('');

  useEffect(() => {
    setEstado(personaje?.estado || 'activo');
    setGrupos((personaje?.grupos || []).join(', '));
  }, [personaje?.id]);

  if (!personaje) return null;

  async function guardar() {
    const listaGrupos = grupos.split(',').map((g) => g.trim()).filter(Boolean);
    await actualizarPersonaje(campanaId, personaje.id, { estado, grupos: listaGrupos });

    if (estado !== personaje.estado) {
      const textos = {
        fallecido: `${personaje.nombre} ha caído. Ya puedes crear un personaje nuevo.`,
        delegado: `${personaje.nombre} pasa a ser personaje no jugador. Ya puedes crear otro.`,
        activo: `${personaje.nombre} vuelve a estar activo.`,
      };
      await notificar(campanaId, [personaje.propietario], {
        asunto: estado === 'fallecido' ? 'Personaje fallecido' : 'Estado del personaje',
        tipo: 'personaje',
        contenido: textos[estado] || `El estado de ${personaje.nombre} es ahora ${estado}.`,
      });
      await registrar(campanaId, { tipo: `personaje_${estado}`, actor: autor, resumen: personaje.nombre });
    }
    setAviso('Guardado.');
    setTimeout(() => setAviso(''), 2200);
  }

  return (
    <BotonMod visible={visible} titulo={`Moderar a ${personaje.nombre}`}>
      <div className="stack">
        <p className="mono muted">Personaje de {personaje.propietario}</p>

        <label className="lbl-mp">Estado
          <select className="inp-mp" value={estado} onChange={(e) => setEstado(e.target.value)}>
            {[...ESTADOS, 'historico'].map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </label>
        <p className="mono muted" style={{ fontSize: '.66rem' }}>
          Al marcarlo como fallecido o delegado, su jugador podrá crear otro personaje.
        </p>

        <label className="lbl-mp">Grupos (separados por comas)
          <input className="inp-mp" value={grupos} onChange={(e) => setGrupos(e.target.value)} placeholder="La Compañía, Los Caídos" />
        </label>

        {aviso && <p style={{ color: '#9fd07a' }}>{aviso}</p>}

        <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
          <button className="btn" onClick={guardar}>Guardar</button>
          <BorrarPersonaje campanaId={campanaId} id={personaje.id} />
        </div>
      </div>

      <style>{`
        .lbl-mp { display: grid; gap: .25rem; font-family: var(--font-ui); font-size: .78rem; color: var(--parchment); }
        .inp-mp { padding: .45rem .6rem; border-radius: 7px; border: 1px solid rgba(201,164,90,.35);
          background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; }
      `}</style>
    </BotonMod>
  );
}

function BorrarPersonaje({ campanaId, id }) {
  const del = useDobleConfirmacion(() => eliminarPersonaje(campanaId, id));
  return (
    <button className="btn ghost" style={{ borderColor: '#a44', color: '#e99' }} onClick={del.pulsar}>
      {del.texto('Eliminar personaje')}
    </button>
  );
}
