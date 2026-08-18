package com.absfitness.controller.admin;

import com.absfitness.dto.EnquiryDto;
import com.absfitness.dto.TestimonialDto;
import com.absfitness.model.EnquiryStatus;
import com.absfitness.service.ContentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/content")
public class AdminContentController {

    private final ContentService contentService;

    public AdminContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/testimonials")
    public ResponseEntity<List<TestimonialDto>> getAllTestimonials() {
        List<TestimonialDto> testimonials = contentService.getAllTestimonials();
        return ResponseEntity.ok(testimonials);
    }

    @GetMapping("/testimonials/{id}")
    public ResponseEntity<TestimonialDto> getTestimonialById(@PathVariable UUID id) {
        TestimonialDto testimonial = contentService.getTestimonialById(id);
        return ResponseEntity.ok(testimonial);
    }

    @PostMapping("/testimonials")
    public ResponseEntity<TestimonialDto> createTestimonial(@Valid @RequestBody TestimonialDto testimonialDto) {
        TestimonialDto createdTestimonial = contentService.createTestimonial(testimonialDto);
        return new ResponseEntity<>(createdTestimonial, HttpStatus.CREATED);
    }

    @PutMapping("/testimonials/{id}")
    public ResponseEntity<TestimonialDto> updateTestimonial(@PathVariable UUID id, @Valid @RequestBody TestimonialDto testimonialDto) {
        TestimonialDto updatedTestimonial = contentService.updateTestimonial(id, testimonialDto);
        return ResponseEntity.ok(updatedTestimonial);
    }

    @DeleteMapping("/testimonials/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable UUID id) {
        contentService.deleteTestimonial(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/enquiries")
    public ResponseEntity<List<EnquiryDto>> getAllEnquiries() {
        List<EnquiryDto> enquiries = contentService.getAllEnquiries();
        return ResponseEntity.ok(enquiries);
    }

    @PutMapping("/enquiries/{id}/status")
    public ResponseEntity<EnquiryDto> updateEnquiryStatus(@PathVariable UUID id, @RequestParam EnquiryStatus newStatus) {
        EnquiryDto updatedEnquiry = contentService.updateEnquiryStatus(id, newStatus);
        return ResponseEntity.ok(updatedEnquiry);
    }
}