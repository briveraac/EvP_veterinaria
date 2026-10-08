import assert from 'node:assert/strict'
import { beforeEach, afterEach, test } from 'node:test'
import { DEMO_PASSWORD, getSession, signIn, signOut } from '../src/features/auth/session.js'
import { seedData, STORAGE_KEY } from '../src/features/admin/adminData.js'

function storage() {
  const values = new Map()
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) }
}
beforeEach(() => {
  globalThis.localStorage = storage()
  globalThis.sessionStorage = storage()
})
afterEach(() => {
  delete globalThis.localStorage
  delete globalThis.sessionStorage
  delete globalThis.window
})

test('detecta administrador y usuario normal sin seleccionar rol', () => {
  assert.equal(signIn(' BRUN.RIVERA@DUOCUC.CL ', DEMO_PASSWORD).role, 'Administrador')
  assert.equal(getSession().id, 'u1')
  assert.equal(signIn('cliente@sanmarcos.cl', DEMO_PASSWORD).role, 'Dueño de mascota')
  assert.equal(getSession().id, 'u3')
})
test('rechaza contraseñas incorrectas, cuentas desconocidas e inactivas', () => {
  assert.throws(() => signIn('brun.rivera@duocuc.cl', 'incorrecta'))
  assert.throws(() => signIn('desconocido@example.cl', DEMO_PASSWORD))
  const data = seedData()
  data.users[0].active = false
  globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  assert.throws(() => signIn(data.users[0].email, DEMO_PASSWORD))
  assert.equal(getSession(), null)
})
test('vuelve a consultar roles y estado del directorio para una sesión existente', () => {
  signIn('brun.rivera@duocuc.cl', DEMO_PASSWORD)
  const data = seedData()
  data.users.find(user => user.id === 'u1').role = 'Dueño de mascota'
  globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  assert.equal(getSession().role, 'Dueño de mascota')
  data.users.find(user => user.id === 'u1').active = false
  globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  assert.equal(getSession(), null)
})
test('rechaza sesiones vencidas o dañadas', () => {
  globalThis.sessionStorage.setItem('san-marcos-session', JSON.stringify({ userId: 'u1', expires: Date.now() - 1 }))
  assert.equal(getSession(), null)
  globalThis.sessionStorage.setItem('san-marcos-session', 'invalid-json')
  assert.equal(getSession(), null)
})
test('informa bloqueo de almacenamiento y permite cerrar sesión', () => {
  globalThis.sessionStorage.setItem = () => { throw new Error('blocked') }
  assert.throws(() => signIn('brun.rivera@duocuc.cl', DEMO_PASSWORD), /almacenamiento/)
  globalThis.sessionStorage = storage()
  signIn('brun.rivera@duocuc.cl', DEMO_PASSWORD)
  let destination
  globalThis.window = { location: { assign: path => { destination = path } } }
  signOut()
  assert.equal(getSession(), null)
  assert.equal(destination, '/login')
})
