package com.absfitness.service;

import com.absfitness.dto.TrainerDto;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.model.Trainer;
import com.absfitness.repository.TrainerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainerService {

    private final TrainerRepository trainerRepository;

    public TrainerService(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }

    public List<TrainerDto> getAllTrainers() {
        return trainerRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public TrainerDto getTrainerById(Long id) {
        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with id: " + id));
        return convertToDto(trainer);
    }

    public TrainerDto createTrainer(TrainerDto trainerDto) {
        Trainer trainer = convertToEntity(trainerDto);
        trainer.setId(null); // Ensure ID is null for new entity creation
        Trainer savedTrainer = trainerRepository.save(trainer);
        return convertToDto(savedTrainer);
    }

    public TrainerDto updateTrainer(Long id, TrainerDto trainerDto) {
        Trainer existingTrainer = trainerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with id: " + id));

        existingTrainer.setName(trainerDto.getName());
        existingTrainer.setSpecialty(trainerDto.getSpecialty());
        existingTrainer.setBio(trainerDto.getBio());
        existingTrainer.setImageUrl(trainerDto.getImageUrl());
        existingTrainer.setExperienceYears(trainerDto.getExperienceYears());

        Trainer updatedTrainer = trainerRepository.save(existingTrainer);
        return convertToDto(updatedTrainer);
    }

    public void deleteTrainer(Long id) {
        if (!trainerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Trainer not found with id: " + id);
        }
        trainerRepository.deleteById(id);
    }

    private TrainerDto convertToDto(Trainer trainer) {
        return TrainerDto.builder()
                .id(trainer.getId())
                .name(trainer.getName())
                .specialty(trainer.getSpecialty())
                .bio(trainer.getBio())
                .imageUrl(trainer.getImageUrl())
                .experienceYears(trainer.getExperienceYears())
                .build();
    }

    private Trainer convertToEntity(TrainerDto trainerDto) {
        Trainer trainer = new Trainer();
        trainer.setId(trainerDto.getId());
        trainer.setName(trainerDto.getName());
        trainer.setSpecialty(trainerDto.getSpecialty());
        trainer.setBio(trainerDto.getBio());
        trainer.setImageUrl(trainerDto.getImageUrl());
        trainer.setExperienceYears(trainerDto.getExperienceYears());
        return trainer;
    }
}