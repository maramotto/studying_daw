@RestController
@RequestMapping("/api/deliveries")
public class DeliveryRestController {

    @Autowired
    private DeliveryService deliveryService;

    // GET /api/deliveries?status=PENDING  o  ?status=FINALIZED
    @GetMapping("/")
    public List<Delivery> getDeliveries(@RequestParam(required = false) String status) {
        if (status != null) {
            return deliveryService.getDeliveries(status);
        }
        // Por defecto devuelve las pendientes
        return deliveryService.getDeliveries("PENDING");
    }

    // POST /api/deliveries/  — crear nueva entrega
    // Si la matricula ya existe, devuelve 409 CONFLICT
    @PostMapping("/")
    public ResponseEntity<Delivery> createDelivery(@RequestBody Delivery delivery) {
        Delivery created = deliveryService.createDelivery(delivery);

        if (created == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        URI location = fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.getId())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    // PUT /api/deliveries/{id}  — actualizar estado (finalizar)
    @PutMapping("/{id}")
    public ResponseEntity<Delivery> updateDelivery(@PathVariable Long id,
                                                   @RequestBody Delivery delivery) {
        Delivery updated = deliveryService.replaceDelivery(id, delivery);

        if (updated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(updated);
    }

    // DELETE /api/deliveries/{id}  — cancelar entrega
    @DeleteMapping("/{id}")
    public ResponseEntity<Delivery> deleteDelivery(@PathVariable Long id) {
        Delivery deleted = deliveryService.deleteDelivery(id);

        if (deleted == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(deleted);
    }
}
