import type { Route } from "./+types/laptime-detail";

// clientLoader: carga el tiempo concreto por su id (viene en params.id)
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await getLapTime(params.id!);
}

export default function LapTimeDetail({ loaderData }: Route.ComponentProps) {
  // Estado local: el tiempo cargado y si ha sido eliminado
  const [lapTime, setLapTime] = useState(loaderData);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  // Marcar como vuelta rapida: cambiamos fastest a true y enviamos PUT
  async function handleMarkFastest() {
    const updated = await updateLapTime({ ...lapTime, fastest: true });
    setLapTime(updated);
  }

  // Quitar marca de vuelta rapida: cambiamos fastest a false y enviamos PUT
  async function handleUnmarkFastest() {
    const updated = await updateLapTime({ ...lapTime, fastest: false });
    setLapTime(updated);
  }

  // Borrar: enviamos DELETE y marcamos como eliminado
  async function handleDelete() {
    await removeLapTime(lapTime.id!);
    setDeleted(true);
  }

  // Si se ha eliminado, mostramos solo este mensaje
  if (deleted) {
    return <h2>Tiempo no disponible</h2>;
  }

  return (
    <>
      <h2>Detalle de la vuelta {lapTime.lapNumber}</h2>

      <ul>
        <li>Numero de vuelta: {lapTime.lapNumber}</li>
        <li>Tiempo: {lapTime.time}</li>
      </ul>

      {/* Mensaje condicional: solo si es vuelta rapida, en verde */}
      {lapTime.fastest && (
        <p style={{ color: "green" }}>Vuelta rapida!</p>
      )}

      <div>
        {/* Marcar rapida: siempre visible (si no es rapida, la marca) */}
        <button onClick={handleMarkFastest}>Marcar rapida</button>

        {/* Quitar marca: solo visible si ES vuelta rapida */}
        {lapTime.fastest && (
          <button onClick={handleUnmarkFastest}>Quitar marca</button>
        )}

        <button onClick={handleDelete}>Borrar</button>
      </div>

      <br />
      <Link to="/">Volver al listado</Link>
    </>
  );
}
