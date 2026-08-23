// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

import type { SubscriptionStatus } from '@/types/subscription';

export interface MembershipPlanDto {
  id: number;
  name: string;
  description: string;
  price: number;
  durationInMonths: number;
  isActive: boolean;
}

export interface MemberSubscriptionDto {
  id: number;
  userId: number;
  membershipPlan: MembershipPlanDto;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
}

