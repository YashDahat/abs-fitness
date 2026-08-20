package com.absfitness.controller.admin;

import com.absfitness.dto.TrainerDto;
import com.absfitness.exception.ResourceNotFoundException;
import com.absfitness.service.TrainerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/trainers")
public class AdminTrainerController {

    private final TrainerService trainerService;

    public AdminTrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    @PostMapping
    public ResponseEntity<TrainerDto> createTrainer(@RequestBody TrainerDto trainerDto) {
        TrainerDto createdTrainer = trainerService.createTrainer(trainerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTrainer);
    }

    @GetMapping
    public ResponseEntity<List<TrainerDto>> getAllTrainers() {
        List<TrainerDto> trainers = trainerService.getAllTrainers();
        return ResponseEntity.ok(trainers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainerDto> getTrainerById(@PathVariable UUID id) {
        try {
            TrainerDto trainer = trainerService.getTrainerById(id);
            return ResponseEntity.ok(trainer);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrainerDto> updateTrainer(@PathVariable UUID id, @RequestBody TrainerDto trainerDto) {
        try {
            TrainerDto updatedTrainer = trainerService.updateTrainer(id, trainerDto);
            return ResponseEntity.ok(updatedTrainer);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable UUID id) {
        try {
            trainerService.deleteTrainer(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}