// Layout principal de la aplicacion.
// En Angular esto seria el AppComponent con su <router-outlet>.
// En React Router framework mode, el <Outlet /> es donde se renderizan
// las rutas hijas definidas en routes.ts.
// useNavigation().state indica si hay una navegacion en curso ("loading")

export default function Home() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div>
      <h1>Ludomaniacos {isLoading && <span>Cargando...</span>}</h1>
      <div style={{ opacity: isLoading ? 0.5 : 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
