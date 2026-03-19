import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogsApi, type BlogPost, type BlogPayload } from "@/lib/api";

// ── Query key factory ─────────────────────────────────────────────────────────
export const blogKeys = {
  all: ["blogs"] as const,
  list: (filters: object) => ["blogs", "list", filters] as const,
  detail: (id: string) => ["blogs", "detail", id] as const,
};

// ── List — caching + background refetch + deduplication ───────────────────────
export function useBlogs(
  filters: { status?: string; category?: string; search?: string; page?: number; limit?: number } = {}
) {
  return useQuery({
    queryKey: blogKeys.list(filters),
    queryFn: () => blogsApi.list(filters),
    staleTime: 60_000,          // fresh for 60s — blog lists change less often
    gcTime: 10 * 60_000,        // keep in cache 10 min
    refetchOnWindowFocus: true,
    placeholderData: (prev) => prev, // keep previous page while loading next
  });
}

// ── Single post ───────────────────────────────────────────────────────────────
export function useBlogPost(id: string | undefined) {
  return useQuery({
    queryKey: blogKeys.detail(id ?? ""),
    queryFn: () => blogsApi.get(id!),
    enabled: !!id,
    staleTime: 5 * 60_000,
    gcTime: 15 * 60_000,
  });
}

// ── Create ────────────────────────────────────────────────────────────────────
export function useCreateBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: blogsApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: blogKeys.all }),
  });
}

// ── Update ────────────────────────────────────────────────────────────────────
export function useUpdateBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<BlogPayload> }) =>
      blogsApi.update(id, payload),
    // Optimistic update for instant UI feedback
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries({ queryKey: blogKeys.all });
      const snapshot = qc.getQueriesData({ queryKey: blogKeys.all });
      qc.setQueriesData({ queryKey: blogKeys.all }, (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((p: BlogPost) => (p.id === id ? { ...p, ...payload } : p)),
        };
      });
      return { snapshot };
    },
    onError: (_err, _vars, ctx) => {
      ctx?.snapshot.forEach(([key, val]) => qc.setQueryData(key, val));
    },
    onSettled: (_data, _err, { id }) => {
      qc.invalidateQueries({ queryKey: blogKeys.all });
      qc.invalidateQueries({ queryKey: blogKeys.detail(id) });
    },
  });
}

// ── Delete ────────────────────────────────────────────────────────────────────
export function useDeleteBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: blogsApi.remove,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: blogKeys.all });
      const snapshot = qc.getQueriesData({ queryKey: blogKeys.all });
      qc.setQueriesData({ queryKey: blogKeys.all }, (old: any) => {
        if (!old?.data) return old;
        return { ...old, data: old.data.filter((p: BlogPost) => p.id !== id), total: old.total - 1 };
      });
      return { snapshot };
    },
    onError: (_err, _vars, ctx) => {
      ctx?.snapshot.forEach(([key, val]) => qc.setQueryData(key, val));
    },
    onSettled: () => qc.invalidateQueries({ queryKey: blogKeys.all }),
  });
}
