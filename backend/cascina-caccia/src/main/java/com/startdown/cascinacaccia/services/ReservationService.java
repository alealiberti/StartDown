package com.startdown.cascinacaccia.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.startdown.cascinacaccia.entities.Reservation;
import com.startdown.cascinacaccia.entities.ReservationDTO;
import com.startdown.cascinacaccia.exceptions.ReservationNotFoundException;
import com.startdown.cascinacaccia.repos.ReservationDAO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    @Autowired
    private ReservationDAO dao;
    @Autowired
    private EmailService emailservice;
    @Autowired
    private DateConverterService dateConverterService;

    /**
     * given a Reservaiton creates a ReservationDTO
     *
     * @param reservation the reservation to convert
     * @return the converted reservation
     */
    private ReservationDTO convertToDTO(Reservation reservation) {
        return new ReservationDTO(
                reservation.getId(),
                reservation.getName(),
                reservation.getSurname(),
                reservation.getPhone(),
                reservation.getEmail(),
                dateConverterService.formatDateToFrontend(reservation.getDateSend()),
                dateConverterService.formatDateToFrontend(reservation.getDateStart()),
                reservation.getDateFinish() != null ? dateConverterService.formatDateToFrontend(reservation.getDateFinish()) : null,
                reservation.getHourStart(),
                reservation.getHourFinish(),
                reservation.getStatus(),
                reservation.getTypeGroup(),
                reservation.getVisitors(),
                reservation.getCompanions(),
                reservation.getAdditionalInfo(),
                reservation.isMobilityProblems()
        );
    }

    /**
     * given a List of Reservations creates a List of ReservationDTOs
     *
     * @param reservations the list to convert
     * @return the converted list
     */
    private List<ReservationDTO> convertToDTOList(List<Reservation> reservations) {
        return reservations.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a list of all reservations in the system.
     *
     * @return a List of ReservationsDTO objects
     */
    public List<ReservationDTO> getAllReservations() {
        List<Reservation> reservations = dao.findAll();
        return convertToDTOList(reservations);
    }

    /**
     * Retrieves a reservation by their unique ID.
     *
     * @param id the ID of the reservation to be retrieved
     * @return an Optional containing the ReservationDTO object if found, or an empty Optional if not found
     */
    public Optional<ReservationDTO> getReservationById(Integer id) {
        Optional<Reservation> res = dao.findById(id);
        if (res.isPresent()) {
            Reservation reservation = res.get();
            return Optional.of(convertToDTO(reservation));
        } else {
            throw new ReservationNotFoundException("Reservation with ID " + id + " not found.");
        }
    }

    /**
     * Creates a new reservation in the system.
     * Sends confirmation emails to the person making the request and to the admins
     *
     * @param reservation the Reservation object containing the details of the new reservation
     * @return the created Reservation object
     */
    @Transactional
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

        reservation.setStatus("ricevuta");
        reservation.setDateSend(LocalDate.now());

        emailservice.sendEmails(reservation.getEmail(), false);

        // Saves the reservation
        return dao.save(reservation);
    }

    /**
     * Updates the details of an existing reservation.
     *
     * @param id the ID of the reservation to be updated
     * @param reservationDetails the ReservationDTO object containing the updated details
     * @return an Optional containing the updated Reservation object if successful, or an empty Optional if the reservation was not found
     */
    @Transactional
    public Optional<Reservation> updateReservation(Integer id, ReservationDTO reservationDetails) {
        Reservation existingReservation = dao.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation with ID " + id + " not found."));

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
            existingReservation.setDateSend(dateConverterService.parseDate(reservationDetails.getDateSend()));
        }
        if (reservationDetails.getPhone() != null && !reservationDetails.getPhone().trim().isEmpty()) {
            existingReservation.setPhone(reservationDetails.getPhone());
        }
        if (reservationDetails.getDateStart() != null) {
            existingReservation.setDateStart(dateConverterService.parseDate(reservationDetails.getDateStart()));
        }
        if (reservationDetails.getDateFinish() != null ) {
            existingReservation.setDateFinish(dateConverterService.parseDate(reservationDetails.getDateFinish()));
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
            existingReservation.setAdditionalInfo(reservationDetails.getAdditionalInfo());
        }
        if (reservationDetails.isMobilityProblems()){
            existingReservation.setMobilityProblems(true);
        }

        return Optional.of(dao.save(existingReservation));
    }

    /**
     * Deletes an reservation by their unique ID.
     *
     * @param id the ID of the reservation to be deleted
     * @return true if the reservation was successfully deleted, false otherwise
     */
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
     * @return a List containing the ReservationDTO objects if found, or an empty List if not found
     */
    public List<ReservationDTO> getReservationsByStatus(String status) {
        List<Reservation> reservations = dao.findByStatus(status);
        return convertToDTOList(reservations);
    }

    /**
     * Retrieves a list of all reservations sorted in descending order by date send
     *
     * @return a List containing the ReservationDTO objects if found, or an empty List if not found
     */
    public List<ReservationDTO> findByOrderByDateSendDesc() {
        List<Reservation> reservations = dao.findByOrderByDateSendDesc();
        return convertToDTOList(reservations);
    }

    /**
     * Retrieves a list of all reservations sorted in descending order by visitors
     *
     * @return a List containing the ReservationDTO objects if found, or an empty List if not found
     */
    public List<ReservationDTO> findByOrderByVisitorsDesc() {
        List<Reservation> reservations = dao.findByOrderByVisitorsDesc();
        return convertToDTOList(reservations);
    }

    /**
     * Retrieves a list of all reservations sorted in ascending order by date start and then by descending date finish
     *
     * @return a List containing the ReservationDTO objects if found, or an empty List if not found
     */
    public List<ReservationDTO> findByOrderByDateStartAscDateFinishDesc() {
        List<Reservation> reservations = dao.findByOrderByDateStartAscDateFinishDesc();
        return convertToDTOList(reservations);
    }
}
