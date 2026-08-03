# T63 · Perfil: pestaña de personaje (con privacidad)

**Fase:** 4 · **Depende de:** T03, T32

## Objetivo

Configuración del personaje de la campaña activa: imagen completa + recorte circular, datos, editor de diario y privacidad con máscara.

## Guía (fragmento literal)

## 19.4. Perfil de personaje

Cuando el jugador participa en una campaña podrá configurar:

- Imagen completa.
- Recorte circular para avatar.
- Nombre.
- Edad.
- Raza.
- Sexo.
- Descripción breve.
- Diario.
- Ficha.
- Estado.
- Privacidad.

Al subir una imagen, podrá ajustar el recorte circular como en una foto de perfil. La imagen completa se conservará para Podios y otras vistas ampliadas.

Al pulsar el avatar de un personaje desde un comentario podrá verse su imagen completa y acceder a su información permitida.

## 19.5. Personaje oculto

Un jugador podrá ocultar temporalmente su personaje.

Cuando esté oculto para otros jugadores:

- Sus datos aparecerán cubiertos por barras negras.
- La imagen tendrá una máscara de tachado.
- Solo se verán pequeños fragmentos.
- La máscara será igual para todos los personajes ocultos.

Máster y owner podrán seguir viendo su información completa.

## Estado actual relevante

- **Perfil actual:** `src/components/views/Perfil.astro` + `PerfilContent.jsx` (isla que lee `$user` y muestra nombre/rol; sin campañas ni personaje por defecto). El chip con "Salir" está en `AuthGate.jsx`.
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**
- El modal de perfil es de T03 (`src/components/PerfilModal.jsx`); los personajes de T32 (`src/lib/db/personajes.js`).

## Archivos a tocar

`src/components/PerfilModal.jsx` · `src/lib/db/personajes.js`

## Pasos sugeridos

1. Form: subir imagen completa + ajustar recorte circular (arrastrar/zoom sobre preview); nombre, edad, raza, sexo, descripción breve.
2. Editor del diario (textarea markdown) con la marca `===salto===` explicada.
3. Estado visible (lo cambia el máster; el jugador solo lo ve).
4. Toggle de privacidad: oculto → otros jugadores ven barras negras y la imagen con máscara de tachado igual para todos; máster/owner ven todo (aplicar la máscara en Podios/comentarios).
5. Guardar persiste en `/personajes`. Crear personaje si no existe (respetando 1-activo).

## Criterios de hecho

- [x] Guardar se refleja en Podios al instante.
- [x] Con otra cuenta, el personaje oculto sale enmascarado.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
