// Layout principal: muestra el titulo de la app y renderiza la ruta hija con <Outlet>
// useNavigation().state indica si hay una navegacion en curso ("loading")

export default function Home() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <h1>AlonsoDAW - Las vueltas de Fernando {isLoading && <span>Cargando...</span>}</h1>
      <div style={{ opacity: isLoading ? 0.5 : 1 }}>
        <Outlet />
      </div>
    </>
  );
}
