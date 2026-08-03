# T58 · Álbum de cartas archivadas

**Fase:** 4 · **Depende de:** T57

## Objetivo

El álbum coleccionable donde quedan las cartas archivadas, paginado y consultable.

## Guía (fragmento literal)

## 18.6. Álbum

Las cartas archivadas se guardarán en un álbum coleccionable.

El álbum:

- Se organiza por páginas.
- Muestra las partes traseras de las cartas.
- Añade nuevas páginas cuando sea necesario.
- Permite pulsar una carta para ampliarla y leerla.
- Conserva fecha, asunto, campaña y contenido.

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/BuzonView.jsx`

## Pasos sugeridos

1. Álbum por páginas mostrando traseras (grid de cartas pequeñas); páginas nuevas automáticas.
2. Clic en carta → ampliar y releer (reusar la vista de T57).
3. Conserva fecha, asunto, campaña y contenido.

## Criterios de hecho

- [ ] Las archivadas se consultan desde el álbum.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
