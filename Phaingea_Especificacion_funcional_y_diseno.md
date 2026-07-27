# Phaingea — Especificación funcional y de diseño

## 1. Objetivo general

La web de **Phaingea** funcionará como:

- Enciclopedia del universo.
- Archivo histórico del mundo.
- Archivo de campañas.
- Registro de sesiones, personajes y experiencia.
- Galería de imágenes.
- Espacio donde jugadores y másteres puedan añadir recuerdos y contenido relacionado con las campañas.

La página estará alojada inicialmente en **GitHub Pages** y su diseño tendrá prioridad para ordenador. La versión móvil deberá tenerse en cuenta durante el desarrollo, aunque se adaptará después de cerrar la experiencia principal de escritorio.

---

## 2. Concepto visual

La web debe sentirse como un edificio antiguo dedicado a conservar cultura y conocimiento.

No será únicamente una biblioteca llena de libros. Cada categoría representará una habitación distinta, manteniendo una estética común basada en:

- Madera.
- Cuero.
- Papel.
- Pergamino.
- Piedra.
- Tonos medievales y rústicos.
- Iconos simplificados.
- Decoración suave, sin exceso de detalles.

Cada sala tendrá elementos propios, pero todas deberán parecer parte del mismo edificio.

Ejemplos:

- La página principal será un observatorio.
- Deidades será una capilla con un atril.
- Regiones será una sala de cartografía.
- Galería será una sala de exposición representada mediante un libro de imágenes.
- Personajes será un archivador con carpetas y fichas.
- Sesiones será un archivo o diario de campaña.
- Perfil será un diario personal.
- Moderación será una zona privada de administración.

La interfaz debe ser clara y legible. La ambientación no debe dificultar el uso de la web.

---

## 3. Animaciones y sonido

Solo se usarán animaciones cuando tengan una función clara.

Animaciones principales:

- Pasar páginas.
- Abrir y cerrar libros.
- Abrir carpetas o diarios.
- Cambiar entre campañas.
- Efectos suaves al pasar el cursor sobre botones.
- Transiciones entre fondos al hacer scroll.
- Difuminados suaves al abrir contenido superpuesto.

No todos los elementos necesitan animación.

Los sonidos serán opcionales, discretos y poco frecuentes:

- Pasar páginas.
- Abrir libros.
- Pulsar ciertos botones.
- Interacciones concretas relacionadas con papel, madera o biblioteca.

La web no tendrá música.

---

## 4. Barra superior

En la parte superior habrá una barra fija que se mantendrá visible durante la navegación.

La barra tendrá textura de madera y contendrá bookmarks o marcadores para acceder a las distintas categorías.

Ejemplos de categorías:

- Inicio.
- Deidades.
- Regiones.
- Personajes.
- Galería.
- Sesiones.
- Notificaciones.
- Perfil.

Cada bookmark tendrá:

- Color propio.
- Forma propia.
- Icono propio.
- Diseño coherente con su categoría.

Los bookmarks mantendrán siempre la misma identidad visual.

Cuando un usuario no tenga acceso a una categoría, el bookmark seguirá apareciendo, pero tendrá un filtro grisáceo y no será interactuable.

La categoría de Moderación solo será visible para quienes tengan permiso de máster u owner.

---

## 5. Campañas

Cada campaña representa una versión del mundo de Phaingea situada en una época, situación o línea narrativa diferente.

Cada campaña tendrá:

- Icono de planeta.
- Nombre.
- Fuente propia para el título.
- Color principal.
- Color de contorno del título.
- Descripción.
- Mapamundi.
- Estado.
- Categorías propias.
- Jugadores participantes.
- Máster o másteres responsables.
- Configuración de progresión de experiencia.

Todas las campañas normales tendrán las mismas categorías, aunque algunas puedan estar todavía vacías.

---

## 6. Página principal y selector de campañas

La página principal se representará como un observatorio.

En el centro aparecerá el planeta de la campaña seleccionada.

El fondo mostrará el espacio exterior, con estrellas blancas y estrellas de otros colores.

Alrededor del planeta habrá un dial semicircular con los iconos de las campañas.

Características del dial:

- Solo se mostrará la mitad superior.
- La mitad inferior permanecerá oculta.
- Permitirá mostrar un número indefinido de campañas.
- Podrá moverse con la rueda del ratón.
- También tendrá botones para girar a izquierda y derecha.
- Al seleccionar una campaña, su planeta se mostrará en el centro.
- El orden inicial será el orden de creación.
- El owner podrá cambiar manualmente el orden.

Debajo del planeta aparecerán:

1. Nombre de la campaña.
2. Descripción.
3. Mapamundi interactivo.

Al pulsar una región del mapa se abrirá directamente su entrada dentro de la categoría Regiones.

---

## 7. Base de Phaingea

La campaña principal se llamará **Base de Phaingea**.

No representa una campaña jugable concreta. Su función es reunir el lore general, canónico y más actual del mundo.

Debe distinguirse visualmente del resto.

Características especiales:

- Tendrá un outline alrededor de su icono.
- Permanecerá siempre fija en la parte superior central del dial.
- Las demás campañas pasarán de izquierda a derecha alrededor de ella.
- No quedará oculta cuando el dial se mueva.
- No tendrá personajes jugadores.
- No utilizará sesiones como registro de partida.

En Base de Phaingea:

- La categoría **Personajes** se sustituye por **Leyendas**.
- La categoría **Sesiones** se sustituye por **Eventos**.

### Leyendas

Contendrá personajes que hayan pasado a formar parte de la historia del mundo.

Funcionará como memorial o archivo histórico.

### Eventos

Contendrá acontecimientos globales importantes.

No repartirá experiencia ni representará sesiones jugadas.

---

## 8. Estados de campaña

Cada campaña podrá tener un estado.

Estados previstos:

- Activa.
- Finalizada.
- Archivada.
- Privada.

El estado se mostrará mediante un pequeño icono sobre el planeta de la campaña, parecido a los indicadores de notificación de Discord.

El icono no debe tapar el planeta ni dificultar su identificación.

---

## 9. Herencia de categorías

Las campañas podrán heredar determinadas categorías de otra campaña.

Por defecto, las siguientes categorías heredarán desde Base de Phaingea:

- Deidades.
- Regiones.

La herencia será sincronizada.

Esto significa que, mientras una categoría esté heredada, los cambios en la categoría de origen se reflejarán automáticamente en la campaña.

Desde la moderación de cada categoría, el máster podrá:

- Mantener la herencia desde Base de Phaingea.
- Cambiar la campaña de origen.
- Sustituir la categoría heredada por contenido propio.
- Volver a activar la herencia.

El resto de categorías serán propias de cada campaña.

---

## 10. Estructura general de las categorías

Cada categoría tendrá una página propia y una ambientación visual diferente.

La estructura habitual será:

1. Fondo o habitación temática.
2. Libro, carpeta, diario o elemento principal.
3. Contenido.
4. Zona inferior específica de la categoría.

La zona inferior puede contener:

- Comentarios.
- Filtros.
- Ficha ampliada.
- Información adicional.
- Herramientas de moderación.

No todas las categorías tienen que usar exactamente un libro tradicional, pero deben mantener la idea de contenido físico archivado.

---

## 11. Libros basados en PDF

Cuando una categoría utilice un PDF, el PDF tendrá prioridad sobre el contenido generado por la web.

La web deberá conservar:

- Diseño.
- Imágenes.
- Colores.
- Tipografías.
- Composición.
- Portada y contraportada si ya están incluidas.

La web añadirá alrededor del PDF:

- Navegación.
- Índice.
- Buscador.
- Animación de páginas.
- Comentarios.
- Moderación.
- Acceso rápido a páginas concretas.

También habrá una opción para añadir una portada o contraportada generada por la web aunque el contenido principal sea un PDF.

La implementación interna del PDF deberá elegirse buscando conservar su diseño original y permitir una navegación fluida.

---

## 12. Libros generados por la web

Las categorías dinámicas se crearán directamente desde los datos de la aplicación.

Sus libros podrán utilizar cubiertas prediseñadas.

Ejemplos:

- Cuero rojo.
- Cuero verde.
- Cuero negro.
- Otros colores configurables.

Cada cubierta incluirá pequeños símbolos decorativos en esquinas o bordes.

Estos símbolos serán suficientemente genéricos para reutilizarse en distintas categorías.

Los libros generados por la web podrán tener:

- Portada.
- Contraportada.
- Título.
- Texto de portada.
- Sinopsis.
- Color.
- Modelo visual.
- Símbolos decorativos.

---

## 13. Navegación dentro de los libros

Los libros tendrán animación de paso de página.

Además, deberán incluir navegación rápida:

- Índice.
- Buscador.
- Acceso directo a una página.
- Controles para avanzar y retroceder.
- Posibilidad de volver al inicio del libro.

Esto será especialmente importante para documentos largos.

---

## 14. Categoría Deidades

La categoría Deidades se representará como una capilla o sala religiosa.

El libro estará colocado sobre un atril.

Normalmente será una categoría basada en PDF.

Por defecto heredará desde Base de Phaingea, aunque una campaña podrá sustituirla por una versión propia.

Debajo del libro habrá comentarios generales de la categoría.

Los comentarios no dependerán de la página abierta.

---

## 15. Categoría Regiones

La categoría Regiones se representará como una sala de cartografía.

Normalmente será una categoría basada en PDF.

Por defecto heredará desde Base de Phaingea, aunque una campaña podrá sustituirla o heredarla desde otra campaña.

También podrá accederse a sus entradas desde el mapamundi de la campaña.

Debajo del libro habrá comentarios generales.

Los comentarios no dependerán necesariamente de la región abierta, salvo que posteriormente se decida separar comentarios por entrada.

---

## 16. Categoría Galería

La Galería será una categoría dinámica.

Se representará como un libro largo de ilustraciones.

Cada imagen añadida aparecerá dentro de un marco.

Los marcos deberán adaptarse a:

- Orientación horizontal.
- Orientación vertical.
- Formato cuadrado.
- Proporciones especiales.

Al pulsar una imagen:

- Se abrirá en grande.
- El resto de la pantalla se oscurecerá ligeramente.
- Se mostrarán sus tags.
- Se podrá cerrar y volver al libro.

### Tags

Cada imagen tendrá uno o varios tags.

Ejemplos:

- Personaje.
- Grupal.
- Paisaje.
- Compañero.
- Mascota.
- Aliado.
- Villano.
- Objeto.
- Outfit.

Los tags podrán seleccionarse durante la subida.

También se podrá crear un tag nuevo desde el mismo formulario.

El owner o máster podrá añadir y modificar tags posteriormente.

### Filtros

Debajo del libro no habrá comentarios.

En su lugar habrá una sección de filtros.

Permitirá filtrar imágenes por:

- Tags.
- Autor.
- Campaña.
- Personaje relacionado.
- Fecha, si se considera necesario.

### Aportaciones de jugadores

Los jugadores podrán proponer imágenes.

Cada jugador podrá tener un máximo de cinco solicitudes pendientes a la vez.

Una solicitud deja de contar como pendiente cuando el máster:

- La aprueba.
- La deniega.

Al crear una solicitud se deberán añadir los tags correspondientes.

El máster podrá:

- Aprobar.
- Denegar.
- Modificar tags.
- Añadir nuevos tags.
- Subir imágenes directamente sin aprobación.

---

## 17. Categoría Personajes

La categoría Personajes estará pensada para mostrar los personajes jugadores de una campaña.

Visualmente se representará como un archivador o carpeta.

Cada página corresponderá a un personaje.

La información se generará desde el perfil del personaje.

Campos principales:

- Imagen.
- Nombre.
- Edad.
- Raza.
- Sexo.
- Breve descripción.
- Jugador que lo controla.
- Estado del personaje.

Estados posibles:

- Activo.
- Fallecido.
- Delegado.

Un personaje delegado es un personaje que no ha muerto, pero ha dejado de ser controlado por el jugador y ha pasado a ser PNJ.

### Ficha de personaje

Al hacer scroll debajo de la página del personaje aparecerá su ficha completa.

La ficha podrá subirse como PDF.

Visualmente deberá sentirse como un diario, cuaderno o ficha de papel, manteniendo animaciones de páginas cuando sea posible.

### Comentarios de personaje

Los comentarios dependerán del personaje abierto.

Otros jugadores podrán proponer comentarios.

El comentario deberá ser aprobado por:

- El jugador propietario del personaje.
- O el máster.

El jugador propietario podrá publicar comentarios sobre su propio personaje sin aprobación adicional.

---

## 18. Creación y sustitución de personajes

Un jugador solo podrá tener un personaje activo por campaña.

Los personajes solo existirán cuando el jugador participe en una campaña.

No podrán crearse personajes independientes fuera de una campaña.

Para crear otro personaje, el anterior deberá estar marcado por el máster como:

- Fallecido.
- Delegado.

No se recomienda sobrescribir un personaje antiguo, porque debe conservarse como recuerdo de la campaña.

Un mismo jugador podrá participar en varias campañas y tener un personaje diferente en cada una.

---

## 19. Categoría Sesiones

La categoría Sesiones será dinámica.

Cada página del libro representará una sesión.

El máster podrá crear una sesión mediante un formulario sencillo.

Campos:

- Título.
- Subtítulo opcional.
- Experiencia general.
- Experiencia específica por jugador.
- Descripción opcional.

El título tendrá como valor inicial:

`Sesión [número siguiente]`

El máster podrá modificarlo.

### Experiencia general

Será un valor numérico compartido por todos los personajes participantes.

Podrá ser cero.

### Experiencia específica

Permitirá asignar experiencia adicional a jugadores concretos.

El formulario mostrará una lista de los personajes de la campaña.

Por defecto tendrán cero experiencia adicional.

### Comentarios de sesión

Los comentarios dependerán de la sesión abierta.

Cada jugador podrá dejar un único comentario por sesión.

No requerirá aprobación previa.

El autor podrá editarlo.

El máster podrá editarlo o borrarlo.

---

## 20. Sistema general de comentarios

Los comentarios utilizarán una única estructura reutilizable en todas las categorías.

Formato:

`Nombre del personaje (Nombre del jugador) — Fecha`

Debajo aparecerá el texto.

Si el usuario no tiene personaje en esa campaña, aparecerá únicamente su nombre de jugador.

Cada categoría podrá configurar:

- Si los comentarios son generales o dependen de una página.
- Si requieren aprobación.
- Quién puede aprobarlos.
- Número máximo por jugador.
- Quién puede editarlos.
- Quién puede eliminarlos.

No habrá respuestas anidadas.

### Edición

Un comentario podrá editarse por:

- Su autor.
- El máster de la campaña.
- El owner.

### Eliminación

El máster y el owner podrán eliminar comentarios.

La eliminación tendrá doble confirmación.

### Reacciones

Los comentarios podrán recibir reacciones mediante emojis.

No habrá sistema de respuestas.

---

## 21. Usuarios y roles

La aplicación tendrá cuatro roles principales.

### Invitado

Puede ver únicamente el contenido al que se le haya dado acceso.

No participa en campañas ni tiene personajes.

### Jugador

Puede:

- Participar en una o varias campañas.
- Tener un personaje diferente en cada campaña.
- Escribir comentarios.
- Proponer contenido.
- Recibir experiencia.
- Consultar sus notificaciones.

Un jugador puede existir sin participar actualmente en ninguna campaña.

### Máster

Puede administrar únicamente las campañas en las que tenga asignado el rol de máster.

Puede:

- Gestionar contenido.
- Administrar sesiones.
- Asignar experiencia.
- Aprobar propuestas.
- Gestionar personajes.
- Moderar comentarios.
- Gestionar permisos dentro de su campaña.

### Owner

Tiene permisos globales.

Puede actuar como máster en todas las campañas.

Puede:

- Crear y eliminar campañas.
- Asignar másteres.
- Gestionar usuarios.
- Cambiar configuraciones globales.
- Acceder a todos los registros.
- Modificar el orden del dial.
- Administrar Base de Phaingea.

---

## 22. Permisos

Los permisos deberán separarse por campaña y categoría.

Un usuario podrá tener:

- Permiso para ver una campaña.
- Permiso para participar en una campaña.
- Permiso para ver una categoría.
- Permiso para escribir comentarios.
- Permiso para proponer imágenes.
- Permiso para administrar contenido.

Tener acceso visual a una campaña no implica participar en ella.

Un jugador puede acceder a una campaña como invitado sin tener personaje.

---

## 23. Perfil

El perfil se abrirá como una ventana centrada sobre la página actual.

No ocupará toda la pantalla.

La página que estuviera abierta seguirá visible en los bordes, oscurecida y desenfocada.

El perfil tendrá apariencia de diario personal.

Subpáginas iniciales:

1. Personaje de la campaña actual.
2. Perfil del jugador.
3. Ajustes personales de la web.

Cuando el usuario cambie de campaña, la primera pestaña mostrará el personaje correspondiente a esa campaña.

Si no tiene personaje, aparecerá un estado vacío con signos de interrogación.

---

## 24. Perfil de jugador

El perfil general incluirá:

- Nombre del jugador.
- Imagen de perfil genérica.
- Campañas accesibles.
- Campañas en las que participa.
- Ajustes personales.
- Preferencias de sonido.
- Preferencias visuales disponibles.

Por defecto, la foto de perfil podrá ser la inicial del usuario.

---

## 25. Perfil de personaje

Cada perfil de personaje incluirá:

- Imagen.
- Nombre.
- Edad.
- Raza.
- Sexo.
- Breve descripción.
- Ficha PDF.
- Estado.
- Experiencia.
- Nivel.
- Campaña.
- Jugador propietario.

Este contenido se utilizará para generar automáticamente su página en la categoría Personajes.

---

## 26. Privacidad de personajes

Un jugador podrá ocultar temporalmente la información de su personaje.

Cuando esté oculto:

- El personaje seguirá apareciendo en la categoría.
- Los datos estarán cubiertos por barras negras.
- La imagen estará tachada parcialmente.
- Solo se mostrarán pequeños fragmentos.
- La máscara visual será igual para todos los personajes ocultos.

El máster y el owner podrán seguir viendo la información completa.

---

## 27. Experiencia y niveles

El sistema estará basado en Pathfinder 1e.

Cada campaña podrá seleccionar una progresión:

- Rápida.
- Media.
- Lenta.

La web calculará automáticamente:

- Experiencia total.
- Nivel actual.
- Experiencia necesaria para el siguiente nivel.

Ejemplo:

`766 / 1300`

También se mostrará el nivel del personaje.

### Tipos de experiencia

La experiencia se dividirá en:

- Experiencia general.
- Experiencia extra.

Ambas aparecerán dentro de una única barra.

Cada parte tendrá un color diferente.

La barra deberá permitir ver cuánto corresponde a cada tipo.

### Origen de la experiencia

La experiencia general y extra obtenida en sesiones se calculará automáticamente desde la categoría Sesiones.

El máster también podrá añadir experiencia manualmente.

Cuando la experiencia no proceda de una sesión será obligatorio indicar un motivo.

Cuando proceda de una sesión, el motivo será automáticamente el título de esa sesión.

El jugador no podrá modificar su experiencia.

---

## 28. Moderación contextual

Todo elemento físico o visible de la aplicación tendrá un botón de moderación oculto para usuarios sin permisos.

El botón aparecerá siempre en una posición coherente, preferiblemente una esquina superior.

Ejemplos:

- Moderación de una campaña.
- Moderación de una sesión.
- Moderación de una imagen.
- Moderación de un personaje.
- Moderación de una categoría.

Desde ese botón se administrará únicamente el elemento abierto.

Los formularios serán sencillos.

Los campos que lo necesiten tendrán opciones avanzadas desplegables.

---

## 29. Categoría Moderación

Existirá una categoría global llamada Moderación.

Solo será visible para:

- Másteres.
- Owner.

Contendrá:

- Gestión de campañas.
- Gestión de jugadores.
- Asignación de roles.
- Permisos.
- Configuraciones globales.
- Logs.
- Solicitudes pendientes.
- Configuración de categorías.
- Configuración de herencia.
- Gestión de notificaciones importantes.

Los másteres solo verán información relacionada con sus campañas.

El owner tendrá acceso global.

---

## 30. Logs

No se necesita un historial completo de cada modificación.

Solo se guardarán registros de acciones importantes.

Ejemplos:

- Creación de campaña.
- Eliminación de campaña.
- Finalización de campaña.
- Creación de personaje.
- Fallecimiento de personaje.
- Cambio de máster.
- Cambio de permisos importante.
- Creación de sesión.
- Reparto de experiencia.
- Aprobación o rechazo de contenido.
- Modificación de una categoría heredada.

Los logs se mostrarán dentro de Moderación.

---

## 31. Notificaciones

Los jugadores tendrán una categoría de Notificaciones.

Funcionará como una versión visible y simplificada de los registros importantes.

Las notificaciones dependerán de las campañas a las que el usuario tenga acceso.

Ejemplos dentro de una campaña:

- Se han publicado las notas de una sesión.
- Se ha repartido experiencia.
- Un jugador ha creado su personaje.
- Un personaje ha fallecido.
- Se ha añadido una imagen a la galería.
- Se ha aprobado una propuesta.
- Se ha añadido contenido a una categoría.

Ejemplos dentro de Base de Phaingea:

- Se ha creado una campaña.
- Una campaña ha finalizado.
- Se ha archivado una campaña.
- Se ha publicado un evento importante.

Las notificaciones podrán marcarse como leídas.

---

## 32. Creación y administración de campañas

La creación de campañas se realizará desde Moderación.

El formulario incluirá:

- Nombre.
- Icono de planeta.
- Fuente.
- Colores.
- Descripción.
- Mapamundi.
- Estado.
- Máster.
- Jugadores.
- Progresión de experiencia.
- Categorías heredadas.
- Campaña de origen para cada herencia.
- Posición inicial en el dial.

Las campañas podrán:

- Crearse.
- Editarse.
- Reordenarse.
- Finalizarse.
- Archivarse.
- Marcarse como privadas.
- Eliminarse.

La eliminación tendrá doble confirmación.

---

## 33. Cambio entre categorías

Al cambiar de categoría cambiará toda la escena.

Ejemplos:

- Inicio → Observatorio.
- Deidades → Capilla.
- Regiones → Sala de mapas.
- Galería → Sala de exposición.
- Personajes → Archivador.
- Sesiones → Archivo o diario.
- Perfil → Diario personal.
- Moderación → Sala privada de administración.

Se mantendrán elementos comunes:

- Barra superior.
- Sistema de botones.
- Tipografía de interfaz.
- Comportamiento de ventanas.
- Colores base.
- Navegación.
- Posición de controles importantes.

---

## 34. Diseño para ordenador y móvil

El diseño principal se realizará para ordenador.

Prioridades de escritorio:

- Libros grandes.
- Animaciones de páginas.
- Salas completas.
- Dial de campañas.
- Ventanas superpuestas.
- Mapas interactivos.
- Uso de rueda del ratón.
- Navegación visual.

La versión móvil deberá conservar todas las funciones, aunque podrá simplificar:

- Animaciones.
- Tamaño de los libros.
- Fondos.
- Dial.
- Transiciones.
- Distribución de la barra superior.

Durante el desarrollo de escritorio se deberán evitar decisiones que impidan una adaptación posterior.

---

## 35. Requisitos generales de experiencia

La aplicación debe:

- Ser fácil de entender sin instrucciones extensas.
- Mantener coherencia visual.
- Evitar pantallas recargadas.
- Priorizar la lectura.
- Permitir volver fácilmente a la página anterior.
- Mostrar claramente la campaña activa.
- Mostrar claramente el personaje activo.
- Indicar cuándo el contenido es heredado.
- Indicar cuándo el contenido está oculto o bloqueado.
- Diferenciar acciones normales y acciones de moderación.
- Usar doble confirmación para acciones destructivas.
- Mantener animaciones suaves.
- Evitar sonidos repetitivos.
- Permitir desactivar los sonidos.

---

## 36. Decisiones técnicas todavía pendientes

Aunque el funcionamiento general ya está definido, todavía deberán resolverse durante el desarrollo los siguientes puntos:

- Método exacto para renderizar PDFs manteniendo su diseño.
- Tecnología para la animación de páginas.
- Sistema de autenticación compatible con el alojamiento elegido.
- Lugar donde se guardarán usuarios, comentarios, imágenes, permisos y experiencia.
- Compatibilidad real de las funciones dinámicas con GitHub Pages.
- Sistema de almacenamiento de imágenes.
- Gestión de notificaciones.
- Gestión de logs.
- Forma de implementar búsquedas dentro de PDFs.
- Adaptación exacta del dial a móvil.
- Límite de tamaño de archivos PDF e imágenes.
- Copias de seguridad.
- Seguridad de permisos y roles.
