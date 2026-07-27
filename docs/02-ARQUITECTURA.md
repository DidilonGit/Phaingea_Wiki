# 02 · Arquitectura técnica

## Visión general

```
                 ┌─────────────────────────────┐
   Navegador ───▶│  Web estática (Astro SSG)   │  ← alojada en GitHub Pages
                 │  HTML + CSS + islas JS       │
                 └──────────────┬───────────────┘
                                │ SDK de Firebase (cliente)
                 ┌──────────────▼───────────────┐
                 │           Firebase            │
                 │  · Authentication (login)     │
                 │  · Base de datos (datos)      │
                 │  · Storage (imágenes / PDF)*  │
                 │  · Security Rules (permisos)  │
                 └───────────────────────────────┘
```

**Idea clave:** GitHub Pages solo sirve **ficheros estáticos** (no hay servidor propio). Toda la lógica dinámica (login, datos, permisos) ocurre en el **navegador** hablando directamente con Firebase mediante su SDK de cliente. No necesitamos backend propio.

## Por qué Astro

- Genera sitio **estático** (`output: 'static'`) → perfecto para GitHub Pages.
- **Islands architecture**: la mayor parte es HTML/CSS ligero y solo las partes interactivas (dial, libros, formularios, comentarios) se hidratan con JS. Ideal para una web con mucha ambientación visual pero pocas zonas realmente interactivas.
- Permite animaciones y transiciones (View Transitions API nativa de Astro) sin cargar un framework pesado en toda la página.
- Fácil de desplegar con GitHub Actions.

## Decisiones de stack

| Área | Decisión recomendada | Alternativa | Estado |
|------|----------------------|-------------|--------|
| Framework base | **Astro** (static) | — | ✅ fijado (lo pediste) |
| Islas interactivas | **React** (`@astrojs/react`) | Svelte / Vue | ✅ fijado (2026-07-27) |
| Estado entre islas | **nanostores** (agnóstico, funciona entre islas React) | — | ✅ |
| Base de datos | **Realtime Database** (ya provisionada `phaingea-default-rtdb`) | Firestore | ✅ fijado (2026-07-27) |
| Auth | Firebase Authentication (Google + Email/Contraseña) | — | ⏳ a confirmar proveedores |
| Almacenamiento de imágenes/PDF | Firebase Storage (**requiere plan Blaze**) | Cloudinary / repo git para estáticos | ⏳ depende del plan |
| Animación paso de página | **StPageFlip** (vanilla, ya usado antes en tu manual flipbook) | CSS 3D propio | ✅ recomendado |
| Renderizado de PDF | **PDF.js** (preserva diseño, permite capa de texto para búsqueda) | `<iframe>` embed | ✅ recomendado |
| Iconos | SVG propios / set genérico | — | ⏳ |
| Estado global (campaña activa, usuario) | Stores de Svelte + suscripción a Firebase | nanostores (agnóstico) | ⏳ |

### Base de datos: Realtime Database (decidido)
Usamos la **Realtime Database** ya provisionada (la URL del `firebaselink.txt`). Es más simple y barata en tiempo real. Contrapartida: las consultas son de un solo campo, así que los **filtros combinados de la galería** (tags + autor + campaña) se resuelven **en el cliente** o **duplicando/denormalizando** datos para poder indexar por lo que más se filtra. El modelo del árbol está en [`04-MODELO-DATOS.md`](04-MODELO-DATOS.md) (sección Realtime Database). Reglas de seguridad en `database.rules.json`.

## Seguridad: dónde vive de verdad

En una web estática, **el navegador no es de fiar**: cualquiera puede leer el JS. Por eso:

- La `apiKey` de Firebase **no es secreta** (identifica el proyecto, no da acceso). Va en el código sin problema.
- La seguridad real la imponen las **Security Rules** de Firestore/RTDB/Storage: definen quién puede leer/escribir qué según su rol y permisos. Este es el corazón de la protección → [`05-ROLES-PERMISOS.md`](05-ROLES-PERMISOS.md).
- Nada de "esconder" botones = seguridad. Ocultar la UI es solo cosmético; la regla de servidor es la que manda.

## Flujo de despliegue (GitHub Pages)

1. Repo en GitHub con el proyecto Astro.
2. GitHub Action que hace `astro build` y publica `dist/` en Pages.
3. `astro.config` con `site` y `base` correctos (el `base` depende de si es `usuario.github.io` o `usuario.github.io/repo`).
4. Dominio publicado añadido a **dominios autorizados** de Firebase Auth.

Detalle completo en [`03-FIREBASE-SETUP.md`](03-FIREBASE-SETUP.md) y en la fase 0 del [`08-ROADMAP-FASES.md`](08-ROADMAP-FASES.md).

## Riesgos técnicos a vigilar (de la sección 36 de la spec)

- Búsqueda **dentro** de PDFs → resoluble con la capa de texto de PDF.js (si el PDF tiene texto real, no imágenes escaneadas).
- Storage requiere plan de pago (Blaze) → decidir alternativa si se quiere plan gratuito.
- Coste de lecturas en Firestore con muchos comentarios/notificaciones → mitigar con paginación y buen modelado.
- Dial en móvil → dejar el layout preparado desde el principio.
