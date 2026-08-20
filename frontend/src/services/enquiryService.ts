// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { EnquiryDto } from '@/types/enquiry';

export const createEnquiry = async (request: EnquiryDto): Promise<EnquiryDto> => {
  const response = await apiClient.post<EnquiryDto>('/api/v1/enquiries', request);
  return response.data;
};

export const getAllEnquiries = async (): Promise<EnquiryDto[]> => {
  const response = await apiClient.get<EnquiryDto[]>('/api/v1/admin/enquiries');
  return response.data;
};

export const getEnquiryById = async (id: string): Promise<EnquiryDto> => {
  const response = await apiClient.get<EnquiryDto>(`/api/v1/admin/enquiries/${id}`);
  return response.data;
};

