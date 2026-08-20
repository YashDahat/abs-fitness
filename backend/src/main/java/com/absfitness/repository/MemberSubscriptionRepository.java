package com.absfitness.repository;

import com.absfitness.model.MemberSubscription;
import com.absfitness.model.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberSubscriptionRepository extends JpaRepository<MemberSubscription, Long> {
    List<MemberSubscription> findByUserId(Integer userId);
    List<MemberSubscription> findByUserIdAndStatus(Integer userId, SubscriptionStatus status);
    List<MemberSubscription> findByEndDateAndStatus(LocalDate endDate, SubscriptionStatus status);
}