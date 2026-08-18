package com.absfitness.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.absfitness.model.BookingStatus;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDto {
    private Long id;
    private Integer userId;
    private Long gymClassId;
    private String gymClassName;
    private LocalDateTime gymClassStartTime;
    private LocalDateTime gymClassEndTime;
    private String trainerName;
    private LocalDateTime bookingTime;
    private BookingStatus status;
}
