@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper mapper;

    // Pagina principal: productos disponibles (no vendidos), por precio DESC.
    public Collection<ProductDTO> getProducts() {
        return toDTOs(productRepository.findAllBySoldFalseOrderByPriceDesc());
    }

    // Pagina admin: productos vendidos pendientes de envio.
    public Collection<ProductDTO> getProductsToSend() {
        return toDTOs(productRepository.findAllBySoldTrueAndSentFalse());
    }

    // Cliente compra un producto: marca sold=true y guarda la direccion.
    public ProductDTO buyProduct(long id, String address) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setSold(true);
        product.setAddress(address);
        productRepository.save(product);
        return toDTO(product);
    }

    // Admin marca un producto como enviado.
    public ProductDTO sendProduct(long id) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setSent(true);
        productRepository.save(product);
        return toDTO(product);
    }

    private ProductDTO toDTO(Product product) {
        return mapper.toDTO(product);
    }

    private Collection<ProductDTO> toDTOs(Collection<Product> products) {
        return mapper.toDTOs(products);
    }
}
