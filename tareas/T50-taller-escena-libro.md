# T50 · Taller: escena y libro de reglas

**Fase:** 4 · **Depende de:** T01, T09, T10, T11

## Objetivo

La escena del taller (oscura, creativa, legible) con el libro de reglas de la campaña (markdown o documento maquetado).

## Guía (fragmento literal)

# 16. Taller

Taller será la categoría de reglas propias, homebrew, consejos y notas de campaña.

## 16.1. Escena

Debe sentirse como un taller algo caótico, oscuro y creativo.

La decoración puede incluir:

- Borradores.
- Papeles.
- Tablones.
- Herramientas.
- Anotaciones.
- Jaulas.
- Elementos experimentales.

La sala puede tener poca iluminación, pero el texto debe seguir siendo legible.

## 16.2. Libro de reglas

Cada campaña podrá utilizar:

- Un documento ya maquetado.
- Un contenido escrito en Markdown.
- Una combinación de ambos según sus necesidades.

El contenido en Markdown se organizará como libro con páginas.

El libro tendrá:

- Índice.
- Buscador.
- Navegación rápida.
- Pantalla completa.
- Paso de página.
- Acceso para volver al índice.

## Estado actual relevante

- **Libro compartido:** creado en T09 (`src/components/Libro.jsx`), con buscador (T10) y pantalla completa (T11). Úsalo, no reinventes flipbooks.
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Firebase:** `src/lib/firebase.js` exporta `db` (Realtime Database, proyecto `phaingea`). Config en `src/lib/firebaseConfig.js`. Reglas versionadas en `database.rules.json` (lectura abierta; escritura denegada salvo `/usuarios`). **Al cambiar reglas hay que publicarlas a mano en la consola de Firebase.** Modelo de seguridad "de confianza": el login es puerta de UX, no barrera criptográfica.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/views/Taller.astro` + isla · nodo `/taller/{campanaId}`

## Pasos sugeridos

1. Escena: tablones, papeles, herramientas decorativas discretas, iluminación baja con texto legible; hueco de la jaula (T52).
2. Nodo `/taller/{campanaId}`: `{reglasMd | documentoUrl}`. Render como Libro (markdown paginado o páginas del doc).
3. Índice, buscador, navegación rápida, fullscreen, volver al índice (todo del Libro).

## Criterios de hecho

- [x] Libro de reglas navegable con contenido WIP.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
