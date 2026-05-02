import type { Route } from "./+types/deliveries-list";

// clientLoader: carga las entregas pendientes y finalizadas antes de renderizar
export async function clientLoader({}: Route.ClientLoaderArgs) {
  const pending = await getDeliveries("PENDING");
  const delivered = await getDeliveries("DELIVERED");
  return { pending, delivered };
}

export default function DeliveriesList({ loaderData }: Route.ComponentProps) {
  const { pending, delivered } = loaderData;

  // Estado del formulario para crear una nueva entrega
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [displacement, setDisplacement] = useState(0);
  const [address, setAddress] = useState("");
  const [clientName, setClientName] = useState("");

  const navigate = useNavigate();

  // Envia el formulario al backend
  async function handleSubmit() {
    const delivery = { plate, model, color, displacement, address, clientName, status: "PENDING" };

    const response = await createDelivery(delivery);

    // Si el backend devuelve 409, la matricula ya existe
    if (response.status === 409) {
      alert("Moto pendiente de envio");
    } else {
      // Recargar la pagina para mostrar la nueva entrega
      navigate("/");
    }
  }

  return (
    <div>
      {/* Formulario de alta */}
      <h2>Registrar nueva entrega</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <label>Matricula:</label>
          <input type="text" value={plate} onChange={(e) => setPlate(e.target.value)} />
        </div>
        <div>
          <label>Modelo:</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        </div>
        <div>
          <label>Color:</label>
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div>
          <label>Cilindrada:</label>
          <input type="number" value={displacement} onChange={(e) => setDisplacement(Number(e.target.value))} />
        </div>
        <div>
          <label>Direccion:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Nombre del cliente:</label>
          <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
        </div>
        <button type="submit">Registrar entrega</button>
      </form>

      {/* Lista de entregas pendientes */}
      <h2>Entregas pendientes</h2>
      <ul>
        {pending.map((d: DeliveryDTO) => (
          <li key={d.id}>
            <span>{d.plate} - {d.model} - </span>
            <Link to={"/delivery/" + d.id}>{d.clientName}</Link>
          </li>
        ))}
      </ul>

      {/* Lista de entregas finalizadas */}
      <h2>Entregas finalizadas</h2>
      <ul>
        {delivered.map((d: DeliveryDTO) => (
          <li key={d.id}>
            <span>{d.plate} - {d.model} - </span>
            <Link to={"/delivery/" + d.id}>{d.clientName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
