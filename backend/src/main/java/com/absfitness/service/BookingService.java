package com.absfitness.service;

import com.absfitness.dto.BookingDto;
import com.absfitness.dto.CreateBookingRequest;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.model.Booking;
import com.absfitness.model.BookingStatus;
import com.absfitness.model.FitnessClass;
import com.absfitness.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import com.absfitness.service.FitnessClassService;
import com.absfitness.service.NotificationService;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final FitnessClassService fitnessClassService;
    private final NotificationService notificationService;

    public BookingService(BookingRepository bookingRepository, FitnessClassService fitnessClassService, NotificationService notificationService) {
        this.bookingRepository = bookingRepository;
        this.fitnessClassService = fitnessClassService;
        this.notificationService = notificationService;
    }

    public BookingDto createBooking(CreateBookingRequest request, UUID memberId) {
        UUID fitnessClassUuid = new UUID(request.getFitnessClassId(), 0L);
        com.absfitness.dto.FitnessClassDto fitnessClassDto = fitnessClassService.getFitnessClassById(fitnessClassUuid);

        int currentBookings = bookingRepository.countByFitnessClassIdAndStatus(fitnessClassUuid, BookingStatus.CONFIRMED);
        if (currentBookings >= fitnessClassDto.getCapacity()) {
            throw new IllegalStateException("Fitness class is full.");
        }

        com.absfitness.model.FitnessClass fitnessClass = new com.absfitness.model.FitnessClass();
        fitnessClass.setId(fitnessClassUuid);

        Booking booking = new Booking();
        booking.setMemberId(memberId);
        booking.setFitnessClass(fitnessClass);
        booking.setBookingTime(LocalDateTime.now());
        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setCreatedAt(LocalDateTime.now());

        Booking savedBooking = bookingRepository.save(booking);
        BookingDto bookingDto = BookingDto.builder()
                .id(savedBooking.getId().getMostSignificantBits())
                .memberId(memberId.getMostSignificantBits())
                .fitnessClassId(request.getFitnessClassId())
                .fitnessClassName(fitnessClassDto.getName())
                .bookingTime(savedBooking.getBookingTime())
                .status(savedBooking.getStatus())
                .build();
        notificationService.sendBookingConfirmation(memberId, bookingDto);
        return bookingDto;
    }

    public BookingDto getBookingById(UUID bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));
        return convertToDto(booking);
    }

    public List<BookingDto> getMemberBookings(UUID memberId) {
        return bookingRepository.findByMemberIdOrderByBookingTimeDesc(memberId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public BookingDto cancelBooking(UUID bookingId, UUID memberId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

        if (!booking.getMemberId().equals(memberId)) {
            throw new IllegalArgumentException("You are not authorized to cancel this booking.");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        Booking updatedBooking = bookingRepository.save(booking);
        BookingDto dto = convertToDto(updatedBooking);
        notificationService.sendBookingConfirmation(updatedBooking.getMemberId(), dto);
        return dto;
    }

    public BookingDto adminCancelBooking(UUID bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

        booking.setStatus(BookingStatus.CANCELLED);
        Booking updatedBooking = bookingRepository.save(booking);
        BookingDto dto = convertToDto(updatedBooking);
        notificationService.sendBookingConfirmation(updatedBooking.getMemberId(), dto);
        return dto;
    }

    private BookingDto convertToDto(Booking booking) {
        return BookingDto.builder()
                .id(booking.getId().getMostSignificantBits()) // Assuming UUID to Long conversion for DTO
                .memberId(booking.getMemberId().getMostSignificantBits()) // Assuming UUID to Long conversion for DTO
                .fitnessClassId(booking.getFitnessClass().getId().getMostSignificantBits()) // Assuming UUID to Long conversion for DTO
                .fitnessClassName(booking.getFitnessClass().getName())
                .bookingTime(booking.getBookingTime())
                .status(booking.getStatus())
                .build();
    }
}