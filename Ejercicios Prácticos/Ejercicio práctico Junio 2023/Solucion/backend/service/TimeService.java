
// Imports

@Service
public class TimeService {

	@Autowired
	private TimeRepository timeRepository;

	public List<Time> getAllTimes() {
		return timeRepository.findAllByOrderByNumLap();
	}

	public Time saveTime(Time time) {
		if (timeRepository.findByNumLap(time.getNumLap()).isPresent()) {
			return null;
		} else {
			timeRepository.save(time);

			return time;
		}
	}

	public Time removeTime(Long id) {
		Optional<Time> time = timeRepository.findById(id);

		if (time.isPresent()) {
			timeRepository.deleteById(id);

			return time.get();
		} else {
			return null;
		}
	}
}
