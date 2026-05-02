// Imports

@Service
public class TimeService {

    @Autowired
    private TimeRepository timeRepository;

    @Autowired
    private TimeMapper mapper;

    // Devuelve todos los tiempos ordenados por numero de vuelta ASC.
    public Collection<TimeDTO> getAllTimes() {
        return toDTOs(timeRepository.findAllByOrderByNumLap());
    }

    // Crea un nuevo tiempo. Si ya existe uno con el mismo numLap, devuelve null
    // para que el controller responda 409 Conflict.
    public TimeDTO saveTime(TimeDTO dto) {
        if (timeRepository.findByNumLap(dto.numLap()).isPresent()) {
            return null;
        }
        Time time = toDomain(dto);
        time = timeRepository.save(time);
        return toDTO(time);
    }

    // Elimina un tiempo por id. Devuelve el DTO del tiempo eliminado.
    public TimeDTO removeTime(long id) {
        Time time = timeRepository.findById(id).orElseThrow();
        TimeDTO dto = toDTO(time);
        timeRepository.deleteById(id);
        return dto;
    }

    // --- Helpers de conversion (delegan en el mapper) ---

    private TimeDTO toDTO(Time t) {
        return mapper.toDTO(t);
    }

    private Time toDomain(TimeDTO dto) {
        return mapper.toDomain(dto);
    }

    private Collection<TimeDTO> toDTOs(Collection<Time> times) {
        return mapper.toDTOs(times);
    }
}
