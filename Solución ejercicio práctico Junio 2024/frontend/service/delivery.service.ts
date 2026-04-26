
// Imports

const API_URL = '/api/deliveries/';

@Injectable({
  providedIn: 'root',
})
export class DeliveriesService {
  constructor(private httpClient: HttpClient) {}

  getDeliveries(status: string = "DELIVERY_PENDING"): Observable<Delivery[]> {
    let params = new HttpParams();
    params = params.append("status", status);

    return this.httpClient.get(API_URL, { params: params }) as Observable<Delivery[]>;
  }

  createDelivery(delivery: Delivery): Observable<Delivery> {
    return this.httpClient.post(API_URL, delivery) as Observable<Delivery>;
  }

  finalizeDelivery(delivery: Delivery): Observable<Delivery> {
    return this.httpClient.put(API_URL + delivery.id, delivery) as Observable<Delivery>;
  }

  cancelDelivery(id: number): Observable<Delivery> {
    return this.httpClient.delete(API_URL + id) as Observable<Delivery>;
  }
}
