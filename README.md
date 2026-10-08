# Veterinaria San Marcos

Proyecto en React y Vite. Tiene una página principal, login, formulario para pedir una hora y un panel de administración.

## Cómo ejecutarlo

- `npm install`: instalar las dependencias.
- `npm run dev`: abrir el proyecto en desarrollo.
- `npm run build`: generar la versión para publicar.
- `npm run preview`: revisar esa versión.
- `npm run lint`: revisar el código.
- `npm test`: probar el inicio y cierre de sesión.

## Dónde está cada cosa

- `src/main.jsx`: elige qué página mostrar según la URL.
- `src/App.jsx`: arma la página principal.
- `src/components/layout`: encabezado y footer.
- `src/components/sections`: inicio, información, servicios y contacto.
- `src/features/site/initSiteUi.js`: menú móvil, botón para volver arriba y activación del mapa.
- `src/features/site/appointmentForm.js`: validación del formulario de agendamiento.
- `src/features/site/AppointmentPage.jsx`: página para pedir una hora.
- `src/features/auth`: login y sesión del usuario.
- `src/features/admin`: usuarios, citas y reportes.
- `src/styles`: estilos del sitio. Los colores comunes están en `tokens.css`.
- `public/assets`: imágenes y video.

## Usuarios de ejemplo

La contraseña para todas las cuentas activas es `SanMarcos2026!`.

- Bruno Rivera: `brun.rivera@duocuc.cl` (administrador).
- German Pino: `germ.pino@duocuc.cl` (administrador).
- Cliente: `cliente@sanmarcos.cl` (dueño de mascota).

En `/login`, el rol se obtiene del usuario. El administrador puede entrar al panel o volver al inicio. Los otros usuarios vuelven al inicio.

## Datos y funciones

El panel permite crear y editar usuarios y citas, activar cuentas, cambiar roles, confirmar citas, buscar, filtrar y descargar reportes CSV. Debe quedar al menos un administrador activo y no se permiten correos repetidos ni citas no canceladas para el mismo veterinario a la misma hora.

Los usuarios iniciales están en `src/features/admin/adminUsers.js`. Los cambios del panel se guardan en `localStorage` con la clave `san-marcos-admin-demo-v2`. Se conservan al recargar. La sesión se guarda en `sessionStorage` y dura ocho horas.

El formulario de `/agendar` valida los datos y completa nombre y correo si hay una sesión. Es una demostración: no envía solicitudes ni crea citas en el panel.

No hay backend. El login usa una contraseña de ejemplo; para uso real hace falta un servidor que valide las credenciales y los permisos.

Al publicar, el hosting debe servir `index.html` también para `/login`, `/admin` y `/agendar`. Vite ya lo hace en desarrollo.
