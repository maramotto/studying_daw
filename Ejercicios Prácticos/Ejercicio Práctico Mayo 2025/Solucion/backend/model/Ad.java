@Entity
public class Ad {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id

    private String title;

    private String description;

    private int price;

    private boolean rented;

    public Ad () {}

    public Ad (String title, String description, int price, boolean rented) {
        super();

        this.title = title;
        this.description = description;
        this.price = price;
        this.rented = rented;
    }

    // Getter and Setter methods
}
