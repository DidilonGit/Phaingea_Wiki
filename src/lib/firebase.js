// Punto único de inicialización de Firebase para toda la web.
// Importa desde aquí: `import { auth, db } from '../lib/firebase.js'`
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { firebaseConfig } from './firebaseConfig.js';

export const app = initializeApp(firebaseConfig);

// Autenticación (login usuario+contraseña vía proveedor Email/Password).
export const auth = getAuth(app);

// Realtime Database (base de datos principal del proyecto).
export const db = getDatabase(app);
