const API_URL = "/api/deliveries";

// Obtiene entregas filtradas por estado
export async function getDeliveries(status: string): Promise<Delivery[]> {
    const response = await fetch(API_URL + "?status=" + status);
    if (!response.ok) throw new Error("Error al obtener entregas");
    return response.json();
}

// Crea una nueva entrega; lanza error si la matricula ya existe (409)
export async function createDelivery(delivery: Delivery): Promise<Delivery> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(delivery),
    });
    if (!response.ok) {
        throw new Error("Duplicate");
    }
    return response.json();
}

// Actualiza una entrega (cambio de estado)
export async function updateDelivery(id: number, delivery: Delivery): Promise<Delivery> {
    const response = await fetch(API_URL + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(delivery),
    });
    if (!response.ok) throw new Error("Error al actualizar entrega");
    return response.json();
}

// Elimina una entrega (cancelacion)
export async function removeDelivery(id: number): Promise<Delivery> {
    const response = await fetch(API_URL + "/" + id, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar entrega");
    return response.json();
}
