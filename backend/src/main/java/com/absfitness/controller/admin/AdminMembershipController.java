package com.absfitness.controller.admin;

import com.absfitness.dto.MembershipPlanDto;
import com.absfitness.service.MembershipService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/membership-plans")
@PreAuthorize("hasRole('ADMIN')")
public class AdminMembershipController {

    private final MembershipService membershipService;

    public AdminMembershipController(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    @GetMapping
    public ResponseEntity<List<MembershipPlanDto>> getAllMembershipPlans() {
        List<MembershipPlanDto> plans = membershipService.getAllActiveMembershipPlans();
        return ResponseEntity.ok(plans);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MembershipPlanDto> getMembershipPlanById(@PathVariable Long id) {
        MembershipPlanDto plan = membershipService.getMembershipPlanById(id);
        return ResponseEntity.ok(plan);
    }

    @PostMapping
    public ResponseEntity<MembershipPlanDto> createMembershipPlan(@RequestBody MembershipPlanDto membershipPlanDto) {
        MembershipPlanDto createdPlan = membershipService.createMembershipPlan(membershipPlanDto);
        return new ResponseEntity<>(createdPlan, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MembershipPlanDto> updateMembershipPlan(@PathVariable Long id, @RequestBody MembershipPlanDto membershipPlanDto) {
        MembershipPlanDto updatedPlan = membershipService.updateMembershipPlan(id, membershipPlanDto);
        return ResponseEntity.ok(updatedPlan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMembershipPlan(@PathVariable Long id) {
        membershipService.deleteMembershipPlan(id);
        return ResponseEntity.noContent().build();
    }
}