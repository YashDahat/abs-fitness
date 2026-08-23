// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CreateInquiryRequest, InquiryDto } from '@/types/inquiry';

export const createInquiry = async (request: CreateInquiryRequest): Promise<InquiryDto> => {
  const response = await apiClient.post<InquiryDto>('/api/v1/inquiries', request);
  return response.data;
};

export const getAllInquiries = async (): Promise<InquiryDto[]> => {
  const response = await apiClient.get<InquiryDto[]>('/api/v1/admin/inquiries');
  return response.data;
};

export const getInquiryById = async (id: number): Promise<InquiryDto> => {
  const response = await apiClient.get<InquiryDto>(`/api/v1/admin/inquiries/${id}`);
  return response.data;
};

export const deleteInquiry = async (id: number): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/inquiries/${id}`);
};

