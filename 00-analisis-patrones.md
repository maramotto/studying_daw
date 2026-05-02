# 00 — Análisis de Patrones de los 5 Exámenes Anteriores

> Documento generado como parte de la **Fase 1** del plan de estudio.
> Basado en el análisis completo de los enunciados y soluciones oficiales.

---

## 1. Resumen de los 5 exámenes

| Año-Mes | Dominio | Entidad principal | Campos clave | Backend | Frontend | Docker | Puntos |
|---|---|---|---|---|---|---|---|
| **2023-Jun** | Tiempos F1 (Alonso) | `Time` | lap, time | MVC + REST (2p+0.5p) | Angular SPA (2p) | Multistage + script (1.5p) | 6p |
| **2024-May** | Marvel Pop Paradise | `Product` | name, price, address, sent, sold | MVC + REST + Auth (2p) | Angular SPA (2p) | Multistage NGINX + script (2p) | 6p |
| **2024-Jun** | HarleyDawson motos | `Delivery` | plate, model, color, displacement, address, clientName | MVC + REST (2p+0.5p) | Angular SPA (2p) | Multistage + script (1.5p) | 6p |
| **2025-May** | FotosDaw inmobiliaria | `Ad` | title, description, price, rented | API REST pura (2p) | Angular SPA (2.5p) | Docker Compose (1.5p) | 6p |
| **2025-Jun** | Ludomaniacos juegos | `Game` | name, price, stock, discount | API REST pura (2p) | Angular SPA (2.5p) | Docker Compose (1.5p) | 6p |

---

## 2. Evolución del formato (tendencia clara)

### Formato antiguo (2023–2024): Híbrido MVC + SPA
- El backend tenía **dos** interfaces: MVC con Mustache/Thymeleaf + API REST separada.
- La API REST valía solo **0.5p** (era un añadido al MVC).
- Docker: **Dockerfile multistage** + script `build.sh` (construir + push).
- Mayo 2024 introdujo **autenticación con roles** (ROLE_CLIENT, ROLE_ADMIN).

### Formato nuevo (2025): Solo API REST + SPA
- **NO hay MVC tradicional.** El enunciado lo dice explícitamente: *"No se debe implementar una interfaz web con arquitectura MVC tradicional."*
- La API REST vale **2p** (antes valía 0.5p).
- El frontend vale **2.5p** (antes valía 2p).
- Docker: **Docker Compose** con MySQL (en los exámenes ya no piden multistage).
- Se introducen **DTOs** con Mapper asumido.
- **Pero atención:** la entrega práctica 2026 enseña **Dockerfile multistage + Docker Compose juntos**.

### Predicción 2026
El formato 2025 se repetirá, pero con **React** en lugar de Angular:
- **2p backend** (API REST + DTOs).
- **2.5p frontend** (SPA React).
- **1.5p Docker** — probablemente Docker Compose (como 2025), pero podrían pedir
  también Dockerfile multistage o ambos (como en la entrega práctica 2026).
  **Hay que saber hacer los dos formatos.**

---

## 3. Patrones que SIEMPRE se repiten (5/5 exámenes)

### 3.1 Estructura de entrega
- 3 carpetas: `backend/`, `frontend/`, `docker/`.
- ZIP con nombre `XXX-Examen-Mes.zip` (XXX = iniciales del alumno).
- Creado con **7-Zip**.

### 3.2 Backend
- **Una entidad principal** con `@Entity`, `@Id`, `@GeneratedValue`.
- **Un repositorio** que extiende `JpaRepository<Entidad, Long>`.
- **Un servicio** con `@Service` y `@Autowired` del repositorio.
- **Un controlador REST** con `@RestController` y `@RequestMapping("/api/entidades")`.
- Operaciones CRUD: `GET /`, `GET /{id}`, `POST /`, `PUT /{id}`, `DELETE /{id}`.
- **No escribir:** `pom.xml`, `application.properties`, clase `Application`, imports, getters/setters.

### 3.3 Frontend (Angular, será React en 2026)
- **HTML plano** sin librerías de componentes (ni ng-bootstrap, ni material, ni CSS).
- **Proxy asumido** → URLs relativas (`/api/...`).
- **No escribir:** `index.html`, `angular.cli`/`vite.config`, `package.json`, `tsconfig.json`, `app.module.ts`/`main.tsx`, imports.
- **Código en inglés**, textos UI en castellano.

### 3.4 Funcionalidades recurrentes
| Funcionalidad | Frecuencia | Detalles |
|---|---|---|
| **Listado ordenado** | 5/5 | Siempre hay al menos un listado ordenado por algún campo |
| **Formulario de creación** | 5/5 | Crear nueva entidad desde la página principal |
| **Validación de duplicado** | 5/5 | Al crear, comprobar que no existe → mostrar error |
| **Eliminar entidad** | 5/5 | Botón de borrado |
| **Cambio de estado** | 4/5 | Toggle entre dos estados (rented/available, pending/finished, discount/no-discount) |
| **Vista de detalle** | 3/5 | Página separada con info completa + botones de acción |
| **Dos listados separados** | 4/5 | Filtrar por estado booleano (en oferta/no, alquilado/no, pendiente/finalizado) |

### 3.5 Docker
- Siempre hay un apartado Docker (1.5p–2p).
- Imagen de la app **ya publicada** en DockerHub con nombre `daw/nombre:1.0.0`.
- Base de datos **MySQL 8.0**.

---

## 4. Análisis detallado por apartado

### A) Backend — API REST (2p en formato 2025)

#### Ficheros a escribir (siempre los mismos):
1. `model/Entidad.java` — Clase JPA con `@Entity`, campos, constructor vacío.
2. `repository/EntidadRepository.java` — Interface `extends JpaRepository` + queries custom.
3. `service/EntidadService.java` — Lógica de negocio, usa Mapper (asumido).
4. `dto/EntidadDTO.java` — `record` con los campos del DTO.
5. `controller/EntidadRestController.java` — Endpoints REST.

#### Patrón de código del profesor (extraído de las soluciones):

**Entity:**
```java
@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private double price;
    // ...
    public Game() {}
    public Game(String name, double price, ...) { ... }
    // getters and setters
}
```

**DTO (record):**
```java
public record GameDTO(Long id, String name, double price, int stock, boolean discount) {}
```

**Repository:**
```java
public interface GameRepository extends JpaRepository<Game, Long> {
    Collection<Game> findTop10ByDiscountOrderByPrice(boolean discount);
}
```
> El profesor usa **Spring Data Query Methods** (nombres mágicos). Esto es CLAVE.
> Ejemplos reales usados: `findAllByRentedOrderByPrice`, `findTop10ByDiscountOrderByPrice`, `findByTitle`.

**Service:**
```java
@Service
public class GameService {
    @Autowired private GameRepository gameRepository;
    @Autowired private GameMapper mapper;

    public Collection<GameDTO> getGames(boolean discount) {
        return toDTOs(gameRepository.findTop10ByDiscountOrderByPrice(discount));
    }
    // ... métodos privados toDTO, toDomain, toDTOs que delegan en mapper
}
```

**RestController:**
```java
@RestController
@RequestMapping("/api/games")
public class GameRestController {
    @Autowired private GameService gameService;

    @GetMapping("/")
    public Collection<GameDTO> getGames(@RequestParam boolean discount) { ... }

    @PostMapping("/")
    public ResponseEntity<GameDTO> createGame(@RequestBody GameDTO dto) {
        // ... URI location = fromCurrentRequest().path("/{id}").buildAndExpand(dto.id()).toUri();
        // return ResponseEntity.created(location).body(dto);
    }
}
```

#### Códigos de estado usados por el profesor:
| Operación | Código | Cómo |
|---|---|---|
| GET lista | 200 | Return directo |
| GET por id | 200 (o 404 si `.orElseThrow()`) | Return directo |
| POST crear | **201 Created** | `ResponseEntity.created(location).body(dto)` |
| PUT actualizar | 200 | Return directo |
| DELETE borrar | 200 | Devuelve el DTO del eliminado |
| POST duplicado | 404 (en FotosDaw) | El profesor devuelve null → 404. **Nota: lo ideal sería 409 Conflict** |

### B) Frontend — SPA (2.5p en formato 2025)

#### Ficheros a escribir (patrón 2025):
1. `app.routing.ts` — Array de rutas.
2. `entidades.component.ts` + `.html` — Página principal: formulario + listado(s).
3. `entidad.component.ts` + `.html` — Página de detalle + botones de acción.
4. `model/entidad.dto.ts` — Interface del DTO.
5. `service/entidad.service.ts` — Llamadas HTTP.

#### Estructura de la SPA (siempre igual):

```
Página principal (/)
├── Título grande
├── Formulario de creación
├── Listado 1 (estado A) — cada ítem es link a detalle
└── Listado 2 (estado B) — cada ítem es link a detalle

Página de detalle (/:id)
├── Datos completos
├── Botón acción 1 (cambiar estado)
├── Botón acción 2 (cambiar estado o comprar)
└── Botón eliminar
```

#### Patrones Angular del profesor (para traducir a React):
- `*ngFor="let x of items"` → `.map()` en React
- `*ngIf="condition"` → `{condition && <JSX>}` en React
- `[(ngModel)]="field"` → `value={field} onChange={...}` en React
- `(click)="method()"` → `onClick={() => method()}` en React
- `[routerLink]="['/path', id]"` → `<Link to={'/path/' + id}>` en React
- `activatedRoute.snapshot.params["id"]` → `useParams()` en React
- `httpClient.get(url)` → `fetch(url)` en React
- `.subscribe()` → `.then()` o `useEffect` en React
- `ngOnInit` → `useEffect(fn, [])` en React

### C) Docker (1.5p en formato 2025)

> **Dato clave del enunciado de la entrega práctica 2026:** el profesor enseña
> **Dockerfile multistage + Docker Compose juntos**, no como alternativas.
> En la Práctica 2 se piden ambos. En la Práctica 3 se amplía el Dockerfile
> con una etapa Node.js para construir React. Por tanto, en el examen
> **pueden pedir cualquiera de los dos, o ambos**.

#### Parte 1: Docker Compose (para ejecutar la app)

```yaml
services:
  web:
    image: daw/nombre:1.0.0
    ports:
      - "HOST:CONTAINER"
    restart: on-failure    # o always, según pida el enunciado
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/nombre_db
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=password
    depends_on:
      db:
        condition: service_healthy   # healthcheck (entrega 2026)
  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=nombre_db
    healthcheck:                     # healthcheck (entrega 2026)
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
```

**Lo que varía entre exámenes:**
- Nombre de la imagen (`daw/fotosdaw:1.0.0`, `daw/ludomaniacos:1.0.0`).
- Puertos: Mayo 2025 → `8443:8443`, Junio 2025 → `443:8443`.
- Espera de la BD: `restart: on-failure` (Jun 2025) o `restart: always` (May 2025)
  o `healthcheck` + `depends_on.condition` (entrega 2026). **Usar lo que pida el enunciado.**
- Nombre de la base de datos.
- Si se expone o no el puerto de MySQL (nunca en 2025).

#### Parte 2: Dockerfile Multistage (para construir la imagen)

```dockerfile
# Etapa 1: Build backend
FROM maven:3.x.x AS backend
COPY backend/ /app/
RUN mvn -f /app/pom.xml package -DskipTests

# Etapa 2: Build frontend (React)
FROM node:20.x.x AS frontend
COPY frontend/ /app/
WORKDIR /app
RUN npm install && npm run build

# Etapa 3: Runtime
FROM openjdk-jre:21.0.0
COPY --from=backend /app/target/*.jar /app.jar
COPY --from=frontend /app/dist/ /app/static/new/
CMD ["java", "-jar", "/app.jar"]
```

> **Nota:** En la entrega 2026, el frontend React se copia a `/static/new/`
> para servirse en `https://localhost:8443/new/`. En el examen, el
> enunciado dirá dónde copiarlo (puede ser `/static/` directamente).

#### Parte 3: Scripts de construcción y publicación

```bash
# create_image.sh — construir la imagen (nombre como parámetro)
docker build -t $1 .

# publish_image.sh — publicar en DockerHub (nombre como parámetro)
docker push $1
```

**Resumen de qué puede pedir el examen:**

| Puede pedir | Ficheros | Probabilidad |
|---|---|---|
| Solo Docker Compose | `docker-compose.yaml` | Alta (formato 2025) |
| Solo Dockerfile multistage + script | `Dockerfile` + `build.sh` | Media (formato 2023-24) |
| Ambos juntos | `Dockerfile` + `docker-compose.yaml` + scripts | Media (formato entrega 2026) |

**Hay que saber hacer los tres.** El Docker Compose es el más rápido de escribir.

---

## 5. Errores comunes en las soluciones del profesor

> Importante: el profesor también comete errores en sus soluciones.
> Esto confirma que **el código no tiene que ser perfecto para aprobar**.

| Fichero | Error |
|---|---|
| `GameService.java` (Jun 2025) | `@Autowireds` en vez de `@Autowired` |
| `Game.java` (Jun 2025) | `generatedType.AUTO` en vez de `GenerationType.AUTO`; falta `;` después de `private Long id` |
| `AdService.java` (May 2025) | `adRepository.save(adRepository)` en vez de `adRepository.save(ad)` |
| `AdRestController.java` (May 2025) | `createAd` devuelve `AdDTO` en la firma pero hace `return new ResponseEntity<>(...)` |
| `ad.component.ts` (May 2025) | `templateUrl: 'app.component.html'` en vez de `'ad.component.html'` |

**Lección:** el profesor evalúa la **corrección conceptual**, no la compilación. Pequeños typos no restan si el enfoque es correcto.

---

## 6. Lo que NUNCA ha caído (y probablemente no caerá)

- Relaciones entre entidades (`@ManyToOne`, `@OneToMany`).
- Paginación en la API.
- Subida de imágenes/ficheros.
- WebSockets.
- Tests unitarios o de integración.
- Despliegue en la nube.
- Base de datos distinta a MySQL.

---

## 7. Lo que podría caer como NOVEDAD en 2026

- **React** en lugar de Angular (confirmado por el temario).
- **Autenticación** (caló en Mayo 2024 con roles; el ejemplo-practica3 usa JWT con Zustand).
- **Más de una entidad** (poco probable, nunca ha pasado, pero el ejemplo-practica3 tiene Book + Shop).
- **Imágenes** (el ejemplo-practica3 las gestiona, pero nunca han caído en examen).

---

## 8. Tabla resumen: qué memorizar para cada apartado

| Apartado | Ficheros a escribir | Tiempo estimado | Puntos |
|---|---|---|---|
| **Backend** | Entity, DTO (record), Repository, Service, RestController | 25–30 min | 2p |
| **Frontend** | routing, lista.component, detalle.component, service, model/dto | 35–40 min | 2.5p |
| **Docker** | docker-compose.yaml (o Dockerfile + build.sh) | 10 min | 1.5p |
| **Total** | 10–12 ficheros | 70–80 min | 6p |
