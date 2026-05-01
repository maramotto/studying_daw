
// Imports

@Controller
public class SPAController {
    
    @GetMapping({ "/nano/**/{path:[^\\.]*}", "/{path:nano[^\\.]*}" })
    public String getSpa() {
        return "forward:/nano/index.html";
    }
}
