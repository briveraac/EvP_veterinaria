import AdminPage from './AdminPage.jsx';
import { sitePath } from '../../utils/paths.js';
import { getSession } from '../auth/session';

// Roles que pueden entrar al panel.
const PANEL_ROLES = ['Administrador', 'Recepcionista'];

// Revisa la sesión y el rol antes de mostrar el panel.
// Esto es para la interfaz: aunque alguien se salte esta pantalla,
// el backend igual rechaza sus peticiones (401 o 403).
export default function AdminEntry() {
  const user = getSession();
  if (!user) {
    window.location.replace(sitePath('login'));
    return <p role="status">Redirigiendo…</p>;
  }
  if (!PANEL_ROLES.includes(user.role)) {
    window.location.replace(sitePath());
    return <p role="status">Redirigiendo…</p>;
  }
  return <AdminPage user={user} />;
}
