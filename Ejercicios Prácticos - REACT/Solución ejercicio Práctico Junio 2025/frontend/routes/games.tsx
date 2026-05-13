export async function clientLoader() {
  const [nonDiscounted, discounted] = await Promise.all([
    getGames(false),
    getGames(true),
  ]);
  return { nonDiscounted, discounted };
}

export default function Games() {
  const { nonDiscounted, discounted } = useLoaderData();
  const revalidator = useRevalidator();

  async function handleCreateGame(prevState, formData) {
    const game = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      discount: formData.get("discount") === "on",
    };

    try {
      await createGame(game);
      revalidator.revalidate();

      return null;
    } catch (e) {
      return "Error al registrar el juego";
    }
  }

  const [error, submitAction, isPending] = useActionState(
    handleCreateGame,
    null,
  );

  return (
    <div>
      <h1>Ludomaniacos</h1>

      <form action={submitAction}>
        <label>Nombre:</label>
        <input
          name="name"
          type="text"
          placeholder="Nombre del Juego"
          required
        />
        <br />
        <label>Precio:</label>
        <input
          name="price"
          type="number"
          placeholder="Precio del Juego"
          required
        />
        <br />
        <label>Unidades disponibles:</label>
        <input
          name="stock"
          type="number"
          placeholder="Unidades disponibles del Juego"
          required
        />
        <br />
        <label>En oferta:</label>
        <input name="discount" type="checkbox" />
        <br />
        <button type="submit" disabled={isPending}>
          {isPending ? "Registrando..." : "Registrar nuevo juego"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <ul>
        <span>Juegos</span>
        {nonDiscounted.map((game) => (
          <li key={game.id}>
            <span>
              <Link to={`/game/${game.id}`}>Nombre: {game.name}</Link>
            </span>{" "}
            <span>Precio base: {game.price}</span>
          </li>
        ))}
      </ul>

      <ul>
        <span>Juegos en oferta</span>
        {discounted.map((game) => (
          <li key={game.id}>
            <span>
              <Link to={`/game/${game.id}`}>Nombre: {game.name}</Link>
            </span>{" "}
            <span style={{ textDecoration: "line-through" }}>
              Precio base: {game.price}
            </span>{" "}
            <span>Precio oferta: {game.price * 0.8}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
