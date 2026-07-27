# PROGRESO — estado vivo del proyecto Phaingea

> **Este es el fichero que se lee al empezar cada sesión** (junto a `00-INDICE.md`). Aquí está siempre: en qué fase estamos, qué decisiones se han tomado, qué está bloqueado y cuál es el siguiente paso.

## Estado actual

- **Fase actual:** 0 · Cimientos — **✅ COMPLETADA Y PUBLICADA**. Web en vivo en https://didilongit.github.io/Phaingea_Wiki/ mostrando "Firebase conectado".
- **Última actualización:** 2026-07-27 — Fase 0 desplegada y verificada en vivo.
- **Siguiente paso concreto:** arrancar **Fase 1 (login usuario+contraseña + barra con permisos)**. Antes, activar en la consola de Firebase el proveedor **Email/contraseña** y añadir `didilongit.github.io` a dominios autorizados de Auth.

## Bloqueos / esperando de ti

| Bloqueo | Necesario para | Estado |
|---------|----------------|--------|
| `firebaseConfig` completo | Conectar Firebase (Fase 0) | ✅ recibido y funcionando |
| Repo GitHub + Pages | Publicar la web | ✅ desplegada y en vivo |
| Activar proveedor Email/contraseña en consola | Fase 1 (auth) | ⏳ pendiente |
| Añadir `didilongit.github.io` a dominios autorizados de Auth | Fase 1 (login en producción) | ⏳ pendiente |
| Plan Spark vs Blaze | Fase 7 (Galería/Storage) | ⏳ pendiente (no urgente) |

## Notas de infra / CI

- El deploy usa `withastro/action@v3` con **`node-version: 22`** (Astro 7 requiere Node ≥ 22.12; el runner trae Node 20 por defecto → hay que forzarlo).
- Repo limpio de referencias a Claude: `.claude/` y `CLAUDE.md` gitignorados; commits sin trailer de co-autor; contributors = solo Jowy05.

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
- **2026-07-27** — **Fase 0 implementada.** Proyecto Astro 7 + React 19 + Firebase 12 montado en `Documents/Phaingea web`. Ficheros: `astro.config.mjs` (base `/Phaingea_Wiki`), `src/lib/firebase.js` (+ `firebaseConfig.js` con la config real), `TopBar.astro`, `RoomLayout.astro`, `index.astro` (observatorio landing), isla `FirebaseStatus.jsx`, `tokens.css`/`global.css`, workflow `.github/workflows/deploy.yml`. Build local OK y verificado en navegador. `git init` + commit como **Jowy05** + push a `DidilonGit/Phaingea_Wiki`.
- **2026-07-27** — **Fase 0 PUBLICADA.** Didilon activó Pages (Source: GitHub Actions). Primer deploy falló por Node 20 en el runner (Astro 7 necesita Node ≥22.12) → arreglado con `node-version: 22` en el workflow. Segundo deploy OK. Web en vivo verificada: https://didilongit.github.io/Phaingea_Wiki/ muestra "Firebase conectado · proyecto phaingea", HTTP 200, sin errores. Limpieza de referencias a Claude (`.claude/` + `CLAUDE.md` gitignorados, commit sin trailer, contributors = solo Jowy05). **Fase 0 ✅ → siguiente: Fase 1 (login).**

## Plantilla para próximas entradas del log

```
- **FECHA** — [qué se hizo]. [decisiones]. [qué queda]. Fase X → Y.
```

## Recordatorio de la regla de oro

Al terminar cualquier trabajo: actualizar **Estado actual**, **Bloqueos** y añadir una línea al **log**. Así el proyecto se puede retomar en cualquier momento sin perder nada.
