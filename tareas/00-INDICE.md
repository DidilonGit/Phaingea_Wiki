# Tareas de construcción de Phaingea

> **Cómo trabajar:** una tarea por sesión. Leer `CLAUDE.md` + el archivo de la tarea (autocontenido: incluye su fragmento de la guía y el contexto del código). Al terminarla: marcar ✅ aquí, marcar sus checkboxes, commit (como Jowy05) y push. La guía completa está en `tareas/GUIA.md` (fuente de verdad: si tarea y guía difieren, manda la guía).
>
> Orden general: F0 → F1 → F2 → F3 → F4 (las salas de F4 pueden hacerse en cualquier orden respetando dependencias) → F5.

| Tarea | Título | Fase | Depende de | Estado |
|---|---|---|---|---|
| — | **FASE 0 · Reorganización** | | | |
| [T01](T01-renombrar-categorias.md) | Renombrar categorías y banderines a los definitivos | 0 | — | ✅ |
| [T02](T02-banderin-moderacion.md) | Banderín y sala Moderación (solo máster/owner) | 0 | T01 | ✅ |
| [T03](T03-perfil-desde-avatar.md) | Perfil como ventana desde el avatar (fuera del navbar) | 0 | T01 | ✅ |
| [T04](T04-estrellas-colores-y-alineacion.md) | Estrellas con colores + contenido alineado arriba | 0 | — | ✅ |
| [T05](T05-logo-campana-topbar.md) | Hueco del logo de campaña en la topbar | 0 | T01 | ✅ |
| — | **FASE 1 · Datos base (campañas)** | | | |
| [T06](T06-modelo-campanas.md) | Modelo /campanas en RTDB + seed Base de Phaingea + reglas | 1 | — | ✅ |
| [T07](T07-store-campana-activa.md) | Store de campaña activa + rol por campaña | 1 | T06 | ✅ |
| [T08](T08-gestion-campanas-moderacion.md) | Gestión mínima de campañas desde Moderación | 1 | T02, T06 | ✅ |
| — | **FASE 2 · Sistemas compartidos** | | | |
| [T09](T09-componente-libro.md) | Componente Libro (flipbook con índice) | 2 | — | ✅ |
| [T10](T10-buscador-libro.md) | Buscador dentro del Libro | 2 | T09 | ✅ |
| [T11](T11-pantalla-completa-libros.md) | Pantalla completa reutilizable de libros | 2 | T09 | ✅ |
| [T12](T12-modal-comun.md) | Modal común + doble confirmación destructiva | 2 | — | ✅ |
| [T13](T13-comentarios-v1.md) | Sistema de comentarios v1 (hilo por target) | 2 | T07 | ⬜ |
| [T14](T14-comentarios-v2.md) | Comentarios v2: reacciones, aprobación y moderación | 2 | T12, T13 | ⬜ |
| [T15](T15-sistema-xp.md) | Sistema de experiencia y niveles (Pathfinder 1e) | 2 | — | ✅ |
| [T16](T16-boton-moderacion-contextual.md) | Botón de moderación contextual | 2 | T12, T17 | ✅ |
| [T17](T17-permisos.md) | Permisos por campaña/categoría + banderines bloqueados | 2 | T07 | ✅ |
| — | **FASE 3 · Observatorio** | | | |
| [T18](T18-dial-3d-campanas.md) | Dial 3D de campañas en el Observatorio | 3 | T07 | ⬜ |
| [T19](T19-nota-de-campana.md) | Nota de campaña bajo el planeta + logo en topbar | 3 | T07 | ⬜ |
| [T20](T20-pines-regiones-planeta.md) | Pines de regiones sobre el planeta | 3 | T18 | ⬜ |
| [T21](T21-escena-observatorio.md) | Escena del Observatorio (vigas y cristales) | 3 | — | ⬜ |
| — | **FASE 4 · Salas completas** | | | |
| [T22](T22-escena-capilla.md) | Escena de la Capilla | 4 | T01 | ⬜ |
| [T23](T23-libro-deidades.md) | Libro de deidades sobre el atril | 4 | T09, T10, T11, T22 | ⬜ |
| [T24](T24-comentarios-capilla.md) | Comentarios generales de la Capilla | 4 | T13, T14, T22 | ⬜ |
| [T25](T25-escena-cartografia.md) | Escena de Cartografía (marco y ganchos) | 4 | T01 | ⬜ |
| [T26](T26-modelo-lugares.md) | Modelo de lugares en RTDB (jerarquía) | 4 | T07 | ⬜ |
| [T27](T27-visor-de-mapa.md) | Visor de mapa (pan, zoom, pines, entrar a lugares) | 4 | T25, T26 | ⬜ |
| [T28](T28-herramienta-lupa.md) | Herramienta Lupa | 4 | T27 | ⬜ |
| [T29](T29-compas-y-pano.md) | Herramientas Compás (dibujo) y Paño (borrado) | 4 | T27 | ⬜ |
| [T30](T30-info-lugar-y-lista.md) | Información del lugar + lista de lugares | 4 | T27 | ⬜ |
| [T31](T31-comentarios-por-lugar.md) | Comentarios por lugar | 4 | T13, T27 | ⬜ |
| [T32](T32-modelo-personajes.md) | Modelo de personajes en RTDB | 4 | T07, T15 | ⬜ |
| [T33](T33-escena-podios.md) | Escena de Podios (podio, info, navegación circular) | 4 | T32 | ⬜ |
| [T34](T34-filtros-y-grupos-podios.md) | Filtros por estado y grupos en Podios | 4 | T33 | ⬜ |
| [T35](T35-ampliar-y-diario-boton.md) | Botones del podio: Ampliar y Mostrar diario | 4 | T33 | ⬜ |
| [T36](T36-diario-personaje.md) | Diario del personaje (markdown → libro de 8 páginas) | 4 | T09, T15, T33 | ⬜ |
| [T37](T37-comentarios-personaje.md) | Comentarios de personaje | 4 | T14, T33 | ⬜ |
| [T38](T38-leyendas.md) | Leyendas (Podios en Base de Phaingea) | 4 | T34 | ⬜ |
| [T39](T39-modelo-galeria.md) | Modelo de imágenes de Galería + almacenamiento | 4 | T07 | ⬜ |
| [T40](T40-composicion-museo.md) | Composición de museo + paginación circular | 4 | T39 | ⬜ |
| [T41](T41-filtros-tags-and.md) | Filtros por tags (multi-selección AND) | 4 | T40 | ⬜ |
| [T42](T42-vista-ampliada-galeria.md) | Vista ampliada de imagen | 4 | T40 | ⬜ |
| [T43](T43-subida-imagenes.md) | Subida de imágenes con aprobación y límite de pendientes | 4 | T12, T39, T40 | ⬜ |
| [T44](T44-moderacion-galeria.md) | Moderación de la Galería | 4 | T16, T43 | ⬜ |
| [T45](T45-modelo-sesiones-xp.md) | Modelo de sesiones + recálculo de XP | 4 | T15, T32 | ⬜ |
| [T46](T46-libro-sesiones.md) | Libro de sesiones con índice interno | 4 | T09, T45 | ⬜ |
| [T47](T47-crear-editar-sesion.md) | Crear y editar sesiones (máster) | 4 | T16, T45, T46 | ⬜ |
| [T48](T48-comentarios-sesion.md) | Comentarios de sesión (uno por jugador) | 4 | T13, T46 | ⬜ |
| [T49](T49-eventos-base.md) | Eventos (Sesiones en Base de Phaingea) | 4 | T46 | ⬜ |
| [T50](T50-taller-escena-libro.md) | Taller: escena y libro de reglas | 4 | T01, T09, T10, T11 | ⬜ |
| [T51](T51-panel-tips.md) | Panel de tips del Taller | 4 | T16, T50 | ⬜ |
| [T52](T52-mascota-taller.md) | Mascota del Taller | 4 | T51 | ⬜ |
| [T53](T53-animacion-verter-pocion.md) | Animación de verter poción en el caldero | 4 | — | ⬜ |
| [T54](T54-estructura-botellas.md) | Estructura de botellas y huecos reservados | 4 | T53 | ⬜ |
| [T55](T55-modelo-notificaciones.md) | Modelo de notificaciones + helper notificar() | 4 | T07 | ⬜ |
| [T56](T56-escena-buzon.md) | Escena del Buzón (sobre y abanico de cartas) | 4 | T55 | ⬜ |
| [T57](T57-carta-y-archivar.md) | Carta: lectura y archivado | 4 | T56 | ⬜ |
| [T58](T58-album-cartas.md) | Álbum de cartas archivadas | 4 | T57 | ⬜ |
| [T59](T59-icono-sobre-topbar.md) | Icono de sobre con contador junto al perfil | 4 | T55 | ⬜ |
| [T60](T60-panel-moderacion.md) | Panel de Moderación completo | 4 | T08, T17 | ⬜ |
| [T61](T61-solicitudes-y-registros.md) | Solicitudes pendientes + registros importantes | 4 | T55, T60 | ⬜ |
| [T62](T62-herencia-contenido.md) | Herencia de contenido (Capilla y Cartografía) | 4 | T06, T23, T27 | ⬜ |
| [T63](T63-perfil-personaje.md) | Perfil: pestaña de personaje (con privacidad) | 4 | T03, T32 | ⬜ |
| [T64](T64-perfil-jugador.md) | Perfil: pestaña de jugador (inicial + color) | 4 | T03 | ⬜ |
| [T65](T65-perfil-ajustes.md) | Perfil: pestaña de ajustes + Guardar | 4 | T03 | ⬜ |
| — | **FASE 5 · Transversales finales** | | | |
| [T66](T66-sonidos.md) | Sonidos discretos y desactivables | 5 | T65 | ⬜ |
| [T67](T67-pulido-transversal.md) | Pulido transversal (checklist de experiencia) | 5 | — | ⬜ |
| [T68](T68-repaso-movil.md) | Repaso móvil básico | 5 | T67 | ⬜ |

**Total: 68 tareas.**
