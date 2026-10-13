import { getSession, signOut } from '../../features/auth/session'
import { sitePath } from '../../utils/paths.js'

function Header() {
  const user = getSession()
  return (
    <header className="site-header">
      <div className="container header__inner">
        <a className="logo" href={`${sitePath()}#inicio`} aria-label="Veterinaria San Marcos — ir al inicio">
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
            {user?.role === 'Administrador' && <li><a href={`${sitePath('admin')}#resumen`}>Panel admin</a></li>}
            <li>{user ? <button type="button" onClick={signOut}>Cerrar sesión</button> : <a href={sitePath('login')}>Iniciar sesión</a>}</li>
            <li>
              <a href={`${sitePath()}#inicio`}>Inicio</a>
            </li>
            <li>
              <a href={`${sitePath()}#nosotros`}>Sobre nosotros</a>
            </li>
            <li>
              <a href={`${sitePath()}#servicios`}>Servicios</a>
            </li>
            <li>
              <a href={`${sitePath()}#contacto`}>Contacto</a>
            </li>
            <li>
              <a className="main-nav__cta" href={sitePath('agendar')}>
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
