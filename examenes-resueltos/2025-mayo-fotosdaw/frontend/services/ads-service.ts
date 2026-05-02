// Servicio que encapsula todas las llamadas a la API REST de anuncios
// Equivale al @Injectable AdService de Angular, pero aqui son funciones sueltas

const BASE_URL = "/api/ads/";

// Obtiene la lista de anuncios filtrada por estado de alquiler
// rented=false -> casas disponibles, rented=true -> casas alquiladas
export async function getAds(rented: boolean): Promise<Ad[]> {
    const res = await fetch(BASE_URL + "?rented=" + rented);
    return res.json();
}

// Obtiene un anuncio por su id
export async function getAd(id: number): Promise<Ad> {
    const res = await fetch(BASE_URL + id);
    return res.json();
}

// Crea un anuncio nuevo. Lanza error si el backend devuelve error (ej: duplicado 409)
export async function createAd(title: string, description: string, price: number): Promise<Ad> {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, price, rented: false })
    });

    // Si el backend responde con error (409 = duplicado), lanzamos excepcion
    if (!res.ok) {
        throw new Error("Error al crear anuncio");
    }

    return res.json();
}

// Actualiza un anuncio existente (PUT completo)
// Se usa para cambiar el estado de alquiler (rented true/false)
export async function updateAd(id: number, title: string, description: string, price: number, rented: boolean): Promise<Ad> {
    const res = await fetch(BASE_URL + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, description, price, rented })
    });
    return res.json();
}

// Elimina un anuncio por su id
export async function removeAd(id: number): Promise<Ad> {
    const res = await fetch(BASE_URL + id, {
        method: "DELETE"
    });
    return res.json();
}
