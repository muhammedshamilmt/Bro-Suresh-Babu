import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Save, Send, Plus, Trash2,
  Calendar, MapPin, Clock, Image, AlignLeft, Users,
  Sparkles, ListChecks, ToggleLeft, ToggleRight, GripVertical,
  Eye, Columns2, Monitor, CheckCircle2, Tag, Globe,
  ArrowRight, Heart, Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEvent, useCreateEvent, useUpdateEvent } from "@/hooks/useEvents";
import { useToast } from "@/hooks/use-toast";

// ─── Types ────────────────────────────────────────────────────────────────────

type EventStatus = "draft" | "published" | "archived";

interface Speaker { name: string; role: string; image: string; }
interface ScheduleDay { day: string; sessions: string[]; }

interface EventForm {
  title: string;
  type: string;
  tag: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  longDescription: string;
  status: EventStatus;
  registrationOpen: boolean;
  showHighlights: boolean;
  highlights: string[];
  showSpeakers: boolean;
  speakers: Speaker[];
  showSchedule: boolean;
  schedule: ScheduleDay[];
  color: string;
}

const EVENT_TYPES = ["Major Crusade", "Youth Camp", "Seminar", "International Mission", "Weekly Service", "Conference", "Retreat"];
const EVENT_COLORS = [
  { label: "Blue", value: "from-blue-600 to-indigo-700" },
  { label: "Emerald", value: "from-emerald-500 to-teal-600" },
  { label: "Violet", value: "from-violet-600 to-purple-700" },
  { label: "Amber", value: "from-amber-500 to-orange-600" },
  { label: "Rose", value: "from-rose-500 to-pink-600" },
  { label: "Cyan", value: "from-cyan-500 to-blue-500" },
];

const BLANK: EventForm = {
  title: "", type: "", tag: "", date: "", time: "", location: "",
  image: "", description: "", longDescription: "", status: "draft",
  registrationOpen: true,
  showHighlights: false, highlights: [""],
  showSpeakers: false, speakers: [{ name: "", role: "", image: "" }],
  showSchedule: false, schedule: [{ day: "", sessions: [""] }],
  color: "from-blue-600 to-indigo-700",
};

// ─── Section Toggle ───────────────────────────────────────────────────────────

function SectionToggle({
  label, description, icon: Icon, enabled, onToggle, children,
}: {
  label: string; description: string; icon: React.ElementType;
  enabled: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${enabled ? "bg-primary/10" : "bg-muted"}`}>
            <Icon className={`w-4 h-4 ${enabled ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground text-sm">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${enabled ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
            {enabled ? "Enabled" : "Disabled"}
          </span>
          {enabled
            ? <ToggleRight className="w-6 h-6 text-primary" />
            : <ToggleLeft className="w-6 h-6 text-muted-foreground" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-border bg-muted/10">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Field helpers ────────────────────────────────────────────────────────────

const lbl = "block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5";
const inp = "w-full bg-background border border-input rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all";

// ─── Live Preview ─────────────────────────────────────────────────────────────

type ViewMode = "editor" | "split" | "preview";

function EventLivePreview({ form }: { form: EventForm }) {
  const accentColor = form.color.includes("emerald") ? "bg-emerald-500"
    : form.color.includes("violet") ? "bg-violet-600"
    : form.color.includes("amber") ? "bg-amber-500"
    : form.color.includes("rose") ? "bg-rose-500"
    : form.color.includes("cyan") ? "bg-cyan-500"
    : "bg-blue-600";

  return (
    <div className="min-h-full bg-background text-foreground font-sans overflow-y-auto">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden flex items-end">
        {form.image
          ? <img src={form.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          : <div className={`absolute inset-0 bg-gradient-to-br ${form.color}`} />}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="relative z-10 w-full pb-6 px-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {form.type && <span className={`${accentColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>{form.type}</span>}
            {form.tag && <span className="bg-white/20 backdrop-blur text-white text-xs font-semibold px-2.5 py-1 rounded-full">{form.tag}</span>}
          </div>
          <h1 className="text-xl font-bold text-white font-serif leading-tight mb-3">
            {form.title || <span className="opacity-40">Event Title</span>}
          </h1>
          <div className="flex flex-wrap gap-4 text-white/70 text-xs">
            {form.date && <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{form.date}</span>}
            {form.time && <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{form.time}</span>}
            {form.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{form.location}</span>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-6 space-y-6">
        {/* About */}
        {form.longDescription && (
          <div>
            <h2 className="text-base font-bold text-foreground font-serif mb-3">About This Event</h2>
            {form.longDescription.split("\n\n").map((p, i) => (
              <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-3">{p}</p>
            ))}
          </div>
        )}

        {/* Highlights */}
        {form.showHighlights && form.highlights.filter(Boolean).length > 0 && (
          <div>
            <h2 className="text-base font-bold text-foreground font-serif mb-3">Event Highlights</h2>
            <div className="grid grid-cols-1 gap-2">
              {form.highlights.filter(Boolean).map((h, i) => (
                <div key={i} className="flex items-start gap-2 bg-muted/40 rounded-xl p-3 border border-border">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule */}
        {form.showSchedule && form.schedule.some(d => d.day) && (
          <div>
            <h2 className="text-base font-bold text-foreground font-serif mb-3">Schedule</h2>
            <div className="space-y-3">
              {form.schedule.filter(d => d.day).map((day, di) => (
                <div key={di} className="rounded-xl border border-border overflow-hidden">
                  <div className={`bg-gradient-to-r ${form.color} px-4 py-2`}>
                    <p className="text-white font-bold text-xs">{day.day}</p>
                  </div>
                  <div className="divide-y divide-border bg-white">
                    {day.sessions.filter(Boolean).map((s, si) => (
                      <div key={si} className="flex items-center gap-2 px-4 py-2.5 text-xs text-muted-foreground">
                        <Sparkles className="w-3 h-3 text-primary flex-shrink-0" />{s}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Speakers */}
        {form.showSpeakers && form.speakers.some(s => s.name) && (
          <div>
            <h2 className="text-base font-bold text-foreground font-serif mb-3">Speakers</h2>
            <div className="flex flex-wrap gap-3">
              {form.speakers.filter(s => s.name).map((sp, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-border rounded-xl p-3 flex-1 min-w-[160px]">
                  {sp.image
                    ? <img src={sp.image} alt={sp.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0" />
                    : <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">{sp.name[0]}</div>}
                  <div>
                    <p className="font-semibold text-foreground text-sm">{sp.name}</p>
                    <p className="text-xs text-muted-foreground">{sp.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Register CTA */}
        {form.registrationOpen && (
          <div className={`bg-gradient-to-r ${form.color} rounded-2xl p-5 text-white`}>
            <p className="font-bold text-base mb-1">Ready to join?</p>
            <p className="text-white/80 text-sm mb-4">Registration is open. Secure your spot today.</p>
            <div className={`inline-flex items-center gap-2 bg-white text-sm font-bold px-4 py-2.5 rounded-xl`}
              style={{ color: "inherit" }}>
              Register Now <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Sidebar info */}
        <div className="bg-white rounded-2xl border border-border p-4 space-y-3">
          <p className="font-bold text-foreground text-sm">Event Details</p>
          {form.date && <p className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="w-3.5 h-3.5 text-primary" />{form.date}</p>}
          {form.time && <p className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="w-3.5 h-3.5 text-primary" />{form.time}</p>}
          {form.location && <p className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="w-3.5 h-3.5 text-primary" />{form.location}</p>}
          {form.type && <p className="flex items-center gap-2 text-xs text-muted-foreground"><Tag className="w-3.5 h-3.5 text-primary" />{form.type}</p>}
          <div className="flex gap-2 pt-1">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"><Share2 className="w-3.5 h-3.5" /> Share</button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-500 transition-colors"><Heart className="w-3.5 h-3.5" /> Save</button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-sky-500 transition-colors"><Globe className="w-3.5 h-3.5" /> Online Access</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Settings Sidebar ─────────────────────────────────────────────────────────

function SettingsSidebar({
  form, set, saving, isEdit, onSave, onPublish,
}: {
  form: EventForm;
  set: <K extends keyof EventForm>(key: K, val: EventForm[K]) => void;
  saving: boolean;
  isEdit: boolean;
  onSave: () => void;
  onPublish: () => void;
}) {
  const statusOptions: { value: EventStatus; label: string; color: string }[] = [
    { value: "draft", label: "Draft", color: "border-amber-400 bg-amber-50 text-amber-700" },
    { value: "published", label: "Published", color: "border-emerald-400 bg-emerald-50 text-emerald-700" },
    { value: "archived", label: "Archived", color: "border-slate-400 bg-slate-100 text-slate-600" },
  ];

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="bg-white rounded-2xl border border-border shadow-soft p-4 space-y-2">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Actions</p>
        <Button onClick={onPublish} disabled={saving} className="w-full bg-blue-dark hover:bg-blue-dark/90 text-white rounded-xl gap-2 text-sm h-9">
          {saving
            ? <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            : <Send className="w-3.5 h-3.5" />}
          {isEdit ? "Update Event" : "Publish Event"}
        </Button>
        <Button onClick={onSave} variant="outline" disabled={saving} className="w-full rounded-xl border-border gap-2 text-sm h-9">
          <Save className="w-3.5 h-3.5" /> Save Draft
        </Button>
      </div>

      {/* Status */}
      <div className="bg-white rounded-2xl border border-border shadow-soft p-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Status</p>
        <div className="space-y-2">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set("status", opt.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                form.status === opt.value ? opt.color + " border-opacity-100" : "border-border bg-background text-muted-foreground hover:border-muted-foreground/30"
              }`}
            >
              {opt.label}
              {form.status === opt.value && <CheckCircle2 className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Registration */}
      <div className="bg-white rounded-2xl border border-border shadow-soft p-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Registration</p>
        <button
          type="button"
          onClick={() => set("registrationOpen", !form.registrationOpen)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
            form.registrationOpen
              ? "border-emerald-400 bg-emerald-50 text-emerald-700"
              : "border-border bg-background text-muted-foreground"
          }`}
        >
          <span>{form.registrationOpen ? "Registration Open" : "Registration Closed"}</span>
          {form.registrationOpen
            ? <ToggleRight className="w-5 h-5 text-emerald-500" />
            : <ToggleLeft className="w-5 h-5 text-muted-foreground" />}
        </button>
      </div>

      {/* Colour Theme */}
      <div className="bg-white rounded-2xl border border-border shadow-soft p-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Colour Theme</p>
        <div className="grid grid-cols-3 gap-2">
          {EVENT_COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => set("color", c.value)}
              title={c.label}
              className={`h-10 rounded-xl bg-gradient-to-br ${c.value} transition-all ${
                form.color === c.value ? "ring-2 ring-offset-2 ring-foreground/40 scale-105" : "opacity-70 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mini Preview Card */}
      <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-4 pt-4 pb-2">Preview Card</p>
        <div className={`mx-4 mb-4 rounded-xl overflow-hidden bg-gradient-to-br ${form.color}`}>
          {form.image
            ? <div className="relative h-24"><img src={form.image} alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/40" /></div>
            : <div className="h-24 flex items-center justify-center opacity-30"><Image className="w-8 h-8 text-white" /></div>}
          <div className="p-3">
            <p className="text-white font-bold text-xs leading-tight line-clamp-2">{form.title || "Event Title"}</p>
            {form.date && <p className="text-white/70 text-xs mt-1 flex items-center gap-1"><Calendar className="w-3 h-3" />{form.date}</p>}
            {form.location && <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{form.location}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminEventEditor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const { toast } = useToast();

  const { data: existing, isLoading: loadingExisting } = useEvent(isEdit ? id : undefined);
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();

  const [form, setForm] = useState<EventForm>(() => BLANK);
  const [formInitialized, setFormInitialized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("split");

  // Populate form once existing event loads
  if (existing && !formInitialized) {
    setForm({
      title: existing.title,
      type: existing.type,
      tag: existing.tag,
      date: existing.date,
      time: existing.time,
      location: existing.location,
      image: existing.image,
      description: existing.description,
      longDescription: existing.longDescription,
      status: existing.status,
      registrationOpen: existing.registrationOpen,
      color: existing.color,
      showHighlights: existing.showHighlights,
      highlights: existing.highlights.length > 0 ? existing.highlights : [""],
      showSpeakers: existing.showSpeakers,
      speakers: existing.speakers.length > 0 ? existing.speakers : [{ name: "", role: "", image: "" }],
      showSchedule: existing.showSchedule,
      schedule: existing.schedule.length > 0 ? existing.schedule : [{ day: "", sessions: [""] }],
    });
    setFormInitialized(true);
  }

  if (isEdit && loadingExisting) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center">
        <span className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  const set = <K extends keyof EventForm>(key: K, val: EventForm[K]) =>
    setForm((p) => ({ ...p, [key]: val }));

  const buildPayload = () => ({
    title: form.title,
    type: form.type,
    tag: form.tag,
    date: form.date,
    time: form.time,
    location: form.location,
    image: form.image,
    description: form.description,
    longDescription: form.longDescription,
    status: form.status,
    registrationOpen: form.registrationOpen,
    color: form.color,
    showHighlights: form.showHighlights,
    highlights: form.highlights.filter(Boolean),
    showSpeakers: form.showSpeakers,
    speakers: form.speakers.filter((s) => s.name),
    showSchedule: form.showSchedule,
    schedule: form.schedule.filter((d) => d.day),
  });

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const payload = { ...buildPayload(), status: "draft" as const };
      if (isEdit && id) {
        await updateEvent.mutateAsync({ id, payload });
      } else {
        await createEvent.mutateAsync(payload);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      toast({ title: "Save failed", description: err?.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!form.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const payload = { ...buildPayload(), status: "published" as const };
      if (isEdit && id) {
        await updateEvent.mutateAsync({ id, payload });
      } else {
        await createEvent.mutateAsync(payload);
      }
      toast({ title: isEdit ? "Event updated" : "Event published" });
      navigate("/dashboard/events");
    } catch (err: any) {
      toast({ title: "Publish failed", description: err?.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  // ── Highlights helpers ──
  const setHighlight = (i: number, val: string) => {
    const arr = [...form.highlights]; arr[i] = val; set("highlights", arr);
  };
  const addHighlight = () => set("highlights", [...form.highlights, ""]);
  const removeHighlight = (i: number) => set("highlights", form.highlights.filter((_, idx) => idx !== i));

  // ── Speakers helpers ──
  const setSpeaker = (i: number, key: keyof Speaker, val: string) => {
    const arr = form.speakers.map((s, idx) => idx === i ? { ...s, [key]: val } : s);
    set("speakers", arr);
  };
  const addSpeaker = () => set("speakers", [...form.speakers, { name: "", role: "", image: "" }]);
  const removeSpeaker = (i: number) => set("speakers", form.speakers.filter((_, idx) => idx !== i));

  // ── Schedule helpers ──
  const setDayTitle = (di: number, val: string) => {
    const arr = form.schedule.map((d, i) => i === di ? { ...d, day: val } : d);
    set("schedule", arr);
  };
  const setSession = (di: number, si: number, val: string) => {
    const arr = form.schedule.map((d, i) => i === di
      ? { ...d, sessions: d.sessions.map((s, j) => j === si ? val : s) }
      : d);
    set("schedule", arr);
  };
  const addSession = (di: number) => {
    const arr = form.schedule.map((d, i) => i === di ? { ...d, sessions: [...d.sessions, ""] } : d);
    set("schedule", arr);
  };
  const removeSession = (di: number, si: number) => {
    const arr = form.schedule.map((d, i) => i === di
      ? { ...d, sessions: d.sessions.filter((_, j) => j !== si) }
      : d);
    set("schedule", arr);
  };
  const addDay = () => set("schedule", [...form.schedule, { day: "", sessions: [""] }]);
  const removeDay = (di: number) => set("schedule", form.schedule.filter((_, i) => i !== di));

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      {/* Top Bar */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-soft">
        <div className="flex items-center justify-between px-4 h-14 gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => navigate("/dashboard/events")}
              className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Event title..."
                className="bg-transparent text-foreground font-bold text-base outline-none w-full placeholder:text-muted-foreground/40 truncate"
              />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={`px-1.5 py-0.5 rounded-full font-medium text-xs ${
                  form.status === "published" ? "bg-emerald-100 text-emerald-700"
                  : form.status === "archived" ? "bg-slate-100 text-slate-500"
                  : "bg-amber-100 text-amber-700"}`}>
                  {form.status}
                </span>
                {form.type && <span>· {form.type}</span>}
                {isEdit && <span className="text-muted-foreground/60">· Editing</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <AnimatePresence>
              {saved && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-emerald-600 text-xs font-medium flex items-center gap-1">
                  <Save className="w-3.5 h-3.5" /> Saved
                </motion.span>
              )}
            </AnimatePresence>
            {/* View mode toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-muted/60 rounded-xl p-1">
              {([
                { id: "editor" as ViewMode, icon: Monitor, label: "Editor" },
                { id: "split" as ViewMode, icon: Columns2, label: "Split" },
                { id: "preview" as ViewMode, icon: Eye, label: "Preview" },
              ]).map((vm) => (
                <button key={vm.id} onClick={() => setViewMode(vm.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === vm.id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}>
                  <vm.icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{vm.label}</span>
                </button>
              ))}
            </div>
            <Button onClick={handleSave} variant="outline" disabled={saving}
              className="rounded-xl border-border gap-1.5 text-sm h-9 px-3">
              {saving ? <span className="w-3 h-3 rounded-full border-2 border-foreground/30 border-t-foreground animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Save Draft</span>
            </Button>
            <Button onClick={handlePublish} disabled={saving}
              className="bg-blue-dark hover:bg-blue-dark/90 text-white rounded-xl gap-1.5 text-sm h-9 px-3">
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEdit ? "Update" : "Publish"}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Body — full height split layout */}
      <div className="flex overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>

        {/* Editor Pane */}
        <AnimatePresence initial={false}>
          {viewMode !== "preview" && (
            <motion.div key="editor"
              initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: viewMode === "split" ? "50%" : "100%" }}
              exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }}
              className="overflow-y-auto bg-[#F4F6FA] border-r border-border" style={{ minWidth: 0 }}>
              <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

                {/* Basic Info */}
                <div className="bg-white rounded-2xl border border-border shadow-soft p-6 space-y-5">
                  <h3 className="font-bold text-foreground flex items-center gap-2 text-sm"><AlignLeft className="w-4 h-4 text-primary" /> Basic Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={lbl}>Event Type</label>
                      <select value={form.type} onChange={(e) => set("type", e.target.value)} className={inp}>
                        <option value="">Select type...</option>
                        {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={lbl}>Tag / Badge</label>
                      <Input value={form.tag} onChange={(e) => set("tag", e.target.value)} placeholder="e.g. Featured, Youth" className="rounded-xl text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>Short Description</label>
                    <textarea value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="One-line summary..." rows={2} className={`${inp} resize-none`} />
                  </div>
                  <div>
                    <label className={lbl}>Full Description</label>
                    <textarea value={form.longDescription} onChange={(e) => set("longDescription", e.target.value)} placeholder="Full description. Use blank lines to separate paragraphs." rows={6} className={`${inp} resize-none`} />
                  </div>
                </div>

                {/* Date / Time / Location */}
                <div className="bg-white rounded-2xl border border-border shadow-soft p-6 space-y-4">
                  <h3 className="font-bold text-foreground flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-primary" /> Date, Time & Location</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={lbl}>Date</label>
                      <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <Input value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="e.g. November 15–18, 2024" className="pl-9 rounded-xl text-sm" /></div>
                    </div>
                    <div>
                      <label className={lbl}>Time</label>
                      <div className="relative"><Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <Input value={form.time} onChange={(e) => set("time", e.target.value)} placeholder="e.g. 9:00 AM – 9:00 PM" className="pl-9 rounded-xl text-sm" /></div>
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>Location</label>
                    <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                      <Input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Venue, City, Country" className="pl-9 rounded-xl text-sm" /></div>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="bg-white rounded-2xl border border-border shadow-soft p-6 space-y-4">
                  <h3 className="font-bold text-foreground flex items-center gap-2 text-sm"><Image className="w-4 h-4 text-primary" /> Cover Image</h3>
                  <Input value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." className="rounded-xl text-sm" />
                  {form.image
                    ? <div className="rounded-xl overflow-hidden aspect-video border border-border"><img src={form.image} alt="Cover" className="w-full h-full object-cover" /></div>
                    : <div className="rounded-xl border-2 border-dashed border-border aspect-video flex items-center justify-center text-muted-foreground/40 text-sm">Paste image URL above to preview</div>}
                </div>

                {/* Optional Sections */}
                <SectionToggle label="Event Highlights" description="Key bullet points" icon={ListChecks} enabled={form.showHighlights} onToggle={() => set("showHighlights", !form.showHighlights)}>
                  <div className="space-y-2 mt-2">
                    {form.highlights.map((h, i) => (
                      <div key={i} className="flex gap-2">
                        <Input value={h} onChange={(e) => setHighlight(i, e.target.value)} placeholder={`Highlight ${i + 1}`} className="rounded-xl text-sm flex-1" />
                        {form.highlights.length > 1 && <button onClick={() => removeHighlight(i)} className="p-2 rounded-xl hover:bg-red-50 hover:text-red-500 text-muted-foreground transition-colors"><Trash2 className="w-4 h-4" /></button>}
                      </div>
                    ))}
                    <button onClick={addHighlight} className="flex items-center gap-2 text-primary text-sm font-medium hover:underline mt-1"><Plus className="w-4 h-4" /> Add Highlight</button>
                  </div>
                </SectionToggle>

                <SectionToggle label="Speakers" description="Speaker profiles with name, role and photo" icon={Users} enabled={form.showSpeakers} onToggle={() => set("showSpeakers", !form.showSpeakers)}>
                  <div className="space-y-4 mt-2">
                    {form.speakers.map((sp, i) => (
                      <div key={i} className="bg-white rounded-xl border border-border p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Speaker {i + 1}</span>
                          {form.speakers.length > 1 && <button onClick={() => removeSpeaker(i)} className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-muted-foreground transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <Input value={sp.name} onChange={(e) => setSpeaker(i, "name", e.target.value)} placeholder="Full name" className="rounded-xl text-sm" />
                          <Input value={sp.role} onChange={(e) => setSpeaker(i, "role", e.target.value)} placeholder="Role" className="rounded-xl text-sm" />
                        </div>
                        <Input value={sp.image} onChange={(e) => setSpeaker(i, "image", e.target.value)} placeholder="Photo URL (optional)" className="rounded-xl text-sm" />
                      </div>
                    ))}
                    <button onClick={addSpeaker} className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"><Plus className="w-4 h-4" /> Add Speaker</button>
                  </div>
                </SectionToggle>

                <SectionToggle label="Schedule" description="Day-by-day programme" icon={Sparkles} enabled={form.showSchedule} onToggle={() => set("showSchedule", !form.showSchedule)}>
                  <div className="space-y-4 mt-2">
                    {form.schedule.map((day, di) => (
                      <div key={di} className="bg-white rounded-xl border border-border overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border">
                          <GripVertical className="w-4 h-4 text-muted-foreground/40" />
                          <Input value={day.day} onChange={(e) => setDayTitle(di, e.target.value)} placeholder="Day label" className="rounded-lg text-sm h-8 flex-1" />
                          {form.schedule.length > 1 && <button onClick={() => removeDay(di)} className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-muted-foreground transition-colors flex-shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>}
                        </div>
                        <div className="p-4 space-y-2">
                          {day.sessions.map((s, si) => (
                            <div key={si} className="flex gap-2">
                              <Input value={s} onChange={(e) => setSession(di, si, e.target.value)} placeholder="e.g. 9:00 AM — Morning Worship" className="rounded-xl text-sm flex-1" />
                              {day.sessions.length > 1 && <button onClick={() => removeSession(di, si)} className="p-2 rounded-xl hover:bg-red-50 hover:text-red-500 text-muted-foreground transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>}
                            </div>
                          ))}
                          <button onClick={() => addSession(di)} className="flex items-center gap-1.5 text-primary text-xs font-medium hover:underline mt-1"><Plus className="w-3.5 h-3.5" /> Add Session</button>
                        </div>
                      </div>
                    ))}
                    <button onClick={addDay} className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"><Plus className="w-4 h-4" /> Add Day</button>
                  </div>
                </SectionToggle>

                {/* Settings inline when editor-only */}
                {viewMode === "editor" && (
                  <SettingsSidebar form={form} set={set} saving={saving} isEdit={isEdit} onSave={handleSave} onPublish={handlePublish} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preview Pane */}
        <AnimatePresence initial={false}>
          {viewMode !== "editor" && (
            <motion.div key="preview"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto bg-background" style={{ minWidth: 0 }}>
              <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-border px-4 py-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Eye className="w-3.5 h-3.5" /> Live Preview — matches public event detail page
              </div>
              <EventLivePreview form={form} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings sidebar (split/preview modes) */}
        {viewMode !== "editor" && (
          <div className="w-64 flex-shrink-0 overflow-y-auto bg-[#F4F6FA] border-l border-border p-4 space-y-4">
            <SettingsSidebar form={form} set={set} saving={saving} isEdit={isEdit} onSave={handleSave} onPublish={handlePublish} />
          </div>
        )}
      </div>
    </div>
  );
}
