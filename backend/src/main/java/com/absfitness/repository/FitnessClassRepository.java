package com.absfitness.repository;

import com.absfitness.model.FitnessClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface FitnessClassRepository extends JpaRepository<FitnessClass, UUID> {
    List<FitnessClass> findByTrainerId(UUID trainerId);
    List<FitnessClass> findByDayOfWeekAndStartTime(DayOfWeek dayOfWeek, LocalTime startTime);
}