export async function clientLoader({ params }) {
  return await getAd(params.id);
}

export default function AdDetail() {
  const initialAd = useLoaderData();
  const navigate = useNavigate();
  const [ad, setAd] = useState(initialAd);

  const handleDelete = async () => {
    await deleteAd(ad.id);
    navigate("/");
  };

  const handleRent = async () => {
    const updatedAd = { ...ad, rented: true };
    const result = await updateAd(updatedAd);

    setAd(result);
  };

  const handleStopRent = async () => {
    const updatedAd = { ...ad, rented: false };
    const result = await updateAd(updatedAd);

    setAd(result);
  };

  return (
    <div>
      <h1>Anuncio: {ad.title}</h1>

      <ul>
        <li>Descripción: {ad.description}</li>
        <li>Precio: {ad.price}</li>
      </ul>

      <div>
        <button onClick={handleDelete}>Eliminar Casa</button>
        {!ad.rented && <button onClick={handleRent}>Casa Alquilada</button>}
        {ad.rented && (
          <button onClick={handleStopRent}>Finalizar Alquiler</button>
        )}
      </div>

      <br />
      <button onClick={() => navigate("/")}>Volver al listado</button>
    </div>
  );
}
