package com.absfitness.controller.admin;

import com.absfitness.dto.FitnessClassDto;
import com.absfitness.service.FitnessClassService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/fitness-classes")
public class AdminFitnessClassController {

    private final FitnessClassService fitnessClassService;

    public AdminFitnessClassController(FitnessClassService fitnessClassService) {
        this.fitnessClassService = fitnessClassService;
    }

    @GetMapping
    public ResponseEntity<List<FitnessClassDto>> getAllFitnessClasses() {
        List<FitnessClassDto> fitnessClasses = fitnessClassService.getAllFitnessClasses();
        return ResponseEntity.ok(fitnessClasses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FitnessClassDto> getFitnessClassById(@PathVariable Long id) {
        FitnessClassDto fitnessClass = fitnessClassService.getFitnessClassById(id);
        return ResponseEntity.ok(fitnessClass);
    }

    @PostMapping
    public ResponseEntity<FitnessClassDto> createFitnessClass(@RequestBody FitnessClassDto fitnessClassDto) {
        FitnessClassDto createdClass = fitnessClassService.createFitnessClass(fitnessClassDto);
        return new ResponseEntity<>(createdClass, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FitnessClassDto> updateFitnessClass(@PathVariable Long id, @RequestBody FitnessClassDto fitnessClassDto) {
        FitnessClassDto updatedClass = fitnessClassService.updateFitnessClass(id, fitnessClassDto);
        return ResponseEntity.ok(updatedClass);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFitnessClass(@PathVariable Long id) {
        fitnessClassService.deleteFitnessClass(id);
        return ResponseEntity.noContent().build();
    }
}