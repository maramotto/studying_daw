// Configuracion de rutas en React Router "framework mode".
// Equivalente al app.routing.ts de Angular.
//
// Este examen es muy sencillo: solo hay UNA pagina (la lista de tiempos).
// - layout: componente que envuelve a las rutas hijas (titulo + Outlet).
// - index: ruta por defecto, la unica pagina que hay.

import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("routes/home.tsx", [
    index("routes/times-list.tsx"),
  ]),
] satisfies RouteConfig;
