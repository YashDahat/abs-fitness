package com.absfitness.service;

import com.absfitness.dto.BookingStatus;
import com.absfitness.model.Booking;
import com.absfitness.repository.BookingRepository;
import com.absfitness.dto.BookingDto;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import com.absfitness.service.NotificationService;

@Service
public class BookingReminderService {

    private final BookingRepository bookingRepository;
    private final NotificationService notificationService;

    public BookingReminderService(BookingRepository bookingRepository, NotificationService notificationService) {
        this.bookingRepository = bookingRepository;
        this.notificationService = notificationService;
    }

    @Scheduled(cron = "0 0 * * * ?") // Run every hour
    public void sendRemindersForUpcomingBookings() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime twentyFourHoursLater = now.plusHours(24);

        List<Booking> upcomingBookings = bookingRepository.findByStatusAndFitnessClass_ScheduleTimeBetween(
                BookingStatus.CONFIRMED, now, twentyFourHoursLater);

        for (Booking booking : upcomingBookings) {
            BookingDto bookingDto = BookingDto.builder()
                    .id(booking.getId())
                    .userId(booking.getUserId())
                    .fitnessClassId(booking.getFitnessClass().getId())
                    .fitnessClassName(booking.getFitnessClass().getName())
                    .scheduleTime(booking.getFitnessClass().getScheduleTime())
                    .durationMinutes(booking.getFitnessClass().getDurationMinutes())
                    .bookingTime(booking.getBookingTime())
                    .status(BookingStatus.valueOf(booking.getStatus().name()))
                    .build();

            notificationService.sendBookingReminderEmail(bookingDto);

            booking.setStatus(BookingStatus.REMINDER_SENT);
            bookingRepository.save(booking);
        }
    }
}