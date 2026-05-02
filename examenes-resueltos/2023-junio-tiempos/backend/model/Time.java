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

    public Time(Long id, int numLap, String lapTime) {
        this.id = id;
        this.numLap = numLap;
        this.lapTime = lapTime;
    }

    // getters and setters
}
