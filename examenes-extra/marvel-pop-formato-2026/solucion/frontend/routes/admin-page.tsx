// Pagina de administracion (ruta /admin) — solo ADMIN
// Lista productos vendidos pendientes de envio
// Equivalente Angular: admin.component.ts + admin.component.html

import type { Route } from "./+types/admin-page";
import { getProductsToSend, sendProduct } from "~/services/products-service";
import { useRevalidator } from "react-router";

// Carga productos vendidos no enviados antes de renderizar
export async function clientLoader({}: Route.ClientLoaderArgs) {
  return await getProductsToSend();
}

export default function AdminPage({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  // useRevalidator permite recargar los datos del clientLoader
  // (equivale a volver a llamar a loadOrders() en Angular)
  const revalidator = useRevalidator();

  async function handleSend(productId: number) {
    await sendProduct(productId);
    // Recarga la lista tras marcar como enviado
    revalidator.revalidate();
  }

  return (
    <>
      <h2>Productos pendientes de envio</h2>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>Nombre: {product.name}</span>,{" "}
            <span>Direccion: {product.address}</span>

            <button onClick={() => handleSend(product.id)}>Enviado</button>
          </li>
        ))}
      </ul>
    </>
  );
}
