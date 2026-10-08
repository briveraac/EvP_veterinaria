# EvP Veterinaria

Sitio de Veterinaria San Marcos migrado a React con Vite, manteniendo la estructura visual original y aplicando una arquitectura modular para estilos y comportamiento del DOM.

## Scripts

- npm run dev: entorno de desarrollo
- npm run build: build de producción
- npm run preview: previsualizar build
- npm run lint: validar calidad de código

## Arquitectura

src/
- App.jsx: estructura JSX principal de la página
- main.jsx: punto de entrada de React
- features/site/
	- initSiteUi.js: bootstrap de comportamiento UI
	- mobileNav.js: navegación móvil
	- backToTop.js: botón volver arriba
	- mapOverlay.js: overlay de mapa
	- footerYear.js: año dinámico de footer
	- appointmentForm.js: validación y estado del formulario
- styles/
	- main.css: entrada única de estilos
	- tokens.css: variables de diseño
	- base.css: reset y base tipográfica
	- layout.css: header, nav, footer, contenedor
	- sections.css: estilos por secciones
	- components.css: componentes reutilizables
	- responsive.css: breakpoints y motion reduce

## Notas

## Login y agendamiento

- `/login`: identifica automáticamente el rol de una cuenta activa. Los usuarios normales vuelven al inicio; los administradores eligen el panel o la página principal.
- `/admin`: requiere sesión con rol Administrador. Desde el sitio se puede volver al panel o cerrar sesión.
- `/agendar`: formulario independiente con enlace para volver al inicio. Los botones de agendamiento llevan a esta ruta. Completa nombre y correo si existe una sesión.

Accesos iniciales de demostración (contraseña común `SanMarcos2026!`):

- Administradores: `brun.rivera@duocuc.cl` y `germ.pino@duocuc.cl`.
- Usuario normal: `cliente@sanmarcos.cl`.

Las cuentas se consultan desde el mismo directorio del panel; cambios de rol y desactivaciones afectan el acceso. Si ya hay datos guardados de una versión anterior, estos se conservan: puedes crear un Dueño de mascota desde el panel para probar el acceso normal.

La sesión dura ocho horas y se guarda en `sessionStorage`. Este proyecto no tiene backend: el login es una demostración con contraseña compartida, y la protección de rutas del navegador no reemplaza autenticación ni autorización en un servidor. El formulario de agendamiento valida los datos, pero no los envía ni registra citas. Para uso real se deben conectar autenticación y agendamiento a una API, validar permisos en el servidor y reemplazar las credenciales de ejemplo.

El hosting debe servir `index.html` para `/login`, `/admin` y `/agendar` (fallback de SPA). Vite ya lo hace en desarrollo y preview.

- El proyecto conserva assets referenciados en rutas assets/...; deben existir en public/assets/... para verse correctamente en Vite.
- Los archivos legacy en raíz, styles.css y script.js, ya no son necesarios para ejecución actual.
