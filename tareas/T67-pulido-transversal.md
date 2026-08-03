# T67 · Pulido transversal (checklist de experiencia)

**Fase:** 5 · **Depende de:** nada

## Objetivo

Pasar la checklist de reglas generales de la guía por toda la web y corregir lo que falte.

## Guía (fragmento literal)

# 31. Reglas generales de experiencia

La web debe:

- Mostrar claramente la campaña activa.
- Mostrar claramente el personaje activo.
- Permitir volver fácilmente.
- Evitar títulos redundantes.
- Priorizar lectura y navegación.
- Mantener coherencia entre salas.
- Indicar contenido heredado.
- Indicar contenido bloqueado.
- Diferenciar acciones normales y de moderación.
- Pedir doble confirmación en acciones destructivas.
- Evitar objetos decorativos inútiles.
- Evitar interfaces planas que rompan la ambientación.
- Mantener el fondo estrellado como elemento unificador.
- Permitir que cada sala tenga su propia identidad.
- Conservar los recuerdos antiguos en lugar de sobrescribirlos.
- Usar formularios sencillos.
- Mostrar opciones avanzadas solo cuando se necesiten.
- Mantener la interfaz fluida aunque una categoría tenga mucho contenido.

---

[...]

# 28. Animaciones

Solo se utilizarán cuando aporten claridad, ambientación o respuesta visual.

Animaciones principales:

- Desplegar banderines.
- Girar el dial.
- Cambiar el planeta activo.
- Pasar páginas.
- Abrir y cerrar libros.
- Ampliar imágenes.
- Sacar cartas del sobre.
- Archivar cartas.
- Verter pociones.
- Abrir diarios.
- Desplegar información.
- Suavizar cambios de fondo al hacer scroll.
- Hovers en objetos interactivos.

Las animaciones deben sentirse:

- Suaves.
- Naturales.
- Breves.
- Poco intrusivas.
- Coherentes con el objeto.

---

[...]

### 2.1. Decoración funcional

Los objetos visibles que no formen parte puramente del fondo deberían cumplir una función.

Ejemplos:

- Una lupa sirve para ampliar el mapa.
- Un compás permite dibujar sobre él.
- Una carta abre una notificación.
- Una jaula contiene la mascota del Taller.
- Una vela puede encenderse o apagarse si se presenta como elemento interactivo.

No deben añadirse objetos clicables sin hover, respuesta visual o función clara.

### 2.2. Diseño rústico simplificado

La estética debe ser medieval y fantástica, pero no recargada.

Los controles pueden usar:

- Bordes suaves o ligeramente redondeados.
- Texturas de madera, cuero o papel.
- Sombras discretas.
- Animaciones breves.
- Iconos integrados en el decorado.

Los elementos modernos deben disfrazarse visualmente para encajar en la sala. Por ejemplo, un botón de zoom puede representarse mediante una chincheta, una lupa o una pieza de escritorio.

### 2.3. Distribución vertical

Siempre que sea posible, el contenido principal se alineará hacia la parte superior de la pantalla.

Esto evita scroll innecesario en pantallas pequeñas y hace que, cuando un componente se cierre o desaparezca, los elementos inferiores ocupen su lugar de forma natural.

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**
- Hacer esta tarea cuando el grueso de la Fase 4 esté completo.

## Archivos a tocar

global

## Pasos sugeridos

1. Recorrer §31 punto por punto en cada sala y anotar/corregir incumplimientos.
2. Hovers dorados consistentes; animaciones breves y con función (§28); decoración funcional (§2.1); dobles confirmaciones en todo lo destructivo.
3. Campaña activa y personaje activo siempre identificables; indicadores de heredado/bloqueado presentes.
4. Revisión de rendimiento (nada acumula en segundo plano).

## Criterios de hecho

- [x] Checklist §31 marcada punto a punto (dejar la lista en el commit o en este archivo).
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
