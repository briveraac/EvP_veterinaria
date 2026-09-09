# Veterinaria San Marcos — Sitio Web

Sitio web estático (HTML, CSS y JavaScript) para **Veterinaria San Marcos**, clínica veterinaria ubicada en Rancagua, Región del Libertador General Bernardo O'Higgins, Chile.

## Nota importante sobre el alcance

`informe.md` describe una plataforma de gestión clínica completa (backend con microservicios, base de datos, autenticación, etc.). **Ese sistema no es lo que se construye aquí.** Este proyecto es únicamente el **sitio web público/informativo** de la veterinaria (front-end estático, sin backend), construido con la información real del negocio que aparece en el informe. No se implementan módulos de backend, autenticación, ni persistencia de datos: el formulario de contacto/solicitud de hora es solo de interfaz (validado en JS), sin envío real a un servidor.

## Resumen de información extraída de `informe.md`

**Identidad del negocio**
- Nombre: Veterinaria San Marcos
- Fundación: año 2009
- Ubicación: comuna de Rancagua, Región del Libertador General Bernardo O'Higgins, Chile (dirección exacta no especificada en el informe)

**Equipo**
- 3 médicos veterinarios
- 1 técnico veterinario
- 1 recepcionista administrativa

**Servicios ofrecidos**
- Consultas generales
- Vacunación
- Cirugía menor
- Desparasitación
- Control de peso

**Especies atendidas / público objetivo**
- Perros, gatos, conejos y aves
- Dueños de mascotas domésticas de Rancagua y alrededores
- Volumen actual: ~25 pacientes diarios

**Tono y estilo**
El informe no especifica una identidad de marca ni un tono comunicacional; es un documento técnico de requerimientos. Se infiere un tono **cálido, profesional y confiable** (propio de un servicio de salud para mascotas), evitando lo infantil o recargado — esto es una decisión de diseño, no un dato extraído del informe.

**Datos de contacto (no presentes en el informe → se usan placeholders)**
- Teléfono: `[COMPLETAR: teléfono de contacto]`
- Correo electrónico: `[COMPLETAR: correo electrónico]`
- Dirección exacta: `[COMPLETAR: dirección exacta en Rancagua]`
- Horario de atención: `[COMPLETAR: horario de atención]`
- Redes sociales: `[COMPLETAR: redes sociales, si existen]`

**Ubicación en el mapa**
El informe solo indica la comuna (Rancagua), no una dirección exacta. El mapa/sección de ubicación usará una posición aproximada del centro de Rancagua marcada explícitamente como referencial hasta que se complete la dirección real.

## Criterios de la rúbrica identificados (resumen)

De `rubrica.md` (Evaluación Parcial N°1, Desarrollo Fullstack II) se identifican los siguientes indicadores aplicables a este sitio:
- **IE1.1.1** — HTML5 semántico con navegación, imágenes, botones, video, formularios y footer.
- **IE1.1.2** — CSS externo y personalizado.
- **IE1.2.1 / IE1.2.2** — Validación de formularios en JavaScript con mensajes de error personalizados.
- **IE1.3.1 / IE1.3.2** — Commits claros y colaborativos en el repositorio.

El mapeo detallado criterio → sección del sitio se entrega completo en la Parte 10, junto con el checklist final de cumplimiento.

## Cómo abrir el proyecto

Abre `index.html` directamente en un navegador, o sírvelo como archivos estáticos con cualquier servidor simple, por ejemplo:

```bash
npx serve .
```

## Recursos multimedia pendientes

El código ya inserta correctamente `<img>` y `<video>` con `alt`/`poster` (cumpliendo la rúbrica en cuanto a estructura), pero **no se incluyen los archivos binarios reales** porque no venían en `informe.md` ni fueron provistos por el equipo. Antes de la presentación final, agregar en `assets/`:

- `assets/img/hero-veterinaria.jpg` — foto del equipo/clínica para el hero.
- `assets/img/video-poster.jpg` — imagen de portada del video.
- `assets/img/icon-consulta.svg`, `icon-vacunacion.svg`, `icon-cirugia.svg`, `icon-desparasitacion.svg`, `icon-control-peso.svg` — íconos de servicios.
- `assets/video/conoce-la-clinica.mp4` — video institucional embebido en "Sobre nosotros".

Sin estos archivos, el sitio funciona igual (HTML/CSS/JS válidos), pero se verán íconos/imágenes rotas.

## Verificación responsiva realizada

Se probó el sitio integrado (todas las partes 1–9) en navegador real a los siguientes anchos, confirmando ausencia de scroll horizontal, textos cortados o elementos superpuestos:

| Ancho | Dispositivo de referencia | Resultado |
| --- | --- | --- |
| 320px | Móvil pequeño | OK |
| 375px | Móvil grande | OK |
| 768px | Tablet portrait | OK — nav pasa a horizontal, servicios en 2 columnas |
| 1024px | Tablet landscape / laptop | OK — hero y "sobre nosotros" en 2 columnas |
| 1280px | Desktop | OK — servicios en 3 columnas |
| 1920px | Pantalla grande | OK — contenido centrado, sin estirarse de forma extraña |

Durante esta verificación se detectó y corrigió un bug: el mapa embebido capturaba el scroll del mouse (zoom accidental de la página completa). Se agregó un overlay "Haz clic para interactuar con el mapa" que lo soluciona.

## Checklist de cumplimiento de la rúbrica (Evaluación Parcial N°1)

| Indicador | Descripción | Dónde se cumple | Estado |
| --- | --- | --- | --- |
| **IE1.1.1** | HTML5 semántico: `header`, `nav`, `main`, `section`, `article`, `footer`, hipervínculos, imágenes, botones, video, formularios, footer informativo | `index.html` completo: estructura semántica, `<article class="service-card">`, navegación por anclas, imágenes en hero/servicios, botones (nav-toggle, CTAs, submit, back-to-top), `<video>` en "Sobre nosotros", formulario de contacto, footer con enlaces y datos | ✅ Cumple |
| **IE1.1.2** | Hoja de estilos CSS externa y personalizada | `styles.css` enlazado externamente desde `index.html`; sistema de diseño con variables; layout responsive mobile-first con 5 breakpoints | ✅ Cumple |
| **IE1.2.1 / IE1.2.2** | Validaciones controladas por JS, con sugerencias y mensajes de error personalizados | `script.js`: `FIELD_RULES` + `validateField()` — mensajes específicos por campo, mostrados en el contexto del formulario mediante `.field-error` con `aria-describedby`; `<datalist>` de especies como sugerencia; `novalidate` en el `<form>` para que la validación sea 100% JS | ✅ Cumple |
| **IE1.3.1 / IE1.3.2** | Commits claros, colaborativos, con tareas distribuidas entre el equipo | **No verificable desde el código.** Depende de que ambos apliquen los commits reales con los mensajes sugeridos, distribuidos como Persona A (Partes 1–5) y Persona B (Partes 6–10) | ⚠️ Pendiente de confirmar con `git log` una vez hechos los commits |

## Otras notas de cumplimiento / ambigüedades

- **Contraste de color:** se verificaron manualmente los pares texto/fondo principales (texto sobre fondo claro, texto muted, botones, footer oscuro) y todos superan ~4.5:1 (WCAG AA para texto normal). No se usó una herramienta automatizada de auditoría completa.
- **Accesibilidad de teclado:** todos los elementos interactivos son `<button>`/`<a>`/campos de formulario nativos (no `div`s falsos), hay `:focus-visible` visible en todo el sitio y se agregó un *skip link* ("Saltar al contenido principal").
- **Datos de contacto** (dirección, teléfono, correo, horario) siguen como `[COMPLETAR: ...]` porque no están en `informe.md` — deben completarse con datos reales antes de publicar el sitio.
- **Ubicación en el mapa** es referencial (centro de Rancagua), no la dirección exacta de la clínica, por la misma razón.