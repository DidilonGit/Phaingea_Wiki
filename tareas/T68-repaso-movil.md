# T68 · Repaso móvil básico

**Fase:** 5 · **Depende de:** T67

## Objetivo

Que toda la web sea usable en móvil con simplificaciones razonables y sin depender solo del hover.

## Guía (fragmento literal)

# 30. Diseño para pantallas

El diseño principal se hará para ordenador.

La experiencia de escritorio tendrá prioridad en:

- Libros grandes.
- Dial tridimensional.
- Salas completas.
- Mapas interactivos.
- Podios.
- Galería.
- Ventanas superpuestas.
- Uso de rueda del ratón.
- Hovers.

La versión móvil deberá conservar todas las funciones, aunque pueda simplificar:

- Animaciones.
- Tamaño de escenas.
- Fondos.
- Distribución de banderines.
- Dial.
- Libros.
- Herramientas de mapa.

No debe depender exclusivamente del hover para comprender o usar una función.

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

global (CSS/media queries)

## Pasos sugeridos

1. Revisar a 390px: banderines (quizá scroll horizontal o menú), dial (simplificar), libros (tamaño), mapas (gestos táctiles básicos), modales.
2. Toda función accesible sin hover (tap equivalente).
3. No hace falta perfección: usable y sin roturas.

## Criterios de hecho

- [ ] Recorrido completo en viewport móvil sin elementos inaccesibles ni layout roto.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
