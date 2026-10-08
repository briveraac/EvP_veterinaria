import { useEffect, useState } from 'react';
import AdminEditor from './AdminEditor';
import AdminIcon from './AdminIcon';
import { downloadReport, localDate, readData, ROLES, SERVICES, STATUSES, STORAGE_KEY } from './adminData';
import './admin.css';
import { signOut } from '../auth/session';
const navigation = [{
  id: 'resumen',
  label: 'Resumen'
}, {
  id: 'usuarios',
  label: 'Usuarios'
}, {
  id: 'citas',
  label: 'Citas'
}, {
  id: 'reportes',
  label: 'Reportes'
}];
const titles = {
  resumen: ['Resumen', 'Información general de la clínica.'],
  usuarios: ['Usuarios', 'Administra los usuarios y sus permisos.'],
  citas: ['Citas', 'Consulta y modifica las citas registradas.'],
  reportes: ['Reportes', 'Consulta las atenciones por fecha.']
};
function dateLabel(date) {
  return new Date(date + 'T12:00:00').toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short'
  });
}
function statusClass(status) {
  if (status === 'Activo' || status === 'Confirmada') {
    return 'green';
  }
  if (status === 'Pendiente') {
    return 'orange';
  }
  if (status === 'Completada') {
    return 'blue';
  }
  return 'gray';
}
function currentView() {
  const hash = window.location.hash.slice(1);
  for (const item of navigation) {
    if (item.id === hash) {
      return hash;
    }
  }
  return 'usuarios';
}
function Badge({
  children
}) {
  return <span className={'admin-badge admin-badge-' + statusClass(children)}>{children}</span>;
}
function Empty({
  text
}) {
  return <div className="admin-empty">
    <h3>No hay resultados</h3>
    <p>{text}</p>
  </div>;
}
export default function AdminPage() {
  const [view, setView] = useState(currentView);
  const [data, setData] = useState(readData);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [menuOpen, setMenuOpen] = useState(false);
  const [editor, setEditor] = useState(null);
  const [notice, setNotice] = useState('');
  const [storageError, setStorageError] = useState(false);
  const [reportStart, setReportStart] = useState(() => `${localDate().slice(0, 7)}-01`);
  const [reportEnd, setReportEnd] = useState(localDate);
  const [agendaDate, setAgendaDate] = useState('');
  const today = localDate();
  useEffect(() => {
    const handleHash = () => {
      if (!navigation.some(item => item.id === window.location.hash.slice(1))) {
        return;
      }
      setView(currentView());
      setSearch('');
      setFilter('Todos');
      setMenuOpen(false);
    };
    window.addEventListener('hashchange', handleHash);
    const title = document.title;
    document.title = 'Administración | Veterinaria San Marcos';
    return () => {
      window.removeEventListener('hashchange', handleHash);
      document.title = title;
    };
  }, []);
  useEffect(() => {
    if (!notice) {
      return;
    }
    const timer = setTimeout(() => setNotice(''), 5000);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.querySelector('.admin-menu-button')?.focus();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  // Guardamos tanto en el navegador como en el estado de React.
  function persist(next, message) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
    setData(next);
    setNotice(message);
  }
  function save(item) {
    if (editor.type === 'user') {
      let otherAdmin = false;
      for (const user of data.users) {
        if (user.id === item.id) {
          continue;
        }
        if (user.email.toLowerCase() === item.email.toLowerCase()) {
          return 'Ya existe un usuario con ese correo electrónico.';
        }
        if (user.active && user.role === 'Administrador') {
          otherAdmin = true;
        }
      }
      if (!otherAdmin && (!item.active || item.role !== 'Administrador')) {
        return 'Debe quedar al menos un administrador activo en el sistema.';
      }
      const users = [...data.users];
      const index = users.findIndex(user => user.id === item.id);
      if (index === -1) {
        users.push(item);
      } else {
        users[index] = item;
      }
      persist({
        ...data,
        users
      }, 'Cambios guardados correctamente.');
    } else {
      if (item.status !== 'Cancelada') {
        for (const appointment of data.appointments) {
          const sameTime = appointment.date === item.date && appointment.time === item.time;
          if (appointment.id !== item.id && appointment.status !== 'Cancelada' && appointment.vet === item.vet && sameTime) {
            return 'El veterinario ya tiene una cita en esa fecha y hora.';
          }
        }
      }
      const appointments = [...data.appointments];
      const index = appointments.findIndex(appointment => appointment.id === item.id);
      if (index === -1) {
        appointments.push(item);
      } else {
        appointments[index] = item;
      }
      persist({
        ...data,
        appointments
      }, 'Cambios guardados correctamente.');
    }
    setEditor(null);
  }
  function toggleUser(user) {
    const activeAdmins = data.users.filter(item => item.active && item.role === 'Administrador');
    if (user.active && user.role === 'Administrador' && activeAdmins.length === 1) {
      setNotice('Debe quedar al menos un administrador activo.');
      return;
    }
    const users = [...data.users];
    const index = users.findIndex(item => item.id === user.id);
    users[index] = {
      ...user,
      active: !user.active
    };
    let message = 'Usuario activado.';
    if (user.active) {
      message = 'Usuario desactivado.';
    }
    persist({
      ...data,
      users
    }, message);
  }
  function confirmAppointment(appointment) {
    const appointments = [...data.appointments];
    const index = appointments.findIndex(item => item.id === appointment.id);
    appointments[index] = {
      ...appointment,
      status: 'Confirmada'
    };
    persist({
      ...data,
      appointments
    }, 'Cita confirmada.');
  }
  function openUserEditor(user) {
    setEditor({ type: 'user', item: user });
  }

  function openAppointmentEditor(appointment) {
    setEditor({ type: 'appointment', item: appointment });
  }

  function openNewEditor() {
    if (view === 'usuarios') {
      setEditor({ type: 'user' });
    } else {
      setEditor({ type: 'appointment' });
    }
  }

  function closeEditor() {
    setEditor(null);
  }

  function clearFilters() {
    setAgendaDate('');
    setSearch('');
    setFilter('Todos');
  }
  function exportReport() {
    downloadReport(report);
    setNotice('Reporte descargado en formato CSV.');
  }
  const query = search.trim().toLocaleLowerCase('es');
  const users = data.users.filter(user => {
    const text = (user.name + ' ' + user.email).toLocaleLowerCase('es');
    const matchesSearch = text.includes(query);
    const matchesRole = filter === 'Todos' || user.role === filter;
    return matchesSearch && matchesRole;
  });
  const appointments = [...data.appointments].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const filteredAppointments = appointments.filter(item => {
    const text = (item.pet + ' ' + item.owner + ' ' + item.vet + ' ' + item.service).toLocaleLowerCase('es');
    const matchesSearch = text.includes(query);
    const matchesStatus = filter === 'Todos' || item.status === filter;
    const matchesDate = !agendaDate || item.date === agendaDate;
    return matchesSearch && matchesStatus && matchesDate;
  });
  const todayAppointments = appointments.filter(item => item.date === today);
  const pending = appointments.filter(item => item.status === 'Pendiente');
  const invalidPeriod = reportStart > reportEnd;
  let report = [];
  if (!invalidPeriod && reportStart && reportEnd) {
    report = appointments.filter(item => item.date >= reportStart && item.date <= reportEnd);
  }
  const complete = report.filter(item => item.status === 'Completada').length;
  const activeUsers = data.users.filter(user => user.active).length;
  const stats = [{
    label: 'Citas de hoy',
    value: todayAppointments.filter(item => item.status !== 'Cancelada').length
  }, {
    label: 'Por confirmar',
    value: pending.length
  }, {
    label: 'Usuarios activos',
    value: activeUsers
  }, {
    label: 'Atenciones de hoy',
    value: todayAppointments.filter(item => item.status === 'Completada').length
  }];
  function appointmentTable(items, compact = false) {
    if (items.length === 0) {
      return <Empty text="No hay citas para esta selección. Puedes crear una nueva atención." />;
    }
    return <div className="admin-table-scroll">
    <table className="admin-table">
      <thead>
        <tr>
          <th scope="col">Mascota / dueño</th>
          <th scope="col">Servicio</th>
          <th scope="col">{compact ? 'Hora' : 'Fecha / hora'}</th>
          <th scope="col">Estado</th>
          <th scope="col">
            <span className="admin-sr-only">Acciones</span>
          </th>
        </tr>
      </thead>
      <tbody>{items.map(item => <tr key={item.id}>
          <td>
            <div className="admin-person">
              <div>
                <strong>
                  {item.pet}{' '}
                  <small className="admin-species">{item.species}</small>
                </strong>
                <span>{item.owner}</span>
              </div>
            </div>
          </td>
          <td>
            <strong>{item.service}</strong>
            <span className="admin-cell-subtitle">{item.vet}</span>
          </td>
          <td>
            {!compact && <span className="admin-cell-subtitle">{dateLabel(item.date)}</span>}
            <strong>{item.time}</strong>
          </td>
          <td>
            <Badge>{item.status}</Badge>
          </td>
          <td>
            <div className="admin-row-actions">
              {item.status === 'Pendiente' && <button className="admin-icon-button admin-confirm" onClick={() => confirmAppointment(item)} aria-label={`Confirmar cita de ${item.pet}`} title="Confirmar cita">
                <AdminIcon name="check" size={18} />
              </button>}
              <button className="admin-icon-button" onClick={() => openAppointmentEditor(item)} aria-label={`Editar cita de ${item.pet}`} title="Editar o reagendar">
                <AdminIcon name="edit" size={18} />
              </button>
            </div>
          </td>
        </tr>)}</tbody>
    </table>
  </div>;
  }
  return <div className="admin-app">
    <a className="skip-link" href="#admin-content">Saltar al contenido</a>
    <header className="admin-header">
      <a className="admin-brand" href="/admin">Veterinaria San Marcos</a>
      <div className="admin-header-actions">
        <a href="/">Volver al sitio</a>
        <button className="admin-small-button" onClick={signOut}>Cerrar sesión</button>
        <button className="admin-icon-button admin-menu-button" aria-label="Abrir navegación" aria-expanded={menuOpen} aria-controls="admin-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <AdminIcon name="menu" />
        </button>
      </div>
    </header>
    <nav id="admin-navigation" className={`admin-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Administración">
        {navigation.map(item => <a key={item.id} href={`#${item.id}`} className={`admin-nav-item ${view === item.id ? 'is-active' : ''}`} aria-current={view === item.id ? 'page' : undefined}>{item.label}</a>)}
      </nav>
    <div className="admin-workspace">
      <main id="admin-content" className="admin-main" tabIndex={-1}>
        <div className="admin-page-heading">
          <div>
            <h1>{titles[view][0]}</h1>
            <p>{titles[view][1]}</p>
          </div>
          {view !== 'reportes' && <button className="admin-button" onClick={openNewEditor}>{view === 'usuarios' ? 'Nuevo usuario' : 'Nueva cita'}</button>}
        </div>
        <p className="admin-demo-note">Datos de ejemplo. Los cambios se guardan en este navegador.</p>
        {storageError && <p className="admin-error" role="alert">El navegador no permite guardar los datos. Los cambios estarán disponibles solo durante esta sesión.</p>}
        {view === 'resumen' && <>
          <div className="admin-stats">{stats.map(stat => <article className="admin-stat" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>)}</div>
          <section className="admin-panel">
            <div className="admin-panel-heading">
              <h2>Citas de hoy</h2>
              <a className="admin-text-link" href="#citas">Ver todas las citas</a>
            </div>
            {appointmentTable(todayAppointments, true)}
          </section>
        </>}
        {view === 'usuarios' && <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Directorio de usuarios <span className="admin-number-pill">{data.users.length}</span></h2>
              <p>Lista de usuarios registrados.</p>
            </div>
          </div>
          <div className="admin-toolbar">
            <label className="admin-search">
              <AdminIcon name="search" size={19} />
              <input aria-label="Buscar usuarios" placeholder="Buscar por nombre o correo…" value={search} onChange={event => setSearch(event.target.value)} />
            </label>
            <select className="admin-select" aria-label="Filtrar por rol" value={filter} onChange={event => setFilter(event.target.value)}>
              <option value="Todos">Todos los roles</option>
              {ROLES.map(role => <option key={role}>{role}</option>)}
            </select>
          </div>
          {users.length ? <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Usuario</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>{users.map(user => <tr key={user.id}>
                  <td>
                    <div className="admin-person">
                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="admin-role">
                      <AdminIcon name={user.role === 'Administrador' ? 'shield' : 'users'} size={15} />
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <Badge>{user.active ? 'Activo' : 'Inactivo'}</Badge>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button className="admin-small-button" onClick={() => openUserEditor(user)}><AdminIcon name="edit" size={15} />Editar<span className="admin-sr-only"> {user.name}</span></button>
                      <button className={`admin-small-button ${user.active ? 'admin-deactivate' : ''}`} onClick={() => toggleUser(user)}>
                        {user.active ? 'Desactivar' : 'Activar'}
                        <span className="admin-sr-only"> {user.name}</span>
                      </button>
                    </div>
                  </td>
                </tr>)}</tbody>
            </table>
          </div> : <Empty text="Prueba con otro nombre, correo o rol." />}
          <div className="admin-panel-footer">{users.length} de {data.users.length} usuarios · {activeUsers} activos</div>
        </section>}
        {view === 'citas' && <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Agenda de atenciones</h2>
              <p>Encuentra una cita y actualiza sus datos o estado.</p>
            </div>
          </div>
          <div className="admin-toolbar">
            <label className="admin-search">
              <AdminIcon name="search" size={19} />
              <input aria-label="Buscar citas" placeholder="Buscar mascota, dueño o veterinario…" value={search} onChange={event => setSearch(event.target.value)} />
            </label>
            <input className="admin-select" type="date" aria-label="Filtrar por fecha" value={agendaDate} onChange={event => setAgendaDate(event.target.value)} />
            <select className="admin-select" aria-label="Filtrar por estado" value={filter} onChange={event => setFilter(event.target.value)}>
              <option value="Todos">Todos los estados</option>
              {STATUSES.map(status => <option key={status}>{status}</option>)}
            </select>
            {(agendaDate || query || filter !== 'Todos') && <button className="admin-small-button" onClick={clearFilters}>Limpiar filtros</button>}
          </div>
          {appointmentTable(filteredAppointments)}
          <div className="admin-panel-footer">{filteredAppointments.length} de {appointments.length} citas</div>
        </section>}
        {view === 'reportes' && <>
          <section className="admin-panel admin-report-filters">
            <div>
              <h2>Atenciones por período</h2>
              <p>Selecciona las fechas que quieres consultar.</p>
            </div>
            <div className="admin-report-controls">
              <label className="admin-field">Desde<input type="date" value={reportStart} required onChange={event => setReportStart(event.target.value)} /></label>
              <label className="admin-field">Hasta<input type="date" value={reportEnd} required onChange={event => setReportEnd(event.target.value)} /></label>
              <button className="admin-button" disabled={!report.length || invalidPeriod || !reportStart || !reportEnd} onClick={exportReport}><AdminIcon name="download" size={18} />Descargar CSV</button>
            </div>
            {invalidPeriod && <p className="admin-error" role="alert">La fecha de inicio debe ser anterior o igual a la fecha de término.</p>}
          </section>
          <div className="admin-report-grid">
            <section className="admin-panel admin-service-report">
              <div className="admin-panel-heading">
                <div>
                  <h2>Distribución por servicio</h2>
                  <p>{report.length} citas en el período seleccionado</p>
                </div>
                <AdminIcon name="chart" />
              </div>
              {SERVICES.map(service => {
                const count = report.filter(item => item.service === service).length;
                return <div className="admin-service-bar" key={service}>
                <div>
                  <span>{service}</span>
                  <strong>{count}</strong>
                </div>
                <div className="admin-bar-track">
                  <span style={{
                      width: `${report.length ? count / report.length * 100 : 0}%`
                    }} />
                </div>
              </div>;
              })}
            </section>
            <section className="admin-panel admin-report-summary">
              <AdminIcon name="check" size={32} />
              <strong>{complete}</strong>
              <h2>Atenciones completadas</h2>
              <p>De {report.length} citas registradas en el período.</p>
              <div>
                <span>Confirmadas</span>
                <strong>{report.filter(item => item.status === 'Confirmada').length}</strong>
              </div>
              <div>
                <span>Pendientes</span>
                <strong>{report.filter(item => item.status === 'Pendiente').length}</strong>
              </div>
              <div>
                <span>Canceladas</span>
                <strong>{report.filter(item => item.status === 'Cancelada').length}</strong>
              </div>
            </section>
          </div>
          <section className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <h2>Detalle del período</h2>
                <p>El archivo CSV incluye todas las citas de esta selección.</p>
              </div>
            </div>
            {appointmentTable(report)}
          </section>
        </>}
        <footer className="admin-footer">
          <span>Veterinaria San Marcos · Administración</span>
        </footer>
      </main>
    </div>
    {editor && <AdminEditor key={`${editor.type}-${editor.item?.id || 'new'}`} editor={editor} onClose={closeEditor} onSave={save} />}
    <div className={`admin-toast ${notice ? 'is-visible' : ''}`} role="status" aria-live="polite">{notice && <>
        <AdminIcon name="check" size={18} />
        {notice}
        <button className="admin-icon-button" aria-label="Cerrar notificación" onClick={() => setNotice('')}>
          <AdminIcon name="close" size={16} />
        </button>
      </>}</div>
  </div>;
}
