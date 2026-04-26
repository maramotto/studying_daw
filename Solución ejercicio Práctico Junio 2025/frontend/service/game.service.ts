const BASE_URL = "/api/games/";

@Injectable({ providedIn: "root" })
export class GameService {
  constructor(private httpClient: HttpClient) {}

  public getGames(discount: boolean): Observable<GameDTO[]> {
    let params = new HttpParams();
    params = params.append("discount", discount);

    return this.httpClient.get(BASE_URL, { params: params }) as Observable<
      GameDTO[]
    >;
  }

  public getGame(id: number): Observable<GameDTO> {
    return this.httpClient.get(BASE_URL + id) as Observable<GameDTO>;
  }

  public createGame(game: GameDTO): Observable<GameDTO> {
    return this.httpClient.post(BASE_URL, game) as Observable<GameDTO>;
  }

  public replaceGame(game: GameDTO): Observable<GameDTO> {
    return this.httpClient.put(BASE_URL + game.id, game) as Observable<GameDTO>;
  }

  public deleteGame(id: number): Observable<GameDTO> {
    return this.httpClient.delete(BASE_URL + id) as Observable<GameDTO>;
  }
}
