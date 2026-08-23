// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface FitnessClassDto {
  id: number;
  name: string;
  description: string;
  scheduleTime: string;
  durationMinutes: number;
  capacity: number;
  bookedSlots: number;
  trainerId: number;
  trainerName: string;
}

