import { readData } from '../admin/adminData.js';
const SESSION_KEY = 'san-marcos-session';
export const DEMO_PASSWORD = 'SanMarcos2026!';
export function getSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (!session || session.expires <= Date.now()) {
      return null;
    }

    // Consultamos otra vez el usuario por si cambió su rol o fue desactivado.
    const data = readData();
    for (const user of data.users) {
      if (user.id === session.userId && user.active) {
        return user;
      }
    }
    return null;
  } catch {
    return null;
  }
}
export function signIn(email, password) {
  const data = readData();
  const enteredEmail = email.trim().toLowerCase();
  let account = null;
  for (const user of data.users) {
    if (user.email.toLowerCase() === enteredEmail && user.active) {
      account = user;
      break;
    }
  }
  if (!account || password !== DEMO_PASSWORD) {
    throw new Error('Correo o contraseña incorrectos, o cuenta inactiva.');
  }
  const session = {
    userId: account.id,
    expires: Date.now() + 8 * 60 * 60 * 1000
  };
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    throw new Error('Permite el almacenamiento del navegador para iniciar sesión.');
  }
  return account;
}
export function signOut() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.assign('/login');
}
