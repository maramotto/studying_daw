public interface ProductRepository extends JpaRepository<Product, Long> {

    // Productos disponibles para comprar, ordenados por precio descendente
    List<Product> findBySoldFalseOrderByPriceDesc();

    // Productos vendidos pero no enviados (para la pagina de admin)
    List<Product> findBySoldTrueAndSentFalse();
}
