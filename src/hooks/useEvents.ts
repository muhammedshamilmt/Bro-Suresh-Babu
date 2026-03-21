import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventsApi, type Event, type EventPayload, type EventRegistration } from "@/lib/api";

// ── Query key factory ─────────────────────────────────────────────────────────
export const eventKeys = {
  all: ["events"] as const,
  list: (filters: object) => ["events", "list", filters] as const,
  detail: (id: string) => ["events", "detail", id] as const,
  registrations: (eventId: string, filters?: object) =>
    ["events", "registrations", eventId, filters ?? {}] as const,
};

// ── List ──────────────────────────────────────────────────────────────────────
export function useEvents(
  filters: { status?: string; type?: string; search?: string; page?: number; limit?: number } = {}
) {
  return useQuery({
    queryKey: eventKeys.list(filters),
    queryFn: () => eventsApi.list(filters),
    staleTime: 60_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: true,
    placeholderData: (prev) => prev,
  });
}

// ── Single event ──────────────────────────────────────────────────────────────
export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: eventKeys.detail(id ?? ""),
    queryFn: () => eventsApi.get(id!),
    enabled: !!id,
    staleTime: 5 * 60_000,
    gcTime: 15 * 60_000,
    refetchOnWindowFocus: false,
  });
}

// ── Public published events ───────────────────────────────────────────────────
export function usePublishedEvents(filters: { type?: string; search?: string; page?: number; limit?: number } = {}) {
  return useEvents({ ...filters, status: "published" });
}

// ── Create ────────────────────────────────────────────────────────────────────
export function useCreateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: eventsApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: eventKeys.all }),
  });
}

// ── Update ────────────────────────────────────────────────────────────────────
export function useUpdateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<EventPayload> }) =>
      eventsApi.update(id, payload),
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries({ queryKey: eventKeys.all });
      const snapshot = qc.getQueriesData({ queryKey: eventKeys.all });
      // Optimistic update on list caches
      qc.setQueriesData({ queryKey: eventKeys.all }, (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((e: Event) => (e.id === id ? { ...e, ...payload } : e)),
        };
      });
      // Optimistic update on detail cache
      qc.setQueryData(eventKeys.detail(id), (old: any) =>
        old ? { ...old, ...payload } : old
      );
      return { snapshot };
    },
    onError: (_err, _vars, ctx) => {
      ctx?.snapshot.forEach(([key, val]) => qc.setQueryData(key, val));
    },
    onSettled: (_data, _err, { id }) => {
      qc.invalidateQueries({ queryKey: eventKeys.all });
      qc.invalidateQueries({ queryKey: eventKeys.detail(id) });
    },
  });
}

// ── Delete ────────────────────────────────────────────────────────────────────
export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: eventsApi.remove,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: eventKeys.all });
      const snapshot = qc.getQueriesData({ queryKey: eventKeys.all });
      qc.setQueriesData({ queryKey: eventKeys.all }, (old: any) => {
        if (!old?.data) return old;
        return { ...old, data: old.data.filter((e: Event) => e.id !== id), total: old.total - 1 };
      });
      return { snapshot };
    },
    onError: (_err, _vars, ctx) => {
      ctx?.snapshot.forEach(([key, val]) => qc.setQueryData(key, val));
    },
    onSettled: () => qc.invalidateQueries({ queryKey: eventKeys.all }),
  });
}

// ── Registrations ─────────────────────────────────────────────────────────────
export function useEventRegistrations(
  eventId: string | undefined,
  filters: { search?: string; status?: string; page?: number } = {}
) {
  return useQuery({
    queryKey: eventKeys.registrations(eventId ?? "", filters),
    queryFn: () => eventsApi.getRegistrations(eventId!, filters),
    enabled: !!eventId,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: true,
    refetchInterval: 60_000, // background poll every 60s for live registrations
  });
}

// ── Update registration status ────────────────────────────────────────────────
export function useUpdateRegistrationStatus(eventId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ regId, status }: { regId: string; status: EventRegistration["status"] }) =>
      eventsApi.updateRegistrationStatus(regId, status),
    onMutate: async ({ regId, status }) => {
      await qc.cancelQueries({ queryKey: eventKeys.registrations(eventId) });
      const snapshot = qc.getQueriesData({ queryKey: eventKeys.registrations(eventId) });
      qc.setQueriesData({ queryKey: eventKeys.registrations(eventId) }, (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((r: EventRegistration) =>
            r.id === regId ? { ...r, status } : r
          ),
        };
      });
      return { snapshot };
    },
    onError: (_err, _vars, ctx) => {
      ctx?.snapshot.forEach(([key, val]) => qc.setQueryData(key, val));
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: eventKeys.registrations(eventId) });
    },
  });
}

// ── Register for event ────────────────────────────────────────────────────────
export function useRegisterForEvent(eventId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Parameters<typeof eventsApi.register>[1]) =>
      eventsApi.register(eventId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: eventKeys.registrations(eventId) });
    },
  });
}
