import { useEffect } from 'react';
import { APP_VERSION } from '../lib/version.js';
import { getPref, aplicarPrefs } from '../lib/prefs.js';
import '../lib/sonidos.js'; // registra window.__phaingeaSonar

// ============================================================================
// AUTO-RECARGA AL DESPLEGAR (versión = SHA del commit).
//
// Compara la versión cargada en esta pestaña con la de /version.json (que se
// genera en cada despliegue). Si no coinciden, se trae la nueva.
//
// POR QUÉ NO BASTA CON location.reload()
//   GitHub Pages manda el HTML con caché de varios minutos, y algunos
//   navegadores (Opera, sobre todo) lo guardan con muchas ganas: un reload
//   normal —incluso con Ctrl+Shift+R— podía devolver el MISMO html viejo, que
//   apunta a los mismos ficheros viejos. Resultado: la pestaña se recargaba
//   una y otra vez sin cambiar nada.
//   Por eso aquí se recarga a una URL DISTINTA (…?v=<sha>): al cambiar la
//   dirección, el navegador no puede reutilizar la copia guardada y baja el
//   html nuevo, que ya apunta a los ficheros nuevos (llevan su hash).
//   Además se vacía la Cache Storage y se quita cualquier service worker que
//   hubiera quedado de pruebas anteriores.
//
// En local (APP_VERSION === 'dev') no hace nada, para no molestar mientras se
// trabaja. Se puede desactivar en Perfil → Ajustes (preferencia autoRecarga).
// ============================================================================

const CLAVE_INTENTO = 'phaingea_recarga_intento';

export default function VersionWatcher() {
  useEffect(() => {
    aplicarPrefs(); // preferencias visuales al cargar (p. ej. contraste)
    if (APP_VERSION === 'dev') return;

    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const url = `${base}/version.json`;
    let recargando = false;

    /** Deja la pestaña con la última versión, saltándose la caché del html. */
    async function traerNueva(version) {
      recargando = true;

      // 1) fuera cachés de la aplicación y service workers de pruebas viejas
      try {
        if (window.caches?.keys) {
          const nombres = await caches.keys();
          await Promise.all(nombres.map((n) => caches.delete(n)));
        }
        const sws = await navigator.serviceWorker?.getRegistrations?.();
        if (sws) await Promise.all(sws.map((r) => r.unregister()));
      } catch (_) {
        /* si el navegador no deja, seguimos: lo importante es el paso 2 */
      }

      // 2) recargar a una dirección distinta para que no sirva la copia vieja
      const destino = new URL(window.location.href);
      destino.searchParams.set('v', version);
      window.location.replace(destino.toString());
    }

    async function comprobar() {
      if (recargando) return;
      try {
        const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) return;
        const { version } = await res.json();
        if (!version || version === APP_VERSION) {
          sessionStorage.removeItem(CLAVE_INTENTO); // todo en orden
          return;
        }
        if (getPref('autoRecarga') === false) return; // el usuario lo apagó

        // Red de seguridad contra bucles: si tras recargar seguimos viendo la
        // versión vieja (un proxy muy cabezota, por ejemplo), no insistimos más
        // de dos veces; el aviso de abajo queda en la consola.
        const intentos = Number(sessionStorage.getItem(CLAVE_INTENTO) || 0);
        if (intentos >= 2) {
          console.warn(
            `[Phaingea] Hay una versión nueva (${version}) pero el navegador sigue ` +
              `sirviendo la ${APP_VERSION} desde su caché. Prueba a abrir la web en ` +
              'una ventana privada o a vaciar la caché.'
          );
          return;
        }
        sessionStorage.setItem(CLAVE_INTENTO, String(intentos + 1));
        traerNueva(version);
      } catch (_) {
        /* sin red: se reintenta en el siguiente ciclo */
      }
    }

    const id = setInterval(comprobar, 60000); // cada minuto
    const alVolver = () => {
      if (!document.hidden) comprobar();
    };
    document.addEventListener('visibilitychange', alVolver);
    window.addEventListener('focus', comprobar);
    comprobar(); // comprobación inicial

    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', alVolver);
      window.removeEventListener('focus', comprobar);
    };
  }, []);

  return null;
}
