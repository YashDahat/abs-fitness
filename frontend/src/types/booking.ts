// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface BookingDto {
  id: number;
  memberId: number;
  fitnessClassId: number;
  fitnessClassName: string;
  bookingTime: string;
  status: BookingStatus;
}

export interface CreateBookingRequest {
  fitnessClassId: number;
}

export type BookingStatus = 'CONFIRMED' | 'CANCELLED' | 'PENDING';

