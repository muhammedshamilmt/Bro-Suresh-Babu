import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { enquiriesApi, type Enquiry } from "@/lib/api";

// ── Query key factory — enables precise cache invalidation ────────────────────
export const enquiryKeys = {
  all: ["enquiries"] as const,
  list: (filters: object) => ["enquiries", "list", filters] as const,
};

// ── Fetch list — with automatic caching, background refetch, deduplication ────
export function useEnquiries(filters: { status?: string; search?: string; page?: number } = {}) {
  return useQuery({
    queryKey: enquiryKeys.list(filters),
    queryFn: () => enquiriesApi.list(filters),
    staleTime: 30_000,          // treat data as fresh for 30s → no redundant refetches
    gcTime: 5 * 60_000,         // keep in cache for 5 min after unmount
    refetchOnWindowFocus: true, // background refetch when user returns to tab
    refetchInterval: 60_000,    // poll every 60s for new enquiries
    placeholderData: (prev) => prev, // keep previous data while fetching next page
  });
}

// ── Submit contact form ───────────────────────────────────────────────────────
export function useSubmitEnquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: enquiriesApi.create,
    onSuccess: () => {
      // Invalidate all enquiry list queries so dashboard refreshes
      qc.invalidateQueries({ queryKey: enquiryKeys.all });
    },
  });
}

// ── Update status ─────────────────────────────────────────────────────────────
export function useUpdateEnquiryStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Enquiry["status"] }) =>
      enquiriesApi.updateStatus(id, status),
    // Optimistic update — instant UI feedback before server confirms
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: enquiryKeys.all });
      const snapshot = qc.getQueriesData({ queryKey: enquiryKeys.all });
      qc.setQueriesData({ queryKey: enquiryKeys.all }, (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((e: Enquiry) => (e.id === id ? { ...e, status } : e)),
        };
      });
      return { snapshot };
    },
    onError: (_err, _vars, ctx) => {
      // Roll back on failure
      ctx?.snapshot.forEach(([key, val]) => qc.setQueryData(key, val));
    },
    onSettled: () => qc.invalidateQueries({ queryKey: enquiryKeys.all }),
  });
}

// ── Delete enquiry ────────────────────────────────────────────────────────────
export function useDeleteEnquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: enquiriesApi.remove,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: enquiryKeys.all });
      const snapshot = qc.getQueriesData({ queryKey: enquiryKeys.all });
      qc.setQueriesData({ queryKey: enquiryKeys.all }, (old: any) => {
        if (!old?.data) return old;
        return { ...old, data: old.data.filter((e: Enquiry) => e.id !== id), total: old.total - 1 };
      });
      return { snapshot };
    },
    onError: (_err, _vars, ctx) => {
      ctx?.snapshot.forEach(([key, val]) => qc.setQueryData(key, val));
    },
    onSettled: () => qc.invalidateQueries({ queryKey: enquiryKeys.all }),
  });
}
