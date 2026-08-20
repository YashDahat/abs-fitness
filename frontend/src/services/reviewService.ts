// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { ReviewDto } from '@/types/review';

export const getApprovedReviews = async (): Promise<ReviewDto[]> => {
  const response = await apiClient.get<ReviewDto[]>('/api/v1/reviews');
  return response.data;
};

export const getAllReviews = async (): Promise<ReviewDto[]> => {
  const response = await apiClient.get<ReviewDto[]>('/api/v1/admin/reviews');
  return response.data;
};

export const getReviewById = async (id: number): Promise<ReviewDto> => {
  const response = await apiClient.get<ReviewDto>(`/api/v1/admin/reviews/${id}`);
  return response.data;
};

export const createReview = async (request: ReviewDto): Promise<ReviewDto> => {
  const response = await apiClient.post<ReviewDto>('/api/v1/admin/reviews', request);
  return response.data;
};

export const updateReview = async (id: number, request: ReviewDto): Promise<ReviewDto> => {
  const response = await apiClient.put<ReviewDto>(`/api/v1/admin/reviews/${id}`, request);
  return response.data;
};

export const deleteReview = async (id: number): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/reviews/${id}`);
};

export const approveReview = async (id: number): Promise<ReviewDto> => {
  const response = await apiClient.patch<ReviewDto>(`/api/v1/admin/reviews/${id}/approve`);
  return response.data;
};

