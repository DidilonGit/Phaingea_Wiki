import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $user, esOwner } from '../../stores/user.js';
import { $campaigns } from '../../stores/campaign.js';
import {
  crearCampana,
  actualizarCampana,
  eliminarCampana,
  ESTADOS,
  PROGRESIONES,
  ID_BASE,
} from '../../lib/db/campanas.js';

// Gestión mínima de campañas (T08, guía §25 parcial): crear, editar, cambiar
// estado y reordenar. Solo owner/admin (los másteres gestionarán lo suyo en
// T60). Eliminar pide doble confirmación (guía §4).
export default function ModCampanas() {
  const user = useStore($user);
  const campanas = useStore($campaigns);
  const [editando, setEditando] = useState(null); // id en edición | 'nueva'
  const [form, setForm] = useState({});
  const [confirmando, setConfirmando] = useState(null); // id pendiente de 2ª confirmación
  const [error, setError] = useState('');

  if (!esOwner(user)) {
    return <p className="muted">Solo el owner puede gestionar campañas (los másteres podrán administrar las suyas más adelante).</p>;
  }

  const campo = (k) => ({
    value: form[k] ?? '',
    onChange: (e) => setForm({ ...form, [k]: e.target.value }),
  });

  function abrirNueva() {
    setForm({ nombre: '', descripcion: '', estado: 'activa', progresionXP: 'media', colorA: '#5b6a8a', colorB: '#2b3350' });
    setEditando('nueva');
    setError('');
  }

  function abrirEdicion(c) {
    setForm({
      nombre: c.nombre, descripcion: c.descripcion || '', estado: c.estado,
      progresionXP: c.progresionXP || 'media',
      colorA: c.planeta?.colorA || '#5b6a8a', colorB: c.planeta?.colorB || '#2b3350',
    });
    setEditando(c.id);
    setError('');
  }

  async function guardar(e) {
    e.preventDefault();
    if (!form.nombre?.trim()) { setError('La campaña necesita un nombre.'); return; }
    const datos = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion || '',
      estado: form.estado,
      progresionXP: form.progresionXP,
      planeta: { colorA: form.colorA, colorB: form.colorB },
    };
    try {
      if (editando === 'nueva') await crearCampana(datos);
      else await actualizarCampana(editando, datos);
      setEditando(null);
    } catch (err) {
      setError('No se pudo guardar: ' + err.message);
    }
  }

  async function mover(c, dir) {
    const orden = [...campanas].filter((x) => !x.esBase);
    const i = orden.findIndex((x) => x.id === c.id);
    const j = i + dir;
    if (j < 0 || j >= orden.length) return;
    const otro = orden[j];
    await actualizarCampana(c.id, { orden: otro.orden });
    await actualizarCampana(otro.id, { orden: c.orden });
  }

  async function borrar(c) {
    if (confirmando !== c.id) { setConfirmando(c.id); return; } // 1ª confirmación
    setConfirmando(null);
    try { await eliminarCampana(c.id); } catch (err) { setError(err.message); }
  }

  return (
    <div className="stack">
      {campanas.map((c) => (
        <div key={c.id} className="panel" style={{ padding: '0.8rem 1rem' }}>
          <div style={fila}>
            <span style={{ ...bolita, background: `linear-gradient(140deg, ${c.planeta?.colorA || '#5b6a8a'}, ${c.planeta?.colorB || '#2b3350'})` }} />
            <strong style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-soft)' }}>{c.nombre}</strong>
            {c.esBase && <span className="mono" style={etiqueta}>BASE</span>}
            <span className="mono" style={etiqueta}>{c.estado}</span>
            <span className="mono muted" style={{ fontSize: '0.65rem' }}>orden {c.orden}</span>
            <span style={{ flex: 1 }} />
            {!c.esBase && <button className="btn ghost" style={mini} onClick={() => mover(c, -1)} title="Subir">↑</button>}
            {!c.esBase && <button className="btn ghost" style={mini} onClick={() => mover(c, 1)} title="Bajar">↓</button>}
            <button className="btn ghost" style={mini} onClick={() => abrirEdicion(c)}>Editar</button>
            {!c.esBase && (
              <button className="btn ghost" style={{ ...mini, borderColor: '#a44', color: '#e99' }} onClick={() => borrar(c)}>
                {confirmando === c.id ? '¿Seguro? No se puede deshacer' : 'Eliminar'}
              </button>
            )}
          </div>

          {editando === c.id && (
            <FormCampana campo={campo} form={form} setForm={setForm} onSubmit={guardar} onCancelar={() => setEditando(null)} error={error} esBase={c.esBase} />
          )}
        </div>
      ))}

      {editando === 'nueva' ? (
        <div className="panel">
          <FormCampana campo={campo} form={form} setForm={setForm} onSubmit={guardar} onCancelar={() => setEditando(null)} error={error} />
        </div>
      ) : (
        <button className="btn" style={{ justifySelf: 'start' }} onClick={abrirNueva}>+ Nueva campaña</button>
      )}
    </div>
  );
}

function FormCampana({ campo, form, setForm, onSubmit, onCancelar, error, esBase }) {
  return (
    <form onSubmit={onSubmit} className="stack" style={{ marginTop: '0.8rem', gap: '0.6rem' }}>
      <label style={lbl}>Nombre <input style={inp} {...campo('nombre')} /></label>
      <label style={lbl}>Descripción <textarea style={{ ...inp, minHeight: '70px' }} {...campo('descripcion')} /></label>
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
        {!esBase && (
          <label style={lbl}>Estado
            <select style={inp} {...campo('estado')}>{ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}</select>
          </label>
        )}
        <label style={lbl}>Progresión XP
          <select style={inp} {...campo('progresionXP')}>{PROGRESIONES.map((p) => <option key={p} value={p}>{p}</option>)}</select>
        </label>
        <label style={lbl}>Planeta A <input type="color" value={form.colorA} onChange={(e) => setForm({ ...form, colorA: e.target.value })} /></label>
        <label style={lbl}>Planeta B <input type="color" value={form.colorB} onChange={(e) => setForm({ ...form, colorB: e.target.value })} /></label>
      </div>
      {error && <p style={{ color: '#f0a29c', margin: 0 }}>{error}</p>}
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <button className="btn" type="submit">Guardar</button>
        <button className="btn ghost" type="button" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}

const fila = { display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' };
const bolita = { width: '18px', height: '18px', borderRadius: '50%', flex: 'none', boxShadow: '0 0 0 1px rgba(201,164,90,.6)' };
const etiqueta = { fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid rgba(201,164,90,.4)', borderRadius: '999px', padding: '0.1rem 0.5rem' };
const mini = { padding: '0.25rem 0.6rem', fontSize: '0.72rem' };
const lbl = { display: 'grid', gap: '0.25rem', fontFamily: 'var(--font-ui)', fontSize: '0.78rem', color: 'var(--parchment)' };
const inp = { padding: '0.45rem 0.6rem', borderRadius: '7px', border: '1px solid rgba(201,164,90,.35)', background: 'rgba(0,0,0,.3)', color: 'var(--paper)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' };
