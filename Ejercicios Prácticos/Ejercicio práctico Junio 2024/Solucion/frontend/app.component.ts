// Imports

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  public pendingDeliveries: Delivery[] = [];
  public finishedDeliveries: Delivery[] = [];
  public delivery: Delivery = new Delivery();

  constructor(private deliveriesService: DeliveriesService) {}

  ngOnInit() {
    this.getPendingDeliveries();
    this.getFinishedDeliveries();
  }

  private getPendingDeliveries() {
    this.deliveriesService
      .getDeliveries("DELIVERY_PENDING")
      .subscribe((deliveries: Delivery[]) => {
        this.pendingDeliveries = deliveries;
      });
  }

  private getFinishedDeliveries() {
    this.deliveriesService
      .getDeliveries("DELIVERY_FINISHED")
      .subscribe((deliveries: Delivery[]) => {
        this.finishedDeliveries = deliveries;
      });
  }

  public addDelivery() {
    this.deliveriesService.createDelivery(this.delivery).subscribe(
      () => this.getPendingDeliveries(),
      () => alert("Moto pendiente de envío")
    );
  }

  public finalizeDelivery(delivery: Delivery) {
    delivery.status = "DELIVERY_FINISHED";

    this.deliveriesService.finalizeDelivery(delivery).subscribe(() => {
      this.getPendingDeliveries();
      this.getFinishedDeliveries();
    });
  }

  public cancelDelivery(id: number) {
    this.deliveriesService
      .cancelDelivery(id)
      .subscribe(() => this.getPendingDeliveries());
  }
}
