package com.absfitness.controller.admin;

import com.absfitness.dto.BookingDto;
import com.absfitness.dto.GymClassDto;
import com.absfitness.dto.TrainerDto;
import com.absfitness.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminBookingController {

    private final BookingService bookingService;

    public AdminBookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/trainers")
    public ResponseEntity<TrainerDto> createTrainer(@Valid @RequestBody TrainerDto trainerDto) {
        TrainerDto createdTrainer = bookingService.createTrainer(trainerDto);
        return new ResponseEntity<>(createdTrainer, HttpStatus.CREATED);
    }

    @PutMapping("/trainers/{trainerId}")
    public ResponseEntity<TrainerDto> updateTrainer(@PathVariable UUID trainerId, @Valid @RequestBody TrainerDto trainerDto) {
        TrainerDto updatedTrainer = bookingService.updateTrainer(trainerId, trainerDto);
        return new ResponseEntity<>(updatedTrainer, HttpStatus.OK);
    }

    @DeleteMapping("/trainers/{trainerId}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable UUID trainerId) {
        bookingService.deleteTrainer(trainerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/classes")
    public ResponseEntity<GymClassDto> createGymClass(@Valid @RequestBody GymClassDto gymClassDto) {
        GymClassDto createdGymClass = bookingService.createGymClass(gymClassDto);
        return new ResponseEntity<>(createdGymClass, HttpStatus.CREATED);
    }

    @PutMapping("/classes/{classId}")
    public ResponseEntity<GymClassDto> updateGymClass(@PathVariable Long classId, @Valid @RequestBody GymClassDto gymClassDto) {
        GymClassDto updatedGymClass = bookingService.updateGymClass(classId, gymClassDto);
        return new ResponseEntity<>(updatedGymClass, HttpStatus.OK);
    }

    @DeleteMapping("/classes/{classId}")
    public ResponseEntity<Void> deleteGymClass(@PathVariable Long classId) {
        bookingService.deleteGymClass(classId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingDto>> getAllBookings() {
        List<BookingDto> bookings = bookingService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
}