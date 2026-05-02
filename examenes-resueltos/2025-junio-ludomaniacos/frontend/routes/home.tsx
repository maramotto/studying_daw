// Layout principal de la aplicacion.
// En Angular esto seria el AppComponent con su <router-outlet>.
// En React Router framework mode, el <Outlet /> es donde se renderizan
// las rutas hijas definidas en routes.ts.

export default function Home() {
  return (
    <div>
      <h1>Ludomaniacos</h1>
      <Outlet />
    </div>
  );
}
