# 08 · Roadmap por fases

> Cada fase deja algo **funcionando y desplegable**. No se pasa de fase sin cumplir su "criterio de hecho". El estado real se lleva en [`PROGRESO.md`](PROGRESO.md).

## Fase 0 · Cimientos ⚙️
**Objetivo:** proyecto Astro vacío pero desplegado y conectado a Firebase.
- Crear proyecto Astro + integración Svelte.
- `tokens.css` + `global.css` con el sistema de diseño base.
- `lib/firebase.js` conectado con el `firebaseConfig` real.
- Repo GitHub + Action de deploy a Pages. `site`/`base` correctos.
- **Criterio de hecho:** una página "Hola Phaingea" con la barra superior se ve en `usuario.github.io/...` y Firebase inicializa sin errores en consola.
- **Necesito de ti:** `firebaseConfig` + nombre del repo.

## Fase 1 · Autenticación y shell 🔐
**Objetivo:** entrar con cuenta y ver la interfaz común según tu rol.
- Login (Google / Email) + logout. Store `user` con rol.
- Barra superior con bookmarks; bloqueo gris de los que no tienes; Moderación solo máster/owner.
- `RoomLayout` con escena común y placeholder de cada sala.
- **Criterio de hecho:** inicias sesión, se crea tu `users/{uid}`, ves los bookmarks según tu rol.
- **Necesito de ti:** proveedores de login activados + tu email de owner.

## Fase 2 · Observatorio y dial 🪐
**Objetivo:** home con selector de campañas.
- Escena observatorio (fondo espacio/estrellas).
- Componente **dial** semicircular (rueda del ratón + botones izq/dcha), Base fija arriba, resto rotando.
- Planeta central + nombre + descripción de la campaña activa. Store `campaign`.
- Estados de campaña (icono tipo Discord).
- **Criterio de hecho:** cambias de campaña con el dial y toda la web sabe cuál es la activa.

## Fase 3 · Datos, Moderación básica y seguridad 🗂️
**Objetivo:** crear campañas y usuarios de verdad, con reglas.
- Modelo de datos en Firestore (colecciones de [`04-MODELO-DATOS.md`](04-MODELO-DATOS.md)).
- Sala Moderación: crear/editar campañas, asignar másteres/jugadores, permisos por campaña.
- **Security Rules** v1 escritas, desplegadas y probadas.
- Sembrar owner + Base de Phaingea.
- **Criterio de hecho:** como owner creas una campaña y asignas un jugador; un usuario sin permiso no puede leerla (verificado con las reglas).

## Fase 4 · Sesiones + comentarios 📖
**Objetivo:** primera categoría dinámica completa.
- Libro dinámico "Sesiones" (una página por sesión) con **FlipBook**.
- Formulario de creación de sesión (título auto, XP general, XP por jugador).
- Sistema de **comentarios** reutilizable (formato, aprobación, reacciones, edición/borrado con doble confirmación).
- **Criterio de hecho:** el máster crea una sesión, los jugadores comentan, se ve el paso de página.

## Fase 5 · Personajes + experiencia 🧝
**Objetivo:** fichas y progresión.
- Categoría Personajes (archivador), ficha, estados (activo/fallecido/delegado), privacidad (barras negras).
- `xp.js` con tablas Pathfinder 1e; barra de XP (general vs extra) y nivel.
- XP calculada desde Sesiones + ajustes manuales (con motivo).
- **Criterio de hecho:** una sesión reparte XP y la ficha del personaje sube de nivel sola.

## Fase 6 · Categorías PDF (Deidades, Regiones) 📜
**Objetivo:** libros basados en PDF con navegación.
- **PdfViewer** con PDF.js (preserva diseño) + paso de página + índice + acceso a página concreta.
- Buscador dentro del PDF (capa de texto).
- Herencia de categorías sincronizada (por defecto desde Base).
- **Criterio de hecho:** se abre un PDF conservando su diseño, se busca texto y se navega; Regiones hereda de Base.

## Fase 7 · Galería, Perfil, Notificaciones 🖼️
**Objetivo:** cerrar categorías restantes.
- Galería: subida, tags, marcos adaptativos, vista ampliada, filtros, propuestas (máx. 5 pendientes). *(Aquí entra Storage / alternativa.)*
- Perfil (ventana centrada, diario): personaje actual, perfil jugador, ajustes (sonido).
- Notificaciones por campaña + logs en Moderación.
- **Criterio de hecho:** un jugador propone imagen, el máster la aprueba y aparece en la galería con sus tags.

## Fase 8 · Pulido, sonido y móvil ✨
**Objetivo:** experiencia final.
- Sonidos discretos y desactivables. Animaciones avanzadas (paso de página, transiciones de fondo).
- Mapamundi interactivo con zonas clicables → Regiones.
- Adaptación móvil (dial simplificado, libros reducidos, barra).
- Endurecer reglas, copias de seguridad, límites de tamaño.
- **Criterio de hecho:** la web es fluida en escritorio y usable en móvil, con sonido opcional.

## Dependencias entre fases

```
0 → 1 → 2 → 3 → 4 → 5
                3 → 6
                3 → 7
todas → 8 (pulido)
```
Storage (o su alternativa) solo bloquea de verdad en fase 7 (Galería) y en fichas/ficheros PDF subidos por usuarios.
