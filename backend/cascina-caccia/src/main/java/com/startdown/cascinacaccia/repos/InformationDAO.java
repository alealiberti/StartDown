package com.startdown.cascinacaccia.repos;

import com.startdown.cascinacaccia.entities.Information;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/*
The InformationDAO interface provides methods for accessing and manipulating informations entities in the database.
It extends JpaRepository, allowing for CRUD operations and more.
*/
public interface InformationDAO extends JpaRepository<Information, Integer> {
	
    /**
     * Retrieves a list of informations with a specific status
     * 
     * @param status the name of the status for which the informations is to be retrieved
     * @return a List containing the Information objects if found, or an empty List if not found
     */
    List<Information> findByStatus(String status);

    /**
     * Retrieves a list of informations with a specific date send
     * 
     * @param datesend the date send for which the informations is to be retrieved
     * @return a List containing the Information objects if found, or an empty List if not found
     */
    List<Information> findByDateSend(LocalDate datesend);
}
