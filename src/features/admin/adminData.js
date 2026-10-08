import { INITIAL_USERS } from './adminUsers.js';
export const ROLES = ['Administrador', 'Recepcionista', 'Dueño de mascota'];
export const SERVICES = ['Consulta general', 'Vacunación', 'Cirugía menor', 'Desparasitación', 'Control de peso'];
export const STATUSES = ['Pendiente', 'Confirmada', 'Completada', 'Cancelada'];
export const STORAGE_KEY = 'san-marcos-admin-demo-v2';
export function localDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}
export function seedData() {
  const today = localDate();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return {
    users: INITIAL_USERS.map(user => ({
      ...user
    })),
    appointments: [{
      id: 'c1',
      pet: 'Luna',
      species: 'Perro',
      owner: 'Francisca Muñoz',
      service: 'Consulta general',
      date: today,
      time: '09:00',
      vet: 'Dra. Sofía Herrera',
      status: 'Completada'
    }, {
      id: 'c2',
      pet: 'Milo',
      species: 'Gato',
      owner: 'Matías González',
      service: 'Vacunación',
      date: today,
      time: '10:00',
      vet: 'Dr. Nicolás Vega',
      status: 'Confirmada'
    }, {
      id: 'c3',
      pet: 'Simón',
      species: 'Conejo',
      owner: 'Antonia Pérez',
      service: 'Control de peso',
      date: today,
      time: '11:30',
      vet: 'Dra. Sofía Herrera',
      status: 'Pendiente'
    }, {
      id: 'c4',
      pet: 'Nala',
      species: 'Perro',
      owner: 'Diego Silva',
      service: 'Desparasitación',
      date: today,
      time: '12:00',
      vet: 'Dra. Paula Fuentes',
      status: 'Confirmada'
    }, {
      id: 'c5',
      pet: 'Coco',
      species: 'Ave',
      owner: 'Antonia Pérez',
      service: 'Consulta general',
      date: today,
      time: '15:00',
      vet: 'Dr. Nicolás Vega',
      status: 'Pendiente'
    }, {
      id: 'c6',
      pet: 'Milo',
      species: 'Gato',
      owner: 'Matías González',
      service: 'Control de peso',
      date: localDate(tomorrow),
      time: '09:30',
      vet: 'Dra. Paula Fuentes',
      status: 'Pendiente'
    }]
  };
}

// Si no hay datos guardados, usamos los usuarios y las citas de ejemplo.
export function readData() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!data || !Array.isArray(data.users) || !Array.isArray(data.appointments)) {
      return seedData();
    }
    for (const user of data.users) {
      if (!user || typeof user.id !== 'string' || typeof user.name !== 'string' || typeof user.email !== 'string' || typeof user.active !== 'boolean' || !ROLES.includes(user.role)) {
        return seedData();
      }
    }
    const textFields = ['id', 'pet', 'species', 'owner', 'date', 'time', 'vet'];
    for (const appointment of data.appointments) {
      if (!appointment) {
        return seedData();
      }
      for (const field of textFields) {
        if (typeof appointment[field] !== 'string') {
          return seedData();
        }
      }
      if (!SERVICES.includes(appointment.service) || !STATUSES.includes(appointment.status)) {
        return seedData();
      }
    }
    return data;
  } catch {
    return seedData();
  }
}
export function downloadReport(appointments) {
  const rows = [['Mascota', 'Especie', 'Dueño', 'Servicio', 'Fecha', 'Hora', 'Veterinario', 'Estado']];
  for (const item of appointments) {
    rows.push([item.pet, item.species, item.owner, item.service, item.date, item.time, item.vet, item.status]);
  }

  // El separador y las comillas permiten abrir el archivo en Excel.
  let csv = '\uFEFF';
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const cells = [];
    for (const value of rows[rowIndex]) {
      let text = String(value);
      // Evitamos que Excel interprete el contenido como una fórmula.
      if (/^[=+@\-\t\r]/.test(text)) {
        text = "'" + text;
      }
      cells.push('"' + text.replaceAll('"', '""') + '"');
    }
    if (rowIndex > 0) {
      csv += '\r\n';
    }
    csv += cells.join(';');
  }
  const file = new Blob([csv], {
    type: 'text/csv;charset=utf-8;'
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'atenciones-san-marcos-' + localDate() + '.csv';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
