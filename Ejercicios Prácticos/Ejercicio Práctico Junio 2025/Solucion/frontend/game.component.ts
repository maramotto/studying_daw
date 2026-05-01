@Component({
  templateUrl: "game.component.html",
})
export class GameComponent {
  public game: GameDTO;
  public gameNotAvailable: boolean = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    private gameService: GameService
  ) {
    const id = activatedRoute.snapshot.params["id"];

    this.gameService
      .getGame(id)
      .subscribe((game: GameDTO) => (this.game = game));
  }

  public deleteGame() {
    this.gameService.deleteGame(this.game.id).subscribe(() => {
      this.gameNotAvailable = true;
      this.game = null;
    });
  }

  public buyGame() {
    this.game.stock = this.game.stock - 1;

    this.gameService.replaceGame(this.game).subscribe((game: GameDTO) => {
      if (game.stock === 0) {
        this.gameNotAvailable = true;
        this.game = null;
      } else {
        this.gameNotAvailable = false;
        this.game = game;
      }
    });
  }

  public offerGame() {
    this.game.discount = true;

    this.gameService
      .replaceGame(this.game)
      .subscribe((game: GameDTO) => (this.game = game));
  }
}
