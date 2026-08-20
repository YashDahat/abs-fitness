package com.absfitness.controller;

import com.absfitness.dto.BookingDto;
import com.absfitness.dto.CreateBookingRequest;
import com.absfitness.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<BookingDto> createBooking(@Valid @RequestBody CreateBookingRequest request, @RequestHeader("X-Member-ID") UUID memberId) {
        BookingDto createdBooking = bookingService.createBooking(request, memberId);
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }

    @GetMapping("/me")
    public ResponseEntity<List<BookingDto>> getMemberBookings(@RequestHeader("X-Member-ID") UUID memberId) {
        List<BookingDto> bookings = bookingService.getMemberBookings(memberId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable UUID id) {
        BookingDto booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BookingDto> cancelBooking(@PathVariable UUID id, @RequestHeader("X-Member-ID") UUID memberId) {
        BookingDto cancelledBooking = bookingService.cancelBooking(id, memberId);
        return ResponseEntity.ok(cancelledBooking);
    }
}