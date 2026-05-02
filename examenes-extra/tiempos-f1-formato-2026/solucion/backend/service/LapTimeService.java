@Service
public class LapTimeService {

	@Autowired
	private LapTimeRepository lapTimeRepository;

	@Autowired
	private LapTimeMapper mapper;

	public Collection<LapTimeDTO> getLapTimes(boolean fastest) {
		return toDTOs(lapTimeRepository.findAllByFastestOrderByLapNumber(fastest));
	}

	public LapTimeDTO getLapTime(long id) {
		return toDTO(lapTimeRepository.findById(id).orElseThrow());
	}

	// Devuelve null si ya existe un tiempo con ese numero de vuelta (duplicado)
	public LapTimeDTO createLapTime(LapTimeDTO lapTimeDTO) {

		if (lapTimeRepository.findByLapNumber(lapTimeDTO.lapNumber()).isPresent()) {
			return null;
		}

		LapTime lapTime = toDomain(lapTimeDTO);

		lapTimeRepository.save(lapTime);

		return toDTO(lapTime);
	}

	public LapTimeDTO replaceLapTime(long id, LapTimeDTO updatedLapTimeDTO) {

		LapTime updatedLapTime = toDomain(updatedLapTimeDTO);
		updatedLapTime.setId(id);

		lapTimeRepository.save(updatedLapTime);

		return toDTO(updatedLapTime);
	}

	public LapTimeDTO deleteLapTime(long id) {

		LapTime lapTime = lapTimeRepository.findById(id).orElseThrow();

		LapTimeDTO lapTimeDTO = toDTO(lapTime);

		lapTimeRepository.deleteById(id);

		return lapTimeDTO;
	}

	private LapTimeDTO toDTO(LapTime lapTime) {
		return mapper.toDTO(lapTime);
	}

	private LapTime toDomain(LapTimeDTO lapTimeDTO) {
		return mapper.toDomain(lapTimeDTO);
	}

	private Collection<LapTimeDTO> toDTOs(Collection<LapTime> lapTimes) {
		return mapper.toDTOs(lapTimes);
	}
}
