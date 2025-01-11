package com.startdown.cascinacaccia.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.startdown.cascinacaccia.entities.Reservation;

public interface ReservationService {

	/**
     * Retrieves a list of all reservations in the system.
     *
     * @return a List of Reservation objects
     */
    List<Reservation> getAllReservations();
    
    /**
     * Retrieves a reservation by their unique ID.
     *
     * @param id the ID of the reservation to be retrieved
     * @return an Optional containing the Reservation object if found, or an empty Optional if not found
     */
    Optional<Reservation> getReservationById(Integer id);
    
    /**
     * Creates a new reservation in the system.
     *
     * @param reservation the Reservation object containing the details of the new reservation
     * @return the created Reservation object
     */
    Reservation createReservation(Reservation reservation);
    
    /**
     * Updates the details of an existing reservation.
     *
     * @param id the ID of the reservation to be updated
     * @param reservationDetails the Reservation object containing the updated details
     * @return an Optional containing the updated Reservation object if successful, or an empty Optional if the reservation was not found
     */
    Optional<Reservation> updateReservation(Integer id, Reservation reservationDetails);
    
    /**
     * Deletes an reservation by their unique ID.
     *
     * @param id the ID of the reservation to be deleted
     * @return true if the reservation was successfully deleted, false otherwise
     */
    boolean deleteReservation(Integer id);
    
    /**
     * Retrieves a list of reservations with a specific status
     * 
     * @param status the name of the status for which the reservations is to be retrieved
     * @return a List containing the Reservation objects if found, or an empty List if not found
     */
    List<Reservation> getReservationsByStatus(String status);

    /**
     * Retrieves a list of all reservations sorted in descending order by date send
     * 
     * @return a List containing the Reservation objects if found, or an empty List if not found
     */
    List<Reservation> findByOrderByDateSendDesc();

}
