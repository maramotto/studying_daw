// Imports

@Service
public class TimeService {

    @Autowired
    private TimeRepository timeRepository;

    // Devuelve todos los tiempos ordenados por numero de vuelta ASC.
    public List<Time> getAllTimes() {
        return timeRepository.findAllByOrderByNumLap();
    }

    // Crea un nuevo tiempo. Si ya existe uno con el mismo numLap, devuelve null
    // para que el controller responda 409 Conflict.
    public Time saveTime(Time time) {
        if (timeRepository.findByNumLap(time.getNumLap()).isPresent()) {
            return null;
        }
        timeRepository.save(time);
        return time;
    }

    // Elimina un tiempo por id. Devuelve el tiempo eliminado o null si no existia.
    public Time removeTime(Long id) {
        Optional<Time> time = timeRepository.findById(id);
        if (time.isPresent()) {
            timeRepository.deleteById(id);
            return time.get();
        }
        return null;
    }
}
