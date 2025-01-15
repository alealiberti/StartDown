package com.startdown.cascinacaccia.services;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

/* The DateConverterService class provides the methods to convert dates
    from the frontend formatted ones to the backend and vice versa */
@Service
public class DateConverterService {
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");

    /**
     * Parses the date from the one received from the frontend to the DB format
     *
     * @param date the date received
     * @return a LocalDate object with the corresponding date or throws an exception if the format given is not valid
     */
    public LocalDate parseDate(String date) {
        try{
            return LocalDate.parse(date, formatter);
        } catch (DateTimeParseException e){
            throw new IllegalArgumentException("Invalid date format: " + date, e);
        }
    }

    /**
     * Format the date from the DB format to the frontend one
     *
     * @param localDate the date to format
     * @return the formatted date
     */
    public String formatDateToFrontend(LocalDate localDate) {
        return localDate.format(formatter);
    }

}
