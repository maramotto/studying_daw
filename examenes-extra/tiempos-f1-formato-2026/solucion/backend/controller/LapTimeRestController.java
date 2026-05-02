@RestController
@RequestMapping("/api/laptimes")
public class LapTimeRestController {

    @Autowired
    private LapTimeService lapTimeService;

    // GET /api/laptimes/?fastest=true  → vueltas rapidas
    // GET /api/laptimes/?fastest=false → vueltas normales
    @GetMapping("/")
    public Collection<LapTimeDTO> getLapTimes(@RequestParam boolean fastest) {
        return lapTimeService.getLapTimes(fastest);
    }

    // GET /api/laptimes/{id} → detalle de un tiempo
    @GetMapping("/{id}")
    public LapTimeDTO getLapTime(@PathVariable Long id) {
        return lapTimeService.getLapTime(id);
    }

    // POST /api/laptimes/ → crear nuevo tiempo
    // Devuelve 409 CONFLICT si ya existe un tiempo con ese numero de vuelta
    @PostMapping("/")
    public ResponseEntity createLapTime(@RequestBody LapTimeDTO lapTimeDTO) {

        lapTimeDTO = lapTimeService.createLapTime(lapTimeDTO);

        if (lapTimeDTO == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        URI location = fromCurrentRequest().path("/{id}").buildAndExpand(lapTimeDTO.id()).toUri();

        return ResponseEntity.created(location).body(lapTimeDTO);
    }

    // PUT /api/laptimes/{id} → actualizar un tiempo (marcar/desmarcar rapida)
    @PutMapping("/{id}")
    public LapTimeDTO replaceLapTime(@PathVariable Long id, @RequestBody LapTimeDTO lapTimeDTO) {
        return lapTimeService.replaceLapTime(id, lapTimeDTO);
    }

    // DELETE /api/laptimes/{id} → eliminar un tiempo
    @DeleteMapping("/{id}")
    public LapTimeDTO deleteLapTime(@PathVariable Long id) {
        return lapTimeService.deleteLapTime(id);
    }
}
