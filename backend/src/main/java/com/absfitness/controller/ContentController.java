package com.absfitness.controller;

import com.absfitness.dto.CreateEnquiryRequest;
import com.absfitness.dto.EnquiryDto;
import com.absfitness.dto.TestimonialDto;
import com.absfitness.service.ContentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/content")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/testimonials")
    public ResponseEntity<List<TestimonialDto>> getAllTestimonials() {
        List<TestimonialDto> testimonials = contentService.getAllTestimonials();
        return ResponseEntity.ok(testimonials);
    }

    @PostMapping("/enquiries")
    public ResponseEntity<EnquiryDto> submitEnquiry(@Valid @RequestBody CreateEnquiryRequest request) {
        EnquiryDto enquiry = contentService.submitEnquiry(request);
        return new ResponseEntity<>(enquiry, HttpStatus.CREATED);
    }
}