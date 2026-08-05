# Semillas de datos

Scripts sueltos para meter datos de ejemplo en la base de datos. No forman
parte de la web: se lanzan a mano desde el ordenador cuando hacen falta.

## Campaña de Pruebas

```bash
python semillas/campana_prueba.py
```

Crea (o rehace) la campaña **Campaña de Pruebas** entera, para poder trastear
sin tocar las campañas de verdad:

- La campaña, con tres jugadores y un máster (Jowy).
- **Capilla heredada** de Base de Phaingea y **Cartografía propia**, para ver de
  un vistazo cómo se comporta cada caso.
- Cuatro lugares: la *Isla de Pruebas* con su mapa (`public/mapas/isla-de-pruebas.jpg`)
  y tres lugares hijos anclados con pines.
- Dos pines sobre el planeta del Observatorio.
- Tres personajes con retrato, clase, nivel y diario; uno fallecido, para probar
  los filtros y las Leyendas.
- Tres sesiones con experiencia general y extra (los niveles salen de aquí).
- Cuatro imágenes en la Galería con etiquetas, una pendiente de aprobar.
- Reglas del Taller en markdown y tres tips para la mascota.
- Comentarios de ejemplo en cuatro sitios distintos y tres cartas en el Buzón.

Se puede lanzar las veces que haga falta: reescribe siempre lo mismo.

**Para borrarla del todo**, elimina en la consola de Firebase el nodo
`campanas/campana-de-pruebas` y la rama `campana-de-pruebas` de `lugares`,
`personajes`, `sesiones`, `galeria`, `taller`, `planeta`, `comentarios` y
`notificaciones`.

## imagenes_prueba.py

No se lanza solo: lo usa el script de arriba para generar las imágenes (retratos,
cuadros y el mapa). Son imágenes planas con el texto «IMAGEN DE PRUEBA» encima,
para que nunca se confundan con material de verdad. Si lo ejecutas directamente,
solo regenera el mapa de la isla.
