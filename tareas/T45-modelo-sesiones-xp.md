# T45 · Modelo de sesiones + recálculo de XP

**Fase:** 4 · **Depende de:** T15, T32

## Objetivo

Modelo de sesiones con experiencia general y extra por personaje; al cambiar una sesión se recalculan XP y niveles.

## Guía (fragmento literal)

## 14.1. Libro de sesiones

Cada sesión ocupará una entrada o conjunto de páginas.

Mostrará:

- Número de sesión.
- Título.
- Subtítulo opcional.
- Experiencia general.
- Experiencia extra.
- Personajes que reciben experiencia adicional.
- Descripción opcional de lo ocurrido.

El título por defecto será:

> Sesión [número siguiente]

El máster podrá cambiarlo.

[...]

## 14.3. Creación y edición

El máster podrá crear y modificar sesiones.

Al cambiar la experiencia de una sesión:

- Se recalcula la experiencia de los personajes afectados.
- Se actualiza su nivel cuando corresponda.
- Se actualizan sus barras de progreso.

## Estado actual relevante

- **Firebase:** `src/lib/firebase.js` exporta `db` (Realtime Database, proyecto `phaingea`). Config en `src/lib/firebaseConfig.js`. Reglas versionadas en `database.rules.json` (lectura abierta; escritura denegada salvo `/usuarios`). **Al cambiar reglas hay que publicarlas a mano en la consola de Firebase.** Modelo de seguridad "de confianza": el login es puerta de UX, no barrera criptográfica.
- **Sistema XP:** creado en T15 (`src/lib/xp.js` con tablas Pathfinder 1e + `BarraXP.jsx` de dos colores).
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

nuevo `src/lib/db/sesiones.js` · `src/lib/db/personajes.js` (xpTotal) · `database.rules.json`

## Pasos sugeridos

1. `/sesiones/{campanaId}/{id}`: `{num, titulo, subtitulo?, xpGeneral, xpExtra:{personajeId:cantidad}, descripcion?, fecha}`.
2. `xpTotal(personaje)` = Σ sesiones (general si participa + su extra) + Σ `xpManual`. El nivel y las barras se derivan SIEMPRE de este cálculo (no se guarda nivel en BD → nunca se desincroniza).
3. Helpers CRUD; reglas master/owner. Publicar.

## Criterios de hecho

- [x] Editar el XP de una sesión cambia el nivel calculado del personaje afectado.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
