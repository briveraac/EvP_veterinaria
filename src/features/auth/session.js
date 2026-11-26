import api, { errorMessage, SESSION_KEY } from '../../services/api.js';
import { sitePath } from '../../utils/paths.js';

// La sesión se guarda en sessionStorage así:
// { token: "eyJ...", user: { id, name, email, role }, expires: 1764100000000 }
// - Sobrevive a las recargas de página.
// - Se borra al cerrar la pestaña.
// - "expires" sale del propio token (campo exp), así la sesión dura lo mismo que el token.

// Lee el payload del JWT (la parte del medio) para saber cuándo vence.
// OJO: aquí no se revisa la firma. Eso lo hace el backend en cada petición.
export function readToken(token) {
  const payload = token.split('.')[1];
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const bytes = Uint8Array.from(atob(base64), letter => letter.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

export function saveSession(token, user) {
  const session = {
    token,
    user,
    expires: readToken(token).exp * 1000 // exp viene en segundos
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

// Devuelve la sesión guardada o null si no hay, está vencida o dañada.
function readSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (!session || !session.token || !session.user || session.expires <= Date.now()) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

// Usuario que inició sesión (o null).
export function getSession() {
  const session = readSession();
  if (!session) {
    return null;
  }
  return session.user;
}

export function getToken() {
  const session = readSession();
  if (!session) {
    return null;
  }
  return session.token;
}

// POST /api/v1/auth/login. Si sale bien, guarda el token y devuelve el usuario.
export async function signIn(email, password) {
  let response;
  try {
    response = await api.post('/auth/login', { email: email.trim(), password });
  } catch (error) {
    throw new Error(errorMessage(error), { cause: error });
  }
  try {
    saveSession(response.data.token, response.data.usuario);
  } catch {
    throw new Error('Permite el almacenamiento del navegador para iniciar sesión.');
  }
  return response.data.usuario;
}

// POST /api/v1/auth/renovar: cambia el token actual por uno nuevo antes de que venza.
// El backend también devuelve el usuario actualizado (por si le cambiaron el rol).
export async function renewSession() {
  const response = await api.post('/auth/renovar');
  saveSession(response.data.token, response.data.usuario);
}

// Programa la renovación del token 5 minutos antes de que venza.
let renewTimer = null;
export function scheduleRenewal() {
  const session = readSession();
  if (!session) {
    return;
  }
  clearTimeout(renewTimer);
  const wait = Math.max(session.expires - Date.now() - 5 * 60 * 1000, 0);
  renewTimer = setTimeout(async () => {
    try {
      await renewSession();
      scheduleRenewal(); // programamos la siguiente
    } catch {
      signOut();
    }
  }, wait);
}

export function signOut() {
  clearTimeout(renewTimer);
  sessionStorage.removeItem(SESSION_KEY);
  window.location.assign(sitePath('login'));
}
