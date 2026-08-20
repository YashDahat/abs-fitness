package com.absfitness.service;

import com.absfitness.dto.BookingDto;
import com.absfitness.model.MemberSubscription;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.UUID;
import com.absfitness.service.EmailService;
import com.absfitness.model.Booking;

@Service
public class NotificationService {

    private final EmailService emailService;

    @Autowired
    public NotificationService(EmailService emailService) {
        this.emailService = emailService;
    }

    public void sendBookingConfirmation(UUID memberId, BookingDto bookingDetails) {
        String to = "member_" + memberId.toString() + "@example.com"; // Placeholder for member email
        String subject = "Booking Confirmation for " + bookingDetails.getFitnessClassName();
        String body = String.format(
                "Dear Member,\n\n" +
                        "Your booking for '%s' on %s has been confirmed.\n" +
                        "Booking ID: %d\n" +
                        "Status: %s\n\n" +
                        "Thank you for choosing ABS Fitness!",
                bookingDetails.getFitnessClassName(),
                bookingDetails.getBookingTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),
                bookingDetails.getId(),
                bookingDetails.getStatus().name()
        );
        emailService.sendEmail(to, subject, body);
    }

    public void sendMembershipRenewalReminder(UUID memberId, MemberSubscription subscriptionDetails) {
        String to = "member_" + memberId.toString() + "@example.com"; // Placeholder for member email
        String subject = "Membership Renewal Reminder";

        NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(new Locale("en", "IN"));
        currencyFormatter.setMinimumFractionDigits(2);
        currencyFormatter.setMaximumFractionDigits(2);

        String planPrice = currencyFormatter.format(subscriptionDetails.getMembershipPlan().getPrice());

        String body = String.format(
                "Dear Member,\n\n" +
                        "Your ABS Fitness membership for plan '%s' is due for renewal on %s.\n" +
                        "Plan Details:\n" +
                        "  - Name: %s\n" +
                        "  - Duration: %d months\n" +
                        "  - Price: %s\n\n" +
                        "Please renew your membership to continue enjoying our services.\n\n" +
                        "Thank you,\n" +
                        "ABS Fitness Team",
                subscriptionDetails.getMembershipPlan().getName(),
                subscriptionDetails.getEndDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
                subscriptionDetails.getMembershipPlan().getName(),
                subscriptionDetails.getMembershipPlan().getDurationMonths(),
                planPrice
        );
        emailService.sendEmail(to, subject, body);
    }
}