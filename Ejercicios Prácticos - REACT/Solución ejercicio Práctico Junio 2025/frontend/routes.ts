export default [
    index("routes/games.tsx"),
    route("game/:id", "routes/game-detail.tsx"),
] satisfies RouteConfig;
