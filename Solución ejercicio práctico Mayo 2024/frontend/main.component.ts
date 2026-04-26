
// Imports

@Component({
  templateUrl: './main.component.html'
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];

  constructor(public userService: UserService, private productsService: ProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  public loadProducts() {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}
