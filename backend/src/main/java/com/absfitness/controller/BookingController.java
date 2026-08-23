package com.absfitness.controller;

import com.absfitness.dto.BookingDto;
import com.absfitness.dto.CreateBookingRequest;
import com.absfitness.service.BookingService;
import com.absfitness.security.CurrentUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<BookingDto> createBooking(@CurrentUser Integer userId, @Valid @RequestBody CreateBookingRequest request) {
        BookingDto createdBooking = bookingService.createBooking(userId, request);
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BookingDto>> getMemberBookings(@CurrentUser Integer userId) {
        List<BookingDto> bookings = bookingService.getMemberBookings(userId);
        return ResponseEntity.ok(bookings);
    }

    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<BookingDto> cancelBooking(@PathVariable Long bookingId, @CurrentUser Integer userId) {
        BookingDto cancelledBooking = bookingService.cancelBooking(bookingId, userId);
        return ResponseEntity.ok(cancelledBooking);
    }
}