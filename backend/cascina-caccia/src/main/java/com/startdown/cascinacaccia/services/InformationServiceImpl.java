package com.startdown.cascinacaccia.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.startdown.cascinacaccia.entities.Information;
//import com.startdown.cascinacaccia.exceptions.UserNotFoundException;
import com.startdown.cascinacaccia.repos.InformationDAO;

import jakarta.transaction.Transactional;

@Service
public class InformationServiceImpl implements InformationService{

	@Autowired
    private InformationDAO dao;
	
	/**
     * Retrieves a list of all informations in the system.
     *
     * @return a List of Informations objects
     */
    @Override
    public List<Information> getAllInformations() {
        return dao.findAll();
    }
    
    /**
     * Retrieves a information by their unique ID.
     *
     * @param id the ID of the information to be retrieved
     * @return an Optional containing the Information object if found, or an empty Optional if not found
     */
    @Override
    public Optional<Information> getInformationById(Integer id) {
        return Optional.ofNullable(dao.findById(id)
                .orElseThrow(() -> new IllegalArgumentException/*UserNotFoundException*/("Information with ID " + id + " not found.")));
    }
    
    
    
    
    /**
     * Creates a new information in the system.
     *
     * @param information the Information object containing the details of the new information
     * @return the created Information object
     */
    @Transactional
    @Override
    public Information createInformation(Information information) {
        // Validate non-empty name,surname,status,email,text,datesend
        if (information.getName() == null || information.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty.");
        }
        if (information.getSurname() == null || information.getSurname().trim().isEmpty()) {
            throw new IllegalArgumentException("Surname cannot be empty.");
        }
        if (information.getStatus() == null || information.getStatus().trim().isEmpty()) {
            throw new IllegalArgumentException("Status cannot be empty.");
        }
        if (information.getEmail() == null || information.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty.");
        }
        if (information.getText() == null || information.getText().trim().isEmpty()) {
            throw new IllegalArgumentException("Text cannot be empty.");
        }
        if (information.getDateSend() == null) {
            throw new IllegalArgumentException("DateSend cannot be empty.");
        }
        
        //Save the information
        return dao.save(information);
    }
    
    /**
     * Updates the details of an existing information.
     *
     * @param id the ID of the information to be updated
     * @param informationDetails the Information object containing the updated details
     * @return an Optional containing the updated Information object if successful, or an empty Optional if the information was not found
     */
    @Transactional
    @Override
    public Optional<Information> updateInformation(Integer id, Information informationDetails) {
    	Information existingInformation = dao.findById(id)
                .orElseThrow(() -> new IllegalArgumentException/*UserNotFoundException*/("Information with ID " + id + " not found."));

    	 // Validate non-empty name,surname,status,email,text,datesend
        if (informationDetails.getName() == null || informationDetails.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty.");
        }
        if (informationDetails.getSurname() == null || informationDetails.getSurname().trim().isEmpty()) {
            throw new IllegalArgumentException("Surname cannot be empty.");
        }
        if (informationDetails.getStatus() == null || informationDetails.getStatus().trim().isEmpty()) {
            throw new IllegalArgumentException("Status cannot be empty.");
        }
        if (informationDetails.getEmail() == null || informationDetails.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty.");
        }
        if (informationDetails.getText() == null || informationDetails.getText().trim().isEmpty()) {
            throw new IllegalArgumentException("Text cannot be empty.");
        }
        if (informationDetails.getDateSend() == null) {
            throw new IllegalArgumentException("DateSend cannot be empty.");
        }

        // Update information details with the new informations
        existingInformation.setName(informationDetails.getName());
        existingInformation.setSurname(informationDetails.getSurname());
        existingInformation.setEmail(informationDetails.getEmail());
        existingInformation.setStatus(informationDetails.getStatus());
        existingInformation.setDateSend(informationDetails.getDateSend());
        existingInformation.setText(informationDetails.getText());
        existingInformation.setPhone(informationDetails.getPhone());
        return Optional.of(dao.save(existingInformation));
    }
    
    /**
     * Deletes an information by their unique ID.
     *
     * @param id the ID of the information to be deleted
     * @return true if the information was successfully deleted, false otherwise
     */
    @Override
    public boolean deleteInformation(Integer id) {
        if (dao.existsById(id)) {
            dao.deleteById(id);
            return true;
        }
        throw new IllegalArgumentException/*UserNotFoundException*/("Information with ID " + id + " not found.");
    }
       
    /**
     * Retrieves a list of informations with a specific status
     * 
     * @param status the name of the status for which the informations is to be retrieved
     * @return a List containing the Information objects if found, or an empty List if not found
     */
    @Override
    public List<Information> getInformationsByStatus(String status) {
        if (status == null || status.trim().isEmpty()) {
            throw new IllegalArgumentException("Status cannot be null or empty");
        }
        List<Information> informations = dao.findByStatus(status);
        if (informations.isEmpty()) {
            throw new IllegalArgumentException/*CardNotFoundException*/("No informations found for status: " + status);
        }
        return informations;
        }
        
    
    /**
     * Retrieves a list of informations with a specific date send
     * 
     * @param datesend the date send for which the informations is to be retrieved
     * @return a List containing the Information objects if found, or an empty List if not found
     */
    @Override
    public List<Information> getInformationsByDateSend(LocalDate datesend) {
        if (datesend == null) {
            throw new IllegalArgumentException("Datesend cannot be null or empty");
        }
        List<Information> informations = dao.findByDateSend(datesend);
        if (informations.isEmpty()) {
            throw new IllegalArgumentException/*CardNotFoundException*/("No informations found for status: " + datesend);
        }
        return informations;
        }


	
}
