package com.startdown.cascinacaccia.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
/* The InformationDTO class represents the entity "Information"
    with some adjustments to give to the frontend the correct type of data */
public class InformationDTO {
    private Integer id;

    private String name;

    private String surname;

    private String phone;

    private String email;

    private String dateSend;

    private String text;

    private String status;
}
