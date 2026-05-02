// Layout principal de la aplicacion
// En Angular esto seria el componente raiz con <router-outlet>
// En React Router framework mode, el <Outlet> renderiza la ruta hija activa

export default function Home() {
    return (
        <div>
            {/* Titulo de la aplicacion, siempre visible */}
            <h1>FotosDaw</h1>

            {/* Outlet renderiza el componente de la ruta hija activa
                - Si estamos en "/" -> renderiza AdsList
                - Si estamos en "/ad/3" -> renderiza AdDetail */}
            <Outlet />
        </div>
    );
}
