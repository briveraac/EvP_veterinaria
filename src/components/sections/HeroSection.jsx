function HeroSection() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow">Veterinaria San Marcos · Rancagua</p>
          <h1 id="hero-title">Cuidado veterinario cercano y de confianza para tu mascota</h1>
          <p className="hero__subtitle">
            Desde 2009 acompañamos a las familias de Rancagua en el cuidado de perros, gatos,
            conejos y aves, con consultas generales, vacunación, cirugía menor, desparasitación y
            control de peso.
          </p>
          <ul className="hero__stats">
            <li>
              <strong>2009</strong>
              <span>Atendiendo a la comunidad</span>
            </li>
            <li>
              <strong>3</strong>
              <span>Médicos veterinarios</span>
            </li>
            <li>
              <strong>~25</strong>
              <span>Pacientes atendidos al día</span>
            </li>
          </ul>
          <div className="hero__actions">
            <a className="btn btn--primary" href="/agendar">
              Agenda tu hora
            </a>
            <a className="btn btn--secondary" href="#servicios">
              Conoce nuestros servicios
            </a>
          </div>
        </div>
        <div className="hero__media">
          <img
            src="assets/img/hero-veterinaria.png"
            alt="Equipo veterinario de Veterinaria San Marcos atendiendo a una mascota"
            width="640"
            height="480"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
