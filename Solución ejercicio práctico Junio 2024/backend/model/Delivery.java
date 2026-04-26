
// Imports

@Entity
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String license;

    private String model;

    private String color;

    private double cylinder;

    private String clientAddress;

    private String clientName;

    private String status; // DELIVERY_PENDING, DELIVERY_FINISHED

    public Delivery() {
    }

    public Delivery(
            String license,
            String model,
            String color,
            double cylinder,
            String address,
            String clientName,
            String status) {

        this.license = license;
        this.model = model;
        this.color = color;
        this.cylinder = cylinder;
        this.address = address;
        this.clientName = clientName;
        this.status = status;
    }

    // Getters and setters
}