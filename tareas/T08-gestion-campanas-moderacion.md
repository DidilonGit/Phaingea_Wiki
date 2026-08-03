# T08 · Gestión mínima de campañas desde Moderación

**Fase:** 1 · **Depende de:** T02, T06

## Objetivo

Que owner/admin puedan crear, editar, cambiar de estado y reordenar campañas desde la sala Moderación.

## Guía (fragmento literal)

El orden inicial de las campañas será el de creación, aunque el owner podrá reorganizarlo.

### 5.1. Estados de campaña

Una campaña podrá marcarse como:

- Activa.
- Finalizada.
- Archivada.
- Privada.

Su estado aparecerá mediante un pequeño indicador sobre el planeta o icono de campaña, parecido a una insignia de notificación. Debe ser visible sin tapar el diseño del planeta.

[...]

La categoría incluirá:

- Gestión de campañas.
- Gestión de jugadores.
- Asignación de roles.
- Permisos.
- Solicitudes pendientes.
- Configuración de categorías.
- Herencia de contenido.
- Gestión de grupos.

## Estado actual relevante

- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Cuentas/sesión:** login propio en `src/lib/auth.js` (sha256hex, login/registrar contra `/usuarios` en RTDB; la pass se guarda hasheada). Sesión y rol en `src/stores/user.js` (nanostore `$user` + localStorage `phaingea_session`; helpers `esOwner`/`esMasterOOwner`; el rol `admin` equivale a `owner`). UI de login: `src/components/AuthGate.jsx` (overlay + chip de usuario arriba a la derecha).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/views/Moderacion.astro` · nueva isla `src/components/mod/ModCampanas.jsx` · `src/lib/db/campanas.js`

## Pasos sugeridos

1. Isla con lista de campañas (nombre, estado, orden).
2. Form crear/editar: nombre, descripción, colores, progresión XP, estado, jugadores/masters (por nombre de usuario), orden.
3. Reordenar (subir/bajar). Base de Phaingea no se puede eliminar ni desmarcar como base.
4. Gatear todo a owner/admin.

## Criterios de hecho

- [x] Crear una campaña de prueba desde la web y verla en RTDB.
- [x] Editar y cambiar estado funciona.
- [x] Un jugador no puede ni ver los formularios.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
