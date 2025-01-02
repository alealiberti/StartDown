package com.startdown.cascinacaccia.entities;

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

@Entity
@Table(name = "information")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Information {

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
	
	@Column(name = "text", nullable = false)
	private String text;
	
	@Column(name = "status", nullable = false)
	private String status;
	
}
