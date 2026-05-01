
// Imports

@Component({
  templateUrl: './purchase.component.html'
})
export class OrderFormComponent {
  public product: Product;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService) {

    this.product = {
      id: null,
      name: null,
      price: null,
      address: "",
      status: "SOLD"
    };
  }

  ngOnChanges() {
    this.product.id = this.activatedRoute.snapshot.params.id;
  }

  public makeAPurchase() {
    this.productsService.updateProduct(this.product).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
