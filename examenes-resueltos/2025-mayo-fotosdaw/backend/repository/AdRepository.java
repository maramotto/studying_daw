public interface AdRepository extends JpaRepository<Ad, Long> {

    // Busca anuncios filtrados por rented y ordenados por precio ascendente
    Collection<Ad> findAllByRentedOrderByPrice(boolean rented);

    // Busca un anuncio por titulo exacto (para validar duplicados)
    Optional<Ad> findByTitle(String title);
}
