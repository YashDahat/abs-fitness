package com.absfitness.controller;

import jakarta.validation.constraints.NotNull;

public class CreateSubscriptionRequest {

    @NotNull
    private Long planId;

    public Long getPlanId() {
        return planId;
    }

    public void setPlanId(Long planId) {
        this.planId = planId;
    }
}
