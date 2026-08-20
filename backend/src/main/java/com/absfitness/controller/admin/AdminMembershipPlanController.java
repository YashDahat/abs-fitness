package com.absfitness.controller.admin;

import com.absfitness.dto.MembershipPlanDto;
import com.absfitness.service.MembershipPlanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/membership-plans")
public class AdminMembershipPlanController {

    private final MembershipPlanService membershipPlanService;

    public AdminMembershipPlanController(MembershipPlanService membershipPlanService) {
        this.membershipPlanService = membershipPlanService;
    }

    @PostMapping
    public ResponseEntity<MembershipPlanDto> createMembershipPlan(@RequestBody MembershipPlanDto planDto) {
        MembershipPlanDto createdPlan = membershipPlanService.createMembershipPlan(planDto);
        return new ResponseEntity<>(createdPlan, HttpStatus.CREATED);
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

    @PutMapping("/{id}")
    public ResponseEntity<MembershipPlanDto> updateMembershipPlan(@PathVariable UUID id, @RequestBody MembershipPlanDto planDto) {
        MembershipPlanDto updatedPlan = membershipPlanService.updateMembershipPlan(id, planDto);
        return ResponseEntity.ok(updatedPlan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMembershipPlan(@PathVariable UUID id) {
        membershipPlanService.deleteMembershipPlan(id);
        return ResponseEntity.noContent().build();
    }
}