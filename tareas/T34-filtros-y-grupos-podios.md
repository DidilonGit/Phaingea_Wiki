# T34 · Filtros por estado y grupos en Podios

**Fase:** 4 · **Depende de:** T33

## Objetivo

Filtrar personajes por estado (multi) y soporte de grupos con composición conjunta.

## Guía (fragmento literal)

## 11.4. Filtros

El usuario podrá filtrar por estado.

Estados:

- Activo.
- Fallecido.
- Delegado.

Se podrá:

- Mostrar todos.
- Activar uno o varios estados.
- Ocultar los no seleccionados.

También habrá filtros por grupos cuando corresponda.

## 11.5. Grupos

Los personajes podrán pertenecer a uno o varios grupos.

En campañas normales:

- Por defecto se crea un grupo con el nombre de la campaña.
- El nombre puede cambiarse.
- Los personajes se muestran inicialmente como individuales.
- Puede haber varios grupos.

En Base de Phaingea:

- Las Leyendas se muestran por grupos de forma predeterminada.
- El máster puede subir personajes individuales o grupos completos.
- Cada grupo tendrá su propio nombre.
- El nombre del grupo podrá tener un color propio.
- Cada personaje del grupo conservará su podio, información y diario.
- Un personaje podrá pertenecer a varios grupos.

Cuando se selecciona un grupo, sus personajes aparecen juntos dentro de una composición compartida.

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/PodiosView.jsx`

## Pasos sugeridos

1. Filtros de estado (Activo/Fallecido/Delegado): mostrar todos por defecto, activar uno o varios, ocultar el resto.
2. Grupos: por defecto existe un grupo con el nombre de la campaña (renombrable por el máster); personajes inicialmente individuales; un personaje puede estar en varios grupos.
3. Seleccionar un grupo → composición compartida (varios personajes juntos sobre el escenario).
4. Filtro por grupo cuando haya más de uno.

## Criterios de hecho

- [x] Filtrar por Fallecido muestra solo esos; seleccionar un grupo muestra la composición conjunta.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
