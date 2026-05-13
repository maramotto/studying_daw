export async function clientLoader({ params }) {
  return await getGame(params.id);
}

export default function GameDetail() {
  const initialGame = useLoaderData();
  const navigate = useNavigate();

  const [game, setGame] = useState(initialGame);
  const [gameNotAvailable, setGameNotAvailable] = useState(false);

  const handleBuy = async () => {
    const updatedGame = { ...game, stock: game.stock - 1 };
    const result = await updateGame(updatedGame);

    if (result.stock === 0) {
      setGameNotAvailable(true);
      setGame(null);
    } else {
      setGame(result);
    }
  };

  const handleOffer = async () => {
    const updatedGame = { ...game, discount: true };
    const result = await updateGame(updatedGame);

    setGame(result);
  };

  const handleDelete = async () => {
    await deleteGame(game.id);

    setGameNotAvailable(true);
    setGame(null);
  };

  if (gameNotAvailable) {
    return (
      <div>
        <h1>Juego no disponible</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>
        Juego: {game.name}{" "}
        {game.stock < 3 && (
          <span style={{ color: "red" }}>Últimas unidades</span>
        )}
      </h1>

      <ul>
        <li>Precio base: {game.price}</li>
        {game.discount && <li>Precio oferta: {game.price * 0.8}</li>}
        <li>Unidades disponibles: {game.stock}</li>
      </ul>

      <div>
        <button onClick={handleBuy}>Comprar</button>
        <button onClick={handleOffer}>Poner en oferta</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>

      <br />
      <button onClick={() => navigate("/")}>Volver al catálogo</button>
    </div>
  );
}
