package com.absfitness.service;

import com.absfitness.model.MemberSubscription;
import com.absfitness.model.MembershipPlan;
import com.absfitness.repository.MemberSubscriptionRepository;
import com.absfitness.repository.MembershipPlanRepository;
import com.absfitness.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.absfitness.service.PaymentService;
import com.absfitness.dto.CreatePaymentRequest;
import com.absfitness.dto.PaymentOrderResponse;
import com.absfitness.dto.VerifyPaymentRequest;
import com.absfitness.dto.PaymentVerificationResponse;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.Optional;
import com.absfitness.model.SubscriptionStatus;

@Service
public class MemberSubscriptionService {

    private final MemberSubscriptionRepository memberSubscriptionRepository;
    private final MembershipPlanRepository membershipPlanRepository;
    private final PaymentService paymentService;

    public MemberSubscriptionService(MemberSubscriptionRepository memberSubscriptionRepository,
                                     MembershipPlanRepository membershipPlanRepository,
                                     PaymentService paymentService) {
        this.memberSubscriptionRepository = memberSubscriptionRepository;
        this.membershipPlanRepository = membershipPlanRepository;
        this.paymentService = paymentService;
    }

    @Transactional
    public PaymentOrderResponse createSubscription(Integer userId, Long planId) {
        MembershipPlan membershipPlan = membershipPlanRepository.findById(planId)
                .orElseThrow(() -> new ResourceNotFoundException("Membership Plan not found with id: " + planId));

        MemberSubscription subscription = new MemberSubscription();
        subscription.setUserId(userId);
        subscription.setMembershipPlan(membershipPlan);
        subscription.setStatus(SubscriptionStatus.PENDING);
        subscription.setCreatedAt(Instant.now());
        subscription.setUpdatedAt(Instant.now());

        memberSubscriptionRepository.save(subscription);

        CreatePaymentRequest paymentRequest = new CreatePaymentRequest(
                membershipPlan.getPrice(),
                "INR",
                "subscription_" + userId + "_" + planId + "_" + subscription.getId()
        );
        PaymentOrderResponse paymentOrderResponse = paymentService.createOrder(paymentRequest);
        return paymentOrderResponse;
    }

    public List<MemberSubscription> getMemberSubscriptions(Integer userId) {
        return memberSubscriptionRepository.findByUserId(userId);
    }

    public List<MemberSubscription> getUpcomingRenewals(LocalDate date) {
        return memberSubscriptionRepository.findByEndDateAndStatus(date, SubscriptionStatus.ACTIVE);
    }

    @Transactional
    public MemberSubscription updateSubscriptionStatus(Long subscriptionId, SubscriptionStatus newStatus) {
        MemberSubscription subscription = memberSubscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new ResourceNotFoundException("MemberSubscription not found with ID: " + subscriptionId));
        subscription.setStatus(newStatus);
        subscription.setUpdatedAt(Instant.now());
        return memberSubscriptionRepository.save(subscription);
    }

    @Transactional
    public void verifySubscriptionPayment(String orderId, String paymentId, String signature) {
        VerifyPaymentRequest verifyRequest = new VerifyPaymentRequest(orderId, paymentId, signature);
        PaymentVerificationResponse verificationResponse = paymentService.verify(verifyRequest);

        if (verificationResponse.isVerified()) {
            String referenceId = verificationResponse.getReferenceId();
            // Extract subscription ID from referenceId, assuming format "subscription_userId_planId_subscriptionId"
            String[] parts = referenceId.split("_");
            if (parts.length < 4) {
                throw new IllegalArgumentException("Invalid referenceId format: " + referenceId);
            }
            Long subscriptionId = Long.parseLong(parts[3]);

            MemberSubscription subscription = memberSubscriptionRepository.findById(subscriptionId)
                    .orElseThrow(() -> new ResourceNotFoundException("MemberSubscription not found for payment reference: " + referenceId));

            subscription.setStatus(SubscriptionStatus.ACTIVE);
            subscription.setStartDate(LocalDate.now());
            subscription.setEndDate(LocalDate.now().plusMonths(subscription.getMembershipPlan().getDurationMonths()));
            subscription.setUpdatedAt(Instant.now());
            memberSubscriptionRepository.save(subscription);
        } else {
            // Optionally update subscription status to FAILED or handle failed payment
            throw new RuntimeException("Payment verification failed for orderId: " + orderId);
        }
    }
}