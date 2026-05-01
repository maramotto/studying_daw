
// Imports

const API_URL = '/api/products/';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(status: string = "FOR_SALE"): Observable<Product[]> {
    let params = new HttpParams();
    params = params.append("status", status);

    return this.httpClient.get(API_URL, { params: params }) as Observable<Product[]>;
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put(API_URL + product.id, product) as Observable<Product>;
  }
}
