package com.absfitness.service;

import com.absfitness.dto.CreateInquiryRequest;
import com.absfitness.dto.InquiryDto;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.model.Inquiry;
import com.absfitness.repository.InquiryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InquiryService {

    private final InquiryRepository inquiryRepository;

    public InquiryService(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    public InquiryDto createInquiry(CreateInquiryRequest createInquiryRequest) {
        Inquiry inquiry = new Inquiry();
        inquiry.setName(createInquiryRequest.getName());
        inquiry.setEmail(createInquiryRequest.getEmail());
        inquiry.setPhone(createInquiryRequest.getPhone());
        inquiry.setInquiryType(createInquiryRequest.getInquiryType());
        inquiry.setMessage(createInquiryRequest.getMessage());
        inquiry.setSubmissionTime(LocalDateTime.now());

        Inquiry savedInquiry = inquiryRepository.save(inquiry);
        return mapToDto(savedInquiry);
    }

    public List<InquiryDto> getAllInquiries() {
        return inquiryRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public InquiryDto getInquiryById(Long id) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found with id: " + id));
        return mapToDto(inquiry);
    }

    public void deleteInquiry(Long id) {
        if (!inquiryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Inquiry not found with id: " + id);
        }
        inquiryRepository.deleteById(id);
    }

    private InquiryDto mapToDto(Inquiry inquiry) {
        return InquiryDto.builder()
                .id(inquiry.getId())
                .name(inquiry.getName())
                .email(inquiry.getEmail())
                .phone(inquiry.getPhone())
                .inquiryType(inquiry.getInquiryType())
                .message(inquiry.getMessage())
                .submissionTime(inquiry.getSubmissionTime())
                .build();
    }
}