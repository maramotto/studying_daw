// Configuración de seguridad para la API REST
// El enunciado proporciona el esqueleto; hay que rellenar los requestMatchers
// Los roles son "ROLE_CLIENT" y "ROLE_ADMIN" pero en hasRole() se pone sin "ROLE_"

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize -> authorize
            // Cualquier usuario autenticado puede ver productos disponibles y detalle
            .requestMatchers(HttpMethod.GET, "/api/products/").authenticated()
            .requestMatchers(HttpMethod.GET, "/api/products/{id}").authenticated()

            // Solo ADMIN puede ver productos pendientes de envio
            .requestMatchers(HttpMethod.GET, "/api/products/to-send").hasRole("ADMIN")

            // Solo CLIENT puede comprar
            .requestMatchers(HttpMethod.PUT, "/api/products/*/buy").hasRole("CLIENT")

            // Solo ADMIN puede marcar como enviado
            .requestMatchers(HttpMethod.PUT, "/api/products/*/send").hasRole("ADMIN")

            // Todo lo demás requiere autenticación
            .anyRequest().authenticated()
        );

        // Desactivar CSRF para la API REST (sin esto, los POST/PUT/DELETE fallan)
        http.csrf(csrf -> csrf.disable());

        // Usar autenticación HTTP básica (la más simple para el examen)
        http.httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
