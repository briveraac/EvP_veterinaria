import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AdminEntry from './features/admin/AdminEntry.jsx'
import LoginPage from './features/auth/LoginPage.jsx'
import AppointmentPage from './features/site/AppointmentPage.jsx'
import './styles/main.css'

createRoot(document.getElementById('root')).render(
  /^\/admin(?:\/|$)/.test(window.location.pathname)
    ? <AdminEntry />
    : /^\/login\/?$/.test(window.location.pathname) ? <LoginPage />
      : /^\/agendar\/?$/.test(window.location.pathname) ? <AppointmentPage /> : <App />,
)
