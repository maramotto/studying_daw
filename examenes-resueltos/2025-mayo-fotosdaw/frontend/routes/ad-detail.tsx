// Pagina de detalle de un anuncio
// Equivale a ad.component.ts + ad.component.html de Angular
//
// Muestra titulo, descripcion, precio y botones de accion:
// - Eliminar Casa: borra el anuncio y vuelve al listado
// - Casa Alquilada: marca como alquilado (solo si no lo esta)
// - Finalizar Alquiler: marca como no alquilado (solo si lo esta)

import type { Route } from "./+types/ad-detail";
import { getAd, removeAd, updateAd } from "../services/ads-service";

// clientLoader carga el anuncio por id antes de renderizar
// El parametro params.id viene de la URL "/ad/:id"
// Equivale al constructor de AdComponent que leia activatedRoute.snapshot.params["id"]
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const ad = await getAd(Number(params.id));
    return { ad };
}

export default function AdDetail({ loaderData }: Route.ComponentProps) {
    const { ad } = loaderData;

    // useNavigate equivale a this.router.navigate de Angular
    const navigate = useNavigate();

    // Elimina el anuncio y navega a la pagina principal
    // Equivale a deleteAd() de AdComponent
    async function handleDelete() {
        await removeAd(ad.id!);
        navigate("/");
    }

    // Marca la casa como alquilada (rented = true)
    // Equivale a rentHouse() de AdComponent
    async function handleRent() {
        await updateAd(ad.id!, ad.title, ad.description, ad.price, true);
        // Recargamos la pagina para refrescar los datos
        // En framework mode, navegar a la misma ruta re-ejecuta el clientLoader
        navigate("/ad/" + ad.id, { replace: true });
    }

    // Finaliza el alquiler (rented = false)
    // Equivale a stopRentHouse() de AdComponent
    async function handleStopRent() {
        await updateAd(ad.id!, ad.title, ad.description, ad.price, false);
        navigate("/ad/" + ad.id, { replace: true });
    }

    return (
        <div>
            {/* Titulo del anuncio */}
            <h1>Anuncio: {ad.title}</h1>

            {/* Datos del anuncio */}
            <ul>
                <li>Descripcion: {ad.description}</li>
                <li>Precio: {ad.price}</li>
            </ul>

            {/* Botones de accion */}
            <div>
                {/* Siempre visible: eliminar */}
                <button onClick={handleDelete}>Eliminar Casa</button>

                {/* Condicional: equivale a *ngIf="!ad.rented" / *ngIf="ad.rented" */}
                {/* Si NO esta alquilada, mostrar boton para alquilar */}
                {!ad.rented && (
                    <button onClick={handleRent}>Casa Alquilada</button>
                )}

                {/* Si ESTA alquilada, mostrar boton para finalizar */}
                {ad.rented && (
                    <button onClick={handleStopRent}>Finalizar Alquiler</button>
                )}
            </div>
        </div>
    );
}
