package com.absfitness.repository;

import com.absfitness.model.Booking;
import com.absfitness.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Integer userId);
    Optional<Booking> findByUserIdAndGymClassIdAndStatusIn(Integer userId, Long gymClassId, List<BookingStatus> statuses);
    int countByGymClassIdAndStatus(Long gymClassId, BookingStatus status);
}