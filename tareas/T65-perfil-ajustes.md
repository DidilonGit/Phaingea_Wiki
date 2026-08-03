# T65 · Perfil: pestaña de ajustes + Guardar

**Fase:** 4 · **Depende de:** T03

## Objetivo

Preferencias personales (sonido, visuales) con el botón Guardar del modal funcionando para todo el perfil.

## Guía (fragmento literal)

## 19.2. Secciones

El Perfil tendrá varias páginas o pestañas internas:

1. Personaje de la campaña activa.
2. Perfil general del jugador.
3. Ajustes personales de la web.

Cuando se cambia de campaña, la pestaña de personaje cambia al personaje correspondiente.

## 19.3. Perfil general del jugador

Incluye:

- Nombre visible.
- Inicial.
- Color de fondo para el avatar.
- Campañas accesibles.
- Campañas en las que participa.
- Ajustes personales.
- Preferencias de sonido.
- Preferencias visuales disponibles.

La imagen de perfil general será una inicial sobre un fondo de color escogido por el usuario.

## Estado actual relevante

- **Perfil actual:** `src/components/views/Perfil.astro` + `PerfilContent.jsx` (isla que lee `$user` y muestra nombre/rol; sin campañas ni personaje por defecto). El chip con "Salir" está en `AuthGate.jsx`.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/PerfilModal.jsx`

## Pasos sugeridos

1. Toggles: sonidos (lo consumirá T66), preferencias visuales disponibles.
2. Persistencia en `/usuarios/{nombre}/prefs` o localStorage (decidir: localStorage vale para prefs de dispositivo).
3. El botón **Guardar** aplica los cambios de las 3 pestañas de una vez; aviso si hay cambios sin guardar al cerrar.

## Criterios de hecho

- [ ] Las prefs sobreviven a recargar.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
