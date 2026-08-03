# Phaingea — Guía funcional y de diseño

## 1. Propósito de la web

Phaingea será una enciclopedia del universo, un archivo histórico y un lugar donde conservar campañas, personajes, sesiones, imágenes, reglas, herramientas y recuerdos de juego.

La web no debe sentirse como una wiki tradicional. Su identidad será la de un edificio cultural de fantasía medieval compuesto por distintas salas. Cada categoría tendrá su propio espacio, perspectiva, decoración e interacción, pero todas compartirán una estética común.

La prioridad es que la experiencia sea:

- Clara.
- Visual.
- Fácil de entender sin explicaciones largas.
- Coherente entre categorías.
- Cómoda para leer y consultar.
- Ambientada sin que la decoración estorbe.
- Pensada primero para ordenador, pero adaptable posteriormente a móvil.

---

## 2. Concepto visual general

La web debe sentirse como un lugar antiguo dedicado a conservar conocimiento y recuerdos: una mezcla entre biblioteca, museo, observatorio, archivo, capilla y taller.

La estética general utilizará:

- Madera.
- Cuero.
- Papel y pergamino.
- Mármol y piedra.
- Metal envejecido.
- Tonos rústicos y medievales.
- Detalles de fantasía suaves.
- Dorado para textos de hover, contornos y elementos destacados.
- Un fondo de estrellas compartido por toda la web.

El fondo estrellado permanecerá en todas las salas, aunque podrá verse más o menos dependiendo de la habitación. Siempre que sea posible, las estrellas incluirán colores además del blanco.

Cada sala utilizará la perspectiva que mejor represente su espacio. No todas deben verse desde arriba: una mesa puede mostrarse en vista cenital, mientras que una capilla puede verse de frente y con profundidad.

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

---

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

---

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

## 5. Campañas

Cada campaña representa una época, situación o versión distinta del mundo de Phaingea.

Cada campaña tendrá:

- Nombre.
- Planeta o aspecto visual propio.
- Logo en imagen.
- Fuente propia para su título.
- Color de texto.
- Color de contorno.
- Descripción de uno o varios párrafos.
- Regiones y lugares propios.
- Estado.
- Jugadores participantes.
- Máster o másteres.
- Progresión de experiencia.
- Orden dentro del selector de campañas.
- Configuración independiente de sus categorías.

El orden inicial de las campañas será el de creación, aunque el owner podrá reorganizarlo.

### 5.1. Estados de campaña

Una campaña podrá marcarse como:

- Activa.
- Finalizada.
- Archivada.
- Privada.

Su estado aparecerá mediante un pequeño indicador sobre el planeta o icono de campaña, parecido a una insignia de notificación. Debe ser visible sin tapar el diseño del planeta.

---

## 6. Base de Phaingea

La campaña principal se llamará **Base de Phaingea**.

No representa una partida concreta. Reúne el lore general, canónico y más permanente del mundo.

Debe diferenciarse visualmente de las demás campañas mediante un contorno especial y una posición fija en el selector.

En Base de Phaingea:

- **Podios** se sustituye por **Leyendas**.
- **Sesiones** se sustituye por **Eventos**.

Base de Phaingea permanecerá fija en la parte superior central del selector de campañas. Las demás campañas se moverán alrededor sin ocultarla.

Su contenido será principalmente estable y servirá como referencia para el resto de campañas.

---

## 7. Herencia de contenido

Algunas categorías podrán heredar su contenido de Base de Phaingea o de otra campaña.

Por defecto:

- Capilla podrá heredar sus deidades.
- Cartografía podrá heredar sus mapas, regiones y lugares.

Mientras la herencia esté activa, los cambios realizados en la campaña de origen se reflejarán también en la campaña que hereda.

El máster podrá:

- Mantener la herencia.
- Cambiar la campaña de origen.
- Sustituir el contenido heredado por contenido propio.
- Volver a activar la herencia más adelante.

La interfaz debe indicar claramente cuándo un contenido es heredado y de dónde procede.

---

# 8. Observatorio

El Observatorio será la sala principal y el lugar donde se seleccionan las campañas.

## 8.1. Escena

La sala debe sentirse como si se estuviera mirando hacia el techo de un observatorio enorme.

El fondo estará compuesto principalmente por:

- Espacio exterior.
- Estrellas animadas.
- Vigas metálicas estáticas.
- Cristales o estructuras curvas que den sensación de profundidad.

Debe ser una escena limpia, amplia y algo solemne. No debe sentirse como una habitación cerrada, sino como una gran abertura hacia el cielo.

## 8.2. Planeta principal

En el centro aparecerá un planeta grande que representa la campaña activa.

Al cambiar de campaña:

- Cambia el aspecto o los colores del planeta.
- Cambia el logo.
- Cambia el título.
- Cambia la descripción.
- Cambian las regiones o pines visibles sobre el planeta.
- Cambia el personaje activo del usuario.
- Todas las categorías pasan a mostrar los datos de la nueva campaña.

## 8.3. Dial de campañas

Alrededor del planeta habrá un dial tridimensional con los planetas de las distintas campañas.

El dial:

- Se percibirá curvo y con profundidad.
- Ocultará los planetas que pasen detrás del planeta central.
- Podrá desplazarse hacia izquierda o derecha.
- Permitirá seleccionar cualquier campaña.
- Mostrará hasta dos letras sobre cada planeta para reconocerlo.
- Mostrará el nombre completo de la campaña al hacer hover.
- Mantendrá Base de Phaingea fija en la parte superior central.

Al seleccionar un planeta, este pasa a convertirse en la campaña activa.

## 8.4. Regiones sobre el planeta

El planeta principal mostrará pines o nombres de regiones asociados a la campaña activa.

Al pulsar una región:

- Aparece un recuadro con un pequeño resumen.
- Se muestra su nombre.
- Puede mostrarse una imagen breve si existe.
- Aparece un botón **Abrir en Cartografía**.

Ese botón cambia a la sala de Cartografía y abre directamente el lugar seleccionado.

## 8.5. Nota de campaña

Debajo del planeta aparecerá una nota de papel antiguo adaptable al contenido.

La nota incluirá:

- Título de la campaña.
- Fuente propia.
- Color de texto propio.
- Color de contorno propio.
- Logo de la campaña detrás o junto al título.
- Línea divisoria.
- Descripción de uno o varios párrafos.

El cuerpo de la descripción utilizará una fuente y color comunes que garanticen buena lectura sobre el papel.

El logo de la campaña también aparecerá en la barra superior, junto al texto **PHAINGEA**, mientras esa campaña esté activa.

---

# 9. Capilla

La Capilla será la categoría dedicada a deidades y contenido religioso.

## 9.1. Escena

La cámara se situará de frente, como si el usuario estuviera ante un atril desde el que se va a predicar.

La sala tendrá:

- Profundidad.
- Forma ligeramente ovalada.
- Mármol blanco.
- Buena iluminación.
- Un atril elevado en el centro.
- Una columna que baja desde el atril.
- Dos vidrieras laterales.
- Cristal parcialmente transparente.
- El fondo estrellado visible a través de las vidrieras.
- Luz de color entrando desde los laterales.

La escena debe sentirse reservada, limpia y solemne.

## 9.2. Libro de deidades

El contenido principal será un libro apoyado sobre el atril.

Normalmente mostrará un documento ya maquetado, conservando:

- Portada.
- Contraportada.
- Colores.
- Imágenes.
- Diseño de página.
- Tipografía.
- Composición.

Opcionalmente se podrá añadir una portada o contraportada creada desde la web.

El libro tendrá:

- Paso de página.
- Índice.
- Buscador.
- Acceso rápido a una página.
- Controles para avanzar y retroceder.
- Botón para volver al índice.
- Botón de pantalla completa.

## 9.3. Pantalla completa de libros

Todo componente que funcione como libro tendrá un pequeño icono de ampliar situado fuera del libro.

Al hacer hover mostrará **Pantalla completa**.

Al pulsarlo:

- El libro se agranda.
- Se centra en la pantalla.
- El resto de la web queda oscurecido y borroso.
- El icono se convierte en una X.
- La X se sitúa fuera del libro, en la esquina inferior derecha del conjunto ampliado.

Se vuelve al tamaño normal pulsando la X o haciendo clic fuera del libro.

## 9.4. Comentarios

Debajo del atril, al hacer scroll, aparecerán comentarios generales de la Capilla.

Estos comentarios no dependerán de la página del libro que esté abierta.

---

# 10. Cartografía

Cartografía será una sala centrada en mapas, regiones, pueblos, edificios y cualquier otro lugar del mundo.

## 10.1. Escena

El elemento principal será un mapa visto de frente y rodeado por un marco grueso de madera.

A los lados habrá herramientas colgadas en pequeños ganchos metálicos.

El fondo estrellado seguirá siendo visible alrededor de la estructura.

La sala debe sentirse ordenada, práctica y propia de una cartoteca o sala de mapas.

## 10.2. Mapa activo

Al entrar se mostrará el lugar configurado como predeterminado para esa campaña.

No todas las campañas suceden en el planeta completo. El máster podrá decidir que el mapa inicial sea:

- El mapamundi.
- Una región.
- Una ciudad.
- Una isla.
- Cualquier otro lugar registrado.

Si un lugar no tiene mapa aparecerá un mensaje equivalente a:

> Imagen de mapa no disponible.

## 10.3. Navegación del mapa

Sin ninguna herramienta seleccionada, el usuario podrá:

- Arrastrar para desplazarse.
- Usar la rueda del ratón para ampliar o reducir.
- Pulsar pines.
- Abrir resúmenes de lugares.
- Entrar en otro mapa mediante el botón correspondiente.

Al pulsar un pin aparecerá un recuadro con:

- Nombre del lugar.
- Breve resumen.
- Imagen opcional.
- Botón **Entrar al lugar**.

Al entrar:

- Cambia el mapa activo.
- Cambia el título.
- Cambia la información.
- Cambian los pines.
- Cambian los comentarios asociados.

## 10.4. Herramientas del mapa

### Lupa

La lupa estará colgada junto al mapa.

Al seleccionarla:

- Desaparece de su soporte.
- Aparece como herramienta junto al cursor.
- Al pasar sobre el mapa amplía la zona situada bajo la lente.
- Puede devolverse a su sitio para salir del modo lupa.

### Compás

El compás permitirá marcar el mapa.

Al seleccionarlo, su espacio mostrará controles para elegir:

- Uno de cuatro colores.
- Modo círculo.
- Modo libre.

El modo círculo dibuja círculos sobre el mapa.

El modo libre permite dibujar manualmente.

Estos dibujos son temporales y personales. Si pueden conservarse tras recargar sin generar una carga excesiva, se mantendrán; si no, se eliminarán al abandonar o recargar la sesión.

### Paño

El paño funcionará como goma de borrar.

Permitirá:

- Borrar zonas concretas.
- Eliminar trazos.
- Corregir círculos.
- Limpiar todos los dibujos mediante una opción separada.

El borrado debe ser controlable por el usuario, no una eliminación automática de todas las marcas al seleccionar la herramienta.

## 10.5. Información del lugar

Debajo del mapa aparecerá el nombre del lugar activo.

Después habrá una sección contraída por defecto con el texto **Mostrar información** y un indicador de despliegue.

Al abrirla aparecerá un papel con la información escrita por el máster.

Esta información podrá incluir:

- Descripción.
- Historia.
- Habitantes.
- Gobierno.
- Clima.
- Lugares relevantes.
- Notas.
- Enlaces a lugares contenidos.

El contenido exacto será libre y podrá variar según el lugar.

## 10.6. Jerarquía de lugares

Cualquier lugar podrá pertenecer a otro lugar.

Ejemplos:

- Un continente contiene regiones.
- Una región contiene ciudades.
- Una ciudad contiene barrios.
- Un pueblo contiene edificios.
- Un edificio puede contener habitaciones.

Cada lugar podrá:

- Tener un lugar superior.
- Contener otros lugares.
- Tener mapa propio o no.
- Aparecer como pin en el mapa de su lugar superior.
- Tener descripción propia.
- Tener imagen o mapa.
- Tener comentarios propios.
- Estar vinculado desde otros contenidos.

Un personaje o lugar puede existir aunque todavía no se haya colocado como pin.

## 10.7. Lista de lugares

Debajo del mapa activo aparecerá una lista de lugares relacionados, ordenada alfabéticamente.

Seleccionar un elemento abrirá su información o su mapa.

## 10.8. Comentarios

Los comentarios estarán asociados al lugar activo.

Cambiar de mapa o lugar cambia también el hilo de comentarios.

---

# 11. Podios

Podios será la categoría donde se muestran los personajes de una campaña.

En Base de Phaingea se llamará **Leyendas**.

## 11.1. Escena

El personaje aparecerá en el centro sobre un podio de mármol, iluminado por focos.

La imagen será la ilustración completa del personaje, no únicamente el recorte circular usado en el perfil.

El podio debe ser sencillo y dar prioridad al personaje.

## 11.2. Información visible

Encima o alrededor del personaje aparecerá:

- Nombre, con los colores y contorno de la campaña.
- Edad.
- Raza.
- Nivel.
- Estado.
- Jugador que lo controla, cuando corresponda.

La posición del nombre debe ajustarse a imágenes de distinta altura.

## 11.3. Navegación entre personajes

A izquierda y derecha habrá controles para cambiar de personaje.

El orden será alfabético.

La navegación será circular:

- Desde el primero, ir a la izquierda abre el último.
- Desde el último, ir a la derecha abre el primero.

## 11.4. Filtros

El usuario podrá filtrar por estado.

Estados:

- Activo.
- Fallecido.
- Delegado.

Se podrá:

- Mostrar todos.
- Activar uno o varios estados.
- Ocultar los no seleccionados.

También habrá filtros por grupos cuando corresponda.

## 11.5. Grupos

Los personajes podrán pertenecer a uno o varios grupos.

En campañas normales:

- Por defecto se crea un grupo con el nombre de la campaña.
- El nombre puede cambiarse.
- Los personajes se muestran inicialmente como individuales.
- Puede haber varios grupos.

En Base de Phaingea:

- Las Leyendas se muestran por grupos de forma predeterminada.
- El máster puede subir personajes individuales o grupos completos.
- Cada grupo tendrá su propio nombre.
- El nombre del grupo podrá tener un color propio.
- Cada personaje del grupo conservará su podio, información y diario.
- Un personaje podrá pertenecer a varios grupos.

Cuando se selecciona un grupo, sus personajes aparecen juntos dentro de una composición compartida.

## 11.6. Botones del podio

Junto al personaje habrá dos botones.

### Ampliar personaje

Muestra el personaje casi a pantalla completa.

El fondo queda borroso.

Hacer clic fuera devuelve a la vista normal.

### Mostrar diario

Abre o cierra el diario del personaje.

El diario aparece debajo del podio.

Si se abre el diario de otro personaje, sustituye al que estuviera abierto.

## 11.7. Diario del personaje

El diario será un libro generado desde un único texto escrito en Markdown.

Podrá contener:

- Lore.
- Historia.
- Personalidad.
- Objetivos.
- Mecánicas.
- Habilidades.
- Inventario.
- Notas del jugador.
- Imágenes o enlaces admitidos.
- Cualquier otra información útil.

El diario tendrá un máximo de ocho páginas.

La web distribuirá el contenido entre páginas, pero el jugador podrá forzar un salto de página mediante una marca específica dentro del Markdown.

Esa marca debe ser sencilla de escribir y estar explicada en el editor.

En la parte superior de la primera página aparecerá la barra de experiencia del personaje.

## 11.8. Comentarios de personaje

Los comentarios aparecerán debajo del diario si está abierto, o debajo del podio si está cerrado.

Los comentarios pertenecen al personaje visible.

Pueden aprobarlos:

- El propietario del personaje.
- El máster.
- El owner.

El propietario puede publicar en su propio personaje sin aprobación.

---

# 12. Leyendas

Leyendas sustituye a Podios dentro de Base de Phaingea.

Mantiene el mismo sistema visual, pero su función es conservar personajes históricos, figuras importantes y grupos que hayan pasado a formar parte del canon.

El contenido lo administra el máster.

Puede incluir:

- Personajes individuales.
- Compañías.
- Familias.
- Órdenes.
- Grupos de aventureros.
- Facciones personificadas.
- Conjuntos de personajes relacionados.

Por defecto la vista será por grupos.

Cada leyenda podrá tener:

- Podio.
- Diario.
- Estado histórico.
- Grupo o grupos.
- Comentarios.
- Imagen.
- Información básica.

---

# 13. Galería

Galería será un museo de imágenes y recuerdos visuales.

No funcionará como libro.

## 13.1. Escena

Las imágenes se mostrarán como cuadros con marcos de madera.

La composición debe:

- Mantener espacio entre marcos.
- Adaptarse a distintas proporciones.
- Evitar cortes innecesarios.
- Sentirse como una exposición.
- Mostrar hasta dieciséis imágenes por página.
- Mostrar menos cuando haya imágenes grandes o proporciones difíciles de combinar.

## 13.2. Filtros por tags

En la parte superior habrá una barra de tags.

La lista podrá:

- Expandirse.
- Contraerse.
- Tener varios tags seleccionados.
- Desactivar un tag pulsándolo de nuevo.

Cuando hay varios tags seleccionados, solo se mostrarán imágenes que contengan **todos** los tags activos.

Ejemplos de tags:

- Personaje.
- Grupal.
- Paisaje.
- Compañero.
- Mascota.
- Aliado.
- Villano.
- Objeto.
- Outfit.
- Lugar.
- Evento.

## 13.3. Navegación de páginas

A izquierda y derecha de la galería habrá flechas de madera.

La navegación será circular:

- Ir a la izquierda desde la primera página abre la última.
- Ir a la derecha desde la última abre la primera.

La paginación se aplicará sobre los resultados del filtro actual.

## 13.4. Vista ampliada

Al pulsar una imagen:

- Se abre en grande.
- El fondo se oscurece y desenfoca.
- Aparece el título.
- Aparece la descripción.
- Aparecen sus tags.
- Aparece el texto **Subido por [jugador]**.
- Puede cerrarse haciendo clic fuera o mediante una X.

El título será visible tanto en la vista normal como en la ampliada.

## 13.5. Subida de imágenes

En la barra de filtros habrá un control con icono de subida.

Al hacer hover mostrará una indicación clara.

Al pulsarlo se abre una ventana centrada con:

- Área para arrastrar una imagen.
- Opción para abrir el explorador de archivos.
- Campo obligatorio de título.
- Selección obligatoria de al menos un tag.
- Descripción breve opcional.
- Opción para crear tags nuevos.
- Vista previa.
- Botón para enviar a aprobación.

Se podrán crear hasta tres tags nuevos durante una misma subida.

Una vez creados, esos tags quedan disponibles para toda la campaña y podrán usarse sin límite en imágenes posteriores.

## 13.6. Solicitudes pendientes

Un jugador podrá tener un máximo de cinco imágenes pendientes de aprobación al mismo tiempo.

Una solicitud deja de contar cuando el máster:

- La aprueba.
- La deniega.

El jugador podrá consultar desde la propia Galería cuáles de sus imágenes siguen pendientes.

## 13.7. Moderación de Galería

El máster podrá:

- Ver solicitudes pendientes.
- Aprobar imágenes.
- Denegarlas.
- Modificar título.
- Modificar descripción.
- Añadir o retirar tags.
- Crear tags.
- Eliminar imágenes.
- Subir imágenes directamente sin aprobación.

Cuando un jugador envíe una propuesta, las personas capaces de aprobarla recibirán una notificación con acceso directo a la Galería.

---

# 14. Sesiones

Sesiones será un cuaderno de viaje donde se registra cada partida de una campaña.

## 14.1. Libro de sesiones

Cada sesión ocupará una entrada o conjunto de páginas.

Mostrará:

- Número de sesión.
- Título.
- Subtítulo opcional.
- Experiencia general.
- Experiencia extra.
- Personajes que reciben experiencia adicional.
- Descripción opcional de lo ocurrido.

El título por defecto será:

> Sesión [número siguiente]

El máster podrá cambiarlo.

## 14.2. Índice del libro

El propio libro tendrá un índice con una lista compacta de sesiones.

Cada entrada mostrará:

- Número.
- Título.
- Experiencia general.

El índice tendrá scroll interno y permitirá ver todas las sesiones sin abandonar el libro.

Al pulsar una entrada:

- Se realiza una animación de paso de página.
- Se abre directamente la sesión elegida.

Desde cualquier página habrá un acceso rápido para volver al índice.

No habrá un segundo listado duplicado debajo del libro.

## 14.3. Creación y edición

El máster podrá crear y modificar sesiones.

Al cambiar la experiencia de una sesión:

- Se recalcula la experiencia de los personajes afectados.
- Se actualiza su nivel cuando corresponda.
- Se actualizan sus barras de progreso.

## 14.4. Comentarios de sesión

Cada sesión tendrá comentarios propios.

Cada jugador podrá tener un único comentario por sesión.

Podrá editarlo tantas veces como quiera.

No requiere aprobación.

Máster y owner podrán moderarlo.

---

# 15. Eventos

Eventos sustituye a Sesiones dentro de Base de Phaingea.

Funciona como un libro de acontecimientos históricos importantes.

Cada entrada podrá tener:

- Título.
- Fecha o periodo.
- Subtítulo opcional.
- Descripción.
- Imagen opcional.
- Comentarios propios.

Eventos no tendrá:

- Experiencia.
- Número obligatorio de sesión.
- Reparto de niveles.
- Lista de participantes como jugadores.

Su índice funcionará de forma similar al de Sesiones y permitirá abrir cualquier evento rápidamente.

---

# 16. Taller

Taller será la categoría de reglas propias, homebrew, consejos y notas de campaña.

## 16.1. Escena

Debe sentirse como un taller algo caótico, oscuro y creativo.

La decoración puede incluir:

- Borradores.
- Papeles.
- Tablones.
- Herramientas.
- Anotaciones.
- Jaulas.
- Elementos experimentales.

La sala puede tener poca iluminación, pero el texto debe seguir siendo legible.

## 16.2. Libro de reglas

Cada campaña podrá utilizar:

- Un documento ya maquetado.
- Un contenido escrito en Markdown.
- Una combinación de ambos según sus necesidades.

El contenido en Markdown se organizará como libro con páginas.

El libro tendrá:

- Índice.
- Buscador.
- Navegación rápida.
- Pantalla completa.
- Paso de página.
- Acceso para volver al índice.

## 16.3. Panel de tips

Fuera del libro habrá un panel desplegable con tarjetas.

Las tarjetas podrán contener:

- Consejos.
- Recordatorios.
- Noticias.
- Reglas rápidas.
- Aclaraciones.
- Avisos de campaña.

El máster decidirá su orden.

El panel:

- Podrá expandirse o contraerse.
- Tendrá scroll interno.
- Evitará ocupar toda la pantalla cuando existan muchos tips.

## 16.4. Mascota del Taller

Junto al libro habrá una jaula.

Dentro aparecerá la mascota del Taller.

Por defecto utilizará el logo de la campaña, pero el máster podrá sustituirlo por cualquier otra imagen.

La mascota:

- Se moverá ocasionalmente dentro de la jaula.
- Puede desplazarse de un lado a otro.
- Brillará suavemente para indicar que es interactiva.
- Mostrará el texto de hover **Tips de esta campaña**.
- Al pulsarla dirá un tip aleatorio.
- Utilizará un bocadillo de texto adaptable.
- Podrá mostrar también noticias o mensajes configurados por el máster.

El bocadillo se colocará en una zona que no tape el libro ni otros controles importantes.

---

# 17. Sala de Pociones

Sala de Pociones será la categoría de herramientas interactivas.

## 17.1. Escena

En el centro habrá un caldero.

Alrededor aparecerán botellas de poción, cada una asociada a una herramienta.

También habrá espacios para nuevas botellas que se incorporen en el futuro.

## 17.2. Interacción principal

Al seleccionar una poción:

1. La botella se acerca al caldero.
2. Se descorcha.
3. Se inclina.
4. Vierte su líquido.
5. El líquido puede tener cualquier color según la herramienta.
6. Se crean ondas en el caldero.
7. Las ondas revelan poco a poco la herramienta.
8. El contenido queda disponible dentro o sobre el caldero.

La animación debe ser:

- Suave.
- Breve.
- Reutilizable.
- Poco recargada.
- Coherente con un laboratorio de alquimia.

## 17.3. Herramientas

Las pociones actuales podrán mantenerse como placeholders.

La estructura general ya queda definida, pero el comportamiento detallado de cada herramienta se decidirá más adelante.

Ejemplos de herramientas posibles:

- Calculador de daño por caída.
- Conversor de pies a metros.
- Calculador de viaje.
- Otras utilidades relacionadas con Pathfinder y las campañas.

La ausencia de una herramienta terminada no debe impedir que su botella, nombre o hueco aparezcan como espacio reservado.

---

# 18. Buzón

Buzón será la categoría de notificaciones.

Cada campaña tendrá sus propias notificaciones.

Cambiar de campaña cambia también el Buzón y el contador visible.

## 18.1. Acceso rápido

Cuando existan notificaciones pendientes de la campaña activa, aparecerá un pequeño icono de sobre a la izquierda del perfil.

El icono mostrará:

- 1, 2, 3, etc.
- **9+** cuando haya más de nueve.

Si no hay notificaciones pendientes, el icono no aparece.

Al pulsarlo:

- Se abre directamente el Buzón.
- El sobre aparece ya abierto.
- Se muestran las cartas pendientes.

## 18.2. Escena

La sala será un rincón tranquilo para leer correspondencia.

Tendrá:

- Madera.
- Iluminación cálida.
- Sensación de fuego o chimenea.
- Buzón antiguo.
- Álbum de cartas.
- Ambiente calmado.

## 18.3. Sobre de pendientes

A la derecha habrá una pared de madera con un buzón.

Del buzón sobresaldrá un sobre cerrado.

El número de cartas pendientes aparecerá en el propio buzón.

Al pulsar el sobre:

- Se abre.
- Las cartas salen flotando.
- Se colocan en abanico en la parte superior central.

Al hacer hover sobre una carta, esta sobresale del abanico.

## 18.4. Diseño de las cartas

La parte trasera mostrará:

- Asunto.
- Fecha.
- Logo de la campaña.
- Color de campaña.
- Color de contorno de campaña.

Ejemplos de asuntos:

- Personaje fallecido.
- Aviso del máster.
- Sesión publicada.
- Experiencia recibida.
- Solicitud pendiente.
- Imagen aprobada.

Al pulsar una carta:

- Se gira.
- Se coloca en el centro.
- Se amplía.
- El fondo queda borroso.
- Aparece el texto completo.

La parte frontal utilizará versiones más claras de los colores de campaña para facilitar la lectura.

## 18.5. Lectura y archivo

Abrir una carta permite leerla, pero no la retira automáticamente de pendientes.

Mientras no se archive:

- Sigue contando en el indicador.
- Vuelve al abanico al cerrarla.
- Permanece en el sobre si este se cierra.

La carta tendrá un botón **Archivar**.

Al pulsarlo:

- Deja de contar como pendiente.
- Vuela hacia el álbum.
- Desaparece con un rastro sutil de brillo.
- Queda guardada entre las cartas archivadas.

Cerrar la carta pulsando fuera no la archiva.

## 18.6. Álbum

Las cartas archivadas se guardarán en un álbum coleccionable.

El álbum:

- Se organiza por páginas.
- Muestra las partes traseras de las cartas.
- Añade nuevas páginas cuando sea necesario.
- Permite pulsar una carta para ampliarla y leerla.
- Conserva fecha, asunto, campaña y contenido.

## 18.7. Qué genera una notificación

Se notificará cuando ocurra algo relevante o que necesite interacción.

Ejemplos:

- Se publica una sesión.
- Se reparte experiencia.
- Se modifica una sesión y cambia la experiencia.
- Se crea un personaje.
- Un personaje fallece.
- Un personaje pasa a delegado.
- Se envía contenido para aprobación.
- Se aprueba o deniega una imagen.
- Se crea una campaña.
- Finaliza una campaña.
- Se publica un evento.
- El máster envía un aviso.

Las notificaciones siempre pertenecen a una campaña concreta.

---

# 19. Perfil

El Perfil no será una categoría.

Se abrirá desde el avatar situado en la esquina superior derecha.

## 19.1. Ventana de perfil

Al abrirlo:

- Aparece una ventana grande con marco de madera.
- Ocupa casi toda la pantalla, sin cubrirla completamente.
- La sala actual sigue visible alrededor.
- El fondo se oscurece y desenfoca.
- Hay una X en la esquina superior derecha.
- Pulsar fuera también cierra la ventana.
- Existe un botón **Guardar**.

## 19.2. Secciones

El Perfil tendrá varias páginas o pestañas internas:

1. Personaje de la campaña activa.
2. Perfil general del jugador.
3. Ajustes personales de la web.

Cuando se cambia de campaña, la pestaña de personaje cambia al personaje correspondiente.

## 19.3. Perfil general del jugador

Incluye:

- Nombre visible.
- Inicial.
- Color de fondo para el avatar.
- Campañas accesibles.
- Campañas en las que participa.
- Ajustes personales.
- Preferencias de sonido.
- Preferencias visuales disponibles.

La imagen de perfil general será una inicial sobre un fondo de color escogido por el usuario.

## 19.4. Perfil de personaje

Cuando el jugador participa en una campaña podrá configurar:

- Imagen completa.
- Recorte circular para avatar.
- Nombre.
- Edad.
- Raza.
- Sexo.
- Descripción breve.
- Diario.
- Ficha.
- Estado.
- Privacidad.

Al subir una imagen, podrá ajustar el recorte circular como en una foto de perfil. La imagen completa se conservará para Podios y otras vistas ampliadas.

Al pulsar el avatar de un personaje desde un comentario podrá verse su imagen completa y acceder a su información permitida.

## 19.5. Personaje oculto

Un jugador podrá ocultar temporalmente su personaje.

Cuando esté oculto para otros jugadores:

- Sus datos aparecerán cubiertos por barras negras.
- La imagen tendrá una máscara de tachado.
- Solo se verán pequeños fragmentos.
- La máscara será igual para todos los personajes ocultos.

Máster y owner podrán seguir viendo su información completa.

---

# 20. Usuarios, personajes y participación

Un usuario puede existir sin participar en ninguna campaña.

Puede tener acceso a una campaña únicamente como visitante, sin personaje.

Un mismo jugador puede participar en varias campañas.

Tendrá un personaje distinto en cada una.

Los personajes:

- Solo existen dentro de una campaña.
- No se crean como entidades independientes.
- Tienen un único propietario.
- Se conservan aunque dejen de estar activos.

Cada jugador tendrá un máximo de un personaje activo por campaña.

Para crear otro, el anterior debe estar marcado como:

- Fallecido.
- Delegado.

Un personaje delegado no ha muerto, pero ha dejado de ser controlado por el jugador y pasa a tratarse como personaje no jugador.

No se deben sobrescribir personajes antiguos, ya que forman parte del archivo de recuerdos.

---

# 21. Roles y permisos

La web tendrá cuatro niveles principales.

## 21.1. Invitado

Puede ver únicamente el contenido que se le haya permitido.

No participa ni tiene personaje.

## 21.2. Jugador

Puede:

- Participar en una o varias campañas.
- Crear y editar su personaje.
- Comentar.
- Reaccionar.
- Proponer imágenes.
- Recibir experiencia.
- Consultar notificaciones.
- Gestionar la privacidad de su personaje.

## 21.3. Máster

Puede administrar únicamente las campañas de las que es responsable.

Puede:

- Gestionar sesiones y eventos.
- Repartir experiencia.
- Gestionar personajes.
- Aprobar contenido.
- Moderar comentarios.
- Editar lugares.
- Configurar categorías.
- Gestionar jugadores de su campaña.
- Consultar registros importantes.
- Acceder a Moderación.

## 21.4. Owner

Tiene acceso global.

Puede:

- Hacer todo lo que hace un máster.
- Administrar cualquier campaña.
- Administrar Base de Phaingea.
- Crear, eliminar y reordenar campañas.
- Asignar másteres.
- Gestionar usuarios.
- Cambiar configuraciones globales.
- Acceder a todos los registros.

## 21.5. Permisos separados

Los permisos podrán diferenciar:

- Ver una campaña.
- Participar.
- Ver una categoría.
- Comentar.
- Proponer contenido.
- Gestionar contenido.
- Aprobar solicitudes.
- Administrar una campaña.

Tener acceso visual no implica participar ni tener personaje.

---

# 22. Sistema general de comentarios

Los comentarios utilizarán el mismo sistema en todas las categorías, aunque sus reglas cambien según el contexto.

Formato:

> Nombre del personaje (Nombre del jugador) — Fecha

Si el usuario no tiene personaje en esa campaña, aparece únicamente su nombre de jugador.

Cada hilo puede configurarse como:

- General de categoría.
- Por sesión.
- Por evento.
- Por personaje.
- Por lugar.
- Por página o entrada concreta.

## 22.1. Edición y eliminación

El comentario puede editarlo:

- Su autor.
- El máster.
- El owner.

El máster y el owner pueden eliminarlo.

Eliminar requiere doble confirmación.

## 22.2. Aprobación

Algunas categorías pueden exigir aprobación.

Los comentarios pendientes solo serán visibles para quienes puedan aprobarlos.

Dependiendo del contexto pueden aprobar:

- Máster.
- Owner.
- Propietario del personaje.

## 22.3. Reacciones

Los comentarios permitirán reacciones con emojis.

No habrá respuestas anidadas ni conversaciones en forma de hilo.

---

# 23. Experiencia y niveles

El sistema de experiencia estará basado en Pathfinder 1e.

Cada campaña podrá utilizar progresión:

- Rápida.
- Media.
- Lenta.

La web calculará:

- Experiencia total.
- Nivel actual.
- Experiencia necesaria para subir.
- Progreso dentro del nivel.

Ejemplo:

> 766 / 1300 — Nivel 1

## 23.1. Tipos de experiencia

La experiencia se divide en:

- General.
- Extra.

Ambas se representan dentro de una única barra con dos colores.

La barra debe mostrar claramente qué parte procede de cada tipo.

## 23.2. Origen

La experiencia de sesiones se calcula automáticamente desde la categoría Sesiones.

El máster también puede añadir experiencia manual.

Cuando no procede de una sesión, será obligatorio escribir un motivo.

Cuando procede de una sesión, el motivo será su título.

El jugador no puede modificar su propia experiencia.

---

# 24. Moderación contextual

Todo elemento administrable tendrá un botón de moderación visible únicamente para quien posea permiso.

Se colocará siempre en una posición coherente.

Ejemplos:

- Campaña.
- Categoría.
- Sesión.
- Evento.
- Personaje.
- Grupo.
- Imagen.
- Lugar.
- Comentario.
- Tip.
- Notificación global.

El botón abrirá únicamente las opciones relacionadas con el elemento actual.

Los formularios serán sencillos, con opciones avanzadas desplegables cuando hagan falta.

---

# 25. Categoría Moderación

Moderación tendrá su propio banderín.

Solo será visible para másteres y owner.

Los másteres verán únicamente sus campañas.

El owner verá el conjunto completo.

La categoría incluirá:

- Gestión de campañas.
- Gestión de jugadores.
- Asignación de roles.
- Permisos.
- Solicitudes pendientes.
- Configuración de categorías.
- Herencia de contenido.
- Gestión de grupos.
- Registros importantes.
- Avisos globales.
- Configuración de tips.
- Gestión de notificaciones.
- Acciones generales que no pertenecen a una sala concreta.

---

# 26. Registros importantes

No se necesita un historial exhaustivo de cada cambio.

Solo se registrarán acciones importantes.

Ejemplos:

- Campaña creada.
- Campaña finalizada.
- Campaña eliminada.
- Máster asignado.
- Permisos modificados.
- Sesión creada.
- Experiencia repartida.
- Personaje creado.
- Personaje fallecido.
- Personaje delegado.
- Imagen aprobada o denegada.
- Lugar creado.
- Herencia modificada.
- Evento publicado.

Los registros se consultarán desde Moderación.

---

# 27. Libros y documentos

No todas las categorías son libros, pero los componentes que sí lo sean compartirán varias reglas.

## 27.1. Documentos maquetados

Cuando se use un documento ya diseñado, este tendrá prioridad visual.

Debe conservar:

- Imágenes.
- Colores.
- Tipografías.
- Portada.
- Contraportada.
- Composición.
- Fondo de página.

La web añadirá alrededor:

- Animación.
- Índice.
- Buscador.
- Navegación.
- Pantalla completa.
- Comentarios cuando corresponda.
- Moderación.

## 27.2. Libros generados por la web

Podrán utilizar cubiertas configurables:

- Cuero rojo.
- Cuero verde.
- Cuero negro.
- Otros colores.

Cada modelo tendrá pequeños símbolos decorativos en esquinas o bordes.

Los símbolos serán genéricos para reutilizarse.

## 27.3. Navegación

Todo libro largo tendrá:

- Índice.
- Buscador.
- Avanzar.
- Retroceder.
- Ir a una entrada.
- Volver al índice.
- Pantalla completa.

La animación nunca debe obligar al usuario a pasar decenas de páginas manualmente.

---

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

# 29. Sonido

La web no tendrá música.

Podrá usar sonidos sutiles y opcionales:

- Pasar páginas.
- Abrir libros.
- Madera.
- Cartas.
- Botellas.
- Botones concretos.
- Líquido vertiéndose.

No deben repetirse constantemente ni cansar.

El usuario podrá desactivarlos desde Perfil.

---

# 30. Diseño para pantallas

El diseño principal se hará para ordenador.

La experiencia de escritorio tendrá prioridad en:

- Libros grandes.
- Dial tridimensional.
- Salas completas.
- Mapas interactivos.
- Podios.
- Galería.
- Ventanas superpuestas.
- Uso de rueda del ratón.
- Hovers.

La versión móvil deberá conservar todas las funciones, aunque pueda simplificar:

- Animaciones.
- Tamaño de escenas.
- Fondos.
- Distribución de banderines.
- Dial.
- Libros.
- Herramientas de mapa.

No debe depender exclusivamente del hover para comprender o usar una función.

---

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

# 32. Resumen de categorías

| Categoría | Función | Elemento principal |
|---|---|---|
| Observatorio | Seleccionar campaña y consultar regiones principales | Planeta y dial |
| Capilla | Consultar deidades | Libro sobre atril |
| Cartografía | Navegar por mapas y lugares | Mapa interactivo |
| Podios | Consultar personajes | Personaje sobre podio |
| Leyendas | Consultar figuras históricas de Base de Phaingea | Podios y grupos |
| Galería | Consultar y proponer imágenes | Cuadros en exposición |
| Sesiones | Registrar partidas y experiencia | Cuaderno de viaje |
| Eventos | Registrar hechos históricos | Libro de acontecimientos |
| Taller | Consultar reglas, homebrew y tips | Libro, tarjetas y mascota |
| Sala de Pociones | Utilizar herramientas | Caldero y botellas |
| Buzón | Consultar y archivar notificaciones | Cartas y álbum |
| Moderación | Administrar la web y las campañas | Sala de gestión |
| Perfil | Configurar jugador, personaje y preferencias | Ventana personal |
