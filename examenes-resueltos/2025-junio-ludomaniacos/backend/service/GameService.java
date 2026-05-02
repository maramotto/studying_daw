@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameMapper mapper;

    public Collection<GameDTO> getGames(boolean discount) {
        return toDTOs(gameRepository.findTop10ByDiscountOrderByPriceDesc(discount));
    }

    public GameDTO getGame(long id) {
        return toDTO(gameRepository.findById(id).orElseThrow());
    }

    // Devuelve null si ya existe un juego con ese nombre (el controller devolvera 409)
    public GameDTO createGame(GameDTO gameDTO) {
        if (gameRepository.findByName(gameDTO.name()).isPresent()) {
            return null;
        }
        Game game = toDomain(gameDTO);
        gameRepository.save(game);
        return toDTO(game);
    }

    public GameDTO replaceGame(long id, GameDTO updatedGameDTO) {
        Game updatedGame = toDomain(updatedGameDTO);
        updatedGame.setId(id);

        if (updatedGame.getStock() == 0) {
            gameRepository.deleteById(id);
        } else {
            gameRepository.save(updatedGame);
        }

        return toDTO(updatedGame);
    }

    public GameDTO deleteGame(long id) {
        Game game = gameRepository.findById(id).orElseThrow();
        GameDTO gameDTO = toDTO(game);
        gameRepository.deleteById(id);
        return gameDTO;
    }

    private GameDTO toDTO(Game game) {
        return mapper.toDTO(game);
    }

    private Game toDomain(GameDTO gameDTO) {
        return mapper.toDomain(gameDTO);
    }

    private Collection<GameDTO> toDTOs(Collection<Game> games) {
        return mapper.toDTOs(games);
    }
}
