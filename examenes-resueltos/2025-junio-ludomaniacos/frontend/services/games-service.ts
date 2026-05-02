// Servicio que encapsula todas las llamadas fetch a la API REST.
// Equivalente al GameService de Angular con HttpClient,
// pero aqui usamos fetch nativo y devolvemos Promises (no Observables).

const BASE_URL = "/api/games/";

// Obtener top 10 juegos filtrados por descuento (true/false).
// El backend espera ?discount=true o ?discount=false como query param.
export async function getGames(discount: boolean): Promise<Game[]> {
  const response = await fetch(BASE_URL + "?discount=" + discount);
  return response.json();
}

// Obtener un juego por su id.
export async function getGame(id: number): Promise<Game> {
  const response = await fetch(BASE_URL + id);
  return response.json();
}

// Crear un juego nuevo. POST con body JSON.
export async function createGame(game: Game): Promise<Game> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });
  return response.json();
}

// Actualizar un juego existente. PUT con body JSON.
// Se usa para "Comprar" (stock - 1) y "Poner en oferta" (discount = true).
export async function updateGame(game: Game): Promise<Game> {
  const response = await fetch(BASE_URL + game.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });
  return response.json();
}

// Eliminar un juego por su id.
export async function removeGame(id: number): Promise<Game> {
  const response = await fetch(BASE_URL + id, {
    method: "DELETE",
  });
  return response.json();
}
