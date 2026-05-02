// Interfaz que refleja el DTO del backend
// Todos los campos coinciden con CourseDTO.java
export default interface Course {
    id: number;
    name: string;
    language: string;
    level: string;
    maxStudents: number;
    enrolledStudents: number;
    completed: boolean;
}
