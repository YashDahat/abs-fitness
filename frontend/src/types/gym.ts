// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface GymClassDto {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedSlots: number;
  trainerId: string;
  trainerName: string;
}

