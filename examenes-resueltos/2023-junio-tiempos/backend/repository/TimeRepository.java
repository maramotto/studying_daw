// Imports

public interface TimeRepository extends JpaRepository<Time, Long> {

    // Buscar por numero de vuelta (para comprobar duplicados).
    // Devuelve Optional: vacio si no existe, con valor si ya hay una vuelta con ese numero.
    Optional<Time> findByNumLap(int numLap);

    // Listar todos los tiempos ordenados por numero de vuelta ascendente.
    // SpringData genera la query automaticamente a partir del nombre del metodo.
    List<Time> findAllByOrderByNumLap();
}
