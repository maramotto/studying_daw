// Pagina unica del examen: formulario + lista de tiempos.
// Equivalente al AppComponent de Angular en la solucion original.
//
// En framework mode usamos:
// - clientLoader: funcion que se ejecuta ANTES de renderizar la ruta.
//   Equivalente a ngOnInit + la llamada a timesService.getTimes().
// - Route.ComponentProps: tipo que inyecta automaticamente los datos
//   devueltos por clientLoader como prop "loaderData".

import type { Route } from "./+types/times-list";

// clientLoader se ejecuta en el navegador antes de pintar el componente.
// Aqui cargamos la lista de tiempos ordenada por vuelta ASC.
export async function clientLoader({}: Route.ClientLoaderArgs) {
  const times = await getTimes();
  return { times };
}

export default function TimesList({ loaderData }: Route.ComponentProps) {
  // loaderData contiene lo que devolvio clientLoader.
  // useState nos permite tener una copia local que podemos actualizar
  // cuando el usuario crea o borra un tiempo (sin recargar la pagina).
  const [times, setTimes] = useState<Time[]>(loaderData.times);

  // Estado del formulario: cada campo se guarda con useState.
  // Equivalente a [(ngModel)]="time.numLap" y [(ngModel)]="time.lapTime" en Angular.
  const [numLap, setNumLap] = useState(0);
  const [lapTime, setLapTime] = useState("");

  // ---- CREAR TIEMPO ----
  // Se ejecuta al pulsar "Anadir".
  // Si el backend responde 409 (vuelta duplicada), muestra alert.
  // Si fue bien, recarga la lista y limpia el formulario.
  async function handleCreate() {
    const response = await createTime(numLap, lapTime);

    // 409 = Conflict: ya existe un tiempo con ese numero de vuelta.
    if (response.status === 409) {
      alert("Vuelta ya asignada");
      return;
    }

    // Recargamos la lista desde el backend para reflejar el nuevo tiempo.
    const updatedTimes = await getTimes();
    setTimes(updatedTimes);

    // Limpiamos el formulario.
    setNumLap(0);
    setLapTime("");
  }

  // ---- BORRAR TIEMPO ----
  // Se ejecuta al pulsar "Borrar" en un tiempo de la lista.
  // Elimina del backend y recarga la lista.
  async function handleDelete(id: number) {
    await removeTime(id);

    // Recargamos la lista.
    const updatedTimes = await getTimes();
    setTimes(updatedTimes);
  }

  return (
    <div>
      {/* ---- FORMULARIO DE CREACION ---- */}
      {/* Equivalente al formulario con [(ngModel)] de Angular. */}
      {/* Cada input tiene value (dato mostrado) y onChange (actualiza el estado). */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        <div>
          <label>Numero de vuelta: </label>
          <input
            type="number"
            placeholder="Vuelta"
            value={numLap}
            onChange={(e) => setNumLap(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Tiempo: </label>
          <input
            type="text"
            placeholder="Tiempo"
            value={lapTime}
            onChange={(e) => setLapTime(e.target.value)}
          />
        </div>

        <button type="submit">Anadir</button>
      </form>

      {/* ---- LISTA DE TIEMPOS ---- */}
      {/* Equivalente a *ngFor="let time of times" en Angular. */}
      {/* En React usamos .map() para convertir un array en elementos JSX. */}
      {/* key={time.id} es obligatorio para que React identifique cada elemento. */}
      <ul>
        {times.map((time) => (
          <li key={time.id}>
            Numero de vuelta: {time.numLap}, Tiempo: {time.lapTime}
            {/* Equivalente a (click)="deleteTime(time.id)" en Angular. */}
            <button onClick={() => handleDelete(time.id!)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
