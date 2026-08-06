import BotonMod from '../BotonMod.jsx';
import ModCampanas from './ModCampanas.jsx';

// ============================================================================
// MODERACIÓN DEL OBSERVATORIO (guía §24, §25).
//
// Aquí se gestionan las CAMPAÑAS: nombre, descripción, estado, progresión de
// experiencia, colores del planeta, color y letra del título, y el logo. Vive
// en el Observatorio porque es justo la sala donde se ve todo eso (el dial, la
// nota de campaña); la sala de Moderación queda para lo que no se ve: usuarios,
// roles, solicitudes, registros y herencia.
//
// El botón sale en la ranura `.room-mod` del Observatorio, igual que en el
// resto de categorías, y solo lo ve quien puede gestionar (lo comprueba
// ModCampanas por dentro: si no eres owner, te lo dice).
// ============================================================================

export default function ModObservatorio() {
  return (
    <BotonMod sala visible titulo="Gestión de campañas" etiqueta="Moderar categoría">
      <ModCampanas />
    </BotonMod>
  );
}
