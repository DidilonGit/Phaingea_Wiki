# T02 · Banderín y sala Moderación (solo máster/owner)

**Fase:** 0 · **Depende de:** T01

## Objetivo

Añadir la categoría Moderación: banderín visible/utilizable solo para máster, owner y admin, con una sala placeholder.

## Guía (fragmento literal)

10. **Moderación**, visible únicamente para másteres y owner

El **Perfil** no será una categoría ni tendrá banderín. Se abrirá desde el perfil del usuario situado en la esquina superior derecha.

Cada banderín tendrá:

- Color propio.
- Forma propia.
- Icono propio.
- Hover suave.
- Nombre visible al desplegarse.
- Estado activo claramente marcado.

No debe repetirse el nombre de la categoría dentro de la propia sala. El banderín activo y el diseño de la habitación ya deben dejar claro dónde se encuentra el usuario.

Cuando alguien no tenga acceso a una categoría, su banderín podrá mostrarse apagado, grisáceo o bloqueado, sin permitir interacción.

[...]

# 25. Categoría Moderación

Moderación tendrá su propio banderín.

Solo será visible para másteres y owner.

Los másteres verán únicamente sus campañas.

El owner verá el conjunto completo.

La categoría incluirá:

- Gestión de campañas.
- Gestión de jugadores.
- Asignación de roles.
- Permisos.
- Solicitudes pendientes.
- Configuración de categorías.
- Herencia de contenido.
- Gestión de grupos.
- Registros importantes.
- Avisos globales.
- Configuración de tips.
- Gestión de notificaciones.
- Acciones generales que no pertenecen a una sala concreta.

## Estado actual relevante

- **Navbar de banderines:** `src/components/TopBar.astro` — array `bookmarks` (key/label/color/shape) e iconos SVG en el objeto `icons`. El conmutador de vistas está al final de `src/pages/index.astro`: función `activar(key)` que muestra/oculta `.view[data-view=key]` y marca el banderín `.activo`.
- **Cuentas/sesión:** login propio en `src/lib/auth.js` (sha256hex, login/registrar contra `/usuarios` en RTDB; la pass se guarda hasheada). Sesión y rol en `src/stores/user.js` (nanostore `$user` + localStorage `phaingea_session`; helpers `esOwner`/`esMasterOOwner`; el rol `admin` equivale a `owner`). UI de login: `src/components/AuthGate.jsx` (overlay + chip de usuario arriba a la derecha).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/TopBar.astro` · nueva `src/components/views/Moderacion.astro` · `src/pages/index.astro`

## Pasos sugeridos

1. Añadir banderín `moderacion` (icono llave/escudo) al final del array.
2. TopBar es estático: añade un pequeño script inline (o isla mínima) que lea la sesión (`localStorage phaingea_session` o `$user`) y oculte/bloquee el banderín si el rol no es master/owner/admin. Reaccionar también al login/logout.
3. Crear `Moderacion.astro` con `data-view="moderacion"` y contenido placeholder (paneles vacíos: Campañas, Jugadores, Solicitudes, Registros).
4. Importarla y colocarla en `index.astro`.

## Criterios de hecho

- [x] Con cuenta `Jowy` (admin) el banderín se ve y abre la sala.
- [x] Con cuenta `Didac` (jugador) no se ve o aparece gris y no interactivo.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
