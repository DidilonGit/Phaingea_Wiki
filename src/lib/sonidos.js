// Sonidos discretos y opcionales (guía §29).
//
// La web NO tiene música. Solo efectos sutiles y poco frecuentes: pasar
// páginas, abrir libros, madera, cartas, botellas y algunos botones. El
// usuario los desactiva desde Perfil → Ajustes (prefs.sonidos).
//
// Se sintetizan con Web Audio (sin archivos que descargar) para que suenen
// secos y cortos, como los de una biblioteca: nada de melodías.
//
//   sonar('pagina')   ·  sonar('libro')   ·  sonar('carta')
//   sonar('botella')  ·  sonar('madera')  ·  sonar('archivar')
import { getPref } from './prefs.js';

let ctx = null;

function contexto() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

/** Ruido filtrado: sirve para papel, madera y tela. */
function ruido(ac, { duracion = 0.14, tipo = 'bandpass', frecuencia = 1200, q = 1.2, volumen = 0.05 }) {
  const muestras = Math.floor(ac.sampleRate * duracion);
  const buffer = ac.createBuffer(1, muestras, ac.sampleRate);
  const datos = buffer.getChannelData(0);
  for (let i = 0; i < muestras; i++) {
    // ruido blanco con caída exponencial
    datos[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / muestras, 2.2);
  }
  const fuente = ac.createBufferSource();
  fuente.buffer = buffer;
  const filtro = ac.createBiquadFilter();
  filtro.type = tipo;
  filtro.frequency.value = frecuencia;
  filtro.Q.value = q;
  const g = ac.createGain();
  g.gain.value = volumen;
  fuente.connect(filtro).connect(g).connect(ac.destination);
  fuente.start();
  fuente.stop(ac.currentTime + duracion);
}

/** Tono corto: sirve para el corcho y los botones. */
function tono(ac, { frecuencia = 320, duracion = 0.09, tipo = 'sine', volumen = 0.05, hasta = null }) {
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = tipo;
  osc.frequency.setValueAtTime(frecuencia, ac.currentTime);
  if (hasta) osc.frequency.exponentialRampToValueAtTime(hasta, ac.currentTime + duracion);
  g.gain.setValueAtTime(volumen, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duracion);
  osc.connect(g).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + duracion);
}

const EFECTOS = {
  // papel deslizándose
  pagina: (ac) => ruido(ac, { duracion: 0.16, frecuencia: 2400, q: 0.8, volumen: 0.045 }),
  // tapa de cuero que se abre
  libro: (ac) => {
    ruido(ac, { duracion: 0.22, frecuencia: 700, q: 0.7, volumen: 0.05 });
    tono(ac, { frecuencia: 150, hasta: 90, duracion: 0.16, tipo: 'triangle', volumen: 0.035 });
  },
  // carta de papel grueso
  carta: (ac) => ruido(ac, { duracion: 0.13, frecuencia: 1800, q: 1, volumen: 0.04 }),
  // corcho de botella
  botella: (ac) => tono(ac, { frecuencia: 420, hasta: 180, duracion: 0.1, tipo: 'sine', volumen: 0.06 }),
  // golpe seco de madera
  madera: (ac) => {
    tono(ac, { frecuencia: 240, hasta: 120, duracion: 0.07, tipo: 'triangle', volumen: 0.05 });
    ruido(ac, { duracion: 0.06, frecuencia: 900, q: 1.6, volumen: 0.03 });
  },
  // carta que vuela al álbum
  archivar: (ac) => {
    ruido(ac, { duracion: 0.2, frecuencia: 2600, q: 0.7, volumen: 0.04 });
    tono(ac, { frecuencia: 600, hasta: 1200, duracion: 0.18, tipo: 'sine', volumen: 0.025 });
  },
};

/** Reproduce un efecto si el usuario tiene los sonidos activados. */
export function sonar(nombre) {
  try {
    if (getPref('sonidos') === false) return;
    const ac = contexto();
    if (!ac) return;
    const efecto = EFECTOS[nombre];
    if (efecto) efecto(ac);
  } catch (_) {
    /* si el navegador no deja sonar, no pasa nada */
  }
}

export const EFECTOS_DISPONIBLES = Object.keys(EFECTOS);

// Los scripts que no son React (el conmutador de salas) lo usan desde aquí.
if (typeof window !== 'undefined') window.__phaingeaSonar = sonar;
