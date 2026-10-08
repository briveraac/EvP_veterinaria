import assert from 'node:assert/strict'
import { afterEach, beforeEach, test } from 'node:test'
import { downloadReport, localDate, readData, seedData, STORAGE_KEY } from '../src/features/admin/adminData.js'

beforeEach(() => {
  const values = new Map()
  globalThis.localStorage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  }
})

afterEach(() => {
  delete globalThis.localStorage
})

test('conserva usuarios y citas guardados al volver a leer', () => {
  const data = seedData()
  data.users[0].name = 'Nombre editado'
  data.appointments[0].status = 'Cancelada'
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  assert.deepEqual(readData(), data)
})

test('recupera los datos de ejemplo cuando el almacenamiento está dañado', () => {
  for (const invalid of ['no es JSON', '{}', '{"users":[null],"appointments":[]}']) {
    localStorage.setItem(STORAGE_KEY, invalid)
    assert.deepEqual(readData(), seedData())
  }
  const data = seedData()
  data.appointments[0].status = 'Estado desconocido'
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  assert.deepEqual(readData(), seedData())
})

test('genera fechas locales con mes y día de dos dígitos', () => {
  assert.equal(localDate(new Date(2026, 0, 5)), '2026-01-05')
})

test('el CSV conserva comillas, separadores, acentos y protección contra fórmulas', async () => {
  const previousDocument = globalThis.document
  const createUrl = URL.createObjectURL
  const revokeUrl = URL.revokeObjectURL
  let file
  let clicked = false
  const link = { click() { clicked = true } }
  globalThis.document = { createElement() { return link } }
  URL.createObjectURL = blob => { file = blob; return 'blob:reporte' }
  URL.revokeObjectURL = () => {}

  try {
    const appointment = seedData().appointments[0]
    appointment.pet = '=SUM(1;2)'
    appointment.owner = 'María "Paz"'
    downloadReport([appointment])
    const bytes = new Uint8Array(await file.arrayBuffer())
    assert.deepEqual([...bytes.slice(0, 3)], [239, 187, 191])
    const csv = await file.text()
    assert.ok(csv.includes(`"'=SUM(1;2)"`))
    assert.ok(csv.includes('"María ""Paz"""'))
    assert.ok(csv.includes('\r\n'))
    assert.equal(clicked, true)
    assert.equal(link.href, 'blob:reporte')
    assert.equal(link.download, 'atenciones-san-marcos-' + localDate() + '.csv')
  } finally {
    globalThis.document = previousDocument
    URL.createObjectURL = createUrl
    URL.revokeObjectURL = revokeUrl
  }
})
