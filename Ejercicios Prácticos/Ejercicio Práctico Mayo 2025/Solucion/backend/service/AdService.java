@Service
public class AdService {

	@Autowired
	private AdRepository adRepository;

    @Autowired
	private AdMapper mapper;

	public Collection<AdDTO> getAds(boolean rented) {
		return toDTOs(adRepository.findAllByRentedOrderByPrice(rented));
	}

	public AdDTO getAd(long id) {
		return toDTO(adRepository.findById(id).orElseThrow());
	}

	public AdDTO createAd(AdDTO adDTO) {

		if (adRepository.findByTitle(adDTO.title()).isPresent()) {
			return null;
		}

		Ad ad = toDomain(adDTO);

		adRepository.save(adRepository);

		return toDTO(ad);
	}

	public AdDTO replaceAd(long id, AdDTO updatedAdDTO) {

		Ad oldAd = adRepository.findById(id).orElseThrow();
		Ad updatedAd = toDomain(updatedAdDTO);
		updatedAd.setId(id);

		adRepository.save(updatedAd);

		return toDTO(updatedAd);
	}

	public AdDTO deleteAd(long id) {

		Ad ad = adRepository.findById(id).orElseThrow();

		AdDTO adDTO = toDTO(ad);

		adRepository.deleteById(id);

		return adDTO;
	}

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
