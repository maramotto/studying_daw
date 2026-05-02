// Detalle de un producto (ruta product/:id)
// Equivalente Angular: product.component.ts + product.component.html

import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/product-detail";
import { getProduct, sendProduct } from "~/services/products-service";
import { useUserStore } from "~/stores/user-store";

// Carga el producto por id antes de renderizar
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await getProduct(params.id!);
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  const product = loaderData;
  const navigate = useNavigate();
  let { user } = useUserStore();

  // Funcion para marcar como enviado (solo ADMIN)
  async function handleSend() {
    await sendProduct(product.id);
    navigate("/");
  }

  return (
    <>
      <h2>{product.name}</h2>

      {/* Precio con color */}
      <p style={{ color: product.price >= 100 ? "red" : "green" }}>
        Precio: {product.price}
      </p>

      {/* Estado del producto */}
      {product.sold && <p>Vendido</p>}
      {product.sent && <p>Enviado</p>}

      {/* Boton Comprar: solo CLIENT y si no esta vendido */}
      {user && user.roles.includes("CLIENT") && !product.sold && (
        <Link to={`/product/${product.id}/buy`}>Comprar</Link>
      )}

      {/* Boton Enviado: solo ADMIN, solo si vendido y no enviado */}
      {user && user.roles.includes("ADMIN") && product.sold && !product.sent && (
        <button onClick={handleSend}>Enviado</button>
      )}

      <br />
      <Link to="/">Volver</Link>
    </>
  );
}
