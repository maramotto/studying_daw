// Imports

@RestController
@RequestMapping("/api/times")
public class TimeRestController {

    @Autowired
    private TimeService timeService;

    // GET /api/times/ -> lista de tiempos ordenada por vuelta ASC.
    @GetMapping("/")
    public Collection<Time> getTimes() {
        return timeService.getAllTimes();
    }

    // POST /api/times/ -> crear un nuevo tiempo.
    // Si la vuelta ya existe, devuelve 409 Conflict (el frontend hara alert).
    @PostMapping("/")
    public ResponseEntity<Time> createTime(@RequestBody Time time) {
        Time createdTime = timeService.saveTime(time);

        if (createdTime == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        URI location = fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(createdTime.getId())
            .toUri();

        return ResponseEntity.created(location).body(createdTime);
    }

    // DELETE /api/times/{id} -> eliminar un tiempo por id.
    @DeleteMapping("/{id}")
    public ResponseEntity<Time> removeTime(@PathVariable long id) {
        Time removedTime = timeService.removeTime(id);

        if (removedTime == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(removedTime);
    }
}
