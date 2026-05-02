public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    // Busca entregas por estado, ordenadas por cilindrada descendente
    List<Delivery> findAllByStatusOrderByDisplacementDesc(String status);

    // Busca entrega por matricula (para comprobar duplicados)
    Optional<Delivery> findByPlate(String plate);
}
