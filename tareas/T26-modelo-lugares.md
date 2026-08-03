# T26 · Modelo de lugares en RTDB (jerarquía)

**Fase:** 4 · **Depende de:** T07

## Objetivo

Modelo de datos de lugares con jerarquía (lugar superior/contenidos), mapa propio opcional y pines.

## Guía (fragmento literal)

## 10.2. Mapa activo

Al entrar se mostrará el lugar configurado como predeterminado para esa campaña.

No todas las campañas suceden en el planeta completo. El máster podrá decidir que el mapa inicial sea:

- El mapamundi.
- Una región.
- Una ciudad.
- Una isla.
- Cualquier otro lugar registrado.

Si un lugar no tiene mapa aparecerá un mensaje equivalente a:

> Imagen de mapa no disponible.

[...]

## 10.6. Jerarquía de lugares

Cualquier lugar podrá pertenecer a otro lugar.

Ejemplos:

- Un continente contiene regiones.
- Una región contiene ciudades.
- Una ciudad contiene barrios.
- Un pueblo contiene edificios.
- Un edificio puede contener habitaciones.

Cada lugar podrá:

- Tener un lugar superior.
- Contener otros lugares.
- Tener mapa propio o no.
- Aparecer como pin en el mapa de su lugar superior.
- Tener descripción propia.
- Tener imagen o mapa.
- Tener comentarios propios.
- Estar vinculado desde otros contenidos.

Un personaje o lugar puede existir aunque todavía no se haya colocado como pin.

## Estado actual relevante

- **Firebase:** `src/lib/firebase.js` exporta `db` (Realtime Database, proyecto `phaingea`). Config en `src/lib/firebaseConfig.js`. Reglas versionadas en `database.rules.json` (lectura abierta; escritura denegada salvo `/usuarios`). **Al cambiar reglas hay que publicarlas a mano en la consola de Firebase.** Modelo de seguridad "de confianza": el login es puerta de UX, no barrera criptográfica.
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

nuevo `src/lib/db/lugares.js` · `database.rules.json`

## Pasos sugeridos

1. `/lugares/{campanaId}/{lugarId}`: `{nombre, resumen, infoMd, superior(lugarId|null), mapaUrl?, imagenUrl?, pines:{lugarId:{x,y}}, esPredeterminado?}`.
2. Helpers: `listarLugares`, `leerLugar`, `hijosDe`, `lugarPredeterminado(campana)`.
3. Seed de prueba: mapamundi WIP + 2 lugares anidados.
4. Reglas: escritura master/owner de la campaña. Publicar.

## Criterios de hecho

- [x] Árbol de 3 lugares de prueba legible con helpers.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
