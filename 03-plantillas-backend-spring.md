0
# 03 — Plantillas Backend Spring Boot

> Fase 2 del plan de estudio. Plantillas memorizables para el examen.
> Código en inglés, textos UI en castellano. Sin imports, sin getters/setters.

---

## Ficheros a escribir (siempre los mismos 5)

```
backend/
├── model/Game.java
├── dto/GameDTO.java
├── repository/GameRepository.java
├── service/GameService.java
└── controller/GameRestController.java
```

> Opcional: `security/WebSecurityConfig.java` si el enunciado pide auth.

---

## 1. Entity — `model/Game.java`

### Cuándo se usa
Siempre. Es lo primero que escribes tras leer el enunciado.

### Plantilla

```java
@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private double price;
    private int stock;
    private boolean discount;

    // Constructor vacío obligatorio para JPA
    public Game() {}

    // Constructor con todos los campos EXCEPTO id
    public Game(String name, double price, int stock, boolean discount) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.discount = discount;
    }

    // getters and setters
}
```

### Variantes
- **Con estado booleano** (rented, discount, sent): añadir `private boolean rented;`
- **Con String único** (title, plate): se usa para validar duplicado en el Service.

### Errores comunes
- Olvidar `@Entity` → no se crea la tabla.
- Olvidar el constructor vacío → JPA falla.
- Usar `int` en vez de `Long` para el id.
- Olvidar `@GeneratedValue` → el id no se auto-genera.

---

## 2. DTO — `dto/GameDTO.java`

### Cuándo se usa
Siempre (desde 2025 los exámenes piden DTOs).

### Plantilla

```java
public record GameDTO(
    Long id,
    String name,
    double price,
    int stock,
    boolean discount
) {}
```

> Es un one-liner con `record` (Java moderno). Los mismos campos que la Entity.
> El Mapper se asume que ya existe (no hay que escribirlo).

### Errores comunes
- Olvidar algún campo que sí está en la Entity.
- Poner `int` en vez de `Long` para el id (debe coincidir con la Entity).

---

## 3. Repository — `repository/GameRepository.java`

### Cuándo se usa
Siempre.

### Plantilla base

```java
public interface GameRepository extends JpaRepository<Game, Long> {
}
```

### Añadir query methods según el enunciado

| Lo que pide el enunciado | Query method |
|---|---|
| Listar ordenados por precio | `Collection<Game> findAllByOrderByPrice()` |
| Listar ordenados por precio DESC | `Collection<Game> findAllByOrderByPriceDesc()` |
| Filtrar por booleano + ordenar | `Collection<Game> findAllByDiscountOrderByPriceDesc(boolean discount)` |
| Top N filtrado + ordenado | `Collection<Game> findTop10ByDiscountOrderByPriceDesc(boolean discount)` |
| Buscar por campo único (duplicado) | `Optional<Game> findByName(String name)` |
| Buscar por título (duplicado) | `Optional<Game> findByTitle(String title)` |

### Ejemplo completo (Ludomaniacos Jun 2025)

```java
public interface GameRepository extends JpaRepository<Game, Long> {
    Collection<Game> findTop10ByDiscountOrderByPriceDesc(boolean discount);
}
```

### Ejemplo completo (FotosDaw May 2025)

```java
public interface AdRepository extends JpaRepository<Ad, Long> {
    Collection<Ad> findAllByRentedOrderByPrice(boolean rented);
    Optional<Ad> findByTitle(String title);
}
```

### Cómo construir el nombre del método
```
find [Top N] [All] By <CampoFiltro> [OrderBy <CampoOrden> [Desc]]
```

### Errores comunes
- Escribir el nombre del método mal → Spring no genera la query.
- Olvidar `Desc` cuando piden orden descendente.
- Usar `List` cuando el profesor usa `Collection` (ambos valen, pero `Collection` es lo que usa el profesor).

---

## 4. Service — `service/GameService.java`

### Cuándo se usa
Siempre. Aquí va la lógica de negocio.

### Plantilla base

```java
@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameMapper mapper;

    // --- Métodos públicos ---

    public Collection<GameDTO> getGames(boolean discount) {
        return toDTOs(gameRepository.findTop10ByDiscountOrderByPriceDesc(discount));
    }

    public GameDTO getGame(long id) {
        return toDTO(gameRepository.findById(id).orElseThrow());
    }

    public GameDTO createGame(GameDTO gameDTO) {
        Game game = toDomain(gameDTO);
        gameRepository.save(game);
        return toDTO(game);
    }

    public GameDTO replaceGame(long id, GameDTO updatedGameDTO) {
        Game updatedGame = toDomain(updatedGameDTO);
        updatedGame.setId(id);
        gameRepository.save(updatedGame);
        return toDTO(updatedGame);
    }

    public GameDTO deleteGame(long id) {
        Game game = gameRepository.findById(id).orElseThrow();
        GameDTO gameDTO = toDTO(game);
        gameRepository.deleteById(id);
        return gameDTO;
    }

    // --- Helpers (siempre iguales, delegan en mapper) ---

    private GameDTO toDTO(Game game) {
        return mapper.toDTO(game);
    }

    private Game toDomain(GameDTO gameDTO) {
        return mapper.toDomain(gameDTO);
    }

    private Collection<GameDTO> toDTOs(Collection<Game> games) {
        return mapper.toDTOs(games);
    }
}
```

### Variante: con validación de duplicado (muy frecuente)

```java
public GameDTO createGame(GameDTO gameDTO) {
    // Validar que no existe duplicado por nombre
    if (gameRepository.findByName(gameDTO.name()).isPresent()) {
        return null; // el controller devolverá 409 Conflict
    }
    Game game = toDomain(gameDTO);
    gameRepository.save(game);
    return toDTO(game);
}
```

### Variante: eliminar si stock llega a 0 (Ludomaniacos Jun 2025)

```java
public GameDTO replaceGame(long id, GameDTO updatedGameDTO) {
    Game updatedGame = toDomain(updatedGameDTO);
    updatedGame.setId(id);
    if (updatedGame.getStock() == 0) {
        gameRepository.deleteById(id);
    } else {
        gameRepository.save(updatedGame);
    }
    return toDTO(updatedGame);
}
```

### Errores comunes
- Olvidar `@Service`.
- Olvidar `updatedGame.setId(id)` en el PUT → crea una entidad nueva en vez de actualizar.
- En el delete, olvidar convertir a DTO **antes** de borrar.

---

## 5. RestController — `controller/GameRestController.java`

### Cuándo se usa
Siempre.

### Plantilla base

```java
@RestController
@RequestMapping("/api/games")
public class GameRestController {

    @Autowired
    private GameService gameService;

    @GetMapping("/")
    public Collection<GameDTO> getGames(@RequestParam boolean discount) {
        return gameService.getGames(discount);
    }

    @GetMapping("/{id}")
    public GameDTO getGame(@PathVariable Long id) {
        return gameService.getGame(id);
    }

    @PostMapping("/")
    public ResponseEntity<GameDTO> createGame(@RequestBody GameDTO gameDTO) {

        gameDTO = gameService.createGame(gameDTO);

        URI location = fromCurrentRequest().path("/{id}")
            .buildAndExpand(gameDTO.id()).toUri();

        return ResponseEntity.created(location).body(gameDTO);
    }

    @PutMapping("/{id}")
    public GameDTO replaceGame(@PathVariable Long id, @RequestBody GameDTO gameDTO) {
        return gameService.replaceGame(id, gameDTO);
    }

    @DeleteMapping("/{id}")
    public GameDTO deleteGame(@PathVariable Long id) {
        return gameService.deleteGame(id);
    }
}
```

### Variante: POST con validación de duplicado

```java
@PostMapping("/")
public ResponseEntity<GameDTO> createGame(@RequestBody GameDTO gameDTO) {

    gameDTO = gameService.createGame(gameDTO);

    if (gameDTO == null) {
        return new ResponseEntity<>(HttpStatus.CONFLICT); // 409
    }

    URI location = fromCurrentRequest().path("/{id}")
        .buildAndExpand(gameDTO.id()).toUri();

    return ResponseEntity.created(location).body(gameDTO);
}
```

### Variante: GET sin filtro (lista simple)

```java
@GetMapping("/")
public Collection<GameDTO> getGames() {
    return gameService.getGames();
}
```

### Variante: GET con filtro por query param

```java
@GetMapping("/")
public Collection<GameDTO> getGames(@RequestParam boolean rented) {
    return gameService.getAds(rented);
}
```

### Códigos de estado que usa el profesor

| Operación | Código | Cómo se consigue |
|---|---|---|
| GET | 200 OK | Return directo (Spring lo hace automáticamente) |
| POST | 201 Created | `ResponseEntity.created(location).body(dto)` |
| PUT | 200 OK | Return directo |
| DELETE | 200 OK | Return directo (devuelve el DTO borrado) |
| POST duplicado | 409 Conflict | `new ResponseEntity<>(HttpStatus.CONFLICT)` |
| GET id inexistente | 500 | `.orElseThrow()` en el Service (el profesor no maneja 404 explícito) |

### Patrón POST con Location header (MEMORIZAR)
```java
URI location = fromCurrentRequest().path("/{id}")
    .buildAndExpand(gameDTO.id()).toUri();
return ResponseEntity.created(location).body(gameDTO);
```
> `fromCurrentRequest()` viene de `ServletUriComponentsBuilder` (no hay que importar).

### Errores comunes
- Olvidar `@RestController` (el más grave).
- Olvidar `@RequestMapping("/api/games")` — las URLs deben empezar con `/api/`.
- Usar `@Controller` en vez de `@RestController` → devuelve vistas, no JSON.
- Olvidar `@RequestBody` en POST/PUT → el body no se parsea.
- Olvidar `@PathVariable` en GET/PUT/DELETE por id.
- POST sin `ResponseEntity.created()` → pierde puntos de "principios REST".

---

## 6. (Opcional) WebSecurityConfig — `security/WebSecurityConfig.java`

### Cuándo se usa
Solo si el enunciado menciona roles, login, o usuarios con permisos distintos.

### Plantilla (basada en Mayo 2024)

```java
@Configuration
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize -> authorize
            // Rutas públicas
            .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
            // Rutas solo para admin
            .requestMatchers(HttpMethod.POST, "/api/products/**").hasRole("ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")
            // Rutas para usuarios autenticados
            .requestMatchers(HttpMethod.PUT, "/api/products/**").hasRole("CLIENT")
            // Resto: autenticado
            .anyRequest().authenticated()
        );
        http.csrf(csrf -> csrf.disable());
        http.httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
```

### Errores comunes
- Olvidar `@Configuration`.
- No deshabilitar CSRF para la API REST.
- Confundir `hasRole("ADMIN")` con `hasRole("ROLE_ADMIN")` (Spring añade el prefijo `ROLE_` automáticamente).

---

## Resumen: orden de escritura y tiempo

| # | Fichero | Tiempo | Qué copiar del enunciado |
|---|---|---|---|
| 1 | Entity | 3 min | Nombre de la entidad + campos |
| 2 | DTO record | 1 min | Mismos campos que la Entity |
| 3 | Repository | 2 min | Query methods según filtros/orden que pida |
| 4 | Service | 10 min | Lógica de negocio (duplicado, cambio estado, etc.) |
| 5 | RestController | 10 min | Endpoints CRUD + Location header en POST |
| | **Total** | **~26 min** | |
