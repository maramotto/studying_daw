# **Ejemplo Práctica 3**

Este ejemplo incluye algunas de las funcionalidades requeridas en la **Práctica 3** del proyecto. Se trata de una página web desarrollada con **React y React Router**, que consume una **API REST** implementada en la **Práctica 2**.

Además, en esta implementación se ha utilizado **Zustand** para la gestión de los usuarios conectados en la aplicación y `clientLoader` en las rutas junto con un **spinner global** para mostrar estados de carga de forma consistente en toda la aplicación.

---

## **Ejecución del backend**

Para que la aplicación React funcione correctamente, primero es necesario ejecutar el backend (**una API REST implementada con Spring Boot**).

El código del backend se encuentra en la carpeta **`backend`**.

Se puede ejecutar desde un IDE (Eclipse, Visual Studio Code, IntelliJ...) o desde la línea de comandos con Maven:

```sh
$ cd backend
$ ./start_db.sh
$ mvn spring-boot:run
```

## Ejecución del frontend (en modo desarrollo)

Nos ubicamos en la carpeta del frontend:

```bash
$ cd frontend
```

Instalamos las dependencias:

```bash
$ npm install
```

Ejecutamos la aplicación en modo desarrollo:

```bash
$ npm run dev
```

Una vez que en la consola aparezca que el servidor está listo, podemos acceder a la aplicación React en:

* 🔗 `http://localhost:5173/`

El servidor de desarrollo evita problemas de CORS usando un proxy de Vite configurado en [frontend/vite.config.ts](frontend/vite.config.ts). Es importante indicar en el proxy `secure: false` ya que el backend utiliza un certificado SSL.

## Compilación para producción

Para generar los archivos estáticos que se desplegarán en el backend:

```bash
$ cd frontend
$ npm run build
```

Los archivos generados se encuentran en la carpeta `build/client`.

## Distribución con el backend

Para desplegar correctamente la **Práctica 3**, es necesario **compilar** la aplicación React y copiar los archivos generados en la carpeta de archivos estáticos del backend:

1. Compila el frontend: `npm run build`
2. Copia el contenido de `frontend/build/client` a la carpeta de recursos estáticos del backend `backend/src/main/resources/static`.

## Diagrama de elementos

![Diagrama de elementos](./elements-diagram.svg)

### Leyenda del diagrama

- **Rutas** (cajas grises): endpoints de la aplicación.
- **Componentes** (cajas moradas): componentes React, tanto páginas como auxiliares.
- **Stores** (cajas rojas): estado global de la aplicación.
- **Services** (cajas azules): servicios que consume la aplicación (comunicación con la API).
- **Flechas sólidas moradas**: navegación entre componentes.
- **Flechas sólidas amarillas**: componente usa store.
- **Flechas punteadas azules**: componente o store usa service.
