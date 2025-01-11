package com.startdown.cascinacaccia.repos;

import com.startdown.cascinacaccia.entities.Reservation;

import java.time.LocalDate;
import java.util.List;

import org.springdoc.core.converters.models.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

/*
The ReservationDAO interface provides methods for accessing and manipulating reservations entities in the database.
It extends JpaRepository, allowing for CRUD operations and more.
*/
public interface ReservationDAO extends JpaRepository<Reservation, Integer> {
	
    /**
     * Retrieves a list of reservations with a specific status
     * 
     * @param status the name of the status for which the reservations is to be retrieved
     * @return a List containing the Reservation objects if found, or an empty List if not found
     */
    List<Reservation> findByStatus(String status);

    /**
     * Retrieves a list of all reservations sorted in descending order by date send
     * 
     * @return a List containing the Reservation objects if found, or an empty List if not found
     */
    List<Reservation> findByOrderByDateSendDesc();
    
    
}
