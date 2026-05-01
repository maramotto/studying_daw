
// Imports

@RestController
@RequestMapping("/api/deliveries")
public class DeliveryRestController {

	@Autowired
	private DeliveryService deliveryService;

	@GetMapping("/")
	public List<Delivery> getDeliveries(@RequestParam(required = false) String status) {
		if (status.equals("DELIVERY_FINISHED")) {
			return deliveryService.getFinishedDeliveries();
		} else {
			return deliveryService.getPendingDeliveries();
		}
	}

	@PostMapping("/")
	public ResponseEntity<Delivery> createDelivery(@RequestBody Delivery delivery) {
		Delivery createdDelivery = deliveryService.createDelivery(delivery);

		if (createdDelivery == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			URI location = fromCurrentRequest()
					.path("/{id}")
					.buildAndExpand(createdDelivery.getId())
					.toUri();

			return ResponseEntity.created(location).body(createdDelivery);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Delivery> finalizeDelivery(@PathVariable Long id, @RequestBody Delivery modifyDelivery) {

		if (modifyDelivery.isPresent() && modifyDelivery.getStatus().equals("DELIVERY_FINISHED")) {
			Delivery finishedDelivery = deliveryService.finalizeDelivery(id);

			if (finishedDelivery == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			} else {
				return new ResponseEntity<>(product, HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Delivery> cancelDelivery(@PathVariable Long id) {
		Delivery canceledDelivery = deliveryService.cancelDelivery(id);

		if (canceledDelivery == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return ResponseEntity.ok(canceledDelivery);
		}
	}
}
