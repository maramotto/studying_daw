@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private double price;

    private int stock;

    private boolean discount;

    public Game() {
    }

    public Game(String name, double price, int stock, boolean discount) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.discount = discount;
    }

    // getters and setters
}
