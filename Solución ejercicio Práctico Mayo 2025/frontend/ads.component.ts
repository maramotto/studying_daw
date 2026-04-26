@Component({
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
  public adsNotRented: AdDTO[];
  public adsRented: AdDTO[];
  public ad: AdDTO;

  constructor(private adService: AdService) {}

  ngOnInit() {
    this.loadAds();
  }

  public loadAds() {
    this.adService.getAds(false).subscribe(
        (ads: AdDTO[]) => this.adsNotRented = ads
    );

    this.adService.getAds(true).subscribe(
        (ads: AdDTO[]) => this.adsRented = ads
    );
  }

  public createAd() {
    this.adService.createAd(this.ad).subscribe(
      () => this.loadAds(),
      () => alert("Ya existe un anuncio con el mismo título")
    );
  }
}
