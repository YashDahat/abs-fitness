// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { TestimonialDto } from '@/types/testimonial';
import type { CreateEnquiryRequest, EnquiryDto } from '@/types/enquiry';

export const getAllTestimonials = async (): Promise<TestimonialDto[]> => {
  const response = await apiClient.get<TestimonialDto[]>('/api/v1/content/testimonials');
  return response.data;
};

export const submitEnquiry = async (request: CreateEnquiryRequest): Promise<EnquiryDto> => {
  const response = await apiClient.post<EnquiryDto>('/api/v1/content/enquiries', request);
  return response.data;
};

export const adminGetAllTestimonials = async (): Promise<TestimonialDto[]> => {
  const response = await apiClient.get<TestimonialDto[]>('/api/v1/admin/content/testimonials');
  return response.data;
};

export const getTestimonialById = async (id: string): Promise<TestimonialDto> => {
  const response = await apiClient.get<TestimonialDto>(`/api/v1/admin/content/testimonials/${id}`);
  return response.data;
};

export const createTestimonial = async (request: TestimonialDto): Promise<TestimonialDto> => {
  const response = await apiClient.post<TestimonialDto>('/api/v1/admin/content/testimonials', request);
  return response.data;
};

export const updateTestimonial = async (id: string, request: TestimonialDto): Promise<TestimonialDto> => {
  const response = await apiClient.put<TestimonialDto>(`/api/v1/admin/content/testimonials/${id}`, request);
  return response.data;
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/content/testimonials/${id}`);
};

export const getAllEnquiries = async (): Promise<EnquiryDto[]> => {
  const response = await apiClient.get<EnquiryDto[]>('/api/v1/admin/content/enquiries');
  return response.data;
};

export const updateEnquiryStatus = async (id: string): Promise<EnquiryDto> => {
  const response = await apiClient.put<EnquiryDto>(`/api/v1/admin/content/enquiries/${id}/status`);
  return response.data;
};

