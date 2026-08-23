// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { MemberSubscriptionDto, MembershipPlanDto } from '@/types/membership';

export const getActiveMembershipPlans = async (): Promise<MembershipPlanDto[]> => {
  const response = await apiClient.get<MembershipPlanDto[]>('/api/v1/membership-plans');
  return response.data;
};

export const getMembershipPlanById = async (id: number): Promise<MembershipPlanDto> => {
  const response = await apiClient.get<MembershipPlanDto>(`/api/v1/membership-plans/${id}`);
  return response.data;
};

export const getMemberSubscriptions = async (): Promise<MemberSubscriptionDto[]> => {
  const response = await apiClient.get<MemberSubscriptionDto[]>('/api/v1/member-subscriptions');
  return response.data;
};

export const getMemberSubscriptionById = async (id: number): Promise<MemberSubscriptionDto> => {
  const response = await apiClient.get<MemberSubscriptionDto>(`/api/v1/member-subscriptions/${id}`);
  return response.data;
};

export const createMemberSubscription = async (request: unknown): Promise<MemberSubscriptionDto> => {
  const response = await apiClient.post<MemberSubscriptionDto>('/api/v1/member-subscriptions', request);
  return response.data;
};

export const cancelMemberSubscription = async (id: number): Promise<MemberSubscriptionDto> => {
  const response = await apiClient.put<MemberSubscriptionDto>(`/api/v1/member-subscriptions/${id}/cancel`);
  return response.data;
};

export const getAllMembershipPlans = async (): Promise<MembershipPlanDto[]> => {
  const response = await apiClient.get<MembershipPlanDto[]>('/api/v1/admin/membership-plans');
  return response.data;
};

export const adminGetMembershipPlanById = async (id: number): Promise<MembershipPlanDto> => {
  const response = await apiClient.get<MembershipPlanDto>(`/api/v1/admin/membership-plans/${id}`);
  return response.data;
};

export const createMembershipPlan = async (request: MembershipPlanDto): Promise<MembershipPlanDto> => {
  const response = await apiClient.post<MembershipPlanDto>('/api/v1/admin/membership-plans', request);
  return response.data;
};

export const updateMembershipPlan = async (id: number, request: MembershipPlanDto): Promise<MembershipPlanDto> => {
  const response = await apiClient.put<MembershipPlanDto>(`/api/v1/admin/membership-plans/${id}`, request);
  return response.data;
};

export const deleteMembershipPlan = async (id: number): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/membership-plans/${id}`);
};

