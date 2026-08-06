# TODO Proveniente del Feedback como Usuario
"Nada" = no hecho;
[-] pendiente test;
[x] hecho

---

[-] Bug: Al entrar en la categoria de Taller, muchas veces no sale el libro, quedando solo la jaula y tips de pantalla, para solucionarlo recargo página, pero siempre que se entra a una campaña desde otra es igual.
> El libro se monta cuando su hueco ya mide; si ese momento fallaba, nadie lo reintentaba y se quedaba como una pila de hojas sueltas. Ahora hay red de seguridad: reintenta el montaje cada medio segundo (hasta 20 veces) mientras no lo consiga, y un fallo al cargar el paquete ya no bloquea el reintento. Probado entrando seguidas en Capilla, Taller y Sesiones: los tres libros montan.

[-] Bug: Al abrir un libro en "pantalla completa" se ve más pequeño del que se ve en la página normal, tendria que verse bastante más grande.
> Lo frenaban tres cosas a la vez: el max-height del libro, los topes internos del componente y que el ancho lo marcaba el contenedor en vez de la ventana. Ahora en pantalla completa manda el alto y ocupa el 84% de la ventana. Medido en 1280x720: de 356x461 pasa a 467x605.

[0] Bug: He aprobado la subida de una imagen en galeria, acto seguido el resto de imagenes no se veian hasta que vas a otra categoria y vuelves a entrar a galeria

[0] Pendiente: Los jugadores que participen en una campaña deben ver que estan participando en esa campaña, dejandoles rellenar los datos de su personaje en su perfil, actualmente aunque este configurado como "jugador" para la campaña, el usuario ve como si no participase.

[0] Pendiente/Bug: En las categorias con libro, se pueden borrar páginas individualmente, pero esto parece estar dando un problema al indice, ya que se ha probado borrando una página, y aunque los nombres en el indice se reajustan, clicar para que te lleve a esa página, resulta llevarte una página antes.
> Queda el desfase del índice. De paso: al borrar páginas saltaba un fallo que tumbaba el libro entero (React intentaba quitar hojas que el componente de paso de página ya se había llevado a su propio DOM); eso ya está arreglado.

[x] Pendiente/Bug: El dial todavia no cumple del todo su funcionamiento, mover hacia un lado u otro del dial da como resultado que alguna campaña siempre quede separada de la cola, todos los circulos tendrían que estar una ranura al lado de la otra, sin ranuras de separación entre ellos, por defecto ordenados de cierta forma que quede cómoda para rápido acceso.

[x] Bug: El dial en observatorio tiene un error de espaciado, hay algunas "ranuras" que nunca se ocupan, estas estan justamente a la izquierda de donde se ubica la campaña base. Los "planetas" deberian mantenerse siempre adyacentes los unos con los otros, salvo a izquierda y derecha, es decir los ultimos o primeros en la "cola" ya que no tendrán ningun otro planeta con el que hacer contacto. El comportamiento esta a medias, en la parte derecha los planetas ya se mantienen adyacentes, pero también hay una ranura no utilizada al final de la derecha.
> Los dos de arriba eran lo mismo. Ahora las campañas se reparten a los dos lados de Base y quedan siempre pegadas, la primera de cada lado tocando con Base. Con ocho: -88 -66 -44 -22 [Base] 22 44 66 88, todas a la misma distancia y sin ranuras muertas. Además el dial ya gira aunque quepan todas (antes solo se movía si sobraban campañas, y por eso parecía roto).

[0] Bug: En los libros, cuando se mueve la portada hacia "pagina 1", el libro se eleva de forma antinatural, quedando el borde más bajo del libro donde antes estaba el centro; ocurre algo similar al pasar desde la primera pagina a la portada, ya que al sostener la portada (desde la página de indice), esta se eleva de forma antinatural; No deberia elevarse nada de esto; Los datos han sido recogidos a partir de la vista en "pantalla completa" de libros, en su vista normal la elevación es menor.

[0] Pendiente: Los usuarios jugadores rellenan los datos de su personaje (esto parece funcional ya), el nombre y foto de perfil que les aparezca arriba a la derecha deberian ser los del personaje cuando esten en una campaña donde tengan personaje. Actualmente parece que aunque pertenezcas a una campaña nada cambia, en perfil sigue poniendo que no perteneces.

[-] Pendiente: Entrar en la categoría moderación, donde existen "pestañas" por campañas, debería seleccionarse por defecto la campaña en la que estés al entrar a la categoria.
> Comprobado con "Campaña de Pruebas" activa: al entrar en Moderación la pestaña marcada es esa y el panel dice "Jugadores y másteres · Campaña de Pruebas". Si os sigue fallando, decidme con qué campaña y con qué usuario.

[-] Pendiente: El apartado "Gestión de campañas" que ahora mismo se encuentra en la categoria de moderación general, deberia estar en el boton moderación de la categoria observatorio, ya que son colores, descripción y tipografia, cosas que practicamente solo se muestran en observatorio y no se van a modificar tan a menudo ni son "metadatos", la categoria general de moderación deberia mantenerse para cosas que no sean tangibles, como la gestión de usuarios, solicitudes pendientes y herencia de contenido.
> Movido. El Observatorio tiene ya su botón "Moderar categoría", en el mismo sitio que en las demás salas, y dentro está la gestión de campañas. En Moderación quedan usuarios y roles, borrado de cuentas, solicitudes, registros y herencia.

[-] Bug/Pendiente: Los pines visibles en el planeta del observatorio tienen algún fallo cuando se trata de pines creados a partir de la categoria cartografia, los pines WIP que se crearon sobre el planeta funcionan correctamente en cuanto a mantenerse estaticos, sin embargo los pines creados desde cartografia titubean de un lado a otro aunque no se separen demasiado de su posición inicial.
> Seguían al globo con un temporizador de 120 ms mientras el globo se dibuja cuadro a cuadro: de ahí los tirones. Ahora se mueven en el mismo cuadro que el globo. De paso, la ficha del pin se abre pegada al pin (antes colgaba bajo el globo, encima de la nota de campaña).

[-] Pendiente: Debe poderse cambiar el logo de una campaña, por lo menos subirlo, esto sería también desde Gestión de Campañas, que se ubicará en la pestaña moderación del observatorio; si una campaña tiene logo, lo representado como "planeta/circulo" en el dial de observatorio deberá ser el logo. La campaña base también puede tener un logo y también puede cambiar.
> En Gestión de campañas (Observatorio): "Subir logo" / "Cambiar logo" / "Quitar logo", con vista previa. Vale para todas, Base incluida. Con logo, la bola del dial enseña el logo en vez de las dos letras; también sale en la nota de campaña y en el medallón del atril.

[0] A Decidir: Estudiar el comportamiento de la base de datos para optimizar el espacio ocupado, tal vez eliminar la foto de perfil anterior de alguien de la base de datos cuando este se cambia la foto de perfil (de personaje) o cosas por el estilo.

[0] Pendiente: Añadir un boton de "atrás" en la categoria cartografia, sobre el mapa o alguna esquina como herramienta, solo aparecerá el botón atrás si el mapa pertenece a alguna categoria, el mapa mundi por ejemplo no tendrá botón atrás, el botón atrás te lleva al lugar en el que se ubica el mapa donde estas, por ejemplo si clicas sobre una región y entras en su mapa, tirar atrás te llevará al mapa mundi, ya que es el que contiene la región; Si hubiera problemas con esto, cambiar la mecanica a que te lleve al mapa donde antes estabas, y añadir otro boton que te lleve al mapa mundi de vuelta también.

---

## De los diseños pasados por Didilon

[-] Atril de mármol para la Capilla: puesto bajo el libro de deidades, con el medallón de latón enseñando el logo de la campaña (si no tiene logo, su inicial).
[0] Buzón medieval interactivo: pendiente de portar (el prototipo usa plantillas propias y hay que pasarlo a componente de la web).

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
