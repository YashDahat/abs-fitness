package com.absfitness.controller;

import com.absfitness.dto.FitnessClassDto;
import com.absfitness.service.FitnessClassService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/fitness-classes")
public class FitnessClassController {

    private final FitnessClassService fitnessClassService;

    public FitnessClassController(FitnessClassService fitnessClassService) {
        this.fitnessClassService = fitnessClassService;
    }

    @GetMapping
    public ResponseEntity<List<FitnessClassDto>> getAllAvailableFitnessClasses() {
        List<FitnessClassDto> fitnessClasses = fitnessClassService.getAvailableClasses();
        return ResponseEntity.ok(fitnessClasses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FitnessClassDto> getFitnessClassById(@PathVariable Long id) {
        FitnessClassDto fitnessClass = fitnessClassService.getFitnessClassById(id);
        return ResponseEntity.ok(fitnessClass);
    }
}