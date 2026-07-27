import { useEffect, useState } from 'react';

// Isla de verificación (Fase 0): confirma que Firebase inicializa sin errores.
// Se sustituirá por la lógica real de login en la Fase 1.
export default function FirebaseStatus() {
  const [status, setStatus] = useState('comprobando…');
  const [ok, setOk] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { app, db } = await import('../lib/firebase.js');
        const projectId = app?.options?.projectId ?? '¿?';
        // que db exista implica que la Realtime Database quedó ligada
        if (!db) throw new Error('db no inicializada');
        if (!cancelled) {
          setOk(true);
          setStatus(`Firebase conectado · proyecto "${projectId}"`);
        }
      } catch (e) {
        if (!cancelled) {
          setOk(false);
          setStatus('Error inicializando Firebase: ' + e.message);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 0.8rem',
        borderRadius: '999px',
        fontSize: '0.9rem',
        background: 'rgba(0,0,0,0.35)',
        border: `1px solid ${ok === null ? '#888' : ok ? '#5fae6f' : '#c9564f'}`,
        color: ok === null ? '#ccc' : ok ? '#a7e0a0' : '#f0a29c',
      }}
    >
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: '50%',
          background: ok === null ? '#888' : ok ? '#5fae6f' : '#c9564f',
        }}
      />
      {status}
    </span>
  );
}
