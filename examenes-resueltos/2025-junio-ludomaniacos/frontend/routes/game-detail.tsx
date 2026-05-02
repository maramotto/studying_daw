// Pagina de detalle de un juego.
// Equivalente al GameComponent de Angular.
//
// - clientLoader: carga el juego por id ANTES de renderizar.
// - useNavigate: equivalente a Router.navigate() en Angular.
// - useRevalidator: permite forzar la recarga del clientLoader
//   para actualizar los datos despues de "Comprar" o "Poner en oferta".

import type { Route } from "./+types/game-detail";

// clientLoader recibe params con los parametros de la URL.
// params.id viene de la ruta "game/:id" definida en routes.ts.
// Equivalente a ActivatedRoute.snapshot.params["id"] en Angular.
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const game = await getGame(Number(params.id));
  return { game };
}

export default function GameDetail({ loaderData }: Route.ComponentProps) {
  // Estado local del juego. Se inicializa con lo que trajo el loader.
  const [game, setGame] = useState<Game | null>(loaderData.game);

  // gameNotAvailable: flag para mostrar "Juego no disponible"
  // cuando se elimina o el stock llega a 0.
  const [gameNotAvailable, setGameNotAvailable] = useState(false);

  // useNavigate nos permite navegar programaticamente (como Router.navigate en Angular).
  const navigate = useNavigate();

  // ---- COMPRAR ----
  // Reduce el stock en 1. Si llega a 0, el backend lo borra
  // y mostramos "Juego no disponible".
  async function handleBuy() {
    if (!game) return;

    const updatedGame: Game = { ...game, stock: game.stock - 1 };
    const result = await updateGame(updatedGame);

    if (result.stock === 0) {
      setGameNotAvailable(true);
      setGame(null);
    } else {
      setGame(result);
    }
  }

  // ---- PONER EN OFERTA ----
  // Cambia discount a true y actualiza la vista con la respuesta del backend.
  async function handleOffer() {
    if (!game) return;

    const updatedGame: Game = { ...game, discount: true };
    const result = await updateGame(updatedGame);
    setGame(result);
  }

  // ---- ELIMINAR ----
  // Borra el juego y navega a la pagina principal.
  async function handleDelete() {
    if (!game) return;

    await removeGame(game.id!);
    setGameNotAvailable(true);
    setGame(null);
  }

  // ---- RENDERIZADO CONDICIONAL ----
  // Equivalente a *ngIf en Angular:
  // - Si gameNotAvailable es true, mostramos solo el mensaje.
  // - Si no, mostramos los datos del juego.

  if (gameNotAvailable) {
    return (
      <div>
        <h1>Juego no disponible</h1>
      </div>
    );
  }

  // Mientras carga (game puede ser null brevemente).
  if (!game) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>
        Juego: {game.name}{" "}
        {/* Si el stock es menor que 3, mostramos aviso en rojo. */}
        {/* Esto es renderizado condicional: {condicion && <elemento>} */}
        {/* Equivalente a *ngIf="game.stock < 3" en Angular. */}
        {game.stock < 3 && <span style={{ color: "red" }}>Ultimas unidades</span>}
      </h1>

      <ul>
        <li>Precio base: {game.price}</li>
        {/* Solo mostramos precio oferta si discount es true. */}
        {game.discount && <li>Precio oferta: {game.price * 0.8}</li>}
        <li>Unidades disponibles: {game.stock}</li>
      </ul>

      <div>
        {/* Equivalente a (click)="buyGame()" en Angular. */}
        <button onClick={handleBuy}>Comprar</button>
        <button onClick={handleOffer}>Poner en oferta</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
}
