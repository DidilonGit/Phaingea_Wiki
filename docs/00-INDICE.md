# Phaingea — Índice de documentación del proyecto

> Este `docs/` es la **memoria del proyecto**. Antes de trabajar en cualquier sesión se lee este índice y el fichero `PROGRESO.md`. Así no se pierde contexto aunque cambie de sesión o de máquina.

## Cómo usar esta documentación

1. **Siempre empieza aquí** y luego abre [`PROGRESO.md`](PROGRESO.md) para ver en qué punto está el desarrollo.
2. Cada documento cubre un área. No hace falta leerlos todos de golpe: se leen según la fase en la que estemos (ver [`08-ROADMAP-FASES.md`](08-ROADMAP-FASES.md)).
3. Cuando se toma una decisión o se termina algo, **se anota en `PROGRESO.md`** (y si es una decisión de arquitectura, en el doc correspondiente).
4. La especificación original e intocable es [`../Phaingea_Especificacion_funcional_y_diseno.md`](../Phaingea_Especificacion_funcional_y_diseno.md). Estos docs **no la reemplazan**, la traducen a un plan técnico.

## Mapa de documentos

| # | Documento | Para qué sirve |
|---|-----------|----------------|
| 00 | [`00-INDICE.md`](00-INDICE.md) | Este índice y las reglas de uso. |
| 01 | [`01-VISION-ALCANCE.md`](01-VISION-ALCANCE.md) | Qué es Phaingea, qué entra en el MVP y qué se deja para después. |
| 02 | [`02-ARQUITECTURA.md`](02-ARQUITECTURA.md) | Astro + Firebase + GitHub Pages. Decisiones de stack y por qué. |
| 03 | [`03-FIREBASE-SETUP.md`](03-FIREBASE-SETUP.md) | **Todo lo que necesito de ti para conectar Firebase**, paso a paso. |
| 04 | [`04-MODELO-DATOS.md`](04-MODELO-DATOS.md) | Estructura de datos (colecciones/árbol) de todas las entidades. |
| 05 | [`05-ROLES-PERMISOS.md`](05-ROLES-PERMISOS.md) | Roles, matriz de permisos y reglas de seguridad. |
| 06 | [`06-SISTEMA-DISENO.md`](06-SISTEMA-DISENO.md) | Sistema visual: tokens, salas por categoría, animaciones, sonido. |
| 07 | [`07-ESTRUCTURA-PROYECTO.md`](07-ESTRUCTURA-PROYECTO.md) | Estructura de carpetas, rutas, islas de Astro y estado. |
| 08 | [`08-ROADMAP-FASES.md`](08-ROADMAP-FASES.md) | Plan por fases con entregables y criterios de "hecho". |
| 09 | [`09-COMPONENTES-CLAVE.md`](09-COMPONENTES-CLAVE.md) | Recetas técnicas: dial, libros con paso de página, visor PDF, comentarios. |
| — | [`PROGRESO.md`](PROGRESO.md) | **Tracker vivo**: estado, decisiones tomadas y siguiente paso. |

## Regla de oro

> Cada vez que se avanza, se actualiza `PROGRESO.md`. Si algún día se pierde el contexto, con leer `00-INDICE.md` + `PROGRESO.md` se puede retomar el proyecto exactamente donde se dejó.
