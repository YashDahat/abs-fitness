package com.absfitness.repository;

import com.absfitness.dto.SubscriptionStatus;
import com.absfitness.model.MemberSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberSubscriptionRepository extends JpaRepository<MemberSubscription, Long> {
    List<MemberSubscription> findByUserId(Integer userId);
    List<MemberSubscription> findByUserIdAndStatus(Integer userId, SubscriptionStatus status);
    Optional<MemberSubscription> findByIdAndUserId(Long id, Integer userId);
}