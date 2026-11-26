import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AdminEntry from './features/admin/AdminEntry.jsx';
import LoginPage from './features/auth/LoginPage.jsx';
import AppointmentPage from './features/site/AppointmentPage.jsx';
import { scheduleRenewal } from './features/auth/session.js';
import { BASE_URL } from './utils/paths.js';
import './styles/main.css';

// Si hay sesión, renovamos el token JWT 5 minutos antes de que venza.
scheduleRenewal();

// Elegimos la página según la dirección del navegador.
const path = window.location.pathname.replace(BASE_URL.replace(/\/$/, ''), '') || '/';
let page = <App />;
if (path === '/admin' || path.startsWith('/admin/')) {
  page = <AdminEntry />;
} else if (path === '/login' || path === '/login/') {
  page = <LoginPage />;
} else if (path === '/agendar' || path === '/agendar/') {
  page = <AppointmentPage />;
}
createRoot(document.getElementById('root')).render(page);
