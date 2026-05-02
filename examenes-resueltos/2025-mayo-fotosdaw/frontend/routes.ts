// Fichero de rutas en framework mode de React Router 7
// Equivale al app.routing.ts de Angular
// Define la estructura de navegacion: layout padre con dos rutas hijas

import { type RouteConfig } from "@react-router/dev/routes";
import { route, layout, index } from "@react-router/dev/routes";

export default [
    // Layout padre: contiene el titulo "FotosDaw" y el <Outlet> donde se renderizan las hijas
    layout("routes/home.tsx", [
        // Ruta raiz "/" -> lista de anuncios (equivale a path: '' redirectTo: 'ads')
        index("routes/ads-list.tsx"),
        // Ruta "/ad/:id" -> detalle de un anuncio
        route("ad/:id", "routes/ad-detail.tsx"),
    ]),
] satisfies RouteConfig;
