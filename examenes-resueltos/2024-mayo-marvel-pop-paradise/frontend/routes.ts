// Configuracion de rutas en React Router "framework mode".
// Equivalente al app.routing.ts de Angular.
//
// - layout: componente que envuelve a las rutas hijas (como el AppComponent de Angular).
// - index: ruta por defecto (pagina principal con lista de productos).
// - route("product/:id/buy", ...): pagina de compra con id del producto.
// - route("admin", ...): pagina de administracion para marcar envios.

import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

export default [
  layout("routes/home.tsx", [
    index("routes/products-list.tsx"),
    route("product/:id/buy", "routes/purchase-page.tsx"),
    route("admin", "routes/admin-page.tsx"),
  ]),
] satisfies RouteConfig;
