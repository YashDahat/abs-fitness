import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createBooking,
  getMyBookings,
  getAllBookings,
} from '@/services/bookingService';
import { getAllTrainers, getTrainerById, getAllGymClasses, getGymClassById, cancelBooking } from '@/services/publicService';
import type { BookingDto, CreateBookingRequest } from '@/types/booking';
import type { TrainerDto } from '@/types/trainer';
import type { GymClassDto } from '@/types/gym';

export function useTrainers(): { data: TrainerDto[] | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['trainers'],
    queryFn: getAllTrainers,
  });
  return { data, isLoading, isError, error };
}

export function useTrainer(trainerId: string): { data: TrainerDto | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['trainer', trainerId],
    queryFn: () => getTrainerById(trainerId),
    enabled: !!trainerId,
  });
  return { data, isLoading, isError, error };
}

export function useGymClasses(): { data: GymClassDto[] | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['gymClasses'],
    queryFn: getAllGymClasses,
  });
  return { data, isLoading, isError, error };
}

export function useGymClass(classId: number): { data: GymClassDto | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['gymClass', classId],
    queryFn: () => getGymClassById(classId),
    enabled: !!classId,
  });
  return { data, isLoading, isError, error };
}

export function useCreateBooking(): { mutate: (vars: CreateBookingRequest) => void; mutateAsync: (vars: CreateBookingRequest) => Promise<BookingDto>; isPending: boolean; isError: boolean; error: Error | null } {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
      queryClient.invalidateQueries({ queryKey: ['gymClasses'] });
    },
  });
  return { mutate, mutateAsync, isPending, isError, error };
}

export function useCancelBooking(): { mutate: (vars: number) => void; mutateAsync: (vars: number) => Promise<void>; isPending: boolean; isError: boolean; error: Error | null } {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
      queryClient.invalidateQueries({ queryKey: ['gymClasses'] });
    },
  });
  return { mutate, mutateAsync, isPending, isError, error };
}

export function useMyBookings(): { data: BookingDto[] | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['myBookings'],
    queryFn: getMyBookings,
  });
  return { data, isLoading, isError, error };
}

export function useAdminAllBookings(): { data: BookingDto[] | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminAllBookings'],
    queryFn: getAllBookings,
  });
  return { data, isLoading, isError, error };
}