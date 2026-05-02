// Interfaz que representa una entrega de moto
export default interface Delivery {
    id?: number;
    plate: string;
    model: string;
    color: string;
    displacement: number;
    address: string;
    clientName: string;
    status: string; // PENDING, CANCELLED, FINALIZED
}
