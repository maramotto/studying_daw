const BASE_URL = "/api/deliveries";

// Obtiene entregas filtradas por estado
export async function getDeliveries(status: string): Promise<DeliveryDTO[]> {
  const res = await fetch(BASE_URL + "?status=" + status);
  if (!res.ok) throw new Error("Error al obtener entregas");
  return await res.json();
}

// Obtiene una entrega por id
export async function getDelivery(id: string): Promise<DeliveryDTO> {
  const res = await fetch(BASE_URL + "/" + id);
  if (!res.ok) throw new Error("Error al obtener entrega");
  return await res.json();
}

// Crea una nueva entrega; devuelve la response para comprobar 409
export async function createDelivery(delivery: DeliveryDTO): Promise<Response> {
  return await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(delivery),
  });
}

// Actualiza una entrega (para cambiar estado)
export async function replaceDelivery(delivery: DeliveryDTO): Promise<DeliveryDTO> {
  const res = await fetch(BASE_URL + "/" + delivery.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(delivery),
  });
  if (!res.ok) throw new Error("Error al actualizar entrega");
  return await res.json();
}

// Elimina una entrega
export async function deleteDelivery(id: number): Promise<void> {
  const res = await fetch(BASE_URL + "/" + id, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar entrega");
}
