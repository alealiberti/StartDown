package com.startdown.cascinacaccia.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;

// entity class representing the table "informations" in the database
@Entity
@Table(name = "informations")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Information {

	@Id
	@NotEmpty
	@Schema(description = "The id is generated by auto increment")
	@GeneratedValue(strategy = GenerationType.IDENTITY)	// auto increment for primary key
	@Column(name = "id", nullable = false)
	private Integer id;
	
	@NotEmpty
	@Column(name = "name", nullable = false)
	private String name;
	
	@NotEmpty
	@Column(name = "surname", nullable = false)
	private String surname;
	
	@Column(name = "phone")
	private String phone;
	
	@NotEmpty
	@Column(name = "email", nullable = false)
	private String email;

	@NotEmpty
	@Column(name = "date_send", nullable = false)
	private LocalDate dateSend;
	
	@NotEmpty
	@Column(name = "text", nullable = false)
	private String text;
	
	@NotEmpty
	@Column(name = "archived", nullable = false)
	private boolean archived;
	
}
