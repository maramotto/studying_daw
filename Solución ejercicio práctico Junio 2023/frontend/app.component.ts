
// Imports

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public times: Time[] = [];
  public time: Time = new Time();

  constructor(private timeService: TimesService) {}

  ngOnInit() {
    this.loadTimes();
  }

  public loadTimes() {
    this.timeService.getTimes().subscribe((times: Time[]) => {
      this.times = times;
    });
  }

  public addTime() {
    this.timeService.addTime(this.time).subscribe(
      () => this.loadTimes(),
      () => alert('Vuelta ya asignada')
    );
  }

  public deleteTime(id: number) {
    this.timeService.deleteTime(id).subscribe(() => this.loadTimes());
  }
}
