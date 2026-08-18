package com.absfitness.service;

import com.absfitness.dto.BookingDto;
import com.absfitness.dto.CreateBookingRequest;
import com.absfitness.dto.GymClassDto;
import com.absfitness.dto.TrainerDto;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.model.Booking;
import com.absfitness.model.BookingStatus;
import com.absfitness.model.GymClass;
import com.absfitness.model.Trainer;
import com.absfitness.repository.BookingRepository;
import com.absfitness.repository.GymClassRepository;
import com.absfitness.repository.TrainerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final TrainerRepository trainerRepository;
    private final GymClassRepository gymClassRepository;
    private final BookingRepository bookingRepository;

    public BookingService(TrainerRepository trainerRepository, GymClassRepository gymClassRepository, BookingRepository bookingRepository) {
        this.trainerRepository = trainerRepository;
        this.gymClassRepository = gymClassRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<TrainerDto> getAllTrainers() {
        return trainerRepository.findAll().stream()
                .map(this::mapToTrainerDto)
                .collect(Collectors.toList());
    }

    public TrainerDto getTrainerById(UUID trainerId) {
        Trainer trainer = trainerRepository.findById(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with ID: " + trainerId));
        return mapToTrainerDto(trainer);
    }

    @Transactional
    public TrainerDto createTrainer(TrainerDto trainerDto) {
        Trainer trainer = new Trainer();
        trainer.setName(trainerDto.getName());
        trainer.setBio(trainerDto.getBio());
        if (trainerDto.getSpecializations() != null) {
            trainer.setSpecializations(Arrays.asList(trainerDto.getSpecializations().split(",")));
        }
        Trainer savedTrainer = trainerRepository.save(trainer);
        return mapToTrainerDto(savedTrainer);
    }

    @Transactional
    public TrainerDto updateTrainer(UUID trainerId, TrainerDto trainerDto) {
        Trainer existingTrainer = trainerRepository.findById(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with ID: " + trainerId));

        existingTrainer.setName(trainerDto.getName());
        existingTrainer.setBio(trainerDto.getBio());
        if (trainerDto.getSpecializations() != null) {
            existingTrainer.setSpecializations(Arrays.asList(trainerDto.getSpecializations().split(",")));
        }
        Trainer updatedTrainer = trainerRepository.save(existingTrainer);
        return mapToTrainerDto(updatedTrainer);
    }

    @Transactional
    public void deleteTrainer(UUID trainerId) {
        if (!trainerRepository.existsById(trainerId)) {
            throw new ResourceNotFoundException("Trainer not found with ID: " + trainerId);
        }
        trainerRepository.deleteById(trainerId);
    }

    public List<GymClassDto> getAllGymClasses() {
        return gymClassRepository.findAll().stream()
                .map(this::mapToGymClassDto)
                .collect(Collectors.toList());
    }

    public GymClassDto getGymClassById(Long classId) {
        GymClass gymClass = gymClassRepository.findById(classId)
                .orElseThrow(() -> new ResourceNotFoundException("GymClass not found with ID: " + classId));
        return mapToGymClassDto(gymClass);
    }

    @Transactional
    public GymClassDto createGymClass(GymClassDto gymClassDto) {
        Trainer trainer = trainerRepository.findById(gymClassDto.getTrainerId())
                .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with ID: " + gymClassDto.getTrainerId()));

        GymClass gymClass = new GymClass();
        gymClass.setName(gymClassDto.getName());
        gymClass.setDescription(gymClassDto.getDescription());
        gymClass.setStartTime(gymClassDto.getStartTime());
        gymClass.setEndTime(gymClassDto.getEndTime());
        gymClass.setCapacity(gymClassDto.getCapacity());
        gymClass.setBookedSlots(0); // New class starts with 0 booked slots
        gymClass.setTrainer(trainer);

        GymClass savedGymClass = gymClassRepository.save(gymClass);
        return mapToGymClassDto(savedGymClass);
    }

    @Transactional
    public GymClassDto updateGymClass(Long classId, GymClassDto gymClassDto) {
        GymClass existingGymClass = gymClassRepository.findById(classId)
                .orElseThrow(() -> new ResourceNotFoundException("GymClass not found with ID: " + classId));

        Trainer trainer = trainerRepository.findById(gymClassDto.getTrainerId())
                .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with ID: " + gymClassDto.getTrainerId()));

        existingGymClass.setName(gymClassDto.getName());
        existingGymClass.setDescription(gymClassDto.getDescription());
        existingGymClass.setStartTime(gymClassDto.getStartTime());
        existingGymClass.setEndTime(gymClassDto.getEndTime());
        existingGymClass.setCapacity(gymClassDto.getCapacity());
        existingGymClass.setTrainer(trainer);

        GymClass updatedGymClass = gymClassRepository.save(existingGymClass);
        return mapToGymClassDto(updatedGymClass);
    }

    @Transactional
    public void deleteGymClass(Long classId) {
        if (!gymClassRepository.existsById(classId)) {
            throw new ResourceNotFoundException("GymClass not found with ID: " + classId);
        }
        gymClassRepository.deleteById(classId);
    }

    @Transactional
    public BookingDto createBooking(CreateBookingRequest request, Integer userId) {
        GymClass gymClass = gymClassRepository.findById(request.getGymClassId())
                .orElseThrow(() -> new ResourceNotFoundException("GymClass not found with ID: " + request.getGymClassId()));

        if (gymClass.getBookedSlots() >= gymClass.getCapacity()) {
            throw new IllegalStateException("Class is full.");
        }

        Optional<Booking> existingBooking = bookingRepository.findByUserIdAndGymClassIdAndStatusIn(
                userId, request.getGymClassId(), Arrays.asList(BookingStatus.CONFIRMED, BookingStatus.WAITLISTED));

        if (existingBooking.isPresent()) {
            throw new IllegalStateException("You have already booked this class.");
        }

        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setGymClass(gymClass);
        booking.setBookingTime(Instant.now());
        booking.setStatus(BookingStatus.CONFIRMED);

        gymClass.setBookedSlots(gymClass.getBookedSlots() + 1);
        gymClassRepository.save(gymClass);

        Booking savedBooking = bookingRepository.save(booking);
        return mapToBookingDto(savedBooking);
    }

    @Transactional
    public void cancelBooking(Long bookingId, Integer userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

        if (!booking.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You are not authorized to cancel this booking.");
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new IllegalStateException("Booking is already cancelled.");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        GymClass gymClass = booking.getGymClass();
        gymClass.setBookedSlots(gymClass.getBookedSlots() - 1);
        gymClassRepository.save(gymClass);
        bookingRepository.save(booking);
    }

    public List<BookingDto> getBookingsByUserId(Integer userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(this::mapToBookingDto)
                .collect(Collectors.toList());
    }

    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToBookingDto)
                .collect(Collectors.toList());
    }

    private TrainerDto mapToTrainerDto(Trainer trainer) {
        return TrainerDto.builder()
                .id(trainer.getId().getMostSignificantBits()) // Assuming TrainerDto uses Long for ID
                .name(trainer.getName())
                .bio(trainer.getBio())
                .specializations(trainer.getSpecializations() != null ? String.join(",", trainer.getSpecializations()) : null)
                .build();
    }

    private GymClassDto mapToGymClassDto(GymClass gymClass) {
        return GymClassDto.builder()
                .id(gymClass.getId())
                .name(gymClass.getName())
                .description(gymClass.getDescription())
                .startTime(gymClass.getStartTime())
                .endTime(gymClass.getEndTime())
                .capacity(gymClass.getCapacity())
                .bookedSlots(gymClass.getBookedSlots())
                .trainerId(gymClass.getTrainer() != null ? gymClass.getTrainer().getId().getMostSignificantBits() : null) // Assuming GymClassDto uses Long for trainerId
                .trainerName(gymClass.getTrainer() != null ? gymClass.getTrainer().getName() : null)
                .build();
    }

    private BookingDto mapToBookingDto(Booking booking) {
        GymClass gymClass = booking.getGymClass();
        Trainer trainer = gymClass.getTrainer();
        return BookingDto.builder()
                .id(booking.getId())
                .userId(booking.getUserId())
                .gymClassId(gymClass.getId())
                .gymClassName(gymClass.getName())
                .gymClassStartTime(gymClass.getStartTime())
                .gymClassEndTime(gymClass.getEndTime())
                .trainerName(trainer != null ? trainer.getName() : null)
                .bookingTime(LocalDateTime.ofInstant(booking.getBookingTime(), java.time.ZoneOffset.UTC))
                .status(booking.getStatus())
                .build();
    }
}