import java.util.Collection;

@Service
public class GameService {

	@Autowired
	private GameRepository gameRepository;

	public Collection<Game> getGames(boolean discount) {
		return gameRepository.findTop10ByDiscountOrderByPrice(discount);
	}

	public Game getGame(long id) {
		return gameRepository.findById(id).orElseThrow();
	}

	public Game createGame(Game game) {
		return gameRepository.save(game);
	}

	public Game replaceGame(long id, Game updatedGame) {

		updatedGame.setId(id);

		if (updatedGame.getStock() == 0) {
			gameRepository.deleteById(id);
		} else {
			gameRepository.save(updatedGame);
		}

		return updatedGame;
	}

	public Game deleteGame(long id) {

		Game game = gameRepository.findById(id).orElseThrow();

		return gameRepository.deleteById(id);
	}
}
