// Servicio que encapsula todas las llamadas fetch a la API REST.
// Equivalente al ProductsService de Angular con HttpClient,
// pero aqui usamos fetch nativo y devolvemos Promises (no Observables).

const BASE_URL = "/api/products";

// Obtener todos los productos no vendidos (pagina principal).
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Error al obtener productos");
  return response.json();
}

// Comprar un producto: marca sold=true y guarda la direccion.
// Equivale a un PUT con el address en el body.
export async function buyProduct(id: number, address: string): Promise<Product> {
  const response = await fetch(BASE_URL + "/" + id + "/buy", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: address }),
  });
  if (!response.ok) throw new Error("Error al comprar producto");
  return response.json();
}

// Obtener productos vendidos pendientes de envio (pagina admin).
export async function getProductsToSend(): Promise<Product[]> {
  const response = await fetch(BASE_URL + "/to-send");
  if (!response.ok) throw new Error("Error al obtener productos a enviar");
  return response.json();
}

// Marcar un producto como enviado (solo admin).
export async function sendProduct(id: number): Promise<Product> {
  const response = await fetch(BASE_URL + "/" + id + "/send", {
    method: "PUT",
  });
  if (!response.ok) throw new Error("Error al enviar producto");
  return response.json();
}
