# T07 · Store de campaña activa + rol por campaña

**Fase:** 1 · **Depende de:** T06

## Objetivo

Crear el estado global de campaña activa (persistente) y helpers de rol por campaña; la UI existente (logo topbar) reacciona al cambiarla.

## Guía (fragmento literal)

## 8.2. Planeta principal

En el centro aparecerá un planeta grande que representa la campaña activa.

Al cambiar de campaña:

- Cambia el aspecto o los colores del planeta.
- Cambia el logo.
- Cambia el título.
- Cambia la descripción.
- Cambian las regiones o pines visibles sobre el planeta.
- Cambia el personaje activo del usuario.
- Todas las categorías pasan a mostrar los datos de la nueva campaña.

## Estado actual relevante

- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Cuentas/sesión:** login propio en `src/lib/auth.js` (sha256hex, login/registrar contra `/usuarios` en RTDB; la pass se guarda hasheada). Sesión y rol en `src/stores/user.js` (nanostore `$user` + localStorage `phaingea_session`; helpers `esOwner`/`esMasterOOwner`; el rol `admin` equivale a `owner`). UI de login: `src/components/AuthGate.jsx` (overlay + chip de usuario arriba a la derecha).
- **Firebase:** `src/lib/firebase.js` exporta `db` (Realtime Database, proyecto `phaingea`). Config en `src/lib/firebaseConfig.js`. Reglas versionadas en `database.rules.json` (lectura abierta; escritura denegada salvo `/usuarios`). **Al cambiar reglas hay que publicarlas a mano en la consola de Firebase.** Modelo de seguridad "de confianza": el login es puerta de UX, no barrera criptográfica.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**
- Nota: `src/stores/campaign.js` aún NO existe; se crea aquí. El snippet de arriba describe el estado final.

## Archivos a tocar

nuevo `src/stores/campaign.js` · `src/components/TopBar.astro` (conectar logo) · `src/pages/index.astro`

## Pasos sugeridos

1. Nanostore `$campaign` (objeto campaña completa) + `$campaigns` (lista). Persistir el id en localStorage `phaingea_campana`; por defecto `base-phaingea`.
2. Cargar campañas al arrancar (suscripción `onValue` para tiempo real).
3. `setCampaign(id)`; helper `rolEnCampana(user, campana)` → owner/admin global > master si está en `masters` > jugador si está en `jugadores` > invitado.
4. Conectar el logo del topbar (T05) al store (script/isla pequeña).

## Criterios de hecho

- [ ] Cambiar campaña (por consola o botón provisional) actualiza el logo y persiste tras recargar.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
