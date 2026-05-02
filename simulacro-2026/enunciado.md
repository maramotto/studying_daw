# Desarrollo de Aplicaciones Web
### 3er Grado en Ingeniería del Software
## Examen 20 de Mayo de 2026

El examen tiene una duración de 1 hora y 30 minutos.

---

## Ejercicio de Programación (6p)

La academia de idiomas **LinguaDaw** desea implementar una aplicación web para gestionar sus cursos de idiomas. La aplicación permitirá registrar nuevos cursos, listar los cursos disponibles (tanto cursos activos como cursos completos), inscribir alumnos en un curso, marcar un curso como completo y eliminar cursos del catálogo. Las funcionalidades específicas se definen a continuación:

- En la página principal se mostrará:
  - Un formulario para registrar un nuevo curso.
  - Los cursos activos, ordenados por número de plazas disponibles (de menor a mayor).
  - Los cursos completos, ordenados por nombre.
- A la hora de registrar un nuevo curso (course), se debe añadir el nombre del curso (name), el idioma (language), el número máximo de alumnos (maxStudents) y el nivel (level) que será uno de: "A1", "A2", "B1", "B2", "C1", "C2".
- Antes de registrar un nuevo curso, se verificará que no exista otro curso con el mismo nombre. En caso de encontrar una coincidencia, se mostrará un mensaje de error con `alert("Ya existe un curso con el mismo nombre")`.
- En los listados se debe mostrar el nombre del curso y el idioma. Al hacer click sobre el nombre del curso, te llevará a la vista de detalle.
- En el listado de cursos activos, se debe mostrar también las plazas disponibles (maxStudents - enrolledStudents).
- La vista de detalle debe mostrar el nombre, idioma, nivel, alumnos inscritos y plazas máximas. Si quedan menos de 3 plazas disponibles, se debe añadir al lado del nombre un mensaje "¡Últimas plazas!" en rojo. Además de eso, se muestran los siguientes botones que modifican el estado del curso:
  - **Inscribir alumno:** Se sumará uno a los alumnos inscritos del curso. Si los alumnos inscritos alcanzan el máximo, el curso pasará automáticamente a estar completo.
  - **Marcar como completo:** El curso pasará a estar completo independientemente de las plazas.
  - **Eliminar:** Elimina el curso del catálogo de la academia.
  - Al modificar el estado del curso, se actualizará la página sin recargar para mostrar los últimos cambios. Si el curso deja de estar disponible (eliminado), se mostrará únicamente "Curso no disponible".

**Cuestiones de implementación:**

- **Se deberá implementar una API REST y un frontend de tipo SPA. No se debe implementar una interfaz web con arquitectura MVC tradicional.**
- No es necesario usar ninguna librería de componentes CSS.
- El código deberá estar en inglés. Lo único que puede estar en castellano son los textos que aparecen en la interfaz de usuario.

**Se pide:**

### A) Implementar la API REST de la aplicación web con Spring Boot, SpringData y JPA. (2p)

- Se debe implementar una API REST respetando los principios de diseño: formato de las URLs, uso de los códigos de estado, cabeceras, métodos, etc.
- Se deberán usar DTOs. Se puede asumir que la clase "CourseMapper" ya existe.
- No es necesario escribir el fichero "pom.xml", se puede asumir que tiene todas las dependencias correspondientes.
- No es necesario escribir el fichero "application.properties", se puede asumir que está conectada a una base de datos externa correctamente configurada.
- No es necesario escribir la clase Application.
- Es necesario escribir TODOS los demás ficheros de la aplicación.
- No es necesario incluir los imports en los ficheros Java.
- No es necesario implementar los getter y setter de las clases Java. Se pueden dejar indicados con un comentario.

### B) Implementar el frontend usando React (2.5p)

- Se puede asumir que se dispone de un proyecto React Router creado con todos los ficheros necesarios de configuración (package.json, tsconfig.json, vite.config.ts, react-router.config.ts, root.tsx, etc).
- Hay que escribir el resto de ficheros necesarios para implementar los componentes, servicios, modelos y configuración de rutas.
- No es necesario incluir los imports en los ficheros TypeScript.
- Se usará HTML plano en el template de los componentes (sin ninguna librería de componentes como react-bootstrap o material-ui).
- Se asumirá que el proxy está correctamente configurado y se pueden usar URLs relativas para acceder a la API REST del backend.

### C) Desplegar la aplicación utilizando Docker Compose (1.5p)

- Implementa el fichero "docker-compose.yaml" necesario para desplegar y exponer la aplicación.
- Se asume que la aplicación web desarrollada en el examen está publicada en DockerHub con el nombre **"daw/linguadaw:1.0.0"**.
- Se debe utilizar la imagen de la base de datos **"mysql:8.0"** publicada en DockerHub.
- El puerto por defecto de la base de datos es el **3306**. Sin embargo, no se debe exponer dicho puerto en la máquina de host.
- Se debe exponer la aplicación web desarrollada durante el examen en el puerto **8443** de la máquina de host. El puerto de la aplicación web es el **8443**.
- Para la espera del servicio de la base de datos se puede utilizar una estrategia de reinicio del contenedor utilizando **"restart: on-failure"**.
- Se usará la siguiente configuración de variables de entorno para configurar la conexión del servicio web con la base de datos. Sustituye los <...> por los valores correctos.
  - SPRING_DATASOURCE_URL = jdbc:mysql://<...>
  - SPRING_DATASOURCE_USERNAME = root
  - SPRING_DATASOURCE_PASSWORD = <...>
- Se usará la siguiente configuración de variables de entorno para configurar la base de datos. Sustituye los <...> por los valores correctos.
  - MYSQL_ROOT_PASSWORD = <...>
  - MYSQL_DATABASE = <...>

---

## Instrucciones de entrega

El esquema para las carpetas del examen debe ser el siguiente:

- El código del backend debe estar en una carpeta llamada "backend".
- El código del frontend debe estar en una carpeta llamada "frontend".
- El código de Docker debe estar en una carpeta llamada "docker".

Solo se debe subir un fichero como entrega del examen. Dicho fichero tiene que ser un ZIP creado con "7-Zip". El nombre del ZIP debe ser **"PPG-Examen-Mayo.zip"**, donde "PPG" son las iniciales del alumno "Pepito Pérez González".
