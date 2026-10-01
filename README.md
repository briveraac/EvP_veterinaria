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

- El proyecto conserva assets referenciados en rutas assets/...; deben existir en public/assets/... para verse correctamente en Vite.
- Los archivos legacy en raíz, styles.css y script.js, ya no son necesarios para ejecución actual.
