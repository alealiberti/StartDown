package com.startdown.cascinacaccia.controllers;

import java.util.List;
import java.util.Optional;

import com.startdown.cascinacaccia.entities.ReservationDTO;
import com.startdown.cascinacaccia.services.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.startdown.cascinacaccia.entities.Reservation;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/cascina-caccia/reservations")
// The ReservationREST Controller handles the endpoints and the logic for the Reseravtion-related API requests
public class ReservationREST {

	@Autowired
	private ReservationService reservationService;

	/**
	 * Retrieves a list of all reservations in the system not archived and sorted by dateSend Desc.
	 * 
	 * @return ResponseEntity ok when found all the reservations
	 */
	@Operation(summary = "Reservations list", description = "Gets the list of all the reservations in the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservations retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json"))
    })
	@GetMapping
	public ResponseEntity<List<ReservationDTO>> getAllReservationsNotArchived() {
		List<ReservationDTO> reservations = reservationService.findByNotArchivedAndByDateSend(); // Fetch all reservations using the reservation service
		return ResponseEntity.ok(reservations);
	}

	/**
	 * Retrieves a list of all reservations in the system.
	 *
	 * @return ResponseEntity ok when found all the reservations
	 */
	@Operation(summary = "Reservations list", description = "Gets the list of all the reservations in the db")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Reservations retrieved successfully",
					content = @Content(mediaType = "application/json",
							schema = @Schema(implementation = Reservation.class))),
			@ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
					content = @Content(mediaType = "application/json"))
	})
	@GetMapping("/get-all")
	public ResponseEntity<List<ReservationDTO>> getAllReservations() {
		List<ReservationDTO> reservations = reservationService.findAllReservations(); // Fetch all reservations using the reservation service
		return ResponseEntity.ok(reservations);
	}

	/**
	 * Retrieves a reservation by their unique ID.
	 * 
	 * @param id the ID of the reservation to be retrieved
	 * @return ResponseEntity containing the reservation or not found response
	 */
	@Operation(summary = "Reservation by ID", description = "Gets the reservation corresponding to the provided id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservation retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "404", description = "Reservation not found",
            content = @Content(mediaType = "application/json"))
    })
	@GetMapping("/{id}") // Endpoint to get a reservation by ID
	public ResponseEntity<ReservationDTO> getReservationById(@PathVariable Integer id) {
		Optional<ReservationDTO> reservationOptional = reservationService.getReservationById(id); // Fetch reservation by ID
		return reservationOptional.map(ResponseEntity::ok) // Return reservation if found
				.orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if reservation does not exist
	}

	/**
	 * Creates a new reservation in the system.
	 * Sends confirmation emails to the person making the request and to the admins
	 *
	 * @param reservation the Reservation object containing the details of the new reservation
	 * @return ResponseEntity containing the created reservation
	 */
	@Operation(summary = "Create reservation (public access)", description = "Creates a new reservation and inserts it into the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservation created successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
			@ApiResponse(responseCode = "400", description = "Bad request",
					content = @Content(mediaType = "application/json")),
			@ApiResponse(responseCode = "500", description = "Internal server error",
					content = @Content(mediaType = "application/json"))
    })
	@CrossOrigin(origins = "http://localhost:5173")
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
            @ApiResponse(responseCode = "404", description = "Reservation not found",
            content = @Content(mediaType = "application/json"))
    })
	@PutMapping("/update-reservation/{id}") // Endpoint to update an existing reservation
	public ResponseEntity<Reservation> updateReservation(@PathVariable Integer id,
			@RequestBody ReservationDTO reservationDetails) {
		Optional<Reservation> updatedReservation = reservationService.updateReservation(id, reservationDetails); // Update reservation details
		return updatedReservation.map(ResponseEntity::ok) // Return updated reservation if successful
				.orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if reservation does not exist
	}

	/**
	 * Deletes an reservation by their unique ID.
	 *
	 * @param id the ID of the reservation to be deleted
	 * @return no content response if everything was alright or not found response
	 */
	@Operation(summary = "Delete reservation", description = "Deletes an reservation and removes it from the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservation deleted successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "404", description = "Reservation not found",
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
	 * @return ResponseEntity containing the reservations
	 */
	@Operation(summary = "Reservations by status", description = "Gets a list of all the reservations with a specific status in the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservations retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json"))
    })
	@GetMapping("/status/{status}")
	public ResponseEntity<List<ReservationDTO>> getReservationByStatus(@PathVariable String status) {
		List<ReservationDTO> reservations = reservationService.findReservationsByStatus(status);
		return ResponseEntity.ok(reservations);
	}
	
	/**
     * Retrieves a list of all reservations not archived sorted in descending order by date start and then by date finish
     *
	 * @return ResponseEntity containing the reservations
     */
	@Operation(summary = "Reservations sorted by date start", description = "Gets a list of all the reservations in the db sorted in descending order by date send and then by date finish")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservations retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json"))
    })
	@GetMapping("/datestart")
	public ResponseEntity<List<ReservationDTO>> getByDateStart() {
		List<ReservationDTO> reservations = reservationService.findByNotArchivedOrderByDateStartAscDateFinishDesc();
		return ResponseEntity.ok(reservations);
	}

	/**
     * Retrieves a list of all reservations not archived sorted in descending order by visitors
     *
	 * @return ResponseEntity containing the reservations
     */
	@Operation(summary = "Reservations sorted by date visitors", description = "Gets a list of all the reservations in the db sorted in descending order by visitors")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservations retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json"))
    })
	@GetMapping("/visitors")
	public ResponseEntity<List<ReservationDTO>> getByVisitors() {
		List<ReservationDTO> reservations = reservationService.findByNotArchivedOrderByVisitorsDesc();
		return ResponseEntity.ok(reservations);
	}

	/**
	 *  Retrieves a list of all archived reservations
	 *
	 * @return ResponseEntity containing the reservations
	 */
	@Operation(summary = "Reservations archived", description = "Gets a list of all the reservations in the db flagged as archived")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Reservations retrieved successfully",
					content = @Content(mediaType = "application/json",
							schema = @Schema(implementation = Reservation.class))),
			@ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
					content = @Content(mediaType = "application/json"))
	})
	@GetMapping("/archived")
	public ResponseEntity<List<ReservationDTO>> getArchived(){
		List<ReservationDTO> reservations = reservationService.findByArchived();
		return ResponseEntity.ok(reservations);
	}

}
