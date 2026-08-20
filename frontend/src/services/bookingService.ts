// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { BookingDto, CreateBookingRequest } from '@/types/booking';

export const createBooking = async (request: CreateBookingRequest): Promise<BookingDto> => {
  const response = await apiClient.post<BookingDto>('/api/v1/bookings', request);
  return response.data;
};

export const getMemberBookings = async (): Promise<BookingDto[]> => {
  const response = await apiClient.get<BookingDto[]>('/api/v1/bookings/me');
  return response.data;
};

export const getBookingById = async (id: string): Promise<BookingDto> => {
  const response = await apiClient.get<BookingDto>(`/api/v1/bookings/${id}`);
  return response.data;
};

export const cancelBooking = async (id: string): Promise<BookingDto> => {
  const response = await apiClient.delete<BookingDto>(`/api/v1/bookings/${id}`);
  return response.data;
};

export const getAllBookings = async (): Promise<BookingDto[]> => {
  const response = await apiClient.get<BookingDto[]>('/api/v1/admin/bookings');
  return response.data;
};

export const adminGetBookingById = async (id: string): Promise<BookingDto> => {
  const response = await apiClient.get<BookingDto>(`/api/v1/admin/bookings/${id}`);
  return response.data;
};

export const adminCancelBooking = async (id: string): Promise<BookingDto> => {
  const response = await apiClient.delete<BookingDto>(`/api/v1/admin/bookings/${id}`);
  return response.data;
};

