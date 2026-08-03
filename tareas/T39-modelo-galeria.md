# T39 · Modelo de imágenes de Galería + almacenamiento

**Fase:** 4 · **Depende de:** T07

## Objetivo

Modelo de datos de la Galería (imágenes, tags, estados de aprobación) y decisión de dónde viven los bytes de imagen.

## Guía (fragmento literal)

## 13.5. Subida de imágenes

En la barra de filtros habrá un control con icono de subida.

Al hacer hover mostrará una indicación clara.

Al pulsarlo se abre una ventana centrada con:

- Área para arrastrar una imagen.
- Opción para abrir el explorador de archivos.
- Campo obligatorio de título.
- Selección obligatoria de al menos un tag.
- Descripción breve opcional.
- Opción para crear tags nuevos.
- Vista previa.
- Botón para enviar a aprobación.

Se podrán crear hasta tres tags nuevos durante una misma subida.

Una vez creados, esos tags quedan disponibles para toda la campaña y podrán usarse sin límite en imágenes posteriores.

## 13.6. Solicitudes pendientes

Un jugador podrá tener un máximo de cinco imágenes pendientes de aprobación al mismo tiempo.

Una solicitud deja de contar cuando el máster:

- La aprueba.
- La deniega.

El jugador podrá consultar desde la propia Galería cuáles de sus imágenes siguen pendientes.

## Estado actual relevante

- **Firebase:** `src/lib/firebase.js` exporta `db` (Realtime Database, proyecto `phaingea`). Config en `src/lib/firebaseConfig.js`. Reglas versionadas en `database.rules.json` (lectura abierta; escritura denegada salvo `/usuarios`). **Al cambiar reglas hay que publicarlas a mano en la consola de Firebase.** Modelo de seguridad "de confianza": el login es puerta de UX, no barrera criptográfica.
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**
- **Decisión de almacenamiento** (tomarla al hacer esta tarea y documentarla): (a) base64 en RTDB redimensionando en cliente a ~1200px/300KB — simple, sin coste, pero engorda la BD; (b) URLs externas (imgur/cloudinary) — BD ligera, dependencia externa; (c) Firebase Storage — requiere plan Blaze. Recomendación inicial: (a) con límite de tamaño.

## Archivos a tocar

nuevo `src/lib/db/galeria.js` · `database.rules.json`

## Pasos sugeridos

1. `/galeria/{campanaId}/imagenes/{id}`: `{titulo, descripcion?, tags:[], autor, fecha, estado(pendiente|aprobada|denegada), imagen(base64|url), proporcion}`.
2. `/galeria/{campanaId}/tags/{tag}: true`.
3. Helpers: listar aprobadas, listar pendientes (por autor y todas), subir, aprobar/denegar, editar, eliminar.
4. Redimensionado/compresión en cliente (canvas) antes de guardar.
5. Reglas del nodo. Publicar.

## Criterios de hecho

- [x] Subir una imagen de prueba vía helper y leerla; tags registrados.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
