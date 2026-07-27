# PROGRESO — estado vivo del proyecto Phaingea

> **Este es el fichero que se lee al empezar cada sesión** (junto a `00-INDICE.md`). Aquí está siempre: en qué fase estamos, qué decisiones se han tomado, qué está bloqueado y cuál es el siguiente paso.

## Estado actual

- **Fase actual:** 0 · Cimientos — **casi completa**. Proyecto Astro montado, conectado a Firebase, build OK, código en GitHub. Falta solo activar Pages (acción de owner).
- **Última actualización:** 2026-07-27 — Fase 0 implementada y subida al repo.
- **Siguiente paso concreto:** que **Didilon (owner del repo)** active GitHub Pages con fuente "GitHub Actions". Luego re-ejecutar el workflow → web publicada en `https://didilongit.github.io/Phaingea_Wiki/`. Después, arrancar Fase 1 (auth).

## Bloqueos / esperando de ti

| Bloqueo | Necesario para | Estado |
|---------|----------------|--------|
| `firebaseConfig` completo | Conectar Firebase (Fase 0) | ✅ recibido y funcionando |
| Nombre del repo GitHub | `base` de Astro + deploy | ✅ `DidilonGit/Phaingea_Wiki` |
| **Activar Pages (Source: GitHub Actions)** | Publicar la web | ⏳ **lo debe hacer Didilon (owner); el token de Jowy05 solo tiene push, no admin** |
| Activar proveedor Email/contraseña en consola | Fase 1 (auth) | ⏳ pendiente |
| Plan Spark vs Blaze | Fase 7 (Galería/Storage) | ⏳ pendiente (no urgente) |

> Decisiones cerradas el 2026-07-27: **Realtime Database** como BD principal y **React** para las islas.

## Decisiones tomadas

- **Framework:** Astro estático (petición del usuario). ✅
- **Hosting:** GitHub Pages. ✅
- **Firebase:** RTDB ya provisionada (`phaingea-default-rtdb`, europe-west1). Config web pendiente.
- **Base de datos:** **Realtime Database** (elección del usuario, 2026-07-27). Los filtros de la galería se resolverán en cliente / con datos duplicados donde haga falta. ✅
- **Islas interactivas:** **React** (`@astrojs/react`) + **nanostores** para estado compartido entre islas. ✅
- **Login:** Firebase Authentication, proveedor **Email/contraseña**, con truco usuario→email interno (`usuario@phaingea.local`). El usuario solo escribe **usuario + contraseña**; sin Google, sin emails visibles. **La contraseña NUNCA vive en la base de datos** (la guarda Firebase Auth cifrada). En la BD solo el perfil (username, displayName, role, settings) por UID. Sin recuperación por email → owner resetea contraseñas. (2026-07-27) ✅
- **Repo GitHub:** `DidilonGit/Phaingea_Wiki` (usuario es colaborador). Pages → `didilongit.github.io/Phaingea_Wiki` → `base: '/Phaingea_Wiki'`, `site: 'https://didilongit.github.io'`. ✅

## Decisiones pendientes (con recomendación)

| Decisión | Recomendación | Motivo |
|----------|---------------|--------|
| Storage imágenes/PDF | Blaze + Firebase Storage, o Cloudinary si se quiere gratis | Storage exige Blaze |

## Registro de avances (log)

- **2026-07-27** — Leída la especificación funcional completa (36 secciones) y el `firebaselink.txt`. Creada la carpeta `docs/` con: índice, visión/alcance, arquitectura, setup de Firebase, modelo de datos, roles/permisos, sistema de diseño, estructura de proyecto, roadmap por fases y recetas de componentes. Definido el MVP (Sesiones + Personajes + auth/roles + deploy).
- **2026-07-27** — **Fase 0 implementada.** Proyecto Astro 7 + React 19 + Firebase 12 montado en `Documents/Phaingea web`. Ficheros: `astro.config.mjs` (base `/Phaingea_Wiki`), `src/lib/firebase.js` (+ `firebaseConfig.js` con la config real), `TopBar.astro`, `RoomLayout.astro`, `index.astro` (observatorio landing), isla `FirebaseStatus.jsx`, `tokens.css`/`global.css`, workflow `.github/workflows/deploy.yml`. Build local OK y verificado en navegador: renderiza y muestra "Firebase conectado · proyecto phaingea", sin errores de consola. `git init` + commit como **Jowy05** + push a `DidilonGit/Phaingea_Wiki` (rama main) con token. Pendiente: Didilon active Pages. Fase 0 → 1 (tras publicar).

## Plantilla para próximas entradas del log

```
- **FECHA** — [qué se hizo]. [decisiones]. [qué queda]. Fase X → Y.
```

## Recordatorio de la regla de oro

Al terminar cualquier trabajo: actualizar **Estado actual**, **Bloqueos** y añadir una línea al **log**. Así el proyecto se puede retomar en cualquier momento sin perder nada.
