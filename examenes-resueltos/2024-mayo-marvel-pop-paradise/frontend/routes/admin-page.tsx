// Pagina de administracion: lista de productos vendidos pendientes de envio.
// Equivalente al AdminComponent de Angular.
//
// clientLoader: carga los productos a enviar antes de renderizar.
// Al pulsar "Enviado" en un producto:
//   1. Llama a sendProduct(id) en el backend.
//   2. Recarga la lista para que el producto desaparezca.
//
// En Angular esto se hacia con subscribe() + this.loadOrders().
// En React usamos useState + useEffect o clientLoader + revalidation.
// Aqui usamos useState para poder recargar la lista tras cada accion.

import { getProductsToSend, sendProduct } from "../services/products-service";

export default function AdminPage() {
  // useState guarda la lista de productos a enviar.
  const [products, setProducts] = useState<Product[]>([]);

  // Funcion para cargar/recargar la lista del backend.
  async function loadProducts() {
    const data = await getProductsToSend();
    setProducts(data);
  }

  // useEffect con [] se ejecuta una sola vez al montar el componente.
  // Equivale a ngOnInit() en Angular.
  useEffect(() => {
    loadProducts();
  }, []);

  // Al pulsar "Enviado": marca como enviado y recarga la lista.
  // Equivale al metodo sendProduct() del AdminComponent de Angular,
  // que llamaba a updateProduct() y luego a loadOrders().
  async function handleSend(id: number) {
    await sendProduct(id);
    // Recarga la lista: el producto enviado ya no aparecera.
    loadProducts();
  }

  return (
    <div>
      <h2>Productos a enviar</h2>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <span>Nombre: {p.name}</span>,
            <span>Direccion: {p.address}</span>

            {/* Al pulsar "Enviado" se llama a handleSend con el id del producto. */}
            <button onClick={() => handleSend(p.id!)}>Enviado</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
