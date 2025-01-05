package com.startdown.cascinacaccia.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.startdown.cascinacaccia.configuration.PasswordChangeRequest;
import com.startdown.cascinacaccia.entities.User;
import com.startdown.cascinacaccia.services.UserServiceImpl;

@RestController
@RequestMapping("/cascina_caccia/users")
public class UserREST {

    @Autowired
    private UserServiceImpl userService;

    /**
     * OWNER only
     * Retrieves all users from the database.
     *
     * @return a list of all users
     */
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers(); // Fetch all users using the user service
    }
}
