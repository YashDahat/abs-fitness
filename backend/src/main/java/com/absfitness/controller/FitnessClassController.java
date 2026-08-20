package com.absfitness.controller;

import com.absfitness.dto.FitnessClassDto;
import com.absfitness.service.FitnessClassService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/classes")
public class FitnessClassController {

    private final FitnessClassService fitnessClassService;

    public FitnessClassController(FitnessClassService fitnessClassService) {
        this.fitnessClassService = fitnessClassService;
    }

    @GetMapping
    public ResponseEntity<List<FitnessClassDto>> getAllFitnessClasses() {
        List<FitnessClassDto> fitnessClasses = fitnessClassService.getAllFitnessClasses();
        return ResponseEntity.ok(fitnessClasses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FitnessClassDto> getFitnessClassById(@PathVariable UUID id) {
        FitnessClassDto fitnessClass = fitnessClassService.getFitnessClassById(id);
        return ResponseEntity.ok(fitnessClass);
    }
}