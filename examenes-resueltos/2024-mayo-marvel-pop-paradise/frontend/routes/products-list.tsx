// Pagina principal: lista de productos disponibles (no vendidos).
// Equivalente al MainComponent de Angular.
//
// clientLoader: carga los datos ANTES de renderizar el componente.
// Es como resolver datos en el ngOnInit() de Angular, pero de forma
// mas declarativa. React Router llama a clientLoader y pasa el resultado
// como prop "loaderData" al componente.
//
// Cada producto muestra:
// - Nombre
// - Precio en rojo si >= 100, en verde si < 100
//   (se usa style={{ color: ... }} que es el equivalente a [style] de Angular)
// - Boton/link "Comprar" que navega a /product/:id/buy

import { getProducts } from "../services/products-service";

// clientLoader se ejecuta en el cliente antes de renderizar.
// Equivale a ngOnInit() + subscribe() en Angular.
export async function clientLoader() {
  const products = await getProducts();
  return { products };
}

export default function ProductsList({ loaderData }: { loaderData: { products: Product[] } }) {
  // loaderData contiene lo que devolvio clientLoader.
  const { products } = loaderData;

  return (
    <div>
      <ul>
        {/* .map() es el equivalente a *ngFor de Angular. */}
        {/* key={p.id} es obligatorio en React para listas. */}
        {products.map((p) => (
          <li key={p.id}>
            <span>Nombre: {p.name}</span>

            {/* style={{ color: ... }} es el equivalente a [style.color] de Angular. */}
            {/* Si precio >= 100 se muestra en rojo, si no en verde. */}
            <span style={{ color: p.price >= 100 ? "red" : "green" }}>
              Precio: {p.price}
            </span>

            {/* Link a la pagina de compra. Equivale a [routerLink]="['/purchase', p.id]". */}
            <a href={"/product/" + p.id + "/buy"}>Comprar</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
