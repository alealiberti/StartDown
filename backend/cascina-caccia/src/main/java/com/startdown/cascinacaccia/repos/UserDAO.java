package com.startdown.cascinacaccia.repos;

import com.startdown.cascinacaccia.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDAO extends JpaRepository<User, Integer> {
}
