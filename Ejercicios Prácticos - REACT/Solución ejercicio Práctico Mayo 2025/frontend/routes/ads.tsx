export async function clientLoader() {
  const [notRented, rented] = await Promise.all([getAds(false), getAds(true)]);
  return { notRented, rented };
}

export default function Ads() {
  const { notRented, rented } = useLoaderData();
  const revalidator = useRevalidator();

  const [newAd, setNewAd] = useState({
    title: "",
    description: "",
    price: 0,
    rented: false,
  });

  const handleCreateAd = async (e) => {
    e.preventDefault();

    try {
      await createAd(newAd);

      setNewAd({ title: "", description: "", price: 0, rented: false });
      revalidator.revalidate();
    } catch (error) {
      alert("Ya existe un anuncio con el mismo título");
    }
  };

  return (
    <div>
      <h1>FotosDaw</h1>

      <form onSubmit={handleCreateAd}>
        <label>Título:</label>
        <input
          value={newAd.title}
          onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
          type="text"
          placeholder="Título del Anuncio"
        />
        <br />
        <label>Descripción:</label>
        <input
          value={newAd.description}
          onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
          type="text"
          placeholder="Descripción del Anuncio"
        />
        <br />
        <label>Precio:</label>
        <input
          value={newAd.price}
          onChange={(e) =>
            setNewAd({ ...newAd, price: Number(e.target.value) })
          }
          type="number"
          placeholder="Precio del Anuncio"
        />
        <br />
        <button type="submit">Dar de alta</button>
      </form>

      <ul>
        <span>Casas en alquiler</span>
        {notRented.map((ad) => (
          <li key={ad.id}>
            <Link to={`/ad/${ad.id}`}>
              Titulo: {ad.title}, Precio: {ad.price}
            </Link>
          </li>
        ))}
      </ul>

      <ul>
        <span>Casas alquiladas</span>
        {rented.map((ad) => (
          <li key={ad.id}>
            <Link to={`/ad/${ad.id}`}>
              Titulo: {ad.title}, Precio: {ad.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
