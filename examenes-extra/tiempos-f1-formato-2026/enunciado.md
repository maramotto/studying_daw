# Desarrollo de Aplicaciones Web

**3.o Grado en Ingenieria del Software**

**Examen 20 de Mayo de 2026**

El examen tiene una duracion de 1 hora y 30 minutos.

---

## Ejercicio de Programacion (6p)

La escuderia **AlonsoDAW** desea implementar una aplicacion web para gestionar los tiempos por vuelta de Fernando Alonso durante los entrenamientos de Formula 1. La aplicacion permitira registrar nuevos tiempos, listar los tiempos de vueltas rapidas y los tiempos de vueltas normales, marcar un tiempo como vuelta rapida, quitar la marca de vuelta rapida y eliminar tiempos. Las funcionalidades especificas se definen a continuacion:

- En la pagina principal se mostrara:
  - Un formulario para registrar un nuevo tiempo de vuelta.
  - Los tiempos marcados como vuelta rapida (`fastest=true`), ordenados por numero de vuelta (de menor a mayor).
  - Los tiempos que no estan marcados como vuelta rapida (`fastest=false`), ordenados por numero de vuelta (de menor a mayor).

- A la hora de registrar un nuevo tiempo de vuelta (*lap time*), se debe anadir el numero de vuelta (*lapNumber*) y el tiempo (*time*, en formato "1:32.456").

- Antes de registrar un nuevo tiempo, se verificara que no exista otro tiempo con el mismo numero de vuelta ya registrado. En caso de encontrar una coincidencia, se mostrara un mensaje de error con el codigo:
  ```
  alert("Vuelta ya asignada")
  ```

- Una vez registrado un nuevo tiempo, este debera aparecer en la lista de vueltas normales (ya que por defecto `fastest=false`).

- En los listados se debe mostrar el numero de vuelta y el tiempo. Al hacer click sobre el numero de vuelta, te llevara a la vista de detalle.

- La vista de detalle debe mostrar el numero de vuelta y el tiempo. Si el tiempo esta marcado como vuelta rapida, se debe mostrar un mensaje **"Vuelta rapida!"** en color verde. Ademas, se muestran los siguientes botones que modifican el estado del tiempo:
  - **Marcar rapida**: El tiempo pasara a estar marcado como vuelta rapida.
  - **Quitar marca**: El tiempo dejara de estar marcado como vuelta rapida. Este boton solo se mostrara si el tiempo esta marcado como vuelta rapida.
  - **Borrar**: Elimina el tiempo del sistema.
  - Al modificar el estado del tiempo, se actualizara la pagina sin recargar para mostrar los ultimos cambios. Si el tiempo se elimina, se mostrara unicamente **"Tiempo no disponible"**.

**Cuestiones de implementacion:**

- **Se debera implementar una API REST y un frontend de tipo SPA. No se debe implementar una interfaz web con arquitectura MVC tradicional.**
- No es necesario usar ninguna libreria de componentes CSS.
- El codigo debera estar en ingles. Lo unico que puede estar en castellano son los textos que aparecen en la interfaz de usuario.

**Se pide:**

### A) Implementar la API REST de la aplicacion web con Spring Boot, SpringData y JPA. (2p)

- Se debe implementar una API REST respetando los principios de diseno: formato de las URLs, uso de los codigos de estado, cabeceras, metodos, etc.
- Se deberan usar DTOs. Se puede asumir que la clase "LapTimeMapper" ya existe.
- No es necesario escribir el fichero "pom.xml", se puede asumir que tiene todas las dependencias correspondientes.
- No es necesario escribir el fichero "application.properties", se puede asumir que esta conectada a una base de datos externa correctamente configurada.
- No es necesario escribir la clase Application.
- Es necesario escribir TODOS los demas ficheros de la aplicacion.
- No es necesario incluir los imports en los ficheros Java.
- No es necesario implementar los getter y setter de las clases Java. Se pueden dejar indicados con un comentario.

### B) Implementar el frontend usando React (2.5p)

- Se puede asumir que se dispone de un proyecto React creado con todos los ficheros necesarios (index.html, package.json, tsconfig.json, vite.config.ts, etc).
- Hay que escribir el resto de ficheros necesarios para implementar los componentes, servicios y configuracion de rutas. El fichero `routes.ts` debera contener la configuracion de rutas usando React Router en framework mode.
- No es necesario incluir los imports en los ficheros TypeScript.
- Se usara HTML plano en los componentes (sin ninguna libreria de componentes como react-bootstrap o material-ui).
- Se asumira que el proxy esta correctamente configurado y se pueden usar URLs relativas para acceder a la API REST del backend.
- Para poner un texto de color verde en CSS, se puede usar la propiedad `color: green`.

### C) Desplegar la aplicacion utilizando Docker Compose (1.5p)

- Implementa el fichero "docker-compose.yaml" necesario para desplegar y exponer la aplicacion.
- Se asume que la aplicacion web desarrollada en el examen esta publicada en DockerHub con el nombre **"daw/alonsodaw:1.0.0"**.
- Se debe utilizar la imagen de la base de datos **"mysql:8.0"** publicada en DockerHub.
- El puerto por defecto de la base de datos es el **3306**. Sin embargo, no se debe exponer dicho puerto en la maquina de host.
- Se debe exponer la aplicacion web desarrollada durante el examen en el puerto **443** de la maquina de host. El puerto de la aplicacion web es el **8443**.
- Para la espera del servicio de la base de datos se puede utilizar una estrategia de reinicio del contenedor utilizando **"restart: on-failure"**.
- Se usara la siguiente configuracion de variables de entorno para configurar la conexion del servicio web con la base de datos. Sustituye los `<...>` por los valores correctos.
  - `SPRING_DATASOURCE_URL = jdbc:mysql://<...>`
  - `SPRING_DATASOURCE_USERNAME = root`
  - `SPRING_DATASOURCE_PASSWORD = <...>`
- Se usara la siguiente configuracion de variables de entorno para configurar la base de datos. Sustituye los `<...>` por los valores correctos.
  - `MYSQL_ROOT_PASSWORD = <...>`
  - `MYSQL_DATABASE = <...>`

---

## Instrucciones de entrega

El esquema para las carpetas del examen debe ser el siguiente:

- El codigo del backend debe estar en una carpeta llamada "backend".
- El codigo del frontend debe estar en una carpeta llamada "frontend".
- El codigo de Docker debe estar en una carpeta llamada "docker".

Solo se debe subir un fichero como entrega del examen. Dicho fichero tiene que ser un ZIP creado con "7-Zip". El nombre del ZIP debe ser **"PPG-Examen-Mayo.zip"**, donde "PPG" son las iniciales del alumno "Pepito Perez Gonzalez".
