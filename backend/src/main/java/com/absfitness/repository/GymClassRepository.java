package com.absfitness.repository;

import com.absfitness.model.GymClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface GymClassRepository extends JpaRepository<GymClass, Long> {
    List<GymClass> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    List<GymClass> findByTrainerId(UUID trainerId);
}