@Component({
  templateUrl: "games.component.html",
})
export class GamesComponent implements OnInit {
  public discountedGames: GameDTO[];
  public nonDiscountedGames: GameDTO[];
  public game: GameDTO;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.loadGames();
  }

  public loadGames() {
    this.gameService
      .getGames(false)
      .subscribe((games: GameDTO[]) => (this.nonDiscountedGames = games));

    this.gameService
      .getGames(true)
      .subscribe((games: GameDTO[]) => (this.discountedGames = games));
  }

  public createGame() {
    this.gameService.createGame(this.game).subscribe(() => this.loadGames());
  }
}
