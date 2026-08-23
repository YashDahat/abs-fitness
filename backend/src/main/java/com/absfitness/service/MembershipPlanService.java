package com.absfitness.service;

import com.absfitness.dto.MembershipPlanDto;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.model.MembershipPlan;
import com.absfitness.repository.MembershipPlanRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MembershipPlanService {

    private final MembershipPlanRepository membershipPlanRepository;

    public MembershipPlanService(MembershipPlanRepository membershipPlanRepository) {
        this.membershipPlanRepository = membershipPlanRepository;
    }

    public List<MembershipPlanDto> getAllMembershipPlans() {
        return membershipPlanRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MembershipPlanDto> getActiveMembershipPlans() {
        return membershipPlanRepository.findByIsActiveTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MembershipPlanDto getMembershipPlanById(Long id) {
        MembershipPlan membershipPlan = membershipPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Membership Plan not found with ID: " + id));
        return convertToDto(membershipPlan);
    }

    public MembershipPlanDto createMembershipPlan(MembershipPlanDto membershipPlanDto) {
        MembershipPlan membershipPlan = convertToEntity(membershipPlanDto);
        membershipPlan.setId(null); // Ensure ID is null for new entity creation
        MembershipPlan savedMembershipPlan = membershipPlanRepository.save(membershipPlan);
        return convertToDto(savedMembershipPlan);
    }

    public MembershipPlanDto updateMembershipPlan(Long id, MembershipPlanDto membershipPlanDto) {
        MembershipPlan existingMembershipPlan = membershipPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Membership Plan not found with ID: " + id));

        existingMembershipPlan.setName(membershipPlanDto.getName());
        existingMembershipPlan.setDescription(membershipPlanDto.getDescription());
        existingMembershipPlan.setPrice(membershipPlanDto.getPrice());
        existingMembershipPlan.setDurationInMonths(membershipPlanDto.getDurationInMonths());
        existingMembershipPlan.setIsActive(membershipPlanDto.getIsActive());

        MembershipPlan updatedMembershipPlan = membershipPlanRepository.save(existingMembershipPlan);
        return convertToDto(updatedMembershipPlan);
    }

    public void deleteMembershipPlan(Long id) {
        if (!membershipPlanRepository.existsById(id)) {
            throw new ResourceNotFoundException("Membership Plan not found with ID: " + id);
        }
        membershipPlanRepository.deleteById(id);
    }

    private MembershipPlanDto convertToDto(MembershipPlan membershipPlan) {
        return MembershipPlanDto.builder()
                .id(membershipPlan.getId())
                .name(membershipPlan.getName())
                .description(membershipPlan.getDescription())
                .price(membershipPlan.getPrice())
                .durationInMonths(membershipPlan.getDurationInMonths())
                .isActive(membershipPlan.getIsActive())
                .build();
    }

    private MembershipPlan convertToEntity(MembershipPlanDto membershipPlanDto) {
        MembershipPlan membershipPlan = new MembershipPlan();
        membershipPlan.setId(membershipPlanDto.getId());
        membershipPlan.setName(membershipPlanDto.getName());
        membershipPlan.setDescription(membershipPlanDto.getDescription());
        membershipPlan.setPrice(membershipPlanDto.getPrice());
        membershipPlan.setDurationInMonths(membershipPlanDto.getDurationInMonths());
        membershipPlan.setIsActive(membershipPlanDto.getIsActive());
        return membershipPlan;
    }
}