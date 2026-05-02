
// Imports

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    // sold = true cuando un cliente lo compra
    private boolean sold;

    // direccion de envio, se rellena al comprar
    private String address;

    // sent = true cuando el admin lo marca como enviado
    private boolean sent;

    public Product() {
    }

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
        this.sold = false;
        this.sent = false;
    }

    // getters and setters
}
