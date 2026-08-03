# T38 · Leyendas (Podios en Base de Phaingea)

**Fase:** 4 · **Depende de:** T34

## Objetivo

Cuando la campaña activa es Base, Podios se convierte en Leyendas: vista por grupos por defecto, gestionada por el máster, con estado histórico.

## Guía (fragmento literal)

# 12. Leyendas

Leyendas sustituye a Podios dentro de Base de Phaingea.

Mantiene el mismo sistema visual, pero su función es conservar personajes históricos, figuras importantes y grupos que hayan pasado a formar parte del canon.

El contenido lo administra el máster.

Puede incluir:

- Personajes individuales.
- Compañías.
- Familias.
- Órdenes.
- Grupos de aventureros.
- Facciones personificadas.
- Conjuntos de personajes relacionados.

Por defecto la vista será por grupos.

Cada leyenda podrá tener:

- Podio.
- Diario.
- Estado histórico.
- Grupo o grupos.
- Comentarios.
- Imagen.
- Información básica.

---

## Estado actual relevante

- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/PodiosView.jsx` (variante) · `src/components/TopBar.astro` (nombre del banderín según campaña, si se quiere)

## Pasos sugeridos

1. Si `$campaign.esBase`: vista por grupos por defecto; nombres de grupo con color propio; contenido gestionado solo por máster/owner (sin restricción 1-activo-por-jugador).
2. Cada leyenda conserva podio, diario, info y comentarios.
3. Rotular la sala/banderín como "Leyendas" cuando la campaña es Base (y "Eventos" hará lo mismo en T49).

## Criterios de hecho

- [x] En Base se ven grupos de leyendas; en campaña normal, Podios normal.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
