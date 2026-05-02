@RestController
@RequestMapping("/api/courses")
public class CourseRestController {

    @Autowired
    private CourseService courseService;

    // GET /api/courses?completed=false  -> cursos activos ordenados por plazas disponibles
    // GET /api/courses?completed=true   -> cursos completos ordenados por nombre
    @GetMapping("/")
    public Collection<CourseDTO> getCourses(@RequestParam boolean completed) {
        return courseService.getCourses(completed);
    }

    // GET /api/courses/5 -> detalle de un curso
    // Si no existe, orElseThrow en el servicio lanza excepcion -> 500
    @GetMapping("/{id}")
    public CourseDTO getCourse(@PathVariable long id) {
        return courseService.getCourse(id);
    }

    // POST /api/courses/ -> crear curso nuevo
    // Devuelve 409 si ya existe uno con el mismo nombre
    @PostMapping("/")
    public ResponseEntity<CourseDTO> createCourse(@RequestBody CourseDTO dto) {
        dto = courseService.createCourse(dto);
        if (dto == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        URI location = fromCurrentRequest().path("/{id}").buildAndExpand(dto.id()).toUri();
        return ResponseEntity.created(location).body(dto);
    }

    // PUT /api/courses/5 -> actualizar curso (inscribir alumno, marcar completo, etc.)
    @PutMapping("/{id}")
    public CourseDTO replaceCourse(@PathVariable long id, @RequestBody CourseDTO dto) {
        return courseService.replaceCourse(id, dto);
    }

    // DELETE /api/courses/5 -> eliminar curso
    @DeleteMapping("/{id}")
    public CourseDTO deleteCourse(@PathVariable long id) {
        return courseService.deleteCourse(id);
    }
}
