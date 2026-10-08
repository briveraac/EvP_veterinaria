import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AdminEntry from './features/admin/AdminEntry.jsx'
import './styles/main.css'

createRoot(document.getElementById('root')).render(
  /^\/admin(?:\/|$)/.test(window.location.pathname)
    ? <AdminEntry />
    : <App />,
)
