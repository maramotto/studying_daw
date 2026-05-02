// Layout principal: titulo + outlet para las rutas hijas
// En este examen solo hay una ruta hija (la lista de entregas)

export default function Home() {
    return (
        <div>
            <h1>HarleyDawson</h1>
            <Outlet />
        </div>
    );
}
