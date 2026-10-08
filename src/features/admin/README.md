# Administración · Veterinaria San Marcos

Abrir `/admin` con `npm run dev`. El sitio público sigue disponible en `/`.

El módulo se carga de forma independiente desde `src/main.jsx`. `/admin` exige una sesión activa con rol Administrador; sin sesión redirige a `/login`, y los demás roles vuelven al sitio público.

## Completar los dos usuarios

Editar `src/features/admin/adminUsers.js`. El arreglo `INITIAL_USERS` contiene únicamente `Usuario 1` y `Usuario 2`. Reemplazar `name` y `email`; `role` define el permiso y `active` indica si la cuenta está activa. Mantener al menos un Administrador activo y conservar los identificadores `u1` y `u2`.

También se pueden completar desde `/admin`, con el botón **Editar** de cada usuario. La vista de usuarios se abre por defecto.

Los datos iniciales se usan cuando no hay cambios guardados. Si se modifica el archivo después de editar usuarios desde el panel, eliminar solo la clave `san-marcos-admin-demo-v2` en las herramientas del navegador (Aplicación → Almacenamiento local) y recargar para volver a cargar los datos del archivo. Esto reinicia también las citas de esta demostración. Los datos guardados en la versión anterior (`v1`) se conservan y no se cargan en esta versión.

## Vistas

- `/admin#resumen`: contadores básicos y citas de hoy.
- `/admin#usuarios`: crear y editar usuarios, asignar Administrador, Recepcionista o Dueño de mascota, activar y desactivar cuentas, buscar y filtrar por rol. Evita correos duplicados y conservará al menos un administrador activo.
- `/admin#citas`: crear, editar, reagendar y confirmar citas; buscar y filtrar por fecha o estado. Evita dos citas no canceladas para el mismo veterinario a la misma hora.
- `/admin#reportes`: atenciones por período, distribución por servicio y descarga CSV compatible con Excel.

## Integración con login y backend

Esta entrega es una **demostración de frontend** con login local. Los datos son ficticios y se guardan en `localStorage` bajo `san-marcos-admin-demo-v2`. No envía invitaciones ni guarda registros en un servidor. Las cuentas activas del panel pueden ingresar con la contraseña compartida `SanMarcos2026!`. Las credenciales iniciales se encuentran en el README principal.

`AdminEntry` comprueba el rol antes de renderizar `AdminPage`. El login local no constituye autenticación segura: el backend deberá validar las credenciales y verificar rol y token en cada endpoint. Reemplazar el módulo `features/auth/session.js` al integrar la API.

La carga inicial está en `adminData.js` (`readData`); las mutaciones están centralizadas en `AdminPage.jsx` (`persist`). Reemplazar la lectura y las operaciones de usuarios/citas por llamadas a la API REST Spring Boot del equipo, agregar los estados de carga/error y usar la sesión del login para el perfil. Las validaciones de duplicados, disponibilidad y último administrador también deben ejecutarse en el servidor. El alta de credenciales corresponde al flujo de autenticación que se integre.

No desplegar este modo de demostración con datos reales. Para reiniciar los datos de ejemplo, eliminar únicamente la clave `san-marcos-admin-demo-v2` del almacenamiento del navegador y recargar.

## Estructura

- `AdminPage.jsx`: navegación, vistas y operaciones.
- `AdminEntry.jsx`: carga diferida del panel, con estado de espera.
- `AdminEditor.jsx`: formularios en diálogo nativo, con foco y cierre mediante Escape.
- `AdminIcon.jsx`: iconos SVG sin dependencias externas.
- `adminData.js`: modelos de demostración, persistencia y exportación.
- `adminUsers.js`: datos iniciales de los dos usuarios, para completar después.
- `admin.css`: estilos propios; navegación móvil y tablas con desplazamiento horizontal.

Validar con `npm run build` y `npm run lint`.
