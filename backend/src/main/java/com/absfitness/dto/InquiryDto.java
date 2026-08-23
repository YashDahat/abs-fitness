package com.absfitness.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.absfitness.model.InquiryType;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InquiryDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private InquiryType inquiryType;
    private String message;
    private LocalDateTime submissionTime;
}
