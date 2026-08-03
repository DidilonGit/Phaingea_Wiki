# T11 · Pantalla completa reutilizable de libros

**Fase:** 2 · **Depende de:** T09

## Objetivo

Sistema de pantalla completa para cualquier Libro, exactamente como lo define la guía (icono fuera, X fuera abajo-dcha).

## Guía (fragmento literal)

## 9.3. Pantalla completa de libros

Todo componente que funcione como libro tendrá un pequeño icono de ampliar situado fuera del libro.

Al hacer hover mostrará **Pantalla completa**.

Al pulsarlo:

- El libro se agranda.
- Se centra en la pantalla.
- El resto de la web queda oscurecido y borroso.
- El icono se convierte en una X.
- La X se sitúa fuera del libro, en la esquina inferior derecha del conjunto ampliado.

Se vuelve al tamaño normal pulsando la X o haciendo clic fuera del libro.

## Estado actual relevante

- **Libro compartido:** creado en T09 (`src/components/Libro.jsx`), con buscador (T10) y pantalla completa (T11). Úsalo, no reinventes flipbooks.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/Libro.jsx` (o wrapper `LibroFullscreen`)

## Pasos sugeridos

1. Icono de ampliar fuera del libro, hover "Pantalla completa".
2. Al pulsar: libro agrandado y centrado, resto oscurecido y borroso, icono se convierte en X situada fuera del libro (esquina inferior derecha del conjunto).
3. Cerrar con X o clic fuera.

## Criterios de hecho

- [x] Comportamiento idéntico al fragmento de la guía.
- [x] Funciona en el demo de T09.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
