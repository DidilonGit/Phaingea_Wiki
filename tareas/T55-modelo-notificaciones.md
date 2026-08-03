# T55 · Modelo de notificaciones + helper notificar()

**Fase:** 4 · **Depende de:** T07

## Objetivo

Modelo de notificaciones por campaña y usuario, y helper para generarlas desde las acciones de la web.

## Guía (fragmento literal)

## 18.7. Qué genera una notificación

Se notificará cuando ocurra algo relevante o que necesite interacción.

Ejemplos:

- Se publica una sesión.
- Se reparte experiencia.
- Se modifica una sesión y cambia la experiencia.
- Se crea un personaje.
- Un personaje fallece.
- Un personaje pasa a delegado.
- Se envía contenido para aprobación.
- Se aprueba o deniega una imagen.
- Se crea una campaña.
- Finaliza una campaña.
- Se publica un evento.
- El máster envía un aviso.

Las notificaciones siempre pertenecen a una campaña concreta.

## Estado actual relevante

- **Firebase:** `src/lib/firebase.js` exporta `db` (Realtime Database, proyecto `phaingea`). Config en `src/lib/firebaseConfig.js`. Reglas versionadas en `database.rules.json` (lectura abierta; escritura denegada salvo `/usuarios`). **Al cambiar reglas hay que publicarlas a mano en la consola de Firebase.** Modelo de seguridad "de confianza": el login es puerta de UX, no barrera criptográfica.
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Cuentas/sesión:** login propio en `src/lib/auth.js` (sha256hex, login/registrar contra `/usuarios` en RTDB; la pass se guarda hasheada). Sesión y rol en `src/stores/user.js` (nanostore `$user` + localStorage `phaingea_session`; helpers `esOwner`/`esMasterOOwner`; el rol `admin` equivale a `owner`). UI de login: `src/components/AuthGate.jsx` (overlay + chip de usuario arriba a la derecha).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

nuevo `src/lib/db/notificaciones.js` · enganches en `sesiones.js`/`galeria.js`/`personajes.js` · `database.rules.json`

## Pasos sugeridos

1. `/notificaciones/{campanaId}/{usuario}/{id}`: `{asunto, tipo, fecha, contenido, estado(pendiente|archivada)}`.
2. `notificar(campanaId, usuarios[], {asunto, tipo, contenido})`.
3. Enganchar a lo ya construido: publicar/editar sesión (T47), aprobar/denegar imagen y nueva propuesta (T44), personaje creado/fallecido/delegado.
4. Contador de pendientes en tiempo real (helper de suscripción). Reglas. Publicar.

## Criterios de hecho

- [ ] Crear una sesión genera cartas a los jugadores de la campaña.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
