package com.startdown.cascinacaccia.controllers;

import java.util.List;
import java.util.Optional;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.startdown.cascinacaccia.entities.Reservation;
import com.startdown.cascinacaccia.exceptions.ReservationNotFoundException;
import com.startdown.cascinacaccia.services.ReservationServiceImpl;

@RestController
@RequestMapping("/cascina-caccia/reservations")
public class ReservationREST {

	@Autowired
	private ReservationServiceImpl reservationService;

	/**
	 * Retrieves a list of all reservations in the system.
	 * 
	 * @return a List of Reservation objects
	 */
	@Operation(summary = "Reservations list", description = "Gets the list of all the reservations in the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservations retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@GetMapping
	public List<Reservation> getAllReservations() {
		return reservationService.getAllReservations(); // Fetch all reservations using the reservation service
	}

	/**
	 * Retrieves a reservation by their unique ID.
	 * 
	 * @param id the ID of the reservation to be retrieved
	 * @return an Optional containing the Reservation object if found, or an empty Optional if not found
	 */
	@Operation(summary = "Reservation by ID", description = "Gets the reservation corresponding to the provided id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservation retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@GetMapping("/{id}") // Endpoint to get a reservation by ID
	public ResponseEntity<Reservation> getReservationById(@PathVariable Integer id) {
		Optional<Reservation> reservationOptional = reservationService.getReservationById(id); // Fetch reservation by ID
		return reservationOptional.map(ResponseEntity::ok) // Return reservation if found
				.orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if reservation does not exist
	}

	/**
	 * Creates a new reservation in the system.
	 *
	 * @param reservation the Reservation object containing the details of the new reservation
	 * @return the created Reservation object
	 */
	@Operation(summary = "Create reservation (public access)", description = "Creates a new reservation and inserts it into the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservation created successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json"))
    })
	@PostMapping("/create-reservation") // Endpoint to create a new reservation
	public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
		Reservation newReservation = reservationService.createReservation(reservation); // Create the new reservation
		return ResponseEntity.ok(newReservation); // Return the created reservation
	}

	/**
	 * Updates the details of an existing reservation.
	 *
	 * @param id                 the ID of the reservation to be updated
	 * @param reservationDetails the Reservation object containing the updated details
	 * @return an Optional containing the updated Reservation object if successful, or an empty Optional if the reservation was not found
	 */
	@Operation(summary = "Update reservation", description = "Updates an reservation and saves it in the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservation updated successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@PutMapping("/update-reservation/{id}") // Endpoint to update an existing reservation
	public ResponseEntity<Reservation> updateReservation(@PathVariable Integer id,
			@RequestBody Reservation reservationDetails) {
		Optional<Reservation> updatedReservation = reservationService.updateReservation(id, reservationDetails); // Update reservation details
		return updatedReservation.map(ResponseEntity::ok) // Return updated reservation if successful
				.orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if reservation does not exist
	}

	/**
	 * Deletes an reservation by their unique ID.
	 *
	 * @param id the ID of the reservation to be deleted
	 * @return true if the reservation was successfully deleted, false otherwise
	 */
	@Operation(summary = "Delete reservation", description = "Deletes an reservation and removes it from the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservation deleted successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@DeleteMapping("/delete-reservation/{id}") // Endpoint to delete a reservation by ID
	public ResponseEntity<Void> deleteReservation(@PathVariable Integer id) {
		if (reservationService.deleteReservation(id)) { // Attempt to delete reservation
			return ResponseEntity.noContent().build(); // Return no content if successful
		} else {
			return ResponseEntity.notFound().build(); // Return not found if reservation does not exist
		}
	}

	/**
	 * Retrieves a list of reservations with a specific status
	 * 
	 * @param status the name of the status for which the reservations is to be retrieved
	 * @return a List containing the Reservation objects if found, or an empty List if not found
	 */
	@Operation(summary = "Reservations by status", description = "Gets a list of all the reservations with a specific status in the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservations retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@GetMapping("/status/{status}")
	public List<Reservation> getReservationByStatus(@PathVariable String status) {
		List<Reservation> reservations =reservationService.getReservationsByStatus(status);
		if (reservations.isEmpty()) {
			throw new ReservationNotFoundException("No reservations found with the status: " + status); // Throw exception if no reservations found
		}
		return reservations;
	}

	/**
     * Retrieves a list of all reservations sorted in descending order by date send
     * 
     * @return a List containing the Reservation objects if found, or an empty List if not found
     */
	@Operation(summary = "Reservations sorted by date send", description = "Gets a list of all the reservations in the db sorted in descending order by date send")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservations retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@GetMapping("/datesend")
	public List<Reservation> findByOrderByDateSendDesc() {
		List<Reservation> reservations =reservationService.findByOrderByDateSendDesc();

		return reservations;
	}
	
	
	
	/**
     * Retrieves a list of all reservations sorted in descending order by date start and then by date finish
     * 
     * @return a List containing the Reservation objects if found, or an empty List if not found
     */
	@Operation(summary = "Reservations sorted by date start", description = "Gets a list of all the reservations in the db sorted in descending order by date send and then by date finish")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservations retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@GetMapping("/datestart")
	public List<Reservation> findByOrderByDateStartDescDateFinishDesc() {
		List<Reservation> reservations =reservationService.findByOrderByDateStartDescDateFinishDesc();

		return reservations;
	}
	
	
	/**
     * Retrieves a list of all reservations sorted in descending order by visitors
     * 
     * @return a List containing the Reservation objects if found, or an empty List if not found
     */
	@Operation(summary = "Reservations sorted by date visitors", description = "Gets a list of all the reservations in the db sorted in descending order by visitors")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservations retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@GetMapping("/visitors")
	public List<Reservation> findByOrderByVisitorsDesc() {
		List<Reservation> reservations =reservationService.findByOrderByVisitorsDesc();

		return reservations;
	}
	
}
