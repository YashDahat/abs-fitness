// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

import type { SubscriptionStatus } from '@/types/subscription';

export interface MembershipPlanDto {
  id: number;
  name: string;
  description: string;
  durationInMonths: number;
  price: number;
}

export interface MemberSubscription {
  id: number;
  userId: number;
  membershipPlan: MembershipPlan;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MembershipPlan {
  id: number;
  name: string;
  description: string;
  durationMonths: number;
  price: number;
}

