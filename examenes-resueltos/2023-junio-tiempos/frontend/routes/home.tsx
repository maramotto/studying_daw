// Layout principal de la aplicacion.
// En Angular esto seria el AppComponent con su <router-outlet>.
// En React Router framework mode, el <Outlet /> es donde se renderizan
// las rutas hijas definidas en routes.ts.
//
// Este examen solo tiene una pagina, pero mantenemos el layout
// para seguir el patron consistente de todos los examenes.

export default function Home() {
  return (
    <div>
      <h1>Las 33 primeras vueltas de Alonso</h1>
      <Outlet />
    </div>
  );
}
