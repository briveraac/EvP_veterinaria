import axios from 'axios';
import { sitePath } from '../utils/paths.js';

// Aquí se guarda la sesión (token + usuario) en el navegador.
export const SESSION_KEY = 'san-marcos-session';

// Dirección del backend. Se puede cambiar con la variable VITE_API_URL en un archivo .env.
const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8080';

// Todas las llamadas al backend usan esta instancia de axios.
const api = axios.create({
  baseURL: API_URL + '/api/v1'
});

// ANTES de cada petición: si hay sesión, agregamos el token en la cabecera
// "Authorization: Bearer <token>". Así el backend sabe quién hace la petición.
api.interceptors.request.use(config => {
  try {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (session && session.token) {
      config.headers.Authorization = 'Bearer ' + session.token;
    }
  } catch {
    // Si la sesión está dañada, la petición sale sin token.
  }
  return config;
});

// DESPUÉS de cada respuesta: si el backend dice 401 (token vencido o inválido),
// borramos la sesión y mandamos al usuario al login.
api.interceptors.response.use(response => response, error => {
  const isLogin = error.config && error.config.url === '/auth/login';
  if (error.response && error.response.status === 401 && !isLogin) {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.assign(sitePath('login'));
  }
  return Promise.reject(error);
});

// Devuelve el mensaje que envía el backend o uno general si no hay conexión.
export function errorMessage(error) {
  if (error.response && error.response.data && error.response.data.mensaje) {
    return error.response.data.mensaje;
  }
  if (error.response && error.response.status === 403) {
    return 'No tienes permiso para hacer esto.';
  }
  return 'No se pudo conectar con el servidor. Revisa que el backend esté encendido.';
}

export default api;
