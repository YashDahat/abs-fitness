package com.absfitness.controller.admin;

import com.absfitness.dto.InquiryDto;
import com.absfitness.service.InquiryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/inquiries")
public class AdminInquiryController {

    private final InquiryService inquiryService;

    public AdminInquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @GetMapping
    public List<InquiryDto> getAllInquiries() {
        return inquiryService.getAllInquiries();
    }

    @GetMapping("/{id}")
    public InquiryDto getInquiryById(@PathVariable Long id) {
        return inquiryService.getInquiryById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteInquiry(@PathVariable Long id) {
        inquiryService.deleteInquiry(id);
    }
}