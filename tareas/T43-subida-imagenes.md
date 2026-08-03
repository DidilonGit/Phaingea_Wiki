# T43 · Subida de imágenes con aprobación y límite de pendientes

**Fase:** 4 · **Depende de:** T12, T39, T40

## Objetivo

El flujo de proponer imágenes: ventana de subida completa, máximo 5 pendientes por jugador, y consulta de pendientes propias.

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

- **Modal común:** creado en T12 (`src/components/Modal.jsx` + doble confirmación). Úsalo para ventanas y confirmaciones.
- **Cuentas/sesión:** login propio en `src/lib/auth.js` (sha256hex, login/registrar contra `/usuarios` en RTDB; la pass se guarda hasheada). Sesión y rol en `src/stores/user.js` (nanostore `$user` + localStorage `phaingea_session`; helpers `esOwner`/`esMasterOOwner`; el rol `admin` equivale a `owner`). UI de login: `src/components/AuthGate.jsx` (overlay + chip de usuario arriba a la derecha).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/GaleriaView.jsx` · `src/lib/db/galeria.js`

## Pasos sugeridos

1. Icono de subida en la barra de filtros (hover claro). Modal (T12): drag&drop + explorador, vista previa, título obligatorio, ≥1 tag obligatorio, descripción opcional.
2. Crear hasta 3 tags nuevos en una misma subida (quedan disponibles para la campaña).
3. Enviar → estado `pendiente`. Bloquear si ya hay 5 pendientes del jugador (mensaje claro).
4. Sección/indicador "Mis pendientes" dentro de la Galería.

## Criterios de hecho

- [x] Los límites (título, ≥1 tag, ≤3 tags nuevos, ≤5 pendientes) se aplican.
- [x] La pendiente no aparece en la exposición pública.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
