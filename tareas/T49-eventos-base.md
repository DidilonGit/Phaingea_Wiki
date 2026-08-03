# T49 · Eventos (Sesiones en Base de Phaingea)

**Fase:** 4 · **Depende de:** T46

## Objetivo

En Base, la sala se convierte en Eventos: libro de acontecimientos históricos sin experiencia.

## Guía (fragmento literal)

# 15. Eventos

Eventos sustituye a Sesiones dentro de Base de Phaingea.

Funciona como un libro de acontecimientos históricos importantes.

Cada entrada podrá tener:

- Título.
- Fecha o periodo.
- Subtítulo opcional.
- Descripción.
- Imagen opcional.
- Comentarios propios.

Eventos no tendrá:

- Experiencia.
- Número obligatorio de sesión.
- Reparto de niveles.
- Lista de participantes como jugadores.

Su índice funcionará de forma similar al de Sesiones y permitirá abrir cualquier evento rápidamente.

## Estado actual relevante

- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/SesionesView.jsx` (variante) · `src/lib/db/sesiones.js` (o nodo `/eventos`)

## Pasos sugeridos

1. Si `$campaign.esBase`: entradas `{titulo, fechaOPeriodo, subtitulo?, descripcion, imagenUrl?}` sin XP ni participantes; mismo índice.
2. Comentarios propios por evento.
3. Rotular la sala como "Eventos" en Base.

## Criterios de hecho

- [x] En Base se ven Eventos sin rastro de XP; en campañas normales, Sesiones normal.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
