import { useEffect, useRef, useState } from 'react';
import AdminIcon from './AdminIcon';
import { localDate, ROLES, SERVICES, STATUSES } from './adminData';
export default function AdminEditor({
  editor,
  onClose,
  onSave
}) {
  const dialog = useRef(null);
  const isUser = editor.type === 'user';
  const [error, setError] = useState('');
  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    return () => element.close();
  }, []);
  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    let item;
    if (isUser) {
      item = {
        name: form.get('name').trim(),
        email: form.get('email').trim(),
        role: form.get('role'),
        active: form.get('active') === 'true'
      };
      if (item.name.length < 3) {
        setError('Ingresa un nombre de al menos 3 caracteres.');
        return;
      }
    } else {
      item = {
        pet: form.get('pet').trim(),
        species: form.get('species'),
        owner: form.get('owner').trim(),
        date: form.get('date'),
        time: form.get('time'),
        service: form.get('service'),
        vet: form.get('vet'),
        status: form.get('status')
      };
      if (!item.pet || !item.owner || !item.vet) {
        setError('Completa los datos de la cita.');
        return;
      }
    }
    if (editor.item) {
      item.id = editor.item.id;
    } else {
      item.id = crypto.randomUUID();
    }
    const message = onSave(item);
    if (message) {
      setError(message);
    }
  }
  const item = editor.item || {};
  return <dialog className="admin-dialog" ref={dialog} onCancel={onClose} onClick={event => {
    if (event.target === dialog.current) {
      onClose();
    }
  }} aria-labelledby="editor-title">
    <form onSubmit={submit}>
      <div className="admin-dialog-heading">
        <div>
          <span className="admin-eyebrow">{isUser ? 'GESTIÓN DE ACCESOS' : 'AGENDA DE LA CLÍNICA'}</span>
          <h2 id="editor-title">
            {editor.item ? 'Editar' : 'Crear'}{' '}
            {isUser ? 'usuario' : 'cita'}
          </h2>
        </div>
        <button className="admin-icon-button" type="button" onClick={onClose} aria-label="Cerrar formulario">
          <AdminIcon name="close" />
        </button>
      </div>
      <p className="admin-muted">{isUser ? 'Define los datos y el rol de acceso al sistema.' : 'Organiza una atención para la mascota.'}</p>
      <div className="admin-form-grid">
          {isUser ? <>
          <label className="admin-field admin-field-wide">Nombre completo<input name="name" defaultValue={item.name} required minLength={3} maxLength={100} autoComplete="name" autoFocus /></label>
          <label className="admin-field admin-field-wide">Correo electrónico<input name="email" type="email" defaultValue={item.email} required maxLength={150} autoComplete="email" /></label>
          <label className="admin-field">Rol<select aria-label="Rol" name="role" defaultValue={item.role || ROLES[2]}>{ROLES.map(role => <option key={role}>{role}</option>)}</select></label>
          <label className="admin-field">Estado<select aria-label="Estado" name="active" defaultValue={String(item.active ?? true)}>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select></label>
        </> : <>
          <label className="admin-field">Nombre de la mascota<input name="pet" defaultValue={item.pet} required maxLength={80} autoFocus /></label>
          <label className="admin-field">Especie<select aria-label="Especie" name="species" defaultValue={item.species || 'Perro'}>{['Perro', 'Gato', 'Conejo', 'Ave'].map(species => <option key={species}>{species}</option>)}</select></label>
          <label className="admin-field admin-field-wide">Dueño de la mascota<input name="owner" defaultValue={item.owner} required maxLength={100} /></label>
          <label className="admin-field">Fecha<input name="date" type="date" defaultValue={item.date || localDate()} required min={editor.item ? undefined : localDate()} /></label>
          <label className="admin-field">Hora<input name="time" type="time" defaultValue={item.time || '09:00'} required /></label>
          <label className="admin-field admin-field-wide">Servicio<select aria-label="Servicio" name="service" defaultValue={item.service || SERVICES[0]}>{SERVICES.map(service => <option key={service}>{service}</option>)}</select></label>
          <label className="admin-field">Veterinario<select aria-label="Veterinario" name="vet" defaultValue={item.vet || 'Dra. Sofía Herrera'}>{['Dra. Sofía Herrera', 'Dr. Nicolás Vega', 'Dra. Paula Fuentes'].map(vet => <option key={vet}>{vet}</option>)}</select></label>
          <label className="admin-field">Estado<select aria-label="Estado" name="status" defaultValue={item.status || 'Pendiente'}>{STATUSES.map(status => <option key={status}>{status}</option>)}</select></label>
        </>}
        </div>
      {error && <p className="admin-error" role="alert">{error}</p>}
      <div className="admin-dialog-actions">
        <button type="button" className="admin-button admin-button-secondary" onClick={onClose}>Cancelar</button>
        <button className="admin-button" type="submit">{editor.item ? 'Guardar cambios' : `Crear ${isUser ? 'usuario' : 'cita'}`}</button>
      </div>
    </form>
  </dialog>;
}
