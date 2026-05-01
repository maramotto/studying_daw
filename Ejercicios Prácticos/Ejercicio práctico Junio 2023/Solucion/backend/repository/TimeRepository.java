
// Imports

public interface TimeRepository extends JpaRepository<Time, Long> {

	public Optional<Time> findByNumLap(int nLap);
	public List<Time> findAllByOrderByNumLap();

}
