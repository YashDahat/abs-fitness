package com.absfitness.repository;

import com.absfitness.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByAuthorNameAndText(String authorName, String text);
    List<Review> findAllByOrderByTimeDesc();
}