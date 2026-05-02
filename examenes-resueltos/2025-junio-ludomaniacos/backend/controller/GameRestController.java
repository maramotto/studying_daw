@RestController
@RequestMapping("/api/games")
public class GameRestController {

    @Autowired
    private GameService gameService;

    @GetMapping("/")
    public Collection<GameDTO> getGames(@RequestParam boolean discount) {
        return gameService.getGames(discount);
    }

    @GetMapping("/{id}")
    public GameDTO getGame(@PathVariable Long id) {
        return gameService.getGame(id);
    }

    @PostMapping("/")
    public ResponseEntity<GameDTO> createGame(@RequestBody GameDTO gameDTO) {
        gameDTO = gameService.createGame(gameDTO);
        URI location = fromCurrentRequest().path("/{id}").buildAndExpand(gameDTO.id()).toUri();
        return ResponseEntity.created(location).body(gameDTO);
    }

    @PutMapping("/{id}")
    public GameDTO replaceGame(@PathVariable Long id, @RequestBody GameDTO gameDTO) {
        return gameService.replaceGame(id, gameDTO);
    }

    @DeleteMapping("/{id}")
    public GameDTO deleteGame(@PathVariable Long id) {
        return gameService.deleteGame(id);
    }
}
