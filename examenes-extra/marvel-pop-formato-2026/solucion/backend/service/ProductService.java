@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper mapper;

    // Productos disponibles (sold=false), ordenados por precio DESC
    public Collection<ProductDTO> getAvailableProducts() {
        return toDTOs(productRepository.findBySoldFalseOrderByPriceDesc());
    }

    // Productos vendidos pendientes de envio (para admin)
    public Collection<ProductDTO> getProductsToSend() {
        return toDTOs(productRepository.findBySoldTrueAndSentFalse());
    }

    // Un producto concreto por id
    public ProductDTO getProduct(long id) {
        return toDTO(productRepository.findById(id).orElseThrow());
    }

    // Comprar: marca sold=true y guarda la direccion
    public ProductDTO buyProduct(long id, String address) {
        Product product = productRepository.findById(id).orElseThrow();

        product.setSold(true);
        product.setAddress(address);

        productRepository.save(product);

        return toDTO(product);
    }

    // Enviar: marca sent=true
    public ProductDTO sendProduct(long id) {
        Product product = productRepository.findById(id).orElseThrow();

        product.setSent(true);

        productRepository.save(product);

        return toDTO(product);
    }

    // --- Helpers de conversion (delegan en el mapper) ---

    private ProductDTO toDTO(Product p) {
        return mapper.toDTO(p);
    }

    private Collection<ProductDTO> toDTOs(Collection<Product> products) {
        return mapper.toDTOs(products);
    }
}
