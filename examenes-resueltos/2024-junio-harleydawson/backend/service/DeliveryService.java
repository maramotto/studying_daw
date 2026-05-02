@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    // Obtiene entregas filtradas por estado, ordenadas por cilindrada DESC
    public List<Delivery> getDeliveries(String status) {
        return deliveryRepository.findAllByStatusOrderByDisplacementDesc(status);
    }

    // Crea una entrega nueva; devuelve null si ya existe una con esa matricula
    public Delivery createDelivery(Delivery delivery) {
        if (deliveryRepository.findByPlate(delivery.getPlate()).isPresent()) {
            return null;
        }
        delivery.setStatus("PENDING");
        return deliveryRepository.save(delivery);
    }

    // Actualiza el estado de una entrega (FINALIZED, CANCELLED, etc.)
    public Delivery replaceDelivery(Long id, Delivery updatedDelivery) {
        Optional<Delivery> existing = deliveryRepository.findById(id);
        if (existing.isPresent()) {
            Delivery delivery = existing.get();
            delivery.setStatus(updatedDelivery.getStatus());
            return deliveryRepository.save(delivery);
        }
        return null;
    }

    // Elimina una entrega (cancelacion)
    public Delivery deleteDelivery(Long id) {
        Optional<Delivery> existing = deliveryRepository.findById(id);
        if (existing.isPresent()) {
            deliveryRepository.deleteById(id);
            return existing.get();
        }
        return null;
    }
}
