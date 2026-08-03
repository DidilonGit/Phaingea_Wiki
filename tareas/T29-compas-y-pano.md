# T29 · Herramientas Compás (dibujo) y Paño (borrado)

**Fase:** 4 · **Depende de:** T27

## Objetivo

Dibujo temporal sobre el mapa (círculos y trazo libre en 4 colores) y borrado controlable.

## Guía (fragmento literal)

El compás permitirá marcar el mapa.

Al seleccionarlo, su espacio mostrará controles para elegir:

- Uno de cuatro colores.
- Modo círculo.
- Modo libre.

El modo círculo dibuja círculos sobre el mapa.

El modo libre permite dibujar manualmente.

Estos dibujos son temporales y personales. Si pueden conservarse tras recargar sin generar una carga excesiva, se mantendrán; si no, se eliminarán al abandonar o recargar la sesión.

### Paño

El paño funcionará como goma de borrar.

Permitirá:

- Borrar zonas concretas.
- Eliminar trazos.
- Corregir círculos.
- Limpiar todos los dibujos mediante una opción separada.

El borrado debe ser controlable por el usuario, no una eliminación automática de todas las marcas al seleccionar la herramienta.

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/MapaViewer.jsx`

## Pasos sugeridos

1. Capa `<canvas>` alineada con el mapa (se transforma con pan/zoom).
2. Compás: selector de 4 colores + modo círculo (arrastrar radio) y modo libre (trazo).
3. Paño: goma por arrastre + botón separado "Limpiar todo" (con confirmación simple).
4. Persistir trazos en localStorage por lugar si resulta barato (serializar paths); si no, efímeros — decidir y documentar en el archivo.

## Criterios de hecho

- [x] Dibujar círculo y trazo, borrar parte con el paño, limpiar todo.
- [x] Los dibujos siguen alineados al hacer pan/zoom.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
