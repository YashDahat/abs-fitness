package com.absfitness.service;

import com.absfitness.dto.ReviewDto;
import com.absfitness.model.Review;
import com.absfitness.repository.ReviewRepository;
import com.absfitness.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public ReviewDto createReview(ReviewDto reviewDto) {
        Review review = new Review();
        review.setAuthor(reviewDto.getAuthor());
        review.setContent(reviewDto.getComment());
        review.setRating(reviewDto.getRating());
        review.setReviewDate(Instant.now());
        review.setApproved(false); // New reviews are not approved by default
        Review savedReview = reviewRepository.save(review);
        return convertToDto(savedReview);
    }

    public List<ReviewDto> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ReviewDto> getApprovedReviews() {
        return reviewRepository.findByApprovedTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ReviewDto getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));
        return convertToDto(review);
    }

    public ReviewDto updateReview(Long id, ReviewDto reviewDto) {
        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));

        existingReview.setAuthor(reviewDto.getAuthor());
        existingReview.setContent(reviewDto.getComment());
        existingReview.setRating(reviewDto.getRating());
        // reviewDate is not updated here as it represents the original review date
        // existingReview.setApproved(reviewDto.getApproved()); // Approval status handled separately by admin

        Review updatedReview = reviewRepository.save(existingReview);
        return convertToDto(updatedReview);
    }

    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new ResourceNotFoundException("Review not found with id: " + id);
        }
        reviewRepository.deleteById(id);
    }

    public ReviewDto approveReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));
        review.setApproved(true);
        Review approvedReview = reviewRepository.save(review);
        return convertToDto(approvedReview);
    }

    private ReviewDto convertToDto(Review review) {
        return ReviewDto.builder()
                .id(review.getId())
                .author(review.getAuthor())
                .comment(review.getContent())
                .rating(review.getRating())
                .createdAt(LocalDateTime.ofInstant(review.getReviewDate(), ZoneOffset.UTC))
                .build();
    }
}