package com.startdown.cascinacaccia.controllers;

import java.time.LocalDate;
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

import com.startdown.cascinacaccia.entities.Information;
import com.startdown.cascinacaccia.exceptions.InformationNotFoundException;
import com.startdown.cascinacaccia.services.InformationServiceImpl;

@RestController
@RequestMapping("/cascina-caccia/informations")
public class InformationREST {

	@Autowired
	private InformationServiceImpl informationService;

	/**
	 * Retrieves a list of all informations in the system.
	 * 
	 * @return a List of Information objects
	 */
	@Operation(summary = "Informations list", description = "Gets the list of all the informations in the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Informations retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Information.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@GetMapping
	public List<Information> getAllInformations() {
		return informationService.getAllInformations(); // Fetch all informations using the information service
	}

	/**
	 * Retrieves a information by their unique ID.
	 * 
	 * @param id the ID of the information to be retrieved
	 * @return an Optional containing the Information object if found, or an empty Optional if not found
	 */
	@Operation(summary = "Information by ID", description = "Gets the information corresponding to the provided id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Information retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Information.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@GetMapping("/{id}") // Endpoint to get a information by ID
	public ResponseEntity<Information> getInformationById(@PathVariable Integer id) {
		Optional<Information> informationOptional = informationService.getInformationById(id); // Fetch information by ID
		return informationOptional.map(ResponseEntity::ok) // Return information if found
				.orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if information does not exist
	}

	/**
	 * Creates a new information in the system.
	 *
	 * @param information the Information object containing the details of the new information
	 * @return the created Information object
	 */
	@Operation(summary = "Create information (public access)", description = "Creates a new information and inserts it into the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Information created successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Information.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json"))
    })
	@PostMapping("/create-information") // Endpoint to create a new information
	public ResponseEntity<Information> createInformation(@RequestBody Information information) {
		Information newInformation = informationService.createInformation(information); // Create the new information
		return ResponseEntity.ok(newInformation); // Return the created information
	}

	/**
	 * Updates the details of an existing information.
	 *
	 * @param id                 the ID of the information to be updated
	 * @param informationDetails the Information object containing the updated details
	 * @return an Optional containing the updated Information object if successful, or an empty Optional if the information was not found
	 */
	@Operation(summary = "Update information", description = "Updates an information and saves it in the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Information updated successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Information.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@PutMapping("/update-information/{id}") // Endpoint to update an existing information
	public ResponseEntity<Information> updateInformation(@PathVariable Integer id,
			@RequestBody Information informationDetails) {
		Optional<Information> updatedInformation = informationService.updateInformation(id, informationDetails); // Update information details
		return updatedInformation.map(ResponseEntity::ok) // Return updated information if successful
				.orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if information does not exist
	}

	/**
	 * Deletes an information by their unique ID.
	 *
	 * @param id the ID of the information to be deleted
	 * @return true if the information was successfully deleted, false otherwise
	 */
	@Operation(summary = "Delete information", description = "Deletes an information and removes it from the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Information deleted successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Information.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@DeleteMapping("/delete-information/{id}") // Endpoint to delete a information by ID
	public ResponseEntity<Void> deleteInformation(@PathVariable Integer id) {
		if (informationService.deleteInformation(id)) { // Attempt to delete information
			return ResponseEntity.noContent().build(); // Return no content if successful
		} else {
			return ResponseEntity.notFound().build(); // Return not found if information does not exist
		}
	}

	/**
	 * Retrieves a list of informations with a specific status
	 * 
	 * @param status the name of the status for which the informations is to be retrieved
	 * @return a List containing the Information objects if found, or an empty List if not found
	 */
	@Operation(summary = "Informations by status", description = "Gets a list of all the informations with a specific status in the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Informations retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Information.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@GetMapping("/status/{status}")
	public List<Information> getInformationByStatus(@PathVariable String status) {
		List<Information> informations =informationService.getInformationsByStatus(status);
		if (informations.isEmpty()) {
			throw new InformationNotFoundException("No informations found with the status: " + status); // Throw exception if no informations found
		}
		return informations;
	}

	/**
     * Retrieves a list of all informations sorted in descending order by date send
     * 
     * @return a List containing the Information objects if found, or an empty List if not found
     */
	@Operation(summary = "Informations sorted by date send", description = "Gets a list of all the informations in the db sorted in descending order by date send")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Informations retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Information.class))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json"))
    })
	@GetMapping("/datesend")
	public List<Information> findByOrderByDateSendDesc() {
		List<Information> informations =informationService.findByOrderByDateSendDesc();

		return informations;
	}
}
