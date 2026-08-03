# T17 · Permisos por campaña/categoría + banderines bloqueados

**Fase:** 2 · **Depende de:** T07

## Objetivo

Helpers de permisos según la guía §21 y aplicación en el navbar: banderines grises/no interactivos sin acceso.

## Guía (fragmento literal)

# 21. Roles y permisos

La web tendrá cuatro niveles principales.

## 21.1. Invitado

Puede ver únicamente el contenido que se le haya permitido.

No participa ni tiene personaje.

## 21.2. Jugador

Puede:

- Participar en una o varias campañas.
- Crear y editar su personaje.
- Comentar.
- Reaccionar.
- Proponer imágenes.
- Recibir experiencia.
- Consultar notificaciones.
- Gestionar la privacidad de su personaje.

## 21.3. Máster

Puede administrar únicamente las campañas de las que es responsable.

Puede:

- Gestionar sesiones y eventos.
- Repartir experiencia.
- Gestionar personajes.
- Aprobar contenido.
- Moderar comentarios.
- Editar lugares.
- Configurar categorías.
- Gestionar jugadores de su campaña.
- Consultar registros importantes.
- Acceder a Moderación.

## 21.4. Owner

Tiene acceso global.

Puede:

- Hacer todo lo que hace un máster.
- Administrar cualquier campaña.
- Administrar Base de Phaingea.
- Crear, eliminar y reordenar campañas.
- Asignar másteres.
- Gestionar usuarios.
- Cambiar configuraciones globales.
- Acceder a todos los registros.

## 21.5. Permisos separados

Los permisos podrán diferenciar:

- Ver una campaña.
- Participar.
- Ver una categoría.
- Comentar.
- Proponer contenido.
- Gestionar contenido.
- Aprobar solicitudes.
- Administrar una campaña.

Tener acceso visual no implica participar ni tener personaje.

## Estado actual relevante

- **Cuentas/sesión:** login propio en `src/lib/auth.js` (sha256hex, login/registrar contra `/usuarios` en RTDB; la pass se guarda hasheada). Sesión y rol en `src/stores/user.js` (nanostore `$user` + localStorage `phaingea_session`; helpers `esOwner`/`esMasterOOwner`; el rol `admin` equivale a `owner`). UI de login: `src/components/AuthGate.jsx` (overlay + chip de usuario arriba a la derecha).
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Navbar de banderines:** `src/components/TopBar.astro` — array `bookmarks` (key/label/color/shape) e iconos SVG en el objeto `icons`. El conmutador de vistas está al final de `src/pages/index.astro`: función `activar(key)` que muestra/oculta `.view[data-view=key]` y marca el banderín `.activo`.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

nuevo `src/lib/permisos.js` · `src/components/TopBar.astro`

## Pasos sugeridos

1. `puedeVerCampana`, `puedeParticipar`, `puedeVerCategoria`, `puedeComentar`, `puedeProponer`, `puedeGestionar(campana, user, categoria?)` — combinando rol global (owner/admin) + `rolEnCampana` (T07).
2. Campaña `privada`: solo participantes/masters/owner la ven.
3. Banderines sin acceso: filtro gris + sin pointer events (refinar el gating de Moderación de T02 usando estos helpers).

## Criterios de hecho

- [ ] Con jugador sin acceso a una campaña privada, esa campaña no aparece y sus categorías quedan bloqueadas.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
