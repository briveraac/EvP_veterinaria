import { useEffect, useState } from 'react'
import AdminEditor from './AdminEditor'
import AdminIcon from './AdminIcon'
import { downloadReport, localDate, readData, ROLES, SERVICES, STATUSES, STORAGE_KEY } from './adminData'
import './admin.css'

const navigation = [
  { id: 'resumen', label: 'Resumen', icon: 'grid' },
  { id: 'usuarios', label: 'Usuarios', icon: 'users' },
  { id: 'citas', label: 'Citas', icon: 'calendar' },
  { id: 'reportes', label: 'Reportes', icon: 'chart' },
]
const titles = { resumen: ['Todo listo para cuidar mejor.', 'Un vistazo a lo que pasa en Veterinaria San Marcos.'], usuarios: ['Usuarios del sistema', 'Gestiona las personas, sus roles y accesos desde un solo lugar.'], citas: ['Una agenda, todo el equipo.', 'Consulta, confirma y organiza las atenciones de la clínica.'], reportes: ['Los datos cuentan la historia.', 'Revisa las atenciones por período y descarga tu reporte.'] }
const initials = name => name.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase()
const dateLabel = date => new Date(`${date}T12:00:00`).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })
const statusClass = status => ({ Activo: 'green', Inactivo: 'gray', Confirmada: 'green', Pendiente: 'orange', Completada: 'blue', Cancelada: 'gray' })[status]
const currentView = () => navigation.some(item => item.id === window.location.hash.slice(1)) ? window.location.hash.slice(1) : 'resumen'

function Badge({ children }) { return <span className={`admin-badge admin-badge-${statusClass(children) || 'gray'}`}><span />{children}</span> }
function Empty({ text }) { return <div className="admin-empty"><AdminIcon name="search" size={30} /><h3>No hay resultados</h3><p>{text}</p></div> }

export default function AdminPage() {
  const [view, setView] = useState(currentView)
  const [data, setData] = useState(readData)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [menuOpen, setMenuOpen] = useState(false)
  const [editor, setEditor] = useState(null)
  const [notice, setNotice] = useState('')
  const [storageError, setStorageError] = useState(false)
  const [reportStart, setReportStart] = useState(() => `${localDate().slice(0, 7)}-01`)
  const [reportEnd, setReportEnd] = useState(localDate)
  const [agendaDate, setAgendaDate] = useState('')
  const today = localDate()

  useEffect(() => {
    const handleHash = () => {
      if (!navigation.some(item => item.id === window.location.hash.slice(1))) return
      setView(currentView()); setSearch(''); setFilter('Todos'); setMenuOpen(false)
    }
    window.addEventListener('hashchange', handleHash)
    const title = document.title
    document.title = 'Administración | Veterinaria San Marcos'
    return () => { window.removeEventListener('hashchange', handleHash); document.title = title }
  }, [])
  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(''), 5000)
    return () => clearTimeout(timer)
  }, [notice])
  useEffect(() => {
    if (!menuOpen) return
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        document.querySelector('.admin-menu-button')?.focus()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [menuOpen])

  function persist(next, message) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setStorageError(false) }
    catch { setStorageError(true) }
    setData(next)
    setNotice(message)
  }
  function save(item) {
    const collection = editor.type === 'user' ? 'users' : 'appointments'
    if (collection === 'users') {
      if (data.users.some(user => user.id !== item.id && user.email.toLowerCase() === item.email.toLowerCase())) return 'Ya existe un usuario con ese correo electrónico.'
      if (!data.users.some(user => user.id !== item.id && user.active && user.role === 'Administrador') && (!item.active || item.role !== 'Administrador')) return 'Debe quedar al menos un administrador activo en el sistema.'
    } else if (item.status !== 'Cancelada' && data.appointments.some(appointment => appointment.id !== item.id && appointment.status !== 'Cancelada' && appointment.date === item.date && appointment.time === item.time && appointment.vet === item.vet)) return 'El veterinario ya tiene una cita en esa fecha y hora.'
    const exists = data[collection].some(record => record.id === item.id)
    persist({ ...data, [collection]: exists ? data[collection].map(record => record.id === item.id ? item : record) : [...data[collection], item] }, 'Cambios guardados correctamente.')
    setEditor(null)
  }
  function toggleUser(user) {
    if (user.active && user.role === 'Administrador' && data.users.filter(item => item.active && item.role === 'Administrador').length === 1) { setNotice('Debe quedar al menos un administrador activo.'); return }
    persist({ ...data, users: data.users.map(item => item.id === user.id ? { ...item, active: !item.active } : item) }, `Usuario ${user.active ? 'desactivado' : 'activado'}.`)
  }
  function confirmAppointment(appointment) {
    persist({ ...data, appointments: data.appointments.map(item => item.id === appointment.id ? { ...item, status: 'Confirmada' } : item) }, 'Cita confirmada.')
  }
  const query = search.trim().toLocaleLowerCase('es')
  const users = data.users.filter(user => `${user.name} ${user.email}`.toLocaleLowerCase('es').includes(query) && (filter === 'Todos' || user.role === filter))
  const appointments = [...data.appointments].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
  const filteredAppointments = appointments.filter(item => `${item.pet} ${item.owner} ${item.vet} ${item.service}`.toLocaleLowerCase('es').includes(query) && (filter === 'Todos' || item.status === filter) && (!agendaDate || item.date === agendaDate))
  const todayAppointments = appointments.filter(item => item.date === today)
  const pending = appointments.filter(item => item.status === 'Pendiente')
  const invalidPeriod = reportStart > reportEnd
  const report = invalidPeriod || !reportStart || !reportEnd ? [] : appointments.filter(item => item.date >= reportStart && item.date <= reportEnd)
  const complete = report.filter(item => item.status === 'Completada').length
  const activeUsers = data.users.filter(user => user.active).length
  const stats = [{ label: 'Citas de hoy', value: todayAppointments.filter(item => item.status !== 'Cancelada').length, detail: 'Agenda del día', icon: 'calendar', tone: 'green' }, { label: 'Por confirmar', value: pending.length, detail: 'Solicitudes pendientes', icon: 'clock', tone: 'orange' }, { label: 'Usuarios activos', value: activeUsers, detail: `${data.users.length} usuarios registrados`, icon: 'users', tone: 'blue' }, { label: 'Atenciones de hoy', value: todayAppointments.filter(item => item.status === 'Completada').length, detail: 'Consultas completadas', icon: 'check', tone: 'purple' }]

  function appointmentTable(items, compact = false) {
    return items.length ? <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th scope="col">Mascota / dueño</th><th scope="col">Servicio</th><th scope="col">{compact ? 'Hora' : 'Fecha / hora'}</th><th scope="col">Estado</th><th scope="col"><span className="admin-sr-only">Acciones</span></th></tr></thead><tbody>{items.map(item => <tr key={item.id}><td><div className="admin-person"><span className={`admin-avatar admin-pet-${item.species}`}><AdminIcon name="paw" size={19} /></span><div><strong>{item.pet} <small className="admin-species">{item.species}</small></strong><span>{item.owner}</span></div></div></td><td><strong>{item.service}</strong><span className="admin-cell-subtitle">{item.vet}</span></td><td>{!compact && <span className="admin-cell-subtitle">{dateLabel(item.date)}</span>}<strong>{item.time}</strong></td><td><Badge>{item.status}</Badge></td><td><div className="admin-row-actions">{item.status === 'Pendiente' && <button className="admin-icon-button admin-confirm" onClick={() => confirmAppointment(item)} aria-label={`Confirmar cita de ${item.pet}`} title="Confirmar cita"><AdminIcon name="check" size={18} /></button>}<button className="admin-icon-button" onClick={() => setEditor({ type: 'appointment', item })} aria-label={`Editar cita de ${item.pet}`} title="Editar o reagendar"><AdminIcon name="edit" size={18} /></button></div></td></tr>)}</tbody></table></div> : <Empty text="No hay citas para esta selección. Puedes crear una nueva atención." />
  }

  return (
    <div className="admin-app">
      <a className="skip-link" href="#admin-content">Saltar al contenido</a>
      {menuOpen && <button className="admin-menu-backdrop" aria-label="Cerrar navegación" onClick={() => setMenuOpen(false)} />}
      <aside id="admin-navigation" className={`admin-sidebar ${menuOpen ? 'is-open' : ''}`}>
        <a href="/admin" className="admin-brand"><span className="admin-brand-mark"><AdminIcon name="paw" size={26} /></span><span>San Marcos<small>VETERINARIA</small></span></a>
        <div className="admin-sidebar-label">ESPACIO DE TRABAJO</div>
        <nav aria-label="Administración">{navigation.map(item => <a href={`#${item.id}`} key={item.id} className={`admin-nav-item ${view === item.id ? 'is-active' : ''}`} aria-current={view === item.id ? 'page' : undefined}><AdminIcon name={item.icon} /><span>{item.label}</span>{item.id === 'citas' && pending.length > 0 && <span className="admin-nav-count">{pending.length}</span>}</a>)}</nav>
        <div className="admin-sidebar-bottom"><div className="admin-care-card"><span className="admin-care-icon"><AdminIcon name="shield" size={24} /></span><strong>Una clínica más conectada</strong><p>Todo tu equipo, al cuidado de quienes más importan.</p></div><a href="/" className="admin-nav-item"><AdminIcon name="external" /><span>Ver sitio web</span></a><div className="admin-profile"><span className="admin-avatar">SM</span><div><strong>Administración</strong><span>Veterinaria San Marcos</span></div></div></div>
      </aside>
      <div className="admin-workspace">
        <header className="admin-topbar"><div className="admin-topbar-left"><button className="admin-icon-button admin-menu-button" aria-label="Abrir navegación" aria-expanded={menuOpen} aria-controls="admin-navigation" onClick={() => setMenuOpen(!menuOpen)}><AdminIcon name="menu" /></button><span className="admin-breadcrumb">Administración <AdminIcon name="chevron" size={14} /> <strong>{navigation.find(item => item.id === view).label}</strong></span></div><span className="admin-topbar-date"><AdminIcon name="calendar" size={17} />{new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}</span></header>
        <main id="admin-content" className="admin-main" tabIndex={-1}>
          <div className="admin-page-heading"><div><span className="admin-eyebrow">SAN MARCOS · PANEL DE ADMINISTRACIÓN</span><h1>{titles[view][0]}</h1><p>{titles[view][1]}</p></div>{view !== 'reportes' && <button className="admin-button" onClick={() => setEditor({ type: view === 'usuarios' ? 'user' : 'appointment' })}><AdminIcon name="plus" size={18} />{view === 'usuarios' ? 'Nuevo usuario' : 'Nueva cita'}</button>}</div>
          <div className="admin-demo-note"><span className="admin-demo-dot" /><span>Vista de demostración <span className="admin-demo-detail">· Los cambios se guardan en este navegador.</span></span></div>
          {storageError && <p className="admin-error" role="alert">El navegador no permite guardar los datos. Los cambios estarán disponibles solo durante esta sesión.</p>}

          {view === 'resumen' && <>
            <div className="admin-stats">{stats.map(stat => <article className="admin-stat" key={stat.label}><div className="admin-stat-heading"><span>{stat.label}</span><span className={`admin-stat-icon admin-tone-${stat.tone}`}><AdminIcon name={stat.icon} /></span></div><strong className="admin-stat-value">{String(stat.value).padStart(2, '0')}</strong><span className="admin-stat-detail">{stat.detail}</span></article>)}</div>
            <div className="admin-dashboard-grid"><section className="admin-panel admin-agenda"><div className="admin-panel-heading"><div><h2>Agenda de hoy</h2><p>{new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })}</p></div><a className="admin-text-link" href="#citas">Ver agenda <AdminIcon name="arrow" size={16} /></a></div>{appointmentTable(todayAppointments, true)}<div className="admin-panel-footer"><span>{todayAppointments.length} citas registradas para hoy</span><span className="admin-live-dot">Agenda actualizada</span></div></section>
              <section className="admin-panel admin-pending"><div className="admin-panel-heading"><div><h2>Por confirmar</h2><p>Un pequeño paso, una mejor atención.</p></div><span className="admin-number-pill">{pending.length}</span></div><div className="admin-pending-list">{pending.length ? pending.slice(0, 3).map(item => <div className="admin-pending-item" key={item.id}><div className="admin-pending-title"><span className="admin-avatar"><AdminIcon name="paw" size={18} /></span><div><strong>{item.pet}</strong><span>{item.service}</span></div></div><p><AdminIcon name="clock" size={14} />{dateLabel(item.date)} · {item.time}</p><button className="admin-button admin-button-secondary" onClick={() => confirmAppointment(item)}><AdminIcon name="check" size={16} />Confirmar cita</button></div>) : <div className="admin-empty"><AdminIcon name="check" size={28} /><h3>Todo al día</h3><p>No hay solicitudes pendientes.</p></div>}</div></section>
            </div><div className="admin-bottom-grid"><section className="admin-welcome-card"><div><span className="admin-eyebrow">MENOS PAPELEO, MÁS CUIDADO</span><h2>Un buen día empieza<br />con todo en orden.</h2><p>Gestiona los accesos de tu equipo y mantén la clínica conectada.</p><a href="#usuarios" className="admin-text-link">Gestionar usuarios <AdminIcon name="arrow" size={17} /></a></div><div className="admin-welcome-art" aria-hidden="true"><AdminIcon name="paw" size={85} /><span>+</span></div></section><section className="admin-panel admin-team"><div className="admin-panel-heading"><div><h2>Accesos del equipo</h2><p>Personas que mantienen todo en marcha.</p></div><AdminIcon name="users" /></div>{data.users.filter(user => user.role !== 'Dueño de mascota').slice(0, 3).map(user => <div className="admin-team-person" key={user.id}><span className="admin-avatar">{initials(user.name)}</span><div><strong>{user.name}</strong><span>{user.role}</span></div><Badge>{user.active ? 'Activo' : 'Inactivo'}</Badge></div>)}</section></div>
          </>}

          {view === 'usuarios' && <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Directorio de usuarios <span className="admin-number-pill">{data.users.length}</span></h2><p>El acceso correcto para cada persona.</p></div></div><div className="admin-toolbar"><label className="admin-search"><AdminIcon name="search" size={19} /><input aria-label="Buscar usuarios" placeholder="Buscar por nombre o correo…" value={search} onChange={event => setSearch(event.target.value)} /></label><select className="admin-select" aria-label="Filtrar por rol" value={filter} onChange={event => setFilter(event.target.value)}><option value="Todos">Todos los roles</option>{ROLES.map(role => <option key={role}>{role}</option>)}</select></div>{users.length ? <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th scope="col">Usuario</th><th scope="col">Rol</th><th scope="col">Estado</th><th scope="col">Acciones</th></tr></thead><tbody>{users.map(user => <tr key={user.id}><td><div className="admin-person"><span className="admin-avatar">{initials(user.name)}</span><div><strong>{user.name}</strong><span>{user.email}</span></div></div></td><td><span className="admin-role"><AdminIcon name={user.role === 'Administrador' ? 'shield' : 'users'} size={15} />{user.role}</span></td><td><Badge>{user.active ? 'Activo' : 'Inactivo'}</Badge></td><td><div className="admin-row-actions"><button className="admin-small-button" onClick={() => setEditor({ type: 'user', item: user })}><AdminIcon name="edit" size={15} />Editar<span className="admin-sr-only"> {user.name}</span></button><button className={`admin-small-button ${user.active ? 'admin-deactivate' : ''}`} onClick={() => toggleUser(user)}>{user.active ? 'Desactivar' : 'Activar'}<span className="admin-sr-only"> {user.name}</span></button></div></td></tr>)}</tbody></table></div> : <Empty text="Prueba con otro nombre, correo o rol." />}<div className="admin-panel-footer">{users.length} de {data.users.length} usuarios · {activeUsers} activos</div></section>}

          {view === 'citas' && <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Agenda de atenciones</h2><p>Encuentra una cita y actualiza sus datos o estado.</p></div></div><div className="admin-toolbar"><label className="admin-search"><AdminIcon name="search" size={19} /><input aria-label="Buscar citas" placeholder="Buscar mascota, dueño o veterinario…" value={search} onChange={event => setSearch(event.target.value)} /></label><input className="admin-select" type="date" aria-label="Filtrar por fecha" value={agendaDate} onChange={event => setAgendaDate(event.target.value)} /><select className="admin-select" aria-label="Filtrar por estado" value={filter} onChange={event => setFilter(event.target.value)}><option value="Todos">Todos los estados</option>{STATUSES.map(status => <option key={status}>{status}</option>)}</select>{(agendaDate || query || filter !== 'Todos') && <button className="admin-small-button" onClick={() => { setAgendaDate(''); setSearch(''); setFilter('Todos') }}>Limpiar filtros</button>}</div>{appointmentTable(filteredAppointments)}<div className="admin-panel-footer">{filteredAppointments.length} de {appointments.length} citas</div></section>}

          {view === 'reportes' && <><section className="admin-panel admin-report-filters"><div><h2>Atenciones por período</h2><p>Selecciona las fechas que quieres consultar.</p></div><div className="admin-report-controls"><label className="admin-field">Desde<input type="date" value={reportStart} required onChange={event => setReportStart(event.target.value)} /></label><label className="admin-field">Hasta<input type="date" value={reportEnd} required onChange={event => setReportEnd(event.target.value)} /></label><button className="admin-button" disabled={!report.length || invalidPeriod || !reportStart || !reportEnd} onClick={() => { downloadReport(report); setNotice('Reporte descargado en formato CSV.') }}><AdminIcon name="download" size={18} />Descargar CSV</button></div>{invalidPeriod && <p className="admin-error" role="alert">La fecha de inicio debe ser anterior o igual a la fecha de término.</p>}</section><div className="admin-report-grid"><section className="admin-panel admin-service-report"><div className="admin-panel-heading"><div><h2>Distribución por servicio</h2><p>{report.length} citas en el período seleccionado</p></div><AdminIcon name="chart" /></div>{SERVICES.map(service => { const count = report.filter(item => item.service === service).length; return <div className="admin-service-bar" key={service}><div><span>{service}</span><strong>{count}</strong></div><div className="admin-bar-track"><span style={{ width: `${report.length ? count / report.length * 100 : 0}%` }} /></div></div> })}</section><section className="admin-panel admin-report-summary"><AdminIcon name="check" size={32} /><strong>{complete}</strong><h2>Atenciones completadas</h2><p>De {report.length} citas registradas en el período.</p><div><span>Confirmadas</span><strong>{report.filter(item => item.status === 'Confirmada').length}</strong></div><div><span>Pendientes</span><strong>{report.filter(item => item.status === 'Pendiente').length}</strong></div><div><span>Canceladas</span><strong>{report.filter(item => item.status === 'Cancelada').length}</strong></div></section></div><section className="admin-panel"><div className="admin-panel-heading"><div><h2>Detalle del período</h2><p>El archivo CSV incluye todas las citas de esta selección.</p></div></div>{appointmentTable(report)}</section></>}
          <footer className="admin-footer"><span>Veterinaria San Marcos</span><span>Cuidando a la comunidad desde 2009 <AdminIcon name="paw" size={14} /></span></footer>
        </main>
      </div>
      {editor && <AdminEditor key={`${editor.type}-${editor.item?.id || 'new'}`} editor={editor} onClose={() => setEditor(null)} onSave={save} />}
      <div className={`admin-toast ${notice ? 'is-visible' : ''}`} role="status" aria-live="polite">{notice && <><AdminIcon name="check" size={18} />{notice}<button className="admin-icon-button" aria-label="Cerrar notificación" onClick={() => setNotice('')}><AdminIcon name="close" size={16} /></button></>}</div>
    </div>
  )
}
