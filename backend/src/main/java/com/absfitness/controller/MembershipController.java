package com.absfitness.controller;

import com.absfitness.dto.CreateSubscriptionRequest;
import com.absfitness.dto.MemberSubscriptionDto;
import com.absfitness.dto.MembershipPlanDto;
import com.absfitness.service.MembershipService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.absfitness.security.CurrentUser;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/v1/memberships")
public class MembershipController {

    private final MembershipService membershipService;

    public MembershipController(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    @GetMapping("/plans")
    public ResponseEntity<List<MembershipPlanDto>> getAllActiveMembershipPlans() {
        List<MembershipPlanDto> plans = membershipService.getAllActiveMembershipPlans();
        return ResponseEntity.ok(plans);
    }

    @GetMapping("/plans/{id}")
    public ResponseEntity<MembershipPlanDto> getMembershipPlanById(@PathVariable Long id) {
        MembershipPlanDto plan = membershipService.getMembershipPlanById(id);
        return ResponseEntity.ok(plan);
    }

    @PostMapping("/subscribe")
    public ResponseEntity<MemberSubscriptionDto> createSubscription(@Valid @RequestBody CreateSubscriptionRequest request, @CurrentUser Integer userId) {
        request.setUserId(userId);
        MemberSubscriptionDto subscription = membershipService.createSubscription(request);
        return new ResponseEntity<>(subscription, HttpStatus.CREATED);
    }
}