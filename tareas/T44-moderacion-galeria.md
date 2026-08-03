# T44 · Moderación de la Galería

**Fase:** 4 · **Depende de:** T16, T43

## Objetivo

Panel del máster: aprobar/denegar/editar/eliminar/subir directo, con aviso a los aprobadores cuando llega una propuesta.

## Guía (fragmento literal)

## 13.7. Moderación de Galería

El máster podrá:

- Ver solicitudes pendientes.
- Aprobar imágenes.
- Denegarlas.
- Modificar título.
- Modificar descripción.
- Añadir o retirar tags.
- Crear tags.
- Eliminar imágenes.
- Subir imágenes directamente sin aprobación.

Cuando un jugador envíe una propuesta, las personas capaces de aprobarla recibirán una notificación con acceso directo a la Galería.

## Estado actual relevante

- **Permisos:** helpers por campaña/categoría en `src/lib/permisos.js` (T17). Botón de moderación contextual `src/components/BotonMod.jsx` (T16).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**
- Las notificaciones reales llegan en T55: si aún no existe `notificar()`, dejar el hook con un TODO enlazado a T55.

## Archivos a tocar

`src/components/GaleriaView.jsx` + `BotonMod`

## Pasos sugeridos

1. Vista de solicitudes pendientes (para master/owner) con aprobar/denegar.
2. Editar título/descripción/tags, crear tags, eliminar (doble confirmación).
3. Subida directa sin aprobación para master/owner.
4. Llamar a `notificar()` a los aprobadores al crear una propuesta (o TODO).

## Criterios de hecho

- [x] Aprobar hace pública la imagen al instante (tiempo real).
- [x] Jugador no ve el panel.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
