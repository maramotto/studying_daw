public interface GameRepository extends JpaRepository<Game, Long> {
    Collection<Game> findTop10ByDiscountOrderByPriceDesc(boolean discount);
}
