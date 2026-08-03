# T57 · Carta: lectura y archivado

**Fase:** 4 · **Depende de:** T56

## Objetivo

Abrir cartas (giro + ampliación) y archivarlas con vuelo al álbum; cerrar sin archivar las mantiene pendientes.

## Guía (fragmento literal)

## 18.4. Diseño de las cartas

La parte trasera mostrará:

- Asunto.
- Fecha.
- Logo de la campaña.
- Color de campaña.
- Color de contorno de campaña.

Ejemplos de asuntos:

- Personaje fallecido.
- Aviso del máster.
- Sesión publicada.
- Experiencia recibida.
- Solicitud pendiente.
- Imagen aprobada.

Al pulsar una carta:

- Se gira.
- Se coloca en el centro.
- Se amplía.
- El fondo queda borroso.
- Aparece el texto completo.

La parte frontal utilizará versiones más claras de los colores de campaña para facilitar la lectura.

## 18.5. Lectura y archivo

Abrir una carta permite leerla, pero no la retira automáticamente de pendientes.

Mientras no se archive:

- Sigue contando en el indicador.
- Vuelve al abanico al cerrarla.
- Permanece en el sobre si este se cierra.

La carta tendrá un botón **Archivar**.

Al pulsarlo:

- Deja de contar como pendiente.
- Vuela hacia el álbum.
- Desaparece con un rastro sutil de brillo.
- Queda guardada entre las cartas archivadas.

Cerrar la carta pulsando fuera no la archiva.

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/BuzonView.jsx`

## Pasos sugeridos

1. Trasera de carta: asunto, fecha, logo y colores de la campaña.
2. Clic → gira, se centra, se amplía, fondo borroso; frontal con versiones claras de los colores y el texto completo.
3. Botón **Archivar**: deja de contar, vuela hacia el álbum con un rastro sutil de brillo, `estado:"archivada"`.
4. Cerrar (clic fuera) NO archiva: vuelve al abanico.

## Criterios de hecho

- [x] Flujo leer/cerrar/archivar exacto a la guía; el contador baja solo al archivar.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
