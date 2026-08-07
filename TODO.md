# TODO Proveniente del Feedback como Usuario
"Nada" = no hecho;
[-] pendiente test;
[x] hecho

---

[-] Bug: Al entrar en la categoria de Taller, muchas veces no sale el libro, quedando solo la jaula y tips de pantalla, para solucionarlo recargo página, pero siempre que se entra a una campaña desde otra es igual.
> El libro se monta cuando su hueco ya mide; si ese momento fallaba, nadie lo reintentaba y se quedaba como una pila de hojas sueltas. Ahora hay red de seguridad: reintenta el montaje cada medio segundo (hasta 20 veces) mientras no lo consiga, y un fallo al cargar el paquete ya no bloquea el reintento. Probado entrando seguidas en Capilla, Taller y Sesiones: los tres libros montan.

[-] Bug: Al abrir un libro en "pantalla completa" se ve más pequeño del que se ve en la página normal, tendria que verse bastante más grande.
> Lo frenaban tres cosas a la vez: el max-height del libro, los topes internos del componente y que el ancho lo marcaba el contenedor en vez de la ventana. Ahora en pantalla completa manda el alto y ocupa el 84% de la ventana. Medido en 1280x720: de 356x461 pasa a 467x605.
> Probado: Corregido, pero al hacerse el libro pantalla completa, la parte superior de todas las páginas es ligeramente recortado, como si no se centrase el libro desde el centro de la pagina sino hacia top pero recortandose.

[-] Bug: He aprobado la subida de una imagen en galeria, acto seguido el resto de imagenes no se veian hasta que vas a otra categoria y vuelves a entrar a galeria
> Estabas en la vista de "Pendientes" y, al aprobar la última, esa lista se quedaba vacía: parecía que se habían borrado todas. Ahora, al vaciarse los pendientes, se vuelve solo a la galería. Probado: 3 imágenes al entrar, 1 pendiente, y al aprobarla salen las 4 sin moverse de la categoría.

[0] Pendiente: Los jugadores que participen en una campaña deben ver que estan participando en esa campaña, dejandoles rellenar los datos de su personaje en su perfil, actualmente aunque este configurado como "jugador" para la campaña, el usuario ve como si no participase.

[-] Pendiente/Bug: En las categorias con libro, se pueden borrar páginas individualmente, pero esto parece estar dando un problema al indice, ya que se ha probado borrando una página, y aunque los nombres en el indice se reajustan, clicar para que te lleve a esa página, resulta llevarte una página antes.
> Dos cosas: (1) los saltos del índice usaban la animación de pasar página, que en saltos largos se queda a medias — pedir la última página te dejaba por la mitad del libro; ahora van directos. (2) A doble página el contador solo enseñaba la hoja de la izquierda, así que al saltar a una página que cae a la derecha parecía que te llevaba una antes; ahora enseña las dos hojas abiertas (4–5 / 13). Probado saltando a la primera, a Cazmia, a Homom, a Youth y a la última: todas caen en su hoja.
> AVISO: al probar esto se me quedó borrada una página del documento de dioses (la Tabla de contenidos) y otra del de Rol de Rol 2. Las dos están restauradas; los documentos vuelven a tener sus 14 páginas.

[x] Pendiente/Bug: El dial todavia no cumple del todo su funcionamiento, mover hacia un lado u otro del dial da como resultado que alguna campaña siempre quede separada de la cola, todos los circulos tendrían que estar una ranura al lado de la otra, sin ranuras de separación entre ellos, por defecto ordenados de cierta forma que quede cómoda para rápido acceso.

[x] Bug: El dial en observatorio tiene un error de espaciado, hay algunas "ranuras" que nunca se ocupan, estas estan justamente a la izquierda de donde se ubica la campaña base. Los "planetas" deberian mantenerse siempre adyacentes los unos con los otros, salvo a izquierda y derecha, es decir los ultimos o primeros en la "cola" ya que no tendrán ningun otro planeta con el que hacer contacto. El comportamiento esta a medias, en la parte derecha los planetas ya se mantienen adyacentes, pero también hay una ranura no utilizada al final de la derecha.
> Los dos de arriba eran lo mismo. Ahora las campañas se reparten a los dos lados de Base y quedan siempre pegadas, la primera de cada lado tocando con Base. Con ocho: -88 -66 -44 -22 [Base] 22 44 66 88, todas a la misma distancia y sin ranuras muertas. Además el dial ya gira aunque quepan todas (antes solo se movía si sobraban campañas, y por eso parecía roto).

[X] Bug: En los libros, cuando se mueve la portada hacia "pagina 1", el libro se eleva de forma antinatural, quedando el borde más bajo del libro donde antes estaba el centro; ocurre algo similar al pasar desde la primera pagina a la portada, ya que al sostener la portada (desde la página de indice), esta se eleva de forma antinatural; No deberia elevarse nada de esto; Los datos han sido recogidos a partir de la vista en "pantalla completa" de libros, en su vista normal la elevación es menor.
> El libro reservaba el hueco de UNA hoja aunque estuviera abierto a dos, así que al pasar de la portada al interior cambiaba de tamaño y saltaba. Ahora reserva el hueco del libro entero. De paso, en pantalla completa el libro a doble página se veía a la mitad de tamaño del que le tocaba: ahora mide 1026x664 en una ventana de 1409x790 (antes 513x332). Queda un balanceo de unos pocos píxeles que es la propia animación de la tapa dura; decidme si sigue molestando.
> Probado: Funciona correctamente, ya esta corregido.

[-] Pendiente: Los usuarios jugadores rellenan los datos de su personaje (esto parece funcional ya), el nombre y foto de perfil que les aparezca arriba a la derecha deberian ser los del personaje cuando esten en una campaña donde tengan personaje.
> Hecho: en una campaña donde tienes personaje, la chapa de arriba a la derecha enseña la FOTO y el NOMBRE del personaje, con tu nombre de jugador debajo en pequeño. Fuera de esas campañas vuelve a enseñarte a ti. Probado con Bruna en Campaña de Pruebas y sin personaje en Base.

[0] Pendiente: ...y en perfil sigue poniendo que no perteneces.
> Esto no lo he podido reproducir: el aviso "No participas" sale cuando tu usuario no está en la lista de jugadores de esa campaña. Ahora mismo en la base: Base de Phaingea no tiene jugadores, Mil años tampoco, Rol de Rol 2 tiene a CRIS, Joel y Leo, y Campaña de Pruebas a Didac, Jowy y Leo. Decidme con qué usuario y en qué campaña os pasa y lo miro.

[-] Pendiente: Entrar en la categoría moderación, donde existen "pestañas" por campañas, debería seleccionarse por defecto la campaña en la que estés al entrar a la categoria.
> Comprobado con "Campaña de Pruebas" activa: al entrar en Moderación la pestaña marcada es esa y el panel dice "Jugadores y másteres · Campaña de Pruebas". Si os sigue fallando, decidme con qué campaña y con qué usuario.

[-] Pendiente: El apartado "Gestión de campañas" que ahora mismo se encuentra en la categoria de moderación general, deberia estar en el boton moderación de la categoria observatorio, ya que son colores, descripción y tipografia, cosas que practicamente solo se muestran en observatorio y no se van a modificar tan a menudo ni son "metadatos", la categoria general de moderación deberia mantenerse para cosas que no sean tangibles, como la gestión de usuarios, solicitudes pendientes y herencia de contenido.
> Movido. El Observatorio tiene ya su botón "Moderar categoría", en el mismo sitio que en las demás salas, y dentro está la gestión de campañas. En Moderación quedan usuarios y roles, borrado de cuentas, solicitudes, registros y herencia.

[-] Bug/Pendiente: Los pines visibles en el planeta del observatorio tienen algún fallo cuando se trata de pines creados a partir de la categoria cartografia, los pines WIP que se crearon sobre el planeta funcionan correctamente en cuanto a mantenerse estaticos, sin embargo los pines creados desde cartografia titubean de un lado a otro aunque no se separen demasiado de su posición inicial.
> Seguían al globo con un temporizador de 120 ms mientras el globo se dibuja cuadro a cuadro: de ahí los tirones. Ahora se mueven en el mismo cuadro que el globo. De paso, la ficha del pin se abre pegada al pin (antes colgaba bajo el globo, encima de la nota de campaña).

[-] Pendiente: Debe poderse cambiar el logo de una campaña, por lo menos subirlo, esto sería también desde Gestión de Campañas, que se ubicará en la pestaña moderación del observatorio; si una campaña tiene logo, lo representado como "planeta/circulo" en el dial de observatorio deberá ser el logo. La campaña base también puede tener un logo y también puede cambiar.
> En Gestión de campañas (Observatorio): "Subir logo" / "Cambiar logo" / "Quitar logo", con vista previa. Vale para todas, Base incluida. Con logo, la bola del dial enseña el logo en vez de las dos letras; también sale en la nota de campaña y en el medallón del atril.

[-] A Decidir: Estudiar el comportamiento de la base de datos para optimizar el espacio ocupado, tal vez eliminar la foto de perfil anterior de alguien de la base de datos cuando este se cambia la foto de perfil (de personaje) o cosas por el estilo.
> Medido hoy, la base entera ocupa **1,08 MB**: galería 414 KB, personajes 283 KB, lugares 395 KB (el mapa de la V Era), y todo lo demás junto no llega a 15 KB. El plan gratuito da 1 GB, así que vamos al 0,1 %.
> Sobre borrar la foto anterior: no hace falta. Cuando alguien cambia la foto de su personaje, la nueva SUSTITUYE a la vieja en el mismo sitio, no se acumulan. Lo mismo con el logo de campaña y el mapa de un lugar.
> Lo único que crece sin parar es la GALERÍA, porque ahí sí se guardan todas. Las imágenes ya se comprimen antes de subir (máx. 1200 px y ~180 KB cada una), así que caben unas 5.000 antes de acercarnos al límite. Mi recomendación: no tocar nada por ahora, y si algún día aprieta, mover solo la galería a un hosting de imágenes. Decidme si preferís que lo prepare ya.

[X] Pendiente: Añadir un boton de "atrás" en la categoria cartografia, sobre el mapa o alguna esquina como herramienta, solo aparecerá el botón atrás si el mapa pertenece a alguna categoria, el mapa mundi por ejemplo no tendrá botón atrás, el botón atrás te lleva al lugar en el que se ubica el mapa donde estas, por ejemplo si clicas sobre una región y entras en su mapa, tirar atrás te llevará al mapa mundi, ya que es el que contiene la región; Si hubiera problemas con esto, cambiar la mecanica a que te lleve al mapa donde antes estabas, y añadir otro boton que te lleve al mapa mundi de vuelta también.
> Hecho tal cual: arriba a la izquierda del mapa sale «‹ Nombre del lugar que lo contiene», y solo si hay a dónde volver (en el mapamundi no aparece). Probado entrando en Bosque Beta y volviendo a Isla de Pruebas.
> Probado: Funciona, completado.

Bug: El atril en capilla queda incompleto, la parte alta del componente es donde estaría colocado el libro, en el componente original la parte alta del atril es más grande a propósito para colocar bajo el libro.

Bug: Tanto los pines redondos dorados en las puntas superiores del atril como el boton de moderar categoria de la categoria capilla se sobreponen a la vista de pantalla completa del libro, saliendo por encima del libro cuando esa vista esta activa, los pines deberian ser material del background y el boton moderación no deberia aparecer.

Bug: En varia páginas los botones quedan ligeramente ocultados por otros componentes, por ejemplo en capilla estan medio ocultados por el libro los botones bajo él, en obervatorio esta tapando una parte del planeta (mover a la derecha para que no tenga tanto protagonismo), 


---

## De los diseños pasados por Didilon

[-] Atril de mármol para la Capilla: puesto bajo el libro de deidades, con el medallón de latón enseñando el logo de la campaña (si no tiene logo, su inicial).
[-] Buzón medieval interactivo: portado. Buzón de madera con su poste y la ranura por la que asoma el sobre; el sobre sube al pasar el ratón, sale del todo al abrir el buzón y su solapa se abate dejando ver el interior. Chispas doradas al abrir y al archivar (se saltan si el sistema pide menos animación). La carta ampliada lleva el medallón con el logo de la campaña, el remitente y el botón «Archivar ⟶».
> Lo que ya teníamos y sigue igual: contador de cartas, abanico, carta que gira y se amplía, y álbum de archivadas. Probado: 6 chispas al abrir que se limpian solas, medallón y remitente correctos en la carta.

## Otras cosas arregladas por el camino

[-] El mapa de Cartografía desaparecía de golpe al arrastrarlo: se leía el estado del arrastre cuando ya había terminado y eso tumbaba la sala entera.
[-] El mapa ya no se puede sacar del marco, y los pines caen sobre el punto correcto del dibujo (antes el mapa sobresalía del hueco y todo iba desplazado).
[-] Pulsar un pin del mapa entra en ese lugar y abre su información; antes no respondía porque el marco capturaba el puntero y el clic acababa yendo al marco.
[-] Los pines del mapa son marrón oscuro, enseñan el nombre al pasar por encima y no crecen al acercar el zoom.
[-] Entrar en un lugar sin mapa propio ya no deja el marco en blanco: se enseña el mapa del lugar que lo contiene con su pin marcado.
[-] El botón "Moderar categoría" sale en TODAS las campañas y categorías, siempre en el mismo sitio; si la categoría se hereda, el panel lo explica y deja cortar la herencia.
[-] La X de las ventanas de moderación funciona sin tener que bajar la página (la ranura de moderación se pintaba por encima y se comía el clic).
[-] Panel de páginas: miniaturas grandes, botones visibles para mover y borrar cada página, y se pueden arrastrar para reordenar.
[-] El índice del libro usa el título de cada página en vez de "Página 2, 3, 4…", y se puede decir si el documento trae portada y contraportada propias.
[-] Al recargar con la sesión iniciada ya no se ve pasar la ventana de login.
[-] Podios: botón "Subir ficha" con formulario (foto arriba, nombre, clase, nivel y texto libre).
[-] Moderación: borrar cuentas, con confirmación.
[-] El sobre del Buzón ya no pisa la chapa del perfil.
[-] Cada campaña tiene sus propios pines de planeta, aunque herede la cartografía; se colocan sobre un planisferio que dibuja las tierras del propio globo.
[-] Campaña de Pruebas con datos de ejemplo para trastear (se regenera con `python semillas/campana_prueba.py`).
