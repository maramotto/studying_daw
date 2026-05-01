
// Imports

@Controller
public class TimesController {

	@Autowired
	private TimeService timeService;

	@GetMapping("/")
	public String showTimes(Model model) {
		model.addAttribute("times", timeService.getAllTimes());

		return "index";
	}

	@PostMapping("/newtime")
	public String newTime(Time time) {
		Time createdTime = timeService.saveTime(time);

		if (createdTime == null) {
			return "redirect:/error";
		} else {
			return "redirect:/";
		}
	}

	@GetMapping("/removetime/{id}")
	public String removeTime(@PathVariable Long id) {
		Time removedTime = timeService.removeTime(id);

		if (removedTime == null) {
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
