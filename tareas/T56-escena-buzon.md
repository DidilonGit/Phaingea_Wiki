# T56 · Escena del Buzón (sobre y abanico de cartas)

**Fase:** 4 · **Depende de:** T55

## Objetivo

El rincón de correspondencia: buzón con sobre cerrado y contador; al pulsarlo las cartas pendientes salen y se colocan en abanico.

## Guía (fragmento literal)

## 18.2. Escena

La sala será un rincón tranquilo para leer correspondencia.

Tendrá:

- Madera.
- Iluminación cálida.
- Sensación de fuego o chimenea.
- Buzón antiguo.
- Álbum de cartas.
- Ambiente calmado.

## 18.3. Sobre de pendientes

A la derecha habrá una pared de madera con un buzón.

Del buzón sobresaldrá un sobre cerrado.

El número de cartas pendientes aparecerá en el propio buzón.

Al pulsar el sobre:

- Se abre.
- Las cartas salen flotando.
- Se colocan en abanico en la parte superior central.

Al hacer hover sobre una carta, esta sobresale del abanico.

## Estado actual relevante

- **Salas:** una por componente en `src/components/views/*.astro`, cada una renderiza `<section class="view" data-view="KEY" hidden>`. Estilos compartidos en `src/styles/views.css` (`.room`, `.panel`, `.grid`, `.chips/.chip`, `.book`, `.comments/.comment`, `.char/.badge`, `.gallery/.frame`, `.session`, `.notif`, `.empty`...). Tokens en `src/styles/tokens.css`. El contenido actual de las salas es placeholder (WIP).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/views/Buzon.astro` + isla `src/components/BuzonView.jsx`

## Pasos sugeridos

1. Escena: pared de madera, luz cálida (glow de chimenea), buzón antiguo a la derecha con sobre sobresaliendo y el número de pendientes.
2. Clic en el sobre → animación: cartas salen flotando y se colocan en abanico arriba-centro.
3. Hover en carta → sobresale del abanico.

## Criterios de hecho

- [x] Con pendientes reales, el abanico se forma con animación.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
