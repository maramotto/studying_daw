// SpringData genera la implementacion automaticamente a partir del nombre del metodo
public interface CourseRepository extends JpaRepository<Course, Long> {

    // Para cursos activos: los ordenaremos en el servicio porque
    // el calculo (maxStudents - enrolledStudents) no se puede expresar en el nombre del metodo
    Collection<Course> findAllByCompletedFalse();

    // Para cursos completos: ordenados por nombre directamente en la query
    Collection<Course> findAllByCompletedTrueOrderByName();

    // Para validar duplicados al crear
    Optional<Course> findByName(String name);
}
