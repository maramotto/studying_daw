// Interfaz que representa un anuncio de alquiler
// Coincide con el AdDTO del backend
export interface Ad {
    id?: number;
    title: string;
    description: string;
    price: number;
    rented: boolean;
}
