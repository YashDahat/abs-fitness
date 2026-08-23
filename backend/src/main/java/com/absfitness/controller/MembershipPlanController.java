package com.absfitness.controller;

import com.absfitness.dto.MembershipPlanDto;
import com.absfitness.service.MembershipPlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/membership-plans")
public class MembershipPlanController {

    private final MembershipPlanService membershipPlanService;

    public MembershipPlanController(MembershipPlanService membershipPlanService) {
        this.membershipPlanService = membershipPlanService;
    }

    @GetMapping
    public List<MembershipPlanDto> getActiveMembershipPlans() {
        return membershipPlanService.getActiveMembershipPlans();
    }

    @GetMapping("/{id}")
    public MembershipPlanDto getMembershipPlanById(@PathVariable Long id) {
        return membershipPlanService.getMembershipPlanById(id);
    }
}