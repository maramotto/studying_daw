// Record Java: genera constructor, getters, equals, hashCode y toString automaticamente
// Usamos record porque los DTOs son inmutables por definicion
public record CourseDTO(
    Long id,
    String name,
    String language,
    String level,
    int maxStudents,
    int enrolledStudents,
    boolean completed
) {}
