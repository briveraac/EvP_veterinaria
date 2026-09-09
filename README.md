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