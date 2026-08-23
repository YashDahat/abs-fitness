package com.absfitness.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FitnessClassDto {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime scheduleTime;
    private Integer durationMinutes;
    private Integer capacity;
    private Integer bookedSlots;
    private Long trainerId;
    private String trainerName;
}
