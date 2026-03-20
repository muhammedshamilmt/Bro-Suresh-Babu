import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { logout } from "@/lib/auth";
import { useEnquiries, useUpdateEnquiryStatus, useDeleteEnquiry } from "@/hooks/useEnquiries";
import { useBlogs, useDeleteBlog } from "@/hooks/useBlogs";
import type { Enquiry, BlogPost } from "@/lib/api";
import {
  LayoutDashboard, FileText, MessageSquare, Plus, Search, Bell, Settings, LogOut,
  Eye, Pencil, Trash2, Calendar, Tag, User, Mail, Phone, Clock, CheckCircle2,
  XCircle, AlertCircle, TrendingUp, Users, BookOpen, Inbox, Download, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "blogs" | "enquiries";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig = {
  blog: {
    published: { label: "Published", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    draft: { label: "Draft", color: "bg-amber-100 text-amber-700 border-amber-200" },
    scheduled: { label: "Scheduled", color: "bg-blue-100 text-blue-700 border-blue-200" },
  },
  enquiry: {
    new: { label: "New", color: "bg-violet-100 text-violet-700 border-violet-200", icon: AlertCircle },
    read: { label: "Read", color: "bg-sky-100 text-sky-700 border-sky-200", icon: Eye },
    replied: { label: "Replied", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
    closed: { label: "Closed", color: "bg-slate-100 text-slate-500 border-slate-200", icon: XCircle },
  },
};

const STAT_META = [
  { label: "Total Posts", icon: BookOpen, color: "from-blue-500 to-blue-600" },
  { label: "Total Enquiries", icon: Inbox, color: "from-violet-500 to-violet-600" },
  { label: "Total Views", icon: TrendingUp, color: "from-amber-500 to-orange-500" },
  { label: "New Enquiries", icon: Users, color: "from-emerald-500 to-teal-500" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ stat, index }: { stat: { label: string; value: string; change: string; icon: React.ElementType; color: string }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl p-6 shadow-soft border border-border flex items-center gap-5"
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md flex-shrink-0`}>
        <stat.icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
        <p className="text-2xl font-bold text-foreground leading-tight">{stat.value}</p>
        <p className="text-xs text-emerald-600 font-medium mt-0.5">{stat.change}</p>
      </div>
    </motion.div>
  );
}

function BlogStatusBadge({ status }: { status: BlogPost["status"] }) {
  const cfg = statusConfig.blog[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

function EnquiryStatusBadge({ status }: { status: Enquiry["status"] }) {
  const cfg = statusConfig.enquiry[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.color}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

// ─── Blogs Tab ────────────────────────────────────────────────────────────────

function BlogsTab() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | BlogPost["status"]>("all");

  const { data: blogsData, isLoading, isError } = useBlogs();
  const blogs = blogsData?.data ?? [];
  const deleteBlog = useDeleteBlog();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    await deleteBlog.mutateAsync(id);
  };

  const filtered = blogs.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || b.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white border-border rounded-xl h-10"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "published", "draft", "scheduled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                filter === f
                  ? "bg-blue-dark text-white shadow-sm"
                  : "bg-white border border-border text-muted-foreground hover:border-blue-dark/40 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <Button
          onClick={() => navigate("/dashboard/blog/new")}
          className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2 h-10 px-4 shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Post
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Post</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-4 hidden md:table-cell">Category</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-4 hidden lg:table-cell">Author</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-4 hidden sm:table-cell">Date</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-4">Status</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4 hidden lg:table-cell">Views</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading && Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-muted flex-shrink-0" /><div className="h-4 bg-muted rounded w-48" /></div></td>
                  <td className="px-4 py-4 hidden md:table-cell"><div className="h-5 bg-muted rounded-full w-24" /></td>
                  <td className="px-4 py-4 hidden lg:table-cell"><div className="h-4 bg-muted rounded w-28" /></td>
                  <td className="px-4 py-4 hidden sm:table-cell"><div className="h-4 bg-muted rounded w-20" /></td>
                  <td className="px-4 py-4"><div className="h-5 bg-muted rounded-full w-16" /></td>
                  <td className="px-6 py-4 hidden lg:table-cell"><div className="h-4 bg-muted rounded w-12 ml-auto" /></td>
                  <td className="px-6 py-4"><div className="h-4 bg-muted rounded w-16 ml-auto" /></td>
                </tr>
              ))}
              {isError && (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-destructive text-sm">
                  Failed to load blog posts. Check your API connection.
                </td></tr>
              )}
              {!isLoading && !isError && filtered.map((post, i) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-muted/20 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={post.coverImage} alt="" className="w-10 h-10 rounded-xl object-cover flex-shrink-0 shadow-sm" />
                      <p className="font-semibold text-foreground text-sm line-clamp-2 max-w-xs">{post.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-xs bg-accent/10 text-accent font-medium px-2.5 py-1 rounded-full">{post.category}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-3.5 h-3.5" /> {post.author}
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" /> {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-4"><BlogStatusBadge status={post.status} /></td>
                  <td className="px-6 py-4 text-right hidden lg:table-cell">
                    <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                      <Eye className="w-3.5 h-3.5" /> {post.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => navigate(`/blog/${post.id}`)}
                        className="p-1.5 rounded-lg hover:bg-sky-50 hover:text-sky-600 text-muted-foreground transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/dashboard/blog/${post.id}/edit`)}
                        className="p-1.5 rounded-lg hover:bg-amber-50 hover:text-amber-600 text-muted-foreground transition-colors" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deleteBlog.isPending}
                        className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-muted-foreground transition-colors disabled:opacity-50" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No posts found</p>
          </div>
        )}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-muted/20">
          <span>Showing {filtered.length} of {blogs.length} posts</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === 1 ? "bg-blue-dark text-white" : "hover:bg-muted"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Enquiries Tab (live from MongoDB via React Query) ────────────────────────

function EnquiriesTab() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filter, setFilter] = useState<"all" | Enquiry["status"]>("all");
  const [selected, setSelected] = useState<Enquiry | null>(null);

  // Debounce search input 400ms
  const searchTimer = useRef<ReturnType<typeof setTimeout>>();
  const handleSearch = (val: string) => {
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setDebouncedSearch(val), 400);
  };

  const { data, isLoading, isFetching, isError, refetch } = useEnquiries({
    status: filter,
    search: debouncedSearch,
  });

  const updateStatus = useUpdateEnquiryStatus();
  const deleteEnquiry = useDeleteEnquiry();

  const enquiries = data?.data ?? [];
  const total = data?.total ?? 0;

  const handleStatusChange = async (id: string, status: Enquiry["status"]) => {
    await updateStatus.mutateAsync({ id, status });
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    await deleteEnquiry.mutateAsync(id);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search enquiries..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 bg-white border-border rounded-xl h-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "new", "read", "replied", "closed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                filter === f
                  ? "bg-blue-dark text-white shadow-sm"
                  : "bg-white border border-border text-muted-foreground hover:border-blue-dark/40 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-xl gap-2 h-10 px-4 border-border"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
        <Button variant="outline" className="rounded-xl gap-2 h-10 px-4 border-border">
          <Download className="w-4 h-4" /> Export
        </Button>
      </div>

      {/* Fetching indicator */}
      {isFetching && !isLoading && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Syncing with database...
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        {/* List */}
        <div className={`${selected ? "lg:col-span-3" : "lg:col-span-5"} bg-white rounded-2xl border border-border shadow-soft overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Sender</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-4 hidden md:table-cell">Type</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-4 hidden sm:table-cell">Date</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-4">Status</th>
                  <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading && Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-muted rounded w-32 mb-1" /><div className="h-3 bg-muted rounded w-24" /></td>
                    <td className="px-4 py-4 hidden md:table-cell"><div className="h-5 bg-muted rounded-full w-28" /></td>
                    <td className="px-4 py-4 hidden sm:table-cell"><div className="h-4 bg-muted rounded w-20" /></td>
                    <td className="px-4 py-4"><div className="h-5 bg-muted rounded-full w-16" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-muted rounded w-16 ml-auto" /></td>
                  </tr>
                ))}
                {isError && (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-destructive text-sm">
                    Failed to load enquiries. Check your API connection.
                  </td></tr>
                )}
                {!isLoading && !isError && enquiries.map((enq, i) => (
                  <motion.tr
                    key={enq.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelected(selected?.id === enq.id ? null : enq)}
                    className={`cursor-pointer transition-colors group ${
                      selected?.id === enq.id ? "bg-blue-dark/5 border-l-2 border-l-blue-dark" : "hover:bg-muted/20"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className={`font-semibold text-sm ${enq.status === "new" ? "text-foreground" : "text-muted-foreground"}`}>
                          {enq.name}
                          {enq.status === "new" && <span className="ml-2 w-2 h-2 rounded-full bg-violet-500 inline-block" />}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{enq.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs bg-accent/10 text-accent font-medium px-2.5 py-1 rounded-full">{enq.type}</span>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(enq.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    </td>
                    <td className="px-4 py-4"><EnquiryStatusBadge status={enq.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleStatusChange(enq.id, "replied")}
                          className="p-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 text-muted-foreground transition-colors" title="Mark Replied"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-muted-foreground transition-colors" title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {!isLoading && !isError && enquiries.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No enquiries found</p>
            </div>
          )}
          <div className="px-6 py-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-muted/20">
            <span>Showing {enquiries.length} of {total} enquiries</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((p) => (
                <button key={p} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === 1 ? "bg-blue-dark text-white" : "hover:bg-muted"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-soft p-6 h-fit"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-bold text-foreground text-lg">{selected.name}</h3>
                  <p className="text-sm text-muted-foreground">{selected.type}</p>
                </div>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2.5 text-sm">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href={`mailto:${selected.email}`} className="text-blue-dark hover:underline">{selected.email}</a>
                </div>
                {selected.phone && (
                  <div className="flex items-center gap-2.5 text-sm">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{selected.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5 text-sm">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">
                    {new Date(selected.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <Tag className="w-4 h-4 text-primary flex-shrink-0" />
                  <EnquiryStatusBadge status={selected.status} />
                </div>
              </div>

              <div className="bg-muted/40 rounded-xl p-4 mb-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Message</p>
                <p className="text-sm text-foreground leading-relaxed">{selected.message}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleStatusChange(selected.id, "replied")}
                  disabled={updateStatus.isPending}
                  className="flex-1 bg-blue-dark hover:bg-blue-dark/90 text-white rounded-xl gap-2 text-sm"
                >
                  <Mail className="w-4 h-4" /> Mark Replied
                </Button>
                <Button
                  onClick={() => handleStatusChange(selected.id, "closed")}
                  disabled={updateStatus.isPending}
                  variant="outline"
                  className="rounded-xl border-border text-sm gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Close
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("blogs");

  // Live counts for tab badges and stats
  const { data: blogsData } = useBlogs();
  const blogCount = blogsData?.total ?? 0;
  const totalViews = blogsData?.data?.reduce((sum, b) => sum + (b.views ?? 0), 0) ?? 0;
  const { data: allEnquiries } = useEnquiries({});
  const { data: newData } = useEnquiries({ status: "new" });
  const newCount = newData?.total ?? 0;
  const totalEnquiries = allEnquiries?.total ?? 0;

  const liveStats = [
    { ...STAT_META[0], value: String(blogCount), change: "from database" },
    { ...STAT_META[1], value: String(totalEnquiries), change: "all time" },
    { ...STAT_META[2], value: totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}K` : String(totalViews), change: "total across posts" },
    { ...STAT_META[3], value: String(newCount), change: "awaiting response" },
  ];

  const tabs: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: "blogs", label: "Blog Posts", icon: FileText, count: blogCount },
    { id: "enquiries", label: "Enquiries", icon: MessageSquare, count: newCount },
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      {/* Top Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-dark to-primary flex items-center justify-center shadow-sm">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-foreground text-sm leading-tight">Ministry Dashboard</p>
                <p className="text-xs text-muted-foreground">Bro. Suresh Babu Ministries</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <nav className="flex items-center gap-1 bg-muted/50 rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                      activeTab === tab.id
                        ? tab.id === "enquiries" ? "bg-violet-100 text-violet-700" : "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors hidden sm:flex">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-border mx-1 hidden sm:block" />
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-dark to-primary flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  SB
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-foreground leading-tight">Admin</p>
                  <p className="text-xs text-muted-foreground">Super Admin</p>
                </div>
              </div>
              <button onClick={handleLogout} className="p-2 rounded-xl hover:bg-red-50 hover:text-red-500 text-muted-foreground transition-colors hidden sm:flex" title="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <motion.h1
            key={activeTab}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-foreground"
          >
            {activeTab === "blogs" ? "Blog Management" : "Enquiries & Messages"}
          </motion.h1>
          <p className="text-muted-foreground text-sm mt-1">
            {activeTab === "blogs"
              ? "Create, edit, and manage all blog posts and articles."
              : "View and respond to all incoming enquiries and contact requests."}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {liveStats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "blogs" ? <BlogsTab key="blogs" /> : <EnquiriesTab key="enquiries" />}
        </AnimatePresence>
      </main>
    </div>
  );
}
