package com.startdown.cascinacaccia.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
/* The ReservationDTO class represents the entity "Reservation"
    with some adjustments to give to the frontend the correct type of data */
public class ReservationDTO {
    private Integer id;

    private String name;

    private String surname;

    private String phone;

    private String email;

    private String dateSend;

    private String dateStart;

    private String dateFinish;

    private LocalTime hourStart;

    private LocalTime hourFinish;

    private String status;

    private String typeGroup;

    private Integer visitors;

    private Integer companions;

    private String additionalInfo;

    private boolean mobilityProblems;

    private boolean archived;

}
