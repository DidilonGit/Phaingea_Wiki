# T46 · Libro de sesiones con índice interno

**Fase:** 4 · **Depende de:** T09, T45

## Objetivo

El cuaderno de viaje: una entrada por sesión y un índice compacto con scroll dentro del propio libro (sin listado duplicado fuera).

## Guía (fragmento literal)

# 14. Sesiones

Sesiones será un cuaderno de viaje donde se registra cada partida de una campaña.

## 14.1. Libro de sesiones

Cada sesión ocupará una entrada o conjunto de páginas.

Mostrará:

- Número de sesión.
- Título.
- Subtítulo opcional.
- Experiencia general.
- Experiencia extra.
- Personajes que reciben experiencia adicional.
- Descripción opcional de lo ocurrido.

El título por defecto será:

> Sesión [número siguiente]

El máster podrá cambiarlo.

## 14.2. Índice del libro

El propio libro tendrá un índice con una lista compacta de sesiones.

Cada entrada mostrará:

- Número.
- Título.
- Experiencia general.

El índice tendrá scroll interno y permitirá ver todas las sesiones sin abandonar el libro.

Al pulsar una entrada:

- Se realiza una animación de paso de página.
- Se abre directamente la sesión elegida.

Desde cualquier página habrá un acceso rápido para volver al índice.

No habrá un segundo listado duplicado debajo del libro.

## Estado actual relevante

- **Libro compartido:** creado en T09 (`src/components/Libro.jsx`), con buscador (T10) y pantalla completa (T11). Úsalo, no reinventes flipbooks.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/views/Sesiones.astro` + isla `src/components/SesionesView.jsx`

## Pasos sugeridos

1. Generar páginas del Libro desde `/sesiones` (número, título, subtítulo, XP general y extra con personajes, descripción).
2. Índice: lista compacta (número · título · XP) con scroll interno; clic → animación de paso hasta la sesión.
3. Acceso rápido de vuelta al índice desde cualquier página.
4. No añadir listado fuera del libro.

## Criterios de hecho

- [ ] Índice → sesión → volver funciona con ≥6 sesiones seed.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
