// Servicio que encapsula todas las llamadas HTTP al backend
// URLs relativas (/api/...) porque el proxy de desarrollo las redirige al backend

const API_URL = "/api/courses";

// Obtener cursos activos (completed=false) o completos (completed=true)
export async function getCourses(completed: boolean): Promise<Course[]> {
    const res = await fetch(`${API_URL}?completed=${completed}`);
    if (!res.ok) throw new Error("Error al obtener cursos");
    return res.json();
}

// Obtener un curso por su id
export async function getCourse(id: number): Promise<Course> {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener curso");
    return res.json();
}

// Crear un curso nuevo
// Lanza error si el servidor devuelve 409 (nombre duplicado)
export async function createCourse(
    name: string,
    language: string,
    level: string,
    maxStudents: number
): Promise<Course> {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            language,
            level,
            maxStudents,
            enrolledStudents: 0,
            completed: false,
        }),
    });
    if (!res.ok) throw new Error("Duplicate");
    return res.json();
}

// Actualizar un curso (inscribir alumno, marcar completo, etc.)
export async function updateCourse(
    id: number,
    name: string,
    language: string,
    level: string,
    maxStudents: number,
    enrolledStudents: number,
    completed: boolean
): Promise<Course> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            language,
            level,
            maxStudents,
            enrolledStudents,
            completed,
        }),
    });
    if (!res.ok) throw new Error("Error al actualizar curso");
    return res.json();
}

// Eliminar un curso
export async function removeCourse(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar curso");
}
