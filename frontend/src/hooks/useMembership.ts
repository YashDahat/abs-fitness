import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { MemberSubscriptionDto, MembershipPlanDto } from '@/types/membership';
import {
  createMembershipPlan,
  createSubscription,
  deleteMembershipPlan,
  getAllActiveMembershipPlans,
  getAllMembershipPlans,
  getMembershipPlanById,
  updateMembershipPlan,
} from '@/services/membershipService';
import type { CreateSubscriptionRequest } from '@/types/subscription';

export function useMembershipPlans(): { data: MembershipPlanDto[] | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['membershipPlans'],
    queryFn: getAllActiveMembershipPlans,
  });
  return { data, isLoading, isError, error };
}

export function useMembershipPlan(id: number): { data: MembershipPlanDto | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['membershipPlan', id],
    queryFn: () => getMembershipPlanById(id),
    enabled: !!id,
  });
  return { data, isLoading, isError, error };
}

export function useCreateSubscription(): {
  mutate: (vars: CreateSubscriptionRequest) => void;
  mutateAsync: (vars: CreateSubscriptionRequest) => Promise<MemberSubscriptionDto>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySubscriptions'] });
    },
  });
  return { mutate, mutateAsync, isPending, isError, error };
}

export function useAdminMembershipPlans(): { data: MembershipPlanDto[] | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminMembershipPlans'],
    queryFn: getAllMembershipPlans,
  });
  return { data, isLoading, isError, error };
}

export function useAdminMembershipPlan(id: number): { data: MembershipPlanDto | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminMembershipPlan', id],
    queryFn: () => getMembershipPlanById(id),
    enabled: !!id,
  });
  return { data, isLoading, isError, error };
}

export function useCreateAdminMembershipPlan(): {
  mutate: (request: MembershipPlanDto) => void;
  mutateAsync: (request: MembershipPlanDto) => Promise<MembershipPlanDto>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: createMembershipPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMembershipPlans'] });
      queryClient.invalidateQueries({ queryKey: ['membershipPlans'] });
    },
  });
  return { mutate, mutateAsync, isPending, isError, error };
}

export function useUpdateAdminMembershipPlan(): {
  mutate: (vars: { id: number; request: MembershipPlanDto }) => void;
  mutateAsync: (vars: { id: number; request: MembershipPlanDto }) => Promise<MembershipPlanDto>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: ({ id, request }: { id: number; request: MembershipPlanDto }) => updateMembershipPlan(id, request),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['adminMembershipPlans'] });
      queryClient.invalidateQueries({ queryKey: ['membershipPlans'] });
      queryClient.invalidateQueries({ queryKey: ['adminMembershipPlan', id] });
      queryClient.invalidateQueries({ queryKey: ['membershipPlan', id] });
    },
  });
  return { mutate, mutateAsync, isPending, isError, error };
}

export function useDeleteAdminMembershipPlan(): {
  mutate: (id: number) => void;
  mutateAsync: (id: number) => Promise<void>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: deleteMembershipPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMembershipPlans'] });
      queryClient.invalidateQueries({ queryKey: ['membershipPlans'] });
    },
  });
  return { mutate, mutateAsync, isPending, isError, error };
}