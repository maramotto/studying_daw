
// Imports

const API_URL = '/api/times/';

@Injectable({
  providedIn: 'root',
})
export class TimesService {
  constructor(private httpClient: HttpClient) {}

  getTimes(): Observable<Time[]> {
    return this.httpClient.get(API_URL) as Observable<Time[]>;
  }

  addTime(time: Time): Observable<Time> {
    return this.httpClient.post(API_URL, time) as Observable<Time>;
  }

  deleteTime(id: number): Observable<Time> {
    return this.httpClient.delete(API_URL + id) as Observable<Time>;
  }
}
