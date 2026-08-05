import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaign } from '../stores/campaign.js';
import { $user } from '../stores/user.js';
import { suscribirNotificaciones } from '../lib/db/notificaciones.js';

// Acceso rápido al Buzón (guía §18.1): un sobre a la izquierda del perfil con
// el número de cartas pendientes de la campaña activa (1, 2, 3… y "9+" si hay
// más de nueve). Si no hay pendientes, el icono no aparece. Al pulsarlo abre
// el Buzón con el sobre ya abierto.
//
// Se pinta DENTRO de la chapa del perfil (AuthGate), no suelto por la pantalla:
// así nunca la pisa, se ponga el nombre que se ponga el jugador.
export default function AvisoBuzon() {
  const campana = useStore($campaign);
  const user = useStore($user);
  const [pendientes, setPendientes] = useState(0);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  useEffect(() => {
    if (!campana?.id || !user?.nombre) {
      setPendientes(0);
      return;
    }
    return suscribirNotificaciones(campana.id, user.nombre, (lista) =>
      setPendientes(lista.filter((n) => n.estado === 'pendiente').length)
    );
  }, [campana?.id, user?.nombre]);

  if (!montado || pendientes === 0) return null;

  return (
    <button
      className="aviso-buzon"
      onClick={() => {
        document.querySelector('.bm[data-view="buzon"]')?.click();
        window.dispatchEvent(new CustomEvent('phaingea:abrir-buzon'));
      }}
      title={`${pendientes} carta${pendientes === 1 ? '' : 's'} pendiente${pendientes === 1 ? '' : 's'}`}
      aria-label={`Buzón: ${pendientes} pendientes`}
    >
      <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
        <path d="M3 6h18v12H3z" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      <span className="n">{pendientes > 9 ? '9+' : pendientes}</span>

      <style>{`
        .aviso-buzon {
          display: inline-flex; align-items: center; gap: .3rem; flex: none;
          background: rgba(201,164,90,.12); border: 1px solid rgba(201,164,90,.4);
          border-radius: 999px; padding: .18rem .4rem; cursor: pointer; color: var(--gold);
        }
        .aviso-buzon:hover { background: rgba(201,164,90,.28); }
        .aviso-buzon .n {
          font-family: ui-monospace, monospace; font-size: .66rem; font-weight: 700;
          background: var(--gold); color: #241a12; border-radius: 999px; padding: 0 .32rem;
        }
      `}</style>
    </button>
  );
}
