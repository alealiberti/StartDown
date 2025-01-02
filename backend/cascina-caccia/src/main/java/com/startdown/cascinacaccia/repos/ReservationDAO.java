package com.startdown.cascinacaccia.repos;

import com.startdown.cascinacaccia.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationDAO extends JpaRepository<Reservation, Integer> {
}
