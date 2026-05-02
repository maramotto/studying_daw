@Entity
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String plate;

    private String model;

    private String color;

    private int displacement;

    private String address;

    private String clientName;

    private String status; // PENDING, CANCELLED, FINALIZED

    public Delivery() {
    }

    public Delivery(String plate, String model, String color,
                    int displacement, String address,
                    String clientName, String status) {
        this.plate = plate;
        this.model = model;
        this.color = color;
        this.displacement = displacement;
        this.address = address;
        this.clientName = clientName;
        this.status = status;
    }

    // getters and setters
}
