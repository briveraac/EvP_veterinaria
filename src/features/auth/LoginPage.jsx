import { useEffect, useState } from 'react';
import { signIn } from './session';
import { sitePath } from '../../utils/paths.js';
const DEMO_PASSWORD = 'SanMarcos2026!';
export default function LoginPage() {
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    document.title = 'Iniciar sesión | Veterinaria San Marcos';
  }, []);
  // El backend revisa la contraseña y devuelve un token JWT.
  async function submit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    const fields = new FormData(event.currentTarget);
    if (!fields.get('email').trim() || !fields.get('password')) {
      setError('Ingresa tu correo y tu contraseña.');
      setLoading(false);
      return;
    }
    try {
      const account = await signIn(fields.get('email'), fields.get('password'));
      // Administrador y Recepcionista pueden elegir ir al panel.
      if (account.role === 'Administrador' || account.role === 'Recepcionista') {
        setUser(account);
      } else window.location.assign(sitePath());
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }
  return <main className="access-page" id="contenido-principal">
    <div className="container">
      <a className="page-back" href={sitePath()}>← Volver a la página principal</a>
      <div className="access-layout">
        <section className="access-intro">
          <a className="logo" href={sitePath()}>
            <span className="logo__icon" aria-hidden="true">🐾</span>
            <span className="logo__text">Veterinaria San Marcos</span>
          </a>
          <p className="hero__eyebrow">Cerca de ti y de tu mascota</p>
          <h1>Un lugar para cuidar lo que más quieres.</h1>
          <p>Accede a tu cuenta y sigue acompañándonos en el cuidado de tu mascota.</p>
          <img src={sitePath('assets/img/hero-veterinaria.png')} alt="Equipo veterinario atendiendo a una mascota" width="640" height="480" />
        </section>
        <section className="access-card" aria-labelledby="login-title">
          {user ? <>
            <p className="hero__eyebrow">Cuenta de {user.role.toLowerCase()}</p>
            <h2 id="login-title">Hola, {user.name}</h2>
            <p>Tu sesión está lista. ¿Dónde quieres continuar?</p>
            <a className="btn btn--primary" href={`${sitePath('admin')}#resumen`}>Ir al panel de administración</a>
            <a className="btn btn--secondary" href={sitePath()}>Ir a la página principal</a>
          </> : <>
            <p className="hero__eyebrow">Bienvenido de nuevo</p>
            <h2 id="login-title">Iniciar sesión</h2>
            <p>Ingresa tus datos para continuar.</p>
            <form className="access-form" onSubmit={submit} noValidate>
              <div className="form-field">
                <label htmlFor="login-email">Correo electrónico</label>
                <input id="login-email" name="email" type="email" autoComplete="username" placeholder="tu@correo.cl" required />
              </div>
              <div className="form-field">
                <label htmlFor="login-password">Contraseña</label>
                <input id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required />
                <button className="password-toggle" type="button" aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}</button>
              </div>
              {error && <p className="form-status--error" role="alert">{error}</p>}
              <button className="btn btn--primary" type="submit" disabled={loading}>{loading ? 'Ingresando…' : 'Ingresar'}</button>
            </form>
            <details className="demo-credentials">
              <summary>Accesos de demostración</summary>
              <p>Administrador: brun.rivera@duocuc.cl o germ.pino@duocuc.cl</p>
              <p>Recepcionista: recepcion@sanmarcos.cl</p>
              <p>Dueño de mascota: cliente@sanmarcos.cl</p>
              <p>Contraseña: <code>{DEMO_PASSWORD}</code></p>
              <p>El backend valida la contraseña y entrega un token JWT.</p>
            </details>
          </>}
        </section>
      </div>
    </div>
  </main>;
}
