# INFORME PROYECTO DE DESARROLLO

# FULL STACK II

## Sistema de Gestión Operativa y Clínica – Veterinaria San

## Marcos

Asignatura: Desarrollo Full Stack II (DSY1104) Sección / Forma: Forma A Carrera: Ingeniería informática Docente: Roberto moreno Estudiante(s):German Pino ,Bruno Rivera Fecha: Institución:

# ÍNDICE

1. Introducción
2. Presentación de la empresa y contexto
3. Descripción de la problemática
4. Justificación del proyecto
5. Objetivos del proyecto 5.1. Objetivo general 5.2. Objetivos específicos
6. Solución propuesta
7. Alcance del proyecto
8. Requisitos funcionales
9. Requisitos no funcionales
10. Roles y permisos de usuario
11. Arquitectura técnica
12. Stack tecnológico
13. Diseño y modelo de datos
14. Historias de usuario
15. Gestión y metodología del proyecto
16. Seguridad del sistema
17. Diseño responsive
18. Integración de mapas
19. Contenerización y despliegue
20. Resultados esperados
21. Trabajo futuro
22. Conclusiones
23. Bibliografía
1. INTRODUCCIÓN

El presente informe describe el desarrollo de una solución tecnológica para la gestión operativa y clínica de la Veterinaria San Marcos, ubicada en la comuna de Rancagua, Región del Libertador General Bernardo O'Higgins, Chile.

La propuesta surge como respuesta a las dificultades generadas por el uso de procesos manuales para administrar las citas, fichas clínicas, vacunaciones y datos de los pacientes. El crecimiento de la demanda ha provocado que estos procedimientos sean cada vez menos eficientes, aumentando el riesgo de pérdida de información, errores administrativos y dificultades para realizar un seguimiento adecuado de las mascotas atendidas.

Para solucionar esta problemática se propone implementar una plataforma web Full Stack que permita centralizar la información y facilitar la comunicación entre los dueños de mascotas, la recepción y el personal veterinario.

El sistema considera una arquitectura basada en microservicios, utilizando HTML, CSS con Tailwind CSS y JavaScript para el desarrollo del frontend, Spring Boot con Java para el backend, MySQL como sistema gestor de bases de datos, Docker para la contenerización y AWS como infraestructura cloud.

La plataforma permitirá gestionar solicitudes de citas, fichas clínicas digitales, vacunaciones, usuarios y roles, además de incorporar un mapa interactivo con la ubicación de la clínica.

2. PRESENTACIÓN DE LA EMPRESA Y

# CONTEXTO

Veterinaria San Marcos es una clínica veterinaria fundada en el año 2009 y ubicada en la comuna de Rancagua, Región del Libertador General Bernardo O'Higgins.

Actualmente cuenta con un equipo compuesto por:

- 3 médicos veterinarios.
- 1 técnico veterinario.
- 1 recepcionista administrativa.

La clínica presta servicios orientados principalmente a animales domésticos, entre ellos:

- Perros.
- Gatos.
- Conejos.
- Aves.

Dentro de los principales servicios ofrecidos se encuentran las consultas generales, vacunación, cirugía menor, desparasitación y control de peso.

La veterinaria atiende aproximadamente 25 pacientes diarios. Durante los últimos dos años se ha producido un crecimiento sostenido de la demanda, provocando que los procesos administrativos basados en registros físicos sean cada vez más difíciles de controlar.

Actualmente, la información se encuentra distribuida en agendas y fichas físicas, lo que dificulta el acceso oportuno a los datos y limita la capacidad de la administración para obtener estadísticas y tomar decisiones basadas en información actualizada.

3. DESCRIPCIÓN DE LA PROBLEMÁTICA

La Veterinaria San Marcos presenta diversas dificultades relacionadas con la gestión manual de sus procesos.

## 3.1. Gestión manual de citas

Las horas médicas son registradas actualmente en una agenda física, principalmente mediante llamadas telefónicas o solicitudes presenciales.

Este procedimiento dificulta la organización de los horarios y no permite que los clientes puedan consultar o solicitar horas de manera autónoma.

## 3.2. Inasistencia de pacientes

Aproximadamente el 20% de las citas agendadas termina en inasistencia debido principalmente al olvido de los clientes.

La ausencia de recordatorios automáticos provoca la pérdida de bloques horarios que podrían ser utilizados por otros pacientes.

## 3.3. Pérdida y deterioro de fichas clínicas

Las fichas médicas son almacenadas físicamente. Durante los últimos seis meses se han extraviado cuatro fichas clínicas.

Esto representa un riesgo importante para la continuidad de la atención y para la disponibilidad del historial médico de cada mascota.

## 3.4. Inaccesibilidad simultánea

El formato físico de las fichas impide que dos profesionales puedan consultar la información de un mismo paciente de manera simultánea.

En un sistema digital, en cambio, los usuarios autorizados podrían acceder a la información de acuerdo con sus permisos.

## 3.5. Falta de seguimiento de vacunaciones

Actualmente no existe un historial digital de vacunas. Por este motivo, el seguimiento de las fechas de vacunación depende principalmente de la información que recuerde o conserve cada propietario.

## 3.6. Ausencia de métricas

La administración no cuenta con un sistema que permita obtener rápidamente información sobre la cantidad de pacientes atendidos, nuevos pacientes, citas realizadas o cancelaciones.

Para obtener estos datos sería necesario revisar manualmente los registros físicos.

4. JUSTIFICACIÓN DEL PROYECTO

La implementación de una plataforma web permitirá modernizar los procesos de la Veterinaria San Marcos y centralizar la información relacionada con pacientes, mascotas, citas y fichas clínicas.

La solución permitirá reducir la dependencia de documentos físicos y facilitará el acceso a la información desde computadores, tablets y dispositivos móviles.

Además, la gestión digital de las citas permitirá mejorar la organización de la agenda y facilitar la confirmación o reagendamiento de horas.

La digitalización de las fichas clínicas permitirá disminuir el riesgo de pérdida de información y facilitará el acceso autorizado al historial de cada mascota.

Por otra parte, el sistema permitirá obtener información consolidada que pueda utilizarse para generar métricas y apoyar la toma de decisiones administrativas.

5. OBJETIVOS DEL PROYECTO

## 5.1. Objetivo general

Desarrollar una plataforma web Full Stack para digitalizar y optimizar la gestión operativa y clínica de la Veterinaria San Marcos, permitiendo administrar citas, usuarios, mascotas, fichas clínicas y vacunaciones mediante una solución centralizada, segura y responsive.

## 5.2. Objetivos específicos

1. Implementar un sistema de solicitud y gestión de citas online.
2. Digitalizar las fichas clínicas de las mascotas.
3. Implementar un historial de vacunaciones.
4. Desarrollar un sistema de autenticación y autorización basado en roles.
5. Permitir que los propietarios consulten información de sus mascotas.
6. Implementar una interfaz responsive compatible con dispositivos móviles, tablets y computadores.
7. Incorporar un mapa interactivo con la ubicación de la veterinaria.
8. Utilizar una arquitectura de microservicios para facilitar la escalabilidad.
9. Contenerizar la aplicación mediante Docker.
10. Preparar el sistema para su despliegue en infraestructura cloud AWS.
6. SOLUCIÓN PROPUESTA

La solución consiste en una plataforma web centralizada que permita gestionar los principales procesos de la veterinaria.

El sistema estará compuesto por un frontend desarrollado con HTML, CSS (Tailwind CSS) y JavaScript, y un backend construido mediante microservicios Spring Boot.

La plataforma tendrá cinco pilares principales:

#### 6.1. Agenda y solicitud de citas

Los propietarios podrán solicitar una cita seleccionando:

- Mascota.
- Fecha.
- Hora.
- Motivo de la consulta.

La recepción podrá revisar las solicitudes y confirmar, reagendar o cancelar las citas.

#### 6.2. Ficha clínica digital

Los profesionales veterinarios podrán registrar información clínica de cada mascota, incluyendo:

- Diagnóstico.
- Peso.
- Medicamentos.
- Observaciones.
- Tratamientos.
- Vacunas.
- Historial de atenciones.

#### 6.3. Control de acceso

El sistema contará con autenticación mediante JWT y control de acceso basado en roles.

Cada usuario tendrá acceso solamente a las funciones que correspondan a su perfil.

#### 6.4. Mapa interactivo

La plataforma incorporará un mapa interactivo que mostrará la ubicación de Veterinaria San Marcos en Rancagua.

El usuario podrá utilizar el mapa para conocer la ubicación y obtener una ruta hacia la clínica.

#### 6.5. Infrastructure cloud

La aplicación será preparada para ejecutarse mediante contenedores Docker y desplegarse sobre infraestructura AWS.

7. ALCANCE DEL PROYECTO

El proyecto contempla el desarrollo de los siguientes módulos:

- Autenticación de usuarios.
- Gestión de usuarios.
- Gestión de roles.
- Registro de mascotas.
- Gestión de citas.
- Ficha clínica.
- Historial de vacunaciones.
- Consulta de información de mascotas.
- Mapa de ubicación.
- Interfaz responsive.
- API REST.
- Bases de datos MySQL.
- Contenedores Docker.
- Preparación para despliegue en AWS.

No se considera dentro de la primera versión:

- Pagos online.
- Integración con WhatsApp.
- Recordatorios automáticos.
- Telemedicina.
- Integración con farmacias externas.

Estas funcionalidades podrán incorporarse en futuras versiones.

8. REQUISITOS FUNCIONALES

## RF1 – Solicitud y gestión de citas

El dueño de una mascota podrá crear una solicitud de atención seleccionando fecha, hora, mascota y motivo.

La recepcionista podrá confirmar, reagendar o cancelar la solicitud.

## RF2 – Ficha clínica digital

El personal veterinario podrá crear y consultar el historial médico de las mascotas.

La información podrá incluir diagnósticos, peso, medicamentos, tratamientos y vacunas.

## RF3 – Gestión de usuarios

El administrador podrá crear, editar, desactivar y consultar cuentas de usuario.

También podrá asignar los roles correspondientes.

## RF4 – Gestión de mascotas

El propietario podrá registrar y consultar sus mascotas.

Los datos podrán incluir nombre, especie, raza, sexo, fecha de nacimiento y antecedentes relevantes.

## RF5 – Historial de vacunación

El personal autorizado podrá registrar las vacunas aplicadas a cada mascota.

El propietario podrá consultar posteriormente esta información.

## RF6 – Geolocalización

El sistema deberá mostrar un mapa interactivo con la ubicación de la clínica y permitir la generación de una ruta.

## RF7 – Consulta de información

Los propietarios podrán consultar solamente la información correspondiente a sus propias mascotas.

9. REQUISITOS NO FUNCIONALES

## RNF1 – Arquitectura

El backend deberá estar desarrollado utilizando Spring Boot y una arquitectura basada en microservicios independientes.

El frontend se comunicará con los microservicios exclusivamente mediante peticiones HTTP (GET, POST, PUT, DELETE) a las APIs REST; no se permite comunicación directa entre el frontend y las bases de datos. Cada microservicio contará con su propio archivo de configuración y podrá ejecutarse de forma independiente.

## RNF2 – Responsive Design

La interfaz deberá adaptarse a:

- Dispositivos móviles desde 360 px.
- Tablets desde 768 px.
- Computadores de escritorio desde 1280 px.

## RNF3 – Seguridad

Las contraseñas deberán almacenarse de forma segura y la autenticación deberá utilizar JWT.

Los propietarios no deberán tener acceso a información perteneciente a otras cuentas.

Ninguna vista ni endpoint del sistema será accesible sin autenticación válida, con excepción de las pantallas de inicio de sesión y de registro público.

## RNF4 – Base de datos

Se utilizará MySQL como sistema gestor de base de datos relacional.

El modelo de datos deberá estar normalizado con un mínimo de Tercera Forma Normal (3FN), y cada microservicio deberá contar con su propia base de datos o esquema independiente.

## RNF5 – Contenerización

Los componentes principales del sistema deberán poder ejecutarse mediante Docker.

## RNF6 – Escalabilidad

La arquitectura deberá permitir agregar nuevos servicios y funcionalidades sin modificar completamente el sistema existente.

## RNF7 – Disponibilidad

La aplicación deberá estar preparada para ejecutarse en infraestructura cloud.

10. ROLES Y PERMISOS DE USUARIO

## 10.1. Administrador

El administrador tendrá acceso completo al sistema.

Sus principales funciones serán:

- Gestionar usuarios.
- Crear usuarios.
- Editar usuarios.
- Desactivar cuentas.
- Asignar roles.
- Consultar información general.
- Visualizar reportes.

## 10.2. Recepcionista / Operador

La recepcionista podrá:

- Gestionar la agenda.
- Confirmar citas.
- Reagendar citas.
- Cancelar citas.
- Registrar pacientes.
- Registrar propietarios.
- Crear cuentas de clientes.

## 10.3. Dueño de mascota

El propietario podrá:

- Crear y gestionar sus mascotas.
- Solicitar citas.
- Consultar el estado de sus citas.
- Consultar el historial clínico autorizado.
- Consultar el carnet de vacunación.
- Consultar la ubicación de la clínica.

### 10.4. Personal Clínico (Médico y Técnico Veterinario)

El personal clínico podrá:

- Consultar y registrar fichas clínicas de las mascotas.
- Registrar diagnósticos, tratamientos, medicamentos y peso.
- Registrar y actualizar el historial de vacunación de cada mascota.
- Consultar el historial médico de los pacientes atendidos.

11. ARQUITECTURA TÉCNICA

La solución utilizará una arquitectura de microservicios.

La comunicación entre el frontend y los servicios backend se realizará mediante APIs REST utilizando formato JSON.

Cada microservicio expone su propia API REST con rutas organizadas por recurso (por ejemplo, /api/citas, /api/usuarios, /api/mascotas) y responde siempre en formato JSON, incluyendo los mensajes de error.

Una posible distribución de los servicios es:

#### Microservicio de autenticación

Responsable de:

- Login.
- Validación de credenciales.
- Generación de tokens JWT.
- Gestión de permisos.

#### Microservicio de usuarios

Responsable de:

- Usuarios.
- Roles.
- Estados de las cuentas.

#### Microservicio de mascotas

Responsable de:

- Registro de mascotas.
- Datos básicos.
- Relación entre propietario y mascota.

#### Microservicio de citas

Responsable de:

- Solicitudes.
- Confirmaciones.
- Reagendamientos.
- Cancelaciones.
- Estados de las citas.

#### Microservicio clínico

Responsable de:

- Fichas clínicas.
- Diagnósticos.
- Tratamientos.
- Medicamentos.
- Peso.
- Vacunaciones.

Cada microservicio deberá contar con su propia base de datos o esquema independiente, permitiendo una mayor separación de responsabilidades.

12. STACK TECNOLÓGICO

Capa Tecnología Justificación Frontend HTML5 / CSS3 / Tailwind Interfaz construida con tecnologías web CSS / JavaScript estándar, consumiendo la API REST mediante fetch/AJAX Lenguaje Frontend JavaScript (ES6+) Lógica de interfaz, validaciones de formularios y consumo de la API REST Diseño Tailwind CSS Utilidades CSS para maquetar interfaces responsive de forma rápida y consistente Backend Spring Boot Desarrollo de APIs y microservicios Lenguaje Backend Java Lenguaje robusto y ampliamente utilizado Comunicación REST / JSON Comunicación entre componentes Base de datos MySQL Gestión relacional de información Seguridad JWT Autenticación y autorización Mapas Leaflet / Google Maps Visualización de ubicación Contenedores Docker Estandarización de ambientes Cloud AWS Infraestructura escalable Control de Git Gestión del código fuente versiones

13. DISEÑO Y MODELO DE DATOS

La base de datos estará diseñada bajo un modelo relacional y normalizado.

Entre las principales entidades se consideran:

#### Usuario

- id_usuario
- nombre
- apellido
- correo
- contraseña
- estado
- rol

#### Rol

- id_rol
- nombre

#### Mascota

- id_mascota
- nombre
- especie
- raza
- sexo
- fecha_nacimiento
- peso
- id_usuario

#### Cita

- id_cita
- fecha
- hora
- motivo
- estado
- id_mascota
- id_usuario

#### Ficha clínica

- id_ficha
- fecha
- diagnóstico
- tratamiento
- observaciones
- peso
- id_mascota
- id_veterinario

#### Vacuna

- id_vacuna
- nombre
- fecha_aplicacion
- fecha_proxima
- observaciones
- id_mascota

La relación entre estas entidades permitirá mantener la trazabilidad de las atenciones realizadas.

14. HISTORIAS DE USUARIO

## HU01 – Solicitar cita

Como: dueño de mascota. Quiero: solicitar una cita indicando fecha, hora y motivo. Para: obtener una atención veterinaria.

Criterio de aceptación: el sistema deberá registrar la solicitud y mostrar su estado.

## HU02 – Gestionar cita

Como: recepcionista. Quiero: confirmar, reagendar o cancelar una cita. Para: administrar correctamente la agenda.

## HU03 – Registrar ficha clínica

Como: veterinario. Quiero: registrar información clínica de una mascota. Para: mantener actualizado su historial médico.

## HU04 – Consultar vacunaciones

Como: dueño de mascota. Quiero: consultar las vacunas de mi mascota. Para: conocer su historial de vacunación.

## HU05 – Gestionar usuarios

Como: administrador. Quiero: crear y modificar usuarios. Para: controlar el acceso al sistema.

## HU06 – Consultar ubicación

Como: dueño de mascota. Quiero: visualizar la ubicación de la clínica. Para: poder llegar fácilmente al establecimiento.

15. GESTIÓN Y METODOLOGÍA DEL

# PROYECTO

Para organizar el desarrollo se utilizará una metodología ágil basada en Scrum/Kanban.

Se utilizará un tablero visual para controlar el avance de las tareas.

Las principales etapas serán:

Backlog: Registro de requerimientos e historias de usuario.

Sprint 1 – Backend y Base de Datos: Desarrollo de microservicios Spring Boot, creación de las bases de datos y configuración de autenticación.

Sprint 2 – Frontend Web: Desarrollo de las interfaces, formularios, navegación y diseño responsive.

Sprint 3 – Integración y despliegue: Integración frontend-backend, configuración de Docker y preparación del despliegue en AWS.

16. SEGURIDAD DEL SISTEMA

La seguridad será un componente fundamental del proyecto debido a que la plataforma almacenará información personal de los usuarios y antecedentes relacionados con las mascotas.

Se implementarán las siguientes medidas:

- Autenticación mediante usuario y contraseña.
- Contraseñas almacenadas mediante algoritmos de hash.
- Autenticación mediante tokens JWT.
- Control de acceso basado en roles.
- Restricción de endpoints según permisos.
- Validación de datos enviados por los usuarios.
- Protección del acceso a información de mascotas.
- Separación de responsabilidades entre microservicios.

El dueño de una mascota solamente podrá consultar los registros asociados a sus propias mascotas.

17. DISEÑO RESPONSIVE

El sistema será desarrollado bajo el concepto Responsive Design.

La interfaz deberá adaptarse automáticamente a diferentes tamaños de pantalla.

#### Dispositivos móviles

Se considerará un ancho mínimo de 360 px.

Las funcionalidades deberán ser accesibles mediante botones y componentes optimizados para pantallas pequeñas.

Los menús de navegación se colapsan en un menú tipo "hamburguesa" para optimizar el espacio disponible.

#### Tablets

Se considerará un ancho mínimo de 768 px.

La interfaz podrá utilizar una distribución de dos columnas cuando corresponda.

Los menús de navegación pueden mostrarse de forma lateral o en la barra superior.

#### Computadores

Se considerará un ancho mínimo de 1280 px.

La versión de escritorio permitirá aprovechar una mayor cantidad de espacio para paneles administrativos, tablas y formularios.

18. INTEGRACIÓN DE MAPAS

El sistema incorporará un mapa interactivo para mostrar la ubicación de Veterinaria San Marcos en Rancagua.

Para esta funcionalidad se podrá utilizar Leaflet junto con un proveedor de mapas compatible.

El mapa permitirá:

- Mostrar la ubicación de la clínica.
- Visualizar un marcador.
- Acercar y alejar el mapa.
- Consultar la ubicación.
- Facilitar el trazado de una ruta mediante servicios de mapas compatibles.

Esta funcionalidad facilitará el acceso de nuevos clientes a las instalaciones.

19. CONTENERIZACIÓN Y DESPLIEGUE

La solución será preparada para ejecutarse mediante Docker.

Cada componente podrá ser empaquetado dentro de un contenedor, facilitando la instalación y configuración del sistema.

Una posible estructura de despliegue contempla:

- Contenedor frontend (HTML, CSS y JavaScript servidos mediante Nginx).
- Contenedores para microservicios Spring Boot.
- Contenedor o servicio para MySQL.
- Configuración de red entre servicios.
- Variables de entorno para configuraciones sensibles.

Posteriormente, el sistema podrá ser desplegado sobre infraestructura AWS.

La utilización de contenedores permite mantener ambientes consistentes entre desarrollo, pruebas y producción.

20. RESULTADOS ESPERADOS

Con la implementación de la plataforma se esperan obtener los siguientes resultados:

1. Reducir la dependencia de agendas y fichas físicas.
2. Disminuir el riesgo de pérdida de información clínica.
3. Mejorar la administración de las citas.
4. Facilitar el acceso a la información de las mascotas.
5. Mejorar el seguimiento de las vacunas.
6. Facilitar la atención de los pacientes.
7. Permitir el acceso concurrente a información autorizada.
8. Mejorar la experiencia de los propietarios.
9. Obtener información organizada para generar métricas.
10. Contar con una plataforma preparada para futuras ampliaciones.
21. TRABAJO FUTURO

Como evolución del sistema se contempla desarrollar una versión 2.0 que incorpore nuevas funcionalidades.

Entre las principales mejoras se consideran:

#### Recordatorios automáticos

Implementación de notificaciones mediante correo electrónico o WhatsApp para recordar las próximas citas y vacunaciones.

#### Pagos online

Incorporación de una pasarela de pago para permitir que los clientes puedan cancelar consultas y otros servicios directamente desde la plataforma.

#### Reportes avanzados

Creación de paneles estadísticos para visualizar:

- Cantidad de pacientes atendidos.
- Citas por período.
- Inasistencias.
- Pacientes nuevos.
- Vacunas aplicadas.
- Servicios más solicitados.

#### Notificaciones

Implementación de un sistema de notificaciones para informar cambios de estado en las citas.

#### Aplicación móvil

Como futura expansión se podría desarrollar una aplicación móvil para propietarios y profesionales.

22. CONCLUSIONES

El desarrollo de una plataforma web para Veterinaria San Marcos representa una oportunidad para modernizar y optimizar los procesos actualmente realizados de manera manual.

La solución propuesta permitirá centralizar la información relacionada con usuarios, mascotas, citas, fichas clínicas y vacunaciones, disminuyendo los riesgos asociados al almacenamiento de documentos físicos.

La implementación de una agenda digital permitirá mejorar la administración de las horas médicas y facilitará la interacción entre los propietarios y la recepción.

Por otra parte, las fichas clínicas digitales permitirán disponer de información de manera rápida y organizada, facilitando el trabajo de los profesionales veterinarios y evitando problemas asociados al extravío o deterioro de documentos.

El uso de HTML, CSS, Tailwind CSS, JavaScript, Spring Boot, MySQL, Docker y AWS permitirá construir una solución moderna, escalable y preparada para futuras ampliaciones.

Finalmente, la arquitectura basada en microservicios permitirá separar las distintas funcionalidades del sistema, facilitando su mantenimiento y evolución.

En conclusión, el proyecto contribuye directamente a la transformación digital de Veterinaria San Marcos, mejorando tanto la gestión interna de la organización como la experiencia de sus clientes.

23. BIBLIOGRAFÍA

[Agregar aquí las fuentes utilizadas para desarrollar el proyecto.]

Ejemplos de fuentes que pueden incorporarse:

- Documentación oficial de Tailwind CSS.
- Documentación oficial de Spring Boot.
- Documentación oficial de MySQL.
- Documentación oficial de Docker.
- Documentación oficial de Amazon Web Services.
- Documentación oficial de Leaflet.
- Documentación relacionada con JWT.
- Material proporcionado por la asignatura Desarrollo Full Stack II.

# ANEXOS

## Anexo A – Capturas de pantalla

[Agregar capturas de las interfaces desarrolladas.]

## Anexo B – Diagrama de arquitectura

[Agregar diagrama de arquitectura del sistema.]

## Anexo C – Modelo entidad-relación

[Agregar imagen del modelo de base de datos.]

## Anexo D – Tablero Kanban / Scrum

[Agregar captura del tablero utilizado durante el desarrollo.]

## Anexo E – Evidencias de Docker

[Agregar capturas de los contenedores funcionando.]

## Anexo F – Evidencias de despliegue AWS

[Agregar capturas del sistema desplegado en AWS.]
