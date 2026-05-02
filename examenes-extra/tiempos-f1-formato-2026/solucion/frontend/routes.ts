import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // layout envuelve todas las rutas con el componente home (cabecera + Outlet)
  layout("routes/home.tsx", [
    // index = ruta por defecto "/" → lista de tiempos
    index("routes/laptimes-list.tsx"),
    // ruta de detalle con parametro :id
    route("laptime/:id", "routes/laptime-detail.tsx"),
  ]),
] satisfies RouteConfig;
