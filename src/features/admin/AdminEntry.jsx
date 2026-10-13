import AdminPage from './AdminPage.jsx';
import { sitePath } from '../../utils/paths.js';
import { getSession } from '../auth/session';
export default function AdminEntry() {
  const user = getSession();
  if (!user) {
    window.location.replace(sitePath('login'));
    return <p role="status">Redirigiendo…</p>;
  }
  if (user.role !== 'Administrador') {
    window.location.replace(sitePath());
    return <p role="status">Redirigiendo…</p>;
  }
  return <AdminPage />;
}
