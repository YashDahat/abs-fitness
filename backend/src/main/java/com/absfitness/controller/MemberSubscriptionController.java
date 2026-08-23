package com.absfitness.controller;

import com.absfitness.dto.MemberSubscriptionDto;
import com.absfitness.service.MemberSubscriptionService;
import com.absfitness.security.CurrentUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/member-subscriptions")
public class MemberSubscriptionController {

    private final MemberSubscriptionService memberSubscriptionService;

    public MemberSubscriptionController(MemberSubscriptionService memberSubscriptionService) {
        this.memberSubscriptionService = memberSubscriptionService;
    }

    @GetMapping
    public List<MemberSubscriptionDto> getMemberSubscriptions(@CurrentUser Integer userId) {
        return memberSubscriptionService.getMemberSubscriptions(userId);
    }

    @GetMapping("/{id}")
    public MemberSubscriptionDto getMemberSubscriptionById(@PathVariable Long id, @CurrentUser Integer userId) {
        return memberSubscriptionService.getMemberSubscriptionById(id, userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MemberSubscriptionDto createMemberSubscription(@RequestBody CreateSubscriptionRequestDto createDto, @CurrentUser Integer userId) {
        return memberSubscriptionService.createMemberSubscription(userId, createDto.getMembershipPlanId());
    }

    @PutMapping("/{id}/cancel")
    public MemberSubscriptionDto cancelMemberSubscription(@PathVariable Long id, @CurrentUser Integer userId) {
        return memberSubscriptionService.cancelMemberSubscription(id, userId);
    }

    // DTO for createMemberSubscription request body
    private static class CreateSubscriptionRequestDto {
        private Long membershipPlanId;

        public Long getMembershipPlanId() {
            return membershipPlanId;
        }

        public void setMembershipPlanId(Long membershipPlanId) {
            this.membershipPlanId = membershipPlanId;
        }
    }
}