# T62 · Herencia de contenido (Capilla y Cartografía)

**Fase:** 4 · **Depende de:** T06, T23, T27

## Objetivo

Sistema de herencia: Capilla y Cartografía pueden heredar de Base (u otra campaña), con indicador claro y controles del máster.

## Guía (fragmento literal)

## 7. Herencia de contenido

Algunas categorías podrán heredar su contenido de Base de Phaingea o de otra campaña.

Por defecto:

- Capilla podrá heredar sus deidades.
- Cartografía podrá heredar sus mapas, regiones y lugares.

Mientras la herencia esté activa, los cambios realizados en la campaña de origen se reflejarán también en la campaña que hereda.

El máster podrá:

- Mantener la herencia.
- Cambiar la campaña de origen.
- Sustituir el contenido heredado por contenido propio.
- Volver a activar la herencia más adelante.

La interfaz debe indicar claramente cuándo un contenido es heredado y de dónde procede.

---

## Estado actual relevante

- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Permisos:** helpers por campaña/categoría en `src/lib/permisos.js` (T17). Botón de moderación contextual `src/components/BotonMod.jsx` (T16).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/lib/db/campanas.js` (config `categorias`) · lecturas en Capilla (T23) y Cartografía (T26/T27) · `BotonMod` de cada sala

## Pasos sugeridos

1. Config por campaña: `categorias.capilla.heredaDe` / `categorias.cartografia.heredaDe` (campanaId o null). Por defecto las campañas nuevas heredan de `base-phaingea`.
2. Las lecturas resuelven el origen real (si hereda, leer del origen — es referencia viva, no copia).
3. Controles del máster en cada sala: mantener herencia / cambiar origen / sustituir por contenido propio / reactivar herencia.
4. Indicador visible "Heredado de «X»" en la sala.

## Criterios de hecho

- [x] Campaña nueva muestra la Capilla de Base con su indicador; sustituir y reactivar funciona.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
