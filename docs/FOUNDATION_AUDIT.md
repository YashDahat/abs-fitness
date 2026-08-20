# Foundation Impedance Audit

Advisory — residual foundation impedance in generated code (Phase 4 detection net). Auto-rewrite arrives with the Phase 3 identity primitive.

<!-- AUDIT:BACKEND:START -->
## BACKEND

12 finding(s). The domain reference to the platform user should be the foundation handle `userId`.

### IDENTITY_HACK (1)
- `backend/src/main/java/com/absfitness/task/MembershipRenewalReminderTask.java:35` — UUID memberId = UUID.nameUUIDFromBytes(String.valueOf(subscription.getUserId()).getBytes());

### UUID_ID (11)
- `backend/src/main/java/com/absfitness/model/Booking.java:13` — @GeneratedValue(strategy = GenerationType.UUID)
- `backend/src/main/java/com/absfitness/model/Booking.java:14` — private UUID id;
- `backend/src/main/java/com/absfitness/model/Booking.java:17` — private UUID memberId;
- `backend/src/main/java/com/absfitness/model/Booking.java:36` — public UUID getId() {
- `backend/src/main/java/com/absfitness/model/Booking.java:44` — public UUID getMemberId() {
- `backend/src/main/java/com/absfitness/model/Trainer.java:20` — @GeneratedValue(strategy = GenerationType.UUID)
- `backend/src/main/java/com/absfitness/model/Trainer.java:21` — private UUID id;
- `backend/src/main/java/com/absfitness/model/Trainer.java:39` — public UUID getId() {
- `backend/src/main/java/com/absfitness/model/FitnessClass.java:21` — @GeneratedValue(strategy = GenerationType.UUID)
- `backend/src/main/java/com/absfitness/model/FitnessClass.java:22` — private UUID id;
- `backend/src/main/java/com/absfitness/model/FitnessClass.java:49` — public UUID getId() {
<!-- AUDIT:BACKEND:END -->
