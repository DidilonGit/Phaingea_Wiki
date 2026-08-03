# T42 · Vista ampliada de imagen

**Fase:** 4 · **Depende de:** T40

## Objetivo

Lightbox de imagen con título, descripción, tags y autor.

## Guía (fragmento literal)

## 13.4. Vista ampliada

Al pulsar una imagen:

- Se abre en grande.
- El fondo se oscurece y desenfoca.
- Aparece el título.
- Aparece la descripción.
- Aparecen sus tags.
- Aparece el texto **Subido por [jugador]**.
- Puede cerrarse haciendo clic fuera o mediante una X.

El título será visible tanto en la vista normal como en la ampliada.

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/GaleriaView.jsx`

## Pasos sugeridos

1. Clic en cuadro → imagen grande centrada, fondo oscurecido+desenfocado.
2. Título (visible también en la vista normal, en el marco), descripción, tags, "Subido por [jugador]".
3. Cerrar con X o clic fuera.

## Criterios de hecho

- [x] Todo lo listado visible en la ampliación.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
