
// Imports

@Controller
public class SPAController {
    
    @GetMapping({ "/harleydawson/**/{path:[^\\.]*}", "/{path:harleydawson[^\\.]*}" })
    public String getSpa() {
        return "forward:/harleydawson/index.html";
    }
}
