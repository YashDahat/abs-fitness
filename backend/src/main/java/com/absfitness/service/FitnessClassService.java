package com.absfitness.service;

import com.absfitness.dto.FitnessClassDto;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.model.FitnessClass;
import com.absfitness.model.Trainer;
import com.absfitness.repository.FitnessClassRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import com.absfitness.service.TrainerService;

@Service
public class FitnessClassService {

    private final FitnessClassRepository fitnessClassRepository;
    private final TrainerService trainerService;

    public FitnessClassService(FitnessClassRepository fitnessClassRepository, TrainerService trainerService) {
        this.fitnessClassRepository = fitnessClassRepository;
        this.trainerService = trainerService;
    }

    public List<FitnessClassDto> getAllFitnessClasses() {
        return fitnessClassRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public FitnessClassDto getFitnessClassById(Long id) {
        FitnessClass fitnessClass = fitnessClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fitness class not found with ID: " + id));
        return convertToDto(fitnessClass);
    }

    public FitnessClassDto createFitnessClass(FitnessClassDto fitnessClassDto) {
        com.absfitness.dto.TrainerDto trainerDto = trainerService.getTrainerById(fitnessClassDto.getTrainerId());
        Trainer trainer = new Trainer();
        trainer.setId(trainerDto.getId());
        trainer.setName(trainerDto.getName());
        trainer.setSpecialty(trainerDto.getSpecialty());
        trainer.setBio(trainerDto.getBio());
        trainer.setImageUrl(trainerDto.getImageUrl());
        trainer.setExperienceYears(trainerDto.getExperienceYears());

        FitnessClass fitnessClass = new FitnessClass();
        fitnessClass.setName(fitnessClassDto.getName());
        fitnessClass.setDescription(fitnessClassDto.getDescription());
        fitnessClass.setScheduleTime(fitnessClassDto.getScheduleTime());
        fitnessClass.setDurationMinutes(fitnessClassDto.getDurationMinutes());
        fitnessClass.setCapacity(fitnessClassDto.getCapacity());
        fitnessClass.setBookedSlots(0); // New classes start with 0 booked slots
        fitnessClass.setTrainer(trainer);

        FitnessClass savedFitnessClass = fitnessClassRepository.save(fitnessClass);
        return convertToDto(savedFitnessClass);
    }

    public FitnessClassDto updateFitnessClass(Long id, FitnessClassDto fitnessClassDto) {
        FitnessClass existingClass = fitnessClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fitness class not found with ID: " + id));

        if (fitnessClassDto.getTrainerId() != null && !existingClass.getTrainer().getId().equals(fitnessClassDto.getTrainerId())) {
            com.absfitness.dto.TrainerDto trainerDto = trainerService.getTrainerById(fitnessClassDto.getTrainerId());
            Trainer trainer = new Trainer();
            trainer.setId(trainerDto.getId());
            trainer.setName(trainerDto.getName());
            trainer.setSpecialty(trainerDto.getSpecialty());
            trainer.setBio(trainerDto.getBio());
            trainer.setImageUrl(trainerDto.getImageUrl());
            trainer.setExperienceYears(trainerDto.getExperienceYears());
            existingClass.setTrainer(trainer);
        }

        existingClass.setName(fitnessClassDto.getName());
        existingClass.setDescription(fitnessClassDto.getDescription());
        existingClass.setScheduleTime(fitnessClassDto.getScheduleTime());
        existingClass.setDurationMinutes(fitnessClassDto.getDurationMinutes());
        existingClass.setCapacity(fitnessClassDto.getCapacity());
        // bookedSlots should not be updated directly via DTO in this method,
        // it's managed by booking logic.

        FitnessClass updatedFitnessClass = fitnessClassRepository.save(existingClass);
        return convertToDto(updatedFitnessClass);
    }

    public void deleteFitnessClass(Long id) {
        if (!fitnessClassRepository.existsById(id)) {
            throw new ResourceNotFoundException("Fitness class not found with ID: " + id);
        }
        fitnessClassRepository.deleteById(id);
    }

    public List<FitnessClassDto> getClassesByTrainerId(Long trainerId) {
        return fitnessClassRepository.findByTrainerId(trainerId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @org.springframework.transaction.annotation.Transactional
    public void adjustBookedSlots(Long fitnessClassId, int delta) {
        FitnessClass fitnessClass = fitnessClassRepository.findById(fitnessClassId)
                .orElseThrow(() -> new ResourceNotFoundException("Fitness class not found with ID: " + fitnessClassId));
        fitnessClass.setBookedSlots(fitnessClass.getBookedSlots() + delta);
        fitnessClassRepository.save(fitnessClass);
    }

    public List<FitnessClassDto> getAvailableClasses() {
        return fitnessClassRepository.findAvailableClasses(LocalDateTime.now()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private FitnessClassDto convertToDto(FitnessClass fitnessClass) {
        return FitnessClassDto.builder()
                .id(fitnessClass.getId())
                .name(fitnessClass.getName())
                .description(fitnessClass.getDescription())
                .scheduleTime(fitnessClass.getScheduleTime())
                .durationMinutes(fitnessClass.getDurationMinutes())
                .capacity(fitnessClass.getCapacity())
                .bookedSlots(fitnessClass.getBookedSlots())
                .trainerId(fitnessClass.getTrainer() != null ? fitnessClass.getTrainer().getId() : null)
                .trainerName(fitnessClass.getTrainer() != null ? fitnessClass.getTrainer().getName() : null)
                .build();
    }
}