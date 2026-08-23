package com.absfitness.controller;

import com.absfitness.dto.GoogleReviewDto;
import com.absfitness.service.GoogleReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reviews")
public class GoogleReviewController {

    private final GoogleReviewService googleReviewService;

    public GoogleReviewController(GoogleReviewService googleReviewService) {
        this.googleReviewService = googleReviewService;
    }

    @GetMapping("/google")
    public List<GoogleReviewDto> getAllGoogleReviews() {
        return googleReviewService.getAllGoogleReviews();
    }
}