export interface Product {
  id?: number;
  name: string;
  price: number;
  address: string;
  status: string; // FOR_SALE, SOLD, SENT
}