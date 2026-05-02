// Pagina principal: formulario de alta + dos listas de anuncios
// Equivale a ads.component.ts + ads.component.html de Angular
//
// En framework mode usamos:
// - clientLoader: carga datos antes de renderizar (equivale a ngOnInit + subscribe)
// - useLoaderData: accede a los datos cargados (equivale a las propiedades del componente)
// - useActionState: maneja el envio del formulario con estado de error

import type { Route } from "./+types/ads-list";
import { getAds, createAd } from "../services/ads-service";

// clientLoader se ejecuta automaticamente al navegar a esta ruta
// Carga las dos listas: disponibles (rented=false) y alquiladas (rented=true)
// Equivale al ngOnInit() que hacia dos subscribe al servicio
export async function clientLoader({}: Route.ClientLoaderArgs) {
    const [adsNotRented, adsRented] = await Promise.all([
        getAds(false),
        getAds(true),
    ]);
    return { adsNotRented, adsRented };
}

export default function AdsList({ loaderData }: Route.ComponentProps) {
    // loaderData contiene lo que devolvio clientLoader
    // Equivale a las propiedades adsNotRented y adsRented del componente Angular
    const { adsNotRented, adsRented } = loaderData;

    // useActionState maneja el formulario: recibe una funcion async que se ejecuta al hacer submit
    // El primer valor (error) es el estado devuelto por la accion (null si todo ok, string si error)
    // El segundo valor (submitAction) es la funcion que se pasa al onSubmit del form
    const [error, submitAction, isPending] = useActionState(
        async (_previousState: string | null, formData: FormData) => {
            // Leemos los campos del formulario
            const title = formData.get("title") as string;
            const description = formData.get("description") as string;
            const price = Number(formData.get("price"));

            try {
                // Intentamos crear el anuncio
                await createAd(title, description, price);
                // Si funciona, recargamos la pagina para refrescar las listas
                // revalidator es automatico en framework mode: al terminar la action,
                // se vuelve a ejecutar el clientLoader
                return null;
            } catch (e) {
                // Si el backend devuelve 409, createAd lanza error
                // Mostramos alerta al usuario como pide el enunciado
                alert("Ya existe un anuncio con el mismo titulo");
                return "duplicate";
            }
        },
        null
    );

    return (
        <div>
            {/* Formulario de alta de anuncio */}
            {/* Equivale al <form> con [(ngModel)] de Angular */}
            {/* En React usamos name en los input y FormData en el submit */}
            <form action={submitAction}>
                <label>Titulo:</label>
                <input name="title" type="text" placeholder="Titulo del Anuncio" />
                <label>Descripcion:</label>
                <input name="description" type="text" placeholder="Descripcion del Anuncio" />
                <label>Precio:</label>
                <input name="price" type="number" placeholder="Precio del Anuncio" />
                <button type="submit" disabled={isPending}>Dar de alta</button>
            </form>

            {/* Lista de casas disponibles (no alquiladas) */}
            {/* Equivale a *ngFor="let ad of adsNotRented" */}
            <ul>
                <span>Casas en alquiler</span>
                {adsNotRented.map((ad: Ad) => (
                    <li key={ad.id}>
                        {/* Link equivale a [routerLink]="['/ad', ad.id]" */}
                        <Link to={"/ad/" + ad.id}>
                            Titulo: {ad.title}, Precio: {ad.price}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Lista de casas alquiladas */}
            <ul>
                <span>Casas alquiladas</span>
                {adsRented.map((ad: Ad) => (
                    <li key={ad.id}>
                        <Link to={"/ad/" + ad.id}>
                            Titulo: {ad.title}, Precio: {ad.price}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
