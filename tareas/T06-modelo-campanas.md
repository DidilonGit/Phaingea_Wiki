# T06 · Modelo /campanas en RTDB + seed Base de Phaingea + reglas

**Fase:** 1 · **Depende de:** nada

## Objetivo

Crear el modelo de datos de campañas, sembrar Base de Phaingea y publicar las reglas del nodo.

## Guía (fragmento literal)

## 5. Campañas

Cada campaña representa una época, situación o versión distinta del mundo de Phaingea.

Cada campaña tendrá:

- Nombre.
- Planeta o aspecto visual propio.
- Logo en imagen.
- Fuente propia para su título.
- Color de texto.
- Color de contorno.
- Descripción de uno o varios párrafos.
- Regiones y lugares propios.
- Estado.
- Jugadores participantes.
- Máster o másteres.
- Progresión de experiencia.
- Orden dentro del selector de campañas.
- Configuración independiente de sus categorías.

El orden inicial de las campañas será el de creación, aunque el owner podrá reorganizarlo.

### 5.1. Estados de campaña

Una campaña podrá marcarse como:

- Activa.
- Finalizada.
- Archivada.
- Privada.

Su estado aparecerá mediante un pequeño indicador sobre el planeta o icono de campaña, parecido a una insignia de notificación. Debe ser visible sin tapar el diseño del planeta.

[...]

## 6. Base de Phaingea

La campaña principal se llamará **Base de Phaingea**.

No representa una partida concreta. Reúne el lore general, canónico y más permanente del mundo.

Debe diferenciarse visualmente de las demás campañas mediante un contorno especial y una posición fija en el selector.

En Base de Phaingea:

- **Podios** se sustituye por **Leyendas**.
- **Sesiones** se sustituye por **Eventos**.

Base de Phaingea permanecerá fija en la parte superior central del selector de campañas. Las demás campañas se moverán alrededor sin ocultarla.

Su contenido será principalmente estable y servirá como referencia para el resto de campañas.

## Estado actual relevante

- **Firebase:** `src/lib/firebase.js` exporta `db` (Realtime Database, proyecto `phaingea`). Config en `src/lib/firebaseConfig.js`. Reglas versionadas en `database.rules.json` (lectura abierta; escritura denegada salvo `/usuarios`). **Al cambiar reglas hay que publicarlas a mano en la consola de Firebase.** Modelo de seguridad "de confianza": el login es puerta de UX, no barrera criptográfica.
- **Cuentas/sesión:** login propio en `src/lib/auth.js` (sha256hex, login/registrar contra `/usuarios` en RTDB; la pass se guarda hasheada). Sesión y rol en `src/stores/user.js` (nanostore `$user` + localStorage `phaingea_session`; helpers `esOwner`/`esMasterOOwner`; el rol `admin` equivale a `owner`). UI de login: `src/components/AuthGate.jsx` (overlay + chip de usuario arriba a la derecha).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

nuevo `src/lib/db/campanas.js` · `database.rules.json`

## Pasos sugeridos

1. Definir `/campanas/{id}`: `{ nombre, esBase, logoUrl, planeta:{colores...}, fuenteTitulo, colorTexto, colorContorno, descripcion, estado(activa|finalizada|archivada|privada), jugadores:{nombre:true}, masters:{nombre:true}, progresionXP(rapida|media|lenta), orden, categorias:{capilla:{heredaDe}, cartografia:{heredaDe}} }`.
2. Sembrar `base-phaingea` (esBase:true, orden:0) vía REST o consola.
3. Helpers en `campanas.js`: `listarCampanas()`, `leerCampana(id)`, `guardarCampana(id, datos)`.
4. Reglas: `/campanas` lectura abierta; escritura solo si el usuario es owner/admin (modelo de confianza: no hay auth real, así que valida forma y documenta la limitación). Publicar reglas en la consola.

## Criterios de hecho

- [x] `/campanas/base-phaingea` existe en RTDB.
- [x] Los helpers leen/escriben.
- [x] Reglas publicadas sin romper el login.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
