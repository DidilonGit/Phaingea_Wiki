// Reparto de un DOCUMENTO MAQUETADO en las hojas del Libro (guía §27.1).
//
// El máster sube las páginas como imágenes y decide, desde "Moderar categoría":
//   · portadaPropia        -> la PRIMERA página es la portada del libro
//                             (por defecto sí; si no, se usa la tapa de cuero)
//   · contraportadaPropia  -> la ÚLTIMA página es la contraportada
//                             (por defecto no)
// Lo que no sea tapa queda como página normal, con el título que el máster le
// haya puesto en `paginasTitulos` (y si no tiene, "Página N").
//
// Devuelve { portadaUrl, contraportadaUrl, paginas: [{ i, url, titulo }] }
// donde `i` es la posición original dentro del documento.

export function repartirDocumento(urls = [], datos = {}) {
  const nombres = Array.isArray(datos?.paginasTitulos) ? datos.paginasTitulos : [];
  const vacio = { portadaUrl: null, contraportadaUrl: null, paginas: [] };
  if (!Array.isArray(urls) || urls.length === 0) return vacio;

  const conPortada = datos?.portadaPropia !== false; // por defecto, sí
  const conContra = !!datos?.contraportadaPropia && urls.length > (conPortada ? 1 : 0);

  const desde = conPortada ? 1 : 0;
  const hasta = conContra ? urls.length - 1 : urls.length;

  return {
    portadaUrl: conPortada ? urls[0] : null,
    contraportadaUrl: conContra ? urls[urls.length - 1] : null,
    paginas: urls.slice(desde, hasta).map((url, k) => {
      const i = desde + k;
      return { i, url, titulo: nombres[i] || `Página ${i + 1}` };
    }),
  };
}
