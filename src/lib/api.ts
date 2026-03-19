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
