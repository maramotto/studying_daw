# 02 — Checklist de Entrega (90 min)

> Documento generado como parte de la **Fase 1** del plan de estudio.
> Usar como referencia rápida los últimos 5 minutos del examen.

---

## Checklist de estructura

### Carpetas
- [ ] Carpeta `backend/` con todo el código Java.
- [ ] Carpeta `frontend/` con todo el código React (JSX/JS).
- [ ] Carpeta `docker/` con `docker-compose.yaml` (o `Dockerfile` + `build.sh`).
- [ ] Ningún fichero suelto fuera de estas 3 carpetas.

### ZIP
- [ ] Creado con **7-Zip** (no WinRAR, no el compresor del sistema).
- [ ] Nombre: **`XXX-Examen-Mes.zip`** (XXX = tus iniciales, Mes = Mayo/Junio).
- [ ] Ejemplo: `MAR-Examen-Mayo.zip`.

---

## Checklist de backend (2p)

### Ficheros obligatorios
- [ ] `model/Entidad.java` — con `@Entity`, `@Id`, `@GeneratedValue`.
- [ ] `dto/EntidadDTO.java` — con `record`.
- [ ] `repository/EntidadRepository.java` — `extends JpaRepository<Entidad, Long>`.
- [ ] `service/EntidadService.java` — con `@Service`, `@Autowired`.
- [ ] `controller/EntidadRestController.java` — con `@RestController`, `@RequestMapping`.

### Lo que NO escribir
- [ ] ~~`pom.xml`~~ (se asume).
- [ ] ~~`application.properties`~~ (se asume).
- [ ] ~~Clase `Application`~~ (se asume).
- [ ] ~~Imports~~ (no necesarios).
- [ ] ~~Getters/setters~~ (basta con `// getters and setters`).

### Verificaciones de contenido
- [ ] La Entity tiene constructor vacío (JPA lo necesita).
- [ ] El id es `Long` (no `int`, no `long`).
- [ ] El DTO record tiene los mismos campos que la Entity.
- [ ] El Repository tiene las query methods necesarias (orden, filtro, búsqueda).
- [ ] El Service valida duplicados si el enunciado lo pide.
- [ ] El Service usa Mapper (asumido) con helpers `toDTO()`, `toDomain()`, `toDTOs()`.
- [ ] El RestController usa `@RequestMapping("/api/entidades")` (plural, con `/api/`).
- [ ] El POST devuelve **201 Created** con `ResponseEntity.created(location).body(dto)`.
- [ ] El GET lista acepta `@RequestParam` si hay filtro por estado booleano.
- [ ] El GET por id usa `@PathVariable Long id`.
- [ ] El PUT usa `@PathVariable` para el id y `@RequestBody` para el DTO.
- [ ] El DELETE usa `@PathVariable Long id`.
- [ ] Si hay error de duplicado: devuelve 409 o 404 (según pida el enunciado).

### Si hay autenticación (solo si el enunciado lo pide)
- [ ] `security/WebSecurityConfig.java` con `@Configuration`.
- [ ] `requestMatchers` con las rutas protegidas y `.hasRole(...)`.

---

## Checklist de frontend React (2.5p)

### Ficheros obligatorios
- [ ] `App.jsx` — con `<BrowserRouter>`, `<Routes>`, `<Route>`.
- [ ] Componente **lista** (página principal) — formulario + listado(s).
- [ ] Componente **detalle** — datos completos + botones de acción.
- [ ] `service/entidad-service.js` — funciones con `fetch`.

### Lo que NO escribir
- [ ] ~~`index.html`~~ (se asume).
- [ ] ~~`vite.config.js`~~ (se asume).
- [ ] ~~`package.json`~~ (se asume).
- [ ] ~~`main.jsx`~~ (se asume).
- [ ] ~~Imports~~ (no necesarios).
- [ ] ~~CSS / className~~ (HTML plano, sin estilos).

### Verificaciones de contenido

#### App.jsx / Routing
- [ ] `<BrowserRouter>` envuelve toda la app.
- [ ] `<Routes>` contiene los `<Route>`.
- [ ] Ruta raíz `/` o `/entidades` apunta al componente lista.
- [ ] Ruta de detalle `/entidad/:id` apunta al componente detalle.
- [ ] Ruta por defecto redirige a la lista (opcional pero bien visto).

#### Componente lista (página principal)
- [ ] `useState` para los campos del formulario.
- [ ] `useState` para la(s) lista(s) de entidades.
- [ ] `useEffect(() => { ... }, [])` para cargar los datos al montar.
- [ ] Formulario con `<input>` controlados (`value` + `onChange`).
- [ ] Botón de crear que llama al service y recarga la lista.
- [ ] Error de duplicado mostrado con `alert("...")`.
- [ ] Lista(s) renderizada(s) con `.map()` y `key={item.id}`.
- [ ] Cada ítem tiene un `<Link to={...}>` hacia el detalle.
- [ ] Los campos mostrados son los que pide el enunciado (no más, no menos).
- [ ] Si hay dos listas (por estado), se cargan por separado o se filtran.

#### Componente detalle
- [ ] `useParams()` para obtener el `id` de la URL.
- [ ] `useEffect` para cargar la entidad por id.
- [ ] Se muestran todos los campos que pide el enunciado.
- [ ] Cada botón del enunciado tiene su `onClick` handler.
- [ ] Los handlers llaman al service y actualizan el estado local.
- [ ] Si se elimina la entidad, se navega a la lista (`useNavigate()`).
- [ ] Renderizado condicional para estados especiales (ej: "No disponible").

#### Service
- [ ] URL base: `"/api/entidades/"` (con `/api/` y barra final).
- [ ] GET lista: `fetch(BASE_URL + "?param=" + value)`.
- [ ] GET por id: `fetch(BASE_URL + id)`.
- [ ] POST: `fetch(BASE_URL, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data) })`.
- [ ] PUT: `fetch(BASE_URL + id, { method: "PUT", ... })`.
- [ ] DELETE: `fetch(BASE_URL + id, { method: "DELETE" })`.
- [ ] Todas las funciones son `async` y hacen `return response.json()`.
- [ ] POST/PUT verifican `response.ok` y lanzan error si no.

---

## Checklist de Docker (1.5p)

> **Nota:** Según la entrega práctica 2026, pueden pedir Docker Compose,
> Dockerfile multistage, o ambos juntos. Lee el enunciado con cuidado.

### Docker Compose (si lo pide el enunciado)
- [ ] Fichero: `docker/docker-compose.yaml`.
- [ ] Servicio `web`:
  - [ ] `image:` con el nombre exacto del enunciado.
  - [ ] `ports:` con el mapeo HOST:CONTAINER correcto.
  - [ ] Mecanismo de espera de la BD: usar lo que pida el enunciado:
    - `restart: on-failure` o `restart: always` (formato examen 2025), O
    - `healthcheck` en `db` + `depends_on: db: condition: service_healthy` (formato entrega 2026).
  - [ ] `environment:` con las 3 variables de Spring:
    - [ ] `SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/nombre_db` (usa `db`, no `localhost`).
    - [ ] `SPRING_DATASOURCE_USERNAME=root`.
    - [ ] `SPRING_DATASOURCE_PASSWORD=password` (coincide con `MYSQL_ROOT_PASSWORD`).
- [ ] Servicio `db`:
  - [ ] `image: mysql:8.0`.
  - [ ] **NO** tiene `ports:` (el enunciado dice que no se expone el 3306).
  - [ ] `environment:` con:
    - [ ] `MYSQL_ROOT_PASSWORD=password` (coincide con `SPRING_DATASOURCE_PASSWORD`).
    - [ ] `MYSQL_DATABASE=nombre_db` (coincide con la URL del datasource).
  - [ ] Si usa healthcheck: `test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]`.

### Dockerfile multistage (si lo pide el enunciado)
- [ ] Fichero: `docker/Dockerfile`.
- [ ] Etapa 1 (backend): `FROM maven:x.x.x AS backend`, `COPY backend/`, `RUN mvn package -DskipTests`.
- [ ] Etapa 2 (frontend): `FROM node:x.x.x AS frontend`, `COPY frontend/`, `RUN npm install && npm run build`.
- [ ] Etapa 3 (runtime): `FROM openjdk-jre:x.x.x`, `COPY --from=backend ...`, `COPY --from=frontend ...`.
- [ ] Fichero: `docker/create_image.sh` (o `build.sh`).
  - [ ] `docker build -t $1 .` (o `docker build -t daw/nombre:1.0.0 .`).
- [ ] Fichero: `docker/publish_image.sh` (si lo pide).
  - [ ] `docker push $1`.
- [ ] Las versiones de las imágenes son las que dice el enunciado (no inventar).
- [ ] Las etapas usan `AS nombre` para referenciar con `COPY --from=nombre`.

---

## Errores fatales a evitar (cuestan puntos directamente)

| Error | Consecuencia | Cómo evitarlo |
|---|---|---|
| Olvidar `@Entity` en el modelo | No es una entidad JPA | Primera anotación que escribes |
| Olvidar `@RestController` | Spring no registra los endpoints | Primera anotación del controller |
| POST sin `ResponseEntity.created()` | Pierde puntos de "principios REST" | Memorizar el patrón |
| `fetch` sin `Content-Type: application/json` | El backend no parsea el body | Memorizar el patrón del service |
| `useEffect` sin `[]` | Se ejecuta infinitamente | SIEMPRE poner `[]` salvo excepción |
| Docker: `localhost` en vez de `db` | Los contenedores no se ven entre sí | Siempre usar el nombre del servicio |
| Docker: exponer puerto 3306 | El enunciado dice que NO | Leer bien el enunciado |
| ZIP con nombre incorrecto | Puede perder puntos de entrega | Última cosa que revisas |
| Escribir `pom.xml` o `application.properties` | Pierdes tiempo en algo que no puntúa | NUNCA escribirlos |

---

## Tabla rápida: qué escribe el profesor vs qué no

| Escribe | No escribe |
|---|---|
| `@Entity` class con campos | Imports |
| `// getters and setters` | Getters y setters reales |
| `record` para DTOs | Mapper (se asume) |
| `extends JpaRepository` | `pom.xml` |
| `@Service` con lógica | `application.properties` |
| `@RestController` con endpoints | Clase `Application` |
| `export default function Component()` | `index.html`, `main.jsx` |
| `<BrowserRouter><Routes>` | `package.json`, `vite.config` |
| `fetch()` en el service | Imports en JSX |
| `docker-compose.yaml` | Archivos de configuración extra |

---

## Último minuto: revisión relámpago

Antes de comprimir el ZIP, recorre esta lista mental:

1. **Backend:** ¿Entity → DTO → Repo → Service → Controller? ¿Todo conectado?
2. **Frontend:** ¿App con rutas → Lista con formulario → Detalle con botones → Service con fetch?
3. **Docker:** ¿Nombre de imagen correcto? ¿Puertos correctos? ¿Passwords coinciden?
4. **ZIP:** ¿Nombre correcto? ¿3 carpetas dentro?

**Si todo cuadra: sube y respira.**
