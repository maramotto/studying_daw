// Interfaz que representa un anuncio de alquiler
// Coincide con el AdDTO del backend
export default interface Ad {
    id?: number;
    title: string;
    description: string;
    price: number;
    rented: boolean;
}
