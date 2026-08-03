# T41 · Filtros por tags (multi-selección AND)

**Fase:** 4 · **Depende de:** T40

## Objetivo

Barra de tags expandible con selección múltiple: solo se muestran imágenes que contienen TODOS los tags activos.

## Guía (fragmento literal)

## 13.2. Filtros por tags

En la parte superior habrá una barra de tags.

La lista podrá:

- Expandirse.
- Contraerse.
- Tener varios tags seleccionados.
- Desactivar un tag pulsándolo de nuevo.

Cuando hay varios tags seleccionados, solo se mostrarán imágenes que contengan **todos** los tags activos.

Ejemplos de tags:

- Personaje.
- Grupal.
- Paisaje.
- Compañero.
- Mascota.
- Aliado.
- Villano.
- Objeto.
- Outfit.
- Lugar.
- Evento.

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/GaleriaView.jsx`

## Pasos sugeridos

1. Barra superior de tags (de `/galeria/{c}/tags`), expandir/contraer si hay muchos.
2. Multi-selección; re-pulsar desactiva; lógica AND estricta.
3. La paginación se recalcula al cambiar el filtro (vuelve a página 1).

## Criterios de hecho

- [x] Dos tags activos → solo imágenes con ambos.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
