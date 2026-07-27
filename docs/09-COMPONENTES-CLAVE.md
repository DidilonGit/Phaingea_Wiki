# 09 · Recetas de componentes clave

> Guía técnica de las piezas difíciles. No es código final, es el enfoque para no reinventar cada vez.

## Dial de campañas (`CampaignDial.jsx`)

- **Geometría:** campañas colocadas sobre una circunferencia; solo se muestra la **mitad superior**. Cada campaña en un ángulo; el dial es un contenedor rotado por un ángulo `θ`.
- **Base de Phaingea** no rota: se pinta fija en el centro-superior, con outline. Las demás giran alrededor.
- **Interacción:** rueda del ratón (`wheel`) suma/resta ángulo; botones izq/dcha idem; al soltar, *snap* a la campaña más cercana al centro.
- **Selección:** la campaña en el centro es la activa → actualiza store `campaign`. Su planeta se muestra grande en el centro.
- **Orden:** por `dialOrder` (inicial = orden de creación; el owner lo cambia).
- **Estado:** icono tipo Discord sobre el planeta (activa/finalizada/archivada/privada) sin tapar el planeta.
- **Móvil:** degradar a carrusel/lista horizontal (mismo store, otra vista).

## Libro con paso de página (`FlipBook.jsx`)

- Librería recomendada: **StPageFlip** (vanilla, ya usada en tu manual flipbook, buen resultado).
- Dos modos:
  - **Dinámico:** cada página se renderiza desde datos (una sesión, un personaje). Se generan nodos HTML y se pasan a StPageFlip.
  - **PDF:** las páginas son renders de PDF.js (ver abajo) montados dentro del flipbook.
- **Navegación rápida obligatoria:** índice, buscador, ir a página X, avanzar/retroceder, volver al inicio. Especialmente para documentos largos.
- **Cubiertas:** portada/contraportada, título, texto, sinopsis, color (cuero rojo/verde/negro…), símbolos decorativos en esquinas (set genérico reutilizable).
- **Accesibilidad:** que se pueda navegar sin depender solo de la animación (botones + teclado).

## Visor de PDF (`PdfViewer.jsx`)

- **PDF.js** para renderizar cada página a `<canvas>` conservando diseño, imágenes, colores y tipografías originales (sección 11 de la spec: el PDF manda).
- **Capa de texto** de PDF.js encima del canvas → permite **buscar dentro del PDF** y seleccionar texto (solo si el PDF tiene texto real; si es escaneado, la búsqueda no funcionará sin OCR).
- La web añade **alrededor** del PDF: navegación, índice, buscador, animación de páginas (envolviendo en FlipBook), comentarios, moderación, acceso rápido a página.
- Opción de portada/contraportada generada por la web aunque el contenido sea PDF.
- **Rendimiento:** renderizar bajo demanda (página visible + adyacentes), no todo el PDF de golpe.

## Comentarios (`CommentThread.jsx`)

- **Reutilizable** en todas las categorías; recibe un `target` `{type, campaignId, refId}`.
- **Formato de cabecera:** `Nombre del personaje (Nombre del jugador) — Fecha`. Sin personaje en esa campaña → solo nombre de jugador.
- Config por categoría (viene de `categories.comments`): general vs por página/entrada, requiere aprobación, quién aprueba, máx. por jugador, quién edita/borra.
- **Aprobación:** comentario propuesto entra como `pending`; lo aprueba el propietario del personaje (si aplica) o el máster. El dueño del personaje comenta sin aprobación sobre el suyo.
- **Reacciones** con emoji (sin respuestas anidadas).
- **Borrado:** máster/owner, con **doble confirmación**.
- En tiempo real (suscripción) donde aporte.

## Modal de perfil (`ProfileModal.jsx`)

- Ventana **centrada, no pantalla completa**; el fondo (la sala actual) sigue visible en los bordes, **oscurecido y desenfocado** (`backdrop-filter: blur`).
- Aspecto de **diario personal**. Subpáginas: personaje de la campaña actual / perfil de jugador / ajustes.
- Al cambiar de campaña, la primera pestaña muestra el personaje de esa campaña; si no hay, estado vacío con interrogaciones.

## Botón de moderación contextual (`ModButton.jsx`)

- Presente en cada elemento moderable (campaña, sesión, imagen, personaje, categoría), en una **esquina superior** coherente.
- **Oculto** para quien no tiene permiso (y protegido por reglas, no solo por CSS).
- Abre un formulario **sencillo** que administra **solo** el elemento abierto; opciones avanzadas en desplegables.

## Bookmark con permisos (`Bookmark.astro` + lógica de permiso)

- Identidad visual fija (color/forma/icono por categoría).
- Sin acceso → filtro gris + no interactuable. Moderación solo visible para máster/owner.
- La visibilidad se decide con `permissions.js` leyendo el store de usuario y la membership de la campaña activa.

## Cálculo de experiencia (`xp.js`)

- Tablas de **Pathfinder 1e** para progresión **rápida / media / lenta** (umbral de XP por nivel).
- `levelFromXp(totalXp, progression)` → nivel. `nextThreshold(level, progression)` → XP para siguiente (ej. `766 / 1300`).
- XP total = suma de `sessions.xpGeneral` (participadas) + `xpPerCharacter[charId]` + ajustes manuales.
- Una sola barra con dos colores (general vs extra), mostrando cuánto es cada parte.
- El jugador no edita XP; la manual exige motivo; la de sesión usa el título de la sesión.
