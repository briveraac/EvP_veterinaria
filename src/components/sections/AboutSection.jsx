function AboutSection() {
  return (
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
            administrativo capacitado para brindar una atención integral, desde la consulta general
            hasta el seguimiento de tratamientos y vacunas.
          </p>
          <ul className="about__facts">
            <li>
              Fundada en <strong>2009</strong>
            </li>
            <li>3 médicos veterinarios</li>
            <li>1 técnico veterinario</li>
            <li>2 Administradores</li>
          </ul>
        </div>
        <div className="about__media">
          <video controls preload="none" poster="assets/img/video-poster.jpg" width="640" height="360">
            <source src="assets/video/presentacion_veterinaria.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de video. Puedes{' '}
            <a href="assets/video/conoce-la-clinica.mp4">descargar el video aquí</a>.
          </video>
        </div>
      </div>
    </section>
  )
}

export default AboutSection