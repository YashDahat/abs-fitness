# Feature Enrichment — Attempt 2

Generated: 2026-08-18

Each section is one LLM call (~5–8K tokens). The instruction tells the generator how all files in the feature interact and what contracts they must honour.

---

## Shared Backend Utilities

**Name:** `shared-backend`  
**Type:** SHARED  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/exception/GlobalExceptionHandler.java` — Exception handling layer — provides centralized exception handling for the entire application, mapping specific exceptions to standardized `ErrorResponse` DTOs with appropriate HTTP status codes.
- `backend/src/main/java/com/absfitness/dto/ErrorResponse.java` — DTO layer — defines the standardized JSON response structure for API errors, consumed by `GlobalExceptionHandler`.
- `backend/src/main/java/com/absfitness/exception/ResourceNotFoundException.java` — Custom exception class — indicates that a requested resource was not found, to be caught by `GlobalExceptionHandler`.

**Feature Instruction:**

This feature provides shared backend utilities, including a global exception handler and common DTOs and custom exceptions. The `GlobalExceptionHandler` intercepts specific exceptions thrown by any service or controller in the application and maps them to a standardized `ErrorResponse` DTO. This ensures a consistent error response format across all API endpoints. The `ErrorResponse` DTO defines the structure for these standardized error messages, including a timestamp, status, error message, and path. The `ResourceNotFoundException` is a custom exception that should be thrown by services when a requested resource (e.g., a `MembershipPlan`, `GymClass`, or `Trainer`) cannot be found in the database. When a `ResourceNotFoundException` is thrown, the `GlobalExceptionHandler` will catch it and return an `ErrorResponse` with an appropriate HTTP status code (e.g., 404 Not Found).

---

## Membership Management (Backend)

**Name:** `membership-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/MembershipPlan.java` — MODEL layer — defines the structure and relationships for a gym membership plan.
- `backend/src/main/java/com/absfitness/model/MemberSubscription.java` — MODEL layer — defines the structure and relationships for a member's subscription to a plan.
- `backend/src/main/java/com/absfitness/model/SubscriptionStatus.java` — MODEL layer — defines the possible states for a member's subscription.
- `backend/src/main/java/com/absfitness/repository/MembershipPlanRepository.java` — REPOSITORY layer — provides data access operations for `MembershipPlan` entities.
- `backend/src/main/java/com/absfitness/repository/MemberSubscriptionRepository.java` — REPOSITORY layer — provides data access operations for `MemberSubscription` entities.
- `backend/src/main/java/com/absfitness/service/MembershipService.java` — SERVICE layer — implements `getAllActiveMembershipPlans(): List<MembershipPlanDto>`, `getMembershipPlanById(UUID): MembershipPlanDto`, `createMembershipPlan(MembershipPlanDto): MembershipPlanDto`, `updateMembershipPlan(UUID, MembershipPlanDto): MembershipPlanDto`, `deleteMembershipPlan(UUID): void`, and `createSubscription(CreateSubscriptionRequest): MemberSubscriptionDto`.
- `backend/src/main/java/com/absfitness/dto/MembershipPlanDto.java` — DTO layer — represents the data structure for transferring membership plan information.
- `backend/src/main/java/com/absfitness/dto/MemberSubscriptionDto.java` — DTO layer — represents the data structure for transferring member subscription information.
- `backend/src/main/java/com/absfitness/dto/CreateSubscriptionRequest.java` — DTO layer — defines the request body for creating a new member subscription.
- `backend/src/main/java/com/absfitness/controller/MembershipController.java` — CONTROLLER layer — exposes public API endpoints for listing membership plans and purchasing a subscription.
- `backend/src/main/java/com/absfitness/controller/admin/AdminMembershipController.java` — CONTROLLER layer — exposes admin-only API endpoints for CRUD operations on membership plans.

**Feature Instruction:**

The Membership Management (Backend) feature provides the core backend services and API endpoints for managing gym membership plans and member subscriptions. It defines the data models for `MembershipPlan` and `MemberSubscription`, along with their respective repositories for persistence. The `MembershipService` encapsulates the business logic, including operations to retrieve available membership plans, create new plans, update existing plans, and process new member subscriptions. It interacts with the `MembershipPlanRepository` and `MemberSubscriptionRepository` to store and retrieve data. The `MembershipController` exposes public API endpoints for clients to fetch membership plans and create new subscriptions, while the `AdminMembershipController` provides administrative endpoints for full CRUD operations on membership plans, accessible only to authenticated administrators. All monetary values (prices) will be handled as `BigDecimal` and displayed in Indian Rupees (₹) using the `en-IN` locale if rendered on the frontend. Error handling will leverage `ResourceNotFoundException` from the `shared-backend` feature for cases where a requested membership plan or subscription is not found.

---

## Scheduling and Booking (Backend)

**Name:** `scheduling-and-booking`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/Trainer.java` — MODEL layer — represents a trainer at the gym.
- `backend/src/main/java/com/absfitness/model/GymClass.java` — MODEL layer — represents a scheduled gym class.
- `backend/src/main/java/com/absfitness/model/Booking.java` — MODEL layer — represents a member's booking for a gym class.
- `backend/src/main/java/com/absfitness/model/BookingStatus.java` — MODEL layer — enum for the status of a class booking.
- `backend/src/main/java/com/absfitness/repository/TrainerRepository.java` — REPOSITORY layer — provides data access for Trainer entities.
- `backend/src/main/java/com/absfitness/repository/GymClassRepository.java` — REPOSITORY layer — provides data access for GymClass entities.
- `backend/src/main/java/com/absfitness/repository/BookingRepository.java` — REPOSITORY layer — provides data access for Booking entities.
- `backend/src/main/java/com/absfitness/service/BookingService.java` — SERVICE layer — implements getAllTrainers(): List<TrainerDto>, getTrainerById(UUID): TrainerDto, createTrainer(TrainerDto): TrainerDto, updateTrainer(UUID, TrainerDto): TrainerDto, deleteTrainer(UUID): void, getAllGymClasses(): List<GymClassDto>, getGymClassById(UUID): GymClassDto, createGymClass(GymClassDto): GymClassDto, updateGymClass(UUID, GymClassDto): GymClassDto, deleteGymClass(UUID): void, createBooking(CreateBookingRequest, UUID): BookingDto, cancelBooking(UUID, UUID): void, getBookingsByUserId(UUID): List<BookingDto>, and getAllBookings(): List<BookingDto>; delegates persistence to TrainerRepository, GymClassRepository, and BookingRepository.
- `backend/src/main/java/com/absfitness/dto/TrainerDto.java` — DTO layer — Data Transfer Object for Trainer entities.
- `backend/src/main/java/com/absfitness/dto/GymClassDto.java` — DTO layer — Data Transfer Object for GymClass entities.
- `backend/src/main/java/com/absfitness/dto/BookingDto.java` — DTO layer — Data Transfer Object for Booking entities.
- `backend/src/main/java/com/absfitness/dto/CreateBookingRequest.java` — DTO layer — Request body for creating a new class booking.
- `backend/src/main/java/com/absfitness/controller/BookingController.java` — CONTROLLER layer — exposes public API endpoints for fetching trainers, class schedules, and managing bookings.
- `backend/src/main/java/com/absfitness/controller/admin/AdminBookingController.java` — CONTROLLER layer — exposes admin-only API endpoints for CRUD operations on Trainers, GymClasses, and viewing all bookings.

**Feature Instruction:**

This feature provides the backend logic and API endpoints for managing gym trainers, class schedules, and member bookings for ABS FITNESS. It includes models for `Trainer`, `GymClass`, and `Booking`, along with their respective repositories. The `BookingService` orchestrates the business logic, handling operations like fetching available classes, creating new bookings, and managing booking statuses. Public API endpoints are exposed through `BookingController` for members to view schedules and make bookings, while `AdminBookingController` provides administrative functionalities for CRUD operations on trainers and classes, and for viewing all bookings.

### Data Models
- `Trainer`: Represents a gym trainer with fields like `id`, `name`, `bio`, and `specializations`.
- `GymClass`: Represents a scheduled gym class with fields such as `id`, `name`, `description`, `startTime`, `endTime`, `capacity`, `trainer` (a `Trainer` object), and `bookedSlots`.
- `Booking`: Represents a member's booking for a `GymClass`, including `id`, `userId`, `gymClass`, `bookingTime`, and `status` (an enum `BookingStatus`).
- `BookingStatus`: An enum defining the possible states of a booking: `CONFIRMED`, `CANCELLED`, `WAITLISTED`.

### Repositories
- `TrainerRepository`: Provides standard CRUD operations for `Trainer` entities. It will include a method to find trainers by specialization.
- `GymClassRepository`: Provides standard CRUD operations for `GymClass` entities. It will include methods to find classes by date range, by trainer, and to check for available slots.
- `BookingRepository`: Provides standard CRUD operations for `Booking` entities. It will include methods to find bookings by `userId`, by `gymClassId`, and to count confirmed bookings for a class.

### Service Layer (`BookingService`)
`BookingService` is responsible for all business logic related to trainers, classes, and bookings. It injects `TrainerRepository`, `GymClassRepository`, and `BookingRepository`.

#### Public Methods:

1.  **`List<TrainerDto> getAllTrainers()`**
    -   **Logic:**
        1.  Retrieve all `Trainer` entities from `TrainerRepository`.
        2.  Map `Trainer` entities to `TrainerDto` and return the list.
    -   **Error Cases:** None.

2.  **`TrainerDto getTrainerById(UUID trainerId)`**
    -   **Logic:**
        1.  Retrieve `Trainer` entity by `trainerId` from `TrainerRepository`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Map `Trainer` entity to `TrainerDto` and return.
    -   **Error Cases:** `ResourceNotFoundException` if trainer not found.

3.  **`TrainerDto createTrainer(TrainerDto trainerDto)`**
    -   **Logic:**
        1.  Map `trainerDto` to a new `Trainer` entity.
        2.  Save the `Trainer` entity using `TrainerRepository`.
        3.  Map the saved `Trainer` entity back to `TrainerDto` and return.
    -   **Error Cases:** None.

4.  **`TrainerDto updateTrainer(UUID trainerId, TrainerDto trainerDto)`**
    -   **Logic:**
        1.  Retrieve existing `Trainer` entity by `trainerId` from `TrainerRepository`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Update the fields of the existing `Trainer` entity with values from `trainerDto`.
        4.  Save the updated `Trainer` entity using `TrainerRepository`.
        5.  Map the updated `Trainer` entity back to `TrainerDto` and return.
    -   **Error Cases:** `ResourceNotFoundException` if trainer not found.

5.  **`void deleteTrainer(UUID trainerId)`**
    -   **Logic:**
        1.  Check if `Trainer` exists by `trainerId` using `TrainerRepository`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Delete the `Trainer` entity by `trainerId` from `TrainerRepository`.
    -   **Error Cases:** `ResourceNotFoundException` if trainer not found.

6.  **`List<GymClassDto> getAllGymClasses()`**
    -   **Logic:**
        1.  Retrieve all `GymClass` entities from `GymClassRepository`.
        2.  For each `GymClass`, fetch the associated `Trainer` and map to `GymClassDto`.
        3.  Return the list of `GymClassDto`.
    -   **Error Cases:** None.

7.  **`GymClassDto getGymClassById(UUID classId)`**
    -   **Logic:**
        1.  Retrieve `GymClass` entity by `classId` from `GymClassRepository`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Fetch the associated `Trainer` and map `GymClass` to `GymClassDto`.
        4.  Return the `GymClassDto`.
    -   **Error Cases:** `ResourceNotFoundException` if class not found.

8.  **`GymClassDto createGymClass(GymClassDto gymClassDto)`**
    -   **Logic:**
        1.  Retrieve `Trainer` by `trainerId` from `TrainerRepository` (from `gymClassDto.getTrainerId()`).
        2.  If trainer not found, throw `ResourceNotFoundException`.
        3.  Map `gymClassDto` to a new `GymClass` entity, setting the retrieved `Trainer`.
        4.  Save the `GymClass` entity using `GymClassRepository`.
        5.  Map the saved `GymClass` entity back to `GymClassDto` and return.
    -   **Error Cases:** `ResourceNotFoundException` if trainer not found.

9.  **`GymClassDto updateGymClass(UUID classId, GymClassDto gymClassDto)`**
    -   **Logic:**
        1.  Retrieve existing `GymClass` entity by `classId` from `GymClassRepository`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Retrieve `Trainer` by `trainerId` from `TrainerRepository` (from `gymClassDto.getTrainerId()`).
        4.  If trainer not found, throw `ResourceNotFoundException`.
        5.  Update the fields of the existing `GymClass` entity with values from `gymClassDto`, setting the new `Trainer`.
        6.  Save the updated `GymClass` entity using `GymClassRepository`.
        7.  Map the updated `GymClass` entity back to `GymClassDto` and return.
    -   **Error Cases:** `ResourceNotFoundException` if class or trainer not found.

10. **`void deleteGymClass(UUID classId)`**
    -   **Logic:**
        1.  Check if `GymClass` exists by `classId` using `GymClassRepository`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Delete the `GymClass` entity by `classId` from `GymClassRepository`.
    -   **Error Cases:** `ResourceNotFoundException` if class not found.

11. **`BookingDto createBooking(CreateBookingRequest request, UUID userId)`**
    -   **Logic:**
        1.  Retrieve `GymClass` entity by `request.getGymClassId()` from `GymClassRepository`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Check if `gymClass.getBookedSlots()` is less than `gymClass.getCapacity()`.
        4.  If not, throw `IllegalStateException` with message "Class is full."
        5.  Check if a booking already exists for this `userId` and `gymClassId` with status `CONFIRMED` or `WAITLISTED`.
        6.  If yes, throw `IllegalStateException` with message "You have already booked this class."
        7.  Create a new `Booking` entity with `userId`, `gymClass`, `bookingTime` (current timestamp), and `status` as `CONFIRMED`.
        8.  Increment `gymClass.bookedSlots` and save `gymClass`.
        9.  Save the `Booking` entity using `BookingRepository`.
        10. Map the saved `Booking` entity to `BookingDto` and return.
    -   **Error Cases:** `ResourceNotFoundException` if class not found, `IllegalStateException` if class is full or already booked.

12. **`void cancelBooking(UUID bookingId, UUID userId)`**
    -   **Logic:**
        1.  Retrieve `Booking` entity by `bookingId` from `BookingRepository`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Verify that `booking.getUserId()` matches the provided `userId`. If not, throw `IllegalArgumentException`.
        4.  If `booking.getStatus()` is already `CANCELLED`, throw `IllegalStateException` with message "Booking is already cancelled."
        5.  Set `booking.setStatus(BookingStatus.CANCELLED)`.
        6.  Decrement `booking.getGymClass().bookedSlots` and save `booking.getGymClass()`.
        7.  Save the updated `Booking` entity using `BookingRepository`.
    -   **Error Cases:** `ResourceNotFoundException` if booking not found, `IllegalArgumentException` if `userId` mismatch, `IllegalStateException` if already cancelled.

13. **`List<BookingDto> getBookingsByUserId(UUID userId)`**
    -   **Logic:**
        1.  Retrieve all `Booking` entities for the given `userId` from `BookingRepository`.
        2.  For each `Booking`, fetch the associated `GymClass` and `Trainer`, then map to `BookingDto`.
        3.  Return the list of `BookingDto`.
    -   **Error Cases:** None.

14. **`List<BookingDto> getAllBookings()`**
    -   **Logic:**
        1.  Retrieve all `Booking` entities from `BookingRepository`.
        2.  For each `Booking`, fetch the associated `GymClass` and `Trainer`, then map to `BookingDto`.
        3.  Return the list of `BookingDto`.
    -   **Error Cases:** None.

### Controller Layer

#### `BookingController`
-   Injects `BookingService`.
-   Handles public API requests for fetching trainers, classes, and managing member bookings.
-   `getAllTrainers()`: Calls `bookingService.getAllTrainers()` and returns `200 OK`.
-   `getTrainerById()`: Calls `bookingService.getTrainerById()` and returns `200 OK` or `404 NOT FOUND`.
-   `getAllGymClasses()`: Calls `bookingService.getAllGymClasses()` and returns `200 OK`.
-   `getGymClassById()`: Calls `bookingService.getGymClassById()` and returns `200 OK` or `404 NOT FOUND`.
-   `createBooking()`: Calls `bookingService.createBooking()` with the `CreateBookingRequest` and `userId` from the authenticated user. Returns `201 CREATED` or `400 BAD REQUEST` (`IllegalStateException`) or `404 NOT FOUND` (`ResourceNotFoundException`).
-   `cancelBooking()`: Calls `bookingService.cancelBooking()` with `bookingId` and `userId`. Returns `204 NO CONTENT` or `400 BAD REQUEST` (`IllegalArgumentException`, `IllegalStateException`) or `404 NOT FOUND` (`ResourceNotFoundException`).
-   `getMyBookings()`: Calls `bookingService.getBookingsByUserId()` with `userId` from the authenticated user. Returns `200 OK`.

#### `AdminBookingController`
-   Injects `BookingService`.
-   Handles admin-only API requests for CRUD operations on trainers and classes, and viewing all bookings.
-   `createTrainer()`: Calls `bookingService.createTrainer()` and returns `201 CREATED`.
-   `updateTrainer()`: Calls `bookingService.updateTrainer()` and returns `200 OK` or `404 NOT FOUND`.
-   `deleteTrainer()`: Calls `bookingService.deleteTrainer()` and returns `204 NO CONTENT` or `404 NOT FOUND`.
-   `createGymClass()`: Calls `bookingService.createGymClass()` and returns `201 CREATED`.
-   `updateGymClass()`: Calls `bookingService.updateGymClass()` and returns `200 OK` or `404 NOT FOUND`.
-   `deleteGymClass()`: Calls `bookingService.deleteGymClass()` and returns `204 NO CONTENT` or `404 NOT FOUND`.
-   `getAllBookings()`: Calls `bookingService.getAllBookings()` and returns `200 OK`.

### DTOs
-   `TrainerDto`: Used for transferring trainer data between service and controller layers.
-   `GymClassDto`: Used for transferring gym class data.
-   `BookingDto`: Used for transferring booking data.
-   `CreateBookingRequest`: Request body for creating a new booking.

### Error Handling
-   `ResourceNotFoundException` (from `shared-backend`): Thrown when an entity (Trainer, GymClass, Booking) is not found. Handled by `GlobalExceptionHandler` to return `404 NOT FOUND`.
-   `IllegalArgumentException`: Thrown for invalid arguments, e.g., `userId` mismatch during booking cancellation. Handled by `GlobalExceptionHandler` to return `400 BAD REQUEST`.
-   `IllegalStateException`: Thrown for invalid state transitions, e.g., booking a full class or cancelling an already cancelled booking. Handled by `GlobalExceptionHandler` to return `400 BAD REQUEST`.


---

## Content Management (Backend)

**Name:** `content-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/absfitness/model/Testimonial.java` — MODEL layer — represents a customer testimonial or review, curated by an admin.
- `backend/src/main/java/com/absfitness/model/Enquiry.java` — MODEL layer — represents a lead capture or contact form submission from the website.
- `backend/src/main/java/com/absfitness/model/EnquiryStatus.java` — MODEL layer — enum for the status of an enquiry (e.g., NEW, CONTACTED, CLOSED).
- `backend/src/main/java/com/absfitness/repository/TestimonialRepository.java` — REPOSITORY layer — Spring Data JPA repository for Testimonial entities.
- `backend/src/main/java/com/absfitness/repository/EnquiryRepository.java` — REPOSITORY layer — Spring Data JPA repository for Enquiry entities.
- `backend/src/main/java/com/absfitness/service/ContentService.java` — SERVICE layer — implements createTestimonial(TestimonialDto): TestimonialDto, getTestimonialById(UUID): TestimonialDto, getAllTestimonials(): List<TestimonialDto>, updateTestimonial(UUID, TestimonialDto): TestimonialDto, deleteTestimonial(UUID): void, submitEnquiry(CreateEnquiryRequest): EnquiryDto, getAllEnquiries(): List<EnquiryDto>, and updateEnquiryStatus(UUID, EnquiryStatus): EnquiryDto; delegates persistence to TestimonialRepository and EnquiryRepository.
- `backend/src/main/java/com/absfitness/dto/TestimonialDto.java` — DTO layer — Data Transfer Object for Testimonial entities.
- `backend/src/main/java/com/absfitness/dto/EnquiryDto.java` — DTO layer — Data Transfer Object for Enquiry entities.
- `backend/src/main/java/com/absfitness/dto/CreateEnquiryRequest.java` — DTO layer — Request body for submitting a new enquiry or lead capture form.
- `backend/src/main/java/com/absfitness/controller/ContentController.java` — CONTROLLER layer — Public API endpoints for fetching testimonials and submitting enquiries.
- `backend/src/main/java/com/absfitness/controller/admin/AdminContentController.java` — CONTROLLER layer — Admin-only API endpoints for CRUD operations on testimonials and managing enquiries.

**Feature Instruction:**

The Content Management feature handles the backend logic and data persistence for customer testimonials and website enquiries. It provides public API endpoints for fetching testimonials and submitting new enquiries, and admin-only API endpoints for full CRUD operations on testimonials and managing enquiry statuses. This feature is designed to be consumed by the `core-ui` frontend feature for displaying content and capturing leads, and by the `admin-portal` frontend feature for content moderation.

## Testimonial Management
Testimonials are managed by administrators. The `Testimonial` model represents a customer review with fields for `id`, `authorName`, `quote`, `imageUrl`, and `displayOrder`. The `TestimonialRepository` provides standard JPA operations. The `ContentService` exposes methods for creating, retrieving, updating, and deleting testimonials, mapping between `Testimonial` entities and `TestimonialDto` objects. The `AdminContentController` exposes REST endpoints for these operations, requiring admin authentication.

### `ContentService.createTestimonial(TestimonialDto testimonialDto): TestimonialDto`
1. Validates `testimonialDto`.
2. Creates a new `Testimonial` entity from `testimonialDto`.
3. Saves the `Testimonial` entity using `testimonialRepository.save()`.
4. Returns the saved `Testimonial` mapped to `TestimonialDto`.

### `ContentService.getTestimonialById(UUID id): TestimonialDto`
1. Retrieves a `Testimonial` by `id` using `testimonialRepository.findById()`.
2. If not found, throws `ResourceNotFoundException`.
3. Returns the `Testimonial` mapped to `TestimonialDto`.

### `ContentService.getAllTestimonials(): List<TestimonialDto>`
1. Retrieves all `Testimonial` entities using `testimonialRepository.findAll()`.
2. Sorts testimonials by `displayOrder`.
3. Returns the list of `Testimonial` entities mapped to `List<TestimonialDto>`.

### `ContentService.updateTestimonial(UUID id, TestimonialDto testimonialDto): TestimonialDto`
1. Retrieves the existing `Testimonial` by `id` using `testimonialRepository.findById()`.
2. If not found, throws `ResourceNotFoundException`.
3. Updates the `authorName`, `quote`, `imageUrl`, and `displayOrder` fields of the existing `Testimonial` entity from `testimonialDto`.
4. Saves the updated `Testimonial` entity using `testimonialRepository.save()`.
5. Returns the updated `Testimonial` mapped to `TestimonialDto`.

### `ContentService.deleteTestimonial(UUID id): void`
1. Checks if a `Testimonial` with the given `id` exists using `testimonialRepository.existsById()`.
2. If not found, throws `ResourceNotFoundException`.
3. Deletes the `Testimonial` entity by `id` using `testimonialRepository.deleteById()`.

## Enquiry Management
Enquiries are submitted by public users via a contact form and managed by administrators. The `Enquiry` model captures `id`, `name`, `email`, `phone`, `message`, `submissionTime`, and `status`. The `EnquiryStatus` enum defines possible states like `NEW`, `CONTACTED`, `CLOSED`. The `EnquiryRepository` provides standard JPA operations. The `ContentService` exposes methods for submitting new enquiries, retrieving all enquiries, and updating an enquiry's status. The `ContentController` exposes a public endpoint for submitting enquiries, and `AdminContentController` exposes admin-only endpoints for viewing and updating enquiries.

### `ContentService.submitEnquiry(CreateEnquiryRequest request): EnquiryDto`
1. Validates `request`.
2. Creates a new `Enquiry` entity from `request`, setting `submissionTime` to `LocalDateTime.now()` and `status` to `EnquiryStatus.NEW`.
3. Saves the `Enquiry` entity using `enquiryRepository.save()`.
4. Returns the saved `Enquiry` mapped to `EnquiryDto`.

### `ContentService.getAllEnquiries(): List<EnquiryDto>`
1. Retrieves all `Enquiry` entities using `enquiryRepository.findAll()`.
2. Returns the list of `Enquiry` entities mapped to `List<EnquiryDto>`.

### `ContentService.updateEnquiryStatus(UUID id, EnquiryStatus newStatus): EnquiryDto`
1. Retrieves the existing `Enquiry` by `id` using `enquiryRepository.findById()`.
2. If not found, throws `ResourceNotFoundException`.
3. Updates the `status` field of the existing `Enquiry` entity to `newStatus`.
4. Saves the updated `Enquiry` entity using `enquiryRepository.save()`.
5. Returns the updated `Enquiry` mapped to `EnquiryDto`.

## Controllers
- `ContentController` provides public API endpoints:
    - `GET /api/v1/content/testimonials`: Retrieves all testimonials.
    - `POST /api/v1/content/enquiries`: Submits a new enquiry.
- `AdminContentController` provides admin-only API endpoints:
    - `GET /api/v1/admin/content/testimonials`: Retrieves all testimonials.
    - `GET /api/v1/admin/content/testimonials/{id}`: Retrieves a testimonial by ID.
    - `POST /api/v1/admin/content/testimonials`: Creates a new testimonial.
    - `PUT /api/v1/admin/content/testimonials/{id}`: Updates an existing testimonial.
    - `DELETE /api/v1/admin/content/testimonials/{id}`: Deletes a testimonial.
    - `GET /api/v1/admin/content/enquiries`: Retrieves all enquiries.
    - `PUT /api/v1/admin/content/enquiries/{id}/status`: Updates the status of an enquiry.

Both controllers inject `ContentService` to perform business operations. Error handling for `ResourceNotFoundException` is managed by the `shared-backend`'s `GlobalExceptionHandler`.

---

## Core UI & Static Pages

**Name:** `core-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/App.tsx` — The root component of the React application, responsible for setting up routing using `react-router-dom`.
- `frontend/src/config/siteConfig.ts` — Central configuration for site-wide properties like brand name, navigation links, and footer content, consumed by the global `SiteHeader` and `SiteFooter`.
- `frontend/src/pages/HomePage.tsx` — PAGE layer — the main landing page, composed of `HeroSection`, `FacilitiesHighlight`, `TestimonialsSection`, and `LeadCaptureForm`.
- `frontend/src/components/home/HeroSection.tsx` — COMPONENT layer — displays a full-bleed hero with a video background and a prominent call to action.
- `frontend/src/components/home/FacilitiesHighlight.tsx` — COMPONENT layer — displays a grid or card-based section to visually showcase key facilities.
- `frontend/src/components/home/TestimonialsSection.tsx` — COMPONENT layer — displays a rotating carousel of curated customer reviews, fetching data via `useContent().useTestimonials()`.
- `frontend/src/components/home/LeadCaptureForm.tsx` — COMPONENT layer — provides a form for prospective members to request a free trial or book a tour, submitting data via `useContent().useSubmitEnquiry()`.
- `frontend/src/pages/AboutPage.tsx` — PAGE layer — a static page describing the gym's mission, history, and values.
- `frontend/src/pages/ContactPage.tsx` — PAGE layer — displays contact information, an embedded Google Map, and the `LeadCaptureForm`.
- `frontend/src/pages/VirtualTourPage.tsx` — PAGE layer — a page to host an embedded 360-degree virtual tour of the gym facility.
- `frontend/src/pages/NotFoundPage.tsx` — PAGE layer — a user-friendly 404 page to handle invalid routes.
- `frontend/src/types/testimonial.ts` — TypeScript types for the Testimonial data structure, mirroring the backend `TestimonialDto`.
- `frontend/src/types/enquiry.ts` — TypeScript types for the Enquiry data structure and `CreateEnquiryRequest`, mirroring backend DTOs.
- `frontend/src/services/contentService.ts` — SERVICE layer — provides API client functions `getAllTestimonials(): Promise<Testimonial[]>` and `submitEnquiry(request: CreateEnquiryRequest): Promise<Enquiry>` for interacting with the `content-management` backend.
- `frontend/src/hooks/useContent.ts` — HOOK layer — React Query hook for managing testimonial and enquiry data, exporting `useTestimonials()` and `useSubmitEnquiry()`.

**Feature Instruction:**

This feature, Core UI & Static Pages, establishes the foundational user interface and routing for the ABS FITNESS frontend application. It includes the main application entry point (`App.tsx`), global site configuration (`siteConfig.ts`), and several static marketing pages (`HomePage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, `VirtualTourPage.tsx`, `NotFoundPage.tsx`). It also defines shared UI components for the homepage (`HeroSection.tsx`, `FacilitiesHighlight.tsx`, `TestimonialsSection.tsx`, `LeadCaptureForm.tsx`) and the necessary TypeScript types (`testimonial.ts`, `enquiry.ts`) and API client (`contentService.ts`) and React Query hook (`useContent.ts`) for testimonials and lead enquiries.

## Design Tokens
- Navbar: bg-[#1A1A1A] text-[#FFFFFF]
- Primary CTA: bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#FF5722]
- Section bg: bg-[#F5F5F5] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#1A1A1A] leading-relaxed

### `App.tsx`
This file sets up the main routing for the application using `react-router-dom`. It defines public routes for the static pages and a catch-all for `NotFoundPage`. It also integrates the global `SiteLayout` (which includes `SiteHeader` and `SiteFooter`) provided by the application shell, meaning individual pages do not need to wrap themselves in a layout.

### `siteConfig.ts`
This file centralizes all site-wide configuration, including the brand name, navigation links, and footer content. It exports a `siteConfig` object that is consumed by `SiteHeader` and `SiteFooter` (from the application shell). The contact details for ABS FITNESS (address, phone, coordinates, opening hours) are provided verbatim here.

### `HomePage.tsx`
This page serves as the main landing page for ABS FITNESS. It is composed of several key sections:
1.  **Hero Section**: Utilizes `HeroSection` to display a dynamic, full-bleed hero with a video background and a prominent call to action.
2.  **Facilities Highlight**: Integrates `FacilitiesHighlight` to showcase the gym's premium amenities.
3.  **Testimonials Section**: Renders `TestimonialsSection` to display customer reviews, fetching data using `useContent().useTestimonials()`.
4.  **Lead Capture Form**: Includes `LeadCaptureForm` to encourage prospective members to request a free trial or tour. This form submits data using `useContent().useSubmitEnquiry()`.

### `HeroSection.tsx`
This component displays a full-bleed hero with a video background. It should feature the gym's name "ABS FITNESS" prominently as the main headline and a motivational sub-headline like "Unleash Your Potential. Transform Your Body. Elevate Your Life." It includes a primary call-to-action button, styled with `bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200`, with the text "Start Your Free Trial". The background video should be a relevant Unsplash image URL for a gym, with a `bg-black bg-opacity-50` overlay.

### `FacilitiesHighlight.tsx`
This component presents a grid or card-based layout to highlight key facilities. Each facility card should include an image, a title (e.g., "State-of-the-Art Equipment", "Olympic-Size Swimming Pool", "Expert Personal Trainers"), and a brief description. Use the `Card` design token for styling individual facility cards.

### `TestimonialsSection.tsx`
This component displays a rotating carousel of customer testimonials. It fetches testimonial data using the `useContent().useTestimonials()` hook. Each testimonial card should display the `authorName`, `quote`, and `imageUrl` (if available) from the `TestimonialDto`. Use the `Card` design token for styling individual testimonial cards. The section heading should be "What Our Members Say" with a sub-heading "Hear from our thriving community."

### `LeadCaptureForm.tsx`
This component provides a form for prospective members to submit enquiries. It should include fields for `name`, `email`, `phone`, and `message`. Upon submission, it calls the `useContent().useSubmitEnquiry()` mutation. The form should have a clear call-to-action button, styled with `bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200`, with the text "Request a Free Trial". Include a success toast notification using `sonner` upon successful submission.

### `AboutPage.tsx`
This static page describes the gym's mission, history, and values. It should include sections with headings like "Our Story," "Our Mission," and "Our Values." Incorporate placeholder text that aligns with the motivational and professional tone. Include team photos (using relevant Unsplash URLs) and descriptive text for each section. Use `Section bg` and `Section container` design tokens for layout.

### `ContactPage.tsx`
This page displays the gym's contact information, including the address, phone number, and opening hours from `siteConfig.ts`. It should embed a Google Map using the coordinates from `siteConfig.ts` to show the gym's location. It also reuses the `LeadCaptureForm` component for enquiries. The section heading should be "Get in Touch" and a sub-heading "We're here to help you achieve your fitness goals."

### `VirtualTourPage.tsx`
This page is dedicated to hosting an embedded 360-degree virtual tour of the ABS FITNESS facility. It should contain a placeholder for an iframe or similar embed code for a virtual tour (e.g., from Google Street View or a dedicated virtual tour service). The page should have a clear heading like "Explore ABS FITNESS" and a sub-heading "Take a virtual walk through our world-class facility."

### `NotFoundPage.tsx`
This page provides a user-friendly 404 error message for invalid routes. It should display a prominent "404" or "Page Not Found" message, a brief explanation (e.g., "The page you are looking for does not exist."), and a link back to the `HomePage` with the text "Go to Homepage".

### `testimonial.ts`
This file defines the TypeScript interface `Testimonial` which mirrors the `TestimonialDto` from the `content-management` backend feature. It includes fields for `id`, `authorName`, `quote`, `imageUrl`, and `displayOrder`.

### `enquiry.ts`
This file defines the TypeScript interface `Enquiry` which mirrors the `EnquiryDto` from the `content-management` backend feature, and `CreateEnquiryRequest` for submitting new enquiries. It includes fields for `id`, `name`, `email`, `phone`, `message`, `submissionTime`, and `status` for `Enquiry`, and `name`, `email`, `phone`, `message` for `CreateEnquiryRequest`.

### `contentService.ts`
This service provides API client functions for interacting with the `content-management` backend feature. It includes `getAllTestimonials()` to fetch a list of testimonials and `submitEnquiry(request: CreateEnquiryRequest)` to submit a new enquiry. These functions will make HTTP requests to the `/api/v1/content/testimonials` (GET) and `/api/v1/content/enquiries` (POST) endpoints respectively.

### `useContent.ts`
This React Query hook centralizes data fetching and mutation logic for testimonials and enquiries. It exports `useTestimonials()` to query all testimonials and `useSubmitEnquiry()` to mutate (create) a new enquiry. These hooks utilize `contentService.ts` to interact with the backend.

---

## Authentication & Member Account

**Name:** `auth-and-account`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/components/ProtectedRoute.tsx` — COMPONENT layer — guards routes, redirecting unauthenticated users to the login page.
- `frontend/src/pages/LoginPage.tsx` — PAGE layer — provides a form for users to log in, using `useAuth().login`.
- `frontend/src/pages/SignupPage.tsx` — PAGE layer — provides a form for new users to register, using `useAuth().register`.
- `frontend/src/pages/AccountPage.tsx` — PAGE layer — the main dashboard for a logged-in member, displaying profile details and navigation.
- `frontend/src/pages/MyBookingsPage.tsx` — PAGE layer — displays a list of the logged-in member's class bookings, using `useBooking().useMyBookings`.
- `frontend/src/pages/MySubscriptionPage.tsx` — PAGE layer — displays the logged-in member's membership plan status, using `useMembership().useMySubscription`.
- `frontend/src/components/account/ProfileDetails.tsx` — COMPONENT layer — displays and allows editing of the logged-in user's profile information.
- `frontend/src/components/account/BookingsTable.tsx` — COMPONENT layer — a table listing a member's class bookings, with options to view details or cancel.
- `frontend/src/components/account/SubscriptionStatusCard.tsx` — COMPONENT layer — displays the user's current membership plan, expiry date, and a renewal CTA.

**Feature Instruction:**

This feature provides user authentication (login, signup) and a member account area with protected routes. It integrates with the pre-scaffolded `AuthContext` for authentication state management and `authService` for API calls. The member account pages (`AccountPage`, `MyBookingsPage`, `MySubscriptionPage`) are protected by `ProtectedRoute` and display user-specific data by calling backend APIs from the `scheduling-and-booking` and `membership-management` features.

## Design Tokens
- Navbar: bg-[#1A1A1A] text-white
- Primary CTA: bg-[#FF5722] hover:bg-[#e64a19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#FF5722]
- Section bg: bg-white (odd sections) / bg-[#F5F5F5] (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#1A1A1A] leading-relaxed

### ProtectedRoute.tsx
This component wraps routes that require authentication. It uses the `useAuth` hook to check `isAuthenticated`. If the user is not authenticated, it redirects them to the `/login` page. Otherwise, it renders the child components.

### LoginPage.tsx
This page provides a login form. It uses the `useAuth` hook's `login` function to authenticate the user. On successful login, the user is redirected to the `/account` page. The form includes fields for `username` and `password` and a submit button with the text "Login to your ABS FITNESS Account". It should also include a link to the signup page.

### SignupPage.tsx
This page provides a signup form for new users. It uses the `useAuth` hook's `register` function to create a new user account and automatically log them in. On successful registration, the user is redirected to the `/account` page. The form includes fields for `username`, `email`, `password`, and `confirm password`, and a submit button with the text "Join ABS FITNESS Today". It should also include a link to the login page.

### AccountPage.tsx
This is the main dashboard for a logged-in member. It displays a welcome message including the user's username (from `useAuth().user.username`). It includes navigation links to `MyBookingsPage` and `MySubscriptionPage`. It renders the `ProfileDetails` component to display and allow editing of the user's profile information.

### MyBookingsPage.tsx
This page displays a list of the logged-in member's upcoming and past class bookings. It uses the `useAuth` hook to get the `userId` and then calls the `useBooking().useMyBookings(userId)` hook to fetch the booking data. The bookings are displayed in the `BookingsTable` component.

### MySubscriptionPage.tsx
This page displays the status of the logged-in member's current membership plan and renewal options. It uses the `useAuth` hook to get the `userId` and then calls the `useMembership().useMySubscription(userId)` hook to fetch the subscription data. The subscription status is displayed in the `SubscriptionStatusCard` component.

### ProfileDetails.tsx
This component displays the logged-in user's profile information. It should fetch the user's profile details (e.g., name, email) from a backend API (if available, otherwise use `useAuth().user.username` as a placeholder). It should provide an option to edit these details. The component should display the username from `useAuth().user.username`.

### BookingsTable.tsx
This component is a table that lists a member's class bookings. It receives a `List<BookingDto>` as props. Each row should display the class name, start time, end time, trainer name, and booking status. It should also include options to view details or cancel a booking (if the status allows). Cancellation should call `useBooking().useCancelBooking().mutate(bookingId)`.

### SubscriptionStatusCard.tsx
This component displays the user's current membership plan, expiry date, and a renewal CTA. It receives a `MemberSubscriptionDto` as props. It should display the `membershipPlanName`, `startDate`, `endDate`, and `status`. If the subscription is `EXPIRED` or `CANCELLED`, it should show a prominent "Renew Now" CTA that links to the `/membership` page.

---

## Membership Sales Flow

**Name:** `membership-flow`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/membership.ts` — Generated from the backend API contract — defines TypeScript interfaces for membership plans and subscriptions.
- `frontend/src/services/membershipService.ts` — API client functions for interacting with the backend membership-management API.
- `frontend/src/hooks/useMembership.ts` — React Query hook for managing membership plan and subscription data, providing cached data and mutation capabilities to UI components.
- `frontend/src/pages/MembershipPage.tsx` — PAGE layer — displays available membership plans using MembershipGrid and provides navigation to checkout.
- `frontend/src/components/membership/MembershipGrid.tsx` — COMPONENT layer — renders a grid of MembershipPlanCard components.
- `frontend/src/components/membership/MembershipPlanCard.tsx` — COMPONENT layer — displays details of a single membership plan with a purchase button.
- `frontend/src/pages/CheckoutPage.tsx` — PAGE layer — orchestrates the membership checkout process, displaying order summary and payment form.
- `frontend/src/components/checkout/CheckoutForm.tsx` — COMPONENT layer — handles the initiation of a membership subscription payment.
- `frontend/src/components/checkout/OrderSummary.tsx` — COMPONENT layer — displays the details of the selected membership plan and total price.

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

This feature implements the frontend sales flow for ABS FITNESS membership plans, allowing users to browse available plans, select one, and proceed to checkout. It consists of TypeScript types, API service functions, React Query hooks, and UI components.

`membership.ts` defines the `MembershipPlan` and `MemberSubscription` TypeScript interfaces, mirroring the backend DTOs from the `membership-management` feature. These types are used throughout the frontend for data consistency.

`membershipService.ts` provides asynchronous functions to interact with the backend `membership-management` API. It includes `getAllMembershipPlans()` to fetch active plans and `createSubscription(request: CreateSubscriptionRequest)` to initiate a new membership subscription. These functions handle API calls and error handling.

`useMembership.ts` is a React Query hook that wraps the `membershipService` functions. It exports `useMembershipPlans()` for fetching and caching membership plans, and `useCreateSubscription()` for handling the mutation of creating a new subscription. These hooks provide loading, error, and data states to the UI components.

`MembershipPage.tsx` is the main public-facing page for displaying membership plans. It utilizes `useMembershipPlans()` to fetch the data and renders the `MembershipGrid` component. The page will feature a hero section with a motivational headline like "Unlock Your Potential with ABS FITNESS Memberships" and a subheadline like "Choose the plan that fits your fitness journey." The membership plans will be displayed in a grid, each with a clear call to action.

`MembershipGrid.tsx` is a presentational component that receives a list of `MembershipPlan` objects as props. It iterates over the plans and renders a `MembershipPlanCard` for each. The grid layout will be responsive, adapting to different screen sizes.

`MembershipPlanCard.tsx` displays the details of a single `MembershipPlan`. Each card will show the plan's name, description, price (formatted in ₹), and duration. It includes a "Join Now" button that, when clicked, navigates the user to the `CheckoutPage` with the selected plan's ID. The button will use the primary CTA design token.

`CheckoutPage.tsx` is responsible for the membership purchase flow. It receives the `membershipPlanId` from the URL parameters. It fetches the details of the selected membership plan using `useMembershipPlans()` (or a specific plan fetch if available). It renders the `OrderSummary` component to display the selected plan's details and the `CheckoutForm` component for payment processing. The page will have a clear heading like "Complete Your ABS FITNESS Membership Purchase."

`OrderSummary.tsx` is a component that displays the details of the selected `MembershipPlan` and the total amount due. It will show the plan name, duration, and price, ensuring all monetary values are formatted in Indian Rupees (₹) using the `en-IN` locale.

`CheckoutForm.tsx` handles the actual payment initiation. It receives the selected `membershipPlanId` and the `userId` (from `useAuth()`). When the user confirms the purchase, it calls `useCreateSubscription()` with a `CreateSubscriptionRequest` containing the `membershipPlanId`, `userId`, and a placeholder `paymentId`. Upon successful subscription, it should navigate the user to a confirmation page or the user's profile. It will include a prominent "Pay Now" button using the primary CTA design token.

All monetary values displayed across the feature (e.g., in `MembershipPlanCard`, `OrderSummary`) must be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

---

## Class Booking Flow

**Name:** `class-booking-flow`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/booking.ts` — Generated from the backend API contract — defines TypeScript interfaces for Trainer, GymClass, and Booking DTOs.
- `frontend/src/services/bookingService.ts` — SERVICE layer — provides API client functions for interacting with the scheduling and booking backend, including getAllTrainers(): Promise<TrainerDto[]>, getTrainerById(trainerId: string): Promise<TrainerDto>, getAllGymClasses(): Promise<GymClassDto[]>, getGymClassById(classId: string): Promise<GymClassDto>, createBooking(request: CreateBookingRequest): Promise<BookingDto>, cancelBooking(bookingId: string): Promise<void>, and getMyBookings(): Promise<BookingDto[]>.
- `frontend/src/hooks/useBooking.ts` — HOOK layer — provides React Query hooks for managing trainer, class, and booking data, including useTrainers(): UseQueryResult<TrainerDto[]>, useTrainer(trainerId: string): UseQueryResult<TrainerDto>, useGymClasses(): UseQueryResult<GymClassDto[]>, useGymClass(classId: string): UseQueryResult<GymClassDto>, useCreateBooking(): UseMutationResult<BookingDto, Error, CreateBookingRequest>, useCancelBooking(): UseMutationResult<void, Error, string>, and useMyBookings(): UseQueryResult<BookingDto[]>.
- `frontend/src/pages/ClassesPage.tsx` — PAGE layer — displays the weekly class schedule using the ClassSchedule component and fetches data via useGymClasses.
- `frontend/src/pages/TrainersPage.tsx` — PAGE layer — presents a gallery of trainers using TrainerCard components and fetches data via useTrainers.
- `frontend/src/pages/TrainerDetailPage.tsx` — PAGE layer — displays a detailed profile for a single trainer using the TrainerProfile component and fetches data via useTrainer.
- `frontend/src/components/classes/ClassSchedule.tsx` — COMPONENT layer — renders an interactive schedule of gym classes, allowing filtering and displaying each class with a ClassCard.
- `frontend/src/components/classes/ClassCard.tsx` — COMPONENT layer — displays information for a single gym class and provides a 'Book Now' button to open the BookingModal.
- `frontend/src/components/classes/BookingModal.tsx` — COMPONENT layer — a dialog for confirming a class booking, utilizing the useCreateBooking hook for API interaction.
- `frontend/src/components/trainers/TrainerCard.tsx` — COMPONENT layer — displays a trainer's photo, name, and specializations, and navigates to TrainerDetailPage on click.
- `frontend/src/components/trainers/TrainerProfile.tsx` — COMPONENT layer — displays the detailed profile information for a single trainer.

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

This feature provides the frontend user interface and logic for browsing gym classes and trainers, and for making class bookings. It consists of TypeScript types, API service functions, React Query hooks, and several React components and pages.

`frontend/src/types/booking.ts` defines the data structures for `Trainer`, `GymClass`, and `Booking` based on the backend DTOs from the `scheduling-and-booking` feature. These types are used throughout the frontend for consistency.

`frontend/src/services/bookingService.ts` acts as the API client, providing asynchronous functions to interact with the backend `scheduling-and-booking` feature's endpoints. It includes functions to fetch all trainers, a specific trainer by ID, all gym classes, a specific gym class by ID, create a new booking, cancel an existing booking, and retrieve a user's bookings. All API calls are made using the generated API client, which handles authentication automatically.

`frontend/src/hooks/useBooking.ts` leverages React Query to manage the state and caching of data fetched via `bookingService.ts`. It exports hooks such as `useTrainers`, `useTrainer`, `useGymClasses`, `useGymClass`, `useCreateBooking`, `useCancelBooking`, and `useMyBookings`. These hooks provide loading states, error handling, and data revalidation capabilities, simplifying data management in components.

`frontend/src/pages/ClassesPage.tsx` displays the weekly class schedule. It uses the `useGymClasses` hook to fetch all available classes and renders them within the `ClassSchedule` component. The page features a prominent heading "Our Class Schedule" and a sub-heading "Find Your Perfect Workout". The layout should be clean and spacious, allowing users to easily browse classes. The page will use `bg-[#F5F5F5]` for its background.

`frontend/src/components/classes/ClassSchedule.tsx` is an interactive component that takes a list of `GymClassDto` objects as props. It allows users to filter classes by various criteria (e.g., trainer, type, time) and displays them in a calendar-like or timeline view. Each class is rendered using a `ClassCard` component. When a user clicks to book a class, it opens the `BookingModal`.

`frontend/src/components/classes/ClassCard.tsx` displays details of a single `GymClassDto`. It includes the class name, trainer name, start and end times, description, and a 'Book Now' button. The 'Book Now' button, styled as a primary CTA, triggers the opening of the `BookingModal` for the specific class. Monetary values like class prices (if applicable) should be formatted using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

`frontend/src/components/classes/BookingModal.tsx` is a dialog that appears when a user attempts to book a class. It confirms the class details and provides a button to finalize the booking. It uses the `useCreateBooking` hook to send the booking request to the backend. Upon successful booking, it should display a success toast notification (e.g., using `sonner`) and close the modal. If an error occurs, an error toast should be displayed.

`frontend/src/pages/TrainersPage.tsx` presents a gallery of all trainers. It fetches trainer data using the `useTrainers` hook and renders each trainer using a `TrainerCard` component. The page features a heading "Meet Our Expert Trainers" and a sub-heading "Guidance for Your Fitness Journey". The layout should be a responsive grid of trainer cards, using `bg-white` for its background.

`frontend/src/components/trainers/TrainerCard.tsx` displays a trainer's photo, name, and specializations. Clicking on a trainer card navigates to the `TrainerDetailPage` for that specific trainer. The card should have a clean, modern design consistent with the overall premium aesthetic.

`frontend/src/pages/TrainerDetailPage.tsx` shows a detailed profile for a single trainer. It retrieves the trainer's ID from the URL parameters and uses the `useTrainer` hook to fetch the trainer's data. The `TrainerProfile` component is used to render the details. The page will use `bg-[#F5F5F5]` for its background.

`frontend/src/components/trainers/TrainerProfile.tsx` displays a trainer's full bio, image, specializations, and potentially a list of classes they conduct. This component receives a `TrainerDto` as a prop and formats the information for display. It should have a professional and engaging layout.

**Booking Flow:**
1. User navigates to `ClassesPage.tsx` to view the schedule.
2. `ClassesPage.tsx` uses `useGymClasses` to fetch `List<GymClassDto>` from `/api/v1/classes` via `bookingService.ts`.
3. `ClassSchedule.tsx` renders `ClassCard.tsx` for each `GymClassDto`.
4. User clicks 'Book Now' on a `ClassCard.tsx`.
5. `ClassCard.tsx` opens `BookingModal.tsx`, passing the `gymClassId`.
6. `BookingModal.tsx` displays class details and a confirmation button.
7. User confirms booking. `BookingModal.tsx` calls `useCreateBooking` hook, which in turn calls `bookingService.createBooking({ gymClassId: UUID }, userId)` to `POST /api/v1/bookings`.
8. Upon successful booking, a success toast is shown. If the user is not authenticated, the `POST /api/v1/bookings` endpoint will return a 401 Unauthorized error, which the API client will handle by redirecting to the login page.

**Trainer Flow:**
1. User navigates to `TrainersPage.tsx`.
2. `TrainersPage.tsx` uses `useTrainers` to fetch `List<TrainerDto>` from `/api/v1/trainers` via `bookingService.ts`.
3. `TrainersPage.tsx` renders `TrainerCard.tsx` for each `TrainerDto`.
4. User clicks on a `TrainerCard.tsx`.
5. Navigation occurs to `TrainerDetailPage.tsx` with the `trainerId` as a URL parameter.
6. `TrainerDetailPage.tsx` uses `useTrainer(trainerId)` to fetch `TrainerDto` from `/api/v1/trainers/{trainerId}` via `bookingService.ts`.
7. `TrainerDetailPage.tsx` renders `TrainerProfile.tsx` with the fetched `TrainerDto`.

---

## Photo & Video Gallery

**Name:** `gallery-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/GalleryPage.tsx` — PAGE layer — displays the gym's photo and video gallery, orchestrating the layout and passing media data to the GalleryGrid component.
- `frontend/src/components/gallery/GalleryGrid.tsx` — COMPONENT layer — a reusable component that renders a responsive grid of images and videos based on the provided media items.

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

The `gallery-ui` feature provides a visually engaging photo and video gallery for ABS FITNESS, showcasing the gym's facilities, trainers, and members in action. This feature consists of two files: `GalleryPage.tsx` and `GalleryGrid.tsx`.

`GalleryPage.tsx` serves as the main entry point for the gallery, providing the overall layout and fetching the media items. It will display a hero section at the top with a motivational headline and subheadline, followed by a grid of images and videos. The page will utilize the `GalleryGrid` component to render the actual media.

`GalleryGrid.tsx` is a reusable component responsible for displaying a responsive grid of media items. Each item in the grid will be a `MediaItem` object, which includes `id`, `type` (either 'image' or 'video'), `url`, and `thumbnailUrl` (for videos). The component will handle rendering images directly and videos with a thumbnail that, when clicked, opens a modal or plays the video inline. The grid should be responsive, adapting to different screen sizes.

**Data Flow:**
1. `GalleryPage.tsx` will fetch the gallery media data from a placeholder array (as there is no backend API for media management in the current scope). This data will simulate the structure of media items that would typically come from a content management system.
2. `GalleryPage.tsx` will pass the fetched media data as a prop to `GalleryGrid.tsx`.
3. `GalleryGrid.tsx` will iterate over the `mediaItems` prop and render each item appropriately based on its `type`.

**Styling and Design:**
- The `GalleryPage` will feature a hero section with a background image relevant to a gym, overlaid with a semi-transparent black layer. The headline will be "Witness Your Transformation" and the subheadline "Explore the vibrant world of ABS FITNESS."
- The main content area will use a `Section container` design token for consistent padding and max-width.
- The `GalleryGrid` will implement a responsive grid layout using Tailwind CSS, ensuring optimal display on various devices. Each media item will be presented within a `Card` design token, providing a clean and modern look.
- All text and background colors will strictly adhere to the `Design Tokens` defined above.

---

## Admin Portal

**Name:** `admin-portal`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/components/AdminLayout.tsx` — COMPONENT layer — provides the main layout structure for all admin pages, including a sidebar for navigation.
- `frontend/src/pages/AdminDashboardPage.tsx` — PAGE layer — the landing page for the admin portal, displaying key statistics and quick navigation links.
- `frontend/src/pages/AdminMembershipsPage.tsx` — PAGE layer — provides the interface for administrators to manage membership plans, including creation, viewing, updating, and deletion.
- `frontend/src/pages/AdminClassesPage.tsx` — PAGE layer — provides the interface for administrators to manage gym classes and trainers, including creation, viewing, updating, and deletion.
- `frontend/src/pages/AdminBookingsPage.tsx` — PAGE layer — provides the interface for administrators to view and manage all member bookings.
- `frontend/src/pages/AdminContentPage.tsx` — PAGE layer — provides the interface for administrators to manage website testimonials and customer enquiries.
- `frontend/src/components/admin/MembershipPlanTable.tsx` — COMPONENT layer — displays a table of membership plans with actions for editing and deleting. It consumes the `useMembershipPlans` and `useDeleteMembershipPlan` hooks.
- `frontend/src/components/admin/MembershipPlanForm.tsx` — COMPONENT layer — provides a form for creating or editing membership plans. It consumes the `useCreateMembershipPlan` and `useUpdateMembershipPlan` hooks.
- `frontend/src/components/admin/ClassTable.tsx` — COMPONENT layer — displays a table of gym classes with actions for editing and deleting. It consumes the `useGymClasses` and `useDeleteGymClass` hooks.
- `frontend/src/components/admin/ClassForm.tsx` — COMPONENT layer — provides a form for creating or editing gym classes. It consumes the `useCreateGymClass`, `useUpdateGymClass`, and `useTrainers` hooks.
- `frontend/src/components/admin/BookingsOverviewTable.tsx` — COMPONENT layer — displays a table of all member bookings with filtering and sorting options. It consumes the `useAllBookings` hook.
- `frontend/src/components/admin/TestimonialTable.tsx` — COMPONENT layer — displays a table of testimonials with actions for editing and deleting. It consumes the `useTestimonials` and `useDeleteTestimonial` hooks.
- `frontend/src/components/admin/TestimonialForm.tsx` — COMPONENT layer — provides a form for creating or editing testimonials. It consumes the `useCreateTestimonial` and `useUpdateTestimonial` hooks.
- `frontend/src/components/admin/EnquiryTable.tsx` — COMPONENT layer — displays a table of customer enquiries with an action to update their status. It consumes the `useEnquiries` and `useUpdateEnquiryStatus` hooks.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A1A1A] text-[#FFFFFF]
- Primary CTA: bg-[#FF5722] hover:bg-orange-600 text-white font-semibold rounded-md px-6 py-3 transition-all duration-200
- Brand text accent: text-[#FF5722]
- Section bg: bg-[#F5F5F5] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-lg shadow-sm border border-gray-100 p-4
- Section container: <section className="py-8 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#1A1A1A] leading-relaxed

The Admin Portal feature provides a comprehensive web interface for ABS FITNESS administrators to manage various aspects of the gym's operations, including membership plans, gym classes, trainer details, member bookings, testimonials, and customer enquiries. This feature is built using React and TypeScript, leveraging `react-router-dom` for navigation and Tailwind CSS for styling, adhering to the provided design tokens for a professional and consistent look.

### AdminLayout.tsx
This component serves as the main layout for all admin pages. It includes a persistent sidebar for navigation and a header. The sidebar will contain links to `AdminDashboardPage`, `AdminMembershipsPage`, `AdminClassesPage`, `AdminBookingsPage`, and `AdminContentPage`. The layout ensures that all admin content is wrapped within this structure, providing a consistent user experience. It will use the `AdminLayoutProps` interface for its children prop.

### AdminDashboardPage.tsx
This page is the entry point for the admin portal, providing an overview of key operational metrics and quick links to other admin sections. It will display summary cards for active memberships, upcoming classes, and new enquiries. This page will consume data from the backend to populate these summary statistics, calling the generated service functions `getAllMembershipPlans()`, `getAllGymClasses()`, and `getAllEnquiries()`.

### AdminMembershipsPage.tsx
This page allows administrators to manage membership plans. It will display a table of all membership plans using the `MembershipPlanTable` component and provide functionality to create, edit, and delete plans via the `MembershipPlanForm` component, which will typically appear in a modal or drawer. The page will use the `useMembershipPlans` hook to fetch and manage membership plan data, and `useCreateMembershipPlan`, `useUpdateMembershipPlan`, `useDeleteMembershipPlan` hooks for mutations.

### AdminClassesPage.tsx
This page is dedicated to managing gym classes and trainers. It will feature two main sections: one for managing classes using `ClassTable` and `ClassForm`, and another for managing trainers using `TrainerTable` and `TrainerForm` (these trainer components are assumed to be part of this feature, similar to membership components). The page will utilize the `useGymClasses`, `useTrainers` hooks to fetch data and `useCreateGymClass`, `useUpdateGymClass`, `useDeleteGymClass`, `useCreateTrainer`, `useUpdateTrainer`, `useDeleteTrainer` hooks for mutations.

### AdminBookingsPage.tsx
This page provides an overview of all member bookings. It will display a sortable and filterable table of bookings using the `BookingsOverviewTable` component. The page will use the `useAllBookings` hook to fetch booking data from the backend.

### AdminContentPage.tsx
This page allows administrators to manage website content, specifically testimonials and customer enquiries. It will include a `TestimonialTable` and `TestimonialForm` for managing testimonials, and an `EnquiryTable` for viewing and managing customer enquiries. The page will use `useTestimonials`, `useEnquiries` hooks to fetch data and `useCreateTestimonial`, `useUpdateTestimonial`, `useDeleteTestimonial`, `useUpdateEnquiryStatus` hooks for mutations.

### MembershipPlanTable.tsx
This component displays a paginated and sortable table of `MembershipPlanDto` objects. It will provide actions for editing and deleting membership plans, which will trigger the `MembershipPlanForm` modal/drawer. It will consume the `useMembershipPlans` hook to get data and `useDeleteMembershipPlan` for deletion.

### MembershipPlanForm.tsx
This component is a form for creating or editing `MembershipPlanDto` objects. It will be rendered within a modal or drawer and will include fields for `name`, `description`, `price`, `durationInMonths`, and `isActive`. It will use `useCreateMembershipPlan` for new plans and `useUpdateMembershipPlan` for existing ones.

### ClassTable.tsx
This component displays a paginated and sortable table of `GymClassDto` objects. It will provide actions for editing and deleting gym classes, which will trigger the `ClassForm` modal/drawer. It will consume the `useGymClasses` hook to get data and `useDeleteGymClass` for deletion.

### ClassForm.tsx
This component is a form for creating or editing `GymClassDto` objects. It will be rendered within a modal or drawer and will include fields for `name`, `description`, `startTime`, `endTime`, `capacity`, and `trainerId`. It will use `useCreateGymClass` for new classes and `useUpdateGymClass` for existing ones. It will also need to fetch trainers for a dropdown, using `useTrainers`.

### BookingsOverviewTable.tsx
This component displays a paginated, sortable, and filterable table of `BookingDto` objects. It will show details like `gymClassName`, `gymClassStartTime`, `trainerName`, `userName`, and `status`. It will consume the `useAllBookings` hook to get data.

### TestimonialTable.tsx
This component displays a table of `TestimonialDto` objects. It will provide actions for editing and deleting testimonials, which will trigger the `TestimonialForm` modal/drawer. It will consume the `useTestimonials` hook to get data and `useDeleteTestimonial` for deletion.

### TestimonialForm.tsx
This component is a form for creating or editing `TestimonialDto` objects. It will be rendered within a modal or drawer and will include fields for `authorName`, `quote`, `imageUrl`, and `displayOrder`. It will use `useCreateTestimonial` for new testimonials and `useUpdateTestimonial` for existing ones.

### EnquiryTable.tsx
This component displays a table of `EnquiryDto` objects. It will show details like `name`, `email`, `phone`, `message`, `submissionTime`, and `status`. It will provide an action to update the enquiry status. It will consume the `useEnquiries` hook to get data and `useUpdateEnquiryStatus` for status updates.


---

## Infrastructure

**Name:** `infrastructure`  
**Type:** INFRA  
**Change required:** true

**Feature Instruction:**

_Not enriched (INFRA or skipped)._

---

