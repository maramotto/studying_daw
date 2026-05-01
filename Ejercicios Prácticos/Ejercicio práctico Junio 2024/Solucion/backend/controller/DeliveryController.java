
// Imports

@Controller
public class DeliveryController {

	@Autowired
	private DeliveryService deliveryService;

	@GetMapping("/")
	public String showDeliveries(Model model) {
		model.addAttribute("pendingDeliveries", deliveryService.getPendingDeliveries());
		model.addAttribute("finishedDeliveries", deliveryService.getFinishedDeliveries());

		return "index";
	}

	@PostMapping("/createDelivery")
	public String createDelivery(Delivery delivery) {
		Delivery createdDelivery = deliveryService.createDelivery(delivery);

		if (createdDelivery == null) {
			return "redirect:/error";
		} else {
			return "redirect:/";
		}
	}

	@GetMapping("/finalizeDelivery/{id}")
	public String finalizeDelivery(@PathVariable Long id) {
		Delivery finishedDelivery = deliveryService.finalizeDelivery(id);

		if (finishedDelivery == null) {
			return "redirect:/error";
		} else {
			return "redirect:/";
		}
	}

	@GetMapping("/cancelDelivery/{id}")
	public String cancelDelivery(@PathVariable Long id) {
		Delivery canceledDelivery = deliveryService.cancelDelivery(id);

		if (canceledDelivery == null) {
			return "redirect:/error";
		} else {
			return "redirect:/";
		}
	}

	@GetMapping("/error")
	public String showError() {
		return "error";
	}
}
