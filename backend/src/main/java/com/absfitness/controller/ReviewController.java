package com.absfitness.controller;

import com.absfitness.dto.ReviewDto;
import com.absfitness.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<List<ReviewDto>> getApprovedReviews() {
        List<ReviewDto> reviews = reviewService.getApprovedReviews();
        return ResponseEntity.ok(reviews);
    }
}