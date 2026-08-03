# T01 · Renombrar categorías y banderines a los definitivos

**Fase:** 0 · **Depende de:** nada

## Objetivo

Adaptar el navbar y las salas existentes a los nombres definitivos de la guía: Capilla, Cartografía, Podios, Taller, Buzón. Quitar el banderín de Perfil y los títulos redundantes dentro de las salas.

## Guía (fragmento literal)

## 3. Navegación principal

En la parte superior habrá una barra fija de madera con banderines desplegables.

Los nombres definitivos de las categorías serán:

1. **Observatorio**
2. **Capilla**
3. **Cartografía**
4. **Podios**
5. **Galería**
6. **Sesiones**
7. **Taller**
8. **Sala de Pociones**
9. **Buzón**
10. **Moderación**, visible únicamente para másteres y owner

El **Perfil** no será una categoría ni tendrá banderín. Se abrirá desde el perfil del usuario situado en la esquina superior derecha.

Cada banderín tendrá:

- Color propio.
- Forma propia.
- Icono propio.
- Hover suave.
- Nombre visible al desplegarse.
- Estado activo claramente marcado.

No debe repetirse el nombre de la categoría dentro de la propia sala. El banderín activo y el diseño de la habitación ya deben dejar claro dónde se encuentra el usuario.

Cuando alguien no tenga acceso a una categoría, su banderín podrá mostrarse apagado, grisáceo o bloqueado, sin permitir interacción.

## Estado actual relevante

- **Navbar de banderines:** `src/components/TopBar.astro` — array `bookmarks` (key/label/color/shape) e iconos SVG en el objeto `icons`. El conmutador de vistas está al final de `src/pages/index.astro`: función `activar(key)` que muestra/oculta `.view[data-view=key]` y marca el banderín `.activo`.
- **Salas:** una por componente en `src/components/views/*.astro`, cada una renderiza `<section class="view" data-view="KEY" hidden>`. Estilos compartidos en `src/styles/views.css` (`.room`, `.panel`, `.grid`, `.chips/.chip`, `.book`, `.comments/.comment`, `.char/.badge`, `.gallery/.frame`, `.session`, `.notif`, `.empty`...). Tokens en `src/styles/tokens.css`. El contenido actual de las salas es placeholder (WIP).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/TopBar.astro` · `src/pages/index.astro` · renombrar `src/components/views/{Deidades→Capilla, Regiones→Cartografia, Personajes→Podios, Reglas→Taller, Notificaciones→Buzon}.astro`

## Pasos sugeridos

1. Renombrar keys/labels en `bookmarks` de TopBar (deidades→capilla, regiones→cartografia, personajes→podios, reglas→taller, notificaciones→buzon) y ajustar iconos si procede.
2. Renombrar los archivos de vista y su `data-view` para que coincidan con las keys nuevas. Actualizar imports en `index.astro`.
3. Quitar el banderín `perfil` del array (la vista Perfil pasará a modal en T03; hasta entonces puede quedar accesible solo por código o oculta).
4. Quitar los `.room-head` con el nombre de la sala repetido (guía §3: el banderín activo ya indica dónde estás). Mantener la ambientación (kicker puede quedarse si no repite el nombre).
5. Revisar que el manejo especial del iframe de Pociones en `activar()` sigue apuntando a la key correcta.

## Criterios de hecho

- [x] El navbar muestra: Observatorio, Capilla, Cartografía, Podios, Galería, Sesiones, Taller, Sala de Pociones, Buzón (en este orden).
- [x] No existe banderín de Perfil.
- [x] Todas las salas conmutan bien y ninguna muestra su nombre como título grande dentro.
- [x] Build OK y verificado en navegador.
- [x] Commit como Jowy05 + push (deploy verde).
