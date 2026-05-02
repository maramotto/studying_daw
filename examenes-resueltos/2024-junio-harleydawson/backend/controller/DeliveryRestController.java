@RestController
@RequestMapping("/api/deliveries")
public class DeliveryRestController {

    @Autowired
    private DeliveryService deliveryService;

    // GET /api/deliveries?status=PENDING  o  ?status=FINALIZED
    @GetMapping("/")
    public Collection<DeliveryDTO> getDeliveries(@RequestParam(required = false) String status) {
        if (status != null) {
            return deliveryService.getDeliveries(status);
        }
        // Por defecto devuelve las pendientes
        return deliveryService.getDeliveries("PENDING");
    }

    // POST /api/deliveries/  — crear nueva entrega
    // Si la matricula ya existe, devuelve 409 CONFLICT
    @PostMapping("/")
    public ResponseEntity<DeliveryDTO> createDelivery(@RequestBody DeliveryDTO dto) {
        dto = deliveryService.createDelivery(dto);
        if (dto == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        URI location = fromCurrentRequest().path("/{id}").buildAndExpand(dto.id()).toUri();
        return ResponseEntity.created(location).body(dto);
    }

    // PUT /api/deliveries/{id}  — actualizar estado (finalizar)
    @PutMapping("/{id}")
    public DeliveryDTO replaceDelivery(@PathVariable long id, @RequestBody DeliveryDTO dto) {
        return deliveryService.replaceDelivery(id, dto);
    }

    // DELETE /api/deliveries/{id}  — cancelar entrega
    @DeleteMapping("/{id}")
    public DeliveryDTO deleteDelivery(@PathVariable long id) {
        return deliveryService.deleteDelivery(id);
    }
}
