package com.absfitness.controller;

import com.absfitness.service.MemberSubscriptionService;
import com.absfitness.dto.PaymentOrderResponse;
import com.absfitness.dto.VerifyPaymentRequest;
import com.absfitness.model.MemberSubscription;
import com.absfitness.security.CurrentUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/v1/member/subscriptions")
public class MemberSubscriptionController {

    private final MemberSubscriptionService memberSubscriptionService;

    public MemberSubscriptionController(MemberSubscriptionService memberSubscriptionService) {
        this.memberSubscriptionService = memberSubscriptionService;
    }

    @PostMapping
    public ResponseEntity<PaymentOrderResponse> createSubscription(
            @CurrentUser Integer userId,
            @Valid @RequestBody CreateSubscriptionRequest request) {
        PaymentOrderResponse response = memberSubscriptionService.createSubscription(userId, request.getPlanId());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MemberSubscription>> getMemberSubscriptions(@CurrentUser Integer userId) {
        List<MemberSubscription> subscriptions = memberSubscriptionService.getMemberSubscriptions(userId);
        return ResponseEntity.ok(subscriptions);
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<Void> verifySubscriptionPayment(@RequestBody VerifyPaymentRequest request) {
        memberSubscriptionService.verifySubscriptionPayment(request.getGatewayOrderId(), request.getGatewayPaymentId(), request.getSignature());
        return ResponseEntity.ok().build();
    }
}