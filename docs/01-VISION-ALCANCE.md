# 01 · Visión y alcance

## Qué es Phaingea

Una web-enciclopedia y archivo de campañas de rol (Pathfinder 1e) para el mundo de **Phaingea**. Funciona como:

- Enciclopedia y archivo histórico del universo.
- Archivo de campañas (cada campaña = una versión del mundo).
- Registro de sesiones, personajes y experiencia.
- Galería de imágenes con tags y filtros.
- Espacio colaborativo (jugadores y másteres añaden recuerdos, comentarios, propuestas).

**Metáfora visual central:** un edificio antiguo que conserva cultura. Cada categoría es una **sala distinta** (observatorio, capilla, cartografía, archivador…) dentro del mismo edificio. Madera, cuero, papel, pergamino, piedra, tonos medievales. La ambientación nunca debe estorbar la lectura.

## Pilares funcionales

1. **Campañas** con un selector tipo dial semicircular (observatorio) y una campaña especial fija: **Base de Phaingea** (lore canónico).
2. **Categorías** por campaña: Deidades, Regiones, Personajes, Galería, Sesiones + Notificaciones, Perfil, Moderación. En Base de Phaingea: Personajes→**Leyendas**, Sesiones→**Eventos**.
3. **Herencia de categorías** sincronizada (Deidades y Regiones heredan de Base por defecto).
4. **Libros**: unos generados por la web (dinámicos) y otros basados en **PDF** (se preserva el diseño del PDF y se le añade navegación).
5. **Roles**: Invitado, Jugador, Máster, Owner. Permisos por campaña y por categoría.
6. **Comentarios** reutilizables, con aprobación configurable y reacciones (sin respuestas anidadas).
7. **Experiencia y niveles** (Pathfinder 1e, progresión rápida/media/lenta), calculada desde Sesiones.
8. **Moderación contextual** (botón oculto en cada elemento) + categoría global de Moderación con logs.
9. **Notificaciones** por campaña accesible.

## Alcance del MVP (primera versión usable)

El objetivo del MVP es tener la **estructura navegable + datos reales en Firebase + roles funcionando**, priorizando escritorio.

**Dentro del MVP:**
- Autenticación y roles (Invitado/Jugador/Máster/Owner).
- Barra superior con bookmarks y bloqueo por permisos.
- Observatorio + dial de campañas + cambio de campaña.
- Moderación básica: crear/editar campañas, asignar másteres y jugadores.
- Categoría **Sesiones** completa (dinámica, libro generado, comentarios, experiencia).
- Categoría **Personajes** (ficha, estados, comentarios).
- Sistema de **comentarios** reutilizable.
- **Experiencia y niveles** calculados desde Sesiones.
- Deploy en GitHub Pages funcionando.

**Fuera del MVP (fases posteriores):**
- Categorías basadas en **PDF** con visor y buscador dentro del PDF (Deidades, Regiones).
- **Galería** completa con tags, filtros y flujo de propuestas.
- **Herencia** sincronizada entre campañas.
- **Mapamundi interactivo** con zonas clicables.
- **Notificaciones** y **logs** completos.
- **Sonidos** y animaciones avanzadas de paso de página.
- **Adaptación móvil** fina (se cuida desde el principio, se pule al final).
- Copias de seguridad, límites de tamaño, endurecimiento de seguridad.

## Principios de experiencia (no negociables)

- Fácil sin instrucciones; coherencia visual; pantallas no recargadas; prioridad a la lectura.
- Volver atrás siempre fácil. Campaña activa y personaje activo siempre claros.
- Indicar contenido heredado / oculto / bloqueado.
- Diferenciar acciones normales vs. de moderación. Doble confirmación en acciones destructivas.
- Animaciones suaves y con función. Sonidos discretos y desactivables.

## Fuera de alcance (explícito)

- Sin música. Sin respuestas anidadas en comentarios. Sin historial exhaustivo de cambios (solo logs de acciones importantes). Los personajes no existen fuera de una campaña.
