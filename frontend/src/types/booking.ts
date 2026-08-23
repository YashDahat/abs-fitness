// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface BookingDto {
  id: number;
  userId: number;
  fitnessClassId: number;
  fitnessClassName: string;
  scheduleTime: string;
  durationMinutes: number;
  bookingTime: string;
  status: BookingStatus;
}

export interface CreateBookingRequest {
  fitnessClassId: number;
}

export type BookingStatus = 'CONFIRMED' | 'REMINDER_SENT' | 'CANCELLED';

