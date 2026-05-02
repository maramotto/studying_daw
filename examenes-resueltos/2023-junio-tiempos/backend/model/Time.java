// Imports

@Entity
public class Time {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int numLap;

    private String lapTime;

    public Time() {
    }

    public Time(int numLap, String lapTime) {
        this.numLap = numLap;
        this.lapTime = lapTime;
    }

    // getters and setters
}
