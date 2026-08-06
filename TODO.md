# TODO Proveniente del Feedback como Usuario
"Nada" = no hecho;
[-] pendiente test;
[x] hecho

---

Bug: Al entrar en la categoria de Taller, muchas veces no sale el libro, quedando solo la jaula y tips de pantalla, para solucionarlo recargo página, pero siempre que se entra a una campaña desde otra es igual.

Bug: Al abrir un libro en "pantalla completa" se ve más pequeño del que se ve en la página normal, tendria que verse bastante más grande.

Bug: He aprobado la subida de una imagen en galeria, acto seguido el resto de imagenes no se veian hasta que vas a otra categoria y vuelves a entrar a galeria

Pendiente: Los jugadores que participen en una campaña deben ver que estan participando en esa campaña, dejandoles rellenar los datos de su personaje en su perfil, actualmente aunque este configurado como "jugador" para la campaña, el usuario ve como si no participase.

Pendiente/Bug: En las categorias con libro, se pueden borrar páginas individualmente, pero esto parece estar dando un problema al indice, ya que se ha probado borrando una página, y aunque los nombres en el indice se reajustan, clicar para que te lleve a esa página, resulta llevarte una página antes.

Pendiente/Bug: El dial todavia no cumple del todo su funcionamiento, mover hacia un lado u otro del dial da como resultado que alguna campaña siempre quede separada de la cola, todos los circulos tendrían que estar una ranura al lado de la otra, sin ranuras de separación entre ellos, por defecto ordenados de cierta forma que quede cómoda para rápido acceso.

Bug: En los libros, cuando se mueve la portada hacia "pagina 1", el libro se eleva de forma antinatural, quedando el borde más bajo del libro donde antes estaba el centro; ocurre algo similar al pasar desde la primera pagina a la portada, ya que al sostener la portada (desde la página de indice), esta se eleva de forma antinatural; No deberia elevarse nada de esto; Los datos han sido recogidos a partir de la vista en "pantalla completa" de libros, en su vista normal la elevación es menor.

Pendiente: Los usuarios jugadores rellenan los datos de su personaje (esto parece funcional ya), el nombre y foto de perfil que les aparezca arriba a la derecha deberian ser los del personaje cuando esten en una campaña donde tengan personaje. Actualmente parece que aunque pertenezcas a una campaña nada cambia, en perfil sigue poniendo que no perteneces.

Pendiente: Entrar en la categoría moderación, donde existen "pestañas" por campañas, debería seleccionarse por defecto la campaña en la que estés al entrar a la categoria.

Pendiente: El apartado "Gestión de campañas" que ahora mismo se encuentra en la categoria de moderación general, deberia estar en el boton moderación de la categoria observatorio, ya que son colores, descripción y tipografia, cosas que practicamente solo se muestran en observatorio y no se van a modificar tan a menudo ni son "metadatos", la categoria general de moderación deberia mantenerse para cosas que no sean tangibles, como la gestión de usuarios, solicitudes pendientes y herencia de contenido.

Bug: El dial en observatorio tiene un error de espaciado, hay algunas "ranuras" que nunca se ocupan, estas estan justamente a la izquierda de donde se ubica la campaña base. Los "planetas" deberian mantenerse siempre adyacentes los unos con los otros, salvo a izquierda y derecha, es decir los ultimos o primeros en la "cola" ya que no tendrán ningun otro planeta con el que hacer contacto. El comportamiento esta a medias, en la parte derecha los planetas ya se mantienen adyacentes, pero también hay una ranura no utilizada al final de la derecha.

Bug/Pendiente: Los pines visibles en el planeta del observatorio tienen algún fallo cuando se trata de pines creados a partir de la categoria cartografia, los pines WIP que se crearon sobre el planeta funcionan correctamente en cuanto a mantenerse estaticos, sin embargo los pines creados desde cartografia titubean de un lado a otro aunque no se separen demasiado de su posición inicial.

Pendiente: Debe poderse cambiar el logo de una campaña, por lo menos subirlo, esto sería también desde Gestión de Campañas, que se ubicará en la pestaña moderación del observatorio; si una campaña tiene logo, lo representado como "planeta/circulo" en el dial de observatorio deberá ser el logo. La campaña base también puede tener un logo y también puede cambiar.

A Decidir: Estudiar el comportamiento de la base de datos para optimizar el espacio ocupado, tal vez eliminar la foto de perfil anterior de alguien de la base de datos cuando este se cambia la foto de perfil (de personaje) o cosas por el estilo.

Pendiente: Añadir un boton de "atrás" en la categoria cartografia, sobre el mapa o alguna esquina como herramienta, solo aparecerá el botón atrás si el mapa pertenece a alguna categoria, el mapa mundi por ejemplo no tendrá botón atrás, el botón atrás te lleva al lugar en el que se ubica el mapa donde estas, por ejemplo si clicas sobre una región y entras en su mapa, tirar atrás te llevará al mapa mundi, ya que es el que contiene la región; Si hubiera problemas con esto, cambiar la mecanica a que te lleve al mapa donde antes estabas, y añadir otro boton que te lleve al mapa mundi de vuelta también.
