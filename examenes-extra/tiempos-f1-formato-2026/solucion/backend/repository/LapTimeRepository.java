public interface LapTimeRepository extends JpaRepository<LapTime, Long> {
    // Busca todos los tiempos segun si son vuelta rapida o no, ordenados por numero de vuelta
    public Collection<LapTime> findAllByFastestOrderByLapNumber(boolean fastest);

    // Busca un tiempo por numero de vuelta (para validar duplicados)
    public Optional<LapTime> findByLapNumber(int lapNumber);
}
