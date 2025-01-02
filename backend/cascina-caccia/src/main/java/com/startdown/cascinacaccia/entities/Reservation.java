package com.startdown.cascinacaccia.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// entity class representing the table "reservations" in the database
@Entity
@Table(name = "reservations")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Reservation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	// auto increment for primary key
	@Column(name = "id", nullable = false)
	private Integer id;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "surname", nullable = false)
	private String surname;
	
	@Column(name = "phone")
	private String phone;
	
	@Column(name = "email", nullable = false)
	private String email;
	
    @Column(name = "date_start", nullable = false)
    private LocalDate dateStart;
    
    @Column(name = "date_finish")
    private LocalDate dateFinish;
    
    @Column(name = "hour_start")
    private LocalTime hourStart;

    @Column(name = "hour_finish")
    private LocalTime hourFinish;
    
    @Column(name = "status", nullable = false)
	private String status;
    
    @Column(name = "visitors", nullable = false)
    private Integer visitors;
    
    @Column(name = "additional_info")
    private String additionalInfo;
    
}
