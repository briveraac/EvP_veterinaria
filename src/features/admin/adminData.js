export const ROLES = ['Administrador', 'Recepcionista', 'Dueño de mascota'];
export const SERVICES = ['Consulta general', 'Vacunación', 'Cirugía menor', 'Desparasitación', 'Control de peso'];
export const STATUSES = ['Pendiente', 'Confirmada', 'Completada', 'Cancelada'];
export function localDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}
// Revisa que la cita no sea en el pasado y que esté dentro del horario de atención:
// lunes a viernes de 09:00 a 19:30, sábado de 10:00 a 15:00, domingo cerrado.
// Devuelve el mensaje de error o '' si está bien. (Las mismas reglas que CitaService en el backend.)
export function checkSchedule(date, time, now = new Date()) {
  const day = new Date(date + 'T12:00:00').getDay(); // 0 = domingo, 6 = sábado
  const currentTime = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  if (date < localDate(now) || (date === localDate(now) && time < currentTime)) {
    return 'No se puede agendar una cita en una fecha u hora que ya pasó.';
  }
  if (day === 0) {
    return 'Los domingos la clínica está cerrada.';
  }
  let opens = '09:00';
  let closes = '19:30';
  if (day === 6) {
    opens = '10:00';
    closes = '15:00';
  }
  if (time < opens || time >= closes) {
    return 'Fuera del horario de atención. Lunes a viernes de 09:00 a 19:30 y sábado de 10:00 a 15:00.';
  }
  return '';
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
