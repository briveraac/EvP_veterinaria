# Administración · Veterinaria San Marcos

Abrir `/admin` con `npm run dev`. El sitio público sigue disponible en `/`.

El módulo se carga de forma independiente desde `src/main.jsx`, sin modificar el sitio público ni implementar el login.

## Vistas

- `/admin#resumen`: indicadores, agenda de hoy, solicitudes pendientes y accesos del equipo.
- `/admin#usuarios`: crear y editar usuarios, asignar Administrador, Recepcionista o Dueño de mascota, activar y desactivar cuentas, buscar y filtrar por rol. Evita correos duplicados y conservará al menos un administrador activo.
- `/admin#citas`: crear, editar, reagendar y confirmar citas; buscar y filtrar por fecha o estado. Evita dos citas no canceladas para el mismo veterinario a la misma hora.
- `/admin#reportes`: atenciones por período, distribución por servicio y descarga CSV compatible con Excel.

## Integración con login y backend

Esta entrega es una **demostración de frontend**, accesible sin autenticación mientras se desarrolla el login. Los datos son ficticios y se guardan en `localStorage` bajo `san-marcos-admin-demo-v1`. No envía invitaciones, crea credenciales ni guarda registros en un servidor.

Al integrar el login, proteger la ruta `/admin` antes de renderizar `AdminPage`: una sesión autenticada con rol Administrador debe ser obligatoria. La interfaz actual no valida tokens ni permisos. Los demás roles no deben poder acceder a este módulo. El backend también debe verificar rol y token en cada endpoint.

La carga inicial está en `adminData.js` (`readData`); las mutaciones están centralizadas en `AdminPage.jsx` (`persist`). Reemplazar la lectura y las operaciones de usuarios/citas por llamadas a la API REST Spring Boot del equipo, agregar los estados de carga/error y usar la sesión del login para el perfil. Las validaciones de duplicados, disponibilidad y último administrador también deben ejecutarse en el servidor. El alta de credenciales corresponde al flujo de autenticación que se integre.

No desplegar este modo de demostración con datos reales. Para reiniciar los datos de ejemplo, eliminar únicamente la clave `san-marcos-admin-demo-v1` del almacenamiento del navegador y recargar.

## Estructura

- `AdminPage.jsx`: navegación, vistas y operaciones.
- `AdminEntry.jsx`: carga diferida del panel, con estado de espera.
- `AdminEditor.jsx`: formularios en diálogo nativo, con foco y cierre mediante Escape.
- `AdminIcon.jsx`: iconos SVG sin dependencias externas.
- `adminData.js`: modelos de demostración, persistencia y exportación.
- `admin.css`: estilos propios; navegación móvil y tablas con desplazamiento horizontal.

Validar con `npm run build` y `npm run lint`.
