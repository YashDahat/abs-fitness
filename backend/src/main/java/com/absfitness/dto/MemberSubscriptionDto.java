package com.absfitness.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.absfitness.model.SubscriptionStatus;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberSubscriptionDto {
    private Long id;
    private Integer userId;
    private Long membershipPlanId;
    private String membershipPlanName;
    private java.time.LocalDate startDate;
    private java.time.LocalDate endDate;
    private SubscriptionStatus status;
    private String paymentId;
}
