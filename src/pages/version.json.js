// Endpoint estático: al construir genera /version.json con la versión actual.
// La isla VersionWatcher lo consulta para detectar despliegues nuevos.
import { APP_VERSION } from '../lib/version.js';

export const prerender = true;

export function GET() {
  return new Response(JSON.stringify({ version: APP_VERSION }), {
    headers: { 'content-type': 'application/json' },
  });
}
