// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface BookingDto {
  id: number;
  userId: number;
  gymClassId: number;
  gymClassName: string;
  gymClassStartTime: string;
  gymClassEndTime: string;
  trainerName: string;
  bookingTime: string;
  status: BookingStatus;
}

export interface CreateBookingRequest {
  gymClassId: number;
}

export type BookingStatus = 'CONFIRMED' | 'CANCELLED' | 'WAITLISTED';

