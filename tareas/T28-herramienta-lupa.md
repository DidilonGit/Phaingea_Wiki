# T28 · Herramienta Lupa

**Fase:** 4 · **Depende de:** T27

## Objetivo

La lupa se descuelga del gancho, sigue al cursor y amplía la zona del mapa bajo la lente; se devuelve a su sitio.

## Guía (fragmento literal)

### Lupa

La lupa estará colgada junto al mapa.

Al seleccionarla:

- Desaparece de su soporte.
- Aparece como herramienta junto al cursor.
- Al pasar sobre el mapa amplía la zona situada bajo la lente.
- Puede devolverse a su sitio para salir del modo lupa.

### Compás

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/MapaViewer.jsx` (+ Cartografia.astro para el gancho)

## Pasos sugeridos

1. Clic en la lupa del gancho → desaparece del soporte y aparece pegada al cursor sobre el mapa.
2. Lente circular con zoom local (canvas con drawImage ampliado o `background-position` calculado).
3. Clic en el gancho vacío (o tecla Esc) → la lupa vuelve y se sale del modo.

## Criterios de hecho

- [x] Efecto lupa fluido y sin artefactos; entrar/salir del modo es obvio.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
