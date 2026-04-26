
// Imports

public SecurityFilterChain apiFilterChain(HttpSecurity http) {
    http.authorizeHttpRequests(authorize -> authorize
        // PRIVATE ENDPOINTS
        .requestMatchers(HttpMethod.GET,"/api/products/").permitAll()
        .requestMatchers(HttpMethod.PUT,"/api/products/").hasRole("ROLE_USER", "ROLE_ADMIN")
    );
}