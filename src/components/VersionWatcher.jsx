import { useEffect, useState } from 'react';
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
  // Versión nueva detectada que no se ha podido cargar sola (el navegador se
  // empeña en servir lo viejo): se ofrece un botón para forzarlo a mano.
  const [nueva, setNueva] = useState(null);

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
              `sirviendo la ${APP_VERSION} desde su caché.`
          );
          setNueva(version); // se enseña el botón de actualizar a mano
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

  // Etiqueta discreta con la versión que está viendo esta pestaña. Sirve para
  // saber de un vistazo si estás viendo lo último o una copia guardada: basta
  // con comparar el código con el del último despliegue.
  const corta = APP_VERSION === 'dev' ? 'dev' : APP_VERSION.slice(0, 7);

  return (
    <div className="version-pie">
      {nueva ? (
        <button
          className="version-boton"
          onClick={() => {
            sessionStorage.removeItem(CLAVE_INTENTO);
            const destino = new URL(window.location.href);
            destino.searchParams.set('v', nueva);
            window.location.replace(destino.toString());
          }}
          title={`Tu pestaña tiene la ${corta} y ya hay una versión más nueva`}
        >
          Hay una versión nueva · actualizar
        </button>
      ) : (
        <span className="version-eco" title="Versión que está viendo esta pestaña">v {corta}</span>
      )}

      <style>{`
        .version-pie {
          position: fixed; left: .5rem; bottom: .4rem; z-index: 130;
          font-family: ui-monospace, monospace; pointer-events: none;
        }
        .version-eco { font-size: .56rem; letter-spacing: .1em; color: rgba(151,160,171,.5); }
        .version-boton {
          pointer-events: auto; cursor: pointer;
          font-family: ui-monospace, monospace; font-size: .62rem; letter-spacing: .08em;
          background: linear-gradient(180deg, #f2dc94, #c9a45a 55%, #87692f);
          color: #241a12; border: 1px solid #1c120a; border-radius: 999px;
          padding: .3rem .7rem; box-shadow: 0 4px 12px rgba(0,0,0,.5);
        }
        .version-boton:hover { filter: brightness(1.08); }
      `}</style>
    </div>
  );
}
