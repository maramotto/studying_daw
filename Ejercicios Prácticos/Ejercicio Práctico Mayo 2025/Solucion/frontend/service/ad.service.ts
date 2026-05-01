const BASE_URL = "/api/ads/";

@Injectable({ providedIn: "root" })
export class AdService {
  constructor(private httpClient: HttpClient) {}

  public getAds(rented: boolean): Observable<AdDTO[]> {
    let params = new HttpParams();
    params = params.append("rented", rented);

    return this.httpClient.get(BASE_URL, { params: params }) as Observable<
      AdDTO[]
    >;
  }

  public getAd(id: number): Observable<AdDTO> {
    return this.httpClient.get(BASE_URL + id) as Observable<AdDTO>;
  }

  public createAd(ad: AdDTO): Observable<AdDTO> {
    return this.httpClient.post(BASE_URL, ad) as Observable<AdDTO>;
  }

  public replaceAd(ad: AdDTO): Observable<AdDTO> {
    return this.httpClient.put(BASE_URL + ad.id, ad) as Observable<AdDTO>;
  }

  public deleteAd(id: number): Observable<AdDTO> {
    return this.httpClient.delete(BASE_URL + id) as Observable<AdDTO>;
  }
}
