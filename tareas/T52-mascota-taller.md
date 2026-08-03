# T52 · Mascota del Taller

**Fase:** 4 · **Depende de:** T51

## Objetivo

La mascota en su jaula: se mueve de vez en cuando, brilla, y al pulsarla dice un tip aleatorio en un bocadillo.

## Guía (fragmento literal)

## 16.4. Mascota del Taller

Junto al libro habrá una jaula.

Dentro aparecerá la mascota del Taller.

Por defecto utilizará el logo de la campaña, pero el máster podrá sustituirlo por cualquier otra imagen.

La mascota:

- Se moverá ocasionalmente dentro de la jaula.
- Puede desplazarse de un lado a otro.
- Brillará suavemente para indicar que es interactiva.
- Mostrará el texto de hover **Tips de esta campaña**.
- Al pulsarla dirá un tip aleatorio.
- Utilizará un bocadillo de texto adaptable.
- Podrá mostrar también noticias o mensajes configurados por el máster.

El bocadillo se colocará en una zona que no tape el libro ni otros controles importantes.

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

isla del Taller

## Pasos sugeridos

1. Jaula junto al libro con la imagen de la mascota (logo de campaña por defecto; campo `mascotaUrl` opcional en `/taller`).
2. Animación ocasional (desplazarse/saltito con CSS + intervalos aleatorios) y brillo suave de "soy interactiva".
3. Hover: "Tips de esta campaña". Clic: bocadillo adaptable con un tip aleatorio (de T51) colocado sin tapar el libro.

## Criterios de hecho

- [ ] La mascota se mueve sola de vez en cuando y suelta tips al clic.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
