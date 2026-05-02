// Layout principal: titulo + outlet para las rutas hijas
// useNavigation().state indica si hay una navegacion en curso ("loading")

export default function Home() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div>
            <h1>HarleyDawson {isLoading && <span>Cargando...</span>}</h1>
            <div style={{ opacity: isLoading ? 0.5 : 1 }}>
                <Outlet />
            </div>
        </div>
    );
}
