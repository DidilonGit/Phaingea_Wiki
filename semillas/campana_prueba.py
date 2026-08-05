# Siembra la CAMPAÑA DE PRUEBAS: una campaña completa para toquetear sin miedo.
# Todo lo que crea lleva imágenes generadas al vuelo (se ve que son de test) y
# textos que dicen claramente para qué sirve cada cosa.
#
# Se puede volver a lanzar cuando se quiera: reescribe lo mismo.
# Para borrarla entera: DELETE de /campanas/campana-de-pruebas y de los nodos
# /lugares /personajes /sesiones /galeria /taller /planeta /comentarios
# /notificaciones/campana-de-pruebas.
import json, os, sys, time, urllib.request
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from imagenes_prueba import tarjeta, data_url

B = 'https://phaingea-default-rtdb.europe-west1.firebasedatabase.app'
CAMP = 'campana-de-pruebas'
AHORA = int(time.time() * 1000)
DIA = 86400000


def envia(metodo, ruta, datos=None):
    d = json.dumps(datos, ensure_ascii=False).encode('utf-8') if datos is not None else None
    r = urllib.request.Request(f'{B}/{ruta}.json', data=d,
                               headers={'Content-Type': 'application/json'}, method=metodo)
    with urllib.request.urlopen(r) as resp:
        return resp.status


# ---------------------------------------------------------------- campaña
campana = {
    'nombre': 'Campaña de Pruebas',
    'esBase': False,
    'logoUrl': '',
    'planeta': {'colorA': '#3ba58c', 'colorB': '#123c3a'},
    'fuenteTitulo': 'Georgia, serif',
    'colorTexto': '#dff3ec',
    'colorContorno': '#3ba58c',
    'descripcion': ('Campo de pruebas: trastea todo lo que quieras. Los personajes, las sesiones, '
                    'las imágenes y los lugares de aquí son inventados y se pueden romper sin '
                    'consecuencias.\n\nLa Capilla HEREDA de Base de Phaingea (para ver cómo se '
                    'comporta una categoría heredada) y la Cartografía es propia, con su mapa.'),
    'estado': 'activa',
    'jugadores': {'Jowy': True, 'Didac': True, 'Leo': True},
    'masters': {'Jowy': True},
    'progresionXP': 'rapida',
    'orden': 3,
    'categorias': {
        'capilla': {'heredaDe': 'base-phaingea'},   # heredada a propósito
        'cartografia': {'heredaDe': ''},            # propia, con mapa de prueba
    },
    'creada': AHORA,
}
print('campana', envia('PUT', f'campanas/{CAMP}', campana))

# ---------------------------------------------------------------- lugares
MAPA = '/Phaingea_Wiki/mapas/isla-de-pruebas.jpg'
lugares = {
    'isla-de-pruebas': {
        'nombre': 'Isla de Pruebas',
        'resumen': 'La isla donde se prueba todo. Sus tres lugares cuelgan de este mapa.',
        'infoMd': ('# Isla de Pruebas\n\nEsto es **texto de ejemplo** para ver cómo se lee la '
                   'información de un lugar.\n\n- Se escribe en markdown\n- Admite listas\n- Y '
                   '_cursivas_\n\n> Las citas salen así.'),
        'superior': '', 'mapaUrl': MAPA, 'imagenUrl': '',
        'pines': {
            'puerto-test': {'x': 31.5, 'y': 46.0},
            'bosque-beta': {'x': 24.0, 'y': 33.0},
            'ruinas-alfa': {'x': 72.0, 'y': 59.0},
        },
        'esPredeterminado': True, 'destacado': False,
    },
    'puerto-test': {
        'nombre': 'Puerto Test',
        'resumen': 'Muelles de madera y un faro que no ilumina nada. Punto de partida.',
        'infoMd': 'Puerto de ejemplo. Prueba aquí los comentarios de lugar.',
        'superior': 'isla-de-pruebas', 'mapaUrl': '', 'imagenUrl': '',
        'pines': {}, 'esPredeterminado': False, 'destacado': False,
    },
    'bosque-beta': {
        'nombre': 'Bosque Beta',
        'resumen': 'Árboles de relleno. Sirve para comprobar que se entra en un lugar sin mapa propio.',
        'infoMd': 'Al entrar aquí se ve el mapa de la isla con este pin resaltado.',
        'superior': 'isla-de-pruebas', 'mapaUrl': '', 'imagenUrl': '',
        'pines': {}, 'esPredeterminado': False, 'destacado': False,
    },
    'ruinas-alfa': {
        'nombre': 'Ruinas Alfa',
        'resumen': 'Cuatro piedras puestas ahí para probar la lupa y el compás.',
        'infoMd': 'Prueba la **lupa** sobre este mapa, y el **compás** para dibujar encima.',
        'superior': 'isla-de-pruebas', 'mapaUrl': '', 'imagenUrl': '',
        'pines': {}, 'esPredeterminado': False, 'destacado': False,
    },
}
for lid, l in lugares.items():
    envia('PUT', f'lugares/{CAMP}/{lid}', l)
print('lugares', len(lugares))

# pines sobre el planeta de ESTA campaña (§8.4)
for lid, coord in {'isla-de-pruebas': {'lat': 8.0, 'lon': -25.0},
                   'puerto-test': {'lat': -18.0, 'lon': 40.0}}.items():
    envia('PUT', f'planeta/{CAMP}/{lid}', coord)
print('pines de planeta 2')

# ---------------------------------------------------------------- personajes
PERS = [
    ('bruna', 'Bruna Filo de Prueba', 'Jowy', 'Guerrera', 4, 'activo', ['Los Betas'],
     'Enana testaruda con un hacha desafilada. Sirve para probar la ficha, el diario y la barra de experiencia.',
     (58, 92, 74), (18, 34, 30)),
    ('nimo', 'Nimo Cuadrante', 'Didac', 'Mago', 3, 'activo', ['Los Betas'],
     'Mago de gabinete, más interesado en los índices que en los conjuros. Prueba aquí los comentarios de personaje.',
     (60, 70, 120), (20, 24, 48)),
    ('vera', 'Vera la Descartada', 'Leo', 'Pícara', 2, 'fallecido', ['Los Betas', 'Caídos'],
     'Personaje fallecido a propósito, para ver el filtro por estado y las Leyendas.',
     (120, 62, 62), (44, 20, 20)),
]
diario = ('# Primera entrada\n\nEsto es un diario de ejemplo. Se escribe en markdown y se reparte '
          'en páginas.\n\n===salto===\n\n# Segunda entrada\n\nLa marca `===salto===` fuerza una '
          'página nueva. La barra de experiencia sale en la primera.')
for pid, nombre, dueno, clase, nivel, estado, grupos, desc, c1, c2 in PERS:
    envia('PUT', f'personajes/{CAMP}/{pid}', {
        'propietario': dueno, 'nombre': nombre, 'clase': clase, 'nivel': nivel,
        'edad': '—', 'raza': 'De prueba', 'sexo': '—', 'descripcion': desc,
        'imagenUrl': data_url(tarjeta(560, 800, nombre.split()[0], clase, c1, c2, semilla=nivel)),
        'recorte': {'x': 50, 'y': 50, 'zoom': 1},
        'diarioMd': diario if estado == 'activo' else '',
        'estado': estado, 'grupos': grupos, 'oculto': False, 'xpManual': [],
        'creado': AHORA,
    })
print('personajes', len(PERS))

# ---------------------------------------------------------------- sesiones
SES = [
    (1, 'Sesión 1 · El puerto', 'Todos llegan a Puerto Test y se pelean con un cangrejo.', 1200,
     {'bruna': 300}),
    (2, 'Sesión 2 · Bosque Beta', 'Se pierden entre árboles de relleno.', 1800, {'nimo': 200}),
    (3, 'Sesión 3 · Ruinas Alfa', 'Cuatro piedras y una trampa. Vera no vuelve.', 2500, {}),
]
for num, titulo, desc, xp, extra in SES:
    envia('PUT', f'sesiones/{CAMP}/sesion-{num}', {
        'num': num, 'titulo': titulo, 'subtitulo': 'Sesión de ejemplo',
        'descripcion': desc, 'xpGeneral': xp, 'xpExtra': extra,
        'fecha': AHORA - (4 - num) * 7 * DIA,
    })
print('sesiones', len(SES))

# ---------------------------------------------------------------- galería
IMGS = [
    ('El grupo al completo', ['grupal', 'personaje'], 'aprobada', 'Jowy', (52, 88, 96), (16, 30, 38)),
    ('Puerto Test al amanecer', ['paisaje', 'lugar'], 'aprobada', 'Didac', (150, 110, 60), (48, 32, 18)),
    ('El cangrejo jefe', ['villano'], 'aprobada', 'Leo', (110, 60, 90), (36, 18, 32)),
    ('Boceto pendiente', ['objeto'], 'pendiente', 'Leo', (80, 80, 80), (26, 26, 26)),
]
for i, (titulo, tags, estado, autor, c1, c2) in enumerate(IMGS):
    im = tarjeta(760, 520, 'TEST ' + str(i + 1), titulo, c1, c2, semilla=i)
    envia('PUT', f'galeria/{CAMP}/imagenes/img-{i + 1}', {
        'titulo': titulo,
        'descripcion': 'Imagen generada para probar la galería: filtros, ampliación y aprobación.',
        'tags': tags, 'autor': autor, 'fecha': AHORA - i * DIA, 'estado': estado,
        'imagen': data_url(im), 'ratio': round(760 / 520, 3),
    })
for t in {t for _, tags, _, _, _, _ in IMGS for t in tags}:
    envia('PUT', f'galeria/{CAMP}/tags/{t}', True)
print('galeria', len(IMGS))

# ---------------------------------------------------------------- taller
envia('PATCH', f'taller/{CAMP}', {
    'titulo': 'Reglas de la Campaña de Pruebas',
    'subtitulo': 'Todo esto es de mentira',
    'reglasMd': ('# Reglas de la casa\n\nEste libro está escrito en **markdown** para probar el '
                 'otro modo del componente (el de Rol de Rol 2 usa páginas de documento).\n\n'
                 '- Las tiradas se hacen con d20\n- Los críticos se confirman\n- Nadie se queda sin turno\n\n'
                 '===salto===\n\n# Segunda página\n\nLa marca `===salto===` corta la página.\n\n'
                 '> Y así se ve una cita dentro del libro.'),
})
for i, texto in enumerate([
    'Puedes editar estos tips desde el propio Taller si eres máster.',
    'La mascota de la jaula suelta uno de estos tips al azar.',
    'Este es un tip de ejemplo, bórralo cuando quieras.',
]):
    envia('PUT', f'taller/{CAMP}/tips/tip-{i + 1}', {'texto': texto, 'orden': i})
print('taller ok')

# ---------------------------------------------------------------- comentarios
COM = [
    ('capilla', 'general', 'Didac', 'Nimo Cuadrante', 'Comentario de ejemplo en la Capilla.'),
    ('cartografia', 'puerto-test', 'Leo', 'Vera la Descartada', '¿Alguien ha visto mi barco?'),
    ('podios', 'bruna', 'Jowy', 'Bruna Filo de Prueba', 'Comentario de ejemplo sobre un personaje.'),
    ('sesiones', 'sesion-1', 'Didac', 'Nimo Cuadrante', 'El cangrejo era más duro de lo que parecía.'),
]
for i, (tipo, ref, autor, pers, texto) in enumerate(COM):
    envia('PUT', f'comentarios/{CAMP}/{tipo}/{ref}/com-{i + 1}', {
        'autor': autor, 'personaje': pers, 'texto': texto,
        'fecha': AHORA - i * 3600000, 'estado': 'publicado',
        'reacciones': {'🎲': {'Jowy': True}} if i == 0 else {},
    })
print('comentarios', len(COM))

# ---------------------------------------------------------------- buzón
for i, (asunto, tipo, contenido) in enumerate([
    ('Bienvenido a la campaña de pruebas', 'campana',
     'Esta carta es de ejemplo: ábrela, gírala y archívala para ver el álbum.'),
    ('Sesión publicada', 'sesion', 'Se ha publicado la Sesión 3 · Ruinas Alfa.'),
    ('Imagen pendiente', 'galeria', 'Hay una imagen esperando aprobación en la Galería.'),
]):
    for usuario in ('Jowy', 'Didac', 'Leo'):
        envia('PUT', f'notificaciones/{CAMP}/{usuario}/nota-{i + 1}', {
            'asunto': asunto, 'tipo': tipo, 'contenido': contenido,
            'fecha': AHORA - i * DIA, 'estado': 'pendiente',
        })
print('buzon ok')

print('\nCampaña de Pruebas lista.')
