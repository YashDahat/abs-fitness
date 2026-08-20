package com.absfitness.repository;

import com.absfitness.model.Booking;
import com.absfitness.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByMemberIdOrderByBookingTimeDesc(UUID memberId);
    List<Booking> findByFitnessClassId(UUID fitnessClassId);
    int countByFitnessClassIdAndStatus(UUID fitnessClassId, BookingStatus status);
}