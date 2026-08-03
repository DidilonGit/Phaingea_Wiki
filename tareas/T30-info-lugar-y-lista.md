# T30 · Información del lugar + lista de lugares

**Fase:** 4 · **Depende de:** T27

## Objetivo

Bajo el mapa: nombre del lugar activo, sección desplegable "Mostrar información" con el papel del máster, y lista alfabética de lugares relacionados.

## Guía (fragmento literal)

## 10.5. Información del lugar

Debajo del mapa aparecerá el nombre del lugar activo.

Después habrá una sección contraída por defecto con el texto **Mostrar información** y un indicador de despliegue.

Al abrirla aparecerá un papel con la información escrita por el máster.

Esta información podrá incluir:

- Descripción.
- Historia.
- Habitantes.
- Gobierno.
- Clima.
- Lugares relevantes.
- Notas.
- Enlaces a lugares contenidos.

El contenido exacto será libre y podrá variar según el lugar.

[...]

## 10.7. Lista de lugares

Debajo del mapa activo aparecerá una lista de lugares relacionados, ordenada alfabéticamente.

Seleccionar un elemento abrirá su información o su mapa.

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/views/Cartografia.astro` / `MapaViewer.jsx`

## Pasos sugeridos

1. Nombre del lugar activo bajo el mapa (sin repetir "Cartografía").
2. Desplegable contraído por defecto ("Mostrar información" + indicador): papel de pergamino con `infoMd` renderizado (markdown), enlaces a lugares contenidos navegables.
3. Lista alfabética de lugares relacionados (hijos del actual; si no tiene, hermanos): clic → abre su info o su mapa.

## Criterios de hecho

- [ ] Desplegable y lista funcionan y cambian con el lugar activo.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
