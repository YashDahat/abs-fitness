// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { TrainerDto } from '@/types/trainer';
import type { GymClassDto } from '@/types/gym';

export const getAllTrainers = async (): Promise<TrainerDto[]> => {
  const response = await apiClient.get<TrainerDto[]>('/api/v1/public/bookings/trainers');
  return response.data;
};

export const getTrainerById = async (id: string): Promise<TrainerDto> => {
  const response = await apiClient.get<TrainerDto>(`/api/v1/public/bookings/trainers/${id}`);
  return response.data;
};

export const getAllGymClasses = async (): Promise<GymClassDto[]> => {
  const response = await apiClient.get<GymClassDto[]>('/api/v1/public/bookings/classes');
  return response.data;
};

export const getGymClassById = async (id: number): Promise<GymClassDto> => {
  const response = await apiClient.get<GymClassDto>(`/api/v1/public/bookings/classes/${id}`);
  return response.data;
};

export const cancelBooking = async (id: number): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/public/bookings/${id}`);
};

