const BASE_URL = "/api/laptimes";

// Obtiene la lista de tiempos filtrada por fastest (true/false)
export async function getLapTimes(fastest: boolean): Promise<LapTimeDTO[]> {
  const res = await fetch(`${BASE_URL}?fastest=${fastest}`);
  if (!res.ok) throw new Error("Error al obtener tiempos");
  return await res.json();
}

// Obtiene un tiempo concreto por su id
export async function getLapTime(id: string): Promise<LapTimeDTO> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener tiempo");
  return await res.json();
}

// Crea un nuevo tiempo. Devuelve la respuesta completa para poder comprobar el status
export async function createLapTime(lapTime: LapTimeDTO): Promise<Response> {
  return await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lapTime),
  });
}

// Actualiza un tiempo existente (usado para marcar/desmarcar rapida)
export async function updateLapTime(lapTime: LapTimeDTO): Promise<LapTimeDTO> {
  const res = await fetch(`${BASE_URL}/${lapTime.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lapTime),
  });
  if (!res.ok) throw new Error("Error al actualizar tiempo");
  return await res.json();
}

// Elimina un tiempo por su id
export async function removeLapTime(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar tiempo");
}
