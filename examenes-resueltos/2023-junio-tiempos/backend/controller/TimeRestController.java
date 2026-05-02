// Imports

@RestController
@RequestMapping("/api/times")
public class TimeRestController {

    @Autowired
    private TimeService timeService;

    // GET /api/times/ -> lista de tiempos ordenada por vuelta ASC.
    @GetMapping("/")
    public Collection<TimeDTO> getTimes() {
        return timeService.getAllTimes();
    }

    // POST /api/times/ -> crear un nuevo tiempo.
    // Si la vuelta ya existe, devuelve 409 Conflict (el frontend hara alert).
    @PostMapping("/")
    public ResponseEntity<TimeDTO> createTime(@RequestBody TimeDTO dto) {
        dto = timeService.saveTime(dto);
        if (dto == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        URI location = fromCurrentRequest().path("/{id}").buildAndExpand(dto.id()).toUri();
        return ResponseEntity.created(location).body(dto);
    }

    // DELETE /api/times/{id} -> eliminar un tiempo por id.
    @DeleteMapping("/{id}")
    public TimeDTO removeTime(@PathVariable long id) {
        return timeService.removeTime(id);
    }
}
