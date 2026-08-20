package com.absfitness.service;

import com.absfitness.dto.FitnessClassDto;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.model.FitnessClass;
import com.absfitness.model.Trainer;
import com.absfitness.repository.FitnessClassRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import com.absfitness.service.TrainerService;

@Service
@Validated
public class FitnessClassService {

    private final FitnessClassRepository fitnessClassRepository;
    private final TrainerService trainerService;

    public FitnessClassService(FitnessClassRepository fitnessClassRepository, TrainerService trainerService) {
        this.fitnessClassRepository = fitnessClassRepository;
        this.trainerService = trainerService;
    }

    public FitnessClassDto createFitnessClass(@Valid FitnessClassDto fitnessClassDto) {
        FitnessClass fitnessClass = new FitnessClass();
        mapDtoToEntity(fitnessClassDto, fitnessClass);
        FitnessClass savedFitnessClass = fitnessClassRepository.save(fitnessClass);
        return mapEntityToDto(savedFitnessClass);
    }

    public List<FitnessClassDto> getAllFitnessClasses() {
        return fitnessClassRepository.findAll().stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public FitnessClassDto getFitnessClassById(UUID id) {
        FitnessClass fitnessClass = fitnessClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fitness class not found with ID: " + id));
        return mapEntityToDto(fitnessClass);
    }

    public FitnessClassDto updateFitnessClass(UUID id, @Valid FitnessClassDto fitnessClassDto) {
        FitnessClass existingFitnessClass = fitnessClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fitness class not found with ID: " + id));

        mapDtoToEntity(fitnessClassDto, existingFitnessClass);
        existingFitnessClass.setId(id); // Ensure the ID remains the same

        FitnessClass updatedFitnessClass = fitnessClassRepository.save(existingFitnessClass);
        return mapEntityToDto(updatedFitnessClass);
    }

    public void deleteFitnessClass(UUID id) {
        if (!fitnessClassRepository.existsById(id)) {
            throw new ResourceNotFoundException("Fitness class not found with ID: " + id);
        }
        fitnessClassRepository.deleteById(id);
    }

    private FitnessClassDto mapEntityToDto(FitnessClass fitnessClass) {
        return FitnessClassDto.builder()
                .id(fitnessClass.getId().getMostSignificantBits()) // Assuming DTO uses Long for ID
                .name(fitnessClass.getName())
                .description(fitnessClass.getDescription())
                .scheduleTime(fitnessClass.getStartTime().atDate(fitnessClass.getDayOfWeek().plus(1).ordinal() > 0 ? java.time.LocalDate.now().with(fitnessClass.getDayOfWeek()) : java.time.LocalDate.now())) // Placeholder for scheduleTime
                .durationMinutes((int) java.time.Duration.between(fitnessClass.getStartTime(), fitnessClass.getEndTime()).toMinutes())
                .capacity(fitnessClass.getCapacity())
                .trainerId(fitnessClass.getTrainer() != null ? fitnessClass.getTrainer().getId().getMostSignificantBits() : null) // Assuming DTO uses Long for trainerId
                .trainerName(fitnessClass.getTrainer() != null ? fitnessClass.getTrainer().getName() : null)
                .build();
    }

    private void mapDtoToEntity(FitnessClassDto dto, FitnessClass entity) {
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        if (dto.getScheduleTime() != null) {
            entity.setDayOfWeek(dto.getScheduleTime().getDayOfWeek());
            entity.setStartTime(dto.getScheduleTime().toLocalTime());
            if (dto.getDurationMinutes() != null) {
                entity.setEndTime(dto.getScheduleTime().toLocalTime().plusMinutes(dto.getDurationMinutes()));
            }
        }
        entity.setCapacity(dto.getCapacity());

        if (dto.getTrainerId() != null) {
            UUID trainerUuid = new UUID(dto.getTrainerId(), 0L); // Convert Long to UUID
            // getTrainerById already throws ResourceNotFoundException if not found
            trainerService.getTrainerById(trainerUuid);
            Trainer trainer = new Trainer();
            trainer.setId(trainerUuid);
            entity.setTrainer(trainer);
        } else {
            entity.setTrainer(null);
        }
    }
}