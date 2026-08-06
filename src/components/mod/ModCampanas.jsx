import { useEffect, useRef, useState } from 'react';
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
import { comprimirImagen } from '../../lib/db/galeria.js';

// Gestión mínima de campañas (T08, guía §25 parcial): crear, editar, cambiar
// estado y reordenar. Solo owner/admin (los másteres gestionarán lo suyo en
// T60). Eliminar pide doble confirmación (guía §4).
//
// COLORES DE UNA CAMPAÑA (guía §5, §8.5):
//   planeta.colorA/colorB -> la bola del dial y del Observatorio
//   colorTexto            -> el título de la campaña y el nombre de sus
//                            personajes en los Podios
//   colorContorno         -> el contorno de ese título
//   fuenteTitulo          -> con qué letra se escribe
//   logoUrl               -> si la campaña tiene logo, es lo que se ve en su
//                            bola del dial (en vez de las dos letras) y en la
//                            barra de arriba
// El recuadro de muestra del formulario los enseña tal cual quedarán.
export default function ModCampanas() {
  const user = useStore($user);
  const campanas = useStore($campaigns);
  const [editando, setEditando] = useState(null); // id en edición | 'nueva'
  const [form, setForm] = useState({});
  const [confirmando, setConfirmando] = useState(null); // id pendiente de 2ª confirmación
  const [error, setError] = useState('');
  // En el servidor no hay sesión: si pintáramos ya, el HTML no coincidiría con
  // el del cliente (error de hidratación). Esperamos al montaje.
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  if (!montado) return null;

  if (!esOwner(user)) {
    return <p className="muted">Solo el owner puede gestionar campañas (los másteres podrán administrar las suyas más adelante).</p>;
  }

  const campo = (k) => ({
    value: form[k] ?? '',
    onChange: (e) => setForm({ ...form, [k]: e.target.value }),
  });

  function abrirNueva() {
    setForm({
      nombre: '', descripcion: '', estado: 'activa', progresionXP: 'media',
      colorA: '#5b6a8a', colorB: '#2b3350',
      colorTexto: '#efe6d2', colorContorno: '#c9a45a', fuenteTitulo: FUENTES[0].valor,
      logoUrl: '',
    });
    setEditando('nueva');
    setError('');
  }

  function abrirEdicion(c) {
    setForm({
      nombre: c.nombre, descripcion: c.descripcion || '', estado: c.estado,
      progresionXP: c.progresionXP || 'media',
      colorA: c.planeta?.colorA || '#5b6a8a', colorB: c.planeta?.colorB || '#2b3350',
      colorTexto: c.colorTexto || '#efe6d2',
      colorContorno: c.colorContorno || '#c9a45a',
      fuenteTitulo: c.fuenteTitulo || FUENTES[0].valor,
      logoUrl: c.logoUrl || '',
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
      colorTexto: form.colorTexto,
      colorContorno: form.colorContorno,
      fuenteTitulo: form.fuenteTitulo,
      logoUrl: form.logoUrl || '',
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
            <span
              style={{
                ...bolita,
                background: c.logoUrl
                  ? `center / cover no-repeat url(${c.logoUrl})`
                  : `linear-gradient(140deg, ${c.planeta?.colorA || '#5b6a8a'}, ${c.planeta?.colorB || '#2b3350'})`,
              }}
            />
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
  const inputLogo = useRef(null);
  const [subiendo, setSubiendo] = useState(false);

  /** El logo se guarda comprimido dentro de la propia base, como las imágenes
   *  de la galería (Storage necesitaría plan de pago). */
  async function elegirLogo(archivo) {
    if (!archivo) return;
    setSubiendo(true);
    try {
      const { dataUrl } = await comprimirImagen(archivo, { maxLado: 400, maxBytes: 90 * 1024 });
      setForm((f) => ({ ...f, logoUrl: dataUrl }));
    } finally {
      setSubiendo(false);
    }
  }

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
        <label style={lbl}>Letra del título
          <select style={inp} value={form.fuenteTitulo || FUENTES[0].valor} onChange={(e) => setForm({ ...form, fuenteTitulo: e.target.value })}>
            {FUENTES.map((f) => <option key={f.valor} value={f.valor} style={{ fontFamily: f.valor }}>{f.nombre}</option>)}
          </select>
        </label>
      </div>

      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <label style={lbl}>Planeta A <input type="color" value={form.colorA} onChange={(e) => setForm({ ...form, colorA: e.target.value })} /></label>
        <label style={lbl}>Planeta B <input type="color" value={form.colorB} onChange={(e) => setForm({ ...form, colorB: e.target.value })} /></label>
        <label style={lbl}>Texto <input type="color" value={form.colorTexto || '#efe6d2'} onChange={(e) => setForm({ ...form, colorTexto: e.target.value })} /></label>
        <label style={lbl}>Contorno <input type="color" value={form.colorContorno || '#c9a45a'} onChange={(e) => setForm({ ...form, colorContorno: e.target.value })} /></label>
      </div>

      {/* logo de la campaña: si lo tiene, es lo que se ve en su bola del dial */}
      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ ...bolita, width: '46px', height: '46px',
          background: form.logoUrl ? `center / cover no-repeat url(${form.logoUrl})`
            : `linear-gradient(140deg, ${form.colorA}, ${form.colorB})` }} />
        <div style={{ display: 'grid', gap: '.3rem' }}>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
            <button className="btn ghost" type="button" style={mini} onClick={() => inputLogo.current?.click()} disabled={subiendo}>
              {subiendo ? 'Subiendo…' : form.logoUrl ? 'Cambiar logo' : 'Subir logo'}
            </button>
            {form.logoUrl && (
              <button className="btn ghost" type="button" style={mini} onClick={() => setForm({ ...form, logoUrl: '' })}>
                Quitar logo
              </button>
            )}
            <input ref={inputLogo} type="file" accept="image/*" hidden onChange={(e) => elegirLogo(e.target.files?.[0])} />
          </div>
          <span className="mono" style={{ fontSize: '.62rem', color: 'var(--stone)' }}>
            Con logo, la bola del dial deja de enseñar las dos letras y enseña el logo.
          </span>
        </div>
      </div>

      {/* muestra: así se verá el título de la campaña y sus personajes */}
      <div style={muestra}>
        <span
          style={{
            fontFamily: form.fuenteTitulo || FUENTES[0].valor,
            color: form.colorTexto || '#efe6d2',
            WebkitTextStrokeColor: form.colorContorno || '#c9a45a',
            WebkitTextStrokeWidth: '1px',
            paintOrder: 'stroke fill',
            fontSize: '1.6rem',
          }}
        >
          {form.nombre?.trim() || 'Nombre de la campaña'}
        </span>
        <span
          style={{
            ...bolita,
            width: '30px', height: '30px',
            background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,.4), transparent 45%), linear-gradient(140deg, ${form.colorA}, ${form.colorB} 72%)`,
          }}
        />
      </div>
      {error && <p style={{ color: '#f0a29c', margin: 0 }}>{error}</p>}
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <button className="btn" type="submit">Guardar</button>
        <button className="btn ghost" type="button" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}

// Letras entre las que elegir para el título (todas están en cualquier equipo).
const FUENTES = [
  { nombre: 'Georgia (serif clásica)', valor: 'Georgia, serif' },
  { nombre: 'Times / serif', valor: '"Times New Roman", Times, serif' },
  { nombre: 'Palatino (serif suave)', valor: '"Palatino Linotype", Palatino, serif' },
  { nombre: 'Garamond (serif fina)', valor: 'Garamond, Georgia, serif' },
  { nombre: 'Trebuchet (sin serifa)', valor: '"Trebuchet MS", sans-serif' },
  { nombre: 'Impact (titular)', valor: 'Impact, "Arial Black", sans-serif' },
  { nombre: 'Courier (máquina de escribir)', valor: '"Courier New", monospace' },
  { nombre: 'La de la web', valor: 'var(--font-title)' },
];

const muestra = {
  display: 'flex', alignItems: 'center', gap: '0.9rem', flexWrap: 'wrap',
  padding: '0.7rem 0.9rem', borderRadius: '10px',
  background: 'radial-gradient(90% 120% at 20% 0%, rgba(60,80,120,.25), transparent 60%), rgba(0,0,0,.35)',
  border: '1px dashed rgba(201,164,90,.35)',
};

const fila = { display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' };
const bolita = { width: '18px', height: '18px', borderRadius: '50%', flex: 'none', boxShadow: '0 0 0 1px rgba(201,164,90,.6)' };
const etiqueta = { fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid rgba(201,164,90,.4)', borderRadius: '999px', padding: '0.1rem 0.5rem' };
const mini = { padding: '0.25rem 0.6rem', fontSize: '0.72rem' };
const lbl = { display: 'grid', gap: '0.25rem', fontFamily: 'var(--font-ui)', fontSize: '0.78rem', color: 'var(--parchment)' };
const inp = { padding: '0.45rem 0.6rem', borderRadius: '7px', border: '1px solid rgba(201,164,90,.35)', background: 'rgba(0,0,0,.3)', color: 'var(--paper)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' };
