@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private double price;

    private boolean sold;

    private String address;

    private boolean sent;

    public Product() {
    }

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
        this.sold = false;
        this.sent = false;
    }

    // Getters and setters
}
