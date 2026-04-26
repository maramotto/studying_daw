@Component({
    templateUrl: 'app.component.html'
})

export class AdComponent {

    public ad: AdDTO;

    constructor(public activatedRoute: ActivatedRoute, private adService: AdService) { 
        const id = activatedRoute.snapshot.params["id"];

        this.adService.getAd(id).subscribe(
            (ad: AdDTO) => this.ad = ad
        );
    }

    public deleteAd() {
        this.adService.deleteAd(this.ad.id).subscribe(
            () => this.router.navigate(['/'])
        );
    }

    public rentHouse() {
        this.ad.rented = true;

        this.adService.replaceAd(this.ad).subscribe(
            (ad: AdDTO) => this.ad = ad
        );
    }

    public stopRentHouse() {
        this.ad.rented = false;
        
        this.adService.replaceAd(this.ad).subscribe(
            (ad: AdDTO) => this.ad = ad
        );
    }
}