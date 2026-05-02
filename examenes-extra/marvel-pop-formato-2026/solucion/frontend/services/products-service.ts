const API_URL = "/api/products";

// Obtener productos disponibles (sold=false, ordenados por precio DESC)
export async function getAvailableProducts(): Promise<Product[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return await res.json();
}

// Obtener un producto por id
export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return await res.json();
}

// Obtener productos vendidos pendientes de envio (para admin)
export async function getProductsToSend(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/to-send`);
  if (!res.ok) throw new Error("Error al obtener productos a enviar");
  return await res.json();
}

// Comprar un producto: envia la direccion
export async function buyProduct(id: string, address: string): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}/buy`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: address }),
  });
  if (!res.ok) throw new Error("Error al comprar el producto");
  return await res.json();
}

// Marcar un producto como enviado
export async function sendProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}/send`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Error al enviar el producto");
  return await res.json();
}
