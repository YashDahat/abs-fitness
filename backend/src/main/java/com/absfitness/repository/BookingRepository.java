package com.absfitness.repository;

import com.absfitness.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Integer userId);
    boolean existsByFitnessClass_IdAndUserIdAndStatus(Long fitnessClassId, Integer userId, BookingStatus status);
    List<Booking> findByStatusAndFitnessClass_ScheduleTimeBetween(BookingStatus status, LocalDateTime start, LocalDateTime end);
    Optional<Booking> findByIdAndUserId(Long id, Integer userId);
}