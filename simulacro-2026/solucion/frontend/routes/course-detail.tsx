import type { Route } from "./+types/course-detail";

// clientLoader: carga el curso por id extraido de la URL (params.id)
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const course = await getCourse(Number(params.id));
    return { course };
}

export default function CourseDetail({ loaderData }: Route.ComponentProps) {
    const { course } = loaderData;
    const navigate = useNavigate();

    // Si el curso no existe o fue eliminado
    if (!course) {
        return (
            <div>
                <p>Curso no disponible</p>
                <button onClick={() => navigate("/")}>Volver</button>
            </div>
        );
    }

    // Plazas disponibles = maxStudents - enrolledStudents
    const availableSpots = course.maxStudents - course.enrolledStudents;

    // Inscribir un alumno: enrolledStudents + 1
    // Si alcanza el maximo, se marca como completo automaticamente (lo hace el backend)
    async function handleEnroll() {
        await updateCourse(
            course.id,
            course.name,
            course.language,
            course.level,
            course.maxStudents,
            course.enrolledStudents + 1,
            course.completed
        );
        navigate(0); // recargar la pagina actual para ver los datos actualizados
    }

    // Marcar curso como completo manualmente
    async function handleComplete() {
        await updateCourse(
            course.id,
            course.name,
            course.language,
            course.level,
            course.maxStudents,
            course.enrolledStudents,
            true
        );
        navigate(0);
    }

    // Eliminar curso y volver al listado
    async function handleDelete() {
        await removeCourse(course.id);
        navigate("/");
    }

    return (
        <div>
            <h2>{course.name}</h2>

            {/* Aviso de ultimas plazas: solo si quedan menos de 3 y no esta completo */}
            {!course.completed && availableSpots < 3 && (
                <p style={{ color: "red" }}>¡Ultimas plazas!</p>
            )}

            <p>Idioma: {course.language}</p>
            <p>Nivel: {course.level}</p>
            <p>Alumnos inscritos: {course.enrolledStudents} / {course.maxStudents}</p>
            <p>Plazas disponibles: {availableSpots}</p>
            <p>Estado: {course.completed ? "Completo" : "Activo"}</p>

            <hr />

            {/* Botones de accion: solo si el curso no esta completo */}
            {!course.completed && (
                <div>
                    <button onClick={handleEnroll} disabled={availableSpots <= 0}>
                        Inscribir alumno
                    </button>
                    {" "}
                    <button onClick={handleComplete}>
                        Marcar como completo
                    </button>
                </div>
            )}

            {" "}
            <button onClick={handleDelete}>Eliminar</button>
            {" "}
            <button onClick={() => navigate("/")}>Volver</button>
        </div>
    );
}
