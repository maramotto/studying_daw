
// Imports

public class DeliveryRepository extends JpaRepository<Delivery, Long>{

    List<Delivery> findByStatusOrderByCylinder(String status);

    Optional<Delivery> findByLicense(String license);

}
