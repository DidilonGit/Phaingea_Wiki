# 03 · Firebase — qué necesito de ti y cómo conectarlo

Este es el documento que responde a tu pregunta *"dime qué necesitas para conectarlo a Firebase"*.

## Resumen: lo que necesito de ti

| # | Qué necesito | Por qué | Cómo conseguirlo |
|---|--------------|---------|------------------|
| 1 | **El objeto de configuración web** (`firebaseConfig`) | Para que la web hable con tu proyecto | Ver paso A |
| 2 | **Activar Email/contraseña** en Authentication | Login por usuario+contraseña (decidido) | Ver paso B |
| 3 | **Plan del proyecto** (Spark gratuito o Blaze de pago) | Storage de imágenes/PDF requiere Blaze | Ver paso C |
| 4 | **Tu email/UID de Owner** | Para sembrar el primer rol de owner | Ver paso D |
| 5 | **Nombre del repo de GitHub** (y si ya existe) | Para el `base` de Astro y los dominios autorizados | Dímelo |
| 6 | Decisión: **Firestore vs Realtime Database** | Elegir la base de datos principal | Ver [`02-ARQUITECTURA.md`](02-ARQUITECTURA.md) |

> Lo único **imprescindible para empezar a conectar** es el punto **1** (el `firebaseConfig`). El resto lo podemos ir resolviendo sobre la marcha.

---

## Paso A · Conseguir el `firebaseConfig`

Ahora mismo solo tengo la URL de la Realtime Database (`https://phaingea-default-rtdb.europe-west1.firebasedatabase.app/`). Necesito el objeto completo:

1. Entra en la [consola de Firebase](https://console.firebase.google.com/) → tu proyecto **phaingea**.
2. Icono del engranaje ⚙️ (arriba izq.) → **Configuración del proyecto**.
3. Baja a **Tus aplicaciones**. Si no hay ninguna app **Web** (icono `</>`), pulsa **Agregar app → Web**, ponle un apodo (ej. `phaingea-web`) y regístrala. *No* hace falta marcar Hosting.
4. Copia el bloque `firebaseConfig`. Tiene esta forma:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "phaingea.firebaseapp.com",
  databaseURL: "https://phaingea-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "phaingea",
  storageBucket: "phaingea.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123..."
};
```

**Pégamelo tal cual.** Estos valores **no son secretos** (la seguridad la ponen las reglas), así que se pueden poner en el código sin riesgo. Aun así lo dejaremos centralizado en un único fichero de config.

---

## Paso B · Activar el login (Authentication)

**Decisión tomada:** login por **usuario + contraseña**, sin Google ni emails visibles.

En la consola → **Compilación → Authentication → Get started → pestaña Sign-in method** → activa **solo** **"Correo electrónico/contraseña"** (Email/Password). No hace falta activar Google.

> **Cómo funciona el "usuario":** Firebase usa formato email por dentro, pero el jugador nunca lo ve. La web convierte el usuario `didilon` en `didilon@phaingea.local` (dominio inventado) antes de hablar con Firebase. El usuario solo teclea **usuario + contraseña**.
>
> **La contraseña NO se guarda en la base de datos** — la guarda Firebase Auth cifrada. En la BD solo va el perfil (`users/{uid}`: username, displayName, role, settings). Ver [`05-ROLES-PERMISOS.md`](05-ROLES-PERMISOS.md) y [`04-MODELO-DATOS.md`](04-MODELO-DATOS.md).
>
> **Sin recuperación por email** (no hay emails reales): si alguien olvida su contraseña, el **owner** le pone una nueva.

**Importante (dominios autorizados):** en Authentication → **Settings → Authorized domains**, tendrás que añadir el dominio de GitHub Pages cuando lo tengamos (ej. `tuusuario.github.io`). `localhost` ya viene autorizado para desarrollo.

---

## Paso C · Plan del proyecto (¿imágenes y PDFs?)

Firebase **Storage** (donde vivirían las imágenes de la galería y los PDFs) exige el plan **Blaze** (pago por uso, con capa gratuita generosa; requiere tarjeta pero es difícil que genere coste con un grupo pequeño).

Opciones:
- **A) Activar Blaze** → usamos Firebase Storage, todo integrado. *(Recomendado si vais a subir muchas imágenes/PDF.)*
- **B) Seguir en Spark (gratis)** → guardamos imágenes/PDF en otro sitio (p. ej. **Cloudinary** capa gratuita, o los PDF fijos versionados en el propio repo). Un poco más de fontanería.

Dime qué prefieres. Para el MVP (Sesiones + Personajes) **casi no hace falta Storage todavía**, así que esto no bloquea el arranque.

---

## Paso D · Sembrar el Owner

Tú serás **Owner** (permisos globales). El flujo será:
1. Inicias sesión una vez en la web (para que Firebase cree tu usuario y tengamos tu **UID**).
2. Marcamos ese UID como `owner` (a mano en la consola la primera vez, o con un pequeño script).

De momento me basta con saber **con qué email vas a entrar** (¿el de Google `programacion@iaconexia.com`?).

---

## Cómo quedará conectado en el código (para tu info)

- Un único módulo `src/lib/firebase.js` inicializa la app con el `firebaseConfig` y exporta `auth`, `db`, etc.
- Config vía variables de entorno de Astro (`PUBLIC_FIREBASE_*` en un `.env`) para no repetir valores y poder cambiar de proyecto fácil. El `.env` se ignora en git; en el deploy se inyecta como *secrets* del repo. (Recordatorio: aunque no sean secretas, es buena práctica.)
- Las **Security Rules** se guardan en el repo (`firestore.rules` / `database.rules.json`) y se despliegan con Firebase CLI.

---

## Checklist para ti (marca lo que vayas haciendo)

- [ ] Registrar app Web y enviarme el `firebaseConfig` completo. **(lo único que bloquea)**
- [ ] Activar proveedores de login y decirme cuáles.
- [ ] Decidir plan Spark vs Blaze (o dejarlo para cuando toque Galería).
- [ ] Confirmar email de Owner.
- [ ] Decirme el nombre del repo de GitHub (o si lo creo yo).
- [ ] Decidir Firestore vs Realtime Database (te doy mi recomendación en arquitectura).
