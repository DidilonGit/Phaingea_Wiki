# T53 · Animación de verter poción en el caldero

**Fase:** 4 · **Depende de:** nada

## Objetivo

Al elegir una botella: se acerca al caldero, se descorcha, se inclina, vierte su color, ondas, y se revela la herramienta.

## Guía (fragmento literal)

## 17.2. Interacción principal

Al seleccionar una poción:

1. La botella se acerca al caldero.
2. Se descorcha.
3. Se inclina.
4. Vierte su líquido.
5. El líquido puede tener cualquier color según la herramienta.
6. Se crean ondas en el caldero.
7. Las ondas revelan poco a poco la herramienta.
8. El contenido queda disponible dentro o sobre el caldero.

La animación debe ser:

- Suave.
- Breve.
- Reutilizable.
- Poco recargada.
- Coherente con un laboratorio de alquimia.

## Estado actual relevante

- **Sala de Pociones:** `src/components/views/Pociones.astro` — iframe a `public/pociones/index.html` (Mesa de alquimia, app autónoma con `support.js`). El conmutador de `index.astro` carga el iframe al entrar (`data-src`→`src`) y lo descarga al salir (`about:blank`) para que no corra en segundo plano. Fondos puestos en transparente para que flote sobre las estrellas.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**
- Decidir el enfoque al empezar: (a) implementar la animación DENTRO de `public/pociones/index.html` (la app ya tiene animaciones corkPop/smokeRise definidas — revisarlas); o (b) reconstruir la sala como isla nativa. Elegir lo más simple que cumpla la guía y documentarlo.

## Archivos a tocar

`public/pociones/index.html` (+`support.js`) o nueva isla

## Pasos sugeridos

1. Secuencia: acercar → descorche (anim corkPop existe) → inclinar → chorro del color de la herramienta → ondas en el caldero → revelar contenido.
2. Suave, breve, reutilizable para cualquier botella, poco recargada.

## Criterios de hecho

- [ ] La secuencia completa se ve al seleccionar cualquier botella y el contenido queda usable.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
