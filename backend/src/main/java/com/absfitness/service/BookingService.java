package com.absfitness.service;

import com.absfitness.dto.BookingDto;
import com.absfitness.dto.CreateBookingRequest;
import com.absfitness.dto.FitnessClassDto;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.model.Booking;
import com.absfitness.model.FitnessClass;
import com.absfitness.model.MemberSubscription;
import com.absfitness.repository.BookingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import com.absfitness.service.FitnessClassService;
import com.absfitness.service.MemberSubscriptionService;
import com.absfitness.service.NotificationService;
import com.absfitness.model.User;
import com.absfitness.model.Trainer;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final FitnessClassService fitnessClassService;
    private final MemberSubscriptionService memberSubscriptionService;
    private final NotificationService notificationService;

    public BookingService(BookingRepository bookingRepository,
                          FitnessClassService fitnessClassService,
                          MemberSubscriptionService memberSubscriptionService,
                          NotificationService notificationService) {
        this.bookingRepository = bookingRepository;
        this.fitnessClassService = fitnessClassService;
        this.memberSubscriptionService = memberSubscriptionService;
        this.notificationService = notificationService;
    }

    @Transactional
    public BookingDto createBooking(Integer userId, CreateBookingRequest request) {
        // 1a. Validate active membership
        List<MemberSubscription> activeSubscriptions = memberSubscriptionService.findByUserIdAndStatus(userId, SubscriptionStatus.ACTIVE);
        if (activeSubscriptions.isEmpty()) {
            throw new IllegalStateException("User does not have an active membership to create a booking.");
        }

        // 1b. Fetch FitnessClass details
        FitnessClassDto fitnessClassDto = fitnessClassService.getFitnessClassById(request.getFitnessClassId());
        if (fitnessClassDto == null) {
            throw new ResourceNotFoundException("Fitness class not found with ID: " + request.getFitnessClassId());
        }

        // Convert DTO to Entity for internal use
        FitnessClass fitnessClass = new FitnessClass();
        fitnessClass.setId(fitnessClassDto.getId());
        fitnessClass.setName(fitnessClassDto.getName());
        fitnessClass.setDescription(fitnessClassDto.getDescription());
        fitnessClass.setScheduleTime(fitnessClassDto.getScheduleTime());
        fitnessClass.setDurationMinutes(fitnessClassDto.getDurationMinutes());
        fitnessClass.setCapacity(fitnessClassDto.getCapacity());
        fitnessClass.setBookedSlots(fitnessClassDto.getBookedSlots());
        // Trainer is not directly needed for booking creation logic, but set to avoid NPE if accessed later
        // In a real scenario, you might fetch the full FitnessClass entity from its service
        // For now, we'll rely on the DTO's data
        // fitnessClass.setTrainer(trainerService.getTrainerById(fitnessClassDto.getTrainerId())); // Assuming trainerService exists

        // 1c. Check available slots
        if (fitnessClass.getBookedSlots() >= fitnessClass.getCapacity()) {
            throw new IllegalStateException("Fitness class is fully booked.");
        }

        // 1d. Check if user already booked this class
        if (bookingRepository.existsByFitnessClass_IdAndUserIdAndStatus(fitnessClass.getId(), userId, Booking.BookingStatus.CONFIRMED)) {
            throw new IllegalStateException("User has already booked this fitness class.");
        }

        // 1e. Create new Booking entity
        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setFitnessClass(fitnessClass);
        booking.setBookingTime(LocalDateTime.now());
        booking.setStatus(Booking.BookingStatus.CONFIRMED);

        // 1f. Save Booking entity
        booking = bookingRepository.save(booking);

        // 1g. Increment booked slots for FitnessClass
        fitnessClassService.incrementBookedSlots(fitnessClass.getId());

        BookingDto bookingDto = convertToDto(booking);

        // 1h. Send booking confirmation email
        notificationService.sendBookingConfirmationEmail(userId, bookingDto);

        // 1i. Return created BookingDto
        return bookingDto;
    }

    public List<BookingDto> getMemberBookings(Integer userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookings.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public BookingDto cancelBooking(Long bookingId, Integer userId) {
        Booking booking = bookingRepository.findByIdAndUserId(bookingId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found or not owned by user with ID: " + bookingId));

        if (booking.getStatus() == Booking.BookingStatus.CANCELLED) {
            throw new IllegalStateException("Booking is already cancelled.");
        }

        // Update booking status to CANCELLED
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        booking = bookingRepository.save(booking);

        // Decrement booked slots for the associated FitnessClass
        fitnessClassService.decrementBookedSlots(booking.getFitnessClass().getId());

        BookingDto bookingDto = convertToDto(booking);

        // Send cancellation confirmation email
        notificationService.sendBookingCancellationEmail(userId, bookingDto);

        return bookingDto;
    }

    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public BookingDto getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));
        return convertToDto(booking);
    }

    private BookingDto convertToDto(Booking booking) {
        return BookingDto.builder()
                .id(booking.getId())
                .userId(booking.getUserId())
                .fitnessClassId(booking.getFitnessClass().getId())
                .fitnessClassName(booking.getFitnessClass().getName())
                .scheduleTime(booking.getFitnessClass().getScheduleTime())
                .durationMinutes(booking.getFitnessClass().getDurationMinutes())
                .bookingTime(booking.getBookingTime())
                .status(BookingDto.BookingStatus.valueOf(booking.getStatus().name()))
                .build();
    }
}