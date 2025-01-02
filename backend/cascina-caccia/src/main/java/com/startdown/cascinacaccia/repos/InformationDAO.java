package com.startdown.cascinacaccia.repos;

import com.startdown.cascinacaccia.entities.Information;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InformationDAO extends JpaRepository<Information, Integer> {
}
