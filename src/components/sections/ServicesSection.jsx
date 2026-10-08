function ServicesSection() {
  return (
    <section className="services" id="servicios" aria-labelledby="services-title">
      <div className="container">
        <h2 id="services-title">Nuestros servicios</h2>
        <p className="services__intro">
          Atendemos perros, gatos, conejos y aves, con el respaldo de 3 médicos veterinarios y 1
          técnico veterinario.
        </p>
        <div className="services__grid">
          <article className="service-card">
            <img className="service-card__icon" src="assets/img/icon-consulta.png" alt="" width="48" height="48" />
            <h3>Consultas generales</h3>
            <p>
              Evaluación integral de la salud de tu mascota: revisión clínica, diagnóstico y
              orientación sobre su cuidado.
            </p>
          </article>
          <article className="service-card">
            <img className="service-card__icon" src="assets/img/icon-vacunacion.png" alt="" width="48" height="48" />
            <h3>Vacunación</h3>
            <p>
              Plan de vacunación según especie y edad, para prevenir enfermedades y mantener al día
              el carnet de tu mascota.
            </p>
          </article>
          <article className="service-card">
            <img className="service-card__icon" src="assets/img/icon-cirugia.png" alt="" width="48" height="48" />
            <h3>Cirugía menor</h3>
            <p>
              Procedimientos quirúrgicos ambulatorios de baja complejidad, realizados por nuestro
              equipo veterinario.
            </p>
          </article>
          <article className="service-card">
            <img
              className="service-card__icon"
              src="assets/img/icon-desparasitacion.png"
              alt=""
              width="48"
              height="48"
            />
            <h3>Desparasitación</h3>
            <p>
              Control de parásitos internos y externos para proteger la salud de tu mascota y de tu
              familia.
            </p>
          </article>
          <article className="service-card">
            <img
              className="service-card__icon"
              src="assets/img/icon-control-peso.png"
              alt=""
              width="48"
              height="48"
            />
            <h3>Control de peso</h3>
            <p>
              Seguimiento nutricional y de peso para prevenir la obesidad y otras enfermedades
              asociadas.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection