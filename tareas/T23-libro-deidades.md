# T23 · Libro de deidades sobre el atril

**Fase:** 4 · **Depende de:** T09, T10, T11, T22

## Objetivo

Montar el Libro con el documento de deidades (maquetado) sobre el atril, con índice, buscador, fullscreen e indicador de herencia.

## Guía (fragmento literal)

## 9.2. Libro de deidades

El contenido principal será un libro apoyado sobre el atril.

Normalmente mostrará un documento ya maquetado, conservando:

- Portada.
- Contraportada.
- Colores.
- Imágenes.
- Diseño de página.
- Tipografía.
- Composición.

Opcionalmente se podrá añadir una portada o contraportada creada desde la web.

El libro tendrá:

- Paso de página.
- Índice.
- Buscador.
- Acceso rápido a una página.
- Controles para avanzar y retroceder.
- Botón para volver al índice.
- Botón de pantalla completa.

## Estado actual relevante

- **Libro compartido:** creado en T09 (`src/components/Libro.jsx`), con buscador (T10) y pantalla completa (T11). Úsalo, no reinventes flipbooks.
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**
- El documento real (PDF/imágenes) lo aporta el máster. Mientras no exista, usar páginas WIP. Si es PDF: renderizar con pdf.js a imágenes/canvas y meterlas como páginas del Libro (preservar diseño original: guía §27.1).

## Archivos a tocar

`src/components/views/Capilla.astro` + isla del libro · `src/lib/db/` (nodo `/capilla/{campana}` con ref al documento)

## Pasos sugeridos

1. Nodo `/capilla/{campanaId}`: `{documentoUrl | paginas[], portadaWeb?}`. Resolver herencia básica: si la campaña hereda, leer de la campaña origen (completo en T62).
2. Libro sobre el atril con índice/buscador/ir-a-página/fullscreen (T09-T11).
3. Texto pequeño "Heredado de «Base de Phaingea»" cuando aplique.

## Criterios de hecho

- [ ] Libro navegable sobre el atril con fullscreen.
- [ ] Indicador de herencia visible cuando corresponde.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
