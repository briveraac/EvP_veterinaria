import { getSession, signOut } from '../../features/auth/session'

function Header() {
  const user = getSession()
  return (
    <header className="site-header">
      <div className="container header__inner">
        <a className="logo" href="/#inicio" aria-label="Veterinaria San Marcos — ir al inicio">
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
            {user?.role === 'Administrador' && <li><a href="/admin#resumen">Panel admin</a></li>}
            <li>{user ? <button type="button" onClick={signOut}>Cerrar sesión</button> : <a href="/login">Iniciar sesión</a>}</li>
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
            <li>
              <a className="main-nav__cta" href="/agendar">
                Agenda tu hora
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
