# T54 · Estructura de botellas y huecos reservados

**Fase:** 4 · **Depende de:** T53

## Objetivo

Cada herramienta tiene su botella y hay huecos visibles reservados para herramientas futuras.

## Guía (fragmento literal)

## 17.1. Escena

En el centro habrá un caldero.

Alrededor aparecerán botellas de poción, cada una asociada a una herramienta.

También habrá espacios para nuevas botellas que se incorporen en el futuro.

[...]

## 17.3. Herramientas

Las pociones actuales podrán mantenerse como placeholders.

La estructura general ya queda definida, pero el comportamiento detallado de cada herramienta se decidirá más adelante.

Ejemplos de herramientas posibles:

- Calculador de daño por caída.
- Conversor de pies a metros.
- Calculador de viaje.
- Otras utilidades relacionadas con Pathfinder y las campañas.

La ausencia de una herramienta terminada no debe impedir que su botella, nombre o hueco aparezcan como espacio reservado.

## Estado actual relevante

- **Sala de Pociones:** `src/components/views/Pociones.astro` — iframe a `public/pociones/index.html` (Mesa de alquimia, app autónoma con `support.js`). El conmutador de `index.astro` carga el iframe al entrar (`data-src`→`src`) y lo descarga al salir (`about:blank`) para que no corra en segundo plano. Fondos puestos en transparente para que flote sobre las estrellas.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`public/pociones/*` o la isla de T53

## Pasos sugeridos

1. Mapear las herramientas actuales de la mesa (caída, nombres, criaturas, metros-pies, viaje, dados) a botellas con nombre al hover.
2. Añadir ≥2 huecos vacíos "Próximamente" (soporte sin botella o botella apagada).

## Criterios de hecho

- [ ] Botellas actuales + huecos visibles; nombres al hover.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
