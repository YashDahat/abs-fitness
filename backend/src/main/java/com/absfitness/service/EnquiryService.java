package com.absfitness.service;

import com.absfitness.dto.EnquiryDto;
import com.absfitness.model.Enquiry;
import com.absfitness.repository.EnquiryRepository;
import com.absfitness.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;

    public EnquiryService(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    public EnquiryDto createEnquiry(EnquiryDto enquiryDto) {
        Enquiry enquiry = new Enquiry();
        enquiry.setName(enquiryDto.getName());
        enquiry.setEmail(enquiryDto.getEmail());
        enquiry.setPhone(enquiryDto.getPhone());
        enquiry.setMessage(enquiryDto.getMessage());
        // createdAt is set in the Enquiry constructor
        Enquiry savedEnquiry = enquiryRepository.save(enquiry);
        return mapToDto(savedEnquiry);
    }

    public List<EnquiryDto> getAllEnquiries() {
        return enquiryRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public EnquiryDto getEnquiryById(UUID id) {
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with id: " + id));
        return mapToDto(enquiry);
    }

    private EnquiryDto mapToDto(Enquiry enquiry) {
        return EnquiryDto.builder()
                .id(enquiry.getId())
                .name(enquiry.getName())
                .email(enquiry.getEmail())
                .phone(enquiry.getPhone())
                .message(enquiry.getMessage())
                .createdAt(LocalDateTime.ofInstant(enquiry.getCreatedAt(), ZoneOffset.UTC))
                .build();
    }
}