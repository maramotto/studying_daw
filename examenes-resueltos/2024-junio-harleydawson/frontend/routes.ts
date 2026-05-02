// Definicion de rutas (React Router 7 framework mode)
// Solo hay una ruta: la pagina principal con todo (formulario + listas)

import type { RouteConfig } from "@react-router/dev/routes";
import { route, layout } from "@react-router/dev/routes";

export default [
    layout("routes/home.tsx", [
        route("/", "routes/deliveries-list.tsx"),
    ]),
] satisfies RouteConfig;
