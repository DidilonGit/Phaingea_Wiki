# T66 · Sonidos discretos y desactivables

**Fase:** 5 · **Depende de:** T65

## Objetivo

Efectos de sonido sutiles (páginas, libros, cartas, botellas, botones concretos) que respetan el toggle del Perfil.

## Guía (fragmento literal)

# 29. Sonido

La web no tendrá música.

Podrá usar sonidos sutiles y opcionales:

- Pasar páginas.
- Abrir libros.
- Madera.
- Cartas.
- Botellas.
- Botones concretos.
- Líquido vertiéndose.

No deben repetirse constantemente ni cansar.

El usuario podrá desactivarlos desde Perfil.

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

nuevo `src/lib/sonidos.js` · `public/sounds/` · integraciones puntuales

## Pasos sugeridos

1. Helper `sonar(nombre)` que respeta la preferencia (T65) y usa Web Audio/`<audio>` con volúmenes bajos.
2. SFX cortos y libres de derechos: pasar página, abrir libro, carta, verter, clic de madera.
3. Integrar SOLO en las interacciones listadas (sin abusar). Sin música.

## Criterios de hecho

- [x] Con el toggle apagado no suena nada; encendido, sonidos discretos.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
