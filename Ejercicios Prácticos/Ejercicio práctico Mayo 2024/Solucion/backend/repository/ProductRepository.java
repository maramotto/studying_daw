
// Imports

public class ProductRepository extends JpaRepository<Product, Long>{

    List<Product> findByStatusOrderByPrice(String status);

}
