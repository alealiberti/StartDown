package com.startdown.cascinacaccia.controllers;

import com.startdown.cascinacaccia.services.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/auth")
// The AuthorizationREST class provides the endpoint to login into the application
public class AuthorizationREST {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    /**
     * Endpoint for the login.
     * Checks if the Authorization given is valid and returns the Auth token
     *
     * @param authHeader the header containing the Basic auth
     * @return ResponseEntity containing the auth token or throws an exception if something went wrong
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            throw new IllegalArgumentException("Invalid Authorization header. Must start with 'Basic '");
        }

        String base64Credentials = authHeader.substring(6); // Remove "Basic "
        String decodedCredentials = new String(Base64.getDecoder().decode(base64Credentials));
        String[] credentials = decodedCredentials.split(":", 2);

        String username = credentials[0];
        String password = credentials[1];

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            String token = jwtService.generateToken(authentication.getName());
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid Authentication: " + e.getMessage());
        }
    }
}
