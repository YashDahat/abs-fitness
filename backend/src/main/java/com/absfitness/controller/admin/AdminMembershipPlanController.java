package com.absfitness.controller.admin;

import com.absfitness.dto.MembershipPlanDto;
import com.absfitness.service.MembershipPlanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/membership-plans")
public class AdminMembershipPlanController {

    private final MembershipPlanService membershipPlanService;

    public AdminMembershipPlanController(MembershipPlanService membershipPlanService) {
        this.membershipPlanService = membershipPlanService;
    }

    @GetMapping
    public List<MembershipPlanDto> getAllMembershipPlans() {
        return membershipPlanService.getAllMembershipPlans();
    }

    @GetMapping("/{id}")
    public MembershipPlanDto getMembershipPlanById(@PathVariable Long id) {
        return membershipPlanService.getMembershipPlanById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MembershipPlanDto createMembershipPlan(@RequestBody MembershipPlanDto membershipPlanDto) {
        return membershipPlanService.createMembershipPlan(membershipPlanDto);
    }

    @PutMapping("/{id}")
    public MembershipPlanDto updateMembershipPlan(@PathVariable Long id, @RequestBody MembershipPlanDto membershipPlanDto) {
        return membershipPlanService.updateMembershipPlan(id, membershipPlanDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMembershipPlan(@PathVariable Long id) {
        membershipPlanService.deleteMembershipPlan(id);
    }
}