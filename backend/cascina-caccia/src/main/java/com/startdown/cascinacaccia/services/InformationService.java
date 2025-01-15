package com.startdown.cascinacaccia.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.startdown.cascinacaccia.entities.Information;
import com.startdown.cascinacaccia.entities.InformationDTO;
import com.startdown.cascinacaccia.exceptions.InformationNotFoundException;
import com.startdown.cascinacaccia.repos.InformationDAO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * The InformationService defines the contract for information-related operations.
 * It provides methods for managing informations in the application, including
 * retrieval, creation, updating, and deletion of information entities.
 */
@Service
public class InformationService {

    @Autowired
    private InformationDAO dao;
    @Autowired
    private EmailService emailservice;
    @Autowired
    private DateConverterService dateConverterService;

    /**
     * given a List of Informations creates a List of InformationDTOs
     *
     * @param informations the list to convert
     * @return the converted list
     */
    private List<InformationDTO> convertToDTOList(List<Information> informations) {
        return informations.stream()
                .map(information -> new InformationDTO(
                        information.getId(),
                        information.getName(),
                        information.getSurname(),
                        information.getPhone(),
                        information.getEmail(),
                        dateConverterService.formatDateToFrontend(information.getDateSend()),
                        information.getText(),
                        information.getStatus()
                ))
                .collect(Collectors.toList());
    };

    /**
     * Retrieves a list of all informations in the system.
     *
     * @return a List of InformationsDTO objects
     */
    public List<InformationDTO> getAllInformations() {
        List<Information> informations = dao.findAll();
        return convertToDTOList(informations);
    }

    /**
     * Retrieves a information by their unique ID.
     *
     * @param id the ID of the information to be retrieved
     * @return an Optional containing the InformationDTO object if found, or an empty Optional if not found
     */
    public Optional<InformationDTO> getInformationById(Integer id) {
        Optional<Information> info = dao.findById(id);
        if (info.isPresent()) {
            Information information = info.get();
            return Optional.of(new InformationDTO(
                    information.getId(),
                    information.getName(),
                    information.getSurname(),
                    information.getPhone(),
                    information.getEmail(),
                    dateConverterService.formatDateToFrontend(information.getDateSend()),
                    information.getText(),
                    information.getStatus()
            ));
        } else {
            throw new InformationNotFoundException("Information with ID " + id + " not found.");
        }
    }

    /**
     * Creates a new information in the system.
     *
     * @param information the Information object containing the details of the new information
     * @return the created Information object
     */
    @Transactional
    public Information createInformation(Information information) {
        // Validate non-empty name,surname,email,text
        if (information.getName() == null || information.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty.");
        }
        if (information.getSurname() == null || information.getSurname().trim().isEmpty()) {
            throw new IllegalArgumentException("Surname cannot be empty.");
        }
        if (information.getEmail() == null || information.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty.");
        }
        if (information.getText() == null || information.getText().trim().isEmpty()) {
            throw new IllegalArgumentException("Text cannot be empty.");
        }

        information.setStatus("Ricevuta");
        information.setDateSend(LocalDate.now());

        emailservice.sendEmails(information.getEmail(), true);

        //Save the information
        return dao.save(information);
    }

    /**
     * Updates the details of an existing information.
     *
     * @param id the ID of the information to be updated
     * @param informationDetails the InformationDTO object containing the updated details
     * @return an Optional containing the updated Information object if successful, or an empty Optional if the information was not found
     */
    @Transactional
    public Optional<Information> updateInformation(Integer id, InformationDTO informationDetails) {
        Information existingInformation = dao.findById(id)
                .orElseThrow(() -> new InformationNotFoundException("Information with ID " + id + " not found."));

        // Set only if the values are not null or empty
        if (informationDetails.getName() != null && !informationDetails.getName().trim().isEmpty()) {
            existingInformation.setName(informationDetails.getName());
        }
        if (informationDetails.getSurname() != null && !informationDetails.getSurname().trim().isEmpty()) {
            existingInformation.setSurname(informationDetails.getSurname());
        }
        if (informationDetails.getStatus() != null && !informationDetails.getStatus().trim().isEmpty()) {
            existingInformation.setStatus(informationDetails.getStatus());
        }
        if (informationDetails.getEmail() != null && !informationDetails.getEmail().trim().isEmpty()) {
            existingInformation.setEmail(informationDetails.getEmail());
        }
        if (informationDetails.getText() != null && !informationDetails.getText().trim().isEmpty()) {
            existingInformation.setText(informationDetails.getText());
        }
        if (informationDetails.getDateSend() != null) {
            existingInformation.setDateSend(dateConverterService.parseDate(informationDetails.getDateSend()));
        }
        if (informationDetails.getPhone() != null && !informationDetails.getPhone().trim().isEmpty()) {
            existingInformation.setPhone(informationDetails.getPhone());
        }

        return Optional.of(dao.save(existingInformation));
    }

    /**
     * Deletes an information by their unique ID.
     *
     * @param id the ID of the information to be deleted
     * @return true if the information was successfully deleted, false otherwise
     */
    public boolean deleteInformation(Integer id) {
        if (dao.existsById(id)) {
            dao.deleteById(id);
            return true;
        }
        throw new InformationNotFoundException("Information with ID " + id + " not found.");
    }

    /**
     * Retrieves a list of informations with a specific status
     *
     * @param status the name of the status for which the informations is to be retrieved
     * @return a List containing the InformationDTO objects if found, or an empty List if not found
     */
    public List<InformationDTO> getInformationsByStatus(String status) {
        List<Information> informations = dao.findByStatus(status);
        return convertToDTOList(informations);
    }

    /**
     * Retrieves a list of all informations sorted in descending order by date send
     *
     * @return a List containing the InformationDTO objects if found, or an empty List if not found
     */
    public List<InformationDTO> findByOrderByDateSendDesc() {
        List<Information> informations = dao.findByOrderByDateSendDesc();
        return convertToDTOList(informations);
    }

}
