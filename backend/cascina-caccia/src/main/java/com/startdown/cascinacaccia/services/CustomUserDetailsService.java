package com.startdown.cascinacaccia.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.startdown.cascinacaccia.repos.UserDAO;
import com.startdown.cascinacaccia.entities.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDAO userDAO;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Finds the user using the email
        Optional<User> userOptional = userDAO.findByEmail(email);

        // Checks if the user exists and
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            UserBuilder userBuilder = org.springframework.security.core.userdetails.User.withUsername(email);

            userBuilder.password(user.getPassword()); // Set the user's password
            userBuilder.roles(user.getRole()); // Set the user's roles

            // Builds and returns the UserDetails object
            return userBuilder.build();
        } else {
            // Throw exception if user is not found
            throw new UsernameNotFoundException("User not found with the email: " + email);
        }
    }
}
