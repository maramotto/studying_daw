// Pagina de compra: formulario para introducir la direccion de envio.
// Equivalente al PurchaseComponent de Angular.
//
// - useParams() obtiene el :id de la URL (como ActivatedRoute.snapshot.params en Angular).
// - useState() guarda el valor del input de direccion (como [(ngModel)] en Angular).
// - useNavigate() permite redirigir al usuario (como Router.navigate() en Angular).
// - Al confirmar: llama a buyProduct(id, address) y redirige a la pagina principal.

import { buyProduct } from "../services/products-service";

export default function PurchasePage() {
  // useParams() extrae parametros de la URL. Equivale a ActivatedRoute en Angular.
  const { id } = useParams();

  // useState para el campo de direccion. Equivale a [(ngModel)]="address" en Angular.
  // address = valor actual, setAddress = funcion para actualizarlo.
  const [address, setAddress] = useState("");

  // useNavigate devuelve una funcion para navegar programaticamente.
  // Equivale a Router.navigate() en Angular.
  const navigate = useNavigate();

  // Funcion que se ejecuta al pulsar "Confirmar".
  // Equivale al metodo makeAPurchase() del PurchaseComponent de Angular.
  async function handleConfirm() {
    await buyProduct(Number(id), address);
    // Redirige a la pagina principal tras la compra.
    navigate("/");
  }

  return (
    <div>
      <h2>Realizar compra</h2>

      <div>
        <label>Direccion de envio: </label>
        {/* Input controlado: value + onChange es el equivalente a [(ngModel)] en Angular. */}
        {/* Cada vez que el usuario escribe, se actualiza el estado "address". */}
        <input
          type="text"
          placeholder="Direccion"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Al pulsar el boton se ejecuta handleConfirm. */}
      {/* (click)="makeAPurchase()" en Angular => onClick={handleConfirm} en React. */}
      <button onClick={handleConfirm}>Confirmar</button>
    </div>
  );
}
