// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { BookingDto, CreateBookingRequest } from '@/types/booking';

export const createBooking = async (request: CreateBookingRequest): Promise<BookingDto> => {
  const response = await apiClient.post<BookingDto>('/api/v1/bookings', request);
  return response.data;
};

export const getMemberBookings = async (): Promise<BookingDto[]> => {
  const response = await apiClient.get<BookingDto[]>('/api/v1/bookings');
  return response.data;
};

export const cancelBooking = async (bookingId: number): Promise<BookingDto> => {
  const response = await apiClient.put<BookingDto>(`/api/v1/bookings/${bookingId}/cancel`);
  return response.data;
};

export const getAllBookings = async (): Promise<BookingDto[]> => {
  const response = await apiClient.get<BookingDto[]>('/api/v1/admin/bookings');
  return response.data;
};

export const getBookingById = async (bookingId: number): Promise<BookingDto> => {
  const response = await apiClient.get<BookingDto>(`/api/v1/admin/bookings/${bookingId}`);
  return response.data;
};

