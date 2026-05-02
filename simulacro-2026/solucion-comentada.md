# Solución comentada: Simulacro LinguaDaw 2026

> Guía paso a paso de cómo abordaría el examen real desde 0 hasta 90 min.
> Cada paso indica qué escribir, por qué, y cuánto tiempo dedicar.

---

## Minuto 0–5: Leer y planificar

### Lo que leo del enunciado y apunto mentalmente:

```
Entidad:    Course
Campos:     name, language, level, maxStudents, enrolledStudents, completed
Unique:     name (duplicado → alert)
Estados:    completed = true/false
Orden:      activos por plazas disponibles ASC, completos por nombre
Detalle:    todos los campos + "¡Últimas plazas!" si plazas < 3
Acciones:   inscribir (+1 enrolled, auto-completa si llega al max),
            marcar completo, eliminar
Docker:     daw/linguadaw:1.0.0, 8443:8443, restart on-failure, mysql:8.0
```

### Ficheros que voy a escribir:

```
backend/                        frontend/                    docker/
├── model/Course.java           ├── models/Course.ts         └── docker-compose.yaml
├── dto/CourseDTO.java          ├── services/courses-service.ts
├── repository/CourseRepository ├── routes.ts
├── service/CourseService.java  ├── routes/home.tsx
└── controller/CourseRestCtrl   ├── routes/courses-list.tsx
                                └── routes/course-detail.tsx
```

### Rutas del frontend:
```
/            → lista + formulario
/course/:id  → detalle + botones
```

---

## Minuto 5–8: Entity (3 min)

Escribo `backend/model/Course.java`. Es mecánico: copiar campos del enunciado.

```java
@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String language;
    private String level;
    private int maxStudents;
    private int enrolledStudents;
    private boolean completed;

    public Course() {}

    public Course(String name, String language, String level, int maxStudents) {
        this.name = name;
        this.language = language;
        this.level = level;
        this.maxStudents = maxStudents;
        this.enrolledStudents = 0;
        this.completed = false;
    }

    // getters and setters
}
```

**Decisiones rápidas:**
- `enrolledStudents` empieza en 0 → lo pongo en el constructor, no como parámetro.
- `completed` empieza en false → igual.
- `level` es String (no enum) → más simple para el examen.

---

## Minuto 8–9: DTO record (1 min)

```java
public record CourseDTO(
    Long id, String name, String language, String level,
    int maxStudents, int enrolledStudents, boolean completed
) {}
```

> Copio los campos de la Entity. Un one-liner.

---

## Minuto 9–11: Repository (2 min)

Pienso: ¿qué consultas necesito?
- Activos → `findAllByCompletedFalse()` (los ordeno en Java porque es por cálculo)
- Completos ordenados por nombre → `findAllByCompletedTrueOrderByName()`
- Buscar por nombre (duplicado) → `findByName(String name)` → Optional

```java
public interface CourseRepository extends JpaRepository<Course, Long> {
    Collection<Course> findAllByCompletedFalse();
    Collection<Course> findAllByCompletedTrueOrderByName();
    Optional<Course> findByName(String name);
}
```

> No puedo hacer `OrderBy(maxStudents - enrolledStudents)` con query methods.
> Lo ordeno en el Service con un Comparator. Es válido.

---

## Minuto 11–21: Service (10 min)

Este es el fichero más largo. Lo escribo metódicamente:

```java
@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseMapper mapper;

    public Collection<CourseDTO> getCourses(boolean completed) {
        if (completed) {
            return toDTOs(courseRepository.findAllByCompletedTrueOrderByName());
        }
        // Activos: ordenar por plazas disponibles (menor a mayor)
        List<Course> active = new ArrayList<>(courseRepository.findAllByCompletedFalse());
        active.sort(Comparator.comparingInt(c -> c.getMaxStudents() - c.getEnrolledStudents()));
        return toDTOs(active);
    }

    public CourseDTO getCourse(long id) {
        return toDTO(courseRepository.findById(id).orElseThrow());
    }

    public CourseDTO createCourse(CourseDTO dto) {
        if (courseRepository.findByName(dto.name()).isPresent()) {
            return null;
        }
        Course course = toDomain(dto);
        courseRepository.save(course);
        return toDTO(course);
    }

    public CourseDTO replaceCourse(long id, CourseDTO dto) {
        Course updated = toDomain(dto);
        updated.setId(id);
        // Auto-completar si los inscritos alcanzan el máximo
        if (updated.getEnrolledStudents() >= updated.getMaxStudents()) {
            updated.setCompleted(true);
        }
        courseRepository.save(updated);
        return toDTO(updated);
    }

    public CourseDTO deleteCourse(long id) {
        Course course = courseRepository.findById(id).orElseThrow();
        CourseDTO dto = toDTO(course);
        courseRepository.deleteById(id);
        return dto;
    }

    private CourseDTO toDTO(Course c) { return mapper.toDTO(c); }
    private Course toDomain(CourseDTO d) { return mapper.toDomain(d); }
    private Collection<CourseDTO> toDTOs(Collection<Course> cs) { return mapper.toDTOs(cs); }
}
```

**Lo que pienso mientras escribo:**
- `getCourses(false)` necesita ordenar por `maxStudents - enrolledStudents` → no hay query method, ordeno en Java.
- `createCourse` → comprobar duplicado por `name`, devolver null si existe.
- `replaceCourse` → la lógica de "auto-completar si lleno" va aquí, no en el controller.
- `deleteCourse` → convertir a DTO antes de borrar (para devolver al cliente).

---

## Minuto 21–31: RestController (10 min)

```java
@RestController
@RequestMapping("/api/courses")
public class CourseRestController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/")
    public Collection<CourseDTO> getCourses(@RequestParam boolean completed) {
        return courseService.getCourses(completed);
    }

    @GetMapping("/{id}")
    public CourseDTO getCourse(@PathVariable Long id) {
        return courseService.getCourse(id);
    }

    @PostMapping("/")
    public ResponseEntity<CourseDTO> createCourse(@RequestBody CourseDTO dto) {
        dto = courseService.createCourse(dto);
        if (dto == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        URI location = fromCurrentRequest().path("/{id}")
            .buildAndExpand(dto.id()).toUri();
        return ResponseEntity.created(location).body(dto);
    }

    @PutMapping("/{id}")
    public CourseDTO replaceCourse(@PathVariable Long id, @RequestBody CourseDTO dto) {
        return courseService.replaceCourse(id, dto);
    }

    @DeleteMapping("/{id}")
    public CourseDTO deleteCourse(@PathVariable Long id) {
        return courseService.deleteCourse(id);
    }
}
```

**Patrón mecánico:** siempre los mismos 5 endpoints.
Solo el POST tiene lógica especial (duplicado → 409 + Location header).

### Revisión rápida del backend (1 min):
- ¿`@Entity` en el modelo? ✓
- ¿`@RestController` en el controller? ✓
- ¿POST devuelve 201 Created? ✓
- ¿Los nombres de query methods son correctos? ✓
- ¿El duplicado devuelve 409? ✓

**Backend terminado. Tiempo total: ~26 min. Voy bien.**

---

## Minuto 33–34: Interface TypeScript (1 min)

```ts
// frontend/models/Course.ts
export default interface Course {
    id: number;
    name: string;
    language: string;
    level: string;
    maxStudents: number;
    enrolledStudents: number;
    completed: boolean;
}
```

---

## Minuto 34–39: Service fetch (5 min)

```ts
// frontend/services/courses-service.ts
const API_URL = "/api/courses";

export async function getCourses(completed: boolean): Promise<Course[]> {
    const res = await fetch(`${API_URL}/?completed=${completed}`);
    return await res.json();
}

export async function getCourse(id: string): Promise<Course> {
    const res = await fetch(`${API_URL}/${id}`);
    return await res.json();
}

export async function createCourse(name: string, language: string,
        level: string, maxStudents: number): Promise<Course> {
    const res = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, language, level, maxStudents,
            enrolledStudents: 0, completed: false }),
    });
    if (!res.ok) throw new Error("Error");
    return await res.json();
}

export async function updateCourse(id: number, name: string, language: string,
        level: string, maxStudents: number, enrolledStudents: number,
        completed: boolean): Promise<Course> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, language, level, maxStudents,
            enrolledStudents, completed }),
    });
    return await res.json();
}

export async function removeCourse(id: number): Promise<void> {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
```

**Patrón mecánico:** todas las funciones siguen la misma estructura.
POST/PUT → method + headers + body. GET/DELETE → solo URL.

---

## Minuto 39–41: routes.ts + home.tsx (2 min)

```ts
// frontend/routes.ts
export default [
    layout("routes/home.tsx", [
        index("routes/courses-list.tsx"),
        route("course/:id", "routes/course-detail.tsx"),
    ]),
] satisfies RouteConfig;
```

```tsx
// frontend/routes/home.tsx
export default function Home() {
    return (
        <div>
            <h1>LinguaDaw</h1>
            <Outlet />
        </div>
    );
}
```

---

## Minuto 41–58: Página lista + formulario (17 min)

**Este es el fichero más largo y el que más puntos vale. Con calma.**

```tsx
// frontend/routes/courses-list.tsx

// 1. clientLoader: cargar datos antes de renderizar
export async function clientLoader() {
    const active = await getCourses(false);
    const completed = await getCourses(true);
    return { active, completed };
}

// 2. Componente principal
export default function CoursesList({ loaderData }: Route.ComponentProps) {

    const { active, completed } = loaderData;
    const navigate = useNavigate();

    // 3. useActionState para el formulario
    async function handleCreate(
        prevState: { error: string | null },
        formData: FormData
    ) {
        const name = formData.get("name") as string;
        const language = formData.get("language") as string;
        const level = formData.get("level") as string;
        const maxStudents = Number(formData.get("maxStudents"));

        try {
            await createCourse(name, language, level, maxStudents);
            navigate("/");
            return { error: null };
        } catch (e) {
            alert("Ya existe un curso con el mismo nombre");
            return { error: "duplicado" };
        }
    }

    const [state, formAction, isPending] = useActionState(
        handleCreate, { error: null }
    );

    return (
        <div>
            {/* 4. Formulario de creación */}
            <h2>Registrar nuevo curso</h2>
            <form action={formAction}>
                <label>Nombre: </label>
                <input type="text" name="name" required />
                <label>Idioma: </label>
                <input type="text" name="language" required />
                <label>Nivel: </label>
                <select name="level">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                </select>
                <label>Plazas máximas: </label>
                <input type="number" name="maxStudents" required />
                <button type="submit" disabled={isPending}>
                    {isPending ? "Registrando..." : "Registrar curso"}
                </button>
            </form>

            {/* 5. Lista de cursos activos */}
            <h2>Cursos activos</h2>
            <ul>
                {active.map(course => (
                    <li key={course.id}>
                        <Link to={`/course/${course.id}`}>{course.name}</Link>
                        - {course.language}
                        - Plazas disponibles: {course.maxStudents - course.enrolledStudents}
                    </li>
                ))}
            </ul>

            {/* 6. Lista de cursos completos */}
            <h2>Cursos completos</h2>
            <ul>
                {completed.map(course => (
                    <li key={course.id}>
                        <Link to={`/course/${course.id}`}>{course.name}</Link>
                        - {course.language}
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

**Lo que me aseguro de no olvidar:**
- `key={course.id}` en cada `<li>` del `.map()`.
- `<Link to={...}>` no `<a href={...}>`.
- El `<select>` para el nivel con las 6 opciones.
- `alert()` para el error de duplicado (el enunciado lo pide explícitamente).

---

## Minuto 58–70: Página detalle (12 min)

```tsx
// frontend/routes/course-detail.tsx

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    return await getCourse(params.id!);
}

export default function CourseDetail({ loaderData }: Route.ComponentProps) {

    const course = loaderData;
    const navigate = useNavigate();
    const [notAvailable, setNotAvailable] = useState(false);

    const availableSpots = course.maxStudents - course.enrolledStudents;

    async function handleEnroll() {
        const updated = await updateCourse(
            course.id, course.name, course.language, course.level,
            course.maxStudents, course.enrolledStudents + 1, course.completed
        );
        if (updated.enrolledStudents >= updated.maxStudents) {
            // El backend ya lo marca como completo
        }
        navigate(`/course/${course.id}`);
    }

    async function handleComplete() {
        await updateCourse(
            course.id, course.name, course.language, course.level,
            course.maxStudents, course.enrolledStudents, true
        );
        navigate(`/course/${course.id}`);
    }

    async function handleDelete() {
        await removeCourse(course.id);
        setNotAvailable(true);
    }

    if (notAvailable) {
        return <p>Curso no disponible</p>;
    }

    return (
        <div>
            <h2>
                {course.name}
                {availableSpots < 3 && !course.completed &&
                    <span style={{color: "red"}}> ¡Últimas plazas!</span>
                }
            </h2>

            <ul>
                <li>Idioma: {course.language}</li>
                <li>Nivel: {course.level}</li>
                <li>Alumnos inscritos: {course.enrolledStudents} / {course.maxStudents}</li>
            </ul>

            {!course.completed && (
                <div>
                    <button onClick={handleEnroll}>Inscribir alumno</button>
                    <button onClick={handleComplete}>Marcar como completo</button>
                </div>
            )}
            <button onClick={handleDelete}>Eliminar</button>
            <button onClick={() => navigate("/")}>Volver</button>
        </div>
    );
}
```

**Decisiones rápidas:**
- Los botones "Inscribir" y "Marcar completo" solo aparecen si el curso NO está completo.
- "Eliminar" y "Volver" siempre visibles.
- "¡Últimas plazas!" solo si hay plazas disponibles < 3 Y no está completo.

---

## Minuto 70–80: Docker Compose (10 min, pero solo necesito 3)

```yaml
# docker/docker-compose.yaml
services:
  web:
    image: daw/linguadaw:1.0.0
    ports:
      - "8443:8443"
    restart: on-failure
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/linguadaw
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=pass
  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=pass
      - MYSQL_DATABASE=linguadaw
```

**Checklist mental:**
- ✓ `db:3306` no `localhost:3306`
- ✓ Passwords coinciden (`pass` = `pass`)
- ✓ Database name coincide (`linguadaw` en URL y en MYSQL_DATABASE)
- ✓ Puerto 3306 NO expuesto al host
- ✓ Puerto 8443:8443 como dice el enunciado
- ✓ `restart: on-failure` como dice el enunciado

---

## Minuto 80–85: Revisión final

### Backend:
- [ ] ¿5 ficheros? Entity, DTO, Repository, Service, Controller ✓
- [ ] ¿`@Entity`, `@Service`, `@RestController`? ✓
- [ ] ¿POST devuelve 201 con Location? ✓
- [ ] ¿Duplicado devuelve 409? ✓
- [ ] ¿Query methods correctos? ✓

### Frontend:
- [ ] ¿6 ficheros? Model, Service, routes.ts, home, list, detail ✓
- [ ] ¿`clientLoader` en lista y detalle? ✓
- [ ] ¿`useActionState` en el formulario? ✓
- [ ] ¿`key={...}` en los `.map()`? ✓
- [ ] ¿`<Link to={...}>` no `<a href>`? ✓
- [ ] ¿`alert()` en duplicado? ✓
- [ ] ¿"¡Últimas plazas!" en rojo? ✓
- [ ] ¿Botones condicionados a `!completed`? ✓

### Docker:
- [ ] ¿Passwords coinciden? ✓
- [ ] ¿DB name coincide? ✓
- [ ] ¿Puerto 3306 NO expuesto? ✓
- [ ] ¿`db` en la URL, no `localhost`? ✓

---

## Minuto 85–90: Empaquetar

1. Crear ZIP con 7-Zip.
2. Nombre: `XXX-Examen-Mayo.zip` (tus iniciales).
3. Verificar que dentro tiene: `backend/`, `frontend/`, `docker/`.
4. Subir.

---

## Tiempo real invertido

| Fase | Minutos | Acumulado |
|---|---|---|
| Leer + planificar | 5 | 5 |
| Entity | 3 | 8 |
| DTO | 1 | 9 |
| Repository | 2 | 11 |
| Service | 10 | 21 |
| Controller | 10 | 31 |
| Pausa mental | 2 | 33 |
| Interface TS | 1 | 34 |
| Service fetch | 5 | 39 |
| routes.ts + home | 2 | 41 |
| Lista + formulario | 17 | 58 |
| Detalle + botones | 12 | 70 |
| Docker Compose | 3 | 73 |
| Revisión | 7 | 80 |
| Empaquetar | 5 | 85 |
| **Margen de seguridad** | **5** | **90** |

> Con práctica, el backend se puede hacer en 20 min y sobra más margen
> para el frontend, que es donde está la mayor puntuación (2.5p).
