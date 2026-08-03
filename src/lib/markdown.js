// Markdown mínimo para los libros de la web (Taller §16.2 y diarios §11.7).
// Sin dependencias: solo lo que hace falta para reglas y lore.
//
// Admite: # ## ### encabezados · **negrita** · *cursiva* · `código` ·
//         listas con - o 1. · > cita · --- separador · [texto](enlace) ·
//         párrafos separados por línea en blanco.
//
// Marca de SALTO DE PÁGINA (guía §11.7): una línea con  ===salto===
export const MARCA_SALTO = '===salto===';

function escapar(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function enLinea(texto) {
  return escapar(texto)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    // Solo enlaces http(s) para no colar javascript: (guía: contenido de usuario)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

/** Markdown -> HTML. */
export function aHtml(md) {
  const lineas = String(md || '').replace(/\r\n/g, '\n').split('\n');
  const salida = [];
  let lista = null; // 'ul' | 'ol' | null
  let parrafo = [];

  const cerrarParrafo = () => {
    if (parrafo.length) {
      salida.push('<p>' + enLinea(parrafo.join(' ')) + '</p>');
      parrafo = [];
    }
  };
  const cerrarLista = () => {
    if (lista) {
      salida.push(`</${lista}>`);
      lista = null;
    }
  };

  for (const cruda of lineas) {
    const l = cruda.trim();

    if (!l) {
      cerrarParrafo();
      cerrarLista();
      continue;
    }
    if (l === MARCA_SALTO) continue; // el salto lo gestiona paginar()

    const enc = /^(#{1,4})\s+(.*)$/.exec(l);
    if (enc) {
      cerrarParrafo();
      cerrarLista();
      const n = enc[1].length + 2; // # -> h3 (h1/h2 los usa la interfaz)
      salida.push(`<h${n}>${enLinea(enc[2])}</h${n}>`);
      continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(l)) {
      cerrarParrafo();
      cerrarLista();
      salida.push('<hr />');
      continue;
    }
    if (/^>\s?/.test(l)) {
      cerrarParrafo();
      cerrarLista();
      salida.push('<blockquote>' + enLinea(l.replace(/^>\s?/, '')) + '</blockquote>');
      continue;
    }
    const li = /^[-*]\s+(.*)$/.exec(l);
    const liNum = /^\d+[.)]\s+(.*)$/.exec(l);
    if (li || liNum) {
      cerrarParrafo();
      const tipo = li ? 'ul' : 'ol';
      if (lista !== tipo) {
        cerrarLista();
        salida.push(`<${tipo}>`);
        lista = tipo;
      }
      salida.push('<li>' + enLinea((li || liNum)[1]) + '</li>');
      continue;
    }
    cerrarLista();
    parrafo.push(l);
  }
  cerrarParrafo();
  cerrarLista();
  return salida.join('\n');
}

/**
 * Reparte un markdown en páginas de libro.
 *  · Si tiene marcas ===salto===, manda la marca.
 *  · Si no, corta por encabezados de primer nivel; y si un trozo se pasa de
 *    largo, lo parte por párrafos.
 * `maxPaginas` recorta el sobrante (el diario tiene tope de 8, guía §11.7).
 */
export function paginar(md, { maxCaracteres = 1400, maxPaginas = Infinity } = {}) {
  const texto = String(md || '').replace(/\r\n/g, '\n').trim();
  if (!texto) return [];

  let trozos;
  if (texto.includes(MARCA_SALTO)) {
    trozos = texto.split(MARCA_SALTO).map((t) => t.trim()).filter(Boolean);
  } else {
    // cortar por encabezado de primer nivel manteniéndolo con su contenido
    const partes = texto.split(/\n(?=#\s)/).map((t) => t.trim()).filter(Boolean);
    trozos = [];
    for (const p of partes) {
      if (p.length <= maxCaracteres) {
        trozos.push(p);
        continue;
      }
      let actual = '';
      for (const par of p.split(/\n{2,}/)) {
        if (actual && (actual + '\n\n' + par).length > maxCaracteres) {
          trozos.push(actual);
          actual = par;
        } else {
          actual = actual ? actual + '\n\n' + par : par;
        }
      }
      if (actual) trozos.push(actual);
    }
  }

  const paginas = trozos.map(aHtml);
  return paginas.length > maxPaginas ? paginas.slice(0, maxPaginas) : paginas;
}

/** Título de una página (su primer encabezado) para el índice del libro. */
export function tituloDePagina(html, indice) {
  const m = /<h[1-6]>(.*?)<\/h[1-6]>/i.exec(html || '');
  if (m) return m[1].replace(/<[^>]+>/g, '').slice(0, 40);
  return `Página ${indice + 1}`;
}
