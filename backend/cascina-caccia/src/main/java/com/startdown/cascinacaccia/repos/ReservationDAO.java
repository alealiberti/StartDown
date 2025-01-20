package com.startdown.cascinacaccia.repos;

import com.startdown.cascinacaccia.entities.Reservation;

import java.util.List;

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
    
    /**
     * Retrieves a list of all reservations with specific value of "archived"
     * sorted in ascending order for the start and then descending for the finish
     * 
     * @return a List containing the Reservation objects if found, or an empty List if not found
     */
    List<Reservation> findByArchivedOrderByDateStartAscDateFinishDesc(boolean isArchived);
    
    /**
     * Retrieves a list of all reservations with the specific value of "archived"
     * sorted in descending order by visitors
     * 
     * @return a List containing the Reservation objects if found, or an empty List if not found
     */
    List<Reservation> findByArchivedOrderByVisitorsDesc(boolean isArchived);

    /**
     * Retrieves a list of reservations with the specific value of "archived"
     * sorted by dateSend Desc
     *
     * @param isArchived boolean to get archived or non archived reservations
     * @return a List containing the Reservation objects if found, or an empty List if not found
     */
    List<Reservation> findByArchivedOrderByDateSendDesc(boolean isArchived);

    /**
     * Retrieves a list of reservations with the specific value of "archived"
     *
     * @param isArchived if the reservations needed are or not archived
     * @return a List containing the Reservation objects if found, or an empty List if not found
     */
    List<Reservation> findByArchived(boolean isArchived);

}
