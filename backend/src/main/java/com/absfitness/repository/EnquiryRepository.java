package com.absfitness.repository;

import com.absfitness.model.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, UUID> {}
