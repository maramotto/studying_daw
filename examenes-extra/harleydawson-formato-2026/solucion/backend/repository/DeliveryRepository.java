// Imports

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    // Pendientes ordenadas por cilindrada descendente
    List<Delivery> findAllByStatusOrderByDisplacementDesc(String status);

    // Finalizadas ordenadas por modelo alfabeticamente
    List<Delivery> findAllByStatusOrderByModel(String status);

    // Buscar por matricula para comprobar duplicado
    Optional<Delivery> findByPlate(String plate);
}
