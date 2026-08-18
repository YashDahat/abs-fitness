package com.absfitness.service;

import com.absfitness.dto.CreateEnquiryRequest;
import com.absfitness.dto.EnquiryDto;
import com.absfitness.dto.TestimonialDto;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.model.Enquiry;
import com.absfitness.model.EnquiryStatus;
import com.absfitness.model.Testimonial;
import com.absfitness.repository.EnquiryRepository;
import com.absfitness.repository.TestimonialRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ContentService {

    private final TestimonialRepository testimonialRepository;
    private final EnquiryRepository enquiryRepository;

    public ContentService(TestimonialRepository testimonialRepository, EnquiryRepository enquiryRepository) {
        this.testimonialRepository = testimonialRepository;
        this.enquiryRepository = enquiryRepository;
    }

    public TestimonialDto createTestimonial(TestimonialDto testimonialDto) {
        Testimonial testimonial = new Testimonial();
        testimonial.setAuthorName(testimonialDto.getAuthorName());
        testimonial.setQuote(testimonialDto.getQuote());
        testimonial.setImageUrl(testimonialDto.getImageUrl());
        testimonial.setDisplayOrder(testimonialDto.getDisplayOrder());
        Testimonial savedTestimonial = testimonialRepository.save(testimonial);
        return mapToTestimonialDto(savedTestimonial);
    }

    public TestimonialDto getTestimonialById(UUID id) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));
        return mapToTestimonialDto(testimonial);
    }

    public List<TestimonialDto> getAllTestimonials() {
        return testimonialRepository.findAll().stream()
                .sorted(Comparator.comparing(Testimonial::getDisplayOrder))
                .map(this::mapToTestimonialDto)
                .collect(Collectors.toList());
    }

    public TestimonialDto updateTestimonial(UUID id, TestimonialDto testimonialDto) {
        Testimonial existingTestimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));

        existingTestimonial.setAuthorName(testimonialDto.getAuthorName());
        existingTestimonial.setQuote(testimonialDto.getQuote());
        existingTestimonial.setImageUrl(testimonialDto.getImageUrl());
        existingTestimonial.setDisplayOrder(testimonialDto.getDisplayOrder());

        Testimonial updatedTestimonial = testimonialRepository.save(existingTestimonial);
        return mapToTestimonialDto(updatedTestimonial);
    }

    public void deleteTestimonial(UUID id) {
        if (!testimonialRepository.existsById(id)) {
            throw new ResourceNotFoundException("Testimonial not found with id: " + id);
        }
        testimonialRepository.deleteById(id);
    }

    public EnquiryDto submitEnquiry(CreateEnquiryRequest request) {
        Enquiry enquiry = new Enquiry();
        enquiry.setName(request.getName());
        enquiry.setEmail(request.getEmail());
        enquiry.setPhone(request.getPhone());
        enquiry.setMessage(request.getMessage());
        enquiry.setSubmissionTime(LocalDateTime.now());
        enquiry.setStatus(EnquiryStatus.NEW);
        Enquiry savedEnquiry = enquiryRepository.save(enquiry);
        return mapToEnquiryDto(savedEnquiry);
    }

    public List<EnquiryDto> getAllEnquiries() {
        return enquiryRepository.findAll().stream()
                .map(this::mapToEnquiryDto)
                .collect(Collectors.toList());
    }

    public EnquiryDto updateEnquiryStatus(UUID id, EnquiryStatus newStatus) {
        Enquiry existingEnquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with id: " + id));
        existingEnquiry.setStatus(newStatus);
        Enquiry updatedEnquiry = enquiryRepository.save(existingEnquiry);
        return mapToEnquiryDto(updatedEnquiry);
    }

    private TestimonialDto mapToTestimonialDto(Testimonial testimonial) {
        return TestimonialDto.builder()
                .id(testimonial.getId())
                .authorName(testimonial.getAuthorName())
                .quote(testimonial.getQuote())
                .imageUrl(testimonial.getImageUrl())
                .displayOrder(testimonial.getDisplayOrder())
                .build();
    }

    private EnquiryDto mapToEnquiryDto(Enquiry enquiry) {
        return EnquiryDto.builder()
                .id(enquiry.getId())
                .name(enquiry.getName())
                .email(enquiry.getEmail())
                .phone(enquiry.getPhone())
                .message(enquiry.getMessage())
                .submissionTime(enquiry.getSubmissionTime())
                .status(enquiry.getStatus())
                .build();
    }
}