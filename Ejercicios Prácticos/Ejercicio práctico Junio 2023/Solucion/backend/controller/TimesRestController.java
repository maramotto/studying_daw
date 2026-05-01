
// Imports

@RestController
@RequestMapping("/api/times")
public class TimesRestController {

	@Autowired
	private TimeService timeService;

	@GetMapping("/")
	public Collection<Time> getTimes() {
		return timeService.getAllTimes();
	}

	@PostMapping("/")
	public ResponseEntity<Time> createTime(@RequestBody Time time) {
		Time createdTime = timeService.saveTime(time);

		if (createdTime == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			URI location = fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(createdTime.getId())
				.toUri();

			return ResponseEntity.created(location).body(createdTime);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Time> removeTime(@PathVariable long id) {
		Time removedTime = timeService.removeTime(id);

		if (removedTime == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return ResponseEntity.ok(removedTime);
		}
	}
}
