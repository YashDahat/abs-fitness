package com.absfitness.service;

import com.absfitness.dto.MemberSubscriptionDto;
import com.absfitness.dto.MembershipPlanDto;
import com.absfitness.dto.SubscriptionStatus;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.model.MemberSubscription;
import com.absfitness.model.MembershipPlan;
import com.absfitness.repository.MemberSubscriptionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import com.absfitness.service.MembershipPlanService;

@Service
public class MemberSubscriptionService {

    private final MemberSubscriptionRepository memberSubscriptionRepository;
    private final MembershipPlanService membershipPlanService;

    public MemberSubscriptionService(MemberSubscriptionRepository memberSubscriptionRepository, MembershipPlanService membershipPlanService) {
        this.memberSubscriptionRepository = memberSubscriptionRepository;
        this.membershipPlanService = membershipPlanService;
    }

    public List<MemberSubscriptionDto> getMemberSubscriptions(Integer userId) {
        return memberSubscriptionRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MemberSubscription> getActiveSubscriptions(Integer userId) {
        return memberSubscriptionRepository.findByUserIdAndStatus(userId, SubscriptionStatus.ACTIVE);
    }

    public List<MemberSubscription> findByUserIdAndStatus(Integer userId, SubscriptionStatus status) {
        return memberSubscriptionRepository.findByUserIdAndStatus(userId, status);
    }

    public MemberSubscriptionDto getMemberSubscriptionById(Long subscriptionId, Integer userId) {
        MemberSubscription subscription = memberSubscriptionRepository.findByIdAndUserId(subscriptionId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Member subscription not found with ID: " + subscriptionId + " for user: " + userId));
        return convertToDto(subscription);
    }

    public MemberSubscriptionDto createMemberSubscription(Integer userId, Long membershipPlanId) {
        MembershipPlanDto planDto = membershipPlanService.getMembershipPlanById(membershipPlanId);
        MembershipPlan membershipPlan = new MembershipPlan();
        membershipPlan.setId(planDto.getId());
        membershipPlan.setName(planDto.getName());
        membershipPlan.setDescription(planDto.getDescription());
        membershipPlan.setPrice(planDto.getPrice());
        membershipPlan.setDurationInMonths(planDto.getDurationInMonths());
        membershipPlan.setIsActive(planDto.getIsActive());

        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusMonths(membershipPlan.getDurationInMonths());

        MemberSubscription subscription = new MemberSubscription();
        subscription.setUserId(userId);
        subscription.setMembershipPlan(membershipPlan);
        subscription.setStartDate(startDate);
        subscription.setEndDate(endDate);
        subscription.setStatus(SubscriptionStatus.ACTIVE);

        return convertToDto(memberSubscriptionRepository.save(subscription));
    }

    public MemberSubscriptionDto cancelMemberSubscription(Long subscriptionId, Integer userId) {
        MemberSubscription subscription = memberSubscriptionRepository.findByIdAndUserId(subscriptionId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Member subscription not found with ID: " + subscriptionId + " for user: " + userId));

        if (subscription.getStatus() == SubscriptionStatus.CANCELLED) {
            throw new IllegalStateException("Subscription is already cancelled.");
        }
        if (subscription.getEndDate().isBefore(LocalDate.now())) {
            throw new IllegalStateException("Cannot cancel an expired subscription.");
        }

        subscription.setStatus(SubscriptionStatus.CANCELLED);
        return convertToDto(memberSubscriptionRepository.save(subscription));
    }

    private MemberSubscriptionDto convertToDto(MemberSubscription subscription) {
        MembershipPlanDto membershipPlanDto = MembershipPlanDto.builder()
                .id(subscription.getMembershipPlan().getId())
                .name(subscription.getMembershipPlan().getName())
                .description(subscription.getMembershipPlan().getDescription())
                .price(subscription.getMembershipPlan().getPrice())
                .durationInMonths(subscription.getMembershipPlan().getDurationInMonths())
                .isActive(subscription.getMembershipPlan().getIsActive())
                .build();

        return MemberSubscriptionDto.builder()
                .id(subscription.getId())
                .userId(subscription.getUserId())
                .membershipPlan(membershipPlanDto)
                .startDate(subscription.getStartDate())
                .endDate(subscription.getEndDate())
                .status(subscription.getStatus())
                .build();
    }
}