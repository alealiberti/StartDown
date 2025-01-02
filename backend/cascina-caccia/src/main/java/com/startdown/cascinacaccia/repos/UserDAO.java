package com.startdown.cascinacaccia.repos;

import com.startdown.cascinacaccia.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

/*
The UserDAO interface provides methods for accessing and manipulating user entities in the database.
It extends JpaRepository, allowing for CRUD operations and more.
*/
public interface UserDAO extends JpaRepository<User, Integer> {
}
