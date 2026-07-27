# 07 · Estructura del proyecto

## Árbol de carpetas (Astro)

```
phaingea/                       ← raíz del repo
├─ astro.config.mjs             ← config (site, base, integraciones)
├─ package.json
├─ .env                         ← PUBLIC_FIREBASE_* (ignorado en git)
├─ .env.example                 ← plantilla sin valores reales
├─ database.rules.json          ← reglas de seguridad de RTDB (versionadas)
├─ firebase.json                ← config CLI (rules/deploy)
├─ .github/workflows/deploy.yml ← build + publish a GitHub Pages
├─ public/                      ← estáticos servidos tal cual
│  ├─ textures/  (madera, papel, pergamino…)
│  ├─ icons/     (svg de bookmarks/estados)
│  ├─ sounds/    (page-flip, book-open…)
│  └─ pdf/       (PDFs fijos si no usamos Storage)
└─ src/
   ├─ layouts/
   │  └─ RoomLayout.astro       ← barra superior + escena común
   ├─ pages/                    ← rutas (Astro genera HTML por cada una)
   │  ├─ index.astro            ← Observatorio / home
   │  ├─ deidades.astro
   │  ├─ regiones.astro
   │  ├─ personajes.astro
   │  ├─ galeria.astro
   │  ├─ sesiones.astro
   │  ├─ perfil.astro
   │  └─ moderacion.astro
   ├─ components/               ← .astro (estáticos) y .jsx (islas React)
   │  ├─ TopBar.astro
   │  ├─ Bookmark.astro
   │  ├─ CampaignDial.jsx       ← isla React
   │  ├─ FlipBook.jsx           ← isla React
   │  ├─ PdfViewer.jsx          ← isla React
   │  ├─ CommentThread.jsx      ← isla React
   │  ├─ ProfileModal.jsx       ← isla React
   │  └─ ModButton.jsx          ← isla React
   ├─ lib/
   │  ├─ firebase.js            ← init de Firebase (auth, db)
   │  ├─ auth.js                ← login/logout, usuario actual
   │  ├─ db/                    ← funciones de acceso a datos por entidad
   │  │  ├─ campaigns.js
   │  │  ├─ sessions.js
   │  │  ├─ characters.js
   │  │  ├─ comments.js
   │  │  └─ ...
   │  ├─ permissions.js         ← helpers de permisos en cliente
   │  └─ xp.js                  ← tablas Pathfinder 1e + cálculo de nivel
   ├─ stores/                   ← nanostores (compartidos entre islas React)
   │  ├─ user.js                ← usuario autenticado + rol
   │  └─ campaign.js            ← campaña activa
   └─ styles/
      ├─ tokens.css
      └─ global.css
```

## Rutas y renderizado

- Cada `src/pages/*.astro` = una **sala** = una URL. Astro las prerenderiza a HTML estático.
- Dentro de cada página, la parte pesada es HTML/CSS (barato) y solo se hidratan las **islas React** que necesitan JS (dial, libro, comentarios…), con directivas `client:load` / `client:visible` / `client:idle` según urgencia.
- La escena común (barra + fondo) vive en `RoomLayout.astro` para no repetirla.
- **Transiciones entre salas:** `<ViewTransitions />` de Astro para el cross-fade sin recargar del todo.

## Estado global (nanostores)

Como las islas React de Astro son componentes **independientes** (cada una se hidrata por su cuenta), no comparten estado con Context de React normal. Usamos **nanostores** (`@nanostores/react` con el hook `useStore`), que sí funciona entre islas:

- `stores/user.js`: se suscribe a `onAuthStateChanged` y carga `users/{uid}` → expone `{ user, role }`. Cualquier isla lo lee con `useStore`.
- `stores/campaign.js`: campaña activa (persistida en `localStorage`). El dial la cambia; las salas reaccionan.
- Las islas se suscriben a estos stores y a la RTDB (con `onValue` para lecturas en tiempo real donde aporte: comentarios, notificaciones).

## Config de Astro (esqueleto)

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://TUUSUARIO.github.io',
  base: '/NOMBRE_REPO',        // '' si el repo es TUUSUARIO.github.io
  output: 'static',
  integrations: [react()],
});
```

> El `base` es crítico para GitHub Pages: si el sitio vive en `usuario.github.io/phaingea`, todos los enlaces y assets deben respetar ese prefijo. Se resuelve en fase 0 en cuanto sepamos el nombre del repo.

## Convenciones

- Un módulo por entidad en `lib/db/`. Nada de llamar a Firestore suelto desde componentes.
- Los componentes `.astro` no traen JS al cliente; las islas React (`.jsx`) solo se hidratan con `client:*`.
- Nombres de ficheros de datos y claves en inglés (coherencia con el modelo), textos de UI en español.
