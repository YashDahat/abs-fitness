package com.absfitness.repository;

import com.absfitness.model.FitnessClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface FitnessClassRepository extends JpaRepository<FitnessClass, Long> {
    List<FitnessClass> findByTrainerId(Long trainerId);

    @Query("SELECT fc FROM FitnessClass fc WHERE fc.scheduleTime > :currentTime AND fc.bookedSlots < fc.capacity ORDER BY fc.scheduleTime ASC")
    List<FitnessClass> findAvailableClasses(@Param("currentTime") LocalDateTime currentTime);
}