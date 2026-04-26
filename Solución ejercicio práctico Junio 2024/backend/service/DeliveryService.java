
// Imports

@Service
public class DeliveryService {

	@Autowired
	private DeliveryRepository deliveryRepository;

	public List<Delivery> getFinishedDeliveries() {
		return deliveryRepository.findByStatus("DELIVERY_FINISHED");
	}

	public List<Delivery> getPendingDeliveries() {
		return deliveryRepository.findByStatus("DELIVERY_PENDING");
	}

	public Delivery createDelivery(Delivery delivery) {
		if (deliveryRepository.findByLicense(delivery.getLicense()).isPresent()) {
			return null;
		} else {
			delivery.setStatus("DELIVERY_PENDING");

			return deliveryRepository.save(delivery);
		}
	}

	public Delivery finalizeDelivery(Long id) {
		Optional<Delivery> delivery = deliveryRepository.findById(id);

		if (delivery.isPresent()) {
			delivery.setStatus("DELIVERY_FINISHED");

			return deliveryRepository.save(delivery);
		} else {
			return null;
		}
	}

	public Delivery cancelDelivery(Long id) {
		Optional<Delivery> delivery = deliveryRepository.findById(id);

		if (delivery.isPresent()) {
			return deliveryRepository.delete(delivery);
		} else {
			return null;
		}
	}
}
