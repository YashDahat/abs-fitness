// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { FitnessClassDto } from '@/types/fitnessClass';

export const getAllAvailableFitnessClasses = async (): Promise<FitnessClassDto[]> => {
  const response = await apiClient.get<FitnessClassDto[]>('/api/v1/fitness-classes');
  return response.data;
};

export const getFitnessClassById = async (id: number): Promise<FitnessClassDto> => {
  const response = await apiClient.get<FitnessClassDto>(`/api/v1/fitness-classes/${id}`);
  return response.data;
};

export const getAllFitnessClasses = async (): Promise<FitnessClassDto[]> => {
  const response = await apiClient.get<FitnessClassDto[]>('/api/v1/admin/fitness-classes');
  return response.data;
};

export const adminGetFitnessClassById = async (id: number): Promise<FitnessClassDto> => {
  const response = await apiClient.get<FitnessClassDto>(`/api/v1/admin/fitness-classes/${id}`);
  return response.data;
};

export const createFitnessClass = async (request: FitnessClassDto): Promise<FitnessClassDto> => {
  const response = await apiClient.post<FitnessClassDto>('/api/v1/admin/fitness-classes', request);
  return response.data;
};

export const updateFitnessClass = async (id: number, request: FitnessClassDto): Promise<FitnessClassDto> => {
  const response = await apiClient.put<FitnessClassDto>(`/api/v1/admin/fitness-classes/${id}`, request);
  return response.data;
};

