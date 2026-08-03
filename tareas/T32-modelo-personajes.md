# T32 · Modelo de personajes en RTDB

**Fase:** 4 · **Depende de:** T07, T15

## Objetivo

Modelo de datos de personajes por campaña con propietario, estados, grupos, imagen+recorte, diario y XP; máximo 1 activo por jugador y campaña.

## Guía (fragmento literal)

# 20. Usuarios, personajes y participación

Un usuario puede existir sin participar en ninguna campaña.

Puede tener acceso a una campaña únicamente como visitante, sin personaje.

Un mismo jugador puede participar en varias campañas.

Tendrá un personaje distinto en cada una.

Los personajes:

- Solo existen dentro de una campaña.
- No se crean como entidades independientes.
- Tienen un único propietario.
- Se conservan aunque dejen de estar activos.

Cada jugador tendrá un máximo de un personaje activo por campaña.

Para crear otro, el anterior debe estar marcado como:

- Fallecido.
- Delegado.

Un personaje delegado no ha muerto, pero ha dejado de ser controlado por el jugador y pasa a tratarse como personaje no jugador.

No se deben sobrescribir personajes antiguos, ya que forman parte del archivo de recuerdos.

## Estado actual relevante

- **Firebase:** `src/lib/firebase.js` exporta `db` (Realtime Database, proyecto `phaingea`). Config en `src/lib/firebaseConfig.js`. Reglas versionadas en `database.rules.json` (lectura abierta; escritura denegada salvo `/usuarios`). **Al cambiar reglas hay que publicarlas a mano en la consola de Firebase.** Modelo de seguridad "de confianza": el login es puerta de UX, no barrera criptográfica.
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Cuentas/sesión:** login propio en `src/lib/auth.js` (sha256hex, login/registrar contra `/usuarios` en RTDB; la pass se guarda hasheada). Sesión y rol en `src/stores/user.js` (nanostore `$user` + localStorage `phaingea_session`; helpers `esOwner`/`esMasterOOwner`; el rol `admin` equivale a `owner`). UI de login: `src/components/AuthGate.jsx` (overlay + chip de usuario arriba a la derecha).
- **Sistema XP:** creado en T15 (`src/lib/xp.js` con tablas Pathfinder 1e + `BarraXP.jsx` de dos colores).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

nuevo `src/lib/db/personajes.js` · `database.rules.json`

## Pasos sugeridos

1. `/personajes/{campanaId}/{personajeId}`: `{propietario, nombre, edad, raza, sexo, descripcion, imagenUrl, recorte:{x,y,zoom}, diarioMd, estado(activo|fallecido|delegado), grupos:[], xpManual:[{cantidad,motivo,fecha}], oculto:bool}`.
2. Helper `crearPersonaje` que valida que el jugador no tenga otro activo en esa campaña (y regla RTDB de forma).
3. `xpTotal(personaje, sesiones)` = suma de sesiones (T45) + manual — dejar la parte de sesiones enlazada como TODO si T45 no está.
4. Seed de 2-3 personajes WIP. Reglas: escribe propietario (sus campos) y master/owner (todo). Publicar.

## Criterios de hecho

- [x] Personajes de prueba en RTDB; restricción 1-activo funciona.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
