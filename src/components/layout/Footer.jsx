function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="logo__text">Veterinaria San Marcos</p>
          <p>Cuidando a tus mascotas en Rancagua desde 2009.</p>
        </div>

        <nav className="footer__nav" aria-label="Enlaces del pie de página">
          <ul>
            <li>
              <a href="/#inicio">Inicio</a>
            </li>
            <li>
              <a href="/#nosotros">Sobre nosotros</a>
            </li>
            <li>
              <a href="/#servicios">Servicios</a>
            </li>
            <li>
              <a href="/#contacto">Contacto</a>
            </li>
          </ul>
        </nav>

        <div className="footer__contact">
          <p>[Plaza de los Héroes 445, Rancagua], Rancagua</p>
          <p>[+56 2 3212 3456]</p>
          <p>[clinica.evpveterinaria@gmail.com]</p>
        </div>

        <div className="footer__social">
          <a href="#" aria-label="Instagram de Veterinaria San Marcos (pendiente: agregar enlace real)">
            Instagram
          </a>
          <a href="#" aria-label="Facebook de Veterinaria San Marcos (pendiente: agregar enlace real)">
            Facebook
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © <span>{new Date().getFullYear()}</span> Veterinaria San Marcos. Todos los derechos reservados.
        </p>
        <button type="button" className="back-to-top" id="backToTop" aria-label="Volver arriba">
          ↑
        </button>
      </div>
    </footer>
  )
}

export default Footer
