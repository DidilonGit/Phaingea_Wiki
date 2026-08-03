# T35 · Botones del podio: Ampliar y Mostrar diario

**Fase:** 4 · **Depende de:** T33

## Objetivo

Los dos botones junto al personaje: ampliar casi a pantalla completa y abrir/cerrar el diario bajo el podio.

## Guía (fragmento literal)

## 11.6. Botones del podio

Junto al personaje habrá dos botones.

### Ampliar personaje

Muestra el personaje casi a pantalla completa.

El fondo queda borroso.

Hacer clic fuera devuelve a la vista normal.

### Mostrar diario

Abre o cierra el diario del personaje.

El diario aparece debajo del podio.

Si se abre el diario de otro personaje, sustituye al que estuviera abierto.

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/PodiosView.jsx`

## Pasos sugeridos

1. Ampliar: personaje casi fullscreen, fondo borroso, clic fuera vuelve.
2. Mostrar diario: abre/cierra el hueco del diario bajo el podio (el libro llega en T36); si se abre el de otro personaje, sustituye al abierto.

## Criterios de hecho

- [ ] Ambos botones según guía.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
