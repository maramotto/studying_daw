// Imports

export default [
  layout("routes/home.tsx", [
    index("routes/deliveries-list.tsx"),
    route("delivery/:id", "routes/delivery-detail.tsx"),
  ]),
] satisfies RouteConfig;
