package com.absfitness.controller;

import com.absfitness.dto.MembershipPlanDto;
import com.absfitness.service.MembershipPlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/membership-plans")
public class MembershipPlanController {

    private final MembershipPlanService membershipPlanService;

    public MembershipPlanController(MembershipPlanService membershipPlanService) {
        this.membershipPlanService = membershipPlanService;
    }

    @GetMapping
    public ResponseEntity<List<MembershipPlanDto>> getAllMembershipPlans() {
        List<MembershipPlanDto> plans = membershipPlanService.getAllMembershipPlans();
        return ResponseEntity.ok(plans);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MembershipPlanDto> getMembershipPlanById(@PathVariable UUID id) {
        MembershipPlanDto plan = membershipPlanService.getMembershipPlanById(id);
        return ResponseEntity.ok(plan);
    }
}