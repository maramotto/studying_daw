
// Imports

@Component({
  templateUrl: './admin.component.html'
})
export class OrderListComponent implements OnInit {
  public products: Product[] = [];

  constructor(private productsService: ProductService) {}

  ngOnInit() {
    this.loadOrders();
  }

  public loadOrders() {
    this.productsService.getProducts("SOLD").subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  public sendProduct(product: Product) {
    product.status = "SENT";
    
    this.productsService.updateProduct(product).subscribe(() => {
      this.loadOrders();
    });
  }
}
