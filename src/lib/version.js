// Versión de la app. En producción la inyecta el workflow como PUBLIC_APP_VERSION
// (el SHA del commit), así se actualiza sola en cada deploy. En local es 'dev'.
export const APP_VERSION = import.meta.env.PUBLIC_APP_VERSION || 'dev';
