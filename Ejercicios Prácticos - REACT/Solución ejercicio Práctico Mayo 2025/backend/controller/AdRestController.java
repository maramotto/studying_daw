// Imports

@RestController
@RequestMapping("/api/ads")
public class AdRestController {

    @Autowired
    private AdService adService;

    @Autowired
    private AdMapper mapper;

    @GetMapping("/")
    public Collection<AdDTO> getAds(@RequestParam boolean rented) {
        return mapper.toDTOs(adService.getAds(rented));
    }

    @GetMapping("/{id}")
    public AdDTO getAd(@PathVariable Long id) {
        return mapper.toDTO(adService.getAd(id));
    }

    @PostMapping("/")
    public AdDTO createAd(@RequestBody AdDTO adDTO) {

        Ad ad = adService.createAd(mapper.toDomain(adDTO));

        if (ad == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            URI location = fromCurrentRequest().path("/{id}").buildAndExpand(ad.getId()).toUri();

            return ResponseEntity.created(location).body(mapper.toDTO(ad));
        }
    }

    @PutMapping("/{id}")
    public AdDTO replaceAd(@PathVariable Long id, @RequestBody AdDTO adDTO) {
        return mapper.toDTO(adService.replaceAd(id, mapper.toDomain(adDTO)));
    }

    @DeleteMapping("/{id}")
    public AdDTO deleteAd(@PathVariable Long id) {
        return mapper.toDTO(adService.deleteAd(id));
    }
}
