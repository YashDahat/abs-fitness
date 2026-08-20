package com.absfitness.controller;

import com.absfitness.dto.EnquiryDto;
import com.absfitness.service.EnquiryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/enquiries")
public class EnquiryController {

    private final EnquiryService enquiryService;

    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @PostMapping
    public ResponseEntity<EnquiryDto> createEnquiry(@RequestBody EnquiryDto enquiryDto) {
        EnquiryDto createdEnquiry = enquiryService.createEnquiry(enquiryDto);
        return new ResponseEntity<>(createdEnquiry, HttpStatus.CREATED);
    }
}