@RestController
@RequestMapping("/api/ads")
public class AdRestController {

    @Autowired
    private AdService adService;

    @GetMapping("/")
    public Collection<AdDTO> getAds(@RequestParam boolean rented) {
        return adService.getAds(rented);
    }

    @GetMapping("/{id}")
    public AdDTO getAd(@PathVariable Long id) {
        return adService.getAd(id);
    }

    @PostMapping("/")
    public AdDTO createAd(@RequestBody AdDTO adDTO) {

        adDTO = adService.createAd(adDTO);

        if (adDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            URI location = fromCurrentRequest().path("/{id}").buildAndExpand(adDTO.id()).toUri();

            return ResponseEntity.created(location).body(adDTO);
        }
    }

    @PutMapping("/{id}")
    public AdDTO replaceAd(@PathVariable Long id, @RequestBody AdDTO adDTO) {
        return adService.replaceAd(id, adDTO);
    }

    @DeleteMapping("/{id}")
    public AdDTO deleteAd(@PathVariable Long id) {
        return adService.deleteAd(id);
    }
}
