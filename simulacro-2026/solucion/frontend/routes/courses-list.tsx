import type { Route } from "./+types/courses-list";

// clientLoader: carga datos ANTES de renderizar el componente (equivale a un resolver en Angular)
// Cargamos en paralelo los cursos activos y los completos
export async function clientLoader({}: Route.ClientLoaderArgs) {
    const [active, completed] = await Promise.all([
        getCourses(false),
        getCourses(true),
    ]);
    return { active, completed };
}

// clientAction: se ejecuta al hacer submit del formulario de creacion
// Si el servidor devuelve error (409 duplicado), devolvemos el mensaje de error
export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const language = formData.get("language") as string;
    const level = formData.get("level") as string;
    const maxStudents = Number(formData.get("maxStudents"));

    try {
        await createCourse(name, language, level, maxStudents);
        return { error: null };
    } catch (e) {
        return { error: "Ya existe un curso con el mismo nombre" };
    }
}

export default function CoursesList({ loaderData, actionData }: Route.ComponentProps) {
    const { active, completed } = loaderData;

    return (
        <div>
            {/* --- Formulario de creacion --- */}
            <h2>Nuevo curso</h2>
            <Form method="post">
                <div>
                    <label>Nombre: </label>
                    <input type="text" name="name" required />
                </div>
                <div>
                    <label>Idioma: </label>
                    <input type="text" name="language" required />
                </div>
                <div>
                    <label>Nivel: </label>
                    <select name="level" required>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                    </select>
                </div>
                <div>
                    <label>Plazas: </label>
                    <input type="number" name="maxStudents" min="1" required />
                </div>
                <button type="submit">Crear curso</button>
            </Form>

            {/* Mensaje de error si el nombre ya existe */}
            {actionData?.error && (
                <p style={{ color: "red" }}>{actionData.error}</p>
            )}

            <hr />

            {/* --- Listado de cursos activos --- */}
            <h2>Cursos activos</h2>
            {active.length === 0 ? (
                <p>No hay cursos activos</p>
            ) : (
                <ul>
                    {active.map((course: Course) => (
                        <li key={course.id}>
                            <Link to={`/course/${course.id}`}>{course.name}</Link>
                            {" - "}{course.language}
                            {" - Plazas disponibles: "}
                            {course.maxStudents - course.enrolledStudents}
                        </li>
                    ))}
                </ul>
            )}

            <hr />

            {/* --- Listado de cursos completos --- */}
            <h2>Cursos completos</h2>
            {completed.length === 0 ? (
                <p>No hay cursos completos</p>
            ) : (
                <ul>
                    {completed.map((course: Course) => (
                        <li key={course.id}>
                            <Link to={`/course/${course.id}`}>{course.name}</Link>
                            {" - "}{course.language}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
