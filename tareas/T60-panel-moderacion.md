# T60 · Panel de Moderación completo

**Fase:** 4 · **Depende de:** T08, T17

## Objetivo

Consolidar Moderación: gestión completa de campañas, jugadores, roles y permisos; másteres ven solo sus campañas.

## Guía (fragmento literal)

# 25. Categoría Moderación

Moderación tendrá su propio banderín.

Solo será visible para másteres y owner.

Los másteres verán únicamente sus campañas.

El owner verá el conjunto completo.

La categoría incluirá:

- Gestión de campañas.
- Gestión de jugadores.
- Asignación de roles.
- Permisos.
- Solicitudes pendientes.
- Configuración de categorías.
- Herencia de contenido.
- Gestión de grupos.
- Registros importantes.
- Avisos globales.
- Configuración de tips.
- Gestión de notificaciones.
- Acciones generales que no pertenecen a una sala concreta.

## Estado actual relevante

- **Permisos:** helpers por campaña/categoría en `src/lib/permisos.js` (T17). Botón de moderación contextual `src/components/BotonMod.jsx` (T16).
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Modal común:** creado en T12 (`src/components/Modal.jsx` + doble confirmación). Úsalo para ventanas y confirmaciones.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/views/Moderacion.astro` + islas en `src/components/mod/`

## Pasos sugeridos

1. Ampliar T08: eliminar campaña (doble confirmación), reordenar drag o botones, estados.
2. Jugadores por campaña: añadir/quitar, asignar máster (solo owner/admin).
3. Roles globales (`/usuarios/{n}/rol`) — solo owner/admin.
4. Filtrar todo por lo que el usuario puede gestionar (máster → solo sus campañas).

## Criterios de hecho

- [ ] Un máster ve/gestiona solo su campaña; owner todo.
- [ ] Eliminar campaña exige doble confirmación.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
