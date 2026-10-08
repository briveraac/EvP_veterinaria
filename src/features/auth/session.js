import { readData } from '../admin/adminData'

const SESSION_KEY = 'san-marcos-session'
export const DEMO_PASSWORD = 'SanMarcos2026!'

export function getSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY))
    if (!session || session.expires <= Date.now()) return null
    return readData().users.find(user => user.id === session.userId && user.active) || null
  } catch { return null }
}

export function signIn(email, password) {
  const user = readData().users.find(user => user.email.toLowerCase() === email.trim().toLowerCase() && user.active)
  if (!user || password !== DEMO_PASSWORD) throw new Error('Correo o contraseña incorrectos, o cuenta inactiva.')
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, expires: Date.now() + 8 * 60 * 60 * 1000 }))
  } catch { throw new Error('Permite el almacenamiento del navegador para iniciar sesión.') }
  return user
}

export function signOut() {
  sessionStorage.removeItem(SESSION_KEY)
  window.location.assign('/login')
}
