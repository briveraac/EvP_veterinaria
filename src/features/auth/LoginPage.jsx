import { useEffect, useState } from 'react'
import { DEMO_PASSWORD, signIn } from './session'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  useEffect(() => { document.title = 'Iniciar sesión | Veterinaria San Marcos' }, [])

  function submit(event) {
    event.preventDefault()
    setError('')
    const fields = new FormData(event.currentTarget)
    try {
      const account = signIn(fields.get('email'), fields.get('password'))
      if (account.role === 'Administrador') setUser(account)
      else window.location.assign('/')
    } catch (err) { setError(err.message) }
  }

  return <main className="access-page" id="contenido-principal">
    <div className="container">
      <a className="page-back" href="/">← Volver a la página principal</a>
      <div className="access-layout">
        <section className="access-intro">
          <a className="logo" href="/"><span className="logo__icon" aria-hidden="true">🐾</span><span className="logo__text">Veterinaria San Marcos</span></a>
          <p className="hero__eyebrow">Cerca de ti y de tu mascota</p>
          <h1>Un lugar para cuidar lo que más quieres.</h1>
          <p>Accede a tu cuenta y sigue acompañándonos en el cuidado de tu mascota.</p>
          <img src="/assets/img/hero-veterinaria.png" alt="Equipo veterinario atendiendo a una mascota" width="640" height="480" />
        </section>
        <section className="access-card" aria-labelledby="login-title">
          {user ? <>
            <p className="hero__eyebrow">Cuenta de administrador</p>
            <h2 id="login-title">Hola, {user.name}</h2>
            <p>Tu sesión está lista. ¿Dónde quieres continuar?</p>
            <a className="btn btn--primary" href="/admin#resumen">Ir al panel de administración</a>
            <a className="btn btn--secondary" href="/">Ir a la página principal</a>
          </> : <>
            <p className="hero__eyebrow">Bienvenido de nuevo</p>
            <h2 id="login-title">Iniciar sesión</h2>
            <p>Ingresa tus datos para continuar.</p>
            <form className="access-form" onSubmit={submit}>
              <div className="form-field"><label htmlFor="login-email">Correo electrónico</label><input id="login-email" name="email" type="email" autoComplete="username" placeholder="tu@correo.cl" required /></div>
              <div className="form-field"><label htmlFor="login-password">Contraseña</label><input id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required /><button className="password-toggle" type="button" aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}</button></div>
              {error && <p className="form-status--error" role="alert">{error}</p>}
              <button className="btn btn--primary" type="submit">Ingresar</button>
            </form>
            <details className="demo-credentials"><summary>Accesos de demostración</summary><p>Administrador: brun.rivera@duocuc.cl o germ.pino@duocuc.cl</p><p>Usuario: cliente@sanmarcos.cl</p><p>Contraseña: <code>{DEMO_PASSWORD}</code></p><p>Los datos y la sesión se guardan en este navegador.</p></details>
          </>}
        </section>
      </div>
    </div>
  </main>
}
