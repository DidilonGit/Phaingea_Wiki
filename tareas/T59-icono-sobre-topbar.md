# T59 · Icono de sobre con contador junto al perfil

**Fase:** 4 · **Depende de:** T55

## Objetivo

Acceso rápido: sobre con contador (1..9+) junto al avatar cuando hay pendientes de la campaña activa; clic abre el Buzón ya abierto.

## Guía (fragmento literal)

## 18.1. Acceso rápido

Cuando existan notificaciones pendientes de la campaña activa, aparecerá un pequeño icono de sobre a la izquierda del perfil.

El icono mostrará:

- 1, 2, 3, etc.
- **9+** cuando haya más de nueve.

Si no hay notificaciones pendientes, el icono no aparece.

Al pulsarlo:

- Se abre directamente el Buzón.
- El sobre aparece ya abierto.
- Se muestran las cartas pendientes.

## Estado actual relevante

- **Cuentas/sesión:** login propio en `src/lib/auth.js` (sha256hex, login/registrar contra `/usuarios` en RTDB; la pass se guarda hasheada). Sesión y rol en `src/stores/user.js` (nanostore `$user` + localStorage `phaingea_session`; helpers `esOwner`/`esMasterOOwner`; el rol `admin` equivale a `owner`). UI de login: `src/components/AuthGate.jsx` (overlay + chip de usuario arriba a la derecha).
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/AuthGate.jsx` (o isla topbar)

## Pasos sugeridos

1. Suscripción al contador de pendientes (T55) de la campaña activa; ocultar el icono si 0; "9+" si >9.
2. Clic → conmutar a la vista buzón con el sobre ya abierto (abanico desplegado).

## Criterios de hecho

- [x] Contador reactivo en tiempo real; clic abre el Buzón desplegado.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
