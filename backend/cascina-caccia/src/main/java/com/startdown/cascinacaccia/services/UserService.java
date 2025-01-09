package com.startdown.cascinacaccia.services;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import com.startdown.cascinacaccia.entities.User;
import com.startdown.cascinacaccia.exceptions.UserNotFoundException;
import com.startdown.cascinacaccia.repos.UserDAO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * The UserService defines the contract for user-related operations.
 * It provides methods for managing users in the application, including
 * retrieval, creation, updating, and deletion of user entities.
 */
@Service
public class UserService {

    @Autowired
    private UserDAO dao;

    @Autowired
    private PasswordEncoder passwordEncoder; // Encoder for hashing passwords before saving to the database

    /**
     * Validates if the given password meets complexity requirements (length, uppercase, lowercase, digit, and special character)
     *
     * @param password the password to check if it's valid
     * @return a boolean, representing if the password is valid or not
     */
    private boolean isValidPassword(String password) {
        if ((password.length() < 8) || !Pattern.compile("[A-Z]").matcher(password).find() || !Pattern.compile("[a-z]").matcher(password).find() || !Pattern.compile("[0-9]").matcher(password).find())
        {
            return false;
        }
        if (!Pattern.compile("[^a-zA-Z0-9]").matcher(password).find())
        {
            return false;
        }
        return true;
    }

    /**
     * Retrieves a list of all users in the system.
     *
     * @return a List of User objects
     */
    public List<User> getAllUsers() {
        return dao.findAll();
    }

    /**
     * Retrieves a user by their unique ID.
     *
     * @param id the ID of the user to be retrieved
     * @return an Optional containing the User object if found, or throws an exception if not found
     */
    public Optional<User> getUserById(Integer id) {
        return Optional.ofNullable(dao.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found.")));
    }

    /**
     * Retrieves a user by their email.
     *
     * @param email the email of the user to be retrieved
     * @return an Optional containing the User object if found, or throws an exception if not found
     */
    public Optional<User> getUserByEmail(String email) {
        return Optional.ofNullable(dao.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found.")));
    }

    /**
     * Creates a new user in the system hashing their password.
     *
     * @param user the User object containing the details of the new user
     * @return the created User object, or throws exceptions if something is not right
     */
    @Transactional
    public User createUser(User user) {
        // Ensure email is unique
        if (dao.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already taken.");
        }
        // Validate non-empty name and surname
        if (user.getName() == null || user.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty.");
        }
        if (user.getSurname() == null || user.getSurname().trim().isEmpty()) {
            throw new IllegalArgumentException("Surname cannot be empty.");
        }
        // Validate the password against the rules defined in isValidPassword()
        if (!isValidPassword(user.getPassword())) {
            throw new IllegalArgumentException("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a symbol.");
        }

        // Hash the password and save the user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return dao.save(user);
    }

    /**
     * Updates the details of an existing user.
     * Ensures the email is unique and validates new password if it's changing
     *
     * @param email the email of the user to be updated
     * @param userDetails the User object containing the updated details
     * @return an Optional containing the updated User object if successful, or throws exceptions if something is wrong
     */
    @Transactional
    public Optional<User> updateUser(String email, User userDetails) {
        User existingUser = dao.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found."));

        // Ensure email is unique if it's being changed
        if (!existingUser.getEmail().equals(userDetails.getEmail()) &&
                dao.findByEmail(userDetails.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already taken.");
        }
        if(userDetails.getEmail() != null && !userDetails.getEmail().trim().isEmpty()) {
            existingUser.setEmail(userDetails.getEmail());
        }

        // Changes the name and surname if they are being changed
        if (userDetails.getName() != null && !userDetails.getName().trim().isEmpty()) {
            existingUser.setName(userDetails.getName());
        }
        if (userDetails.getSurname() != null && !userDetails.getSurname().trim().isEmpty()) {
            existingUser.setSurname(userDetails.getSurname());
        }

        // If a new password is provided, validates and updates it
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            if (!isValidPassword(userDetails.getPassword())) {
                throw new IllegalArgumentException("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a symbol.");
            }
            existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }

        return Optional.of(dao.save(existingUser));
    }

    /**
     * Changes the role for a user, given their id
     *
     * @param id the id of the User
     * @param role the new role for the User
     * @return an Optional containing the updated User object if successful, or throws exceptions if something is wrong
     */
    public Optional<User> updateUserRole(Integer id, String role) {
        User user = dao.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found."));
        user.setRole(role);
        return Optional.of(dao.save(user));
    }

    /**
     * Deletes a user by their unique ID.
     *
     * @param id the ID of the user to be deleted
     * @return true if the user was successfully deleted, or throws an exception if something went wrong
     */
    public boolean deleteUser(Integer id) {
        if (dao.existsById(id)) {
            dao.deleteById(id);
            return true;
        }
        throw new UserNotFoundException("User with ID " + id + " not found.");
    }

    /**
     * Changes the password for a user identified by their email.
     *
     * @param email the email of the user whose password is to be changed
     * @param oldPassword the current password of the user
     * @param newPassword the new password to be set
     * @return an Optional containing a success message if the password was changed, or throws exceptions if something went wrong
     */
    public Optional<String> changePassword(String email, String oldPassword, String newPassword) {
        User user = dao.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found."));

        // Verify the old password matches
        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            // Ensure the new password meets complexity requirements
            if (!isValidPassword(newPassword)) {
                throw new IllegalArgumentException("Password is too weak: Must contain an uppercase letter, a lowercase letter, a digit, and a symbol.");
            }
            // Hash and update the new password
            user.setPassword(passwordEncoder.encode(newPassword));
            dao.save(user);
            return Optional.of("Password changed successfully.");
        } else {
            throw new IllegalArgumentException("Old password is incorrect.");
        }
    }

    /**
     * Changes the password for a user identified by their ID, typically for administrative purposes.
     *
     * @param id the ID of the user whose password is to be changed
     * @param newPassword the new password to be set
     * @return an Optional containing a success message if the password was changed, or throws exceptions if something went wrong
     */
    public Optional<String> changeUserPassword(Integer id, String newPassword) {
        User user = dao.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found."));

        // Validate the new password
        if (!isValidPassword(newPassword)) {
            throw new IllegalArgumentException("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a symbol.");
        }

        // Hash the new password and update
        user.setPassword(passwordEncoder.encode(newPassword));
        dao.save(user);
        return Optional.of("User password updated successfully.");
    }

    /**
     * Gets all the emails of the admins
     *
     * @return the emails as a Array of String
     */
    public String[] getEmails(){
        List<User> users = getAllUsers();
        String[] emails = new String[users.size()];

        for (int i = 0; i < users.size(); i++) {
            emails[i] = users.get(i).getEmail();
        }

        return emails;
    }
}
