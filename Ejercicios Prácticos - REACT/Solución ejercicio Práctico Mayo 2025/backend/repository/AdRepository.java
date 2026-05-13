public interface AdRepository extends JpaRepository<Ad,Long>{
    public Collection<Ad> findAllByRentedOrderByPrice(boolean rented);
    public Optional<Ad> findByTitle(String title);
}
