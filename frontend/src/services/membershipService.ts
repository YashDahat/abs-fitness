// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { MemberSubscription, MembershipPlanDto } from '@/types/membership';
import type { PaymentOrderResponse } from '@/types/payment';
import type { VerifyPaymentRequest } from '@/types/verify';

export const getAllMembershipPlans = async (): Promise<MembershipPlanDto[]> => {
  const response = await apiClient.get<MembershipPlanDto[]>('/api/v1/membership-plans');
  return response.data;
};

export const getMembershipPlanById = async (id: number): Promise<MembershipPlanDto> => {
  const response = await apiClient.get<MembershipPlanDto>(`/api/v1/membership-plans/${id}`);
  return response.data;
};

export const createSubscription = async (request: unknown): Promise<PaymentOrderResponse> => {
  const response = await apiClient.post<PaymentOrderResponse>('/api/v1/member/subscriptions', request);
  return response.data;
};

export const getMemberSubscriptions = async (): Promise<MemberSubscription[]> => {
  const response = await apiClient.get<MemberSubscription[]>('/api/v1/member/subscriptions');
  return response.data;
};

export const verifySubscriptionPayment = async (request: VerifyPaymentRequest): Promise<void> => {
  await apiClient.post<void>('/api/v1/member/subscriptions/verify-payment', request);
};

export const createMembershipPlan = async (request: MembershipPlanDto): Promise<MembershipPlanDto> => {
  const response = await apiClient.post<MembershipPlanDto>('/api/v1/admin/membership-plans', request);
  return response.data;
};

export const adminGetAllMembershipPlans = async (): Promise<MembershipPlanDto[]> => {
  const response = await apiClient.get<MembershipPlanDto[]>('/api/v1/admin/membership-plans');
  return response.data;
};

export const adminGetMembershipPlanById = async (id: number): Promise<MembershipPlanDto> => {
  const response = await apiClient.get<MembershipPlanDto>(`/api/v1/admin/membership-plans/${id}`);
  return response.data;
};

export const updateMembershipPlan = async (id: number, request: MembershipPlanDto): Promise<MembershipPlanDto> => {
  const response = await apiClient.put<MembershipPlanDto>(`/api/v1/admin/membership-plans/${id}`, request);
  return response.data;
};

export const deleteMembershipPlan = async (id: number): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/membership-plans/${id}`);
};

