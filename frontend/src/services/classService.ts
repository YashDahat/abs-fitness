// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { GymClassDto } from '@/types/gym';

export const createGymClass = async (request: GymClassDto): Promise<GymClassDto> => {
  const response = await apiClient.post<GymClassDto>('/api/v1/admin/classes', request);
  return response.data;
};

export const updateGymClass = async (classId: number, request: GymClassDto): Promise<GymClassDto> => {
  const response = await apiClient.put<GymClassDto>(`/api/v1/admin/classes/${classId}`, request);
  return response.data;
};

export const deleteGymClass = async (classId: number): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/classes/${classId}`);
};

