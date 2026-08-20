package com.absfitness.controller.admin;

import com.absfitness.dto.EnquiryDto;
import com.absfitness.service.EnquiryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/enquiries")
public class AdminEnquiryController {

    private final EnquiryService enquiryService;

    public AdminEnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @GetMapping
    public ResponseEntity<List<EnquiryDto>> getAllEnquiries() {
        List<EnquiryDto> enquiries = enquiryService.getAllEnquiries();
        return ResponseEntity.ok(enquiries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnquiryDto> getEnquiryById(@PathVariable UUID id) {
        EnquiryDto enquiry = enquiryService.getEnquiryById(id);
        return ResponseEntity.ok(enquiry);
    }
}