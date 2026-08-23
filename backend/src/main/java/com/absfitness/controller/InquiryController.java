package com.absfitness.controller;

import com.absfitness.dto.CreateInquiryRequest;
import com.absfitness.dto.InquiryDto;
import com.absfitness.service.InquiryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/inquiries")
public class InquiryController {

    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @PostMapping
    public ResponseEntity<InquiryDto> createInquiry(@RequestBody CreateInquiryRequest createInquiryRequest) {
        InquiryDto createdInquiry = inquiryService.createInquiry(createInquiryRequest);
        return new ResponseEntity<>(createdInquiry, HttpStatus.CREATED);
    }
}