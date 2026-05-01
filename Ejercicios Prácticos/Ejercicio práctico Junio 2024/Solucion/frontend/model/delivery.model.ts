export class Product {
  id?: number;
  license: string;
  model: string;
  color: string;
  cylinder: number;
  clientAddress: string;
  clientName: string;
  status: string; // DELIVERY_PENDING, DELIVERY_FINISHED

  constructor() {
    this.license = "";
    this.model = "";
    this.color = "";
    this.cylinder = 0;
    this.clientAddress = "";
    this.clientName = "";
    this.status = "DELIVERY_PENDING";
  }
}