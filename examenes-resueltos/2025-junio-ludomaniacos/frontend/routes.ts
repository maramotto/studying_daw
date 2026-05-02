// Configuracion de rutas en React Router "framework mode".
// Equivalente al app.routing.ts de Angular.
//
// - layout: componente que envuelve a las rutas hijas (como el AppComponent de Angular).
// - index: ruta por defecto cuando la URL coincide con la raiz del layout.
// - route("game/:id", ...): ruta con parametro dinamico, equivalente a { path: 'game/:id', component: ... }.

import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

export default [
  layout("routes/home.tsx", [
    index("routes/games-list.tsx"),
    route("game/:id", "routes/game-detail.tsx"),
  ]),
] satisfies RouteConfig;
