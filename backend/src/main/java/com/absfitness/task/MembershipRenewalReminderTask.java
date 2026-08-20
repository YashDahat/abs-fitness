package com.absfitness.task;

import com.absfitness.model.MemberSubscription;
import com.absfitness.service.MemberSubscriptionService;
import com.absfitness.service.NotificationService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import com.absfitness.model.User;

@Component
public class MembershipRenewalReminderTask {

    private final MemberSubscriptionService memberSubscriptionService;
    private final NotificationService notificationService;

    public MembershipRenewalReminderTask(MemberSubscriptionService memberSubscriptionService, NotificationService notificationService) {
        this.memberSubscriptionService = memberSubscriptionService;
        this.notificationService = notificationService;
    }

    @Scheduled(cron = "0 0 9 * * ?") // Run every day at 9 AM
    public void sendRenewalReminders() {
        LocalDate reminderDate = LocalDate.now().plusDays(7); // Send reminders 7 days before renewal
        List<MemberSubscription> upcomingRenewals = memberSubscriptionService.getUpcomingRenewals(reminderDate);

        for (MemberSubscription subscription : upcomingRenewals) {
            // Placeholder for actual memberId retrieval.
            // In a real application, this would involve fetching the User entity associated with subscription.getUserId()
            // and then getting its UUID or email for the notification.
            // For now, we'll use a dummy UUID.
            UUID memberId = UUID.nameUUIDFromBytes(String.valueOf(subscription.getUserId()).getBytes());
            notificationService.sendMembershipRenewalReminder(memberId, subscription);
        }
    }
}