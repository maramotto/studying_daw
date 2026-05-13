@Service
public class AdService {

	@Autowired
	private AdRepository adRepository;

	public Collection<Ad> getAds(boolean rented) {
		return adRepository.findAllByRentedOrderByPrice(rented);
	}

	public Ad getAd(long id) {
		return adRepository.findById(id).orElseThrow();
	}

	public Ad createAd(Ad ad) {

		if (adRepository.findByTitle(ad.getTitle()).isPresent()) {
			return null;
		}

		return adRepository.save(ad);
	}

	public Ad replaceAd(long id, Ad updatedAd) {

		Ad oldAd = adRepository.findById(id).orElseThrow();
		updatedAd.setId(id);

		return adRepository.save(updatedAd);
	}

	public Ad deleteAd(long id) {

		Ad ad = adRepository.findById(id).orElseThrow();

		return adRepository.deleteById(id);
	}
}
