# Panel de administración

Entrar por `/login` con un administrador y abrir `/admin`.

## Archivos

- `AdminPage.jsx`: las cuatro vistas y las operaciones de usuarios y citas.
- `AdminEditor.jsx`: formulario para crear o editar.
- `AdminEntry.jsx`: revisa la sesión y el rol antes de mostrar el panel.
- `adminData.js`: datos de ejemplo, lectura del almacenamiento y descarga CSV.
- `adminUsers.js`: usuarios iniciales.
- `AdminIcon.jsx`: iconos que se muestran en los botones.
- `admin.css`: estilos del panel.

## Funciones

- Resumen: cifras generales y citas del día.
- Usuarios: crear, editar, activar, desactivar, cambiar roles, buscar y filtrar.
- Citas: crear, editar, reagendar, confirmar y filtrar por fecha o estado.
- Reportes: consultar un período y descargarlo en CSV.

El panel evita correos repetidos y citas no canceladas del mismo veterinario en la misma fecha y hora. También exige conservar al menos un administrador activo.

## Datos de ejemplo

Las cuentas activas usan la contraseña `SanMarcos2026!`. Los correos iniciales están en el README principal.

Los cambios se guardan en este navegador con la clave `san-marcos-admin-demo-v2`. Los datos guardados tienen prioridad sobre `adminUsers.js`. Para volver a los datos iniciales, eliminar solamente esa clave en el almacenamiento local del navegador y recargar. También se reinician las citas de ejemplo.

No hay servidor ni envío de invitaciones. Para usar datos reales hace falta conectar el proyecto a un backend que revise las credenciales y los permisos.
