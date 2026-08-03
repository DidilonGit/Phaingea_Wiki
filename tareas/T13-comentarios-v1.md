# T13 · Sistema de comentarios v1 (hilo por target)

**Fase:** 2 · **Depende de:** T07

## Objetivo

Componente de comentarios reutilizable conectado a RTDB: hilo por target, formato de cabecera de la guía, crear y editar el propio.

## Guía (fragmento literal)

# 22. Sistema general de comentarios

Los comentarios utilizarán el mismo sistema en todas las categorías, aunque sus reglas cambien según el contexto.

Formato:

> Nombre del personaje (Nombre del jugador) — Fecha

Si el usuario no tiene personaje en esa campaña, aparece únicamente su nombre de jugador.

Cada hilo puede configurarse como:

- General de categoría.
- Por sesión.
- Por evento.
- Por personaje.
- Por lugar.
- Por página o entrada concreta.

## Estado actual relevante

- **Firebase:** `src/lib/firebase.js` exporta `db` (Realtime Database, proyecto `phaingea`). Config en `src/lib/firebaseConfig.js`. Reglas versionadas en `database.rules.json` (lectura abierta; escritura denegada salvo `/usuarios`). **Al cambiar reglas hay que publicarlas a mano en la consola de Firebase.** Modelo de seguridad "de confianza": el login es puerta de UX, no barrera criptográfica.
- **Cuentas/sesión:** login propio en `src/lib/auth.js` (sha256hex, login/registrar contra `/usuarios` en RTDB; la pass se guarda hasheada). Sesión y rol en `src/stores/user.js` (nanostore `$user` + localStorage `phaingea_session`; helpers `esOwner`/`esMasterOOwner`; el rol `admin` equivale a `owner`). UI de login: `src/components/AuthGate.jsx` (overlay + chip de usuario arriba a la derecha).
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

nuevo `src/components/Comentarios.jsx` · nuevo `src/lib/db/comentarios.js` · `database.rules.json`

## Pasos sugeridos

1. Nodo `/comentarios/{campanaId}/{tipo}/{refId}/{comentarioId}`: `{autor, personaje?, texto, fecha, editado?}`.
2. `<Comentarios tipo="capilla" refId="general" />` — toma campaña del store; tiempo real con `onValue`.
3. Cabecera "Personaje (Jugador) — Fecha"; si no hay personaje, solo el jugador (los personajes llegan en T32; hasta entonces solo nombre de jugador).
4. Crear y editar el propio comentario. Reglas RTDB del nodo (publicar).

## Criterios de hecho

- [x] Dos cuentas ven los comentarios en tiempo real; cada una edita solo el suyo.
- [x] El hilo cambia al cambiar campaña.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
