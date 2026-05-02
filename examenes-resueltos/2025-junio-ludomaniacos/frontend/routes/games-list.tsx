// Pagina principal: formulario de creacion + dos listas de juegos.
// Equivalente al GamesComponent de Angular.
//
// En framework mode usamos:
// - clientLoader: funcion que se ejecuta ANTES de renderizar la ruta.
//   Equivalente a ngOnInit + las llamadas al servicio en Angular.
// - Route.ComponentProps: tipo que inyecta automaticamente los datos
//   devueltos por clientLoader como prop "loaderData".

import type { Route } from "./+types/games-list";

// clientLoader se ejecuta en el navegador antes de pintar el componente.
// Aqui cargamos las dos listas: juegos sin oferta y juegos con oferta.
export async function clientLoader({}: Route.ClientLoaderArgs) {
  const [nonDiscountedGames, discountedGames] = await Promise.all([
    getGames(false),
    getGames(true),
  ]);
  return { nonDiscountedGames, discountedGames };
}

export default function GamesList({ loaderData }: Route.ComponentProps) {
  // loaderData contiene lo que devolvio clientLoader.
  // useState nos permite tener una copia local que podemos actualizar
  // cuando el usuario crea un juego nuevo (sin recargar la pagina).
  const [nonDiscountedGames, setNonDiscountedGames] = useState<Game[]>(
    loaderData.nonDiscountedGames
  );
  const [discountedGames, setDiscountedGames] = useState<Game[]>(
    loaderData.discountedGames
  );

  // Estado del formulario: cada campo del formulario se guarda aqui.
  // Equivalente a [(ngModel)] en Angular.
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(false);

  // Funcion que se ejecuta al pulsar "Registrar nuevo juego".
  // Crea el juego en el backend y recarga ambas listas.
  async function handleCreateGame() {
    await createGame({ name, price, stock, discount });

    // Recargamos las listas para reflejar el nuevo juego.
    const [updatedNonDiscounted, updatedDiscounted] = await Promise.all([
      getGames(false),
      getGames(true),
    ]);
    setNonDiscountedGames(updatedNonDiscounted);
    setDiscountedGames(updatedDiscounted);

    // Limpiamos el formulario.
    setName("");
    setPrice(0);
    setStock(0);
    setDiscount(false);
  }

  return (
    <div>
      {/* ---- FORMULARIO DE CREACION ---- */}
      {/* Equivalente al <form> con [(ngModel)] de Angular. */}
      {/* Cada input tiene value (dato mostrado) y onChange (actualiza el estado). */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateGame();
        }}
      >
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Nombre del Juego"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Precio:</label>
        <input
          type="number"
          placeholder="Precio del Juego"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <label>Unidades disponibles:</label>
        <input
          type="number"
          placeholder="Unidades disponibles del Juego"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />

        <label>En oferta:</label>
        <input
          type="checkbox"
          checked={discount}
          onChange={(e) => setDiscount(e.target.checked)}
        />

        <button type="submit">Registrar nuevo juego</button>
      </form>

      {/* ---- LISTA DE JUEGOS SIN OFERTA ---- */}
      {/* Equivalente a *ngFor="let game of nonDiscountedGames" en Angular. */}
      {/* En React usamos .map() para convertir un array en elementos JSX. */}
      {/* key={game.id} es obligatorio para que React identifique cada elemento. */}
      <ul>
        <span>Juegos</span>
        {nonDiscountedGames.map((game) => (
          <li key={game.id}>
            <span>
              <Link to={"/game/" + game.id}>Nombre: {game.name}</Link>
            </span>
            <span> Precio base: {game.price}</span>
          </li>
        ))}
      </ul>

      {/* ---- LISTA DE JUEGOS EN OFERTA ---- */}
      {/* El precio base aparece tachado (line-through) y se muestra */}
      {/* el precio con descuento del 20% (price * 0.8). */}
      <ul>
        <span>Juegos en oferta</span>
        {discountedGames.map((game) => (
          <li key={game.id}>
            <span>
              <Link to={"/game/" + game.id}>Nombre: {game.name}</Link>
            </span>
            <span style={{ textDecoration: "line-through" }}>
              {" "}
              Precio base: {game.price}
            </span>
            <span> Precio oferta: {game.price * 0.8}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
