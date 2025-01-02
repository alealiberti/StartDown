package com.startdown.cascinacaccia.repos;

import com.startdown.cascinacaccia.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/*
The UserDAO interface provides methods for accessing and manipulating user entities in the database.
It extends JpaRepository, allowing for CRUD operations and more.
*/
public interface UserDAO extends JpaRepository<User, Integer> {

    /**
     * finds a user by their email
     *
     * @param email the email of the user to be found
     * @return an Optional containing the User object if found, or an empty Optional if not found
     */
    Optional<User> findByEmail(String email);

    /**
     * finds all thge users having a certain role
     *
     * @param role the role of the users to be found
     * @return a List of User containing all the Users found
     */
    List<User> findByRole(String role);

}
