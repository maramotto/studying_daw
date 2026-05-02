@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseMapper mapper;

    // Devuelve cursos activos o completos segun el parametro
    public Collection<CourseDTO> getCourses(boolean completed) {
        if (completed) {
            // Completos: ya vienen ordenados por nombre desde el repositorio
            return toDTOs(courseRepository.findAllByCompletedTrueOrderByName());
        } else {
            // Activos: ordenar por plazas disponibles ASC (los que tienen menos plazas primero)
            List<Course> active = new ArrayList<>(courseRepository.findAllByCompletedFalse());
            active.sort(Comparator.comparingInt(c -> c.getMaxStudents() - c.getEnrolledStudents()));
            return toDTOs(active);
        }
    }

    public CourseDTO getCourse(long id) {
        return toDTO(courseRepository.findById(id).orElseThrow());
    }

    // Devuelve null si ya existe un curso con ese nombre (el controller devolvera 409)
    public CourseDTO createCourse(CourseDTO dto) {
        if (courseRepository.findByName(dto.name()).isPresent()) {
            return null;
        }
        Course course = toDomain(dto);
        course = courseRepository.save(course);
        return toDTO(course);
    }

    // Actualiza todos los campos del curso
    // Si enrolledStudents alcanza maxStudents, marca como completo automaticamente
    public CourseDTO replaceCourse(long id, CourseDTO dto) {
        Course course = toDomain(dto);
        course.setId(id);
        if (course.getEnrolledStudents() >= course.getMaxStudents()) {
            course.setCompleted(true);
        }
        course = courseRepository.save(course);
        return toDTO(course);
    }

    // Elimina un curso y devuelve su DTO (para que el controller lo retorne)
    public CourseDTO deleteCourse(long id) {
        Course course = courseRepository.findById(id).orElseThrow();
        CourseDTO dto = toDTO(course);
        courseRepository.deleteById(id);
        return dto;
    }

    // --- Helpers de conversion (delegan en el mapper) ---

    private CourseDTO toDTO(Course c) {
        return mapper.toDTO(c);
    }

    private Course toDomain(CourseDTO dto) {
        return mapper.toDomain(dto);
    }

    private Collection<CourseDTO> toDTOs(Collection<Course> courses) {
        return mapper.toDTOs(courses);
    }
}
