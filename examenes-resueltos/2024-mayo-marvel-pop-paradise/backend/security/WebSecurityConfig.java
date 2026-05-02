@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize -> authorize
            // La lista de productos es publica (o autenticada, segun interpretacion).
            .requestMatchers(HttpMethod.GET, "/api/products/").authenticated()
            // Solo CLIENT puede comprar.
            .requestMatchers(HttpMethod.PUT, "/api/products/*/buy").hasRole("CLIENT")
            // Solo ADMIN puede ver productos a enviar y marcar como enviado.
            .requestMatchers(HttpMethod.GET, "/api/products/to-send").hasRole("ADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/products/*/send").hasRole("ADMIN")
        );

        http.formLogin(Customizer.withDefaults());
        http.csrf(csrf -> csrf.disable());
        http.httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
