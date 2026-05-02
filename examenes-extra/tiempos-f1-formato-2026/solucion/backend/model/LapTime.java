@Entity
public class LapTime {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int lapNumber;

    private String time;

    private boolean fastest;

    public LapTime() {
    }

    public LapTime(int lapNumber, String time, boolean fastest) {
        this.lapNumber = lapNumber;
        this.time = time;
        this.fastest = fastest;
    }

    // Getter and Setter methods
}
