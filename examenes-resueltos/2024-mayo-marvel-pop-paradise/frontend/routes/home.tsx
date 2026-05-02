// Layout principal de la aplicacion.
// En Angular esto seria el AppComponent con su <router-outlet>.
// En React Router framework mode, el <Outlet /> es donde se renderizan
// las rutas hijas definidas en routes.ts.
//
// Muestra el titulo "Marvel Pop Paradise" en todas las paginas.
// Si el usuario es admin, muestra un enlace a la pagina de admin.
// (En un examen real, el rol vendria del backend via sesion/cookie;
// aqui lo simplificamos asumiendo que existe una funcion isAdmin().)

export default function Home() {
  return (
    <div>
      <h1>Marvel Pop Paradise</h1>
      <a href="/admin">Enviar Productos</a>
      <Outlet />
    </div>
  );
}
