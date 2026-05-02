public interface ProductRepository extends JpaRepository<Product, Long> {

    // Para la pagina principal: productos no vendidos, ordenados por precio DESC.
    List<Product> findAllBySoldFalseOrderByPriceDesc();

    // Para la pagina de admin: productos vendidos pero aun no enviados.
    List<Product> findAllBySoldTrueAndSentFalse();
}
