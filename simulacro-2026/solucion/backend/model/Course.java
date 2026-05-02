// Entidad JPA que representa un curso de idiomas en la academia
@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;        // nombre unico del curso
    private String language;    // idioma (Ingles, Frances, etc.)
    private String level;       // nivel MCER: A1, A2, B1, B2, C1, C2
    private int maxStudents;    // plazas totales
    private int enrolledStudents; // alumnos inscritos (empieza en 0)
    private boolean completed;    // curso finalizado (empieza en false)

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
