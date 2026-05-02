// Fichero de rutas en framework mode de React Router 7
// layout envuelve todas las rutas hijas con el componente home (cabecera + Outlet)
// index es la ruta por defecto ("/") -> listado de cursos
// route con :id es la ruta de detalle ("/course/5")

import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/home.tsx", [
        index("routes/courses-list.tsx"),
        route("course/:id", "routes/course-detail.tsx"),
    ]),
] satisfies RouteConfig;
