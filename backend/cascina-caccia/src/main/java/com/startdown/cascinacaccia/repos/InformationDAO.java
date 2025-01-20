package com.startdown.cascinacaccia.repos;

import com.startdown.cascinacaccia.entities.Information;

import java.time.LocalDate;
import java.util.List;

import org.springdoc.core.converters.models.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

/*
The InformationDAO interface provides methods for accessing and manipulating informations entities in the database.
It extends JpaRepository, allowing for CRUD operations and more.
*/
public interface InformationDAO extends JpaRepository<Information, Integer> {
	
    /**
     * Retrieves a list of all informations sorted in descending order by date send
     * 
     * @param archived the archived state for which the informations is to be retrieved
     * @return a List containing the Information objects if found, or an empty List if not found
     */
    List<Information> findByArchivedOrderByDateSendDesc(Boolean archived);

    /**
     * Retrieves a list of informations with a specific archived state
     * 
     * @param archived the archived state for which the informations is to be retrieved
     * @return a List containing the Informations objects if found, or an empty List if not found
     */
    List<Information> findByArchived(Boolean archived);
}
