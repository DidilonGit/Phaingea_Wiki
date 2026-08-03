# T12 · Modal común + doble confirmación destructiva

**Fase:** 2 · **Depende de:** nada

## Objetivo

Componente de modal centrado (oscurecido+desenfocado, X, clic fuera) y helper de doble confirmación para acciones destructivas.

## Guía (fragmento literal)

## 4. Elementos comunes entre salas

Aunque cada habitación tenga un diseño distinto, se conservarán varios comportamientos comunes:

- Barra superior fija.
- Fondo estrellado.
- Campaña activa claramente identificable.
- Perfil del usuario en la esquina superior derecha.
- Modales centrados con el resto de la pantalla oscurecido y desenfocado.
- Textos de hover dorados.
- Animaciones breves y suaves.
- Botones de moderación colocados siempre en posiciones coherentes.
- Doble confirmación para acciones destructivas.
- Sonidos discretos y desactivables.
- Posibilidad de cerrar ventanas pulsando su X o haciendo clic fuera cuando la acción no sea destructiva.

---

## Estado actual relevante

- **Salas:** una por componente en `src/components/views/*.astro`, cada una renderiza `<section class="view" data-view="KEY" hidden>`. Estilos compartidos en `src/styles/views.css` (`.room`, `.panel`, `.grid`, `.chips/.chip`, `.book`, `.comments/.comment`, `.char/.badge`, `.gallery/.frame`, `.session`, `.notif`, `.empty`...). Tokens en `src/styles/tokens.css`. El contenido actual de las salas es placeholder (WIP).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

nuevo `src/components/Modal.jsx` (+ `confirmarDoble()`)

## Pasos sugeridos

1. `<Modal abierto onCerrar titulo destructivo>`: overlay blur, X, clic fuera cierra **solo si no es destructivo**.
2. `confirmarDoble(mensaje)`: dos pasos de confirmación (p.ej. botón "Eliminar" → "¿Seguro? Esta acción no se puede deshacer" → confirmar de nuevo).
3. Estilo pergamino/madera coherente con tokens.

## Criterios de hecho

- [ ] Demo de modal normal y de flujo destructivo con doble confirmación.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
