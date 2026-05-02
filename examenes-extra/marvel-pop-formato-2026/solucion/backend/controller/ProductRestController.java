@RestController
@RequestMapping("/api/products")
public class ProductRestController {

    @Autowired
    private ProductService productService;

    // GET /api/products/ — productos disponibles (cualquier usuario autenticado)
    @GetMapping("/")
    public Collection<ProductDTO> getAvailableProducts() {
        return productService.getAvailableProducts();
    }

    // GET /api/products/{id} — detalle de un producto
    @GetMapping("/{id}")
    public ProductDTO getProduct(@PathVariable Long id) {
        return productService.getProduct(id);
    }

    // GET /api/products/to-send — productos vendidos sin enviar (solo ADMIN)
    @GetMapping("/to-send")
    public Collection<ProductDTO> getProductsToSend() {
        return productService.getProductsToSend();
    }

    // PUT /api/products/{id}/buy — comprar un producto (solo CLIENT)
    // Recibe un body con { "address": "..." }
    @PutMapping("/{id}/buy")
    public ProductDTO buyProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        return productService.buyProduct(id, productDTO.address());
    }

    // PUT /api/products/{id}/send — marcar como enviado (solo ADMIN)
    @PutMapping("/{id}/send")
    public ProductDTO sendProduct(@PathVariable Long id) {
        return productService.sendProduct(id);
    }
}
