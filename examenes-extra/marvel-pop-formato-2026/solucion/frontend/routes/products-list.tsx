// Listado de productos disponibles (ruta index = pagina principal)
// Equivalente Angular: products.component.ts + products.component.html

import { Link } from "react-router";
import type { Route } from "./+types/products-list";
import { getAvailableProducts } from "~/services/products-service";

// clientLoader se ejecuta antes de renderizar (como ngOnInit + subscribe)
export async function clientLoader({}: Route.ClientLoaderArgs) {
  return await getAvailableProducts();
}

export default function ProductsList({ loaderData }: Route.ComponentProps) {
  // loaderData contiene lo que devolvio clientLoader
  const products = loaderData;

  return (
    <>
      <h2>Productos disponibles</h2>

      <ul>
        {/* .map() equivale a *ngFor en Angular */}
        {products.map((product) => (
          <li key={product.id}>
            {/* Link equivale a [routerLink] en Angular */}
            <Link to={`/product/${product.id}`}>{product.name}</Link>

            {/* Color del precio: rojo si >= 100, verde si < 100 */}
            <span style={{ color: product.price >= 100 ? "red" : "green" }}>
              {" "}Precio: {product.price}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
