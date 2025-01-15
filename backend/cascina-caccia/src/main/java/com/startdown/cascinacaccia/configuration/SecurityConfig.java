package com.startdown.cascinacaccia.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.startdown.cascinacaccia.services.CustomUserDetailsService;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless services
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html" ,"/api/v1/users").hasAnyRole("OWNER", "ADMIN") // Allow access to API Docs to Owner and Admins
                        .requestMatchers("/login", "/resources/**").permitAll() // Allow public access to login and resources
                        .requestMatchers("/cascina-caccia/users/change-password", "/cascina-caccia/users/update-user").hasAnyRole("OWNER", "ADMIN")
                        .requestMatchers("cascina-caccia/informations/create-information", "/cascina-caccia/reservations/create-reservation").permitAll() // Allow public access to the creation of information or reservation requests
                        .requestMatchers("cascina-caccia/users/change-user-password/**", "cascina-caccia/users/create-user", "cascina-caccia/users/delete-user/**", "cascina-caccia/users/**", "cascina-caccia/users", "cascina-caccia/users/email/**", "/cascina-caccia/users/update-user-role").hasRole("OWNER") // Allow the owner to access some requests
                        .anyRequest().authenticated() // All other requests require authentication
                )
                .httpBasic(Customizer.withDefaults()) // Enable Basic Authentication
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Stateless session management

        return http.build(); // Build and return the security filter chain
    }

    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization", "X-Requested-With", "Accept"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService); // Set the user details service
        authProvider.setPasswordEncoder(passwordEncoder()); // Set the password encoder
        return authProvider; // Return the authentication provider
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Uses BCrypt to crypt passwords
    }

}
