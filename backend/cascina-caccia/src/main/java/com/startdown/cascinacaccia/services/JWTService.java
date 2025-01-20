package com.startdown.cascinacaccia.services;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import io.jsonwebtoken.Jwts;

@Component
// JWTService class provides the methods to handle the Token Authorization for the API Server
public class JWTService {

    private String secretKey = "033c79ce8965b735e41fbf8a51b6861f085c48e0f0b2308cbb94e4eb0f5a43d8";

    // expiration time of 5 hours
    private final int EXPIRATION_TIME = 5 * 60 * 60 * 1000;

    /**
     * Constructor that creates a secret key for token generation
     */
    public JWTService() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk = keyGen.generateKey();
            secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Generates a token for the current session
     *
     * @param username the username of the login attempt
     * @return the token
     */
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    /**
     * Gets the username from the given token
     *
     * @param token the token of the authentication
     * @return the username of the user authenticated
     */
    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Checks if the token given is valid
     *
     * @param token the authorization token
     * @param username the username of the user authenticated
     * @return true if the token is valid, false otherwise
     */
    public boolean validateToken(String token, String username) {
        return extractUsername(token).equals(username) && !isTokenExpired(token);
    }

    /**
     * Checks if a token is expired
     *
     * @param token the given auth token
     * @return true if the token is expired, else otherwise
     */
    private boolean isTokenExpired(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }
}
