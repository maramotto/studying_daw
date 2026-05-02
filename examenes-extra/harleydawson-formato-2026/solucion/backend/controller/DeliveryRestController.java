// Imports

@RestController
@RequestMapping("/api/deliveries")
public class DeliveryRestController {

    @Autowired
    private DeliveryService deliveryService;

    // GET /api/deliveries/?status=PENDING  o  ?status=DELIVERED
    @GetMapping("/")
    public Collection<DeliveryDTO> getDeliveries(@RequestParam String status) {
        return deliveryService.getDeliveries(status);
    }

    // GET /api/deliveries/{id}
    @GetMapping("/{id}")
    public DeliveryDTO getDelivery(@PathVariable Long id) {
        return deliveryService.getDelivery(id);
    }

    // POST /api/deliveries/ — 201 Created o 409 Conflict si matricula duplicada
    @PostMapping("/")
    public ResponseEntity<DeliveryDTO> createDelivery(@RequestBody DeliveryDTO deliveryDTO) {
        DeliveryDTO created = deliveryService.createDelivery(deliveryDTO);

        if (created == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        URI location = fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    // PUT /api/deliveries/{id} — para cambiar estado
    @PutMapping("/{id}")
    public DeliveryDTO replaceDelivery(@PathVariable Long id, @RequestBody DeliveryDTO deliveryDTO) {
        return deliveryService.replaceDelivery(id, deliveryDTO);
    }

    // DELETE /api/deliveries/{id}
    @DeleteMapping("/{id}")
    public DeliveryDTO deleteDelivery(@PathVariable Long id) {
        return deliveryService.deleteDelivery(id);
    }
}
