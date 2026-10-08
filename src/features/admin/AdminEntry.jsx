import AdminPage from './AdminPage.jsx';
import { getSession } from '../auth/session';
export default function AdminEntry() {
  const user = getSession();
  if (!user) {
    window.location.replace('/login');
    return <p role="status">Redirigiendo…</p>;
  }
  if (user.role !== 'Administrador') {
    window.location.replace('/');
    return <p role="status">Redirigiendo…</p>;
  }
  return <AdminPage />;
}
