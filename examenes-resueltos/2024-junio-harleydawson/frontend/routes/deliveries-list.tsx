// Pagina principal: formulario de alta + lista pendientes + lista finalizadas
// Todo en un solo componente porque el examen no pide pagina de detalle

import type { Route } from "./+types/deliveries-list";
import {
    getDeliveries,
    createDelivery,
    updateDelivery,
    removeDelivery,
} from "../services/deliveries-service";

// clientLoader: carga las dos listas (pendientes y finalizadas) antes de pintar
export async function clientLoader() {
    const pending = await getDeliveries("PENDING");
    const finalized = await getDeliveries("FINALIZED");
    return { pending, finalized };
}

// clientAction: maneja las acciones del formulario y los botones
export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    if (intent === "create") {
        // Crear nueva entrega
        const delivery = {
            plate: formData.get("plate") as string,
            model: formData.get("model") as string,
            color: formData.get("color") as string,
            displacement: Number(formData.get("displacement")),
            address: formData.get("address") as string,
            clientName: formData.get("clientName") as string,
            status: "PENDING",
        };

        try {
            await createDelivery(delivery);
        } catch {
            // Si el backend devuelve 409 (matricula duplicada), mostramos alerta
            alert("Moto pendiente de envio");
        }
    }

    if (intent === "finalize") {
        // Marcar entrega como finalizada
        const id = Number(formData.get("id"));
        await updateDelivery(id, {
            plate: "",
            model: "",
            color: "",
            displacement: 0,
            address: "",
            clientName: "",
            status: "FINALIZED",
        });
    }

    if (intent === "cancel") {
        // Cancelar entrega (eliminar)
        const id = Number(formData.get("id"));
        await removeDelivery(id);
    }

    // Devolvemos null; React Router recargara el loader automaticamente
    return null;
}

export default function DeliveriesList({
    loaderData,
}: Route.ComponentProps) {
    // Datos cargados por el clientLoader
    const { pending, finalized } = loaderData;

    return (
        <div>
            {/* -------- FORMULARIO DE ALTA -------- */}
            <h2>Nueva entrega</h2>

            <Form method="post">
                {/* Campo oculto para saber que accion ejecutar */}
                <input type="hidden" name="intent" value="create" />

                <div>
                    <label>Matricula: </label>
                    <input name="plate" placeholder="Matricula" />
                </div>
                <div>
                    <label>Modelo: </label>
                    <input name="model" placeholder="Modelo" />
                </div>
                <div>
                    <label>Color: </label>
                    <input name="color" placeholder="Color" />
                </div>
                <div>
                    <label>Cilindrada: </label>
                    <input name="displacement" type="number" placeholder="Cilindrada" />
                </div>
                <div>
                    <label>Direccion de envio: </label>
                    <input name="address" placeholder="Direccion de envio" />
                </div>
                <div>
                    <label>Nombre cliente: </label>
                    <input name="clientName" placeholder="Nombre cliente" />
                </div>

                <button type="submit">Dar de alta</button>
            </Form>

            {/* -------- LISTA DE ENTREGAS PENDIENTES -------- */}
            <h2>Entregas pendientes</h2>

            <ul>
                {pending.map((d: Delivery) => (
                    <li key={d.id}>
                        Matricula: {d.plate},
                        Modelo: {d.model},
                        Color: {d.color},
                        Cilindrada: {d.displacement},
                        Direccion: {d.address},
                        Cliente: {d.clientName}

                        {/* Boton cancelar: elimina la entrega */}
                        <Form method="post">
                            <input type="hidden" name="intent" value="cancel" />
                            <input type="hidden" name="id" value={d.id} />
                            <button type="submit">Cancelar Entrega</button>
                        </Form>

                        {/* Boton finalizar: cambia estado a FINALIZED */}
                        <Form method="post">
                            <input type="hidden" name="intent" value="finalize" />
                            <input type="hidden" name="id" value={d.id} />
                            <button type="submit">Entrega Finalizada</button>
                        </Form>
                    </li>
                ))}
            </ul>

            {/* -------- LISTA DE ENTREGAS FINALIZADAS -------- */}
            <h2>Entregas finalizadas</h2>

            <ul>
                {finalized.map((d: Delivery) => (
                    <li key={d.id}>
                        Matricula: {d.plate},
                        Modelo: {d.model},
                        Color: {d.color},
                        Cilindrada: {d.displacement},
                        Direccion: {d.address},
                        Cliente: {d.clientName}
                    </li>
                ))}
            </ul>
        </div>
    );
}
