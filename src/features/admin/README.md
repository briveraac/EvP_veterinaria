# Panel de administración

Entrar por `/login` con un Administrador o Recepcionista y abrir `/admin`.

## Archivos

- `AdminPage.jsx`: las cuatro vistas y las operaciones de usuarios y citas (todo contra el backend).
- `AdminEditor.jsx`: formulario para crear o editar.
- `AdminEntry.jsx`: revisa la sesión y el rol antes de mostrar el panel.
- `adminData.js`: listas de roles, servicios y estados, fechas y descarga CSV.
- `AdminIcon.jsx`: iconos que se muestran en los botones.
- `admin.css`: estilos del panel.

## Funciones

- Resumen: cifras generales y citas del día.
- Usuarios (solo Administrador): crear, editar, activar, desactivar, cambiar roles, buscar y filtrar.
- Citas: crear, editar, reagendar, confirmar y filtrar por fecha o estado. Eliminar solo el Administrador.
- Reportes: consultar un período y descargarlo en CSV.

## Llamadas al backend

| Acción | Petición |
| --- | --- |
| Abrir el panel | `GET /api/v1/citas` y, si es admin, `GET /api/v1/usuarios` |
| Crear / editar cita | `POST /api/v1/citas` / `PUT /api/v1/citas/{id}` |
| Confirmar cita | `PUT /api/v1/citas/{id}` con estado Confirmada |
| Eliminar cita | `DELETE /api/v1/citas/{id}` |
| Crear / editar usuario | `POST /api/v1/usuarios` / `PUT /api/v1/usuarios/{id}` |
| Activar / desactivar | `PUT /api/v1/usuarios/{id}` |

Si el backend responde con error, el mensaje (`{ "mensaje": "..." }`) se muestra en el formulario o en el aviso.
