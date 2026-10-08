import { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SkipLink from '../../components/layout/SkipLink';
import AppointmentForm from './AppointmentForm.jsx';
import { initSiteUi } from './initSiteUi';
export default function AppointmentPage() {
  useEffect(() => {
    document.title = 'Agendar hora | Veterinaria San Marcos';
    return initSiteUi();
  }, []);
  return <>
    <SkipLink />
    <Header />
    <main id="contenido-principal" className="appointment-page">
      <div className="container">
        <a className="page-back" href="/">← Volver a la página principal</a>
        <div className="appointment-layout">
          <section className="appointment-intro" aria-labelledby="appointment-title">
            <p className="hero__eyebrow">Estamos para acompañarte</p>
            <h1 id="appointment-title">Agenda una hora para tu mascota</h1>
            <p>Cuéntanos qué necesita y elige la fecha que te acomode.</p>
            <ul>
              <li>1. Completa tus datos y los de tu mascota.</li>
              <li>2. Indica la fecha y el motivo de consulta.</li>
              <li>3. Una solicitud requiere confirmación de la clínica.</li>
            </ul>
            <p>Atendemos perros, gatos, conejos y aves.</p>
            <p>Este formulario es una demostración: no envía solicitudes a la clínica.</p>
          </section>
          <AppointmentForm />
        </div>
      </div>
    </main>
    <Footer />
  </>;
}
