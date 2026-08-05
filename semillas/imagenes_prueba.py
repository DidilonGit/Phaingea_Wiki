# Genera las imagenes de la campana de pruebas: se ve a la legua que son de
# test (colores planos, retícula y el texto encima), pesan poco y no dependen
# de nada externo.
import io, math, base64, random
from PIL import Image, ImageDraw, ImageFont

def fuente(px):
    for n in ('georgiab.ttf', 'seguisb.ttf', 'arialbd.ttf'):
        try:
            return ImageFont.truetype('C:/Windows/Fonts/' + n, px)
        except Exception:
            pass
    return ImageFont.load_default()

def centrar(dr, texto, f, ancho, y, color):
    a = dr.textbbox((0, 0), texto, font=f)
    dr.text(((ancho - (a[2] - a[0])) / 2, y), texto, font=f, fill=color)

def data_url(im, calidad=72):
    b = io.BytesIO()
    im.convert('RGB').save(b, 'JPEG', quality=calidad, optimize=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()

def tarjeta(ancho, alto, titulo, sub, c1, c2, semilla=0):
    """Fondo en degradado + retícula + texto. Sirve para retratos y cuadros."""
    im = Image.new('RGB', (ancho, alto))
    dr = ImageDraw.Draw(im)
    for y in range(alto):
        t = y / max(1, alto - 1)
        dr.line([(0, y), (ancho, y)], fill=tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3)))
    rng = random.Random(semilla)
    for _ in range(90):  # motas, para que no sea un plano liso
        x, y = rng.randrange(ancho), rng.randrange(alto)
        r = rng.randrange(2, 7)
        dr.ellipse([x, y, x + r, y + r], fill=(255, 255, 255, 30))
    paso = max(40, ancho // 10)
    for x in range(0, ancho, paso):
        dr.line([(x, 0), (x, alto)], fill=(255, 255, 255), width=1)
    for y in range(0, alto, paso):
        dr.line([(0, y), (ancho, y)], fill=(255, 255, 255), width=1)
    dr.rectangle([6, 6, ancho - 7, alto - 7], outline=(255, 255, 255), width=3)
    centrar(dr, titulo, fuente(int(ancho * 0.11)), ancho, int(alto * 0.40), (255, 255, 255))
    centrar(dr, sub, fuente(int(ancho * 0.055)), ancho, int(alto * 0.53), (235, 235, 235))
    centrar(dr, 'IMAGEN DE PRUEBA', fuente(int(ancho * 0.04)), ancho, alto - int(alto * 0.10), (255, 255, 255))
    return im

def mapa_prueba(ancho=1500, alto=950):
    """Mapa inventado: mar, dos islas y una retícula de coordenadas."""
    im = Image.new('RGB', (ancho, alto), (219, 199, 154))
    dr = ImageDraw.Draw(im)
    rng = random.Random(7)
    for _ in range(2600):  # grano de pergamino
        x, y = rng.randrange(ancho), rng.randrange(alto)
        dr.point((x, y), fill=(206, 184, 138))
    def isla(cx, cy, r, semilla, nombre):
        rg = random.Random(semilla)
        pts = []
        for i in range(72):
            a = i / 72 * 2 * math.pi
            rr = r * (0.72 + 0.28 * rg.random())
            pts.append((cx + math.cos(a) * rr * 1.35, cy + math.sin(a) * rr))
        dr.polygon(pts, fill=(228, 213, 175), outline=(90, 66, 38))
        dr.line(pts + [pts[0]], fill=(90, 66, 38), width=3)
        f = fuente(30)
        a = dr.textbbox((0, 0), nombre, font=f)
        dr.text((cx - (a[2] - a[0]) / 2, cy - 16), nombre, font=f, fill=(74, 52, 28))
    isla(470, 430, 250, 3, 'ISLA DE PRUEBAS')
    isla(1080, 560, 175, 11, 'CAYO BETA')
    for x in range(0, ancho, 150):
        dr.line([(x, 0), (x, alto)], fill=(180, 158, 116))
    for y in range(0, alto, 150):
        dr.line([(0, y), (ancho, y)], fill=(180, 158, 116))
    dr.rectangle([0, 0, ancho - 1, alto - 1], outline=(120, 92, 55), width=8)
    dr.text((30, 24), 'MAPA DE PRUEBA · no es lore', font=fuente(34), fill=(110, 80, 45))
    return im

if __name__ == '__main__':
    import os
    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    salida = os.path.join(raiz, 'public', 'mapas', 'isla-de-pruebas.jpg')
    mapa_prueba().save(salida, 'JPEG', quality=82, optimize=True)
    print('mapa ->', salida)
