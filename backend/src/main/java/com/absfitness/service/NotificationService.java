package com.absfitness.service;

import com.absfitness.dto.BookingDto;
import com.absfitness.model.User;
import com.absfitness.repository.UserRepository;
import com.absfitness.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import com.absfitness.model.Booking;

@Service
public class NotificationService {

    private final JavaMailSender mailSender;
    private final UserRepository userRepository;

    @Autowired
    public NotificationService(JavaMailSender mailSender, UserRepository userRepository) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
    }

    public void sendBookingConfirmationEmail(Integer userId, BookingDto bookingDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Booking Confirmation for " + bookingDto.getFitnessClassName());
        message.setText(buildConfirmationEmailContent(user, bookingDto));
        mailSender.send(message);
    }

    public void sendBookingCancellationEmail(Integer userId, BookingDto bookingDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Booking Cancellation for " + bookingDto.getFitnessClassName());
        message.setText(buildCancellationEmailContent(user, bookingDto));
        mailSender.send(message);
    }

    public void sendBookingReminderEmail(BookingDto bookingDto) {
        User user = userRepository.findById(bookingDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + bookingDto.getUserId()));

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Reminder: Upcoming Fitness Class - " + bookingDto.getFitnessClassName());
        message.setText(buildReminderEmailContent(user, bookingDto));
        mailSender.send(message);
    }

    private String buildConfirmationEmailContent(User user, BookingDto bookingDto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return String.format(
                "Dear %s,\n\n" +
                        "Your booking for the fitness class '%s' has been successfully confirmed.\n\n" +
                        "Class Details:\n" +
                        "  Class Name: %s\n" +
                        "  Schedule Time: %s\n" +
                        "  Duration: %d minutes\n\n" +
                        "Thank you for choosing ABS Fitness!",
                user.getFirstName(),
                bookingDto.getFitnessClassName(),
                bookingDto.getFitnessClassName(),
                bookingDto.getScheduleTime().format(formatter),
                bookingDto.getDurationMinutes()
        );
    }

    private String buildCancellationEmailContent(User user, BookingDto bookingDto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return String.format(
                "Dear %s,\n\n" +
                        "Your booking for the fitness class '%s' on %s has been successfully cancelled.\n\n" +
                        "We hope to see you again soon.\n\n" +
                        "ABS Fitness Team",
                user.getFirstName(),
                bookingDto.getFitnessClassName(),
                bookingDto.getScheduleTime().format(formatter)
        );
    }

    private String buildReminderEmailContent(User user, BookingDto bookingDto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return String.format(
                "Dear %s,\n\n" +
                        "This is a friendly reminder for your upcoming fitness class:\n\n" +
                        "  Class Name: %s\n" +
                        "  Schedule Time: %s\n" +
                        "  Duration: %d minutes\n\n" +
                        "Please arrive on time. We look forward to seeing you!\n\n" +
                        "ABS Fitness Team",
                user.getFirstName(),
                bookingDto.getFitnessClassName(),
                bookingDto.getScheduleTime().format(formatter),
                bookingDto.getDurationMinutes()
        );
    }
}