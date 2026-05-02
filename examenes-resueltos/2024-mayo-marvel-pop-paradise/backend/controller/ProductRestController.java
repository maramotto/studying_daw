@RestController
@RequestMapping("/api/products")
public class ProductRestController {

    @Autowired
    private ProductService productService;

    // GET /api/products/ - lista de productos no vendidos (pagina principal).
    @GetMapping("/")
    public Collection<ProductDTO> getProducts() {
        return productService.getProducts();
    }

    // GET /api/products/to-send - productos vendidos pendientes de envio (solo admin).
    @GetMapping("/to-send")
    public Collection<ProductDTO> getProductsToSend() {
        return productService.getProductsToSend();
    }

    // PUT /api/products/{id}/buy - el cliente compra un producto.
    // Recibe la direccion en el body como { "address": "..." }.
    @PutMapping("/{id}/buy")
    public ProductDTO buyProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        return productService.buyProduct(id, productDTO.address());
    }

    // PUT /api/products/{id}/send - el admin marca como enviado.
    @PutMapping("/{id}/send")
    public ProductDTO sendProduct(@PathVariable Long id) {
        return productService.sendProduct(id);
    }
}
