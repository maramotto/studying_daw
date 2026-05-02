// Servicio que encapsula todas las llamadas fetch a la API REST.
// Equivalente al TimesService de Angular con HttpClient,
// pero aqui usamos fetch nativo y devolvemos Promises (no Observables).

const BASE_URL = "/api/times/";

// Obtener todos los tiempos ordenados por vuelta ASC.
export async function getTimes(): Promise<Time[]> {
  const response = await fetch(BASE_URL);
  return response.json();
}

// Crear un nuevo tiempo. Devuelve la response completa
// para poder comprobar si fue 409 (vuelta duplicada).
export async function createTime(
  numLap: number,
  lapTime: string
): Promise<Response> {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ numLap, lapTime }),
  });
}

// Eliminar un tiempo por su id.
export async function removeTime(id: number): Promise<Response> {
  return fetch(BASE_URL + id, {
    method: "DELETE",
  });
}
