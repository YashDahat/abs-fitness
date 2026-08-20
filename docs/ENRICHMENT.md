# Feature Enrichment — Attempt 2

Generated: 2026-08-20

Each section is one LLM call (~5–8K tokens). The instruction tells the generator how all files in the feature interact and what contracts they must honour.

---

## Shared Backend Utilities

**Name:** `shared-backend`  
**Type:** SHARED  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/exception/GlobalExceptionHandler.java` — Centralized exception handler for the backend, mapping various exceptions to standardized HTTP responses using the ErrorResponse DTO. It handles ResourceNotFoundException by returning a 404 Not Found status.
- `backend/src/main/java/com/absfitness/exception/ResourceNotFoundException.java` — Custom runtime exception to be thrown when a requested resource (e.g., a database entity) cannot be found, leading to an HTTP 404 response.
- `backend/src/main/java/com/absfitness/dto/ErrorResponse.java` — Data Transfer Object (DTO) for standardizing the format of error messages returned by the API, ensuring consistency across all error responses.

**Feature Instruction:**

The Shared Backend Utilities feature provides foundational components for error handling and standardized API responses across the entire backend. It includes `ResourceNotFoundException`, a custom exception for when an entity is not found, `ErrorResponse` DTO for consistent error reporting, and `GlobalExceptionHandler` to catch and process exceptions, mapping them to appropriate HTTP status codes and `ErrorResponse` bodies. Other features will throw `ResourceNotFoundException` when an entity cannot be found, and `GlobalExceptionHandler` will automatically convert this into a 404 Not Found HTTP response with a structured `ErrorResponse` body. All API controllers across the application will benefit from this centralized error handling, ensuring a consistent client experience.

---

## Membership Management

**Name:** `membership-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/MembershipPlan.java` — JPA Entity — represents a gym membership plan with fields like name, price, and duration.
- `backend/src/main/java/com/absfitness/repository/MembershipPlanRepository.java` — Spring Data JPA Repository — provides CRUD operations for MembershipPlan entities.
- `backend/src/main/java/com/absfitness/service/MembershipPlanService.java` — SERVICE layer — implements createMembershipPlan(MembershipPlanDto): MembershipPlanDto, getAllMembershipPlans(): List<MembershipPlanDto>, getMembershipPlanById(UUID): MembershipPlanDto, updateMembershipPlan(UUID, MembershipPlanDto): MembershipPlanDto, and deleteMembershipPlan(UUID): void.
- `backend/src/main/java/com/absfitness/controller/MembershipPlanController.java` — Public REST controller — exposes GET endpoints for fetching membership plans.
- `backend/src/main/java/com/absfitness/controller/admin/AdminMembershipPlanController.java` — Admin-only REST controller — provides CRUD operations for membership plans.
- `backend/src/main/java/com/absfitness/dto/MembershipPlanDto.java` — Data Transfer Object — used for transferring membership plan data between layers, including validation.
- `backend/src/main/java/com/absfitness/model/MemberSubscription.java` — JPA Entity — represents an active membership subscription for a user, linking to a MembershipPlan.
- `backend/src/main/java/com/absfitness/repository/MemberSubscriptionRepository.java` — Spring Data JPA Repository — provides CRUD operations and custom queries for MemberSubscription entities.
- `backend/src/main/java/com/absfitness/service/MemberSubscriptionService.java` — SERVICE layer — implements createSubscription(UUID, UUID): PaymentOrderResponse, getMemberSubscriptions(UUID): List<MemberSubscription>, updateSubscriptionStatus(UUID, SubscriptionStatus): MemberSubscription, and verifySubscriptionPayment(String, String, String): void.
- `backend/src/main/java/com/absfitness/controller/MemberSubscriptionController.java` — Secure REST controller — allows authenticated members to create and view their subscriptions, and verify payments.

**Feature Instruction:**

The Membership Management feature provides a comprehensive system for defining, managing, and subscribing to gym membership plans. It consists of two main domains: `MembershipPlan` for defining the plans themselves, and `MemberSubscription` for tracking active user subscriptions to these plans. 

**MembershipPlan Management:**

1.  **MembershipPlan.java:** This JPA entity defines the structure of a membership plan, including its unique ID, name, description, duration in months, and price. It serves as the persistent representation of a membership plan in the database.
2.  **MembershipPlanRepository.java:** This Spring Data JPA repository provides standard CRUD operations for `MembershipPlan` entities. It allows for saving, retrieving, updating, and deleting membership plans from the database.
3.  **MembershipPlanDto.java:** This DTO is used for transferring membership plan data between the service layer and the controllers. It mirrors the `MembershipPlan` entity but can be tailored for API exposure, including validation annotations.
4.  **MembershipPlanService.java:** This service layer component encapsulates the business logic for `MembershipPlan` entities. It uses `MembershipPlanRepository` for data access and `MembershipPlanDto` for input and output. It provides methods for creating, retrieving (all or by ID), updating, and deleting membership plans. It throws `ResourceNotFoundException` if a plan is not found during update or delete operations.
    *   `createMembershipPlan(MembershipPlanDto planDto)`: Creates a new membership plan. Validates input using `planDto` and saves it via `MembershipPlanRepository`.
    *   `getAllMembershipPlans()`: Retrieves all available membership plans.
    *   `getMembershipPlanById(UUID id)`: Retrieves a single membership plan by its ID. Throws `ResourceNotFoundException` if not found.
    *   `updateMembershipPlan(UUID id, MembershipPlanDto planDto)`: Updates an existing membership plan. Throws `ResourceNotFoundException` if the plan with the given ID does not exist.
    *   `deleteMembershipPlan(UUID id)`: Deletes a membership plan by its ID. Throws `ResourceNotFoundException` if the plan does not exist.
5.  **MembershipPlanController.java:** This public REST controller exposes endpoints for retrieving membership plans. It injects `MembershipPlanService` and uses `MembershipPlanDto` for responses. It provides an endpoint to fetch all membership plans and another to fetch a single plan by ID.
    *   `GET /api/v1/membership-plans`: Returns a list of all `MembershipPlanDto` objects.
    *   `GET /api/v1/membership-plans/{id}`: Returns a single `MembershipPlanDto` for the given ID. Returns 404 if `ResourceNotFoundException` is thrown by the service.
6.  **AdminMembershipPlanController.java:** This admin-only REST controller provides CRUD endpoints for managing membership plans. It injects `MembershipPlanService` and uses `MembershipPlanDto` for requests and responses. It handles creating, updating, and deleting membership plans, and also provides endpoints to retrieve them.
    *   `POST /api/v1/admin/membership-plans`: Creates a new membership plan. Returns the created `MembershipPlanDto`.
    *   `GET /api/v1/admin/membership-plans`: Returns a list of all `MembershipPlanDto` objects.
    *   `GET /api/v1/admin/membership-plans/{id}`: Returns a single `MembershipPlanDto` for the given ID. Returns 404 if `ResourceNotFoundException` is thrown.
    *   `PUT /api/v1/admin/membership-plans/{id}`: Updates an existing membership plan. Returns the updated `MembershipPlanDto`. Returns 404 if `ResourceNotFoundException` is thrown.
    *   `DELETE /api/v1/admin/membership-plans/{id}`: Deletes a membership plan. Returns 204 No Content on success. Returns 404 if `ResourceNotFoundException` is thrown.

**MemberSubscription Management:**

1.  **MemberSubscription.java:** This JPA entity represents an active subscription for a member. It links to a `MembershipPlan` and includes details like the member's ID, start date, end date, and status. It serves as the persistent representation of a member's subscription.
2.  **MemberSubscriptionRepository.java:** This Spring Data JPA repository provides standard CRUD operations for `MemberSubscription` entities. It also includes custom query methods to find subscriptions by member ID or by status.
3.  **MemberSubscriptionService.java:** This service layer component handles the business logic for `MemberSubscription` entities. It uses `MemberSubscriptionRepository` for data access and interacts with the pre-scaffolded `PaymentService` for payment processing. It provides methods for creating a new subscription, retrieving a member's subscriptions, and updating subscription status.
    *   `createSubscription(UUID memberId, UUID planId)`: Creates a new subscription for a member. It fetches the `MembershipPlan` using `MembershipPlanService.getMembershipPlanById(planId)`. It then initiates a payment via `paymentService.createOrder(new CreatePaymentRequest(amount, "INR", "subscription_" + memberId + "_" + planId))` and saves the `MemberSubscription` with a PENDING status. It returns a `PaymentOrderResponse`.
    *   `getMemberSubscriptions(UUID memberId)`: Retrieves all active and inactive subscriptions for a given member.
    *   `updateSubscriptionStatus(UUID subscriptionId, SubscriptionStatus newStatus)`: Updates the status of a specific subscription. Throws `ResourceNotFoundException` if the subscription is not found.
    *   `verifySubscriptionPayment(String orderId, String paymentId, String signature)`: Verifies a payment for a subscription using `paymentService.verify(new VerifyPaymentRequest(orderId, paymentId, signature))`. If successful, it updates the corresponding `MemberSubscription` status to ACTIVE and sets the start and end dates.
4.  **MemberSubscriptionController.java:** This secure REST controller allows authenticated members to manage their subscriptions. It injects `MemberSubscriptionService`.
    *   `POST /api/v1/member/subscriptions`: Creates a new subscription. Requires `memberId` and `planId` in the request body. Returns a `PaymentOrderResponse`.
    *   `GET /api/v1/member/subscriptions`: Retrieves all subscriptions for the authenticated member. The `memberId` is extracted from the authenticated user's context.
    *   `POST /api/v1/member/subscriptions/verify-payment`: Verifies a payment for a subscription. Requires `orderId`, `paymentId`, and `signature` in the request body. Returns `ResponseEntity<Void>` on success. Returns 400 if payment verification fails.

**Inter-file Wiring:**
*   `MembershipPlanController` and `AdminMembershipPlanController` inject `MembershipPlanService`.
*   `MembershipPlanService` injects `MembershipPlanRepository`.
*   `MemberSubscriptionController` injects `MemberSubscriptionService`.
*   `MemberSubscriptionService` injects `MemberSubscriptionRepository` and the pre-scaffolded `PaymentService`.
*   `MemberSubscriptionService` also calls `MembershipPlanService.getMembershipPlanById()` to retrieve plan details when creating a new subscription.

**Error Handling:**
*   All controllers utilize the `GlobalExceptionHandler` from the `shared-backend` feature to handle exceptions like `ResourceNotFoundException` (returning HTTP 404 Not Found) and `MethodArgumentNotValidException` (returning HTTP 400 Bad Request for DTO validation failures).

---

## Class Management

**Name:** `class-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/FitnessClass.java` — MODEL layer - Represents a bookable fitness class, including schedule, trainer, and capacity.
- `backend/src/main/java/com/absfitness/repository/FitnessClassRepository.java` — REPOSITORY layer - JPA repository for FitnessClass entities, providing standard CRUD and custom query methods.
- `backend/src/main/java/com/absfitness/service/FitnessClassService.java` — SERVICE layer - Implements createFitnessClass(FitnessClassDto): FitnessClassDto, getAllFitnessClasses(): List<FitnessClassDto>, getFitnessClassById(UUID): FitnessClassDto, updateFitnessClass(UUID, FitnessClassDto): FitnessClassDto, and deleteFitnessClass(UUID): void; delegates persistence to FitnessClassRepository and trainer lookup to TrainerService.
- `backend/src/main/java/com/absfitness/controller/FitnessClassController.java` — CONTROLLER layer - Public REST controller for fetching fitness class schedules via getAllFitnessClasses(): ResponseEntity<List<FitnessClassDto>> and getFitnessClassById(UUID): ResponseEntity<FitnessClassDto>.
- `backend/src/main/java/com/absfitness/controller/admin/AdminFitnessClassController.java` — CONTROLLER layer - Admin-only REST controller for CRUD operations on fitness classes via createFitnessClass(FitnessClassDto): ResponseEntity<FitnessClassDto>, getAllFitnessClasses(): ResponseEntity<List<FitnessClassDto>>, getFitnessClassById(UUID): ResponseEntity<FitnessClassDto>, updateFitnessClass(UUID, FitnessClassDto): ResponseEntity<FitnessClassDto>, and deleteFitnessClass(UUID): ResponseEntity<Void>.
- `backend/src/main/java/com/absfitness/dto/FitnessClassDto.java` — DTO layer - Data Transfer Object for FitnessClass entities, used for API request and response bodies.

**Feature Instruction:**

The Class Management feature provides a complete backend solution for managing fitness classes at ABS FITNESS. It includes an entity to represent fitness classes, a repository for persistence, a service layer for business logic, and two controllers: one public for fetching class schedules and one admin-only for CRUD operations. This feature integrates with the `trainer-management` feature to associate classes with trainers.

## FitnessClass.java
This JPA entity defines the structure of a fitness class, including its name, description, schedule, capacity, and associated trainer. It will be mapped to a PostgreSQL table.

## FitnessClassRepository.java
This Spring Data JPA repository provides standard CRUD operations for `FitnessClass` entities. It will also include custom query methods to fetch classes based on various criteria, such as by trainer or by schedule.

## FitnessClassService.java
This service layer handles the core business logic for fitness classes. It interacts with `FitnessClassRepository` for data persistence and with `TrainerService` (from `trainer-management` feature) to retrieve trainer details. All public methods in this service will use `FitnessClassDto` for input and output, ensuring a clean separation between the domain model and the API contract.

### Public Functions:
1. `createFitnessClass(FitnessClassDto fitnessClassDto): FitnessClassDto`
   - Creates a new fitness class.
   - Steps:
     1. Validate `fitnessClassDto` using Bean Validation annotations.
     2. Convert `fitnessClassDto` to a `FitnessClass` entity.
     3. If a `trainerId` is provided in the DTO, fetch the `Trainer` entity using `trainerService.getTrainerById(trainerId)`. Throws `ResourceNotFoundException` if the trainer does not exist.
     4. Save the `FitnessClass` entity using `fitnessClassRepository.save()`.
     5. Convert the saved `FitnessClass` entity back to `FitnessClassDto` and return it.
   - Error Cases:
     - `MethodArgumentNotValidException` (400 Bad Request) if `fitnessClassDto` validation fails.
     - `ResourceNotFoundException` (404 Not Found) if the specified trainer does not exist.

2. `getAllFitnessClasses(): List<FitnessClassDto>`
   - Retrieves all fitness classes.
   - Steps:
     1. Fetch all `FitnessClass` entities from `fitnessClassRepository.findAll()`.
     2. Convert each `FitnessClass` entity to `FitnessClassDto`.
     3. Return the list of `FitnessClassDto`.

3. `getFitnessClassById(UUID id): FitnessClassDto`
   - Retrieves a single fitness class by its ID.
   - Steps:
     1. Fetch the `FitnessClass` entity by `id` from `fitnessClassRepository.findById(id)`.
     2. If the class is not found, throw `ResourceNotFoundException`.
     3. Convert the `FitnessClass` entity to `FitnessClassDto` and return it.
   - Error Cases:
     - `ResourceNotFoundException` (404 Not Found) if the fitness class with the given ID does not exist.

4. `updateFitnessClass(UUID id, FitnessClassDto fitnessClassDto): FitnessClassDto`
   - Updates an existing fitness class.
   - Steps:
     1. Validate `fitnessClassDto` using Bean Validation annotations.
     2. Fetch the existing `FitnessClass` entity by `id` from `fitnessClassRepository.findById(id)`. If not found, throw `ResourceNotFoundException`.
     3. Update the fields of the existing `FitnessClass` entity with values from `fitnessClassDto`.
     4. If a `trainerId` is provided in the DTO, fetch the `Trainer` entity using `trainerService.getTrainerById(trainerId)`. Throws `ResourceNotFoundException` if the trainer does not exist.
     5. Save the updated `FitnessClass` entity using `fitnessClassRepository.save()`.
     6. Convert the saved `FitnessClass` entity back to `FitnessClassDto` and return it.
   - Error Cases:
     - `MethodArgumentNotValidException` (400 Bad Request) if `fitnessClassDto` validation fails.
     - `ResourceNotFoundException` (404 Not Found) if the fitness class or specified trainer does not exist.

5. `deleteFitnessClass(UUID id): void`
   - Deletes a fitness class by its ID.
   - Steps:
     1. Check if the `FitnessClass` entity exists by `id` using `fitnessClassRepository.existsById(id)`. If not found, throw `ResourceNotFoundException`.
     2. Delete the `FitnessClass` entity using `fitnessClassRepository.deleteById(id)`.
   - Error Cases:
     - `ResourceNotFoundException` (404 Not Found) if the fitness class with the given ID does not exist.

## FitnessClassController.java
This controller exposes public API endpoints for retrieving fitness class schedules. It injects `FitnessClassService`.

### Public Functions:
1. `getAllFitnessClasses(): ResponseEntity<List<FitnessClassDto>>`
   - Handles GET requests to `/api/v1/classes`.
   - Calls `fitnessClassService.getAllFitnessClasses()`.
   - Returns a `200 OK` with a list of `FitnessClassDto`.

2. `getFitnessClassById(UUID id): ResponseEntity<FitnessClassDto>`
   - Handles GET requests to `/api/v1/classes/{id}`.
   - Calls `fitnessClassService.getFitnessClassById(id)`.
   - Returns a `200 OK` with the `FitnessClassDto`.
   - Returns `404 Not Found` if `ResourceNotFoundException` is thrown by the service.

## AdminFitnessClassController.java
This controller exposes admin-only API endpoints for CRUD operations on fitness classes. It injects `FitnessClassService`.

### Public Functions:
1. `createFitnessClass(FitnessClassDto fitnessClassDto): ResponseEntity<FitnessClassDto>`
   - Handles POST requests to `/api/v1/admin/classes`.
   - Calls `fitnessClassService.createFitnessClass(fitnessClassDto)`.
   - Returns a `201 Created` with the created `FitnessClassDto`.
   - Returns `400 Bad Request` if `MethodArgumentNotValidException` is thrown by the service.
   - Returns `404 Not Found` if `ResourceNotFoundException` is thrown by the service.

2. `getAllFitnessClasses(): ResponseEntity<List<FitnessClassDto>>`
   - Handles GET requests to `/api/v1/admin/classes`.
   - Calls `fitnessClassService.getAllFitnessClasses()`.
   - Returns a `200 OK` with a list of `FitnessClassDto`.

3. `getFitnessClassById(UUID id): ResponseEntity<FitnessClassDto>`
   - Handles GET requests to `/api/v1/admin/classes/{id}`.
   - Calls `fitnessClassService.getFitnessClassById(id)`.
   - Returns a `200 OK` with the `FitnessClassDto`.
   - Returns `404 Not Found` if `ResourceNotFoundException` is thrown by the service.

4. `updateFitnessClass(UUID id, FitnessClassDto fitnessClassDto): ResponseEntity<FitnessClassDto>`
   - Handles PUT requests to `/api/v1/admin/classes/{id}`.
   - Calls `fitnessClassService.updateFitnessClass(id, fitnessClassDto)`.
   - Returns a `200 OK` with the updated `FitnessClassDto`.
   - Returns `400 Bad Request` if `MethodArgumentNotValidException` is thrown by the service.
   - Returns `404 Not Found` if `ResourceNotFoundException` is thrown by the service.

5. `deleteFitnessClass(UUID id): ResponseEntity<Void>`
   - Handles DELETE requests to `/api/v1/admin/classes/{id}`.
   - Calls `fitnessClassService.deleteFitnessClass(id)`.
   - Returns a `204 No Content` on successful deletion.
   - Returns `404 Not Found` if `ResourceNotFoundException` is thrown by the service.

## FitnessClassDto.java
This DTO defines the data contract for fitness class information exchanged between the client and the server. It includes fields for class details and trainer information, with appropriate Bean Validation annotations.

---

## Booking System

**Name:** `booking-system`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/Booking.java` — MODEL layer — represents a member's booking for a specific fitness class or personal training session.
- `backend/src/main/java/com/absfitness/model/BookingStatus.java` — MODEL layer — enum representing the status of a booking.
- `backend/src/main/java/com/absfitness/repository/BookingRepository.java` — REPOSITORY layer — provides data access operations for Booking entities, including custom queries to find bookings by member ID and fitness class ID.
- `backend/src/main/java/com/absfitness/service/BookingService.java` — SERVICE layer — implements createBooking(CreateBookingRequest, UUID): BookingDto, getBookingById(UUID): BookingDto, getMemberBookings(UUID): List<BookingDto>, getAllBookings(): List<BookingDto>, cancelBooking(UUID, UUID): BookingDto, and adminCancelBooking(UUID): BookingDto; delegates persistence to BookingRepository and notifications to NotificationService.
- `backend/src/main/java/com/absfitness/controller/BookingController.java` — CONTROLLER layer — provides secure REST endpoints for members to manage their own bookings.
- `backend/src/main/java/com/absfitness/controller/admin/AdminBookingController.java` — CONTROLLER layer — provides admin-only REST endpoints for viewing and managing all member bookings.
- `backend/src/main/java/com/absfitness/dto/BookingDto.java` — DTO layer — Data Transfer Object for Booking entities.
- `backend/src/main/java/com/absfitness/dto/CreateBookingRequest.java` — DTO layer — DTO for capturing the required information to create a new booking.

**Feature Instruction:**

The Booking System feature enables members to book fitness classes and personal training sessions, and allows administrators to manage all bookings. It consists of a `Booking` entity, `BookingStatus` enum, `BookingRepository` for persistence, `BookingService` for business logic, and `BookingController` and `AdminBookingController` for exposing REST APIs. It also includes `BookingDto` and `CreateBookingRequest` DTOs for data transfer.

`BookingStatus.java` defines the possible states of a booking: `CONFIRMED`, `CANCELLED`, `PENDING`.

`Booking.java` is the JPA entity representing a booking. It will have fields for `id` (UUID), `memberId` (UUID), `fitnessClass` (many-to-one relationship with `FitnessClass`), `bookingTime` (LocalDateTime), `status` (BookingStatus), and `createdAt` (LocalDateTime).

`BookingRepository.java` extends `JpaRepository<Booking, UUID>` and provides standard CRUD operations. It will also include custom query methods to find bookings by `memberId` and by `fitnessClassId`.

`BookingService.java` orchestrates the business logic. It injects `BookingRepository` and `NotificationService`. Its public methods are:
1. `createBooking(CreateBookingRequest request, UUID memberId)`: 
   - Validates the `CreateBookingRequest`.
   - Fetches the `FitnessClass` using `class-management` feature's `FitnessClassService.getFitnessClassById(request.getFitnessClassId())`. Throws `ResourceNotFoundException` if the class does not exist.
   - Checks if the class capacity allows for a new booking. Throws `IllegalStateException` if the class is full.
   - Creates a new `Booking` entity with `PENDING` status.
   - Saves the booking using `bookingRepository.save()`.
   - Calls `notification-service` feature's `NotificationService.sendBookingConfirmation(booking)` to send a confirmation.
   - Returns a `BookingDto` representation of the created booking.
2. `getBookingById(UUID bookingId)`: 
   - Fetches a booking by its ID using `bookingRepository.findById()`.
   - Throws `ResourceNotFoundException` if the booking is not found.
   - Returns a `BookingDto`.
3. `getMemberBookings(UUID memberId)`: 
   - Fetches all bookings for a given member using `bookingRepository.findByMemberIdOrderByBookingTimeDesc(memberId)`.
   - Returns a `List<BookingDto>`.
4. `getAllBookings()`: 
   - Fetches all bookings using `bookingRepository.findAll()`.
   - Returns a `List<BookingDto>`.
5. `cancelBooking(UUID bookingId, UUID memberId)`: 
   - Fetches the booking by `bookingId` using `bookingRepository.findById()`.
   - Throws `ResourceNotFoundException` if the booking is not found.
   - Checks if the `memberId` matches the booking's `memberId` to ensure the member can only cancel their own booking. Throws `IllegalArgumentException` if not.
   - Updates the booking status to `CANCELLED`.
   - Saves the updated booking using `bookingRepository.save()`.
   - Calls `notification-service` feature's `NotificationService.sendBookingCancellation(booking)`.
   - Returns a `BookingDto` representation of the cancelled booking.
6. `adminCancelBooking(UUID bookingId)`: 
   - Fetches the booking by `bookingId` using `bookingRepository.findById()`.
   - Throws `ResourceNotFoundException` if the booking is not found.
   - Updates the booking status to `CANCELLED`.
   - Saves the updated booking using `bookingRepository.save()`.
   - Calls `notification-service` feature's `NotificationService.sendBookingCancellation(booking)`.
   - Returns a `BookingDto` representation of the cancelled booking.

`BookingController.java` handles member-facing API endpoints:
- `POST /api/v1/bookings`: Creates a new booking for the authenticated member. It expects a `CreateBookingRequest` in the request body and returns a `BookingDto`.
- `GET /api/v1/bookings/me`: Retrieves all bookings for the authenticated member. Returns a `List<BookingDto>`.
- `GET /api/v1/bookings/{id}`: Retrieves a specific booking by ID for the authenticated member. Returns a `BookingDto`.
- `DELETE /api/v1/bookings/{id}`: Cancels a specific booking for the authenticated member. Returns a `BookingDto`.

`AdminBookingController.java` handles admin-facing API endpoints:
- `GET /api/v1/admin/bookings`: Retrieves all bookings in the system. Returns a `List<BookingDto>`.
- `GET /api/v1/admin/bookings/{id}`: Retrieves a specific booking by ID. Returns a `BookingDto`.
- `DELETE /api/v1/admin/bookings/{id}`: Cancels a specific booking. Returns a `BookingDto`.

`BookingDto.java` is the DTO for transferring booking data, containing fields like `id`, `memberId`, `fitnessClassId`, `fitnessClassName`, `bookingTime`, `status`.

`CreateBookingRequest.java` is the DTO for creating a new booking, containing `fitnessClassId`.

Error Handling: `ResourceNotFoundException` (404 Not Found) will be thrown if a booking or fitness class is not found. `IllegalArgumentException` (400 Bad Request) will be thrown for invalid input or unauthorized cancellation attempts. `IllegalStateException` (400 Bad Request) will be thrown if a class is full.

---

## Trainer Management

**Name:** `trainer-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/Trainer.java` — MODEL layer - represents a trainer with a profile, specialties, and a photo, mapped to the database.
- `backend/src/main/java/com/absfitness/repository/TrainerRepository.java` — REPOSITORY layer - JPA repository for Trainer entities, providing standard CRUD operations.
- `backend/src/main/java/com/absfitness/service/TrainerService.java` — SERVICE layer - implements createTrainer(TrainerDto): TrainerDto, getAllTrainers(): List<TrainerDto>, getTrainerById(UUID): TrainerDto, updateTrainer(UUID, TrainerDto): TrainerDto, and deleteTrainer(UUID): void; delegates persistence to TrainerRepository.
- `backend/src/main/java/com/absfitness/controller/TrainerController.java` — CONTROLLER layer - public REST controller for fetching trainer profiles via getAllTrainers(): ResponseEntity<List<TrainerDto>> and getTrainerById(UUID): ResponseEntity<TrainerDto>.
- `backend/src/main/java/com/absfitness/controller/admin/AdminTrainerController.java` — CONTROLLER layer - admin-only REST controller for CRUD operations on trainer profiles via createTrainer(TrainerDto): ResponseEntity<TrainerDto>, getAllTrainers(): ResponseEntity<List<TrainerDto>>, getTrainerById(UUID): ResponseEntity<TrainerDto>, updateTrainer(UUID, TrainerDto): ResponseEntity<TrainerDto>, and deleteTrainer(UUID): ResponseEntity<Void>.
- `backend/src/main/java/com/absfitness/dto/TrainerDto.java` — DTO layer - Data Transfer Object for Trainer entities, used for transferring trainer information between layers.

**Feature Instruction:**

The Trainer Management feature provides a complete backend solution for managing trainer profiles at ABS FITNESS. It includes a `Trainer` entity to represent trainer data, a `TrainerRepository` for database interactions, a `TrainerService` for business logic, and two controllers: `TrainerController` for public access to trainer profiles and `AdminTrainerController` for administrative CRUD operations. The `TrainerDto` facilitates data transfer between layers.

### Trainer.java
This JPA entity defines the structure for storing trainer information, including a unique ID, name, specialties, bio, and a photo URL. It is mapped to a database table and serves as the core data model for trainers.

### TrainerRepository.java
This interface extends `JpaRepository`, providing standard CRUD operations for `Trainer` entities. No custom query methods are required beyond the basic `findAll()`, `findById()`, `save()`, and `deleteById()` inherited from `JpaRepository`.

### TrainerService.java
This service layer class encapsulates the business logic for trainer management. It interacts with `TrainerRepository` to persist and retrieve trainer data. All public methods in this service operate on `TrainerDto` objects, converting them to `Trainer` entities for persistence and back to DTOs for consumption by controllers. It includes methods for creating, retrieving (all or by ID), updating, and deleting trainer profiles. When a trainer is not found, it throws a `ResourceNotFoundException`.

#### Public Methods:
1. `TrainerDto createTrainer(TrainerDto trainerDto)`
   - **Logic:**
     1. Converts the input `trainerDto` to a `Trainer` entity.
     2. Saves the `Trainer` entity using `trainerRepository.save()`.
     3. Converts the saved `Trainer` entity back to a `TrainerDto`.
     4. Returns the created `TrainerDto`.
   - **Error Cases:** None specific to creation, but database constraints might lead to exceptions.

2. `List<TrainerDto> getAllTrainers()`
   - **Logic:**
     1. Retrieves all `Trainer` entities from `trainerRepository.findAll()`.
     2. Converts each `Trainer` entity to a `TrainerDto`.
     3. Returns a list of `TrainerDto`.

3. `TrainerDto getTrainerById(UUID id)`
   - **Logic:**
     1. Retrieves a `Trainer` entity by `id` using `trainerRepository.findById()`.
     2. If the trainer is not found, throws `ResourceNotFoundException` with a message like "Trainer not found with ID: " + id.
     3. Converts the found `Trainer` entity to a `TrainerDto`.
     4. Returns the `TrainerDto`.
   - **Error Cases:** `ResourceNotFoundException` (HTTP 404) if trainer with given ID does not exist.

4. `TrainerDto updateTrainer(UUID id, TrainerDto trainerDto)`
   - **Logic:**
     1. Checks if a trainer with the given `id` exists using `trainerRepository.existsById()`. If not, throws `ResourceNotFoundException`.
     2. Converts the input `trainerDto` to a `Trainer` entity, setting its ID to the provided `id`.
     3. Saves the updated `Trainer` entity using `trainerRepository.save()`.
     4. Converts the saved `Trainer` entity back to a `TrainerDto`.
     5. Returns the updated `TrainerDto`.
   - **Error Cases:** `ResourceNotFoundException` (HTTP 404) if trainer with given ID does not exist.

5. `void deleteTrainer(UUID id)`
   - **Logic:**
     1. Checks if a trainer with the given `id` exists using `trainerRepository.existsById()`. If not, throws `ResourceNotFoundException`.
     2. Deletes the `Trainer` entity by `id` using `trainerRepository.deleteById()`.
   - **Error Cases:** `ResourceNotFoundException` (HTTP 404) if trainer with given ID does not exist.

### TrainerController.java
This REST controller provides public-facing endpoints for retrieving trainer profiles. It injects `TrainerService` and delegates all business logic to it. All endpoints return `ResponseEntity` objects containing `TrainerDto` or a list of `TrainerDto`.

#### Public Functions:
1. `ResponseEntity<List<TrainerDto>> getAllTrainers()`
   - Calls `trainerService.getAllTrainers()`.
   - Returns `ResponseEntity.ok()` with the list of `TrainerDto`.

2. `ResponseEntity<TrainerDto> getTrainerById(UUID id)`
   - Calls `trainerService.getTrainerById(id)`.
   - Returns `ResponseEntity.ok()` with the `TrainerDto`.
   - Handles `ResourceNotFoundException` by returning `HttpStatus.NOT_FOUND`.

### AdminTrainerController.java
This REST controller provides admin-only endpoints for full CRUD operations on trainer profiles. It injects `TrainerService` and delegates all business logic to it. All endpoints return `ResponseEntity` objects containing `TrainerDto`, a list of `TrainerDto`, or `Void`.

#### Public Functions:
1. `ResponseEntity<TrainerDto> createTrainer(TrainerDto trainerDto)`
   - Calls `trainerService.createTrainer(trainerDto)`.
   - Returns `ResponseEntity.status(HttpStatus.CREATED)` with the created `TrainerDto`.

2. `ResponseEntity<List<TrainerDto>> getAllTrainers()`
   - Calls `trainerService.getAllTrainers()`.
   - Returns `ResponseEntity.ok()` with the list of `TrainerDto`.

3. `ResponseEntity<TrainerDto> getTrainerById(UUID id)`
   - Calls `trainerService.getTrainerById(id)`.
   - Returns `ResponseEntity.ok()` with the `TrainerDto`.
   - Handles `ResourceNotFoundException` by returning `HttpStatus.NOT_FOUND`.

4. `ResponseEntity<TrainerDto> updateTrainer(UUID id, TrainerDto trainerDto)`
   - Calls `trainerService.updateTrainer(id, trainerDto)`.
   - Returns `ResponseEntity.ok()` with the updated `TrainerDto`.
   - Handles `ResourceNotFoundException` by returning `HttpStatus.NOT_FOUND`.

5. `ResponseEntity<Void> deleteTrainer(UUID id)`
   - Calls `trainerService.deleteTrainer(id)`.
   - Returns `ResponseEntity.noContent().build()`.
   - Handles `ResourceNotFoundException` by returning `HttpStatus.NOT_FOUND`.

### TrainerDto.java
This DTO defines the data structure for transferring trainer information between the service and controller layers. It includes fields for ID, name, specialties, bio, and photo URL, with appropriate validation annotations.

---

## Content Management

**Name:** `content-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/Review.java` — JPA Entity — represents a curated customer review in the database.
- `backend/src/main/java/com/absfitness/repository/ReviewRepository.java` — REPOSITORY layer — provides data access operations for Review entities.
- `backend/src/main/java/com/absfitness/service/ReviewService.java` — SERVICE layer — implements business logic for managing reviews, including createReview(ReviewDto), getAllReviews(): List<ReviewDto>, getReviewById(UUID): ReviewDto, updateReview(UUID, ReviewDto): ReviewDto, and deleteReview(UUID).
- `backend/src/main/java/com/absfitness/controller/ReviewController.java` — CONTROLLER layer — exposes public REST endpoints for fetching reviews.
- `backend/src/main/java/com/absfitness/controller/admin/AdminReviewController.java` — CONTROLLER layer — exposes admin-only REST endpoints for CRUD operations on reviews.
- `backend/src/main/java/com/absfitness/dto/ReviewDto.java` — Data Transfer Object — used for transferring review data between layers.

**Feature Instruction:**

The Content Management feature handles the creation, retrieval, update, and deletion of curated customer reviews for ABS FITNESS. This feature consists of a `Review` JPA entity, a `ReviewRepository` for data access, a `ReviewService` for business logic, a `ReviewDto` for data transfer, and two controllers: `ReviewController` for public access to reviews, and `AdminReviewController` for administrative CRUD operations. The `ReviewService` orchestrates interactions between the controllers and the repository. Public endpoints allow any visitor to fetch reviews to be displayed on the website, while admin endpoints are secured and require authentication to manage the reviews. All monetary values, if any, will be displayed in Indian Rupees (₹) using the en-IN locale.

---

## Lead Management

**Name:** `lead-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/Enquiry.java` — JPA Entity — represents a lead or enquiry in the database, with fields for contact information and message.
- `backend/src/main/java/com/absfitness/repository/EnquiryRepository.java` — JPA Repository layer — provides CRUD operations for the Enquiry entity.
- `backend/src/main/java/com/absfitness/service/EnquiryService.java` — SERVICE layer — implements createEnquiry(EnquiryDto): EnquiryDto, getAllEnquiries(): List<EnquiryDto>, and getEnquiryById(UUID): EnquiryDto; delegates persistence to EnquiryRepository.
- `backend/src/main/java/com/absfitness/controller/EnquiryController.java` — Public REST controller — exposes an endpoint for unauthenticated users to submit new enquiries.
- `backend/src/main/java/com/absfitness/controller/admin/AdminEnquiryController.java` — Admin REST controller — provides endpoints for authenticated administrators to view and manage enquiries.
- `backend/src/main/java/com/absfitness/dto/EnquiryDto.java` — Data Transfer Object — defines the structure for enquiry data exchanged between layers.

**Feature Instruction:**

The Lead Management feature handles the capture, storage, and retrieval of enquiries submitted by potential members through the ABS FITNESS website. This feature consists of an `Enquiry` JPA entity, an `EnquiryRepository` for persistence, an `EnquiryService` for business logic, and two controllers: `EnquiryController` for public submission and `AdminEnquiryController` for administrative management. 

**EnquiryDto.java**
This DTO defines the structure for transferring enquiry data between the client and the server, and between service and controller layers. It includes fields for `name`, `email`, `phone`, and `message`, with appropriate validation annotations.

**Enquiry.java**
This JPA entity maps to a database table to store enquiry details. It mirrors the fields in `EnquiryDto` and includes an auto-generated `id` (UUID) and `createdAt` timestamp. The entity is managed by Spring Data JPA.

**EnquiryRepository.java**
This repository extends `JpaRepository` to provide standard CRUD operations for the `Enquiry` entity. No custom query methods are required beyond the basic `findAll()` for the admin view.

**EnquiryService.java**
This service layer component encapsulates the business logic for enquiries. It injects `EnquiryRepository` to perform database operations. The `createEnquiry` method takes an `EnquiryDto`, converts it to an `Enquiry` entity, saves it, and returns the saved entity as an `EnquiryDto`. The `getAllEnquiries` method retrieves all enquiries and maps them to a list of `EnquiryDto`s. The `getEnquiryById` method retrieves a single enquiry by its ID, throwing a `ResourceNotFoundException` if not found, and maps it to an `EnquiryDto`.

**EnquiryController.java**
This public REST controller exposes an endpoint for submitting new enquiries. It handles `POST /api/v1/enquiries` requests, accepting an `EnquiryDto` in the request body. It calls `enquiryService.createEnquiry()` and returns the created `EnquiryDto` with an HTTP 201 Created status. This endpoint is accessible to unauthenticated users.

**AdminEnquiryController.java**
This admin-only REST controller provides endpoints for viewing and managing enquiries. It handles `GET /api/v1/admin/enquiries` to retrieve all enquiries and `GET /api/v1/admin/enquiries/{id}` to retrieve a single enquiry by ID. Both methods call the corresponding `EnquiryService` methods and return `EnquiryDto`s. These endpoints require administrative authentication.

**Error Handling:**
Both controllers will leverage the `GlobalExceptionHandler` from the `shared-backend` feature to handle exceptions such as `MethodArgumentNotValidException` (for DTO validation errors) and `ResourceNotFoundException` (thrown by `EnquiryService` if an enquiry is not found).

---

## Notification Service

**Name:** `notification-service`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/service/NotificationService.java` — SERVICE layer — orchestrates the sending of various notifications; implements sendBookingConfirmation(UUID memberId, BookingDto bookingDetails): void and sendMembershipRenewalReminder(UUID memberId, MemberSubscription subscriptionDetails): void; delegates email sending to EmailService.
- `backend/src/main/java/com/absfitness/service/EmailService.java` — SERVICE layer — handles the technical implementation of sending emails; implements sendEmail(String to, String subject, String body): void.
- `backend/src/main/java/com/absfitness/task/MembershipRenewalReminderTask.java` — Scheduled task — runs periodically to identify and send membership renewal reminders; calls MemberSubscriptionService.getUpcomingRenewals(LocalDate date) and NotificationService.sendMembershipRenewalReminder(UUID memberId, MemberSubscription subscriptionDetails).

**Feature Instruction:**

The Notification Service feature is responsible for sending various types of notifications, primarily email, to members. It consists of `NotificationService.java` which orchestrates the sending of different notification types, `EmailService.java` which handles the low-level email sending mechanics, and `MembershipRenewalReminderTask.java` which is a scheduled task to send renewal reminders.

`EmailService.java` provides the core functionality for sending emails. It exposes a `sendEmail(String to, String subject, String body)` method that `NotificationService.java` will call. `NotificationService.java` acts as a higher-level service, providing methods like `sendBookingConfirmation(UUID memberId, BookingDto bookingDetails)` and `sendMembershipRenewalReminder(UUID memberId, MemberSubscription subscriptionDetails)`.

The `MembershipRenewalReminderTask.java` is a `@Scheduled` task that runs periodically. It will inject `MemberSubscriptionService` from the `membership-management` feature to retrieve upcoming membership renewals and then use `NotificationService` to send renewal reminder emails. It will call `memberSubscriptionService.getUpcomingRenewals(LocalDate date)` to fetch subscriptions nearing their renewal date. The `booking-system` feature, which depends on this `notification-service` feature, will use controller orchestration to trigger booking confirmation emails. Specifically, after a booking is successfully created or updated, the `BookingController` will call `notificationService.sendBookingConfirmation`.

All monetary values in emails will be formatted using the `en-IN` locale for Indian Rupees (₹).

---

## Core UI & Static Pages

**Name:** `core-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/App.tsx` — The root component of the React application, responsible for setting up providers and routing for public, authenticated, and admin pages.
- `frontend/src/config/siteConfig.ts` — Central configuration for site-wide branding, navigation links, and contact information, consumed by global layout components and static pages.
- `frontend/src/pages/HomePage.tsx` — Landing page featuring a high-energy hero, USP section, class highlights, membership tiers, reviews, and lead capture, integrating various home-specific components.
- `frontend/src/components/home/HeroSection.tsx` — Full-bleed hero component with a background image, motivational headline, and primary CTA, designed to capture immediate visitor attention.
- `frontend/src/components/home/WhyAbsFitnessSection.tsx` — Highlights key differentiators like the premium location, swimming pool, and top-tier equipment, presented as a compelling value proposition.
- `frontend/src/components/home/ClassHighlights.tsx` — A dynamic grid or carousel showcasing popular fitness classes, fetching data from the class-management feature.
- `frontend/src/components/home/MembershipTiers.tsx` — Displays a summary of key membership plans to drive conversions, fetching data from the membership-management feature.
- `frontend/src/components/home/ReviewsSection.tsx` — Displays curated Google reviews as social proof, building trust with potential members, fetching data via reviewService.
- `frontend/src/components/home/LeadCaptureForm.tsx` — A form for capturing leads for 'Free Trial' or 'Tour Booking' enquiries, submitting data via enquiryService.
- `frontend/src/pages/AboutPage.tsx` — Static page detailing the gym's philosophy, history, and a preview of the training team, using engaging copy and imagery.
- `frontend/src/pages/ContactPage.tsx` — Provides contact details, an embedded Google Map, and a contact/enquiry form, reusing the LeadCaptureForm component.
- `frontend/src/pages/NotFoundPage.tsx` — A user-friendly 404 page to handle invalid routes, providing clear messaging and navigation back to the home page.
- `frontend/src/types/review.ts` — Generated from the backend API contract — TypeScript types and interfaces for curated reviews.
- `frontend/src/services/reviewService.ts` — Provides functions for interacting with the review API endpoints, specifically `getAllReviews(): Promise<Review[]>` and `getReviewById(id: string): Promise<Review>`.
- `frontend/src/types/enquiry.ts` — Generated from the backend API contract — TypeScript types and interfaces for enquiries.
- `frontend/src/services/enquiryService.ts` — Provides functions for interacting with the enquiry API endpoints, specifically `createEnquiry(enquiry: EnquiryRequest): Promise<Enquiry>`.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A1A1A] text-[#FFFFFF]
- Primary CTA: bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Secondary CTA: bg-transparent border border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#FF5722]
- Section bg: bg-[#F5F5F5] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#1A1A1A] leading-relaxed

This feature provides the core UI structure and static content pages for the ABS FITNESS gym website. It defines the main application routing in `App.tsx`, centralizes site configuration in `siteConfig.ts`, and implements key public-facing pages: `HomePage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, and `NotFoundPage.tsx`. The `HomePage.tsx` is composed of several distinct components: `HeroSection.tsx`, `WhyAbsFitnessSection.tsx`, `ClassHighlights.tsx`, `MembershipTiers.tsx`, `ReviewsSection.tsx`, and `LeadCaptureForm.tsx`. These components fetch data from various backend services to display dynamic content such as fitness classes, membership plans, and reviews. The `ContactPage.tsx` reuses the `LeadCaptureForm.tsx` for enquiries. The `review.ts` and `enquiry.ts` files define the TypeScript types for data consumed and submitted, respectively. The `reviewService.ts` and `enquiryService.ts` files provide the frontend service layer for interacting with the backend API endpoints for reviews and enquiries. All monetary values displayed on the site, such as membership prices, must be formatted in Indian Rupees (₹) using the `en-IN` locale.

### `App.tsx`
This file sets up the main routing for the application using `react-router-dom`. It defines routes for the `HomePage`, `AboutPage`, `ContactPage`, and `NotFoundPage`. It also includes routes for authentication pages (`LoginPage`, `SignupPage`) and admin pages, which are handled by other features but integrated here for overall application flow. The `App.tsx` is responsible for wrapping the application with necessary providers, such as the `AuthContext` and `QueryClientProvider` (for TanStack Query, which generates data hooks).

### `siteConfig.ts`
This file exports a `siteConfig` object containing global configuration details. This includes the business name, navigation links for the header and footer, and contact information (address, phone, coordinates, opening hours). This configuration is consumed by the globally applied `SiteHeader` and `SiteFooter` (from the fenced foundation) and the `ContactPage.tsx`.

### `HomePage.tsx`
This page serves as the landing page for ABS FITNESS. It is structured into several sections, each implemented by a dedicated component:
1.  **Hero Section**: Utilizes `HeroSection.tsx` to display a full-bleed hero image with a motivational headline and a primary call-to-action.
2.  **Why ABS FITNESS Section**: Uses `WhyAbsFitnessSection.tsx` to highlight the gym's unique selling points.
3.  **Class Highlights**: Renders `ClassHighlights.tsx` to showcase popular fitness classes. This component will call the generated service function `getAllFitnessClasses(): Promise<FitnessClassDto[]>` from the `class-management` feature to fetch class data.
4.  **Membership Tiers**: Displays `MembershipTiers.tsx` to present a summary of membership plans. This component will call the generated service function `getAllMembershipPlans(): Promise<MembershipPlanDto[]>` from the `membership-management` feature to fetch membership plan data. Prices will be formatted in `en-IN` locale.
5.  **Reviews Section**: Integrates `ReviewsSection.tsx` to show curated customer reviews. This component will call `reviewService.getAllReviews(): Promise<Review[]>` to fetch review data.
6.  **Lead Capture Form**: Includes `LeadCaptureForm.tsx` to allow visitors to submit enquiries for free trials or tour bookings. This component will call `enquiryService.createEnquiry(enquiry: EnquiryRequest): Promise<Enquiry>` to submit the form data.

### `HeroSection.tsx`
This component renders a visually striking hero section. It features a background image (using the provided Unsplash URL for gyms) with a dark overlay, a prominent `h1` headline with the business name and a motivational subheadline, and a primary call-to-action button linking to the membership plans page.

### `WhyAbsFitnessSection.tsx`
This component details the unique advantages of ABS FITNESS. It will present key differentiators such as the premium location, swimming pool, and top-tier equipment in a clean, engaging layout.

### `ClassHighlights.tsx`
This component displays a selection of fitness classes. It will fetch a list of `FitnessClassDto` objects using the generated service function `getAllFitnessClasses()` and render them as cards. Each card will display the class name, description, and schedule time. It will include a call-to-action button (e.g., "View Details" or "Book Now") that navigates to the `/classes` page.

### `MembershipTiers.tsx`
This component showcases the gym's membership plans. It will fetch a list of `MembershipPlanDto` objects using the generated service function `getAllMembershipPlans()` and display them as distinct cards. Each card will detail the plan name, description, duration, and price. Prices will be formatted in Indian Rupees (₹) using the `en-IN` locale. Each card will feature a primary call-to-action button (e.g., "Join Now") that links to the `/membership` page.

### `ReviewsSection.tsx`
This component presents customer testimonials. It will fetch a list of `Review` objects using `reviewService.getAllReviews()` and display them in a visually appealing manner, such as a carousel or grid, to build trust and social proof.

### `LeadCaptureForm.tsx`
This reusable component renders a form for capturing lead information (name, email, phone, message). Upon submission, it calls `enquiryService.createEnquiry(enquiry: EnquiryRequest)` to send the data to the backend. It should provide user feedback on submission success or failure.

### `AboutPage.tsx`
This static page provides information about ABS FITNESS, including its philosophy, history, and a preview of the training team. It will feature engaging copy and imagery consistent with the brand's tone.

### `ContactPage.tsx`
This page provides all necessary contact information for ABS FITNESS. It will display the address, phone number, and opening hours from `siteConfig.ts`. It will also embed a Google Map using the coordinates from `siteConfig.ts` and include an instance of the `LeadCaptureForm.tsx` for direct enquiries.

### `NotFoundPage.tsx`
This page serves as a user-friendly 404 error page, informing the user that the requested resource could not be found and providing a link back to the home page.

### `review.ts`
This file defines the TypeScript interface for a `Review` object, mirroring the `ReviewDto` from the `content-management` backend feature.

### `reviewService.ts`
This file provides a frontend service for interacting with the `/api/v1/reviews` backend endpoints. It exports an `getAllReviews()` function to fetch all reviews and a `getReviewById(id: string)` function to fetch a single review.

### `enquiry.ts`
This file defines the TypeScript interfaces for `Enquiry` and `EnquiryRequest` objects, mirroring the `EnquiryDto` from the `lead-management` backend feature.

### `enquiryService.ts`
This file provides a frontend service for interacting with the `/api/v1/enquiries` backend endpoints. It exports a `createEnquiry(enquiry: EnquiryRequest)` function to submit new enquiries.

---

## Authentication UI

**Name:** `auth-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/LoginPage.tsx` — PAGE layer — renders a login form and handles user authentication using the `useAuth().login()` function.
- `frontend/src/pages/SignupPage.tsx` — PAGE layer — renders a signup form and handles new user registration using the `useAuth().register()` function.
- `frontend/src/components/ProtectedRoute.tsx` — COMPONENT layer — guards routes, redirecting unauthenticated or unauthorized users based on `useAuth().isAuthenticated` and `useAuth().user.roles`.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A1A1A] text-[#FFFFFF]
- Primary CTA: bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#FF5722]
- Section bg: bg-[#F5F5F5] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#1A1A1A] leading-relaxed

This feature provides the user interface for authentication, including login and signup pages, and a protected route component to guard access to authenticated sections of the application. It leverages the pre-scaffolded authentication context (`useAuth()`) for managing user sessions, login, and registration. All forms will include appropriate input validation and display user-friendly error messages. Upon successful authentication, users will be redirected to their intended destination or a default authenticated route.

### LoginPage.tsx
This page renders a login form allowing users to enter their email and password. It uses the `useAuth()` hook to call the `login(email, password)` function. Upon successful login, the user is redirected to the dashboard or the `redirectPath` if provided. The form includes client-side validation for email format and password presence. Error messages from the `login` function are displayed to the user.

### SignupPage.tsx
This page renders a signup form for new users to register. It uses the `useAuth()` hook to call the `register(email, password, name)` function. Upon successful registration, the user is automatically logged in and redirected to the dashboard or the `redirectPath`. The form includes client-side validation for email format, password strength, and matching passwords. Error messages from the `register` function are displayed to the user.

### ProtectedRoute.tsx
This component acts as a wrapper for routes that require authentication. It uses the `useAuth()` hook to check if a user is currently authenticated. If the user is not authenticated, they are redirected to the `/login` page. If the user is authenticated, the component renders its children. It also handles an optional `roles` prop to restrict access based on user roles, redirecting unauthorized users to a `/unauthorized` page (which is outside the scope of this feature).

---

## Admin Portal

**Name:** `admin-portal`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/components/shared/DeleteConfirmationDialog.tsx` — A reusable modal dialog component for confirming destructive actions like deletion or cancellation. It exposes `DeleteConfirmationDialog` as a functional component accepting props for visibility, close handler, confirm handler, title, and description.
- `frontend/src/components/AdminLayout.tsx` — The main layout component for all admin pages, providing a consistent header and sidebar navigation. It exposes `AdminLayout` as a functional component that takes `children` as props.
- `frontend/src/pages/AdminDashboardPage.tsx` — The landing page for the admin portal, displaying key statistics and quick navigation links. This page consumes generated service functions from `membership-management`, `class-management`, and `lead-management` to fetch dashboard data.
- `frontend/src/pages/AdminMembershipPlansPage.tsx` — An admin page for managing membership plans, allowing creation, viewing, editing, and deletion. This page consumes generated service functions from `membership-management` for all CRUD operations.
- `frontend/src/components/membership/MembershipPlanTable.tsx` — A data table component for displaying a list of membership plans with actions for editing and deleting. It exposes `MembershipPlanTable` as a functional component accepting `plans`, `onEdit`, and `onDelete` as props.
- `frontend/src/components/membership/MembershipPlanForm.tsx` — A form component for creating or editing membership plans, typically used within a dialog. It exposes `MembershipPlanForm` as a functional component accepting `initialData` and `onSubmit` as props.
- `frontend/src/pages/AdminClassesPage.tsx` — An admin page for managing fitness classes, allowing creation, viewing, editing, and deletion. This page consumes generated service functions from `class-management` for all CRUD operations.
- `frontend/src/components/classes/FitnessClassTable.tsx` — A data table component for displaying a list of fitness classes with actions for editing and deleting. It exposes `FitnessClassTable` as a functional component accepting `classes`, `onEdit`, and `onDelete` as props.
- `frontend/src/components/classes/FitnessClassForm.tsx` — A form component for creating or editing fitness classes, typically used within a dialog. It exposes `FitnessClassForm` as a functional component accepting `initialData` and `onSubmit` as props.
- `frontend/src/pages/AdminBookingsPage.tsx` — An admin page for viewing and managing all member bookings. This page consumes generated service functions from `booking-system` to fetch and cancel bookings.
- `frontend/src/components/bookings/BookingTable.tsx` — A data table component for displaying a list of member bookings with an option to cancel. It exposes `BookingTable` as a functional component accepting `bookings` and `onCancel` as props.
- `frontend/src/pages/AdminTrainersPage.tsx` — An admin page for managing trainer profiles, allowing creation, viewing, editing, and deletion. This page consumes generated service functions from `trainer-management` for all CRUD operations.
- `frontend/src/components/trainers/TrainerTable.tsx` — A data table component for displaying a list of trainer profiles with actions for editing and deleting. It exposes `TrainerTable` as a functional component accepting `trainers`, `onEdit`, and `onDelete` as props.
- `frontend/src/components/trainers/TrainerForm.tsx` — A form component for creating or editing trainer profiles, typically used within a dialog. It exposes `TrainerForm` as a functional component accepting `initialData` and `onSubmit` as props.
- `frontend/src/pages/AdminReviewsPage.tsx` — An admin page for managing curated reviews, allowing creation, viewing, editing, and deletion. This page consumes generated service functions from `content-management` for all CRUD operations.
- `frontend/src/components/reviews/ReviewTable.tsx` — A data table component for displaying a list of curated reviews with actions for editing and deleting. It exposes `ReviewTable` as a functional component accepting `reviews`, `onEdit`, and `onDelete` as props.
- `frontend/src/components/reviews/ReviewForm.tsx` — A form component for creating or editing curated reviews, typically used within a dialog. It exposes `ReviewForm` as a functional component accepting `initialData` and `onSubmit` as props.
- `frontend/src/pages/AdminEnquiriesPage.tsx` — An admin page for viewing submitted enquiries from lead capture forms. This page consumes generated service functions from `lead-management` to fetch enquiry data.
- `frontend/src/components/enquiries/EnquiryTable.tsx` — A data table component for displaying a list of submitted enquiries with an option to view details. It exposes `EnquiryTable` as a functional component accepting `enquiries` and `onViewDetails` as props.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A1A1A] text-[#FFFFFF]
- Primary CTA: bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-lg px-6 py-3 transition-all duration-200
- Secondary CTA: border border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white font-semibold rounded-lg px-6 py-3 transition-all duration-200
- Brand text accent: text-[#FF5722]
- Section bg: bg-[#F5F5F5] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#1A1A1A] leading-relaxed

The Admin Portal feature provides a comprehensive interface for managing various aspects of the ABS FITNESS gym, including membership plans, fitness classes, bookings, trainers, reviews, and enquiries. It consists of a main layout component, `AdminLayout.tsx`, which provides a consistent navigation sidebar and header for all admin pages. Each administrative domain (memberships, classes, etc.) has its own dedicated page, such as `AdminMembershipPlansPage.tsx`, `AdminClassesPage.tsx`, `AdminBookingsPage.tsx`, `AdminTrainersPage.tsx`, `AdminReviewsPage.tsx`, and `AdminEnquiriesPage.tsx`. These pages utilize shared components like `DeleteConfirmationDialog.tsx` for common actions and domain-specific components like `MembershipPlanTable.tsx` and `MembershipPlanForm.tsx` for data display and manipulation.

All admin pages are wrapped by the `AdminLayout` component, which provides a consistent sidebar navigation. The `AdminLayout` component takes `children` as props, rendering the content of the current admin page within its layout. Authentication is handled by the fenced `ProtectedRoute` from `auth-ui`, ensuring that only authenticated users with appropriate roles can access these pages.

Each admin page (e.g., `AdminMembershipPlansPage.tsx`, `AdminClassesPage.tsx`) follows a similar pattern:
1. It fetches a list of entities (e.g., `MembershipPlanDto`, `FitnessClassDto`) using the generated service functions (e.g., `getAllMembershipPlans()`, `getAllFitnessClasses()`).
2. It displays these entities in a data table component (e.g., `MembershipPlanTable.tsx`, `FitnessClassTable.tsx`), which allows for viewing, sorting, and filtering.
3. It provides functionality to create new entities and edit existing ones using a form component (e.g., `MembershipPlanForm.tsx`, `FitnessClassForm.tsx`), typically rendered within a modal dialog.
4. It includes a `DeleteConfirmationDialog.tsx` for confirming deletion actions, which then calls the appropriate delete service function (e.g., `deleteMembershipPlan(id)`, `deleteFitnessClass(id)`).

**Data Flow and Interactions:**
- **AdminLayout.tsx:** Renders the sidebar navigation and wraps all admin content. It does not directly interact with backend services but provides the structural foundation for the admin section.
- **AdminDashboardPage.tsx:** Serves as the landing page for the admin portal. It will display summary statistics (e.g., total members, upcoming classes, new enquiries) by calling relevant generated service functions from `membership-management`, `class-management`, and `lead-management` features. It will also provide quick links to other admin sections.
- **AdminMembershipPlansPage.tsx:**
    - Fetches all membership plans using the generated service function `getAllMembershipPlans(): Promise<MembershipPlanDto[]>`. 
    - Displays them in `MembershipPlanTable.tsx`.
    - When creating a new plan, opens `MembershipPlanForm.tsx` in a dialog. On submission, calls `createMembershipPlan(plan: MembershipPlanDto): Promise<MembershipPlanDto>`.
    - When editing a plan, fetches the specific plan using `getMembershipPlanById(id: string): Promise<MembershipPlanDto>`, populates `MembershipPlanForm.tsx` with the data, and on submission, calls `updateMembershipPlan(id: string, plan: MembershipPlanDto): Promise<MembershipPlanDto>`.
    - When deleting a plan, opens `DeleteConfirmationDialog.tsx`. On confirmation, calls `deleteMembershipPlan(id: string): Promise<void>`.
- **AdminClassesPage.tsx:**
    - Fetches all fitness classes using the generated service function `getAllFitnessClasses(): Promise<FitnessClassDto[]>`. 
    - Displays them in `FitnessClassTable.tsx`.
    - When creating a new class, opens `FitnessClassForm.tsx` in a dialog. On submission, calls `createFitnessClass(fitnessClass: FitnessClassDto): Promise<FitnessClassDto>`.
    - When editing a class, fetches the specific class using `getFitnessClassById(id: string): Promise<FitnessClassDto>`, populates `FitnessClassForm.tsx` with the data, and on submission, calls `updateFitnessClass(id: string, fitnessClass: FitnessClassDto): Promise<FitnessClassDto>`.
    - When deleting a class, opens `DeleteConfirmationDialog.tsx`. On confirmation, calls `deleteFitnessClass(id: string): Promise<void>`.
- **AdminBookingsPage.tsx:**
    - Fetches all bookings using the generated service function `getAllBookings(): Promise<BookingDto[]>`. 
    - Displays them in `BookingTable.tsx`.
    - Provides an option to cancel a booking, which opens `DeleteConfirmationDialog.tsx` (repurposed for cancellation) and on confirmation, calls `adminCancelBooking(id: string): Promise<BookingDto>`.
- **AdminTrainersPage.tsx:**
    - Fetches all trainers using the generated service function `getAllTrainers(): Promise<TrainerDto[]>`. 
    - Displays them in `TrainerTable.tsx`.
    - When creating a new trainer, opens `TrainerForm.tsx` in a dialog. On submission, calls `createTrainer(trainer: TrainerDto): Promise<TrainerDto>`.
    - When editing a trainer, fetches the specific trainer using `getTrainerById(id: string): Promise<TrainerDto>`, populates `TrainerForm.tsx` with the data, and on submission, calls `updateTrainer(id: string, trainer: TrainerDto): Promise<TrainerDto>`.
    - When deleting a trainer, opens `DeleteConfirmationDialog.tsx`. On confirmation, calls `deleteTrainer(id: string): Promise<void>`.
- **AdminReviewsPage.tsx:**
    - Fetches all reviews using the generated service function `getAllReviews(): Promise<ReviewDto[]>`. 
    - Displays them in `ReviewTable.tsx`.
    - When creating a new review, opens `ReviewForm.tsx` in a dialog. On submission, calls `createReview(review: ReviewDto): Promise<ReviewDto>`.
    - When editing a review, fetches the specific review using `getReviewById(id: string): Promise<ReviewDto>`, populates `ReviewForm.tsx` with the data, and on submission, calls `updateReview(id: string, review: ReviewDto): Promise<ReviewDto>`.
    - When deleting a review, opens `DeleteConfirmationDialog.tsx`. On confirmation, calls `deleteReview(id: string): Promise<void>`.
- **AdminEnquiriesPage.tsx:**
    - Fetches all enquiries using the generated service function `getAllEnquiries(): Promise<EnquiryDto[]>`. 
    - Displays them in `EnquiryTable.tsx`.
    - Provides an option to view enquiry details by calling `getEnquiryById(id: string): Promise<EnquiryDto>`.

**Shared Components:**
- **DeleteConfirmationDialog.tsx:** A reusable modal dialog that takes `isOpen`, `onClose`, `onConfirm`, `title`, and `description` as props. It is used across various admin pages to confirm deletion or cancellation actions.
- **MembershipPlanTable.tsx, FitnessClassTable.tsx, BookingTable.tsx, TrainerTable.tsx, ReviewTable.tsx, EnquiryTable.tsx:** These table components are responsible for rendering lists of their respective entities, handling sorting, filtering, and pagination. They receive the data as props and emit events for edit/delete actions.
- **MembershipPlanForm.tsx, FitnessClassForm.tsx, TrainerForm.tsx, ReviewForm.tsx:** These form components are used for creating and editing entities. They receive initial data (for edits) and an `onSubmit` callback. They handle form validation and state management.

All monetary values displayed in the admin portal, such as membership plan prices, should be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

---

## Membership Sales Flow

**Name:** `membership-sales`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/membership.ts` — Generated from the backend API contract — defines TypeScript types for membership plans and subscription-related data transfer objects.
- `frontend/src/services/membershipService.ts` — SERVICE layer — provides asynchronous functions to interact with the membership-management backend API, including getAllMembershipPlans(): Promise<MembershipPlan[]> and createSubscription(planId: string): Promise<PaymentOrderResponse> and verifyPayment(request: VerifyPaymentRequest): Promise<void>.
- `frontend/src/pages/MembershipPage.tsx` — PAGE layer — fetches and displays all available membership plans using MembershipPlanCard components, with CTAs to add plans to the cart and navigate to checkout.
- `frontend/src/components/membership/MembershipPlanCard.tsx` — COMPONENT layer — displays the details of a single membership plan and provides a 'Join Now' CTA to add the plan to the cart.
- `frontend/src/pages/CheckoutPage.tsx` — PAGE layer — orchestrates the multi-step checkout process for memberships, handling cart integration, payment initiation, and payment verification.
- `frontend/src/components/checkout/PaymentStep.tsx` — COMPONENT layer — handles the integration with the payment gateway for the checkout process, displaying the total amount and capturing payment details.
- `frontend/src/components/checkout/ConfirmationStep.tsx` — COMPONENT layer — displays order confirmation details after a successful payment, including the purchased membership plan and total amount.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A1A1A] text-[#FFFFFF]
- Primary CTA: bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#FF5722]
- Section bg: bg-white (odd sections) / bg-[#F5F5F5] (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#1A1A1A] leading-relaxed

This feature provides the frontend user interface and logic for displaying membership plans and handling the checkout process for purchasing a membership. It consists of TypeScript types, a service for API interaction, a page to display membership plans, a component for individual plan cards, a multi-step checkout page, and components for payment and confirmation steps.

The `membership.ts` file defines the `MembershipPlan` interface, which mirrors the `MembershipPlanDto` from the `membership-management` backend feature. It also defines `CreateSubscriptionRequest` and `PaymentOrderResponse` types for the checkout flow.

The `membershipService.ts` file exports asynchronous functions to interact with the `membership-management` backend API. It includes `getAllMembershipPlans()` to fetch all available plans and `createSubscription(planId: UUID): Promise<PaymentOrderResponse>` to initiate a new membership subscription. It also includes `verifyPayment(request: VerifyPaymentRequest): Promise<void>` to confirm the payment with the backend.

The `MembershipPage.tsx` component is responsible for fetching and displaying all available membership plans. It uses the `getAllMembershipPlans` capability from `membershipService.ts` to retrieve the data. It renders a hero section with a motivational headline like "Unlock Your Potential with ABS FITNESS Memberships" and a subheadline "Choose the plan that fits your fitness journey." Below the hero, it displays a grid of `MembershipPlanCard` components, each representing a membership plan. Each card will have a prominent "Join Now" CTA that, when clicked, will add the selected membership plan to the cart using `useCart().addItem()` and navigate the user to the `/checkout` page.

The `MembershipPlanCard.tsx` component receives a `MembershipPlan` object as a prop. It displays the plan's `name`, `description`, `durationInMonths`, and `price`. The price should be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`. The card includes a "Join Now" button that triggers the `onSelectPlan` callback, passing the `MembershipPlan` object.

The `CheckoutPage.tsx` component orchestrates the multi-step checkout process. It uses the `useCheckout` hook from `@/cart` to manage the checkout steps. The steps include a review of the selected membership plan (from the cart), a payment step, and a confirmation step. It reads the `cartItems` and `totals.total` from `useCart()`. The page will display the total amount in Indian Rupees (₹). When the user proceeds to payment, it calls `membershipService.createSubscription` with the `id` of the membership plan from the cart. Upon successful payment, it calls `membershipService.verifyPayment` and then navigates to the confirmation step. The page will display a clear heading like "Complete Your Membership Purchase" and guide the user through the steps.

The `PaymentStep.tsx` component is rendered within the `CheckoutPage.tsx`. It is responsible for integrating with the payment gateway. It will display the total amount due, formatted in Indian Rupees (₹). It will use the `PaymentOrderResponse` received from `membershipService.createSubscription` to initiate the payment process. Upon successful payment, it will call the `onPaymentSuccess` callback, passing the payment details (orderId, paymentId, signature) to the `CheckoutPage`.

The `ConfirmationStep.tsx` component is displayed after a successful payment. It will show a success message like "Congratulations! Your ABS FITNESS Membership is Confirmed!" and display the membership plan name and the total amount paid, formatted in Indian Rupees (₹). It will also provide a call to action to navigate to the member's dashboard or home page.

All monetary values displayed in this feature, including membership plan prices, cart totals, and payment amounts, must be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

---

## Class & Trainer Booking

**Name:** `class-booking`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/fitnessClass.ts` — Generated from the backend API contract — defines TypeScript interfaces for fitness class data.
- `frontend/src/services/fitnessClassService.ts` — Frontend service layer — provides functions to fetch fitness class data from the backend API.
- `frontend/src/types/booking.ts` — Generated from the backend API contract — defines TypeScript interfaces for class booking data.
- `frontend/src/services/bookingService.ts` — Frontend service layer — provides functions to interact with the class booking backend API.
- `frontend/src/types/trainer.ts` — Generated from the backend API contract — defines TypeScript interfaces for trainer profile data.
- `frontend/src/services/trainerService.ts` — Frontend service layer — provides functions to fetch trainer data from the backend API.
- `frontend/src/pages/ClassesPage.tsx` — PAGE layer — displays an interactive weekly schedule of fitness classes and handles class booking.
- `frontend/src/components/classes/ClassSchedule.tsx` — COMPONENT layer — displays a calendar or timeline of fitness classes.
- `frontend/src/components/classes/BookingModal.tsx` — COMPONENT layer — a modal dialog for confirming and submitting class booking details.
- `frontend/src/pages/TrainersPage.tsx` — PAGE layer — displays a gallery of all fitness trainers.
- `frontend/src/components/trainers/TrainerCard.tsx` — COMPONENT layer — displays a summary card for a single trainer.
- `frontend/src/pages/TrainersDetailPage.tsx` — PAGE layer — displays a detailed profile for a single trainer.
- `frontend/src/components/trainers/TrainerDetail.tsx` — COMPONENT layer — lays out the detailed information for a trainer profile.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A1A1A] text-[#FFFFFF]
- Primary CTA: bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#FF5722]
- Section bg: bg-[#F5F5F5] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#1A1A1A] leading-relaxed

This feature provides the frontend for users to browse fitness classes and trainers, view their details, and book classes. It consists of several TypeScript type definitions, service functions for API interaction, and React components for UI presentation.

### Data Types
- `frontend/src/types/fitnessClass.ts` defines the `FitnessClassDto` interface, mirroring the backend `FitnessClassDto` from the `class-management` feature. It includes fields like `id`, `name`, `description`, `scheduleTime`, `durationMinutes`, `capacity`, `trainerId`, and `trainerName`.
- `frontend/src/types/booking.ts` defines the `BookingDto` and `CreateBookingRequest` interfaces, mirroring the backend DTOs from the `booking-system` feature. `BookingDto` includes `id`, `memberId`, `fitnessClassId`, `fitnessClassName`, `bookingTime`, and `status`. `CreateBookingRequest` contains `fitnessClassId`.
- `frontend/src/types/trainer.ts` defines the `TrainerDto` interface, mirroring the backend `TrainerDto` from the `trainer-management` feature. It includes fields like `id`, `name`, `specialties`, `bio`, and `photoUrl`.

### Service Layer
- `frontend/src/services/fitnessClassService.ts` provides asynchronous functions to interact with the `/api/v1/classes` backend endpoints. It exports `getAllFitnessClasses(): Promise<FitnessClassDto[]>` to fetch all available classes and `getFitnessClassById(id: string): Promise<FitnessClassDto>` to retrieve details for a specific class.
- `frontend/src/services/bookingService.ts` provides asynchronous functions to interact with the `/api/v1/bookings` backend endpoints. It exports `createBooking(request: CreateBookingRequest): Promise<BookingDto>` to create a new booking and `cancelBooking(id: string): Promise<BookingDto>` to cancel an existing booking.
- `frontend/src/services/trainerService.ts` provides asynchronous functions to interact with the `/api/v1/trainers` backend endpoints. It exports `getAllTrainers(): Promise<TrainerDto[]>` to fetch all trainers and `getTrainerById(id: string): Promise<TrainerDto>` to retrieve details for a specific trainer.

### UI Pages
- `frontend/src/pages/ClassesPage.tsx` is the main page for displaying fitness classes. It fetches all fitness classes using `fitnessClassService.getAllFitnessClasses()`. It renders a hero section with a motivational headline, followed by a `ClassSchedule` component to display the classes. When a user selects a class, it opens a `BookingModal` to confirm booking details. The page uses the design tokens for its layout and styling, including a hero image with an overlay and a prominent headline: "Achieve Your Fitness Goals with Expert-Led Classes at ABS FITNESS".
- `frontend/src/pages/TrainersPage.tsx` displays a gallery of all trainers. It fetches all trainers using `trainerService.getAllTrainers()` and renders them using `TrainerCard` components. The page includes a hero section with a headline: "Meet Our World-Class Trainers at ABS FITNESS".
- `frontend/src/pages/TrainersDetailPage.tsx` shows the detailed profile of a single trainer. It retrieves the trainer ID from the URL parameters and fetches the trainer's details using `trainerService.getTrainerById(id)`. It then renders the `TrainerDetail` component to display the trainer's information and any associated classes (which it will fetch using `fitnessClassService.getAllFitnessClasses()` and filter by `trainerId`). The page features a hero section with the trainer's name as the headline.

### UI Components
- `frontend/src/components/classes/ClassSchedule.tsx` receives a list of `FitnessClassDto[]` as props and renders them in a weekly schedule format. Each class entry should be clickable, emitting an event or calling a prop function with the selected `FitnessClassDto` to trigger the `BookingModal`.
- `frontend/src/components/classes/BookingModal.tsx` is a modal dialog that takes a `FitnessClassDto` as a prop. It displays the class details and a form for the user to confirm the booking. Upon confirmation, it calls `bookingService.createBooking()` with a `CreateBookingRequest` containing the `fitnessClassId`. It should provide feedback to the user (e.g., using a toast notification) on booking success or failure.
- `frontend/src/components/trainers/TrainerCard.tsx` receives a `TrainerDto` as a prop and displays the trainer's photo, name, and specialties. It should be clickable, navigating to the `TrainersDetailPage` for that trainer.
- `frontend/src/components/trainers/TrainerDetail.tsx` receives a `TrainerDto` as a prop and displays the trainer's full bio, qualifications, and a list of classes they teach. It will fetch classes using `fitnessClassService.getAllFitnessClasses()` and filter by the trainer's ID.

All monetary values (e.g., class prices, if applicable) must be displayed in Indian Rupees (₹) using the `en-IN` locale.

---

## Photo & Video Gallery

**Name:** `gallery-display`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/GalleryPage.tsx` — PAGE layer — displays a static photo and video gallery of the gym facility.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A1A1A] text-[#FFFFFF]
- Primary CTA: bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#FF5722]
- Section bg: bg-[#F5F5F5] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#1A1A1A] leading-relaxed

The `GalleryPage.tsx` file is responsible for displaying a high-quality photo and video gallery of the ABS FITNESS facility. It will utilize a clean, spacious layout with dynamic visuals, reflecting the gym's premium, high-energy, and modern aesthetic. The page will be structured into distinct sections to showcase different aspects of the gym, such as equipment, classes, and member experiences. The content will be hardcoded within the page, focusing on high-resolution images and embedded video links to convey a motivational and professional tone. All monetary values, if any, will be displayed in Indian Rupees (₹) using the `en-IN` locale.

### GalleryPage.tsx
This page will render a full-width hero section at the top, featuring a dynamic video background or a high-resolution image, a bold headline, and a motivational subheadline. Below the hero, it will present a series of gallery sections. Each section will have a clear heading and a grid layout for images and embedded videos. Images will be displayed using `<img>` tags with appropriate `alt` text, and videos will be embedded using `<iframe>` tags from platforms like YouTube or Vimeo. The page will use Tailwind CSS classes derived from the design tokens to ensure a consistent visual style.

---

## Member Account Portal

**Name:** `member-account`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/account/ProfilePage.tsx` — Member portal page for viewing and updating personal account details, consuming user profile data and rendering `ProfileForm.tsx`.
- `frontend/src/components/account/ProfileForm.tsx` — A form component for editing the logged-in user's profile information, handling form submission and validation.
- `frontend/src/pages/account/MyBookingsPage.tsx` — Member portal page for viewing upcoming and past class bookings, fetching data from `booking-system` and rendering `BookingsList.tsx`.
- `frontend/src/components/account/BookingsList.tsx` — A component displaying a list of the user's bookings with an option to cancel, consuming `BookingDto`.
- `frontend/src/pages/account/MyMembershipPage.tsx` — Member portal page for viewing current membership status and payment history, fetching data from `membership-management` and rendering `MembershipDetails.tsx`.
- `frontend/src/components/account/MembershipDetails.tsx` — Component displaying the details of the user's current membership plan and status, consuming `MemberSubscription`.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A1A1A] text-[#FFFFFF]
- Primary CTA: bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#FF5722]
- Section bg: bg-[#F5F5F5] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#1A1A1A] leading-relaxed

The Member Account Portal feature provides a personalized experience for logged-in users to manage their profile, view bookings, and check membership status. It consists of three main pages: `ProfilePage.tsx`, `MyBookingsPage.tsx`, and `MyMembershipPage.tsx`, each supported by dedicated components and consuming backend services.

`ProfilePage.tsx` will display the user's profile information using the `ProfileForm.tsx` component. This page will fetch the current user's profile details from the backend (implicitly via `useAuth().user` which is populated from the `/api/v1/users/me` endpoint) and allow updates. The `ProfileForm.tsx` component will handle the form submission to update the user's profile, calling a generated service function to interact with the backend's user profile update endpoint. It will display form fields for name, email, and other relevant profile details, applying validation and providing feedback to the user.

`MyBookingsPage.tsx` will display a list of the member's upcoming and past fitness class bookings. It will fetch booking data by calling the generated service function `getMemberBookings(): Promise<BookingDto[]>` from the `booking-system` feature. The page will render these bookings using the `BookingsList.tsx` component. `BookingsList.tsx` will display each booking with details such as class name, schedule time, and status. It will also provide a 'Cancel' button for each booking, which, when clicked, will call the generated service function `cancelBooking(id: string): Promise<BookingDto>` from the `booking-system` feature, updating the booking status and refreshing the list.

`MyMembershipPage.tsx` will present the member's current membership details and historical payment information. It will retrieve membership subscription data by calling the generated service function `getMemberSubscriptions(): Promise<MemberSubscription[]>` from the `membership-management` feature. The page will then render these details using the `MembershipDetails.tsx` component. `MembershipDetails.tsx` will display the membership plan name, start and end dates, and status. It will also show a history of payments associated with the membership, formatted in Indian Rupees (₹) using the `en-IN` locale.

All pages will be protected routes, ensuring only authenticated members can access them. The `ProfilePage.tsx` and `MyBookingsPage.tsx` will utilize the `useAuth()` hook to get the current user's ID for fetching user-specific data. Error handling and loading states will be implemented across all pages and components to provide a robust user experience. All monetary values will be displayed in Indian Rupees (₹) using the `en-IN` locale.

---

## Infrastructure

**Name:** `infrastructure`  
**Type:** INFRA  
**Change required:** true

**Feature Instruction:**

_Not enriched (INFRA or skipped)._

---

