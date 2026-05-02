public interface GameRepository extends JpaRepository<Game, Long> {
    Collection<Game> findTop10ByDiscountOrderByPriceDesc(boolean discount);

    // Para validar duplicados al crear
    Optional<Game> findByName(String name);
}
