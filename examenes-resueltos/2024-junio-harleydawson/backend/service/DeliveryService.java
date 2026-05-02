@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private DeliveryMapper mapper;

    // Obtiene entregas filtradas por estado, ordenadas por cilindrada DESC
    public Collection<DeliveryDTO> getDeliveries(String status) {
        return toDTOs(deliveryRepository.findAllByStatusOrderByDisplacementDesc(status));
    }

    // Crea una entrega nueva; devuelve null si ya existe una con esa matricula
    public DeliveryDTO createDelivery(DeliveryDTO dto) {
        if (deliveryRepository.findByPlate(dto.plate()).isPresent()) {
            return null;
        }
        Delivery delivery = toDomain(dto);
        delivery.setStatus("PENDING");
        delivery = deliveryRepository.save(delivery);
        return toDTO(delivery);
    }

    // Actualiza todos los campos de una entrega
    public DeliveryDTO replaceDelivery(long id, DeliveryDTO dto) {
        Delivery delivery = toDomain(dto);
        delivery.setId(id);
        delivery = deliveryRepository.save(delivery);
        return toDTO(delivery);
    }

    // Elimina una entrega y devuelve su DTO
    public DeliveryDTO deleteDelivery(long id) {
        Delivery delivery = deliveryRepository.findById(id).orElseThrow();
        DeliveryDTO dto = toDTO(delivery);
        deliveryRepository.deleteById(id);
        return dto;
    }

    // --- Helpers de conversion (delegan en el mapper) ---

    private DeliveryDTO toDTO(Delivery d) {
        return mapper.toDTO(d);
    }

    private Delivery toDomain(DeliveryDTO dto) {
        return mapper.toDomain(dto);
    }

    private Collection<DeliveryDTO> toDTOs(Collection<Delivery> deliveries) {
        return mapper.toDTOs(deliveries);
    }
}
