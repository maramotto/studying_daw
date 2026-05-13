export default [
    index("routes/ads.tsx"),
    route("ad/:id", "routes/ad-detail.tsx"),
] satisfies RouteConfig;
