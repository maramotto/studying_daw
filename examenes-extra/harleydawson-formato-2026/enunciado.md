# Desarrollo de Aplicaciones Web
## 3. Grado en Ingenieria del Software
### Examen Mayo 2026

El examen tiene una duracion de 1 hora y 30 minutos.

---

## Ejercicio de Programacion (6p)

El concesionario de motos **HarleyDawson** desea implementar una aplicacion web para gestionar la entrega de las motos a sus clientes. La aplicacion permitira registrar nuevas entregas, listar las entregas pendientes y finalizadas, marcar una entrega como finalizada y eliminar entregas del sistema. Las funcionalidades especificas se definen a continuacion:

- En la pagina principal se mostrara:
  - Un formulario para registrar una nueva entrega.
  - Las entregas pendientes, ordenadas por cilindrada (de mayor a menor).
  - Las entregas finalizadas, ordenadas por modelo (alfabeticamente).

- A la hora de registrar una nueva entrega (delivery), se debe anadir la matricula (plate), modelo de la moto (model), color de la moto (color), cilindrada de la moto (displacement), direccion del envio (address) y nombre del cliente (clientName).

- Antes de registrar una nueva entrega, se verificara que no exista otra entrega con la misma matricula. En caso de encontrar una coincidencia, se mostrara un mensaje de error con `alert("Moto pendiente de envio")`.

- Una vez registrada una nueva entrega, esta debe aparecer en la lista de entregas pendientes.

- En los listados se debe mostrar la matricula, el modelo y el nombre del cliente como enlace a la vista de detalle.

- La vista de detalle debe mostrar todos los campos de la entrega: matricula, modelo, color, cilindrada, direccion y nombre del cliente. Si la cilindrada es mayor o igual a 1000, se debe mostrar un mensaje "Gran cilindrada!" en rojo. Ademas, se muestran los siguientes botones:
  - **Entrega finalizada**: Marca la entrega como finalizada. Este boton solo debe mostrarse si la entrega esta pendiente.
  - **Eliminar**: Elimina la entrega del sistema.
  - Al modificar el estado de la entrega o eliminarla, se actualizara la pagina sin recargar para mostrar los ultimos cambios. Si la entrega ha sido eliminada, se mostrara unicamente "Entrega no encontrada".

**Cuestiones de implementacion:**

- **Se debera implementar una API REST y un frontend de tipo SPA. No se debe implementar una interfaz web con arquitectura MVC tradicional.**
- No es necesario usar ninguna libreria de componentes CSS.
- El codigo debera estar en ingles. Lo unico que puede estar en castellano son los textos que aparecen en la interfaz de usuario.

---

### Se pide:

#### A) Implementar la API REST de la aplicacion web con Spring Boot, SpringData y JPA. (2p)

- Se debe implementar una API REST respetando los principios de diseno: formato de las URLs, uso de los codigos de estado, cabeceras, metodos, etc.
- Se deberan usar DTOs. Se puede asumir que la clase "DeliveryMapper" ya existe.
- No es necesario escribir el fichero "pom.xml", se puede asumir que tiene todas las dependencias correspondientes.
- No es necesario escribir el fichero "application.properties", se puede asumir que esta conectada a una base de datos externa correctamente configurada.
- No es necesario escribir la clase Application.
- Es necesario escribir TODOS los demas ficheros de la aplicacion.
- No es necesario incluir los imports en los ficheros Java.
- No es necesario implementar los getter y setter de las clases Java. Se pueden dejar indicados con un comentario.

#### B) Implementar el frontend usando React (2.5p)

- Se puede asumir que se dispone de un proyecto React creado con todos los ficheros necesarios (index.html, package.json, tsconfig.json, vite.config.ts, etc).
- Hay que escribir el resto de ficheros necesarios para implementar los componentes, servicios y configuracion de rutas (en caso de que sean necesarias). Basta con que el archivo "routes.ts" contenga un array con las rutas y los componentes correctamente definidos.
- No es necesario incluir los imports en los ficheros TypeScript.
- Se usara HTML plano en el template de los componentes (sin ninguna libreria de componentes como react-bootstrap o material-ui).
- Se asumira que el proxy esta correctamente configurado y se pueden usar URLs relativas para acceder a la API REST del backend.
- Para poner un texto de color rojo en CSS, se puede usar la propiedad `color: red`

#### C) Desplegar la aplicacion utilizando Docker Compose (1.5p)

- Implementa el fichero "docker-compose.yaml" necesario para desplegar y exponer la aplicacion.
- Se asume que la aplicacion web desarrollada en el examen esta publicada en DockerHub con el nombre **"daw/harleydawson:1.0.0"**.
- Se debe utilizar la imagen de la base de datos **"mysql:8.0"** publicada en DockerHub.
- El puerto por defecto de la base de datos es el 3306. Sin embargo, no se debe exponer dicho puerto en la maquina de host.
- Se debe exponer la aplicacion web desarrollada durante el examen en el puerto **443** de la maquina de host. El puerto de la aplicacion web es el **8443**.
- Para la espera del servicio de la base de datos se puede utilizar una estrategia de reinicio del contenedor utilizando **"restart: on-failure"**.
- Se usara la siguiente configuracion de variables de entorno para configurar la conexion del servicio web con la base de datos. Sustituye los <...> por los valores correctos.
  - SPRING_DATASOURCE_URL = jdbc:mysql://<...>
  - SPRING_DATASOURCE_USERNAME = root
  - SPRING_DATASOURCE_PASSWORD = <...>
- Se usara la siguiente configuracion de variables de entorno para configurar la base de datos. Sustituye los <...> por los valores correctos.
  - MYSQL_ROOT_PASSWORD = <...>
  - MYSQL_DATABASE = <...>

---

### Instrucciones de entrega

El esquema para las carpetas del examen debe ser el siguiente:

- El codigo del backend debe estar en una carpeta llamada "backend".
- El codigo del frontend debe estar en una carpeta llamada "frontend".
- El codigo de Docker debe estar en una carpeta llamada "docker".

Solo se debe subir un fichero como entrega del examen. Dicho fichero tiene que ser un ZIP creado con "7-Zip". El nombre del ZIP debe ser **"PPG-Examen-Mayo.zip"**, donde "PPG" son las iniciales del alumno "Pepito Perez Gonzalez".
