import type { Route } from "./+types/delivery-detail";

// clientLoader: carga la entrega por id desde la URL
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await getDelivery(params.id!);
}

export default function DeliveryDetail({ loaderData }: Route.ComponentProps) {
  // Estado local: la entrega cargada y si ha sido eliminada
  const [delivery, setDelivery] = useState(loaderData);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  // Marca la entrega como finalizada (PUT con status = DELIVERED)
  async function handleFinalize() {
    const updated = { ...delivery, status: "DELIVERED" };
    const result = await replaceDelivery(updated);
    setDelivery(result);
  }

  // Elimina la entrega (DELETE)
  async function handleDelete() {
    await deleteDelivery(delivery.id!);
    setDeleted(true);
  }

  // Si fue eliminada, mostrar mensaje
  if (deleted) {
    return (
      <div>
        <h2>Entrega no encontrada</h2>
        <button onClick={() => navigate("/")}>Volver</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Detalle de entrega</h2>
      <ul>
        <li>Matricula: {delivery.plate}</li>
        <li>Modelo: {delivery.model}</li>
        <li>Color: {delivery.color}</li>
        <li>
          Cilindrada: {delivery.displacement}
          {delivery.displacement >= 1000 && (
            <span style={{ color: "red" }}> Gran cilindrada!</span>
          )}
        </li>
        <li>Direccion: {delivery.address}</li>
        <li>Nombre del cliente: {delivery.clientName}</li>
        <li>Estado: {delivery.status === "PENDING" ? "Pendiente" : "Finalizada"}</li>
      </ul>

      <div>
        {/* Solo mostrar "Entrega finalizada" si la entrega esta pendiente */}
        {delivery.status === "PENDING" && (
          <button onClick={handleFinalize}>Entrega finalizada</button>
        )}
        <button onClick={handleDelete}>Eliminar</button>
        <button onClick={() => navigate("/")}>Volver</button>
      </div>
    </div>
  );
}
