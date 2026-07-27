# 06 · Sistema de diseño

> La web se siente como un **edificio antiguo** que conserva cultura. Materiales: madera, cuero, papel, pergamino, piedra. Tonos medievales/rústicos. La ambientación **nunca** estorba la lectura.

## Tokens base (variables CSS)

Definidos una vez en `src/styles/tokens.css` y reutilizados en todo. Valores iniciales orientativos (se afinan en fase 0):

```css
:root {
  /* Materiales */
  --wood-dark:  #3a2618;
  --wood:       #5a3d26;
  --leather-red:#7a2e26;
  --leather-green:#3f5236;
  --leather-black:#241f1c;
  --paper:      #efe6d2;
  --parchment:  #e3d4b0;
  --stone:      #8b8378;
  --ink:        #2b2118;

  /* Acentos / estados */
  --gold:       #c9a45a;
  --locked:     grayscale + opacity 0.5;  /* bookmarks sin acceso */

  /* Tipografía */
  --font-title: "una serif con carácter";   /* títulos, portadas */
  --font-ui:    "una serif legible";          /* interfaz, común a todo */
  --font-body:  "lectura cómoda";             /* texto largo */

  /* Ritmo */
  --radius: 6px;
  --shadow-soft: 0 4px 18px rgba(0,0,0,.35);
  --ease: cubic-bezier(.22,.61,.36,1);
}
```

**Texturas:** imágenes/patrones ligeros (madera, papel, pergamino) como `background` con `background-blend-mode` para no cargar peso. Preferir SVG/patrones tileables o WebP pequeños.

## Elementos comunes a todas las salas (no cambian al cambiar de categoría)

- **Barra superior** fija con textura de madera y bookmarks (uno por categoría).
- Sistema de **botones** (estilo, hover suave).
- **Tipografía de interfaz** común.
- **Comportamiento de ventanas** (modales centrados con fondo oscurecido+desenfocado).
- **Colores base** y navegación. Posición de controles importantes.

## Bookmarks (marcadores de la barra)

Cada bookmark: color propio + forma propia + icono propio, coherente con su categoría, **identidad visual estable**. Sin acceso → filtro gris, no interactuable. **Moderación** solo visible para máster/owner.

| Categoría | Sala | Idea de icono |
|-----------|------|----------------|
| Inicio | Observatorio | planeta / telescopio |
| Deidades | Capilla con atril | símbolo sagrado |
| Regiones | Sala de cartografía | mapa / brújula |
| Personajes | Archivador de fichas | carpeta |
| Galería | Sala de exposición (libro de imágenes) | marco |
| Sesiones | Archivo/diario de campaña | pluma/diario |
| Notificaciones | — | campana |
| Perfil | Diario personal | libreta |
| Moderación | Sala privada de admin | llave/escudo |

## Salas (una escena por categoría)

Al cambiar de categoría cambia **toda la escena** (fondo + elemento principal), manteniendo los elementos comunes de arriba.

| Categoría | Escena | Elemento principal | Zona inferior |
|-----------|--------|--------------------|----------------|
| Inicio | Observatorio (espacio, estrellas) | planeta central + **dial** de campañas | nombre + descripción + mapamundi |
| Deidades | Capilla | libro **PDF** sobre atril | comentarios generales |
| Regiones | Cartografía | libro **PDF** | comentarios generales |
| Galería | Exposición | libro largo de imágenes en marcos | **filtros** (no comentarios) |
| Personajes | Archivador | carpeta/ficha por personaje | ficha ampliada + comentarios por personaje |
| Sesiones | Diario de campaña | libro dinámico, una página por sesión | comentarios por sesión |
| Perfil | Diario personal | ventana centrada (no pantalla completa) | — |
| Moderación | Sala privada | paneles de gestión | — |

## Inventario de animaciones (solo con función)

| Animación | Dónde | Cómo |
|-----------|-------|------|
| Pasar páginas | libros | StPageFlip / transform 3D |
| Abrir/cerrar libro | al entrar en categoría | escala + rotación suave |
| Abrir carpeta/diario | Personajes/Perfil | despliegue |
| Cambiar de campaña | dial | rotación del dial + swap del planeta |
| Hover en botones | global | transición suave de color/elevación |
| Transición entre fondos al hacer scroll | salas | fade/parallax ligero |
| Difuminado al abrir superpuesto | modales/perfil | backdrop blur + fade |

Transiciones entre páginas de categoría: **View Transitions** de Astro para el cross-fade de escena. No todo lleva animación.

## Sonido

Opcional, discreto, poco frecuente y **desactivable** desde Perfil: pasar página, abrir libro, ciertos botones, interacciones de papel/madera/biblioteca. **Sin música.**

## Móvil

Escritorio es prioritario, pero se cuida desde el principio no cerrar puertas: layouts con grid/flex, unidades relativas, el dial pensado para simplificarse (lista/carrusel), libros que reducen tamaño. La adaptación fina llega al final (fase 8).
