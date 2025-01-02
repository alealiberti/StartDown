package com.startdown.cascinacaccia.repos;

import com.startdown.cascinacaccia.entities.Information;
import org.springframework.data.jpa.repository.JpaRepository;

/*
The InformationDAO interface provides methods for accessing and manipulating informations entities in the database.
It extends JpaRepository, allowing for CRUD operations and more.
*/
public interface InformationDAO extends JpaRepository<Information, Integer> {
}
