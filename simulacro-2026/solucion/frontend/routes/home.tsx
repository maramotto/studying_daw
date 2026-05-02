// Layout principal: envuelve todas las rutas hijas
// useNavigation().state indica si hay una navegacion en curso ("loading") para mostrar el spinner

export default function Home() {
    const navigation = useNavigation();

    return (
        <div>
            <h1>LinguaDaw - Academia de Idiomas</h1>
            <hr />
            {navigation.state === "loading" ? (
                <p>Cargando...</p>
            ) : (
                <Outlet />
            )}
        </div>
    );
}
