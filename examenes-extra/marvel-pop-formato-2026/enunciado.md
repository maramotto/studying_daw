# Ejercicio Practico — Marvel Pop Paradise

**Asignatura:** Desarrollo de Aplicaciones Web
**Duracion:** 90 minutos
**Puntuacion:** 6 puntos

---

## Descripcion

Se desea desarrollar una aplicacion web para la tienda **Marvel Pop Paradise**, dedicada a la
venta online de figuras Funko Pop de Marvel. La aplicacion permite a los clientes comprar
productos y a los administradores gestionar los envios.

La aplicacion tiene dos tipos de usuario autenticado:
- **CLIENT**: puede ver productos disponibles y comprar.
- **ADMIN**: puede ver productos disponibles y gestionar envios de productos vendidos.

La pagina de login ya esta implementada y no hay que desarrollarla.

---

## Modelo de datos

La entidad **Product** tiene los siguientes campos:

| Campo    | Tipo    | Descripcion                                      |
|----------|---------|--------------------------------------------------|
| id       | Long    | Identificador unico (autogenerado)               |
| name     | String  | Nombre del producto                               |
| price    | double  | Precio del producto                               |
| sold     | boolean | Indica si ha sido vendido (por defecto `false`)   |
| address  | String  | Direccion de envio (puede ser `null`)             |
| sent     | boolean | Indica si ha sido enviado (por defecto `false`)   |

---

## Backend — API REST (2 puntos)

Implementar una API REST con Spring Boot + Spring Data JPA.

**Estructura de carpetas:**
```
backend/
  model/Product.java
  dto/ProductDTO.java
  repository/ProductRepository.java
  service/ProductService.java
  controller/ProductRestController.java
  security/WebSecurityConfig.java
```

**No es necesario escribir:** `pom.xml`, `application.properties`, clase `Application`, imports,
getters/setters (dejar comentario). Se asume un Mapper entre Entity y DTO.

### Endpoints

| Metodo | URL                      | Rol requerido | Descripcion                                                  |
|--------|--------------------------|---------------|--------------------------------------------------------------|
| GET    | `/api/products/`         | Autenticado   | Devuelve productos disponibles (`sold=false`) ordenados por precio descendente |
| GET    | `/api/products/to-send`  | ADMIN         | Devuelve productos vendidos pendientes de envio (`sold=true`, `sent=false`)   |
| PUT    | `/api/products/{id}/buy` | CLIENT        | Marca el producto como vendido con la direccion proporcionada |
| PUT    | `/api/products/{id}/send`| ADMIN         | Marca el producto como enviado                                |

### Reglas de negocio

- **Comprar (`/buy`)**: Solo si el producto existe y `sold=false`. Se establece `sold=true` y
  `address` con el valor recibido. Devuelve 200 con el producto actualizado o 404 si no existe.
- **Enviar (`/send`)**: Solo si el producto existe, `sold=true` y `sent=false`. Se establece
  `sent=true`. Devuelve 200 o 404.

### Seguridad (WebSecurityConfig)

Completar el siguiente esqueleto:

```java
public SecurityFilterChain apiFilterChain(HttpSecurity http) {
    http.authorizeHttpRequests(authorize -> authorize
        // Completar aqui los requestMatchers para cada endpoint
    );
}
```

---

## Frontend — SPA con React (2.5 puntos)

Implementar una Single Page Application con React (React Router framework mode, TypeScript).

**Estructura de carpetas:**
```
frontend/
  models/Product.ts
  services/products-service.ts
  routes.ts
  routes/home.tsx
  routes/products-list.tsx
  routes/product-detail.tsx
  routes/purchase-page.tsx
  routes/admin-page.tsx
```

**No es necesario escribir:** `index.html`, `package.json`, `tsconfig.json`, `vite.config.ts`,
`main.tsx`, imports. No usar librerias de componentes ni CSS.

### Paginas

#### 1. Layout (`home.tsx`)
- Titulo `<h1>` con "Marvel Pop Paradise".
- Enlace a la pagina de administracion (solo visible para ADMIN).
- Renderiza las rutas hijas con `<Outlet>`.

#### 2. Listado de productos (`products-list.tsx`) — ruta index
- Carga los productos disponibles al entrar (clientLoader).
- Muestra una lista `<ul>` con cada producto:
  - Nombre del producto como enlace a su detalle.
  - Precio con color: **rojo** si `price >= 100`, **verde** si `price < 100`.

#### 3. Detalle de producto (`product-detail.tsx`) — ruta `product/:id`
- Carga el producto por id (clientLoader).
- Muestra nombre y precio (con color).
- Si el usuario es CLIENT y el producto no esta vendido: boton/enlace "Comprar" que navega
  al formulario de compra.
- Si el usuario es ADMIN, el producto esta vendido y no enviado: boton "Enviado" que marca
  el producto como enviado y navega a la pagina principal.
- Muestra el estado: "Vendido" si `sold=true`, "Enviado" si `sent=true`.

#### 4. Formulario de compra (`purchase-page.tsx`) — ruta `product/:id/buy`
- Solo accesible para CLIENT.
- Formulario con campo "Direccion de envio".
- Boton "Confirmar" que llama al endpoint de compra y navega a la pagina principal.

#### 5. Pagina de administracion (`admin-page.tsx`) — ruta `admin`
- Solo accesible para ADMIN.
- Carga productos vendidos pendientes de envio.
- Lista con nombre, direccion y boton "Enviado" para cada producto.
- Al pulsar "Enviado", marca como enviado y recarga la lista.

---

## Docker Compose (1.5 puntos)

Escribir un fichero `docker-compose.yaml` con dos servicios:

- **web**: imagen `daw/marvel-pop:1.0.0`, puerto `8443:8443`, `restart: always`.
  Variables de entorno para la conexion a base de datos.
- **db**: imagen `mysql:8.0`. Variables de entorno para root password y nombre de la base
  de datos.

---

## Entrega

- Fichero ZIP con nombre `XXX-Examen-Mayo.zip` (XXX = iniciales del alumno).
- Estructura:
  ```
  XXX-Examen-Mayo/
    backend/
    frontend/
    docker/
  ```
