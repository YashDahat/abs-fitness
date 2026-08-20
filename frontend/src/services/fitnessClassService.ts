// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { FitnessClassDto } from '@/types/fitnessClass';

export const getAllFitnessClasses = async (): Promise<FitnessClassDto[]> => {
  const response = await apiClient.get<FitnessClassDto[]>('/api/v1/classes');
  return response.data;
};

export const getFitnessClassById = async (id: string): Promise<FitnessClassDto> => {
  const response = await apiClient.get<FitnessClassDto>(`/api/v1/classes/${id}`);
  return response.data;
};

export const createFitnessClass = async (request: FitnessClassDto): Promise<FitnessClassDto> => {
  const response = await apiClient.post<FitnessClassDto>('/api/v1/admin/classes', request);
  return response.data;
};

export const adminGetAllFitnessClasses = async (): Promise<FitnessClassDto[]> => {
  const response = await apiClient.get<FitnessClassDto[]>('/api/v1/admin/classes');
  return response.data;
};

export const adminGetFitnessClassById = async (id: string): Promise<FitnessClassDto> => {
  const response = await apiClient.get<FitnessClassDto>(`/api/v1/admin/classes/${id}`);
  return response.data;
};

export const updateFitnessClass = async (id: string, request: FitnessClassDto): Promise<FitnessClassDto> => {
  const response = await apiClient.put<FitnessClassDto>(`/api/v1/admin/classes/${id}`, request);
  return response.data;
};

export const deleteFitnessClass = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/classes/${id}`);
};

