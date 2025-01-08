package com.startdown.cascinacaccia.controllers;

import java.util.List;
import java.util.Optional;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
@RequestMapping("/cascina-caccia/users")
public class UserREST {

    @Autowired
    private UserServiceImpl userService;

    /**
     * OWNER only
     * Retrieves all users from the database.
     *
     * @return a list of all users
     */

    @Operation(summary = "Users list (OWNER only)", description = "Gets the list of all the users in the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Users retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "403", description = "The user doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json"))
    })
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers(); // Fetch all users using the user service
    }

    /**
     * OWNER only
     * Retrieves a user by their ID.
     *
     * @param id the ID of the user to retrieve
     * @return ResponseEntity containing the user or a not found response
     */
    @Operation(summary = "User details (OWNER only)", description = "Gets the details of a user, given their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "403", description = "The user doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json"))
    })
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
    @Operation(summary = "User details (OWNER only)", description = "Gets the details of a user, given their email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "403", description = "The user doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json"))
    })
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
    @Operation(summary = "Creates a new user (OWNER only)", description = "Creates a new user, with the JSON given",
    requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Details of the User to add",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = User.class)
    )))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User added successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "403", description = "The user doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json"))
    })
    @PostMapping("/create-user") // Endpoint to create a new user
    public ResponseEntity<User> createUser(@RequestBody User user) {
        // Creation of a new User in the DB
        User newUser = new User();
        newUser.setName(user.getName());
        newUser.setSurname(user.getSurname());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setRole(user.getRole());
        newUser = userService.createUser(newUser);

        return ResponseEntity.ok(newUser); // Return the created user
    }

    /**
     * Updates an existing user's details.
     *
     * @param userDetails the new details for the user
     * @return ResponseEntity containing the updated user or a not found response
     */
    @Operation(summary = "Updates the details of a user", description = "Updates an existing user, with the JSON given",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Details of the User to update",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = User.class)
                    )))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json"))
    })
    @PutMapping("/update-user") // Endpoint to update an existing user
    public ResponseEntity<User> updateUser(@RequestBody User userDetails) {
        Optional<User> updatedUser = userService.updateUser(userDetails.getId(), userDetails); // Update user details
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
    @Operation(summary = "Deletes a User (OWNER only)", description = "Deletes an existing user, given the ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "User deleted successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json"))
    })
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
    @Operation(summary = "Changes the password", description = "Changes the password for the user",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Old password of the user and the new password, given in a JSON",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PasswordChangeRequest.class)
                    )))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password changed successfully",
                    content = @Content(mediaType = "text/plain")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json"))
    })
    @PutMapping("/change-password") // Endpoint to change the password of the authenticated user
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
    @Operation(summary = "Changes any user's password (OWNER only)", description = "Changes the User's (given by ID) password with the one given in the body",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "New password",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(example = "\"example\"")
                    )))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password changed successfully",
                    content = @Content(mediaType = "text/plain")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json"))
    })
    @PutMapping("/change-user-password/{id}") // Endpoint to change a user's password by ID
    public ResponseEntity<String> changeUserPassword(@PathVariable Integer id, @RequestBody String newPassword) {
        Optional<String> result = userService.changeUserPassword(id, newPassword); // Change the user's password
        return result.map(ResponseEntity::ok) // Return success message if password change was successful
                .orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if user does not exist
    }

}
