const BASE_URL = "/api/games";

export async function getGames(discount: boolean): Promise<GameDTO[]> {
  const response = await fetch(`${BASE_URL}/?discount=${discount}`);
  return response.json();
}

export async function getGame(id: string): Promise<GameDTO> {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
}

export async function createGame(game: GameDTO): Promise<GameDTO> {
  const response = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });
  return response.json();
}

export async function updateGame(game: GameDTO): Promise<GameDTO> {
  const response = await fetch(`${BASE_URL}/${game.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });
  return response.json();
}

export async function deleteGame(id: number): Promise<void> {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
