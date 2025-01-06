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

import com.startdown.cascinacaccia.configuration.PasswordChangeRequest;
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

    /**
     * Retrieves a user by their ID.
     *
     * @param id the ID of the user to retrieve
     * @return ResponseEntity containing the user or a not found response
     */
    @GetMapping("/{id}") // Endpoint to get a user by ID
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        Optional<User> userOptional = userService.getUserById(id); // Fetch user by ID
        return userOptional.map(ResponseEntity::ok) // Return user if found
                .orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if user does not exist
    }

    /**
     * OWNER only
     * Retrieves a user by their email.
     *
     * @param email the email of the user to retrieve
     * @return ResponseEntity containing the user or a not found response
     */
    @GetMapping("email/{email}") // Endpoint to get a user by ID
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> userOptional = userService.getUserByEmail(email); // Fetch user by email
        return userOptional.map(ResponseEntity::ok) // Return user if found
                .orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if user does not exist
    }

    /**
     * OWNER only
     * Creates a new user.
     *
     * @param user the user details for the new user
     * @return ResponseEntity containing the newly created user
     */
    @PostMapping("/create_user") // Endpoint to create a new user
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = userService.createUser(user); // Create the new user
        return ResponseEntity.ok(newUser); // Return the created user
    }

    /**
     * Updates an existing user's details.
     *
     * @param id the ID of the user to update
     * @param userDetails the new details for the user
     * @return ResponseEntity containing the updated user or a not found response
     */
    @PutMapping("/update-user/{id}") // Endpoint to update an existing user
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User userDetails) {
        Optional<User> updatedUser = userService.updateUser(id, userDetails); // Update user details
        return updatedUser.map(ResponseEntity::ok) // Return updated user if successful
                .orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if user does not exist
    }

    /**
     * OWNER only
     * Deletes a user by their ID.
     *
     * @param id the ID of the user to delete
     * @return ResponseEntity with no content or a not found response
     */
    @DeleteMapping("/delete-user/{id}") // Endpoint to delete a user by ID
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        if (userService.deleteUser(id)) { // Attempt to delete user
            return ResponseEntity.noContent().build(); // Return no content if successful
        } else {
            return ResponseEntity.notFound().build(); // Return not found if user does not exist
        }
    }

    /**
     * Changes the password for the authenticated user.
     *
     * @param passwordChangeRequest the request containing the old and new passwords
     * @return ResponseEntity with the result of the password change operation
     */
    @PutMapping("/change_password") // Endpoint to change the password of the authenticated user
    public ResponseEntity<String> changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // Get authentication details
        String currentUsername = authentication.getName(); // Get the current user's username

        Optional<String> result = userService.changePassword(currentUsername, passwordChangeRequest.getOldPassword(), passwordChangeRequest.getNewPassword()); // Change the password
        return result.map(ResponseEntity::ok) // Return success message if password change was successful
                .orElseGet(() -> ResponseEntity.badRequest().body("Error changing password")); // Return error message if unsuccessful
    }

    /**
     * OWNER only
     * Changes the password of a user identified by their ID (admin functionality).
     *
     * @param id the ID of the user whose password is to be changed
     * @param newPassword the new password to set for the user
     * @return ResponseEntity with the result of the password change operation
     */
    @PutMapping("/change_user_password/{id}") // Endpoint to change a user's password by ID
    public ResponseEntity<String> changeUserPassword(@PathVariable Integer id, @RequestBody String newPassword) {
        Optional<String> result = userService.changeUserPassword(id, newPassword); // Change the user's password
        return result.map(ResponseEntity::ok) // Return success message if password change was successful
                .orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if user does not exist
    }

}
