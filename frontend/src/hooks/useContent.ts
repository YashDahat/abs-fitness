import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  adminGetAllTestimonials,
  createTestimonial,
  deleteTestimonial,
  getAllEnquiries,
  getAllTestimonials,
  getTestimonialById,
  submitEnquiry,
  updateEnquiryStatus,
  updateTestimonial,
} from '@/services/contentService';
import type { TestimonialDto } from '@/types/testimonial';
import type { CreateEnquiryRequest, EnquiryDto } from '@/types/enquiry';

export function useTestimonials(): { data: TestimonialDto[] | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getAllTestimonials,
  });
  return { data, isLoading, isError, error };
}

export function useSubmitEnquiry(): {
  mutate: (request: CreateEnquiryRequest) => void;
  mutateAsync: (request: CreateEnquiryRequest) => Promise<EnquiryDto>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: submitEnquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });
  return { mutate, mutateAsync, isPending, isError, error };
}

export function useAdminTestimonials(): { data: TestimonialDto[] | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminTestimonials'],
    queryFn: adminGetAllTestimonials,
  });
  return { data, isLoading, isError, error };
}

export function useTestimonial(id: string): { data: TestimonialDto | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['testimonial', id],
    queryFn: () => getTestimonialById(id),
  });
  return { data, isLoading, isError, error };
}

export function useCreateTestimonial(): {
  mutate: (request: TestimonialDto) => void;
  mutateAsync: (request: TestimonialDto) => Promise<TestimonialDto>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTestimonials'] });
    },
  });
  return { mutate, mutateAsync, isPending, isError, error };
}

export function useUpdateTestimonial(): {
  mutate: (vars: { id: string; request: TestimonialDto }) => void;
  mutateAsync: (vars: { id: string; request: TestimonialDto }) => Promise<TestimonialDto>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: ({ id, request }: { id: string; request: TestimonialDto }) => updateTestimonial(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTestimonials'] });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
  return { mutate, mutateAsync, isPending, isError, error };
}

export function useDeleteTestimonial(): {
  mutate: (id: string) => void;
  mutateAsync: (id: string) => Promise<void>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTestimonials'] });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
  return { mutate, mutateAsync, isPending, isError, error };
}

export function useAllEnquiries(): { data: EnquiryDto[] | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['enquiries'],
    queryFn: getAllEnquiries,
  });
  return { data, isLoading, isError, error };
}

export function useUpdateEnquiryStatus(): {
  mutate: (id: string) => void;
  mutateAsync: (id: string) => Promise<EnquiryDto>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: updateEnquiryStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });
  return { mutate, mutateAsync, isPending, isError, error };
}