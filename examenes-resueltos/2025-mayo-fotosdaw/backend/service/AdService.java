@Service
public class AdService {

    @Autowired
    private AdRepository adRepository;

    @Autowired
    private AdMapper mapper;

    // Devuelve anuncios filtrados por estado de alquiler, ordenados por precio
    public Collection<AdDTO> getAds(boolean rented) {
        return toDTOs(adRepository.findAllByRentedOrderByPrice(rented));
    }

    // Devuelve un anuncio por id o lanza excepcion si no existe
    public AdDTO getAd(long id) {
        return toDTO(adRepository.findById(id).orElseThrow());
    }

    // Crea un anuncio. Devuelve null si ya existe uno con el mismo titulo
    public AdDTO createAd(AdDTO adDTO) {
        if (adRepository.findByTitle(adDTO.title()).isPresent()) {
            return null;
        }

        Ad ad = toDomain(adDTO);
        adRepository.save(ad);

        return toDTO(ad);
    }

    // Reemplaza un anuncio existente con los datos del DTO
    public AdDTO replaceAd(long id, AdDTO updatedAdDTO) {
        Ad oldAd = adRepository.findById(id).orElseThrow();
        Ad updatedAd = toDomain(updatedAdDTO);
        updatedAd.setId(id);

        adRepository.save(updatedAd);

        return toDTO(updatedAd);
    }

    // Elimina un anuncio y devuelve sus datos antes de borrar
    public AdDTO deleteAd(long id) {
        Ad ad = adRepository.findById(id).orElseThrow();
        AdDTO adDTO = toDTO(ad);
        adRepository.deleteById(id);

        return adDTO;
    }

    // --- Metodos auxiliares de mapeo (delegan en el mapper) ---

    private AdDTO toDTO(Ad ad) {
        return mapper.toDTO(ad);
    }

    private Ad toDomain(AdDTO adDTO) {
        return mapper.toDomain(adDTO);
    }

    private Collection<AdDTO> toDTOs(Collection<Ad> ads) {
        return mapper.toDTOs(ads);
    }
}
