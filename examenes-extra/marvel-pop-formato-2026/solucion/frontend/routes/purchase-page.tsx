// Formulario de compra (ruta product/:id/buy) — solo CLIENT
// Equivalente Angular: purchase.component.ts + purchase.component.html

import { useNavigate } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/purchase-page";
import { buyProduct } from "~/services/products-service";

export default function PurchasePage({ params }: Route.ComponentProps) {
  // Estado local para el campo de direccion (equivale a [(ngModel)])
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // Manejar el envio del formulario
  async function handleSubmit(e: React.FormEvent) {
    // Evitar recarga de pagina (comportamiento por defecto del form)
    e.preventDefault();

    // Llamar al endpoint PUT /api/products/{id}/buy con la direccion
    await buyProduct(params.id!, address);

    // Navegar a la pagina principal (equivale a this.router.navigate(['/']))
    navigate("/");
  }

  return (
    <>
      <h2>Realizar compra</h2>

      <form onSubmit={handleSubmit}>
        <label>Direccion de envio: </label>
        {/* value + onChange = formulario controlado (equivale a [(ngModel)]) */}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Direccion"
        />

        <button type="submit">Confirmar</button>
      </form>
    </>
  );
}
