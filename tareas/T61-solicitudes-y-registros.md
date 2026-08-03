# T61 · Solicitudes pendientes + registros importantes

**Fase:** 4 · **Depende de:** T55, T60

## Objetivo

Vista central de solicitudes pendientes y registro de acciones importantes consultable desde Moderación.

## Guía (fragmento literal)

# 26. Registros importantes

No se necesita un historial exhaustivo de cada cambio.

Solo se registrarán acciones importantes.

Ejemplos:

- Campaña creada.
- Campaña finalizada.
- Campaña eliminada.
- Máster asignado.
- Permisos modificados.
- Sesión creada.
- Experiencia repartida.
- Personaje creado.
- Personaje fallecido.
- Personaje delegado.
- Imagen aprobada o denegada.
- Lugar creado.
- Herencia modificada.
- Evento publicado.

Los registros se consultarán desde Moderación.

## Estado actual relevante

- **Firebase:** `src/lib/firebase.js` exporta `db` (Realtime Database, proyecto `phaingea`). Config en `src/lib/firebaseConfig.js`. Reglas versionadas en `database.rules.json` (lectura abierta; escritura denegada salvo `/usuarios`). **Al cambiar reglas hay que publicarlas a mano en la consola de Firebase.** Modelo de seguridad "de confianza": el login es puerta de UX, no barrera criptográfica.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/mod/` · nuevo `src/lib/db/registros.js`

## Pasos sugeridos

1. Solicitudes: agregar pendientes de galería (y futuras) con acceso directo a su sala.
2. `/registros/{campanaId}/{id}`: `{tipo, actor, resumen, fecha}` + helper `registrar()` enganchado a: crear/finalizar/eliminar campaña, asignar máster, crear sesión, repartir XP, personaje creado/fallecido/delegado, imagen aprobada/denegada, lugar creado, herencia modificada, evento publicado.
3. Vista de registros (lista con filtro por campaña).

## Criterios de hecho

- [x] Las acciones clave dejan registro visible en Moderación.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
