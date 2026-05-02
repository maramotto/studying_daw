# 01 — Metodología: Plan de Ataque para 90 Minutos

> Documento generado como parte de la **Fase 1** del plan de estudio.
> Estrategia optimizada para maximizar puntos en el tiempo disponible.

---

## Principio fundamental

> **No intentes que compile. Intenta que se entienda.**
>
> El profesor lee tu código como texto. Evalúa si sabes lo que haces,
> no si el compilador lo acepta. Escribe rápido, con estructura clara,
> y no pierdas tiempo en detalles que no puntúan.

---

## Distribución del tiempo

```
┌─────────────────────────────────────────────────────────────────┐
│ 0        5       10       35       40       75       85    90   │
│ ├────────┼────────┼────────┼────────┼────────┼────────┼────┤   │
│ │ LEER   │        │BACKEND │        │FRONTEND│ DOCKER │ ZIP│   │
│ │enunciad│ MODELO │  API   │(pausa) │  SPA   │Compose │    │   │
│ │  +plan │        │  REST  │  2min  │ React  │        │    │   │
│ │  5 min │  5 min │ 25 min │        │ 35 min │ 10 min │5min│   │
│ └────────┴────────┴────────┴────────┴────────┴────────┴────┘   │
│                                                                  │
│  Puntos acumulados:  0p      2p               4.5p    6p        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Fase 0 — Leer y planificar (0:00 → 0:05) — 5 min

### Qué hacer:
1. **Leer TODO el enunciado** sin escribir nada. Subrayar:
   - Nombre de la entidad y sus campos.
   - Qué operaciones pide (CRUD, cambio de estado, filtros).
   - Regla de validación (duplicado por qué campo).
   - Ordenación (por qué campo, ascendente o descendente).
   - Puertos y nombres de imagen Docker.
   - Si hay autenticación (roles).

2. **Dibujar el modelo mental** (en papel o en un comentario):
   ```
   Entidad: Game
   Campos: id, name, price, stock, discount (boolean)
   Estados: discount=true / discount=false
   Validación: ¿duplicado por name?
   Orden: price DESC
   Límite: Top 10
   ```

3. **Decidir las rutas del frontend**:
   ```
   /          → lista + formulario
   /:id       → detalle + botones
   ```

### Resultado al terminar:
- Sabes exactamente qué ficheros vas a escribir.
- Sabes los nombres de las clases, campos y endpoints.

---

## Fase 1 — Backend: API REST (0:05 → 0:35) — 30 min

> **Objetivo: 2 puntos.** Es lo que mejor dominas. Hazlo rápido y bien.

### Orden de escritura (siempre el mismo):

#### 1.1 Entity (3 min)
```
model/Game.java
```
- `@Entity`, `@Id`, `@GeneratedValue(strategy = GenerationType.AUTO)`.
- Campos privados (copiar del enunciado).
- Constructor vacío + constructor con parámetros (sin id).
- `// getters and setters`.

**Errores que evitar:**
- Olvidar `@Entity`.
- Olvidar el constructor vacío (JPA lo necesita).
- No poner `Long` para el id (no `int`).

#### 1.2 DTO record (1 min)
```
dto/GameDTO.java
```
- `public record GameDTO(Long id, String name, double price, ...) {}`
- Es un solo liner. Copiar los mismos campos que la Entity.

#### 1.3 Repository (2 min)
```
repository/GameRepository.java
```
- `extends JpaRepository<Game, Long>`.
- Añadir **query methods** según lo que pida el enunciado:
  - Filtrar por booleano: `findAllByDiscountOrderByPrice(boolean discount)`
  - Top N: `findTop10ByDiscountOrderByPriceDesc(boolean discount)`
  - Buscar por campo: `findByName(String name)` → para validar duplicados.

**Truco:** los query methods de Spring Data se construyen así:
```
find [Top N] By <Campo> [OrderBy <Campo> [Desc|Asc]]
```

#### 1.4 Service (10 min)
```
service/GameService.java
```
- `@Service`, `@Autowired` del repository y del mapper.
- Métodos públicos: `getAll`, `getById`, `create`, `replace`, `delete`.
- **Lógica de negocio aquí** (validación duplicado, cambio de estado, etc.).
- Métodos privados helper: `toDTO(entity)`, `toDomain(dto)`, `toDTOs(collection)`.
- Todas delegan en `mapper.toDTO(...)`, `mapper.toDomain(...)`, `mapper.toDTOs(...)`.

**Patrón create con validación de duplicado:**
```java
public GameDTO createGame(GameDTO dto) {
    if (gameRepository.findByName(dto.name()).isPresent()) {
        return null;  // o lanzar excepción
    }
    Game game = toDomain(dto);
    gameRepository.save(game);
    return toDTO(game);
}
```

**Patrón replace (PUT):**
```java
public GameDTO replaceGame(long id, GameDTO dto) {
    Game updated = toDomain(dto);
    updated.setId(id);
    gameRepository.save(updated);
    return toDTO(updated);
}
```

#### 1.5 RestController (10 min)
```
controller/GameRestController.java
```
- `@RestController`, `@RequestMapping("/api/games")`.
- `@Autowired` del service.
- Endpoints:

| Método | Ruta | Anotación | Return |
|---|---|---|---|
| GET lista | `/` | `@GetMapping("/")` | `Collection<GameDTO>` |
| GET por id | `/{id}` | `@GetMapping("/{id}")` | `GameDTO` |
| POST crear | `/` | `@PostMapping("/")` | `ResponseEntity.created(location).body(dto)` |
| PUT update | `/{id}` | `@PutMapping("/{id}")` | `GameDTO` |
| DELETE | `/{id}` | `@DeleteMapping("/{id}")` | `GameDTO` |

**POST con Location header (el profesor siempre lo hace):**
```java
@PostMapping("/")
public ResponseEntity<GameDTO> createGame(@RequestBody GameDTO dto) {
    dto = gameService.createGame(dto);
    if (dto == null) {
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }
    URI location = fromCurrentRequest().path("/{id}")
        .buildAndExpand(dto.id()).toUri();
    return ResponseEntity.created(location).body(dto);
}
```

#### 1.6 (Solo si hay auth) WebSecurityConfig (4 min)
```
security/WebSecurityConfig.java
```
- Solo si el enunciado menciona roles/login.
- Copiar el esqueleto que dan y rellenar los `requestMatchers`.

### Al terminar el backend:
- Revisa que los nombres de campos coinciden con el enunciado.
- Revisa que la query method del repository es correcta.
- Revisa el código de estado del POST (201 Created).

---

## (Pausa mental: 0:35 → 0:37) — 2 min

Respira. Lee otra vez la parte del frontend del enunciado. Identifica:
- Cuántos componentes/páginas necesitas (normalmente 2).
- Qué botones hay en cada página.
- Qué campos muestra cada lista.

---

## Fase 2 — Frontend: SPA React (0:37 → 0:75) — 38 min

> **Objetivo: 2.5 puntos.** Aquí está la mayor puntuación.
> Escribe con calma, es donde más puedes perder puntos por despiste.

### Orden de escritura:

#### 2.1 Model / DTO (1 min)
```
model/game.js  (o game-dto.js)
```
> En React con JavaScript no necesitamos un fichero de modelo/interface.
> Pero si el profesor lo espera (como en Angular), podemos poner un
> comentario indicando la estructura. O simplemente saltarlo.

#### 2.2 Service (5 min)
```
service/game-service.js
```
- Funciones exportadas: `getGames()`, `getGame(id)`, `createGame(data)`, `replaceGame(id, data)`, `deleteGame(id)`.
- Usar `fetch` con URLs relativas (`/api/games/`).
- `Content-Type: application/json` en POST y PUT.

**Patrón:**
```javascript
const BASE_URL = "/api/games/";

export async function getGames(discount) {
    const response = await fetch(BASE_URL + "?discount=" + discount);
    return response.json();
}

export async function createGame(game) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(game)
    });
    if (!response.ok) throw new Error("Error");
    return response.json();
}
```

#### 2.3 Componente lista / página principal (15 min)
```
GamesPage.jsx  (o Games.jsx)
```
Este es el componente más largo. Incluye:
- **Formulario de creación** con `useState` para cada campo.
- **Listado(s)** cargados con `useEffect` + `fetch`.
- **Links** a la página de detalle.
- **Manejo del error de duplicado** (`alert("...")`).

**Estructura tipo:**
```jsx
export default function GamesPage() {
    const [games, setGames] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    // ...

    useEffect(() => { loadGames(); }, []);

    async function loadGames() { /* fetch → setGames */ }

    async function handleCreate() {
        try {
            await createGame({ name, price, ... });
            loadGames();
        } catch (e) {
            alert("Ya existe un juego con ese nombre");
        }
    }

    return (
        <div>
            <h1>Título de la App</h1>
            <form> ... </form>
            <ul>
                {games.map(g => <li key={g.id}><Link to={"/game/" + g.id}>{g.name}</Link></li>)}
            </ul>
        </div>
    );
}
```

#### 2.4 Componente detalle (10 min)
```
GamePage.jsx  (o GameDetail.jsx)
```
- `useParams()` para obtener el id.
- `useEffect` para cargar el juego por id.
- Botones de acción que llaman al service y actualizan el estado.
- Renderizado condicional para estados especiales.

**Estructura tipo:**
```jsx
export default function GamePage() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getGame(id).then(g => setGame(g));
    }, [id]);

    async function handleDelete() {
        await deleteGame(game.id);
        navigate("/");
    }

    if (!game) return <p>Cargando...</p>;

    return (
        <div>
            <h1>{game.name}</h1>
            <p>Precio: {game.price}</p>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
}
```

#### 2.5 Routing / App (5 min)
```
App.jsx
```
```jsx
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GamesPage />} />
                <Route path="/game/:id" element={<GamePage />} />
            </Routes>
        </BrowserRouter>
    );
}
```

### Al terminar el frontend:
- Revisa que cada botón del enunciado tiene su handler.
- Revisa que los listados muestran los campos correctos.
- Revisa que los links van a la ruta correcta.
- Revisa que `useEffect` tiene `[]` para "al cargar".

---

## Fase 3 — Docker (0:75 → 0:85) — 10 min

> **Objetivo: 1.5 puntos.** Es lo más rápido de hacer si tienes la plantilla.

> **Importante:** Según la entrega práctica 2026, el profesor enseña
> Dockerfile multistage **y** Docker Compose **juntos** (no como alternativas).
> Pueden pedir uno, otro, o ambos. **Lee el enunciado con cuidado.**

### Opción A: Solo Docker Compose (formato examen 2025)

```
docker/docker-compose.yaml
```

1. Copiar la plantilla base.
2. Sustituir:
   - Nombre de la imagen (`daw/nombre:1.0.0`).
   - Puertos (leer bien cuál es host y cuál es container).
   - Nombre de la base de datos.
   - Política de espera de la BD: `restart: on-failure`, `restart: always`,
     o `healthcheck` + `depends_on` (usar lo que diga el enunciado).
3. **Verificar:**
   - `SPRING_DATASOURCE_URL` usa el nombre del servicio `db` (no `localhost`).
   - `MYSQL_DATABASE` coincide con el nombre en la URL.
   - `MYSQL_ROOT_PASSWORD` coincide con `SPRING_DATASOURCE_PASSWORD`.
   - El puerto de MySQL (3306) NO está expuesto al host.

### Opción B: Dockerfile multistage + script (formato examen 2023–2024)

```
docker/Dockerfile
docker/create_image.sh (o build.sh)
```

1. Etapa 1: `FROM maven:x.x.x AS backend` → copiar backend, `mvn package -DskipTests`.
2. Etapa 2: `FROM node:x.x.x AS frontend` → copiar frontend, `npm install && npm run build`.
3. Etapa 3: `FROM openjdk-jre:x.x.x` → `COPY --from=backend` JAR + `COPY --from=frontend` static files.
4. Script: `docker build -t $1 .` (nombre como parámetro o hardcodeado).
5. Script publicar: `docker push $1`.

### Opción C: Ambos juntos (formato entrega práctica 2026)

Si piden ambos, escribir primero el Dockerfile (5 min) y luego el Compose (3 min).
El Compose usará `healthcheck` + `depends_on.condition: service_healthy`.

---

## Fase 4 — Empaquetar y revisar (0:85 → 0:90) — 5 min

1. **Verificar estructura de carpetas:**
   ```
   backend/
       model/Entidad.java
       dto/EntidadDTO.java
       repository/EntidadRepository.java
       service/EntidadService.java
       controller/EntidadRestController.java
   frontend/
       App.jsx
       GamesPage.jsx (o como lo llames)
       GamePage.jsx
       service/game-service.js
   docker/
       docker-compose.yaml
   ```

2. **Repasar rápido:**
   - ¿Los nombres de campos en el DTO coinciden con la Entity?
   - ¿Las URLs del controller coinciden con las del service del frontend?
   - ¿Los puertos del Docker son los que pide el enunciado?
   - ¿El nombre del ZIP es correcto? (`XXX-Examen-Mes.zip`)

3. **Crear ZIP** con 7-Zip y subir.

---

## Estrategia de puntos: dónde priorizar si vas mal de tiempo

| Si te quedan... | Prioriza... | Puntos posibles |
|---|---|---|
| 90 min (todo) | Todo normal | 6p |
| 70 min | Backend completo + frontend + Docker rápido | 5.5p |
| 50 min | Backend completo + frontend sin detalle + Docker | 4.5p |
| 30 min | Backend + frontend solo lista + Docker | 3.5p |
| 20 min | Backend + Docker (sin frontend) | 3.5p |

**Regla de oro:** el backend es lo más rápido de escribir para ti (lo dominas).
Siempre empieza por ahí. Si te quedas sin tiempo, un frontend parcial +
Docker suma más que un frontend perfecto sin Docker.

---

## Resumen en una frase

> **Lee 5 min → Backend 30 min → Frontend 38 min → Docker 10 min → ZIP 5 min → Aprueba.**
