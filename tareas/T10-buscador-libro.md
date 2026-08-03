# T10 · Buscador dentro del Libro

**Fase:** 2 · **Depende de:** T09

## Objetivo

Añadir buscador al componente Libro: buscar texto y saltar al resultado.

## Guía (fragmento literal)

## 27.3. Navegación

Todo libro largo tendrá:

- Índice.
- Buscador.
- Avanzar.
- Retroceder.
- Ir a una entrada.
- Volver al índice.
- Pantalla completa.

La animación nunca debe obligar al usuario a pasar decenas de páginas manualmente.

## Estado actual relevante

- **Libro compartido:** creado en T09 (`src/components/Libro.jsx`), con buscador (T10) y pantalla completa (T11). Úsalo, no reinventes flipbooks.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/Libro.jsx`

## Pasos sugeridos

1. Indexar el texto plano de cada página al montar.
2. Input de búsqueda (icono lupa) → lista de coincidencias con nº de página y contexto.
3. Clic en resultado → animación hasta esa página.

## Criterios de hecho

- [ ] Buscar una palabra presente en varias páginas lista todas y navega bien.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
