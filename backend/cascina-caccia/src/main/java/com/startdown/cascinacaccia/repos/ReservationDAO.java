package com.startdown.cascinacaccia.repos;

import com.startdown.cascinacaccia.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

/*
The ReservationDAO interface provides methods for accessing and manipulating reservations entities in the database.
It extends JpaRepository, allowing for CRUD operations and more.
*/
public interface ReservationDAO extends JpaRepository<Reservation, Integer> {
}
