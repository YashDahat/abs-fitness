// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface CreateInquiryRequest {
  name: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  message: string;
}

export interface InquiryDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  message: string;
  submissionTime: string;
}

export type InquiryType = 'FREE_TRIAL' | 'TOUR_BOOKING' | 'GENERAL_INQUIRY';

