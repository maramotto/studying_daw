@RestController
@RequestMapping("/api/ads")
public class AdRestController {

    @Autowired
    private AdService adService;

    // GET /api/ads/?rented=true|false
    // Devuelve la lista de anuncios filtrada por estado de alquiler
    @GetMapping("/")
    public Collection<AdDTO> getAds(@RequestParam boolean rented) {
        return adService.getAds(rented);
    }

    // GET /api/ads/{id}
    // Devuelve un anuncio por su id
    @GetMapping("/{id}")
    public AdDTO getAd(@PathVariable Long id) {
        return adService.getAd(id);
    }

    // POST /api/ads/
    // Crea un anuncio. Devuelve 409 CONFLICT si ya existe uno con el mismo titulo
    @PostMapping("/")
    public ResponseEntity<AdDTO> createAd(@RequestBody AdDTO adDTO) {
        adDTO = adService.createAd(adDTO);

        if (adDTO == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        URI location = fromCurrentRequest().path("/{id}")
            .buildAndExpand(adDTO.id()).toUri();

        return ResponseEntity.created(location).body(adDTO);
    }

    // PUT /api/ads/{id}
    // Reemplaza un anuncio existente
    @PutMapping("/{id}")
    public AdDTO replaceAd(@PathVariable Long id, @RequestBody AdDTO adDTO) {
        return adService.replaceAd(id, adDTO);
    }

    // DELETE /api/ads/{id}
    // Elimina un anuncio y devuelve sus datos
    @DeleteMapping("/{id}")
    public AdDTO deleteAd(@PathVariable Long id) {
        return adService.deleteAd(id);
    }
}
