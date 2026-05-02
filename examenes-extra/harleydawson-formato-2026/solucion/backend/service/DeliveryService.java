// Imports

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private DeliveryMapper mapper;

    // Devuelve entregas filtradas por estado, con orden distinto segun el estado
    public Collection<DeliveryDTO> getDeliveries(String status) {
        if (status.equals("DELIVERED")) {
            return toDTOs(deliveryRepository.findAllByStatusOrderByModel(status));
        } else {
            return toDTOs(deliveryRepository.findAllByStatusOrderByDisplacementDesc(status));
        }
    }

    public DeliveryDTO getDelivery(long id) {
        return toDTO(deliveryRepository.findById(id).orElseThrow());
    }

    // Crea una entrega; devuelve null si ya existe una con la misma matricula
    public DeliveryDTO createDelivery(DeliveryDTO deliveryDTO) {
        if (deliveryRepository.findByPlate(deliveryDTO.plate()).isPresent()) {
            return null;
        }

        Delivery delivery = toDomain(deliveryDTO);
        delivery.setStatus("PENDING");

        deliveryRepository.save(delivery);

        return toDTO(delivery);
    }

    // Reemplaza una entrega (para cambiar estado a DELIVERED)
    public DeliveryDTO replaceDelivery(long id, DeliveryDTO updatedDeliveryDTO) {
        Delivery updatedDelivery = toDomain(updatedDeliveryDTO);
        updatedDelivery.setId(id);

        deliveryRepository.save(updatedDelivery);

        return toDTO(updatedDelivery);
    }

    public DeliveryDTO deleteDelivery(long id) {
        Delivery delivery = deliveryRepository.findById(id).orElseThrow();

        DeliveryDTO deliveryDTO = toDTO(delivery);

        deliveryRepository.deleteById(id);

        return deliveryDTO;
    }

    private DeliveryDTO toDTO(Delivery delivery) {
        return mapper.toDTO(delivery);
    }

    private Delivery toDomain(DeliveryDTO deliveryDTO) {
        return mapper.toDomain(deliveryDTO);
    }

    private Collection<DeliveryDTO> toDTOs(Collection<Delivery> deliveries) {
        return mapper.toDTOs(deliveries);
    }
}
