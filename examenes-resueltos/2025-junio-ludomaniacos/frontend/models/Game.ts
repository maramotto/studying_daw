// Interfaz TypeScript que refleja el GameDTO del backend.
// Coincide campo a campo con el record Java.
export interface Game {
  id?: number;
  name: string;
  price: number;
  stock: number;
  discount: boolean;
}
