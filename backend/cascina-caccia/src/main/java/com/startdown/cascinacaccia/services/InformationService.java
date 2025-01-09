package com.startdown.cascinacaccia.services;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.startdown.cascinacaccia.entities.Information;
import com.startdown.cascinacaccia.repos.InformationDAO;

public interface InformationService {

	/**
     * Retrieves a list of all informations in the system.
     *
     * @return a List of Information objects
     */
    List<Information> getAllInformations();
    
    /**
     * Retrieves a information by their unique ID.
     *
     * @param id the ID of the information to be retrieved
     * @return an Optional containing the Information object if found, or an empty Optional if not found
     */
    Optional<Information> getInformationById(Integer id);
    
    /**
     * Creates a new information in the system.
     *
     * @param information the Information object containing the details of the new information
     * @return the created Information object
     */
    Information createInformation(Information information);
    
    /**
     * Updates the details of an existing information.
     *
     * @param id the ID of the information to be updated
     * @param informationDetails the Information object containing the updated details
     * @return an Optional containing the updated Information object if successful, or an empty Optional if the information was not found
     */
    Optional<Information> updateInformation(Integer id, Information informationDetails);
    
    /**
     * Deletes an information by their unique ID.
     *
     * @param id the ID of the information to be deleted
     * @return true if the information was successfully deleted, false otherwise
     */
    boolean deleteInformation(Integer id);
    
    /**
     * Retrieves a list of informations with a specific status
     * 
     * @param status the name of the status for which the informations is to be retrieved
     * @return a List containing the Information objects if found, or an empty List if not found
     */
    List<Information> getInformationsByStatus(String status);

    /**
     * Retrieves a list of informations with a specific date send
     * 
     * @param datesend the date send for which the informations is to be retrieved
     * @return a List containing the Information objects if found, or an empty List if not found
     */
    List<Information> getInformationsByDateSend(LocalDate datesend);

}
