import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/home.tsx", [
    index("routes/products-list.tsx"),
    route("product/:id", "routes/product-detail.tsx"),
    route("product/:id/buy", "routes/purchase-page.tsx"),
    route("admin", "routes/admin-page.tsx"),
  ]),
] satisfies RouteConfig;
