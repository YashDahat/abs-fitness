package com.absfitness.service;

import com.absfitness.dto.CreateSubscriptionRequest;
import com.absfitness.dto.MemberSubscriptionDto;
import com.absfitness.dto.MembershipPlanDto;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.model.MemberSubscription;
import com.absfitness.model.MembershipPlan;
import com.absfitness.model.SubscriptionStatus;
import com.absfitness.repository.MemberSubscriptionRepository;
import com.absfitness.repository.MembershipPlanRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MembershipService {

    private final MembershipPlanRepository membershipPlanRepository;
    private final MemberSubscriptionRepository memberSubscriptionRepository;

    public MembershipService(MembershipPlanRepository membershipPlanRepository,
                             MemberSubscriptionRepository memberSubscriptionRepository) {
        this.membershipPlanRepository = membershipPlanRepository;
        this.memberSubscriptionRepository = memberSubscriptionRepository;
    }

    public List<MembershipPlanDto> getAllActiveMembershipPlans() {
        return membershipPlanRepository.findAll().stream()
                .filter(MembershipPlan::isActive)
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MembershipPlanDto getMembershipPlanById(Long id) {
        MembershipPlan membershipPlan = membershipPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Membership Plan not found with id: " + id));
        return convertToDto(membershipPlan);
    }

    public MembershipPlanDto createMembershipPlan(MembershipPlanDto membershipPlanDto) {
        MembershipPlan membershipPlan = convertToEntity(membershipPlanDto);
        membershipPlan.setId(null); // Ensure ID is null for new entity
        MembershipPlan savedPlan = membershipPlanRepository.save(membershipPlan);
        return convertToDto(savedPlan);
    }

    public MembershipPlanDto updateMembershipPlan(Long id, MembershipPlanDto membershipPlanDto) {
        MembershipPlan existingPlan = membershipPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Membership Plan not found with id: " + id));

        existingPlan.setName(membershipPlanDto.getName());
        existingPlan.setDescription(membershipPlanDto.getDescription());
        existingPlan.setPrice(membershipPlanDto.getPrice());
        existingPlan.setDurationMonths(membershipPlanDto.getDurationInMonths());
        existingPlan.setActive(membershipPlanDto.getIsActive());

        MembershipPlan updatedPlan = membershipPlanRepository.save(existingPlan);
        return convertToDto(updatedPlan);
    }

    public void deleteMembershipPlan(Long id) {
        if (!membershipPlanRepository.existsById(id)) {
            throw new ResourceNotFoundException("Membership Plan not found with id: " + id);
        }
        membershipPlanRepository.deleteById(id);
    }

    public MemberSubscriptionDto createSubscription(CreateSubscriptionRequest request) {
        MembershipPlan membershipPlan = membershipPlanRepository.findById(request.getMembershipPlanId())
                .orElseThrow(() -> new ResourceNotFoundException("Membership Plan not found with id: " + request.getMembershipPlanId()));

        MemberSubscription subscription = new MemberSubscription();
        subscription.setUserId(request.getUserId());
        subscription.setMembershipPlan(membershipPlan);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusMonths(membershipPlan.getDurationMonths()));
        subscription.setPricePaid(membershipPlan.getPrice());
        subscription.setStatus(SubscriptionStatus.ACTIVE);

        MemberSubscription savedSubscription = memberSubscriptionRepository.save(subscription);
        return convertToDto(savedSubscription);
    }

    private MembershipPlanDto convertToDto(MembershipPlan membershipPlan) {
        return MembershipPlanDto.builder()
                .id(membershipPlan.getId())
                .name(membershipPlan.getName())
                .description(membershipPlan.getDescription())
                .price(membershipPlan.getPrice())
                .durationInMonths(membershipPlan.getDurationMonths())
                .isActive(membershipPlan.isActive())
                .build();
    }

    private MembershipPlan convertToEntity(MembershipPlanDto membershipPlanDto) {
        MembershipPlan membershipPlan = new MembershipPlan();
        membershipPlan.setId(membershipPlanDto.getId());
        membershipPlan.setName(membershipPlanDto.getName());
        membershipPlan.setDescription(membershipPlanDto.getDescription());
        membershipPlan.setPrice(membershipPlanDto.getPrice());
        membershipPlan.setDurationMonths(membershipPlanDto.getDurationInMonths());
        membershipPlan.setActive(membershipPlanDto.getIsActive());
        return membershipPlan;
    }

    private MemberSubscriptionDto convertToDto(MemberSubscription memberSubscription) {
        return MemberSubscriptionDto.builder()
                .id(memberSubscription.getId())
                .userId(memberSubscription.getUserId())
                .membershipPlanId(memberSubscription.getMembershipPlan().getId())
                .membershipPlanName(memberSubscription.getMembershipPlan().getName())
                .startDate(memberSubscription.getStartDate())
                .endDate(memberSubscription.getEndDate())
                .status(memberSubscription.getStatus())
                // paymentId is not stored in MemberSubscription entity, so it's omitted here
                .build();
    }
}