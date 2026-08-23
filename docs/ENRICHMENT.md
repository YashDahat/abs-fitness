# Feature Enrichment — Attempt 3

Generated: 2026-08-23

Each section is one LLM call (~5–8K tokens). The instruction tells the generator how all files in the feature interact and what contracts they must honour.

---

## Shared Backend

**Name:** `shared-backend`  
**Type:** SHARED  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/exception/GlobalExceptionHandler.java` — Centralized exception handler for the application, mapping specific exceptions to standardized `ErrorResponse` DTOs and appropriate HTTP status codes.
- `backend/src/main/java/com/absfitness/dto/ErrorResponse.java` — Data Transfer Object (DTO) defining the standardized structure for API error responses.
- `backend/src/main/java/com/absfitness/exception/ResourceNotFoundException.java` — Custom exception class to be thrown when a requested resource is not found, which is then handled by `GlobalExceptionHandler`.

**Feature Instruction:**

This feature provides core backend utilities for error handling and common exceptions. `GlobalExceptionHandler.java` acts as a centralized exception handler for the entire application. It intercepts specific exceptions, such as `ResourceNotFoundException`, and maps them to appropriate HTTP status codes and a standardized `ErrorResponse` DTO. This ensures that all API error responses have a consistent structure, improving API consumer experience. `ErrorResponse.java` defines this standardized structure, including fields for a timestamp, HTTP status, error message, and path. `ResourceNotFoundException.java` is a custom exception that should be thrown by services when a requested resource (e.g., a `MembershipPlan`, `FitnessClass`, or `Trainer`) cannot be found in the database. Services across all other backend features will throw `ResourceNotFoundException` when an entity is not found, and `GlobalExceptionHandler` will catch it and return a 404 Not Found response with an `ErrorResponse` body.

---

## Membership Management (Backend)

**Name:** `membership-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/MembershipPlan.java` — MODEL layer — defines the data structure for a gym membership plan.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; name: String; description: String; price: BigDecimal; durationInMonths: Integer; isActive: Boolean }
- `backend/src/main/java/com/absfitness/repository/MembershipPlanRepository.java` — REPOSITORY layer — provides data access operations for MembershipPlan entities, including fetching active plans.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<MembershipPlan> findByIsActiveTrue()
- `backend/src/main/java/com/absfitness/service/MembershipPlanService.java` — SERVICE layer — implements business logic for managing membership plans, including CRUD and fetching active plans.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<MembershipPlanDto> getAllMembershipPlans(); List<MembershipPlanDto> getActiveMembershipPlans(); MembershipPlanDto getMembershipPlanById(Long id); MembershipPlanDto createMembershipPlan(MembershipPlanDto membershipPlanDto); MembershipPlanDto updateMembershipPlan(Long id, MembershipPlanDto membershipPlanDto); void deleteMembershipPlan(Long id)
- `backend/src/main/java/com/absfitness/controller/MembershipPlanController.java` — CONTROLLER layer — exposes public REST endpoints for fetching available membership plans.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<MembershipPlanDto> getActiveMembershipPlans(); MembershipPlanDto getMembershipPlanById(Long id)
- `backend/src/main/java/com/absfitness/controller/admin/AdminMembershipPlanController.java` — CONTROLLER layer — exposes admin-only REST endpoints for full CRUD operations on membership plans.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<MembershipPlanDto> getAllMembershipPlans(); MembershipPlanDto getMembershipPlanById(Long id); MembershipPlanDto createMembershipPlan(MembershipPlanDto membershipPlanDto); MembershipPlanDto updateMembershipPlan(Long id, MembershipPlanDto membershipPlanDto); void deleteMembershipPlan(Long id)
- `backend/src/main/java/com/absfitness/dto/MembershipPlanDto.java` — DTO layer — Data Transfer Object for MembershipPlan entities, used for API requests and responses.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; name: String; description: String; price: BigDecimal; durationInMonths: Integer; isActive: Boolean }
- `backend/src/main/java/com/absfitness/model/MemberSubscription.java` — MODEL layer — defines the data structure for a member's subscription to a membership plan.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; userId: Integer; membershipPlan: MembershipPlan; startDate: LocalDate; endDate: LocalDate; status: SubscriptionStatus }
- `backend/src/main/java/com/absfitness/repository/MemberSubscriptionRepository.java` — REPOSITORY layer — provides data access operations for MemberSubscription entities, including finding subscriptions by user and status.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<MemberSubscription> findByUserId(Integer userId); List<MemberSubscription> findByUserIdAndStatus(Integer userId, SubscriptionStatus status); Optional<MemberSubscription> findByIdAndUserId(Long id, Integer userId)
- `backend/src/main/java/com/absfitness/service/MemberSubscriptionService.java` — SERVICE layer — handles business logic for creating, viewing, and cancelling member subscriptions.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<MemberSubscriptionDto> getMemberSubscriptions(Integer userId); MemberSubscriptionDto getMemberSubscriptionById(Long subscriptionId, Integer userId); MemberSubscriptionDto createMemberSubscription(Integer userId, Long membershipPlanId); MemberSubscriptionDto cancelMemberSubscription(Long subscriptionId, Integer userId)
- `backend/src/main/java/com/absfitness/controller/MemberSubscriptionController.java` — CONTROLLER layer — exposes authenticated REST endpoints for members to view and manage their own subscriptions.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<MemberSubscriptionDto> getMemberSubscriptions(@CurrentUser Integer userId); MemberSubscriptionDto getMemberSubscriptionById(Long id, @CurrentUser Integer userId); MemberSubscriptionDto createMemberSubscription(CreateSubscriptionRequestDto createDto, @CurrentUser Integer userId); MemberSubscriptionDto cancelMemberSubscription(Long id, @CurrentUser Integer userId)
- `backend/src/main/java/com/absfitness/dto/MemberSubscriptionDto.java` — DTO layer — Data Transfer Object for MemberSubscription entities, used for API requests and responses.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; userId: Integer; membershipPlan: MembershipPlanDto; startDate: LocalDate; endDate: LocalDate; status: SubscriptionStatus }

**Feature Instruction:**

The Membership Management feature provides a complete backend solution for defining gym membership plans and tracking member subscriptions. It consists of two main domain entities: `MembershipPlan` and `MemberSubscription`, each with its own repository, service, and DTOs. Public endpoints allow any visitor to view available membership plans, while authenticated members can view their own subscriptions. Admin-only endpoints provide full CRUD capabilities for managing both membership plans and member subscriptions.

**MembershipPlan Management Flow:**
1.  **`MembershipPlan` (Model):** Defines the structure for a membership plan, including `id`, `name`, `description`, `price`, `durationInMonths`, and `isActive`.
2.  **`MembershipPlanRepository` (Repository):** Provides standard JPA CRUD operations for `MembershipPlan` entities. It also includes a custom query `findByIsActiveTrue()` to fetch only active plans.
3.  **`MembershipPlanDto` (DTO):** A DTO for transferring `MembershipPlan` data between layers, including validation annotations.
4.  **`MembershipPlanService` (Service):** Encapsulates the business logic for membership plans. It provides methods to:
    *   `getAllMembershipPlans()`: Fetches all membership plans, active or inactive.
    *   `getActiveMembershipPlans()`: Fetches only active membership plans.
    *   `getMembershipPlanById(Long id)`: Retrieves a specific membership plan by its ID. Throws `ResourceNotFoundException` if the plan does not exist.
    *   `createMembershipPlan(MembershipPlanDto dto)`: Creates a new membership plan. Validates input and saves the entity.
    *   `updateMembershipPlan(Long id, MembershipPlanDto dto)`: Updates an existing membership plan. Throws `ResourceNotFoundException` if the plan does not exist.
    *   `deleteMembershipPlan(Long id)`: Deletes a membership plan by its ID. Throws `ResourceNotFoundException` if the plan does not exist.
5.  **`MembershipPlanController` (Public Controller):** Exposes public API endpoints for retrieving membership plans. It injects `MembershipPlanService` and calls `getActiveMembershipPlans()` and `getMembershipPlanById()`.
6.  **`AdminMembershipPlanController` (Admin Controller):** Exposes admin-only API endpoints for full CRUD operations on membership plans. It injects `MembershipPlanService` and calls `getAllMembershipPlans()`, `getMembershipPlanById()`, `createMembershipPlan()`, `updateMembershipPlan()`, and `deleteMembershipPlan()`.

**MemberSubscription Management Flow:**
1.  **`MemberSubscription` (Model):** Defines the structure for a member's subscription, including `id`, `userId`, `membershipPlan` (ManyToOne relationship), `startDate`, `endDate`, and `status`.
2.  **`MemberSubscriptionRepository` (Repository):** Provides standard JPA CRUD operations for `MemberSubscription` entities. It includes custom queries like `findByUserId(Integer userId)` to fetch all subscriptions for a specific user and `findByUserIdAndStatus(Integer userId, SubscriptionStatus status)`.
3.  **`MemberSubscriptionDto` (DTO):** A DTO for transferring `MemberSubscription` data between layers, including validation annotations.
4.  **`MemberSubscriptionService` (Service):** Handles business logic for member subscriptions. It injects `MemberSubscriptionRepository` and `MembershipPlanService` to retrieve plan details. It provides methods to:
    *   `getMemberSubscriptions(Integer userId)`: Retrieves all subscriptions for a given user ID. This method is called by `MemberSubscriptionController`.
    *   `getMemberSubscriptionById(Long id, Integer userId)`: Retrieves a specific subscription for a given user ID and subscription ID. Throws `ResourceNotFoundException` if the subscription does not exist or does not belong to the user.
    *   `createMemberSubscription(Integer userId, Long membershipPlanId)`: Creates a new member subscription. It fetches the `MembershipPlan` using `MembershipPlanService.getMembershipPlanById()`, calculates `startDate` and `endDate`, and sets the initial `status` to `ACTIVE`. It then saves the `MemberSubscription` entity.
    *   `cancelMemberSubscription(Long subscriptionId, Integer userId)`: Cancels an active subscription. It retrieves the subscription, verifies ownership, sets the `status` to `CANCELLED`, and saves the updated entity. Throws `ResourceNotFoundException` if the subscription is not found or `IllegalStateException` if the subscription cannot be cancelled (e.g., already cancelled or expired).
5.  **`MemberSubscriptionController` (Authenticated Controller):** Exposes authenticated API endpoints for members to view and manage their own subscriptions. It injects `MemberSubscriptionService` and obtains the `userId` from `@CurrentUser`. It calls `getMemberSubscriptions()` and `cancelMemberSubscription()`.

**Error Handling:**
Both services throw `ResourceNotFoundException` (from `shared-backend`) when an entity is not found, which is handled globally by `GlobalExceptionHandler` to return a 404 Not Found response. `MemberSubscriptionService` also throws `IllegalStateException` for invalid state transitions (e.g., cancelling an already cancelled subscription), which `GlobalExceptionHandler` maps to a 400 Bad Request.

**Cross-Feature Interactions:**
-   This feature depends on the `shared-backend` feature for `ResourceNotFoundException` and `ErrorResponse` DTOs.
-   `MemberSubscriptionService` uses the `MembershipPlanService` to fetch `MembershipPlan` details when creating a new subscription.
-   The `MemberSubscriptionController` and `AdminMembershipPlanController` use the `@CurrentUser` annotation to obtain the `userId` from the authenticated context, which is provided by the fenced authentication system.

---

## Class Management (Backend)

**Name:** `class-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/FitnessClass.java` — MODEL layer — JPA entity representing a schedulable fitness class, including its schedule, capacity, and associated trainer.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; name: String; description: String; scheduleTime: LocalDateTime; durationMinutes: Integer; capacity: Integer; bookedSlots: Integer; trainer: Trainer }
- `backend/src/main/java/com/absfitness/repository/FitnessClassRepository.java` — REPOSITORY layer — provides data access operations for FitnessClass entities, extending JpaRepository.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<FitnessClass> findByTrainerId(Long trainerId); List<FitnessClass> findAvailableClasses(LocalDateTime currentTime)
- `backend/src/main/java/com/absfitness/service/FitnessClassService.java` — SERVICE layer — implements business logic for managing fitness classes, including CRUD operations and availability checks.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<FitnessClassDto> getAllFitnessClasses(); FitnessClassDto getFitnessClassById(Long id); FitnessClassDto createFitnessClass(FitnessClassDto fitnessClassDto); FitnessClassDto updateFitnessClass(Long id, FitnessClassDto fitnessClassDto); void deleteFitnessClass(Long id); List<FitnessClassDto> getClassesByTrainerId(Long trainerId); List<FitnessClassDto> getAvailableClasses()
- `backend/src/main/java/com/absfitness/controller/FitnessClassController.java` — CONTROLLER layer — exposes public REST API endpoints for fetching fitness class schedules.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: ResponseEntity<List<FitnessClassDto>> getAllAvailableFitnessClasses(); ResponseEntity<FitnessClassDto> getFitnessClassById(Long id)
- `backend/src/main/java/com/absfitness/controller/admin/AdminFitnessClassController.java` — CONTROLLER layer — exposes admin-only REST API endpoints for CRUD operations on fitness classes.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: ResponseEntity<List<FitnessClassDto>> getAllFitnessClasses(); ResponseEntity<FitnessClassDto> getFitnessClassById(Long id); ResponseEntity<FitnessClassDto> createFitnessClass(FitnessClassDto fitnessClassDto); ResponseEntity<FitnessClassDto> updateFitnessClass(Long id, FitnessClassDto fitnessClassDto); ResponseEntity<Void> deleteFitnessClass(Long id)
- `backend/src/main/java/com/absfitness/dto/FitnessClassDto.java` — DTO layer — Data Transfer Object for FitnessClass entities, used for request and response bodies.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; name: String; description: String; scheduleTime: LocalDateTime; durationMinutes: Integer; capacity: Integer; bookedSlots: Integer; trainerId: Long; trainerName: String }

**Feature Instruction:**

This feature manages the backend for fitness classes at ABS FITNESS, covering both public visibility and administrative CRUD operations. It defines the `FitnessClass` entity, its repository, a service layer for business logic, and two controllers: one for public access to view classes and another for admin-only management. The `FitnessClassDto` serves as the data transfer object for all class-related operations.

**FitnessClass.java**
Represents a single fitness class with attributes like name, description, schedule, capacity, and a reference to the `Trainer` who conducts it. It will be a JPA entity.

**FitnessClassRepository.java**
Extends `JpaRepository` for `FitnessClass` entities, providing standard CRUD operations. It will include custom queries to find classes by trainer, date, or availability.

**FitnessClassDto.java**
This DTO will mirror the `FitnessClass` entity but will be used for all data transfer between the service and controller layers. It will include validation annotations for incoming requests.

**FitnessClassService.java**
This service layer orchestrates business logic for fitness classes. It injects `FitnessClassRepository` to interact with the database and `TrainerService` from the `trainer-management` feature to validate trainer assignments. It exposes methods for:
1. `getAllFitnessClasses()`: Returns a list of all `FitnessClassDto` objects.
2. `getFitnessClassById(Long id)`: Returns a `FitnessClassDto` for a given ID, throwing `ResourceNotFoundException` if not found.
3. `createFitnessClass(FitnessClassDto dto)`: Creates a new fitness class. It validates the `trainerId` by calling `trainerService.getTrainerById(dto.getTrainerId())` to ensure the trainer exists. If the trainer is not found, it throws `IllegalArgumentException`. It then saves the new class to the repository and returns the saved `FitnessClassDto`.
4. `updateFitnessClass(Long id, FitnessClassDto dto)`: Updates an existing fitness class. It first fetches the existing class using `getFitnessClassById`. It then validates the `trainerId` if provided, similar to `createFitnessClass`. It updates the entity fields from the DTO, saves it, and returns the updated `FitnessClassDto`.
5. `deleteFitnessClass(Long id)`: Deletes a fitness class by ID, throwing `ResourceNotFoundException` if not found.
6. `getClassesByTrainerId(Long trainerId)`: Returns a list of `FitnessClassDto` objects associated with a specific trainer.
7. `getAvailableClasses()`: Returns a list of `FitnessClassDto` objects for classes that are not yet full and are scheduled in the future.

**FitnessClassController.java**
This controller exposes public API endpoints for viewing fitness classes. It injects `FitnessClassService`.
1. `GET /api/v1/fitness-classes`: Returns a list of all available `FitnessClassDto` objects. This endpoint is publicly accessible.
2. `GET /api/v1/fitness-classes/{id}`: Returns a single `FitnessClassDto` by ID. This endpoint is publicly accessible.

**AdminFitnessClassController.java**
This controller exposes admin-only API endpoints for managing fitness classes. It injects `FitnessClassService`.
1. `GET /api/v1/admin/fitness-classes`: Returns a list of all `FitnessClassDto` objects. This endpoint requires admin authentication.
2. `GET /api/v1/admin/fitness-classes/{id}`: Returns a single `FitnessClassDto` by ID. This endpoint requires admin authentication.
3. `POST /api/v1/admin/fitness-classes`: Creates a new fitness class from a `FitnessClassDto` request body. This endpoint requires admin authentication.
4. `PUT /api/v1/admin/fitness-classes/{id}`: Updates an existing fitness class by ID with data from a `FitnessClassDto` request body. This endpoint requires admin authentication.
5. `DELETE /api/v1/admin/fitness-classes/{id}`: Deletes a fitness class by ID. This endpoint requires admin authentication.

Error Handling: Both controllers will leverage `GlobalExceptionHandler` from the `shared-backend` feature to handle `ResourceNotFoundException` (returning 404 NOT FOUND) and other general exceptions (returning 500 INTERNAL SERVER ERROR).

---

## Booking System (Backend)

**Name:** `booking-system`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/Booking.java` — JPA Entity representing a member's booking for a fitness class. It defines the structure of booking records in the database.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; userId: Integer; fitnessClass: FitnessClass; bookingTime: LocalDateTime; status: BookingStatus }
- `backend/src/main/java/com/absfitness/repository/BookingRepository.java` — REPOSITORY layer — provides data access operations for Booking entities, including custom queries to find bookings by user and upcoming bookings for reminders.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<Booking> findByUserId(Integer userId); boolean existsByFitnessClass_IdAndUserIdAndStatus(Long fitnessClassId, Integer userId, BookingStatus status); List<Booking> findByStatusAndFitnessClass_ScheduleTimeBetween(BookingStatus status, LocalDateTime start, LocalDateTime end); Optional<Booking> findByIdAndUserId(Long id, Integer userId)
- `backend/src/main/java/com/absfitness/service/BookingService.java` — SERVICE layer — implements createBooking(Integer userId, CreateBookingRequest request): BookingDto, getMemberBookings(Integer userId): List<BookingDto>, cancelBooking(Long bookingId, Integer userId): BookingDto, getAllBookings(): List<BookingDto>, and getBookingById(Long bookingId): BookingDto; delegates persistence to BookingRepository and interacts with FitnessClassService, MemberSubscriptionService, and NotificationService.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: BookingDto createBooking(Integer userId, CreateBookingRequest request); List<BookingDto> getMemberBookings(Integer userId); BookingDto cancelBooking(Long bookingId, Integer userId); List<BookingDto> getAllBookings(); BookingDto getBookingById(Long bookingId)
- `backend/src/main/java/com/absfitness/controller/BookingController.java` — REST CONTROLLER layer — handles authenticated member requests for creating, viewing, and cancelling their own bookings, delegating to BookingService.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: BookingDto createBooking(Integer userId, CreateBookingRequest request); List<BookingDto> getMemberBookings(Integer userId); BookingDto cancelBooking(Long bookingId, Integer userId)
- `backend/src/main/java/com/absfitness/controller/admin/AdminBookingController.java` — REST CONTROLLER layer — handles admin requests for viewing and managing all member bookings, delegating to BookingService.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<BookingDto> getAllBookings(); BookingDto getBookingById(Long bookingId)
- `backend/src/main/java/com/absfitness/dto/BookingDto.java` — Data Transfer Object for Booking entities, used for exposing booking details via the API.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; userId: Integer; fitnessClassId: Long; fitnessClassName: String; scheduleTime: LocalDateTime; durationMinutes: Integer; bookingTime: LocalDateTime; status: BookingStatus }
- `backend/src/main/java/com/absfitness/dto/CreateBookingRequest.java` — Data Transfer Object for creating a new booking, used as the request body for booking creation API.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { fitnessClassId: Long }
- `backend/src/main/java/com/absfitness/service/NotificationService.java` — SERVICE layer — provides methods for sending various email notifications related to bookings, such as confirmations, cancellations, and reminders.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: void sendBookingConfirmationEmail(Integer userId, BookingDto bookingDto); void sendBookingCancellationEmail(Integer userId, BookingDto bookingDto); void sendBookingReminderEmail(BookingDto bookingDto)
- `backend/src/main/java/com/absfitness/service/BookingReminderService.java` — SERVICE layer — a scheduled service that periodically identifies upcoming confirmed bookings and dispatches email reminders via NotificationService.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: void sendRemindersForUpcomingBookings()

**Feature Instruction:**

The Booking System (Backend) feature manages member bookings for fitness classes and personal training sessions. It provides APIs for members to create, view, and cancel their own bookings, and for administrators to view and manage all bookings. The system integrates with the `class-management` feature to retrieve fitness class details and with the `membership-management` feature to verify active member subscriptions. It also includes a scheduled service to send email reminders for upcoming bookings using the `NotificationService`.

### Booking Flow:
1.  **Member creates a booking:** A member sends a `POST` request to `/api/v1/bookings` with a `CreateBookingRequest` containing the `fitnessClassId`. The `BookingController` receives this request, extracts the `userId` from the authenticated session, and delegates to `BookingService.createBooking(Integer userId, CreateBookingRequest request)`.
2.  **Service logic for creating a booking:**
    a.  `BookingService.createBooking` first validates that the `userId` has an active membership by calling `memberSubscriptionService.findByUserIdAndStatus(userId, SubscriptionStatus.ACTIVE)`. If no active membership is found, it throws an `IllegalStateException`.
    b.  It then fetches the `FitnessClass` details using `fitnessClassService.getFitnessClassById(request.getFitnessClassId())`. If the class is not found, it throws a `ResourceNotFoundException`.
    c.  It checks if the class has available slots (`fitnessClass.getCapacity() > fitnessClass.getBookedSlots()`). If not, it throws an `IllegalStateException`.
    d.  It checks if the user has already booked this specific class. If so, it throws an `IllegalStateException`.
    e.  It creates a new `Booking` entity, sets the `userId`, `fitnessClass`, `bookingTime` (current time), and `status` to `CONFIRMED`.
    f.  It saves the `Booking` entity using `bookingRepository.save(booking)`.
    g.  It increments the `bookedSlots` for the `FitnessClass` by calling `fitnessClassService.incrementBookedSlots(fitnessClass.getId())`.
    h.  It sends a booking confirmation email to the member using `notificationService.sendBookingConfirmationEmail(userId, bookingDto)`.
    i.  It returns the created `BookingDto`.
3.  **Member views bookings:** A member sends a `GET` request to `/api/v1/bookings`. The `BookingController` retrieves the `userId` and calls `BookingService.getMemberBookings(Integer userId)`. This method fetches all bookings for the given `userId` from `bookingRepository` and returns a `List<BookingDto>`.
4.  **Member cancels a booking:** A member sends a `PUT` request to `/api/v1/bookings/{bookingId}/cancel`. The `BookingController` retrieves the `userId` and `bookingId`, then calls `BookingService.cancelBooking(Long bookingId, Integer userId)`.
    a.  `BookingService.cancelBooking` fetches the `Booking` by `bookingId` and verifies that the `userId` matches the booking's `userId`. If not found or not owned by the user, it throws a `ResourceNotFoundException`.
    b.  It updates the `Booking` status to `CANCELLED` and saves it.
    c.  It decrements the `bookedSlots` for the associated `FitnessClass` by calling `fitnessClassService.decrementBookedSlots(booking.getFitnessClass().getId())`.
    d.  It sends a cancellation confirmation email using `notificationService.sendBookingCancellationEmail(userId, bookingDto)`.
    e.  It returns the updated `BookingDto`.

### Admin Functionality:
1.  **Admin views all bookings:** An admin sends a `GET` request to `/api/v1/admin/bookings`. The `AdminBookingController` calls `BookingService.getAllBookings()` which retrieves all bookings from `bookingRepository` and returns a `List<BookingDto>`.
2.  **Admin views a specific booking:** An admin sends a `GET` request to `/api/v1/admin/bookings/{bookingId}`. The `AdminBookingController` calls `BookingService.getBookingById(Long bookingId)` which fetches the booking by ID and returns a `BookingDto`.

### Scheduled Reminders:
-   The `BookingReminderService` is a `@Scheduled` service that runs periodically.
-   It queries `bookingRepository` for `CONFIRMED` bookings that are scheduled for the next 24 hours but have not yet had a reminder sent.
-   For each such booking, it calls `notificationService.sendBookingReminderEmail(bookingDto)` and updates the booking status to `REMINDER_SENT`.

### Data Transfer Objects (DTOs):
-   `BookingDto`: Used for exposing booking details via the API. Contains `id`, `userId`, `fitnessClassId`, `fitnessClassName`, `scheduleTime`, `durationMinutes`, `bookingTime`, and `status`.
-   `CreateBookingRequest`: Used for receiving new booking requests. Contains `fitnessClassId`.

### Exceptions:
-   `ResourceNotFoundException`: Thrown when a requested booking or fitness class is not found. Handled by `GlobalExceptionHandler` returning HTTP 404.
-   `IllegalStateException`: Thrown for business rule violations (e.g., no active membership, class full, already booked). Handled by `GlobalExceptionHandler` returning HTTP 400.

### Inter-feature Dependencies:
-   `BookingService` injects `BookingRepository`, `FitnessClassService` (from `class-management`), `MemberSubscriptionService` (from `membership-management`), and `NotificationService`.
-   `BookingReminderService` injects `BookingRepository` and `NotificationService`.
-   `BookingController` and `AdminBookingController` inject `BookingService`.
-   `NotificationService` is a standalone service within this feature, responsible for sending emails. It does not depend on other business services.

---

## Trainer Management (Backend)

**Name:** `trainer-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/Trainer.java` — MODEL layer — represents a personal trainer with attributes like name, specialty, and a profile image URL.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; name: String; specialty: String; bio: String; imageUrl: String; experienceYears: Integer }
- `backend/src/main/java/com/absfitness/repository/TrainerRepository.java` — REPOSITORY layer — provides standard CRUD operations for Trainer entities.
- `backend/src/main/java/com/absfitness/service/TrainerService.java` — SERVICE layer — implements business logic for managing trainer profiles, including `getAllTrainers(): List<TrainerDto>`, `getTrainerById(Long id): TrainerDto`, `createTrainer(TrainerDto trainerDto): TrainerDto`, `updateTrainer(Long id, TrainerDto trainerDto): TrainerDto`, and `deleteTrainer(Long id): void`.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<TrainerDto> getAllTrainers(); TrainerDto getTrainerById(Long id); TrainerDto createTrainer(TrainerDto trainerDto); TrainerDto updateTrainer(Long id, TrainerDto trainerDto); void deleteTrainer(Long id)
- `backend/src/main/java/com/absfitness/controller/TrainerController.java` — CONTROLLER layer — exposes public REST endpoints for fetching trainer profiles via `getAllTrainers(): ResponseEntity<List<TrainerDto>>` and `getTrainerById(Long id): ResponseEntity<TrainerDto>>`.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: ResponseEntity<List<TrainerDto>> getAllTrainers(); ResponseEntity<TrainerDto> getTrainerById(Long id)
- `backend/src/main/java/com/absfitness/controller/admin/AdminTrainerController.java` — CONTROLLER layer — exposes admin-only REST endpoints for CRUD operations on trainers via `getAllTrainers(): ResponseEntity<List<TrainerDto>>`, `getTrainerById(Long id): ResponseEntity<TrainerDto>>`, `createTrainer(TrainerDto trainerDto): ResponseEntity<TrainerDto>>`, `updateTrainer(Long id, TrainerDto trainerDto): ResponseEntity<TrainerDto>>`, and `deleteTrainer(Long id): ResponseEntity<Void>>`.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: ResponseEntity<List<TrainerDto>> getAllTrainers(); ResponseEntity<TrainerDto> getTrainerById(Long id); ResponseEntity<TrainerDto> createTrainer(TrainerDto trainerDto); ResponseEntity<TrainerDto> updateTrainer(Long id, TrainerDto trainerDto); ResponseEntity<Void> deleteTrainer(Long id)
- `backend/src/main/java/com/absfitness/dto/TrainerDto.java` — DTO layer — Data Transfer Object for Trainer entities, used for request and response bodies.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; name: String; specialty: String; bio: String; imageUrl: String; experienceYears: Integer }

**Feature Instruction:**

The Trainer Management feature provides a complete backend solution for managing personal trainer profiles at ABS FITNESS. It includes a `Trainer` entity to store trainer details, a `TrainerRepository` for database interactions, a `TrainerService` for business logic, and two controllers: `TrainerController` for public access to trainer profiles and `AdminTrainerController` for administrative CRUD operations. The `TrainerDto` facilitates data transfer between layers.

**Trainer.java**
Represents a personal trainer. It will have fields for `id`, `name`, `specialty`, `bio`, `imageUrl`, and `experienceYears`. The `id` will be a `Long` and serve as the primary key. `imageUrl` will store a URL to the trainer's photo.

**TrainerRepository.java**
This interface extends `JpaRepository<Trainer, Long>` to provide standard CRUD operations for `Trainer` entities. No custom query methods are required for this feature.

**TrainerService.java**
This service class encapsulates the business logic for trainer management. It injects `TrainerRepository` to perform database operations. It provides the following public methods:
1. `getAllTrainers(): List<TrainerDto>`:
   - Retrieves all `Trainer` entities from the repository.
   - Maps each `Trainer` entity to a `TrainerDto`.
   - Returns a list of `TrainerDto`.
2. `getTrainerById(Long id): TrainerDto`:
   - Retrieves a `Trainer` entity by its `id` from the repository.
   - If the trainer is not found, throws `ResourceNotFoundException`.
   - Maps the `Trainer` entity to a `TrainerDto`.
   - Returns the `TrainerDto`.
3. `createTrainer(TrainerDto trainerDto): TrainerDto`:
   - Maps the input `TrainerDto` to a new `Trainer` entity.
   - Saves the new `Trainer` entity using the repository.
   - Maps the saved `Trainer` entity back to a `TrainerDto`.
   - Returns the created `TrainerDto`.
4. `updateTrainer(Long id, TrainerDto trainerDto): TrainerDto`:
   - Retrieves an existing `Trainer` entity by `id` from the repository.
   - If the trainer is not found, throws `ResourceNotFoundException`.
   - Updates the fields of the existing `Trainer` entity with values from `trainerDto`.
   - Saves the updated `Trainer` entity using the repository.
   - Maps the updated `Trainer` entity back to a `TrainerDto`.
   - Returns the updated `TrainerDto`.
5. `deleteTrainer(Long id): void`:
   - Checks if a `Trainer` with the given `id` exists.
   - If not found, throws `ResourceNotFoundException`.
   - Deletes the `Trainer` entity by `id` from the repository.

**TrainerController.java**
This controller handles public API requests related to trainer profiles. It injects `TrainerService`.
1. `getAllTrainers(): ResponseEntity<List<TrainerDto>>`:
   - Handles GET requests to `/api/v1/trainers`.
   - Calls `trainerService.getAllTrainers()`.
   - Returns a `200 OK` response with a list of `TrainerDto`.
2. `getTrainerById(Long id): ResponseEntity<TrainerDto>`:
   - Handles GET requests to `/api/v1/trainers/{id}`.
   - Calls `trainerService.getTrainerById(id)`.
   - Returns a `200 OK` response with the `TrainerDto`.
   - If `ResourceNotFoundException` is thrown by the service, returns `404 NOT FOUND`.

**AdminTrainerController.java**
This controller handles administrative API requests for managing trainer profiles. It injects `TrainerService`.
1. `getAllTrainers(): ResponseEntity<List<TrainerDto>>`:
   - Handles GET requests to `/api/v1/admin/trainers`.
   - Calls `trainerService.getAllTrainers()`.
   - Returns a `200 OK` response with a list of `TrainerDto`.
2. `getTrainerById(Long id): ResponseEntity<TrainerDto>`:
   - Handles GET requests to `/api/v1/admin/trainers/{id}`.
   - Calls `trainerService.getTrainerById(id)`.
   - Returns a `200 OK` response with the `TrainerDto`.
   - If `ResourceNotFoundException` is thrown by the service, returns `404 NOT FOUND`.
3. `createTrainer(TrainerDto trainerDto): ResponseEntity<TrainerDto>`:
   - Handles POST requests to `/api/v1/admin/trainers`.
   - Validates the `trainerDto` using `@Valid`.
   - Calls `trainerService.createTrainer(trainerDto)`.
   - Returns a `201 CREATED` response with the created `TrainerDto`.
4. `updateTrainer(Long id, TrainerDto trainerDto): ResponseEntity<TrainerDto>`:
   - Handles PUT requests to `/api/v1/admin/trainers/{id}`.
   - Validates the `trainerDto` using `@Valid`.
   - Calls `trainerService.updateTrainer(id, trainerDto)`.
   - Returns a `200 OK` response with the updated `TrainerDto`.
   - If `ResourceNotFoundException` is thrown by the service, returns `404 NOT FOUND`.
5. `deleteTrainer(Long id): ResponseEntity<Void>`:
   - Handles DELETE requests to `/api/v1/admin/trainers/{id}`.
   - Calls `trainerService.deleteTrainer(id)`.
   - Returns a `204 NO CONTENT` response.
   - If `ResourceNotFoundException` is thrown by the service, returns `404 NOT FOUND`.

**TrainerDto.java**
This DTO defines the structure for transferring trainer data. It will include fields for `id`, `name`, `specialty`, `bio`, `imageUrl`, and `experienceYears`. All fields except `id` should have appropriate Bean Validation annotations like `@NotBlank` and `@NotNull`.

---

## Inquiry Management (Backend)

**Name:** `inquiry-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/Inquiry.java` — MODEL layer — represents a lead capture inquiry with fields for contact details, type, and submission timestamp.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; name: String; email: String; phone: String; inquiryType: InquiryType; message: String; submissionTime: LocalDateTime }
- `backend/src/main/java/com/absfitness/model/InquiryType.java` — MODEL layer — an enum defining the distinct types of inquiries that can be submitted.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { FREE_TRIAL: enum; TOUR_BOOKING: enum; GENERAL_INQUIRY: enum }
- `backend/src/main/java/com/absfitness/repository/InquiryRepository.java` — REPOSITORY layer — provides standard CRUD operations for `Inquiry` entities.
- `backend/src/main/java/com/absfitness/service/InquiryService.java` — SERVICE layer — implements `createInquiry(CreateInquiryRequest): InquiryDto`, `getAllInquiries(): List<InquiryDto>`, `getInquiryById(Long): InquiryDto`, and `deleteInquiry(Long): void` for managing lead inquiries; delegates persistence to `InquiryRepository`.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: InquiryDto createInquiry(CreateInquiryRequest createInquiryRequest); List<InquiryDto> getAllInquiries(); InquiryDto getInquiryById(Long id); void deleteInquiry(Long id)
- `backend/src/main/java/com/absfitness/controller/InquiryController.java` — CONTROLLER layer — exposes public REST endpoints for submitting new inquiries.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: InquiryDto createInquiry(CreateInquiryRequest createInquiryRequest)
- `backend/src/main/java/com/absfitness/controller/admin/AdminInquiryController.java` — CONTROLLER layer — exposes admin-only REST endpoints for viewing and managing inquiries.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<InquiryDto> getAllInquiries(); InquiryDto getInquiryById(Long id); void deleteInquiry(Long id)
- `backend/src/main/java/com/absfitness/dto/InquiryDto.java` — DTO layer — represents the data structure for an inquiry when exposed via the API.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; name: String; email: String; phone: String; inquiryType: InquiryType; message: String; submissionTime: LocalDateTime }
- `backend/src/main/java/com/absfitness/dto/CreateInquiryRequest.java` — DTO layer — defines the data structure for creating a new inquiry via the API.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { name: String; email: String; phone: String; inquiryType: InquiryType; message: String }

**Feature Instruction:**

The Inquiry Management feature handles the submission and administration of lead inquiries from potential ABS FITNESS members. It consists of `Inquiry` and `InquiryType` models, `InquiryRepository` for persistence, `InquiryService` for business logic, and two controllers: `InquiryController` for public submissions and `AdminInquiryController` for administrative management. The `InquiryController` exposes a public API endpoint for creating new inquiries. The `AdminInquiryController` provides authenticated and authorized endpoints for retrieving all inquiries, retrieving a single inquiry by ID, and deleting an inquiry. All data is transferred using `InquiryDto` and `CreateInquiryRequest` DTOs.

### Inquiry Submission Flow
1. A user (potential member) fills out a lead capture form on the frontend (e.g., for a free trial or tour booking).
2. The frontend calls `POST /api/v1/inquiries` with a `CreateInquiryRequest` containing the user's name, email, phone, and the `InquiryType`.
3. `InquiryController.createInquiry()` receives the request, validates it, and delegates to `InquiryService.createInquiry()`.
4. `InquiryService.createInquiry()` maps the `CreateInquiryRequest` to an `Inquiry` entity, sets the submission timestamp, and saves it using `InquiryRepository.save()`.
5. The service returns an `InquiryDto` representing the newly created inquiry.

### Inquiry Management Flow (Admin)
1. An authenticated administrator accesses the admin portal to view inquiries.
2. To fetch all inquiries, the frontend calls `GET /api/v1/admin/inquiries`.
3. `AdminInquiryController.getAllInquiries()` receives the request and calls `InquiryService.getAllInquiries()`.
4. `InquiryService.getAllInquiries()` retrieves all `Inquiry` entities from `InquiryRepository.findAll()` and maps them to a `List<InquiryDto>`.
5. To fetch a specific inquiry, the frontend calls `GET /api/v1/admin/inquiries/{id}`.
6. `AdminInquiryController.getInquiryById()` receives the request, extracts the `id`, and calls `InquiryService.getInquiryById(Long id)`.
7. `InquiryService.getInquiryById()` retrieves the `Inquiry` by ID using `InquiryRepository.findById()`. If not found, it throws a `ResourceNotFoundException`.
8. To delete an inquiry, the frontend calls `DELETE /api/v1/admin/inquiries/{id}`.
9. `AdminInquiryController.deleteInquiry()` receives the request, extracts the `id`, and calls `InquiryService.deleteInquiry(Long id)`.
10. `InquiryService.deleteInquiry()` first verifies the inquiry exists using `InquiryRepository.existsById()`. If not found, it throws a `ResourceNotFoundException`. If found, it deletes the inquiry using `InquiryRepository.deleteById()`.

### Error Handling
- If an inquiry is not found during retrieval or deletion by ID, `InquiryService` throws a `ResourceNotFoundException`. The `AdminInquiryController` catches this and returns an HTTP 404 Not Found response.

---

## Google Review Integration (Backend)

**Name:** `review-integration`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/Review.java` — MODEL layer — defines the `Review` entity for persisting Google Reviews in the database.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; authorName: String; rating: Integer; text: String; time: Long; profilePhotoUrl: String; relativeTimeDescription: String }
- `backend/src/main/java/com/absfitness/repository/ReviewRepository.java` — REPOSITORY layer — provides JPA data access operations for the `Review` entity.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: Optional<Review> findByAuthorNameAndText(String authorName, String text); List<Review> findAllByOrderByTimeDesc()
- `backend/src/main/java/com/absfitness/service/GoogleReviewService.java` — SERVICE layer — implements `getAllGoogleReviews(): List<GoogleReviewDto>` to fetch, cache, and retrieve Google Reviews.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<GoogleReviewDto> getAllGoogleReviews(); void fetchAndCacheGoogleReviews()
- `backend/src/main/java/com/absfitness/controller/GoogleReviewController.java` — CONTROLLER layer — exposes a public REST endpoint `/api/v1/reviews/google` for fetching cached Google Reviews.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<GoogleReviewDto> getAllGoogleReviews()
- `backend/src/main/java/com/absfitness/dto/GoogleReviewDto.java` — DTO layer — defines the `GoogleReviewDto` for transferring Google Review data to the frontend.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { authorName: String; rating: Integer; text: String; relativeTimeDescription: String; profilePhotoUrl: String }

**Feature Instruction:**

This feature integrates Google Reviews into the ABS FITNESS backend by fetching reviews from the Google Places API, caching them in a local database, and exposing them via a public REST endpoint. This caching mechanism prevents excessive API calls to Google and ensures fast retrieval of reviews for the frontend.

The `Review` entity serves as the persistence model for storing Google Reviews, including fields like `authorName`, `rating`, `text`, and `time`.

The `ReviewRepository` provides standard JPA operations for the `Review` entity, allowing the service layer to interact with the database.

The `GoogleReviewService` is responsible for the core business logic:
1. **Fetching Reviews**: It will periodically (e.g., daily via a scheduled task, though the scheduling itself is outside this feature's scope) fetch reviews from the Google Places API for the ABS FITNESS location. The Google Place ID for ABS FITNESS will be configured as an environment variable or application property.
2. **Caching**: It will store the fetched reviews in the `Review` table, ensuring that only new or updated reviews are persisted. It will also handle deduplication based on `authorName` and `text` to avoid storing duplicate reviews.
3. **Retrieval**: It provides a method `getAllGoogleReviews(): List<GoogleReviewDto>` to retrieve all cached reviews, ordered by `time` in descending order.

The `GoogleReviewController` exposes a public GET endpoint `/api/v1/reviews/google` that returns a list of `GoogleReviewDto` objects. This endpoint will be consumed by the frontend to display reviews on the homepage.

The `GoogleReviewDto` is a Data Transfer Object used to expose review data to the frontend, containing fields like `authorName`, `rating`, `text`, and `relativeTimeDescription`.

**Inter-file Wiring:**
- `GoogleReviewService` injects `ReviewRepository` to perform database operations.
- `GoogleReviewService` will make HTTP calls to the Google Places API (external dependency, not part of this project's features).
- `GoogleReviewController` injects `GoogleReviewService` to retrieve the cached reviews.

**Error Handling:**
- If the Google Places API call fails, `GoogleReviewService` should log the error and return an empty list of reviews or throw a custom exception (e.g., `GoogleApiException`) if critical. For this feature, it will simply log and return an empty list, allowing the application to continue functioning without reviews.
- If no reviews are found in the cache, `GoogleReviewService.getAllGoogleReviews()` will return an empty list.

**Google Places API Integration Details:**
- The Google Places API requires an API key and a Place ID. These should be configured as environment variables (e.g., `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`).
- The service will call the "Places Details" endpoint to get reviews. The URL will be similar to `https://maps.googleapis.com/maps/api/place/details/json?place_id={PLACE_ID}&fields=reviews&key={API_KEY}`.
- The response will be parsed to extract review details and map them to `Review` entities.

---

## Core UI & Pages

**Name:** `core-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/App.tsx` — Main application component that sets up React Router, global providers, and defines the overall routing structure for public and authenticated pages.
- `frontend/src/config/siteConfig.ts` — Central configuration for site-wide branding, navigation, and footer content, exporting the `siteConfig` object.
- `frontend/src/pages/HomePage.tsx` — Landing page that composes various components to present a high-energy overview of the gym, including hero, facilities, trainer spotlight, reviews, and lead capture.
- `frontend/src/components/home/HeroSection.tsx` — Full-bleed, dark-themed hero section component with a dynamic background, motivational headline, and a primary call-to-action.
- `frontend/src/components/home/FacilitiesHighlight.tsx` — Grid or card-based component for showcasing key gym facilities and amenities.
- `frontend/src/components/home/TrainerSpotlight.tsx` — Component featuring a carousel or grid of top trainers, fetching data from the trainer-management feature.
- `frontend/src/pages/AboutPage.tsx` — Static page detailing the gym's philosophy, history, and unique selling propositions.
- `frontend/src/pages/ContactPage.tsx` — Contact page displaying business details, an embedded Google Map, and a lead capture form.
- `frontend/src/pages/GalleryPage.tsx` — Page displaying a high-quality photo and video gallery of the gym using pre-scaffolded components.
- `frontend/src/pages/NotFoundPage.tsx` — A 404 error page that informs the user the page was not found and provides navigation back to the homepage.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A1A1A] text-[#FFFFFF]
- Primary CTA: bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#FF5722]
- Section bg: bg-[#FFFFFF] (odd sections) / bg-[#F5F5F5] (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#1A1A1A] leading-relaxed

This `core-ui` feature provides the foundational UI structure and static pages for the ABS FITNESS website. It includes the main `App.tsx` component which sets up the React Router and global providers, and `siteConfig.ts` for centralizing site-wide configuration like navigation links, business details, and footer content. The feature also defines key public-facing pages such as `HomePage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, `GalleryPage.tsx`, and `NotFoundPage.tsx`. These pages are composed of various components, including `HeroSection.tsx`, `FacilitiesHighlight.tsx`, and `TrainerSpotlight.tsx` for the homepage, and `LeadCaptureForm.tsx` which is reused on both the home and contact pages. All monetary values displayed on the site, such as membership prices or any future e-commerce elements, must be formatted in Indian Rupees (₹) using the `en-IN` locale.

### `App.tsx`
This file is the entry point for the React application. It configures `react-router-dom` to define the routes for all public and authenticated pages. It will wrap the application with necessary context providers (e.g., `AuthContext`, `QueryClientProvider`). Public pages like `HomePage`, `AboutPage`, `ContactPage`, `GalleryPage`, and `NotFoundPage` are rendered directly as children of the `SiteLayout` (which is applied globally in `App.tsx` and not imported into individual pages). Authenticated routes (e.g., `/account`, `/admin`) will be protected by a `ProtectedRoute` component from the `user-account` feature and will render content within an `AdminLayout` for admin pages.

### `siteConfig.ts`
This file centralizes all static configuration data for the website. It exports a `siteConfig` object containing properties for the site's name, description, navigation links, and footer content. The footer content will include the business address, phone number, opening hours, and map coordinates provided in the business context. Navigation links will include paths to `/`, `/about`, `/classes`, `/membership`, `/trainers`, `/gallery`, and `/contact`.

### `HomePage.tsx`
This page serves as the landing page for ABS FITNESS. It will be structured into several distinct sections:
1.  **Hero Section**: Utilizes the `HeroSection` component to display a full-bleed, high-energy visual with a motivational headline and a call to action.
2.  **Facilities Highlight**: Uses the `FacilitiesHighlight` component to showcase the gym's premium amenities.
3.  **Trainer Spotlight**: Integrates the `TrainerSpotlight` component to feature key trainers, fetching trainer data from the `trainer-management` feature via the generated `trainerService`.
4.  **Google Reviews**: Incorporates the `GoogleReviewsSection` component from the `customer-engagement-ui` feature to display social proof.
5.  **Lead Capture**: Includes the `LeadCaptureForm` component from the `customer-engagement-ui` feature to encourage sign-ups for free trials or tours.

### `HeroSection.tsx`
This component renders a full-width hero section with a dynamic background image. It will display the business name "ABS FITNESS" prominently with a motivational sub-headline. It includes a primary call-to-action button styled with the `Primary CTA` design token, leading to the `/membership` page.

### `FacilitiesHighlight.tsx`
This component displays a grid of key facilities. Each facility will have an image, a title, and a short description. Examples include "State-of-the-Art Equipment", "Olympic-Size Swimming Pool", and "Personalized Training Zones".

### `TrainerSpotlight.tsx`
This component showcases a selection of top trainers. It will fetch a list of `TrainerDto` objects using the generated `trainerService.getAllTrainers()` function from the `trainer-management` feature. It will display each trainer's `name`, `specialty`, and `imageUrl` in a visually appealing card or carousel format. Each trainer card will link to their detailed profile page (`/trainers/{id}`).

### `AboutPage.tsx`
This page provides information about ABS FITNESS's philosophy, history, and unique selling points. It will include sections detailing the gym's commitment to fitness, its journey, and the benefits of its prime location and world-class facilities. The content should reflect a professional and results-oriented tone.

### `ContactPage.tsx`
This page provides contact information and a way for users to get in touch. It will include:
1.  **Contact Details**: Display the business address, phone number, and opening hours from `siteConfig.ts`.
2.  **Google Map**: Embed an interactive Google Map centered at the coordinates provided in `siteConfig.ts`.
3.  **Lead Capture Form**: Reuses the `LeadCaptureForm` component from the `customer-engagement-ui` feature for inquiries.

### `GalleryPage.tsx`
This page displays a visual gallery of the gym. It will utilize pre-scaffolded gallery components to showcase high-quality photos and videos of the facilities, classes, and members in action. The content should convey the high-energy and modern aesthetic of ABS FITNESS.

### `NotFoundPage.tsx`
This is the 404 error page. It will display a clear message indicating that the requested page was not found and provide a prominent link or button to navigate back to the `HomePage`.

### Inter-file Wiring
- `App.tsx` uses `react-router-dom` to define routes and renders pages like `HomePage`, `AboutPage`, `ContactPage`, `GalleryPage`, and `NotFoundPage`.
- `HomePage.tsx` composes `HeroSection`, `FacilitiesHighlight`, `TrainerSpotlight`, `GoogleReviewsSection` (from `customer-engagement-ui`), and `LeadCaptureForm` (from `customer-engagement-ui`).
- `ContactPage.tsx` reuses `LeadCaptureForm` (from `customer-engagement-ui`).
- `TrainerSpotlight.tsx` calls the generated `trainerService.getAllTrainers()` to fetch trainer data.
- `siteConfig.ts` provides configuration data consumed by `App.tsx` (for navigation) and `ContactPage.tsx` (for business details).

### Data Formatting
All monetary values displayed on the frontend, such as membership prices, must be formatted in Indian Rupees (₹) using the `en-IN` locale (e.g., `amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`).


---

## Customer Engagement UI

**Name:** `customer-engagement-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/components/home/GoogleReviewsSection.tsx` — COMPONENT layer — displays a dynamic feed of high-rated Google Reviews in a carousel or grid, consuming data via `reviewService.ts`.
- `frontend/src/components/home/LeadCaptureForm.tsx` — COMPONENT layer — provides a form for capturing leads for free trials or facility tours, submitting data via `inquiryService.ts`.
- `frontend/src/types/inquiry.ts` — Generated from the backend API contract — TypeScript types and interfaces for inquiries.
- `frontend/src/services/inquiryService.ts` — SERVICE layer — provides functions for submitting inquiries to the backend.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: createInquiry(inquiry: CreateInquiryDto): Promise<void>
- `frontend/src/types/review.ts` — Generated from the backend API contract — TypeScript types and interfaces for Google Reviews.
- `frontend/src/services/reviewService.ts` — SERVICE layer — provides functions for fetching Google Reviews from the backend.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: getAllGoogleReviews(): Promise<GoogleReviewDto[]>

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

This feature provides UI components for customer engagement on the ABS FITNESS website, specifically a Google Reviews section and a lead capture form. It includes the necessary TypeScript types and API service integrations for these components.

The `GoogleReviewsSection.tsx` component displays a dynamic feed of high-rated Google Reviews. It fetches reviews by calling the `reviewService.ts` to interact with the backend's `/api/v1/reviews/google` endpoint. The reviews are then rendered in a visually appealing carousel or grid format, adhering to the premium and modern aesthetic. Each review will display the author's name, rating, review text, and relative time description, formatted for the Indian locale where applicable.

The `LeadCaptureForm.tsx` component provides a form for users to submit inquiries for free trials or facility tours. It uses `inquiryService.ts` to send the inquiry data to the backend's `/api/v1/inquiries` endpoint. The form includes fields for name, email, phone, inquiry type (dropdown for 'Free Trial', 'Tour Booking', 'General Inquiry'), and a message. Upon successful submission, a success message or toast notification should be displayed. Error handling should be implemented to show validation errors or API submission failures.

`inquiryService.ts` and `reviewService.ts` are responsible for making API calls to their respective backend endpoints. They will use the generated API client to perform these operations. `inquiry.ts` and `review.ts` define the TypeScript interfaces for the data structures used by these services and components, ensuring type safety throughout the frontend application. All monetary values, if any, will be displayed in Indian Rupees (₹) using the `en-IN` locale.

---

## User Account & Authentication

**Name:** `user-account`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/LoginPage.tsx` — Page containing the member login form. It renders the `LoginForm` component.
- `frontend/src/components/auth/LoginForm.tsx` — Component with email and password fields for user authentication. It calls the generated authentication service to log in a user.
- `frontend/src/pages/SignupPage.tsx` — Page for new members to register an account. It renders the `SignupForm` component.
- `frontend/src/components/auth/SignupForm.tsx` — Component with fields for user registration. It calls the generated authentication service to register a new user.
- `frontend/src/components/ProtectedRoute.tsx` — A route guard that checks for user authentication and authorization. It uses the `useAuth` hook to determine if a user is logged in.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { children: React.ReactNode }
- `frontend/src/pages/AccountPage.tsx` — The main dashboard for the logged-in member portal. It displays user profile information, bookings, and membership status.
- `frontend/src/components/account/ProfileSection.tsx` — Component within the account page to display and edit user profile information. It uses the `useAuth` hook to get user details.
- `frontend/src/components/account/MyBookingsTable.tsx` — Component to display a table of the member's upcoming and past bookings. It fetches booking data from the `booking-system` feature.
- `frontend/src/components/account/MembershipStatus.tsx` — Component to display the member's current membership plan and expiry date. It fetches membership data from the `membership-management` feature.

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

This feature provides user authentication (login, signup) and a protected member account area for ABS FITNESS. It consists of several pages and components that handle user input, interact with the authentication system, and display user-specific data such as bookings and membership status. The `LoginPage.tsx` and `SignupPage.tsx` provide the entry points for user authentication, utilizing `LoginForm.tsx` and `SignupForm.tsx` respectively to capture user credentials. The `ProtectedRoute.tsx` component acts as a route guard, ensuring that only authenticated and authorized users can access specific routes. The `AccountPage.tsx` serves as the member dashboard, displaying various user-specific information through sub-components like `ProfileSection.tsx`, `MyBookingsTable.tsx`, and `MembershipStatus.tsx`.

### Authentication Flow

1.  **Login:**
    *   `LoginPage.tsx` renders `LoginForm.tsx`.
    *   `LoginForm.tsx` collects `email` and `password`.
    *   Upon submission, `LoginForm.tsx` calls the generated authentication service's `login(email, password)` function. This function handles the API call to `/api/auth/login` and stores the JWT token in `AuthContext` upon success. It also redirects the user to `/account` on successful login.
    *   Error cases: If login fails (e.g., invalid credentials), `LoginForm.tsx` displays an error message to the user.

2.  **Signup:**
    *   `SignupPage.tsx` renders `SignupForm.tsx`.
    *   `SignupForm.tsx` collects `name`, `email`, and `password`.
    *   Upon submission, `SignupForm.tsx` calls the generated authentication service's `signup(name, email, password)` function. This function handles the API call to `/api/auth/register` and stores the JWT token in `AuthContext` upon success. It also redirects the user to `/account` on successful registration.
    *   Error cases: If signup fails (e.g., email already exists), `SignupForm.tsx` displays an error message to the user.

### Protected Routes

*   `ProtectedRoute.tsx` is a React component that wraps routes requiring authentication.
*   It uses the `useAuth()` hook from `@/context/AuthContext` to check if a user is authenticated (`isAuthenticated`).
*   If the user is not authenticated, it redirects them to the `/login` page.
*   If the user is authenticated, it renders the child components (the protected route).

### Account Page

*   `AccountPage.tsx` is the main dashboard for logged-in members. It uses the `useAuth()` hook to display the current user's name.
*   It renders `ProfileSection.tsx`, `MyBookingsTable.tsx`, and `MembershipStatus.tsx`.

#### Profile Section
*   `ProfileSection.tsx` displays the user's name and email, obtained from the `useAuth()` hook.
*   It provides a placeholder for future profile editing functionality.

#### My Bookings Table
*   `MyBookingsTable.tsx` fetches and displays a list of the member's bookings.
*   It calls the generated service function `getMemberBookings(): Promise<BookingDto[]>` from the `booking-system` feature.
*   The table displays `fitnessClassName`, `scheduleTime`, `durationMinutes`, `bookingTime`, and `status` for each booking.
*   `scheduleTime` and `bookingTime` should be formatted using `toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })`.
*   It includes a button to cancel a booking, which calls the generated service function `cancelBooking(bookingId: Long): Promise<BookingDto>` from the `booking-system` feature. A confirmation dialog should be used before canceling.

#### Membership Status
*   `MembershipStatus.tsx` fetches and displays the member's current membership plan and expiry date.
*   It calls the generated service function `getMemberSubscriptions(): Promise<MemberSubscriptionDto[]>` from the `membership-management` feature.
*   It displays the `membershipPlan.name`, `startDate`, `endDate`, and `status` of the active subscription.
*   `startDate` and `endDate` should be formatted using `toLocaleString('en-IN', { dateStyle: 'medium' })`.
*   If no active membership is found, it displays a message encouraging the user to purchase a plan.

### Styling
All pages and components in this feature will adhere to the design tokens defined above, using Tailwind CSS classes for styling. Monetary values will be displayed in Indian Rupees (₹) using the `en-IN` locale.

---

## Membership Sales UI

**Name:** `membership-sales`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/MembershipPage.tsx` — PAGE layer — displays available membership plans and allows users to add them to the cart for purchase.
- `frontend/src/components/membership/MembershipPlanCard.tsx` — COMPONENT layer — displays details of a single membership plan and provides an 'Enroll Now' action.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { plan: MembershipPlanDto; onEnroll: (plan: MembershipPlanDto) => void }
- `frontend/src/pages/CheckoutPage.tsx` — PAGE layer — orchestrates the membership purchase checkout process, integrating order summary and payment.
- `frontend/src/components/checkout/CheckoutForm.tsx` — COMPONENT layer — provides a form for users to enter details and initiate payment during checkout.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { onSubmit: () => Promise<void> }
- `frontend/src/components/checkout/OrderSummary.tsx` — COMPONENT layer — displays a summary of the selected membership and total cost.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { cartItems: CartItem[]; totals: CartTotals }
- `frontend/src/types/membership.ts` — Generated from the backend API contract — TypeScript types for MembershipPlanDto and MemberSubscriptionDto.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { membershipPlanId: number }
- `frontend/src/services/membershipService.ts` — SERVICE layer — provides functions to interact with the backend membership API for fetching plans and creating subscriptions.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: getAllActiveMembershipPlans(): Promise<MembershipPlanDto[]>; createMemberSubscription(request: CreateMemberSubscriptionRequest): Promise<MemberSubscriptionDto>

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A1A1A] text-[#FFFFFF]
- Primary CTA: bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Secondary CTA: bg-[#1A1A1A] hover:bg-[#333333] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#FF5722]
- Section bg: bg-[#F5F5F5] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#1A1A1A] leading-relaxed

This feature provides the user interface for browsing and purchasing membership plans for ABS FITNESS. It consists of a `MembershipPage` to display available plans, `MembershipPlanCard` components to render individual plan details, and a `CheckoutPage` with `CheckoutForm` and `OrderSummary` components to facilitate the purchase process. The `membershipService.ts` file handles API interactions with the backend `membership-management` feature to fetch membership plans and create subscriptions, while `membership.ts` defines the necessary TypeScript types.

### MembershipPage.tsx
This page is responsible for fetching all active membership plans from the backend using the generated service function `getAllActiveMembershipPlans()` from `membershipService.ts`. It will display these plans in a grid layout, with each plan rendered using a `MembershipPlanCard` component. The page will feature a prominent hero section with a motivational headline and a call to action. Below the hero, a section will display the membership plans. Each `MembershipPlanCard` will have an 'Enroll Now' button that, when clicked, adds the selected membership plan to the cart using `useCart().addItem()` and navigates the user to the `/checkout` page.

### MembershipPlanCard.tsx
This component receives a `MembershipPlanDto` as a prop and displays its details, including `name`, `description`, `price`, and `durationInMonths`. The price should be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`. It will include an 'Enroll Now' button that triggers the `onEnroll` callback function passed from its parent, `MembershipPage.tsx`. This callback will handle adding the item to the cart and navigation.

### CheckoutPage.tsx
This page orchestrates the checkout process. It retrieves the items from the cart using `useCart().cartItems` and `useCart().totals`. It will display the `OrderSummary` component to show the selected membership plan and total cost. The `CheckoutForm` component will be rendered for users to input their details. Upon successful submission of the `CheckoutForm`, the page will call the `createMemberSubscription` function from `membershipService.ts` to create a new member subscription in the backend. After a successful subscription, it will clear the cart using `useCart().clearCart()` and navigate the user to a confirmation or account page. Error handling should be implemented to display user-friendly messages for API failures.

### CheckoutForm.tsx
This component provides a form for users to enter their details required for membership purchase. It will include fields for name, email, and phone number. It will also integrate with the pre-scaffolded `PaymentService` to handle payment processing. The form will have a 'Pay Now' button that, when clicked, will call `paymentService.createOrder()` with the order details and then `paymentService.verify()` with the payment response. The form will emit an `onSubmit` event with the collected user data and payment details to its parent, `CheckoutPage.tsx`.

### OrderSummary.tsx
This component receives the `cartItems` and `totals` from the `useCart()` hook as props. It displays a summary of the selected membership plan, including its name, price, and the total amount due. All monetary values should be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### membership.ts
This file defines the TypeScript interfaces for `MembershipPlanDto` and `MemberSubscriptionDto`, mirroring the backend DTOs from the `membership-management` feature. It also defines any other related types or enums required for the frontend.

### membershipService.ts
This service file provides asynchronous functions to interact with the backend `membership-management` API. It will include `getAllActiveMembershipPlans()` to fetch all active membership plans and `createMemberSubscription(membershipPlanId: Long)` to create a new member subscription. These functions will use the generated API client to make HTTP requests to the backend endpoints.

---

## Class Booking UI

**Name:** `class-booking-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/ClassesPage.tsx` — Page component that displays the weekly class schedule and allows members to book a spot. It fetches all available fitness classes and passes them to the ClassSchedule component.
- `frontend/src/components/classes/ClassSchedule.tsx` — Interactive schedule/calendar component that displays and filters fitness classes. It takes a list of FitnessClassDto objects as props and opens ClassBookingModal when a class is selected.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { classes: FitnessClassDto[]; onSelectClass: (cls: FitnessClassDto) => void }
- `frontend/src/components/classes/ClassBookingModal.tsx` — Dialog component to confirm booking for a selected class. It takes a FitnessClassDto as a prop and calls the bookingService.createBooking function upon confirmation.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { classToBook: FitnessClassDto | null; isOpen: boolean; onClose: () => void; onBookingSuccess: (booking: BookingDto) => void }
- `frontend/src/types/fitnessClass.ts` — Generated from the backend API contract – TypeScript types for FitnessClass.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: number; name: string; description: string; scheduleTime: string; durationMinutes: number; capacity: number; bookedSlots: number; trainerId: number; trainerName: string }
- `frontend/src/services/fitnessClassService.ts` — API service for fetching fitness class data. It exports getAllFitnessClasses(): Promise<FitnessClassDto[]>.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: getAllFitnessClasses(): Promise<FitnessClassDto[]>
- `frontend/src/types/booking.ts` — Generated from the backend API contract – TypeScript types for Bookings.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { BookingDto.id: number; BookingDto.userId: number; BookingDto.fitnessClassId: number; BookingDto.fitnessClassName: string; BookingDto.scheduleTime: string; BookingDto.durationMinutes: number; BookingDto.bookingTime: string; BookingDto.status: string; CreateBookingRequest.fitnessClassId: number }
- `frontend/src/services/bookingService.ts` — API service for creating and managing bookings. It exports createBooking(request: CreateBookingRequest): Promise<BookingDto>.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: createBooking(request: CreateBookingRequest): Promise<BookingDto>

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

This feature provides the user interface for viewing and booking fitness classes at ABS FITNESS. It consists of a main `ClassesPage.tsx` which displays the weekly schedule using the `ClassSchedule.tsx` component. When a user selects a class to book, a `ClassBookingModal.tsx` appears to confirm the booking. The feature interacts with the `class-management` backend feature to fetch available fitness classes and with the `booking-system` backend feature to create new bookings. It also uses `fitnessClassService.ts` and `bookingService.ts` to abstract API calls, and `fitnessClass.ts` and `booking.ts` for TypeScript type definitions.

### ClassesPage.tsx
This page is the entry point for users to view and book fitness classes. It will fetch all available fitness classes using the generated service function `getAllFitnessClasses(): Promise<FitnessClassDto[]>` from `fitnessClassService.ts`. The page will then pass this data to the `ClassSchedule` component for display. It should include a motivational hero section at the top, followed by the class schedule.

### ClassSchedule.tsx
This component receives a list of `FitnessClassDto` objects as props and renders an interactive weekly schedule. It should allow users to filter classes by day and potentially by trainer or class type. Each class slot should display the class name, trainer, time, and available slots. Clicking on a class will open the `ClassBookingModal` component, passing the selected `FitnessClassDto` as a prop.

### ClassBookingModal.tsx
This modal component receives a `FitnessClassDto` as a prop. It displays the class details and a confirmation button. Upon confirmation, it calls the generated service function `createBooking(request: CreateBookingRequest): Promise<BookingDto>` from `bookingService.ts` with the `fitnessClassId` from the selected class. It should provide user feedback (e.g., a toast notification) on successful booking or error. The `CreateBookingRequest` object will have a single field: `fitnessClassId: Long`.

### fitnessClass.ts
This file defines the TypeScript interface `FitnessClassDto` which mirrors the backend `FitnessClassDto` data shape from the `class-management` feature. It will include fields such as `id: number`, `name: string`, `description: string`, `scheduleTime: string` (ISO string), `durationMinutes: number`, `capacity: number`, `bookedSlots: number`, `trainerId: number`, and `trainerName: string`.

### fitnessClassService.ts
This service file provides functions to interact with the backend `class-management` API. It will export an async function `getAllFitnessClasses(): Promise<FitnessClassDto[]>` which makes a GET request to `/api/v1/fitness-classes` and returns a list of `FitnessClassDto` objects.

### booking.ts
This file defines the TypeScript interfaces `BookingDto` and `CreateBookingRequest`. `BookingDto` mirrors the backend `BookingDto` data shape from the `booking-system` feature, including fields like `id: number`, `userId: number`, `fitnessClassId: number`, `fitnessClassName: string`, `scheduleTime: string`, `durationMinutes: number`, `bookingTime: string`, and `status: string`. `CreateBookingRequest` mirrors the backend `CreateBookingRequest` with `fitnessClassId: number`.

### bookingService.ts
This service file provides functions to interact with the backend `booking-system` API. It will export an async function `createBooking(request: CreateBookingRequest): Promise<BookingDto>` which makes a POST request to `/api/v1/bookings` with the `CreateBookingRequest` as the body and returns a `BookingDto`.

---

## Trainer Profiles UI

**Name:** `trainer-profiles`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/TrainersPage.tsx` — PAGE layer — displays a gallery of all personal trainers by fetching data from `trainerService.getAllTrainers()` and rendering them using `TrainerGrid`.
- `frontend/src/components/trainer/TrainerGrid.tsx` — COMPONENT layer — responsible for arranging multiple `TrainerProfileCard` components in a responsive grid.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { trainers: TrainerDto[] }
- `frontend/src/components/trainer/TrainerProfileCard.tsx` — COMPONENT layer — displays a single trainer's summary with their image, name, specialty, and a link to their detailed profile.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { trainer: TrainerDto }
- `frontend/src/pages/TrainerDetailPage.tsx` — PAGE layer — displays the detailed profile of a single trainer by fetching data using `trainerService.getTrainerById(id)`.
- `frontend/src/types/trainer.ts` — Generated from the backend API contract — defines the TypeScript interface for trainer data.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: number; name: string; specialty: string; experienceYears: number; bio: string; imageUrl: string }
- `frontend/src/services/trainerService.ts` — SERVICE layer — provides functions to interact with the backend trainer API, including `getAllTrainers()` and `getTrainerById(id)`.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: getAllTrainers(): Promise<TrainerDto[]>; getTrainerById(id: number): Promise<TrainerDto>

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

This feature provides the frontend UI for displaying trainer profiles, including a gallery page and individual trainer detail pages. It consumes the `trainer-management` backend feature's API to fetch trainer data.

### `frontend/src/types/trainer.ts`
This file defines the TypeScript interface `TrainerDto` which mirrors the `TrainerDto` data shape from the `trainer-management` backend feature. It ensures type safety across the frontend components and services when handling trainer data.

### `frontend/src/services/trainerService.ts`
This service file provides functions to interact with the backend `trainer-management` API. It exports two asynchronous functions:
1. `getAllTrainers(): Promise<TrainerDto[]>`: This function makes a GET request to `/api/v1/trainers` to fetch a list of all trainers. It returns a promise that resolves to an array of `TrainerDto` objects.
2. `getTrainerById(id: Long): Promise<TrainerDto>`: This function makes a GET request to `/api/v1/trainers/{id}` to fetch a single trainer's details by their ID. It returns a promise that resolves to a `TrainerDto` object.

### `frontend/src/components/trainer/TrainerProfileCard.tsx`
This component renders a single trainer's summary as a card. It receives a `TrainerDto` object as props. The card displays the trainer's `imageUrl`, `name`, `specialty`, and `experienceYears`. It includes a "View Profile" button (styled with `Primary CTA` tokens) that links to the `TrainerDetailPage` for the specific trainer using their `id`.

### `frontend/src/components/trainer/TrainerGrid.tsx`
This component is responsible for laying out multiple `TrainerProfileCard` components in a responsive grid. It accepts an array of `TrainerDto` objects as props. It iterates over the array and renders a `TrainerProfileCard` for each trainer, passing the individual `TrainerDto` to each card.

### `frontend/src/pages/TrainersPage.tsx`
This page serves as the main gallery for all trainers. It uses the `trainerService.getAllTrainers()` function to fetch all trainer data. While the data is being fetched, it displays a loading indicator. If an error occurs, it displays an error message. Once the data is successfully loaded, it renders a `TrainerGrid` component, passing the fetched `TrainerDto[]` to it. The page includes a prominent heading "Meet Our Expert Trainers" and a sub-heading "Achieve your fitness goals with guidance from the best in the industry." (using `Hero h1` and `Body` tokens respectively). The section uses `Section bg` and `Section container` tokens.

### `frontend/src/pages/TrainerDetailPage.tsx`
This page displays the detailed profile of a single trainer. It retrieves the trainer's ID from the URL parameters. It then uses `trainerService.getTrainerById(id)` to fetch the specific trainer's data. Similar to `TrainersPage`, it handles loading and error states. Once the trainer data is loaded, it displays the trainer's `name` (using `Hero h1` token), `specialty`, `bio`, `experienceYears`, and `imageUrl`. It also includes a call to action button "Book a Session" (styled with `Primary CTA` tokens) which would link to the class booking feature (not implemented in this feature). The page uses `Section bg` and `Section container` tokens for its layout.

---

## Admin Portal

**Name:** `admin-portal`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/components/AdminLayout.tsx` — Admin portal layout component — provides a consistent navigation and content structure for all admin pages.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { children: React.ReactNode }
- `frontend/src/pages/AdminDashboardPage.tsx` — Admin portal landing page — displays key statistics and summaries for the gym's operations.
- `frontend/src/pages/AdminMembershipPlansPage.tsx` — Admin page for membership plan management — fetches, displays, creates, updates, and deletes membership plans.
- `frontend/src/components/membership/MembershipPlanTable.tsx` — Table component for membership plans — displays a list of plans with edit and delete actions.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { plans: MembershipPlanDto[]; onEdit: (plan: MembershipPlanDto) => void; onDelete: (planId: number) => void }
- `frontend/src/components/membership/MembershipPlanForm.tsx` — Form component for membership plans — handles creation and editing of membership plan details.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { isOpen: boolean; onClose: () => void; initialData: MembershipPlanDto | null; onSubmit: (data: Omit<MembershipPlanDto, 'id'>) => void }
- `frontend/src/pages/AdminClassesPage.tsx` — Admin page for fitness class management — fetches, displays, creates, updates, and deletes fitness classes.
- `frontend/src/components/classes/ClassTable.tsx` — Table component for fitness classes — displays a list of classes with edit and delete actions.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { classes: FitnessClassDto[]; onEdit: (fitnessClass: FitnessClassDto) => void; onDelete: (classId: number) => void }
- `frontend/src/components/classes/ClassForm.tsx` — Form component for fitness classes — handles creation and editing of class details.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { isOpen: boolean; onClose: () => void; initialData: FitnessClassDto | null; trainers: TrainerDto[]; onSubmit: (data: Omit<FitnessClassDto, 'id' | 'bookedSlots' | 'trainerName'>) => void }
- `frontend/src/pages/AdminBookingsPage.tsx` — Admin page for booking management — fetches and displays all member bookings.
- `frontend/src/components/booking/BookingTable.tsx` — Table component for bookings — displays a list of all member bookings.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { bookings: BookingDto[] }
- `frontend/src/components/booking/BookingFilter.tsx` — Filter component for bookings — provides controls to filter bookings by various criteria.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { onFilterChange: (filters: { classId?: number; userId?: number; startDate?: string; endDate?: string; }) => void }
- `frontend/src/pages/AdminTrainersPage.tsx` — Admin page for trainer management — fetches, displays, creates, updates, and deletes trainer profiles.
- `frontend/src/components/trainer/TrainerTable.tsx` — Table component for trainers — displays a list of trainers with edit and delete actions.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { trainers: TrainerDto[]; onEdit: (trainer: TrainerDto) => void; onDelete: (trainerId: number) => void }
- `frontend/src/components/trainer/TrainerForm.tsx` — Form component for trainers — handles creation and editing of trainer profiles.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { isOpen: boolean; onClose: () => void; initialData: TrainerDto | null; onSubmit: (data: Omit<TrainerDto, 'id'>) => void }
- `frontend/src/pages/AdminInquiriesPage.tsx` — Admin page for inquiry management — fetches, displays, and deletes lead inquiries.
- `frontend/src/components/inquiry/InquiryTable.tsx` — Table component for inquiries — displays a list of lead inquiries with view and delete actions.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { inquiries: InquiryDto[]; onView: (inquiry: InquiryDto) => void; onDelete: (inquiryId: number) => void }
- `frontend/src/components/inquiry/InquiryDetailView.tsx` — Detail view component for inquiries — displays the full details of a selected inquiry.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { isOpen: boolean; onClose: () => void; inquiry: InquiryDto | null }
- `frontend/src/components/shared/DeleteConfirmationDialog.tsx` — Reusable confirmation dialog — prompts the user to confirm a delete action.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { isOpen: boolean; onClose: () => void; onConfirm: () => void; itemToDeleteName: string }

**Feature Instruction:**

This feature implements the Admin Portal, providing a comprehensive interface for managing various aspects of the ABS FITNESS gym. It consists of a main layout (`AdminLayout.tsx`) with a sidebar for navigation, and several admin pages for managing membership plans, fitness classes, bookings, trainers, and inquiries. Each management page (`AdminMembershipPlansPage.tsx`, `AdminClassesPage.tsx`, `AdminBookingsPage.tsx`, `AdminTrainersPage.tsx`, `AdminInquiriesPage.tsx`) utilizes dedicated components for displaying data in tables (e.g., `MembershipPlanTable.tsx`, `ClassTable.tsx`) and forms for creating or editing entities (e.g., `MembershipPlanForm.tsx`, `ClassForm.tsx`). A reusable `DeleteConfirmationDialog.tsx` component is used for confirming delete actions across the portal.

## Design Tokens
- Navbar: bg-[#1A1A1A] text-[#FFFFFF]
- Primary CTA: bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#FF5722]
- Section bg: bg-[#F5F5F5] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#1A1A1A] leading-relaxed

### AdminLayout.tsx
This component serves as the main layout for all admin pages. It includes a fixed sidebar for navigation to different admin sections (Dashboard, Membership Plans, Classes, Bookings, Trainers, Inquiries) and a main content area where the specific admin pages are rendered. The sidebar should be styled with `bg-[#1A1A1A]` and `text-[#FFFFFF]`, with active navigation links highlighted using `text-[#FF5722]`.

### AdminDashboardPage.tsx
This page is the landing page for the admin portal. It will display a high-level overview of key metrics such as total members, upcoming classes, recent bookings, and new inquiries. The content should be presented in a clean, spacious layout using cards with `bg-white rounded-xl shadow-md border border-gray-100 p-6` for each metric, reflecting a professional and results-oriented tone.

### AdminMembershipPlansPage.tsx
This page allows administrators to manage membership plans. It will fetch all membership plans using the generated `membershipService.getAllMembershipPlans()` function. The plans will be displayed in a `MembershipPlanTable` component. The page will also include a button to open a `MembershipPlanForm` in a modal or drawer for creating new plans or editing existing ones. Deletion of plans will be handled via the `DeleteConfirmationDialog`.

### MembershipPlanTable.tsx
This component displays a table of `MembershipPlanDto` objects. Each row will show the plan's `name`, `description`, `price` (formatted in ₹ using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`), `durationInMonths`, and `isActive` status. It will include actions for editing and deleting membership plans. The edit action will trigger the `MembershipPlanForm` with the selected plan's data, and the delete action will open the `DeleteConfirmationDialog`.

### MembershipPlanForm.tsx
This component provides a form for creating or editing `MembershipPlanDto` objects. It will be rendered within a modal or drawer. The form fields will include `name` (text input), `description` (textarea), `price` (number input, formatted to ₹), `durationInMonths` (number input), and `isActive` (toggle switch). On submission, it will call either `membershipService.createMembershipPlan(dto)` or `membershipService.updateMembershipPlan(id, dto)` based on whether an existing plan is being edited or a new one created. Successful operations should display a toast notification.

### AdminClassesPage.tsx
This page allows administrators to manage fitness classes. It will fetch all fitness classes using the generated `fitnessClassService.getAllFitnessClasses()` function. The classes will be displayed in a `ClassTable` component. The page will also include a button to open a `ClassForm` in a modal or drawer for creating new classes or editing existing ones. Deletion of classes will be handled via the `DeleteConfirmationDialog`.

### ClassTable.tsx
This component displays a table of `FitnessClassDto` objects. Each row will show the class's `name`, `description`, `scheduleTime` (formatted as date and time), `durationMinutes`, `capacity`, `bookedSlots`, and `trainerName`. It will include actions for editing and deleting fitness classes. The edit action will trigger the `ClassForm` with the selected class's data, and the delete action will open the `DeleteConfirmationDialog`.

### ClassForm.tsx
This component provides a form for creating or editing `FitnessClassDto` objects. It will be rendered within a modal or drawer. The form fields will include `name` (text input), `description` (textarea), `scheduleTime` (datetime picker), `durationMinutes` (number input), `capacity` (number input), and `trainerId` (dropdown selecting from available trainers, fetched via `trainerService.getAllTrainers()`). On submission, it will call either `fitnessClassService.createFitnessClass(dto)` or `fitnessClassService.updateFitnessClass(id, dto)`. Successful operations should display a toast notification.

### AdminBookingsPage.tsx
This page allows administrators to view all member bookings. It will fetch all bookings using the generated `bookingService.getAllBookings()` function. The bookings will be displayed in a `BookingTable` component. It will also integrate a `BookingFilter` component to allow filtering bookings by various criteria such as date, class, or member.

### BookingTable.tsx
This component displays a table of `BookingDto` objects. Each row will show the booking's `id`, `userId`, `fitnessClassName`, `scheduleTime` (formatted as date and time), `bookingTime` (formatted as date and time), and `status`. It will not include edit or delete actions, as bookings are managed through cancellation on the member side.

### BookingFilter.tsx
This component provides controls for filtering the `BookingTable`. It will include input fields or dropdowns for filtering by `fitnessClassName`, `userId` (e.g., by member name or ID), and a date range for `scheduleTime` or `bookingTime`. It will emit filter criteria to its parent (`AdminBookingsPage.tsx`) to refetch and update the bookings displayed in the `BookingTable`.

### AdminTrainersPage.tsx
This page allows administrators to manage trainer profiles. It will fetch all trainers using the generated `trainerService.getAllTrainers()` function. The trainers will be displayed in a `TrainerTable` component. The page will also include a button to open a `TrainerForm` in a modal or drawer for creating new trainers or editing existing ones. Deletion of trainers will be handled via the `DeleteConfirmationDialog`.

### TrainerTable.tsx
This component displays a table of `TrainerDto` objects. Each row will show the trainer's `name`, `specialty`, `experienceYears`, and `imageUrl`. It will include actions for editing and deleting trainer profiles. The edit action will trigger the `TrainerForm` with the selected trainer's data, and the delete action will open the `DeleteConfirmationDialog`.

### TrainerForm.tsx
This component provides a form for creating or editing `TrainerDto` objects. It will be rendered within a modal or drawer. The form fields will include `name` (text input), `specialty` (text input), `bio` (textarea), `imageUrl` (text input for URL), and `experienceYears` (number input). On submission, it will call either `trainerService.createTrainer(dto)` or `trainerService.updateTrainer(id, dto)`. Successful operations should display a toast notification.

### AdminInquiriesPage.tsx
This page allows administrators to view and manage lead inquiries. It will fetch all inquiries using the generated `inquiryService.getAllInquiries()` function. The inquiries will be displayed in an `InquiryTable` component. Selecting an inquiry from the table will open an `InquiryDetailView` in a modal or drawer to show full details. Deletion of inquiries will be handled via the `DeleteConfirmationDialog`.

### InquiryTable.tsx
This component displays a table of `InquiryDto` objects. Each row will show the inquiry's `name`, `email`, `phone`, `inquiryType`, `submissionTime` (formatted as date and time), and a brief snippet of the `message`. It will include an action to view full details and an action to delete the inquiry. The view action will trigger the `InquiryDetailView` with the selected inquiry's data, and the delete action will open the `DeleteConfirmationDialog`.

### InquiryDetailView.tsx
This component displays the full details of a selected `InquiryDto`. It will be rendered within a modal or drawer. It will show all fields of the `InquiryDto` including `name`, `email`, `phone`, `inquiryType`, `message`, and `submissionTime` in a readable format.

### DeleteConfirmationDialog.tsx
This is a reusable modal dialog component for confirming delete actions. It takes `isOpen`, `onClose`, `onConfirm`, and `itemToDeleteName` as props. When `onConfirm` is called, it should execute the delete logic provided by the parent component and then close the dialog. The dialog should have a clear, motivational tone in its message, e.g., "Are you sure you want to delete this {itemToDeleteName}? This action cannot be undone." The confirm button should use the primary CTA styling.

---

## Infrastructure

**Name:** `infrastructure`  
**Type:** INFRA  
**Change required:** true

**Feature Instruction:**

_Not enriched (INFRA or skipped)._

---

