# Foundation Impedance Audit

Advisory — residual foundation impedance in generated code (Phase 4 detection net). Auto-rewrite arrives with the Phase 3 identity primitive.

<!-- AUDIT:BACKEND:START -->
## BACKEND

3 finding(s). The domain reference to the platform user should be the foundation handle `userId`.

### UUID_ID (3)
- `backend/src/main/java/com/absfitness/model/Trainer.java:10` — @GeneratedValue(strategy = GenerationType.UUID)
- `backend/src/main/java/com/absfitness/model/Trainer.java:11` — private UUID id;
- `backend/src/main/java/com/absfitness/model/Trainer.java:18` — public UUID getId() {
<!-- AUDIT:BACKEND:END -->

<!-- AUDIT:FRONTEND:START -->
## FRONTEND

Clean — no residual foundation impedance.
<!-- AUDIT:FRONTEND:END -->
