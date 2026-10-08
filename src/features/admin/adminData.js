import { INITIAL_USERS } from './adminUsers.js'

export const ROLES = ['Administrador', 'Recepcionista', 'Dueño de mascota']
export const SERVICES = ['Consulta general', 'Vacunación', 'Cirugía menor', 'Desparasitación', 'Control de peso']
export const STATUSES = ['Pendiente', 'Confirmada', 'Completada', 'Cancelada']
export const STORAGE_KEY = 'san-marcos-admin-demo-v2'

export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function seedData() {
  const today = localDate()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return {
    users: INITIAL_USERS.map(user => ({ ...user })),
    appointments: [
      { id: 'c1', pet: 'Luna', species: 'Perro', owner: 'Francisca Muñoz', service: 'Consulta general', date: today, time: '09:00', vet: 'Dra. Sofía Herrera', status: 'Completada' },
      { id: 'c2', pet: 'Milo', species: 'Gato', owner: 'Matías González', service: 'Vacunación', date: today, time: '10:00', vet: 'Dr. Nicolás Vega', status: 'Confirmada' },
      { id: 'c3', pet: 'Simón', species: 'Conejo', owner: 'Antonia Pérez', service: 'Control de peso', date: today, time: '11:30', vet: 'Dra. Sofía Herrera', status: 'Pendiente' },
      { id: 'c4', pet: 'Nala', species: 'Perro', owner: 'Diego Silva', service: 'Desparasitación', date: today, time: '12:00', vet: 'Dra. Paula Fuentes', status: 'Confirmada' },
      { id: 'c5', pet: 'Coco', species: 'Ave', owner: 'Antonia Pérez', service: 'Consulta general', date: today, time: '15:00', vet: 'Dr. Nicolás Vega', status: 'Pendiente' },
      { id: 'c6', pet: 'Milo', species: 'Gato', owner: 'Matías González', service: 'Control de peso', date: localDate(tomorrow), time: '09:30', vet: 'Dra. Paula Fuentes', status: 'Pendiente' },
    ],
  }
}

export function readData() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY))
    const validUsers = Array.isArray(data?.users) && data.users.every(user => typeof user.id === 'string' && typeof user.name === 'string' && typeof user.email === 'string' && ROLES.includes(user.role) && typeof user.active === 'boolean')
    const validAppointments = Array.isArray(data?.appointments) && data.appointments.every(item => ['id', 'pet', 'species', 'owner', 'date', 'time', 'vet'].every(key => typeof item[key] === 'string') && SERVICES.includes(item.service) && STATUSES.includes(item.status))
    if (validUsers && validAppointments) return data
  } catch { /* A missing or damaged demo store starts with sample data. */ }
  return seedData()
}

export function downloadReport(appointments) {
  const rows = [['Mascota', 'Especie', 'Dueño', 'Servicio', 'Fecha', 'Hora', 'Veterinario', 'Estado'], ...appointments.map(item => [item.pet, item.species, item.owner, item.service, item.date, item.time, item.vet, item.status])]
  const csv = '\uFEFF' + rows.map(row => row.map(value => `"${String(value).replace(/^[=+@\-\t\r]/, "'$&").replaceAll('"', '""')}"`).join(';')).join('\r\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `atenciones-san-marcos-${localDate()}.csv`
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
