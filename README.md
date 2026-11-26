# Veterinaria San Marcos

Proyecto en React y Vite. Tiene una página principal, login, formulario para pedir una hora y un panel de administración.

Este repositorio es el **frontend**. Los usuarios, el login y las citas están en el **backend** (Spring Boot), que está en otro repositorio: `EvP_veterinaria_backend`.

## Cómo ejecutarlo

1. Enciende primero el backend (ver su README). Queda en `http://localhost:8080`.
2. Luego, en este proyecto:

- `npm install`: instalar las dependencias.
- `npm run dev`: abrir el proyecto en desarrollo.
- `npm run build`: generar la versión para publicar.
- `npm run preview`: revisar esa versión.
- `npm run lint`: revisar el código.
- `npm test`: probar la sesión y el reporte CSV.

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
- `src/services/api.js`: axios con la dirección del backend y el token JWT.
- `src/services/CitaService.js` y `UsuarioService.js`: llamadas a la API REST de citas y usuarios.
- `src/styles`: estilos del sitio. Los colores comunes están en `tokens.css`.
- `public/assets`: imágenes y video.

## Usuarios de ejemplo

Los usuarios están en la base de datos del backend. La contraseña de todos es `SanMarcos2026!`.

- Bruno Rivera: `brun.rivera@duocuc.cl` (Administrador).
- German Pino: `germ.pino@duocuc.cl` (Administrador).
- Recepción: `recepcion@sanmarcos.cl` (Recepcionista).
- Cliente: `cliente@sanmarcos.cl` (Dueño de mascota).

## Inicio de sesión (JWT)

1. `LoginPage.jsx` envía correo y contraseña a `POST /api/v1/auth/login`.
2. El backend revisa la contraseña y responde con un **token JWT** y los datos del usuario.
3. `session.js` guarda en `sessionStorage` (clave `san-marcos-session`): el token, el usuario y la fecha en que vence el token.
   - Se mantiene al **recargar** la página.
   - Se borra al **cerrar la pestaña**, al **cerrar sesión** o cuando **vence el token** (1 hora).
4. `services/api.js` es la instancia de axios. Tiene dos interceptores:
   - Antes de cada petición agrega la cabecera `Authorization: Bearer <token>`.
   - Si el backend responde `401` (token vencido o adulterado), borra la sesión y manda al login.
5. `scheduleRenewal()` (se llama en `main.jsx`) pide un token nuevo a `POST /api/v1/auth/renovar` 5 minutos antes de que venza.

## Permisos por rol

| Rol | Qué puede hacer |
| --- | --- |
| Visitante | Ver el sitio y el formulario de agendar |
| Dueño de mascota | Lo mismo, con su nombre y correo ya completados en el formulario |
| Recepcionista | Panel: resumen, citas (crear, editar, confirmar) y reportes. No ve usuarios ni puede eliminar citas |
| Administrador | Todo el panel: usuarios (crear, editar, activar, roles), citas (incluido eliminar) y reportes |

En el frontend:

- `AdminEntry.jsx`: si no hay sesión manda a `/login`; si el rol no es Administrador ni Recepcionista manda al inicio.
- `AdminPage.jsx`: oculta la pestaña Usuarios y el botón Eliminar a la recepcionista.
- `Header.jsx`: muestra "Panel admin" solo a Administrador y Recepcionista.

Esto es para la interfaz. La seguridad real está en el backend: aunque alguien modifique el navegador, la API responde `403` si su rol no tiene permiso.

## Datos y funciones

El panel permite crear y editar usuarios y citas, activar cuentas, cambiar roles, confirmar citas, buscar, filtrar y descargar reportes CSV. El backend valida que quede al menos un administrador activo, que no haya correos repetidos y que un veterinario no tenga dos citas no canceladas a la misma hora. Si el backend está apagado, el panel muestra un aviso.

El formulario de `/agendar` valida los datos y completa nombre y correo si hay una sesión. Es una demostración: no envía solicitudes ni crea citas en el panel.

La dirección del backend se puede cambiar creando un archivo `.env` con `VITE_API_URL=http://otra-direccion:8080` (hay que volver a compilar).

Al publicar, el hosting debe servir `index.html` también para `/login`, `/admin` y `/agendar`. Vite ya lo hace en desarrollo.
