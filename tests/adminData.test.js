import assert from 'node:assert/strict'
import { test } from 'node:test'
import { downloadReport, localDate } from '../src/features/admin/adminData.js'

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
    const appointment = { pet: '=SUM(1;2)', species: 'Perro', owner: 'María "Paz"', service: 'Consulta general', date: '2026-11-05', time: '09:00', vet: 'Dra. Sofía Herrera', status: 'Pendiente' }
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
