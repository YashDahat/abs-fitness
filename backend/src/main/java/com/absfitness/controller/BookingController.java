package com.absfitness.controller;

import com.absfitness.dto.BookingDto;
import com.absfitness.dto.CreateBookingRequest;
import com.absfitness.dto.GymClassDto;
import com.absfitness.dto.TrainerDto;
import com.absfitness.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.exception.GlobalExceptionHandler; // For context on error handling
import com.absfitness.annotation.CurrentUser; // Assuming this annotation is in this package or a common one

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import com.absfitness.security.CurrentUser;

@RestController
@RequestMapping("/api/v1/public/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/trainers")
    public ResponseEntity<List<TrainerDto>> getAllTrainers() {
        List<TrainerDto> trainers = bookingService.getAllTrainers();
        return ResponseEntity.ok(trainers);
    }

    @GetMapping("/trainers/{id}")
    public ResponseEntity<TrainerDto> getTrainerById(@PathVariable UUID id) {
        TrainerDto trainer = bookingService.getTrainerById(id);
        return ResponseEntity.ok(trainer);
    }

    @GetMapping("/classes")
    public ResponseEntity<List<GymClassDto>> getAllGymClasses() {
        List<GymClassDto> gymClasses = bookingService.getAllGymClasses();
        return ResponseEntity.ok(gymClasses);
    }

    @GetMapping("/classes/{id}")
    public ResponseEntity<GymClassDto> getGymClassById(@PathVariable Long id) {
        GymClassDto gymClass = bookingService.getGymClassById(id);
        return ResponseEntity.ok(gymClass);
    }

    @PostMapping
    public ResponseEntity<BookingDto> createBooking(@Valid @RequestBody CreateBookingRequest request, @CurrentUser Integer userId) {
        BookingDto booking = bookingService.createBooking(request, userId);
        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long id, @CurrentUser Integer userId) {
        bookingService.cancelBooking(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingDto>> getMyBookings(@CurrentUser Integer userId) {
        List<BookingDto> bookings = bookingService.getBookingsByUserId(userId);
        return ResponseEntity.ok(bookings);
    }
}