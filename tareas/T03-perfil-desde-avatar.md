# T03 · Perfil como ventana desde el avatar (fuera del navbar)

**Fase:** 0 · **Depende de:** T01

## Objetivo

El Perfil deja de ser una sala: se abre desde el avatar de la esquina superior derecha como ventana grande con marco de madera.

## Guía (fragmento literal)

# 19. Perfil

El Perfil no será una categoría.

Se abrirá desde el avatar situado en la esquina superior derecha.

## 19.1. Ventana de perfil

Al abrirlo:

- Aparece una ventana grande con marco de madera.
- Ocupa casi toda la pantalla, sin cubrirla completamente.
- La sala actual sigue visible alrededor.
- El fondo se oscurece y desenfoca.
- Hay una X en la esquina superior derecha.
- Pulsar fuera también cierra la ventana.
- Existe un botón **Guardar**.

## 19.2. Secciones

El Perfil tendrá varias páginas o pestañas internas:

1. Personaje de la campaña activa.
2. Perfil general del jugador.
3. Ajustes personales de la web.

Cuando se cambia de campaña, la pestaña de personaje cambia al personaje correspondiente.

## Estado actual relevante

- **Perfil actual:** `src/components/views/Perfil.astro` + `PerfilContent.jsx` (isla que lee `$user` y muestra nombre/rol; sin campañas ni personaje por defecto). El chip con "Salir" está en `AuthGate.jsx`.
- **Cuentas/sesión:** login propio en `src/lib/auth.js` (sha256hex, login/registrar contra `/usuarios` en RTDB; la pass se guarda hasheada). Sesión y rol en `src/stores/user.js` (nanostore `$user` + localStorage `phaingea_session`; helpers `esOwner`/`esMasterOOwner`; el rol `admin` equivale a `owner`). UI de login: `src/components/AuthGate.jsx` (overlay + chip de usuario arriba a la derecha).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/AuthGate.jsx` · nuevo `src/components/PerfilModal.jsx` · eliminar `src/components/views/Perfil.astro` del SPA (reutilizar `PerfilContent.jsx` dentro del modal)

## Pasos sugeridos

1. Convertir el chip de usuario en un avatar circular (inicial sobre color; color configurable llega en T64) + nombre.
2. Al pulsarlo, abrir `PerfilModal`: ventana casi a pantalla completa con marco de madera (usa la textura `public/textures/wood.png` como el navbar), la sala visible alrededor, fondo oscurecido+desenfocado.
3. X arriba a la derecha; clic fuera cierra; botón **Guardar** (aún sin persistencia real).
4. Tres pestañas internas placeholder: Personaje (campaña activa), Jugador, Ajustes — mover ahí el contenido de `PerfilContent.jsx`.
5. Quitar la sección/vista Perfil del SPA y del conmutador.

## Criterios de hecho

- [x] El avatar abre la ventana; X y clic fuera la cierran.
- [x] Las 3 pestañas conmutan.
- [x] Perfil ya no existe como sala del navbar.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
