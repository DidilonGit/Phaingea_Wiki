// Sistema de cuentas usuario/contraseña sobre Realtime Database (mismo enfoque
// que la app de logros): /usuarios/<nombre> = { pass: sha256(contraseña), rol }.
// La contraseña NO se guarda en claro (solo su hash SHA-256). El login compara
// hashes en el navegador. Es una "puerta" de UX para un grupo de confianza, no un
// muro criptográfico (la BD está abierta). Ver docs/05-ROLES-PERMISOS.md.
import { db } from './firebase.js';
import { ref, get, set } from 'firebase/database';

// SHA-256 hex usando la API nativa del navegador (crypto.subtle).
export async function sha256hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

// RTDB no admite . # $ [ ] / en las claves -> validamos el nombre.
export function nombreValido(nombre) {
  return /^[A-Za-z0-9 _-]{2,30}$/.test(nombre);
}

export async function getUsuario(nombre) {
  const snap = await get(ref(db, 'usuarios/' + nombre));
  return snap.exists() ? snap.val() : null;
}

export async function login(nombre, contrasena) {
  nombre = (nombre || '').trim();
  if (!nombreValido(nombre)) return { ok: false, error: 'Nombre o contraseña incorrectos.' };
  let u;
  try {
    u = await getUsuario(nombre);
  } catch (e) {
    return { ok: false, error: 'No se pudo conectar con la base de datos.' };
  }
  if (!u) return { ok: false, error: 'Nombre o contraseña incorrectos.' };
  const h = await sha256hex(contrasena);
  if (u.pass !== h) return { ok: false, error: 'Nombre o contraseña incorrectos.' };
  return { ok: true, user: { nombre, rol: u.rol || 'jugador' } };
}

export async function registrar(nombre, contrasena) {
  nombre = (nombre || '').trim();
  if (!nombreValido(nombre)) return { ok: false, error: 'El nombre debe tener 2-30 letras/números (sin símbolos raros).' };
  if (!contrasena || contrasena.length < 4) return { ok: false, error: 'La contraseña debe tener al menos 4 caracteres.' };
  let existe;
  try {
    existe = await getUsuario(nombre);
  } catch (e) {
    return { ok: false, error: 'No se pudo conectar con la base de datos.' };
  }
  if (existe) return { ok: false, error: 'Ese nombre ya está cogido.' };
  const pass = await sha256hex(contrasena);
  try {
    await set(ref(db, 'usuarios/' + nombre), { pass, rol: 'jugador' });
  } catch (e) {
    return { ok: false, error: 'No se pudo guardar la cuenta (¿reglas de la base de datos cerradas?).' };
  }
  return { ok: true, user: { nombre, rol: 'jugador' } };
}
