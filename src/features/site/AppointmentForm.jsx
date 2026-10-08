import { getSession } from '../auth/session'
import { localDate } from '../admin/adminData'

function AppointmentForm() {
  const user = getSession()
  return (
        <form className="contact__form" id="appointmentForm" noValidate>
          <h3>Solicita tu hora</h3>
          <div className="form-field">
            <label htmlFor="ownerName">Nombre completo</label>
            <input type="text" id="ownerName" name="ownerName" autoComplete="name" defaultValue={user?.name || ''} required />
          </div>
          <div className="form-field">
            <label htmlFor="ownerEmail">Correo electrónico</label>
            <input type="email" id="ownerEmail" name="ownerEmail" autoComplete="email" defaultValue={user?.email || ''} required />
          </div>
          <div className="form-field">
            <label htmlFor="ownerPhone">Teléfono</label>
            <input type="tel" id="ownerPhone" name="ownerPhone" autoComplete="tel" required />
          </div>
          <div className="form-field">
            <label htmlFor="petSpecies">Especie de tu mascota</label>
            <input
              type="text"
              id="petSpecies"
              name="petSpecies"
              list="petSpeciesOptions"
              autoComplete="off"
              required
            />
            <datalist id="petSpeciesOptions">
              <option value="Perro" />
              <option value="Gato" />
              <option value="Conejo" />
              <option value="Ave" />
            </datalist>
          </div>
          <div className="form-field">
            <label htmlFor="preferredDate">Fecha preferida</label>
            <input type="date" id="preferredDate" name="preferredDate" min={localDate()} required />
          </div>
          <div className="form-field">
            <label htmlFor="reason">Motivo de la consulta</label>
            <textarea id="reason" name="reason" rows="3" required></textarea>
          </div>
          <button type="submit" className="btn btn--primary">
            Enviar solicitud
          </button>
          <p className="form-status" id="formStatus" role="status" aria-live="polite"></p>
        </form>
  )
}

export default AppointmentForm

