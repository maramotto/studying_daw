import java.util.Collection;

public interface GameRepository extends JpaRepository<Game,Long>{
    public Collection<Game> findTop10ByDiscountOrderByPrice(boolean discount);
}
