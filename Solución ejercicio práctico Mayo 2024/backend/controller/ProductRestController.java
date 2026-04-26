
// Imports

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductRestController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/")
    public List<Product> getProducts(@RequestParam(required = false) String status, HttpServletRequest request) {
        if (!status.equals("") && request.isUserInRole("ROLE_ADMIN")) {
            return productRepository.findByStatusOrderByPrice(status);
        } else {
            return productRepository.findByStatusOrderByPrice("FOR_SALE");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product modifyProduct,
            HttpServletRequest request) {

        Optional<Product> product = productRepository.findById(id);

        if (product.isPresent()) {

            // The user can only update the address and SOLD status of the products
            if (request.isUserInRole("ROLE_USER")
                    && !product.get().getAddress().equals("")
                    && product.get().getStatus().equals("SOLD")) {

                product.setAddress(modifyProduct.getAddress());
                product.setStatus(modifyProduct.getStatus());

                productRepository.save(product);

                return new ResponseEntity<>(product, HttpStatus.OK);

                // The admin can update the status of the products
            } else if (!request.isUserInRole("ROLE_ADMIN")) {

                product.setStatus(modifyProduct.getStatus());

                productRepository.save(product);

                return new ResponseEntity<>(product, HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
