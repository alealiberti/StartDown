package com.startdown.cascinacaccia.services;

import java.util.List;
import java.util.Optional;

import com.startdown.cascinacaccia.entities.User;

/**
 * The UserService interface defines the contract for user-related operations.
 * It provides methods for managing users in the application, including
 * retrieval, creation, updating, and deletion of user entities.
 */
public interface UserService {

    /**
     * Retrieves a list of all users in the system.
     *
     * @return a List of User objects
     */
    List<User> getAllUsers();

    /**
     * Retrieves a user by their unique ID.
     *
     * @param id the ID of the user to be retrieved
     * @return an Optional containing the User object if found, or an empty Optional if not found
     */
    Optional<User> getUserById(Integer id);

    /**
     * Retrieves a user by their email.
     *
     * @param email the email of the user to be retrieved
     * @return an Optional containing the User object if found, or an empty Optional if not found
     */
    Optional<User> getUserByEmail(String email);

    /**
     * Creates a new user in the system.
     *
     * @param user the User object containing the details of the new user
     * @return the created User object
     */
    User createUser(User user);

    /**
     * Updates the details of an existing user.
     *
     * @param id the ID of the user to be updated
     * @param userDetails the User object containing the updated details
     * @return an Optional containing the updated User object if successful, or an empty Optional if the user was not found
     */
    Optional<User> updateUser(Integer id, User userDetails);

    /**
     * Deletes a user by their unique ID.
     *
     * @param id the ID of the user to be deleted
     * @return true if the user was successfully deleted, false otherwise
     */
    boolean deleteUser(Integer id);

    /**
     * Changes the password for a user identified by their email.
     *
     * @param email the email of the user whose password is to be changed
     * @param oldPassword the current password of the user
     * @param newPassword the new password to be set
     * @return an Optional containing a success message if the password was changed, or an error message if it was not
     */
    Optional<String> changePassword(String email, String oldPassword, String newPassword);

    /**
     * Changes the password for a user identified by their ID, typically for administrative purposes.
     *
     * @param id the ID of the user whose password is to be changed
     * @param newPassword the new password to be set
     * @return an Optional containing a success message if the password was changed, or an empty Optional if the user was not found
     */
    Optional<String> changeUserPassword(Integer id, String newPassword);

    /**
     * Gets all the users emails for the mail sender
     *
     * @return all the users emails
     */
    String[] getEmails();

}
