// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface CreateEnquiryRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface EnquiryDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  submissionTime: string;
  status: EnquiryStatus;
}

export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'CLOSED';

