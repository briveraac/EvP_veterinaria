import assert from 'node:assert/strict'
import { afterEach, beforeEach, test } from 'node:test'
import { getSession, getToken, readToken, saveSession, signOut } from '../src/features/auth/session.js'

// sessionStorage falso para correr las pruebas en Node.
function storage() {
  const values = new Map()
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) }
}

// Arma un JWT de prueba (la firma no importa aquí: la revisa el backend).
function fakeToken(minutes) {
  const payload = { sub: 'brun.rivera@duocuc.cl', rol: 'Administrador', nombre: 'Bruno Muñoz', exp: Math.floor(Date.now() / 1000) + minutes * 60 }
  const bytes = new TextEncoder().encode(JSON.stringify(payload))
  const base64 = btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  return 'eyJhbGciOiJIUzI1NiJ9.' + base64 + '.firma'
}

const admin = { id: 1, name: 'Bruno Rivera', email: 'brun.rivera@duocuc.cl', role: 'Administrador', active: true }

beforeEach(() => {
  globalThis.sessionStorage = storage()
})
afterEach(() => {
  delete globalThis.sessionStorage
  delete globalThis.window
})

test('lee el payload del token, incluso con acentos', () => {
  const data = readToken(fakeToken(60))
  assert.equal(data.rol, 'Administrador')
  assert.equal(data.nombre, 'Bruno Muñoz')
})

test('guarda la sesión y la mantiene al volver a leer (como al recargar)', () => {
  const token = fakeToken(60)
  saveSession(token, admin)
  assert.deepEqual(getSession(), admin)
  assert.equal(getToken(), token)
})

test('la sesión vence junto con el token', () => {
  saveSession(fakeToken(-1), admin)
  assert.equal(getSession(), null)
  assert.equal(getToken(), null)
})

test('rechaza sesiones dañadas', () => {
  globalThis.sessionStorage.setItem('san-marcos-session', 'no es JSON')
  assert.equal(getSession(), null)
  globalThis.sessionStorage.setItem('san-marcos-session', '{"user":{"id":1}}')
  assert.equal(getSession(), null)
})

test('cerrar sesión borra el token y lleva al login', () => {
  saveSession(fakeToken(60), admin)
  let destination
  globalThis.window = { location: { assign: path => { destination = path } } }
  signOut()
  assert.equal(getSession(), null)
  assert.equal(destination, '/login')
})
