# T64 · Perfil: pestaña de jugador (inicial + color)

**Fase:** 4 · **Depende de:** T03

## Objetivo

Configuración del jugador: nombre visible, avatar de inicial sobre color elegido, y listado de campañas.

## Guía (fragmento literal)

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
- **Cuentas/sesión:** login propio en `src/lib/auth.js` (sha256hex, login/registrar contra `/usuarios` en RTDB; la pass se guarda hasheada). Sesión y rol en `src/stores/user.js` (nanostore `$user` + localStorage `phaingea_session`; helpers `esOwner`/`esMasterOOwner`; el rol `admin` equivale a `owner`). UI de login: `src/components/AuthGate.jsx` (overlay + chip de usuario arriba a la derecha).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/PerfilModal.jsx` · `src/lib/db/` (campos extra en `/usuarios/{nombre}`: `{nombreVisible?, colorAvatar}`) · `database.rules.json` si hace falta ampliar validación

## Pasos sugeridos

1. Selector de color para el fondo del avatar + nombre visible (por defecto el de la cuenta).
2. Persistir en `/usuarios/{nombre}` (ojo con la regla `$otro: validate false` — ampliar la regla para los campos nuevos y republicar).
3. Usar el color/inicial en el avatar de la topbar y en los comentarios.
4. Listar campañas accesibles y en las que participa (de `/campanas`).

## Criterios de hecho

- [ ] El color elegido persiste y se ve en topbar y comentarios.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
