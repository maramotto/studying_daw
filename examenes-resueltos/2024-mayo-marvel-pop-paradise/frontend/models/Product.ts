// Interfaz TypeScript que refleja el ProductDTO del backend.
// Coincide campo a campo con el record Java.
export default interface Product {
  id?: number;
  name: string;
  price: number;
  sold: boolean;
  address: string;
  sent: boolean;
}
