// Interfaz TypeScript que refleja el ProductDTO del backend.
// Coincide campo a campo con el record Java.
export interface Product {
  id?: number;
  name: string;
  price: number;
  sold: boolean;
  address: string;
  sent: boolean;
}
