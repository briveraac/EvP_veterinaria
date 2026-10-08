function ContactSection() {
  return (
    <section className="contact" id="contacto" aria-labelledby="contact-title">
      <div className="container contact__inner">
        <div className="contact__info">
          <h2 id="contact-title">Contacto y ubicación</h2>
          <p>
            El informe del proyecto no incluye una dirección, teléfono, correo ni horario
            específicos, por lo que estos datos quedan marcados como pendientes de confirmar por la
            veterinaria.
          </p>
          <address>
            <p>
              <span aria-hidden="true">📍</span> [Plaza de los Héroes 445, Rancagua] — Rancagua, Región
              de O'Higgins, Chile
            </p>
            <p>
              <span aria-hidden="true">📞</span> <a href="#">[+56 2 3212 3456 ]</a>
            </p>
            <p>
              <span aria-hidden="true">✉️</span> <a href="#">[clinica.evpveterinaria@gmail.com]</a>
            </p>
            <p>
              <span aria-hidden="true">🕒</span> [Lunes a Viernes: 09:00 a 19:30 hrs. 
                                                  Sábado: 10:00 a 15:00 hrs
                                                  .Domingo y Festivos: Cerrado.]
            </p>
          </address>

          <div className="contact__map" aria-label="Mapa de ubicación referencial de Veterinaria San Marcos en Rancagua">
            <div className="map-embed">
              <iframe
                title="Ubicación referencial de Veterinaria San Marcos en Rancagua"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-70.7644%2C-34.1808%2C-70.7244%2C-34.1608&amp;layer=mapnik&amp;marker=-34.1708%2C-70.7444"
                loading="lazy"
                width="100%"
                height="300"
                style={{ border: 0 }}
              ></iframe>
              <button type="button" className="map-embed__overlay" id="mapOverlay">
                Haz clic para interactuar con el mapa
              </button>
            </div>
            <p className="map-disclaimer">
              Ubicación referencial (centro de Rancagua). Se actualizará con la dirección exacta
              cuando esté disponible.
            </p>
          </div>
        </div>

        <form className="contact__form" id="appointmentForm" noValidate>
          <h3>Solicita tu hora</h3>
          <div className="form-field">
            <label htmlFor="ownerName">Nombre completo</label>
            <input type="text" id="ownerName" name="ownerName" autoComplete="name" required />
          </div>
          <div className="form-field">
            <label htmlFor="ownerEmail">Correo electrónico</label>
            <input type="email" id="ownerEmail" name="ownerEmail" autoComplete="email" required />
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
            <input type="date" id="preferredDate" name="preferredDate" required />
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
      </div>
    </section>
  )
}

export default ContactSection