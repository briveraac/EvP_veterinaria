import { useEffect } from 'react'
import { initSiteUi } from './features/site/initSiteUi'

function App() {
  useEffect(() => initSiteUi(), [])

  return (
    <>
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido principal
      </a>

      <header className="site-header">
        <div className="container header__inner">
          <a className="logo" href="#inicio" aria-label="Veterinaria San Marcos — ir al inicio">
            <span className="logo__icon" aria-hidden="true">
              🐾
            </span>
            <span className="logo__text">Veterinaria San Marcos</span>
          </a>

          <button
            type="button"
            className="nav-toggle"
            id="navToggle"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Abrir menú de navegación"
          >
            <span className="nav-toggle__bar"></span>
            <span className="nav-toggle__bar"></span>
            <span className="nav-toggle__bar"></span>
          </button>

          <nav className="main-nav" id="mainNav" aria-label="Navegación principal">
            <ul className="main-nav__list">
              <li>
                <a href="#inicio">Inicio</a>
              </li>
              <li>
                <a href="#nosotros">Sobre nosotros</a>
              </li>
              <li>
                <a href="#servicios">Servicios</a>
              </li>
              <li>
                <a href="#contacto">Contacto</a>
              </li>
              <li>
                <a className="main-nav__cta" href="#contacto">
                  Agenda tu hora
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="contenido-principal">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="container hero__inner">
            <div className="hero__text">
              <p className="hero__eyebrow">Veterinaria San Marcos · Rancagua</p>
              <h1 id="hero-title">Cuidado veterinario cercano y de confianza para tu mascota</h1>
              <p className="hero__subtitle">
                Desde 2009 acompañamos a las familias de Rancagua en el cuidado de perros, gatos,
                conejos y aves, con consultas generales, vacunación, cirugía menor,
                desparasitación y control de peso.
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
                <a className="btn btn--primary" href="#contacto">
                  Agenda tu hora
                </a>
                <a className="btn btn--secondary" href="#servicios">
                  Conoce nuestros servicios
                </a>
              </div>
            </div>
            <div className="hero__media">
              <img
                src="assets/img/hero-veterinaria.jpg"
                alt="Equipo veterinario de Veterinaria San Marcos atendiendo a una mascota"
                width="640"
                height="480"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <section className="about" id="nosotros" aria-labelledby="about-title">
          <div className="container about__inner">
            <div className="about__text">
              <h2 id="about-title">Sobre nosotros</h2>
              <p>
                Somos una clínica veterinaria fundada en 2009 en Rancagua, dedicada al cuidado de
                perros, gatos, conejos y aves. Atendemos alrededor de 25 pacientes al día,
                acompañando a las familias de la comuna con un trato cercano y profesional.
              </p>
              <p>
                Nuestro equipo está compuesto por médicos veterinarios y personal técnico y
                administrativo capacitado para brindar una atención integral, desde la consulta
                general hasta el seguimiento de tratamientos y vacunas.
              </p>
              <ul className="about__facts">
                <li>
                  Fundada en <strong>2009</strong>
                </li>
                <li>3 médicos veterinarios</li>
                <li>1 técnico veterinario</li>
                <li>1 recepcionista administrativa</li>
              </ul>
            </div>
            <div className="about__media">
              <video controls preload="none" poster="assets/img/video-poster.jpg" width="640" height="360">
                <source src="assets/video/conoce-la-clinica.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video. Puedes{' '}
                <a href="assets/video/conoce-la-clinica.mp4">descargar el video aquí</a>.
              </video>
            </div>
          </div>
        </section>

        <section className="services" id="servicios" aria-labelledby="services-title">
          <div className="container">
            <h2 id="services-title">Nuestros servicios</h2>
            <p className="services__intro">
              Atendemos perros, gatos, conejos y aves, con el respaldo de 3 médicos veterinarios y
              1 técnico veterinario.
            </p>
            <div className="services__grid">
              <article className="service-card">
                <img className="service-card__icon" src="assets/img/icon-consulta.svg" alt="" width="48" height="48" />
                <h3>Consultas generales</h3>
                <p>
                  Evaluación integral de la salud de tu mascota: revisión clínica, diagnóstico y
                  orientación sobre su cuidado.
                </p>
              </article>
              <article className="service-card">
                <img className="service-card__icon" src="assets/img/icon-vacunacion.svg" alt="" width="48" height="48" />
                <h3>Vacunación</h3>
                <p>
                  Plan de vacunación según especie y edad, para prevenir enfermedades y mantener al
                  día el carnet de tu mascota.
                </p>
              </article>
              <article className="service-card">
                <img className="service-card__icon" src="assets/img/icon-cirugia.svg" alt="" width="48" height="48" />
                <h3>Cirugía menor</h3>
                <p>
                  Procedimientos quirúrgicos ambulatorios de baja complejidad, realizados por
                  nuestro equipo veterinario.
                </p>
              </article>
              <article className="service-card">
                <img
                  className="service-card__icon"
                  src="assets/img/icon-desparasitacion.svg"
                  alt=""
                  width="48"
                  height="48"
                />
                <h3>Desparasitación</h3>
                <p>
                  Control de parásitos internos y externos para proteger la salud de tu mascota y
                  de tu familia.
                </p>
              </article>
              <article className="service-card">
                <img
                  className="service-card__icon"
                  src="assets/img/icon-control-peso.svg"
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

        <section className="contact" id="contacto" aria-labelledby="contact-title">
          <div className="container contact__inner">
            <div className="contact__info">
              <h2 id="contact-title">Contacto y ubicación</h2>
              <p>
                El informe del proyecto no incluye una dirección, teléfono, correo ni horario
                específicos, por lo que estos datos quedan marcados como pendientes de confirmar
                por la veterinaria.
              </p>
              <address>
                <p>
                  <span aria-hidden="true">📍</span> [COMPLETAR: dirección exacta] — Rancagua,
                  Región de O'Higgins, Chile
                </p>
                <p>
                  <span aria-hidden="true">📞</span>{' '}
                  <a href="#">[COMPLETAR: teléfono de contacto]</a>
                </p>
                <p>
                  <span aria-hidden="true">✉️</span> <a href="#">[COMPLETAR: correo electrónico]</a>
                </p>
                <p>
                  <span aria-hidden="true">🕒</span> [COMPLETAR: horario de atención]
                </p>
              </address>

              <div
                className="contact__map"
                aria-label="Mapa de ubicación referencial de Veterinaria San Marcos en Rancagua"
              >
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
      </main>

      <footer className="site-footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <p className="logo__text">Veterinaria San Marcos</p>
            <p>Cuidando a tus mascotas en Rancagua desde 2009.</p>
          </div>

          <nav className="footer__nav" aria-label="Enlaces del pie de página">
            <ul>
              <li>
                <a href="#inicio">Inicio</a>
              </li>
              <li>
                <a href="#nosotros">Sobre nosotros</a>
              </li>
              <li>
                <a href="#servicios">Servicios</a>
              </li>
              <li>
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </nav>

          <div className="footer__contact">
            <p>[COMPLETAR: dirección exacta], Rancagua</p>
            <p>[COMPLETAR: teléfono]</p>
            <p>[COMPLETAR: correo electrónico]</p>
          </div>

          <div className="footer__social">
            <a
              href="#"
              aria-label="Instagram de Veterinaria San Marcos (pendiente: agregar enlace real)"
            >
              Instagram
            </a>
            <a
              href="#"
              aria-label="Facebook de Veterinaria San Marcos (pendiente: agregar enlace real)"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © <span id="year"></span> Veterinaria San Marcos. Todos los derechos reservados.
          </p>
          <button type="button" className="back-to-top" id="backToTop" aria-label="Volver arriba">
            ↑
          </button>
        </div>
      </footer>
    </>
  )
}

export default App
