// Layout principal: titulo + enlace admin + Outlet para rutas hijas
// Equivalente Angular: app.component.html con <router-outlet>
// useNavigation().state indica si hay una navegacion en curso ("loading")

import { Outlet, Link, useNavigation } from "react-router";
import { useUserStore } from "~/stores/user-store";

export default function Home() {
  // Obtenemos el usuario del store global (Zustand) para saber su rol
  let { user } = useUserStore();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <h1>Marvel Pop Paradise {isLoading && <span>Cargando...</span>}</h1>

      {/* Solo ADMIN ve el enlace a la pagina de administracion */}
      {user && user.roles.includes("ADMIN") && (
        <Link to="/admin">Gestionar envios</Link>
      )}

      {/* Outlet renderiza la ruta hija activa (equivale a <router-outlet>) */}
      <div style={{ opacity: isLoading ? 0.5 : 1 }}>
        <Outlet />
      </div>
    </>
  );
}
