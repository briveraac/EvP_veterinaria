import { lazy, Suspense } from 'react'

const AdminPage = lazy(() => import('./AdminPage.jsx'))

export default function AdminEntry() {
  return <Suspense fallback={<p role="status">Cargando administración…</p>}><AdminPage /></Suspense>
}
