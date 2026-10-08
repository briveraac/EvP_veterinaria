import { lazy, Suspense } from 'react'
import { getSession } from '../auth/session'

const AdminPage = lazy(() => import('./AdminPage.jsx'))

export default function AdminEntry() {
  const user = getSession()
  if (!user || user.role !== 'Administrador') {
    window.location.replace(user ? '/' : '/login')
    return <p role="status">Redirigiendo…</p>
  }
  return <Suspense fallback={<p role="status">Cargando administración…</p>}><AdminPage /></Suspense>
}
