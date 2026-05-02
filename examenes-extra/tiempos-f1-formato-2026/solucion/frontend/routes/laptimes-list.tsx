import type { Route } from "./+types/laptimes-list";

// clientLoader: se ejecuta ANTES de renderizar el componente.
// Carga ambas listas (rapidas y normales) en paralelo.
export async function clientLoader({}: Route.ClientLoaderArgs) {
  const [fastestLapTimes, normalLapTimes] = await Promise.all([
    getLapTimes(true),
    getLapTimes(false),
  ]);
  return { fastestLapTimes, normalLapTimes };
}

export default function LapTimesList({ loaderData }: Route.ComponentProps) {
  // loaderData contiene lo que devolvio clientLoader
  const { fastestLapTimes, normalLapTimes } = loaderData;

  // useActionState gestiona el estado del formulario y la accion de envio
  // Parametros: (funcion accion, estado inicial)
  const [error, submitAction, isPending] = useActionState(handleCreate, null);

  // navigate se usa para recargar la pagina tras crear un tiempo
  const navigate = useNavigate();

  // Funcion que se ejecuta al enviar el formulario
  async function handleCreate(previousState: string | null, formData: FormData) {
    // Extraemos los valores del formulario
    const lapNumber = Number(formData.get("lapNumber"));
    const time = formData.get("time") as string;

    // Llamamos a la API para crear el tiempo
    const response = await createLapTime({
      lapNumber,
      time,
      fastest: false, // por defecto no es vuelta rapida
    });

    // Si la API devuelve 409 (CONFLICT), es un duplicado
    if (response.status === 409) {
      alert("Vuelta ya asignada");
      return "error";
    }

    // Si todo fue bien, recargamos la pagina para ver el nuevo tiempo
    navigate("/");
    return null;
  }

  return (
    <>
      {/* Formulario para registrar un nuevo tiempo */}
      <h2>Registrar nuevo tiempo</h2>
      <form action={submitAction}>
        <label>Numero de vuelta:</label>
        <input name="lapNumber" type="number" required />
        <label>Tiempo:</label>
        <input name="time" type="text" placeholder="1:32.456" required />
        <button type="submit" disabled={isPending}>Registrar</button>
      </form>

      {/* Lista de vueltas rapidas */}
      <h2>Vueltas rapidas</h2>
      <ul>
        {fastestLapTimes.map((lt: LapTimeDTO) => (
          <li key={lt.id}>
            <Link to={`/laptime/${lt.id}`}>Vuelta {lt.lapNumber}</Link>
            {" - "}{lt.time}
          </li>
        ))}
      </ul>

      {/* Lista de vueltas normales */}
      <h2>Vueltas normales</h2>
      <ul>
        {normalLapTimes.map((lt: LapTimeDTO) => (
          <li key={lt.id}>
            <Link to={`/laptime/${lt.id}`}>Vuelta {lt.lapNumber}</Link>
            {" - "}{lt.time}
          </li>
        ))}
      </ul>
    </>
  );
}
