package com.startdown.cascinacaccia.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.startdown.cascinacaccia.entities.Reservation;
import com.startdown.cascinacaccia.exceptions.ReservationNotFoundException;
import com.startdown.cascinacaccia.repos.ReservationDAO;
import com.startdown.cascinacaccia.services.EmailService;

import jakarta.transaction.Transactional;

@Service
public class ReservationServiceImpl implements ReservationService{

	@Autowired
    private ReservationDAO dao;
	@Autowired
	private EmailService emailservice;
	/**
     * Retrieves a list of all reservations in the system.
     *
     * @return a List of Reservations objects
     */
    @Override
    public List<Reservation> getAllReservations() {
        return dao.findAll();
    }
    
    /**
     * Retrieves a reservation by their unique ID.
     *
     * @param id the ID of the reservation to be retrieved
     * @return an Optional containing the Reservation object if found, or an empty Optional if not found
     */
    @Override
    public Optional<Reservation> getReservationById(Integer id) {
        return Optional.ofNullable(dao.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation with ID " + id + " not found.")));
    }
    
    
    
    
    /**
     * Creates a new reservation in the system.
     *
     * @param reservation the Reservation object containing the details of the new reservation
     * @return the created Reservation object
     */
    @Transactional
    @Override
    public Reservation createReservation(Reservation reservation) {
        // Validate non-empty name,surname,email,date_start,type-group,visitors
        if (reservation.getName() == null || reservation.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty.");
        }
        if (reservation.getSurname() == null || reservation.getSurname().trim().isEmpty()) {
            throw new IllegalArgumentException("Surname cannot be empty.");
        }
        if (reservation.getEmail() == null || reservation.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty.");
        }
        if (reservation.getDateStart() == null) {
            throw new IllegalArgumentException("DateStart cannot be empty.");
        }
        if (reservation.getTypeGroup() == null || reservation.getTypeGroup().trim().isEmpty()) {
            throw new IllegalArgumentException("Type Group cannot be empty.");
        }
        if (reservation.getVisitors() == null) {
            throw new IllegalArgumentException("Visitors cannot be empty.");
        }
        
        reservation.setStatus("Ricevuta");
        reservation.setDateSend(LocalDate.now());
        
        
        emailservice.sendEmails(reservation.getEmail(), false);
        
        //Save the reservation
        return dao.save(reservation);
    }
    
    /**
     * Updates the details of an existing reservation.
     *
     * @param id the ID of the reservation to be updated
     * @param reservationDetails the Reservation object containing the updated details
     * @return an Optional containing the updated Reservation object if successful, or an empty Optional if the reservation was not found
     */
    @Transactional
    @Override
    public Optional<Reservation> updateReservation(Integer id, Reservation reservationDetails) {
        Reservation existingReservation = dao.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reservation with ID " + id + " not found."));

        // Set only if the values are not null or empty
        if (reservationDetails.getName() != null && !reservationDetails.getName().trim().isEmpty()) {
            existingReservation.setName(reservationDetails.getName());
        }
        if (reservationDetails.getSurname() != null && !reservationDetails.getSurname().trim().isEmpty()) {
            existingReservation.setSurname(reservationDetails.getSurname());
        }
        if (reservationDetails.getStatus() != null && !reservationDetails.getStatus().trim().isEmpty()) {
            existingReservation.setStatus(reservationDetails.getStatus());
        }
        if (reservationDetails.getEmail() != null && !reservationDetails.getEmail().trim().isEmpty()) {
            existingReservation.setEmail(reservationDetails.getEmail());
        }
        if (reservationDetails.getDateSend() != null) {
            existingReservation.setDateSend(reservationDetails.getDateSend());
        }
        if (reservationDetails.getPhone() != null && !reservationDetails.getPhone().trim().isEmpty()) {
            existingReservation.setPhone(reservationDetails.getPhone());
        }
        if (reservationDetails.getDateStart() != null) {
            existingReservation.setDateStart(reservationDetails.getDateStart());
        }
        if (reservationDetails.getDateFinish() != null ) {
            existingReservation.setDateFinish(reservationDetails.getDateFinish());
        }
        if (reservationDetails.getHourStart() != null ) {
            existingReservation.setHourStart(reservationDetails.getHourStart());
        }
        if (reservationDetails.getHourFinish() != null ) {
            existingReservation.setHourFinish(reservationDetails.getHourFinish());
        }
        if (reservationDetails.getTypeGroup() != null && !reservationDetails.getTypeGroup().trim().isEmpty()) {
            existingReservation.setTypeGroup(reservationDetails.getTypeGroup());
        }
        if (reservationDetails.getVisitors() != null ) {
            existingReservation.setVisitors(reservationDetails.getVisitors());
        }
        if (reservationDetails.getCompanions() != null ) {
            existingReservation.setCompanions(reservationDetails.getCompanions());
        }
        if (reservationDetails.getAdditionalInfo() != null && !reservationDetails.getAdditionalInfo().trim().isEmpty()) {
            existingReservation.setAdditionalInfo(reservationDetails.getAdditionalInfo());;
        }

        return Optional.of(dao.save(existingReservation));
    }

    
    /**
     * Deletes an reservation by their unique ID.
     *
     * @param id the ID of the reservation to be deleted
     * @return true if the reservation was successfully deleted, false otherwise
     */
    @Override
    public boolean deleteReservation(Integer id) {
        if (dao.existsById(id)) {
            dao.deleteById(id);
            return true;
        }
        throw new ReservationNotFoundException("Reservation with ID " + id + " not found.");
    }
       
    /**
     * Retrieves a list of reservations with a specific status
     * 
     * @param status the name of the status for which the reservations is to be retrieved
     * @return a List containing the Reservation objects if found, or an empty List if not found
     */
    @Override
    public List<Reservation> getReservationsByStatus(String status) {
        if (status == null || status.trim().isEmpty()) {
            throw new IllegalArgumentException("Status cannot be null or empty");
        }
        List<Reservation> reservations = dao.findByStatus(status);
        if (reservations.isEmpty()) {
            throw new ReservationNotFoundException("No reservations found for status: " + status);
        }
        return reservations;
        }
        
    
    /**
     * Retrieves a list of all reservations sorted in descending order by date send
     * 
     * @return a List containing the Reservation objects if found, or an empty List if not found
     */
    @Override
    public List<Reservation> findByOrderByDateSendDesc() {
      
        List<Reservation> reservations = dao.findByOrderByDateSendDesc();
        if (reservations.isEmpty()) {
            throw new ReservationNotFoundException("No reservations found ");
        }
        return reservations;
        }


	
}
