package com.startdown.cascinacaccia.controllers;

import java.util.List;
import java.util.Optional;

import com.startdown.cascinacaccia.entities.InformationDTO;
import com.startdown.cascinacaccia.services.InformationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
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
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/cascina-caccia/informations")
// The InformationREST Controller handles the endpoints and the logic for the Information-related API requests
public class InformationREST {

	@Autowired
	private InformationService informationService;

	private static final String schemaString = "{" +
			"  \"id\": 1073741824," +
			"  \"name\": \"Name\"," +
			"  \"surname\": \"Surname\"," +
			"  \"phone\": \"0112223334\"," +
			"  \"email\": \"email@sample.it\"," +
			"  \"dateSend\": \"MM/DD/YYYY\"," +
			"  \"text\": \"Lorem Ipsum\"," +
			"  \"archived\": false" +
			"}";

	private static final String schemaCreateString = "{"
			+ "\"name\": \"Name\","
			+ "\"surname\": \"Surname\","
			+ "\"phone\": \"0112223334\","
			+ "\"email\": \"email@sample.it\","
			+ "\"text\": \"Lorem Ipsum\""
			+ "}";

	/**
	 * Retrieves a list of all informations in the system sorted by date send and not archived.
	 *
	 * @return ResponseEntity containing the informations
	 */
	@Operation(summary = "Informations list", description = "Gets the list of all the informations in the db sorted by date send and not archived")

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Informations retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(example = schemaString))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json"))
    })
	@GetMapping
	public ResponseEntity<List<InformationDTO>> getAllInformationsNotArchived() {
		List<InformationDTO> informations = informationService.getByNotArchivedAndByDateSend();
		return ResponseEntity.ok(informations); // Fetch all informations using the information service
	}

	/**
	 * Retrieves a list of all informations in the system
	 *
	 * @return ResponseEntity containing the informations
	 */
	@Operation(summary = "Informations list", description = "Gets the list of all the informations in the db")

	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Informations retrieved successfully",
					content = @Content(mediaType = "application/json",
							schema = @Schema(example = schemaString))),
			@ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
					content = @Content(mediaType = "application/json"))
	})
	@GetMapping("/get-all")
	public ResponseEntity<List<InformationDTO>> getAllInformations() {
		List<InformationDTO> informations = informationService.getAllInformations();
		return ResponseEntity.ok(informations); // Fetch all informations using the information service
	}

	/**
	 * Retrieves a information by their unique ID.
	 * 
	 * @param id the ID of the information to be retrieved
	 * @return ResponseEntity containing the informations or not found response

	 */
	@Operation(summary = "Information by ID", description = "Gets the information corresponding to the provided id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Information retrieved successfully",
                    content = @Content(mediaType = "application/json",
							schema = @Schema(example = schemaString))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
			@ApiResponse(responseCode = "404", description = "Information not found",
					content = @Content(mediaType = "application/json")),
    })
	@GetMapping("/{id}") // Endpoint to get a information by ID
	public ResponseEntity<InformationDTO> getInformationById(@PathVariable Integer id) {
		Optional<InformationDTO> informationOptional = informationService.getInformationById(id); // Fetch information by ID
		return informationOptional.map(ResponseEntity::ok) // Return information if found
				.orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if information does not exist
	}

	/**
	 * Creates a new information in the system.
	 *
	 * @param information the Information object containing the details of the new information
	 * @return ResponseEntity containing the informations
	 */
	@Operation(summary = "Create information (public access)", description = "Creates a new information and inserts it into the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Information created successfully",
                    content = @Content(mediaType = "application/json",
							schema = @Schema(example = schemaString))),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json")),
			@ApiResponse(responseCode = "500", description = "Internal server error",
					content = @Content(mediaType = "application/json"))
    })
	@CrossOrigin(origins = "http://localhost:5173/")
	@PostMapping("/create-information") // Endpoint to create a new information
	public ResponseEntity<Information> createInformation(@io.swagger.v3.oas.annotations.parameters.RequestBody(
			description = "The information to update",
			required = true,
			content = @Content(
					mediaType = "application/json",
					examples = @ExampleObject(
							name = "Example of the request body",
							value = schemaCreateString)))
			@RequestBody Information information) {
		Information newInformation = informationService.createInformation(information); // Create the new information
		return ResponseEntity.ok(newInformation); // Return the created information
	}

	/**
	 * Updates the details of an existing information. It changes only the given parameters
	 *
	 * @param id                 the ID of the information to be updated
	 * @param informationDetails the Information object containing the updated details
	 * @return an Optional containing the updated Information object if successful, or an empty Optional if the information was not found
	 */
	@Operation(summary = "Update information", description = "Updates an information and saves it in the db. " +
															"It changes only the given parameters")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Information updated successfully",
                    content = @Content(mediaType = "application/json",
							schema = @Schema(example = schemaString))),
			@ApiResponse(responseCode = "400", description = "Bad request",
					content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
			@ApiResponse(responseCode = "404", description = "Information not found",
					content = @Content(mediaType = "application/json"))
    })
	@PutMapping("/update-information/{id}") // Endpoint to update an existing information
	public ResponseEntity<Information> updateInformation(@PathVariable Integer id, @io.swagger.v3.oas.annotations.parameters.RequestBody(
			description = "The information to update",
			required = true,
			content = @Content(
					mediaType = "application/json",
					examples = @ExampleObject(
							name = "Example of the request body",
							value = schemaString
					)
			)
	) @RequestBody InformationDTO informationDetails) {
		Optional<Information> updatedInformation = informationService.updateInformation(id, informationDetails); // Update information details
		return updatedInformation.map(ResponseEntity::ok) // Return updated information if successful
				.orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if information does not exist
	}

	/**
	 * Deletes an information by their unique ID.
	 *
	 * @param id the ID of the information to be deleted
	 * @return no content response if everything was alright or not found response
	 */
	@Operation(summary = "Delete information", description = "Deletes an information and removes it from the db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Information deleted successfully"),
			@ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "404", description = "Information not found",
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
     * Retrieves a list of all informations archived
     *
	 * @return ResponseEntity containing the informations
     */
	@Operation(summary = "Informations archived", description = "Gets a list of all the informations in the db that are archived")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Informations retrieved successfully",
                    content = @Content(mediaType = "application/json",
							schema = @Schema(example = schemaString))),
            @ApiResponse(responseCode = "403", description = "The users doesn't have the right permission",
                    content = @Content(mediaType = "application/json"))
    })
	@GetMapping("/archived")
	public ResponseEntity<List<InformationDTO>> getArchived() {
		List<InformationDTO> informations =informationService.getByArchived();
		return ResponseEntity.ok(informations);
	}
}
