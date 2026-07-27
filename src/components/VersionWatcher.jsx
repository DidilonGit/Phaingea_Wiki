import { useEffect } from 'react';
import { APP_VERSION } from '../lib/version.js';

// Auto-recarga: si la versión desplegada (/version.json) no coincide con la
// versión cargada en esta pestaña, recarga para traer la última.
// En local (APP_VERSION === 'dev') no hace nada, para no molestar durante el desarrollo.
export default function VersionWatcher() {
  useEffect(() => {
    if (APP_VERSION === 'dev') return;

    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const url = `${base}/version.json`;
    let reloading = false;

    async function check() {
      if (reloading) return;
      try {
        const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) return;
        const { version } = await res.json();
        if (version && version !== APP_VERSION) {
          reloading = true;
          window.location.reload();
        }
      } catch {
        /* sin red / offline: se reintenta en el siguiente ciclo */
      }
    }

    const id = setInterval(check, 60000); // cada minuto
    const onVisible = () => {
      if (!document.hidden) check();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', check);
    check(); // comprobación inicial

    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', check);
    };
  }, []);

  return null;
}
