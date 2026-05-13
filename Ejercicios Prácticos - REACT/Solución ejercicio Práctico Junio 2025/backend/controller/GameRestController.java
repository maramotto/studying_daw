
// Imports

@RestController
@RequestMapping("/api/games")
public class GameRestController {

    @Autowired
    private GameService gameService;

    @Autowired
    private GameMapper mapper;

    @GetMapping("/")
    public Collection<GameDTO> getGames(@RequestParam boolean discount) {
        return mapper.toDTOs(gameService.getGames(discount));
    }

    @GetMapping("/{id}")
    public GameDTO getGame(@PathVariable Long id) {
        return mapper.toDTO(gameService.getGame(id));
    }

    @PostMapping("/")
    public GameDTO createGame(@RequestBody GameDTO gameDTO) {

        Game game = mapper.toDomain(gameDTO);
        game = gameService.createGame(game);

        URI location = fromCurrentRequest().path("/{id}").buildAndExpand(game.getId()).toUri();

        return ResponseEntity.created(location).body(mapper.toDTO(game));
    }

    @PutMapping("/{id}")
    public GameDTO replaceGame(@PathVariable Long id, @RequestBody GameDTO gameDTO) {
        return gameService.replaceGame(id, mapper.toDomain(gameDTO));
    }

    @DeleteMapping("/{id}")
    public GameDTO deleteGame(@PathVariable Long id) {
        return gameService.deleteGame(id);
    }
}
