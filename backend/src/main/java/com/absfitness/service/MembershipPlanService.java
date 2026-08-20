package com.absfitness.service;

import com.absfitness.dto.MembershipPlanDto;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.model.MembershipPlan;
import com.absfitness.repository.MembershipPlanRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MembershipPlanService {

    private final MembershipPlanRepository membershipPlanRepository;

    public MembershipPlanService(MembershipPlanRepository membershipPlanRepository) {
        this.membershipPlanRepository = membershipPlanRepository;
    }

    public MembershipPlanDto createMembershipPlan(MembershipPlanDto planDto) {
        MembershipPlan membershipPlan = new MembershipPlan();
        membershipPlan.setName(planDto.getName());
        membershipPlan.setDescription(planDto.getDescription());
        membershipPlan.setDurationMonths(planDto.getDurationInMonths());
        membershipPlan.setPrice(planDto.getPrice());
        MembershipPlan savedPlan = membershipPlanRepository.save(membershipPlan);
        return convertToDto(savedPlan);
    }

    public List<MembershipPlanDto> getAllMembershipPlans() {
        return membershipPlanRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MembershipPlanDto getMembershipPlanById(UUID id) {
        MembershipPlan membershipPlan = membershipPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Membership Plan not found with id: " + id));
        return convertToDto(membershipPlan);
    }

    public MembershipPlanDto updateMembershipPlan(UUID id, MembershipPlanDto planDto) {
        MembershipPlan existingPlan = membershipPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Membership Plan not found with id: " + id));

        existingPlan.setName(planDto.getName());
        existingPlan.setDescription(planDto.getDescription());
        existingPlan.setDurationMonths(planDto.getDurationInMonths());
        existingPlan.setPrice(planDto.getPrice());

        MembershipPlan updatedPlan = membershipPlanRepository.save(existingPlan);
        return convertToDto(updatedPlan);
    }

    public void deleteMembershipPlan(UUID id) {
        if (!membershipPlanRepository.existsById(id)) {
            throw new ResourceNotFoundException("Membership Plan not found with id: " + id);
        }
        membershipPlanRepository.deleteById(id);
    }

    private MembershipPlanDto convertToDto(MembershipPlan membershipPlan) {
        return MembershipPlanDto.builder()
                .id(membershipPlan.getId())
                .name(membershipPlan.getName())
                .description(membershipPlan.getDescription())
                .durationInMonths(membershipPlan.getDurationMonths())
                .price(membershipPlan.getPrice())
                .build();
    }
}