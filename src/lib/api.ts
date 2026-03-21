// Typed fetch wrapper — all requests go through here
const BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

// ─── Shared ───────────────────────────────────────────────────────────────────

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── Enquiries ────────────────────────────────────────────────────────────────

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  status: "new" | "read" | "replied" | "closed";
  createdAt: string;
}

export interface EnquiriesResponse {
  data: Enquiry[];
  total: number;
  page: number;
  limit: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
}

export const enquiriesApi = {
  list: (params?: { status?: string; search?: string; page?: number }) => {
    const qs = new URLSearchParams();
    if (params?.status && params.status !== "all") qs.set("status", params.status);
    if (params?.search) qs.set("search", params.search);
    if (params?.page) qs.set("page", String(params.page));
    return request<EnquiriesResponse>(`/enquiries?${qs}`);
  },
  create: (payload: ContactPayload) =>
    request<Enquiry>("/enquiries", { method: "POST", body: JSON.stringify(payload) }),
  updateStatus: (id: string, status: Enquiry["status"]) =>
    request<Enquiry>(`/enquiries/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
  remove: (id: string) =>
    request<{ success: boolean }>(`/enquiries/${id}`, { method: "DELETE" }),
};

// ─── Blogs ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  coverImage: string;
  status: "draft" | "published" | "scheduled";
  scheduledDate: string | null;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogsResponse {
  data: BlogPost[];
  total: number;
  page: number;
  limit: number;
}

export interface BlogPayload {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  coverImage: string;
  status: "draft" | "published" | "scheduled";
  scheduledDate?: string;
}

export const blogsApi = {
  list: (params?: { status?: string; category?: string; search?: string; page?: number; limit?: number }) => {
    const qs = new URLSearchParams();
    if (params?.status && params.status !== "all") qs.set("status", params.status);
    if (params?.category && params.category !== "all") qs.set("category", params.category);
    if (params?.search) qs.set("search", params.search);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.limit) qs.set("limit", String(params.limit));
    return request<BlogsResponse>(`/blogs?${qs}`);
  },
  get: (id: string) => request<BlogPost>(`/blogs/${id}`),
  create: (payload: BlogPayload) =>
    request<BlogPost>("/blogs", { method: "POST", body: JSON.stringify(payload) }),
  update: (id: string, payload: Partial<BlogPayload>) =>
    request<BlogPost>(`/blogs/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  remove: (id: string) =>
    request<{ success: boolean }>(`/blogs/${id}`, { method: "DELETE" }),
  incrementViews: (id: string) =>
    request<{ success: boolean }>(`/blogs/${id}/views`, { method: "PATCH" }),
};

// ─── Events ───────────────────────────────────────────────────────────────────

export interface EventSpeaker {
  name: string;
  role: string;
  image: string;
}

export interface EventScheduleDay {
  day: string;
  sessions: string[];
}

export interface Event {
  id: string;
  title: string;
  type: string;
  tag: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  longDescription: string;
  status: "draft" | "published" | "archived";
  registrationOpen: boolean;
  color: string;
  showHighlights: boolean;
  highlights: string[];
  showSpeakers: boolean;
  speakers: EventSpeaker[];
  showSchedule: boolean;
  schedule: EventScheduleDay[];
  createdAt: string;
  updatedAt: string;
}

export interface EventsResponse {
  data: Event[];
  total: number;
  page: number;
  limit: number;
}

export interface EventPayload {
  title: string;
  type: string;
  tag: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  longDescription: string;
  status: "draft" | "published" | "archived";
  registrationOpen: boolean;
  color: string;
  showHighlights: boolean;
  highlights: string[];
  showSpeakers: boolean;
  speakers: EventSpeaker[];
  showSchedule: boolean;
  schedule: EventScheduleDay[];
}

export interface EventRegistration {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  church: string;
  attendees: string;
  attendance: "in-person" | "online";
  message: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}

export interface EventRegistrationsResponse {
  data: EventRegistration[];
  total: number;
  page: number;
  limit: number;
}

export const eventsApi = {
  list: (params?: { status?: string; type?: string; search?: string; page?: number; limit?: number }) => {
    const qs = new URLSearchParams();
    if (params?.status && params.status !== "all") qs.set("status", params.status);
    if (params?.type && params.type !== "all") qs.set("type", params.type);
    if (params?.search) qs.set("search", params.search);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.limit) qs.set("limit", String(params.limit));
    return request<EventsResponse>(`/events?${qs}`);
  },
  get: (id: string) => request<Event>(`/events/${id}`),
  create: (payload: EventPayload) =>
    request<Event>("/events", { method: "POST", body: JSON.stringify(payload) }),
  update: (id: string, payload: Partial<EventPayload>) =>
    request<Event>(`/events/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  remove: (id: string) =>
    request<{ success: boolean }>(`/events/${id}`, { method: "DELETE" }),
  getRegistrations: (eventId: string, params?: { search?: string; status?: string; page?: number }) => {
    const qs = new URLSearchParams();
    if (params?.search) qs.set("search", params.search);
    if (params?.status && params.status !== "all") qs.set("status", params.status);
    if (params?.page) qs.set("page", String(params.page));
    return request<EventRegistrationsResponse>(`/events/${eventId}/registrations?${qs}`);
  },
  updateRegistrationStatus: (regId: string, status: EventRegistration["status"]) =>
    request<EventRegistration>(`/events/registrations/${regId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  register: (eventId: string, payload: {
    name: string; email: string; phone?: string; city: string;
    church?: string; attendees: string; attendance: "in-person" | "online"; message?: string;
  }) =>
    request<EventRegistration>(`/events/${eventId}/registrations`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
