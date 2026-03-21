import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Calendar, MapPin, Users, Eye, Pencil, Trash2,
  CheckCircle2, XCircle, Mail, Phone, Globe, Search, Download,
  ListChecks, Sparkles, ToggleRight, ToggleLeft, ExternalLink, Loader2, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEvent, useDeleteEvent, useEventRegistrations, useUpdateRegistrationStatus } from "@/hooks/useEvents";
import { useToast } from "@/hooks/use-toast";
import type { EventRegistration } from "@/lib/api";

type RegStatus = "confirmed" | "pending" | "cancelled";
type DetailTab = "overview" | "registrations";

const regStatusConfig: Record<RegStatus, { label: string; color: string; icon: React.ElementType }> = {
  confirmed: { label: "Confirmed", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-600 border-red-200", icon: XCircle },
};

export default function AdminEventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<DetailTab>("overview");
  const [search, setSearch] = useState("");
  const [regFilter, setRegFilter] = useState<"all" | RegStatus>("all");
  const [selected, setSelected] = useState<EventRegistration | null>(null);

  const { data: event, isLoading: eventLoading } = useEvent(id);
  const deleteEvent = useDeleteEvent();
  const { data: regsData, isLoading: regsLoading } = useEventRegistrations(
    id,
    { search, status: regFilter === "all" ? undefined : regFilter }
  );
  const updateRegStatus = useUpdateRegistrationStatus(id!);

  const registrations = regsData?.data ?? [];
  const totalAttendees = registrations.reduce((s, r) => s + parseInt(r.attendees || "1"), 0);
  const confirmed = registrations.filter((r) => r.status === "confirmed").length;
  const online = registrations.filter((r) => r.attendance === "online").length;

  const handleDelete = async () => {
    if (!event || !confirm(`Delete "${event.title}"? This cannot be undone.`)) return;
    try {
      await deleteEvent.mutateAsync(event.id);
      toast({ title: "Event deleted" });
      navigate("/dashboard/events");
    } catch {
      toast({ title: "Failed to delete event", variant: "destructive" });
    }
  };

  const handleRegStatus = async (regId: string, status: RegStatus) => {
    try {
      await updateRegStatus.mutateAsync({ regId, status });
      setSelected((prev) => prev ? { ...prev, status } : prev);
    } catch {
      toast({ title: "Failed to update status", variant: "destructive" });
    }
  };

  if (eventLoading) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] flex flex-col items-center justify-center gap-4">
        <Calendar className="w-16 h-16 text-muted-foreground/30" />
        <p className="font-bold text-foreground">Event not found</p>
        <button onClick={() => navigate("/dashboard/events")} className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => navigate("/dashboard/events")}
              className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors flex-shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <p className="font-bold text-foreground text-sm truncate">{event.title}</p>
              <p className="text-xs text-muted-foreground">{event.type} · {event.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to={`/events/${event.id}`} target="_blank"
              className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors" title="View public page">
              <ExternalLink className="w-4 h-4" />
            </Link>
            <Button onClick={() => navigate(`/dashboard/events/${event.id}/edit`)}
              variant="outline" className="rounded-xl gap-1.5 text-sm h-9 px-3 border-border">
              <Pencil className="w-3.5 h-3.5" /> Edit
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-44 overflow-hidden">
        {event.image
          ? <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          : <div className={`w-full h-full bg-gradient-to-br ${event.color}`} />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 text-white/80 text-xs">
            {event.date && <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>}
            {event.time && <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {event.time}</span>}
            {event.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Registrations", value: regsData?.total ?? 0, color: "from-blue-500 to-indigo-600", icon: Users },
            { label: "Confirmed", value: confirmed, color: "from-emerald-500 to-teal-600", icon: CheckCircle2 },
            { label: "Total Attendees", value: totalAttendees, color: "from-violet-500 to-purple-600", icon: Users },
            { label: "Online", value: online, color: "from-amber-500 to-orange-500", icon: Globe },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-border shadow-soft p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted/50 rounded-xl p-1 w-fit mb-6">
          {(["overview", "registrations"] as DetailTab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                tab === t ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}>
              {t}
              {t === "registrations" && event.registrationOpen && (
                <span className="ml-2 text-xs bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded-full">
                  {regsData?.total ?? 0}
                </span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Overview Tab ── */}
          {tab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-5">
                {/* Description */}
                {event.longDescription && (
                  <div className="bg-white rounded-2xl border border-border shadow-soft p-6">
                    <h3 className="font-bold text-foreground text-sm mb-3">About This Event</h3>
                    {event.longDescription.split("\n\n").map((p, i) => (
                      <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-3">{p}</p>
                    ))}
                  </div>
                )}

                {/* Highlights */}
                {event.showHighlights && event.highlights.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border shadow-soft p-6">
                    <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                      <ListChecks className="w-4 h-4 text-primary" /> Highlights
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {event.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 bg-muted/30 rounded-xl p-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Schedule */}
                {event.showSchedule && event.schedule.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border shadow-soft p-6">
                    <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" /> Schedule
                    </h3>
                    <div className="space-y-3">
                      {event.schedule.map((day, di) => (
                        <div key={di} className="rounded-xl border border-border overflow-hidden">
                          <div className={`bg-gradient-to-r ${event.color} px-4 py-2`}>
                            <p className="text-white font-bold text-xs">{day.day}</p>
                          </div>
                          <div className="divide-y divide-border">
                            {day.sessions.map((s, si) => (
                              <div key={si} className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />{s}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Speakers */}
                {event.showSpeakers && event.speakers.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border shadow-soft p-6">
                    <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" /> Speakers
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {event.speakers.map((sp, i) => (
                        <div key={i} className="flex items-center gap-3 bg-muted/30 rounded-xl p-3 flex-1 min-w-[180px]">
                          {sp.image
                            ? <img src={sp.image} alt={sp.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0" />
                            : <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">{sp.name[0]}</div>}
                          <div>
                            <p className="font-semibold text-foreground text-sm">{sp.name}</p>
                            <p className="text-xs text-muted-foreground">{sp.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-border shadow-soft p-5">
                  <h3 className="font-bold text-foreground text-sm mb-4">Event Details</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { icon: Calendar, label: "Date", value: event.date },
                      { icon: Clock, label: "Time", value: event.time },
                      { icon: MapPin, label: "Location", value: event.location },
                      { icon: Users, label: "Type", value: event.type },
                    ].filter(r => r.value).map((row) => (
                      <div key={row.label} className="flex items-start gap-3">
                        <row.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">{row.label}</p>
                          <p className="font-medium text-foreground">{row.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-border shadow-soft p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-foreground text-sm">Registration</h3>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${event.registrationOpen ? "text-emerald-600" : "text-muted-foreground"}`}>
                      {event.registrationOpen ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                      {event.registrationOpen ? "Open" : "Closed"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {event.registrationOpen ? "Registration is currently open to the public." : "Registration is currently closed."}
                  </p>
                  {event.registrationOpen && (
                    <Link to={`/events/${event.id}/register`} target="_blank"
                      className="flex items-center gap-1.5 text-primary text-xs font-semibold hover:underline">
                      <ExternalLink className="w-3.5 h-3.5" /> View Registration Page
                    </Link>
                  )}
                </div>

                <div className="bg-white rounded-2xl border border-border shadow-soft p-5">
                  <h3 className="font-bold text-foreground text-sm mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button onClick={() => navigate(`/dashboard/events/${event.id}/edit`)}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-muted text-sm text-foreground transition-colors">
                      <Pencil className="w-4 h-4 text-muted-foreground" /> Edit Event
                    </button>
                    {event.registrationOpen && (
                      <button onClick={() => setTab("registrations")}
                        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-muted text-sm text-foreground transition-colors">
                        <Users className="w-4 h-4 text-muted-foreground" /> View Registrations
                      </button>
                    )}
                    <Link to={`/events/${event.id}`} target="_blank"
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-muted text-sm text-foreground transition-colors">
                      <Eye className="w-4 h-4 text-muted-foreground" /> View Public Page
                    </Link>
                    <button onClick={handleDelete}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-red-50 text-sm text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" /> Delete Event
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Registrations Tab ── */}
          {tab === "registrations" && (
            <motion.div key="registrations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {!event.registrationOpen ? (
                <div className="py-20 text-center text-muted-foreground bg-white rounded-2xl border border-border">
                  <ToggleLeft className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="font-semibold">Registration is closed for this event</p>
                  <p className="text-sm mt-1">Enable registration in the event editor to collect registrations.</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row gap-3 mb-5">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input value={search} onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email..."
                        className="pl-9 bg-white border-border rounded-xl h-10" />
                    </div>
                    <div className="flex gap-2">
                      {(["all", "confirmed", "pending", "cancelled"] as const).map((f) => (
                        <button key={f} onClick={() => setRegFilter(f)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                            regFilter === f ? "bg-blue-dark text-white shadow-sm" : "bg-white border border-border text-muted-foreground hover:border-blue-dark/40"
                          }`}>
                          {f}
                        </button>
                      ))}
                    </div>
                    <Button variant="outline" className="rounded-xl gap-2 h-10 px-4 border-border">
                      <Download className="w-4 h-4" /> Export
                    </Button>
                  </div>

                  <div className="grid lg:grid-cols-5 gap-5">
                    <div className={`${selected ? "lg:col-span-3" : "lg:col-span-5"} bg-white rounded-2xl border border-border shadow-soft overflow-hidden`}>
                      {regsLoading ? (
                        <div className="py-14 flex items-center justify-center">
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-border bg-muted/40">
                                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3.5">Registrant</th>
                                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3.5 hidden md:table-cell">Attendance</th>
                                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3.5 hidden sm:table-cell">Date</th>
                                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3.5">Status</th>
                                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3.5">Attendees</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {registrations.map((reg, i) => {
                                const cfg = regStatusConfig[reg.status as RegStatus];
                                return (
                                  <motion.tr key={reg.id}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                                    onClick={() => setSelected(selected?.id === reg.id ? null : reg)}
                                    className={`cursor-pointer transition-colors ${
                                      selected?.id === reg.id ? "bg-blue-dark/5 border-l-2 border-l-blue-dark" : "hover:bg-muted/20"
                                    }`}>
                                    <td className="px-5 py-3.5">
                                      <p className="font-semibold text-foreground text-sm">{reg.name}</p>
                                      <p className="text-xs text-muted-foreground">{reg.email}</p>
                                    </td>
                                    <td className="px-4 py-3.5 hidden md:table-cell">
                                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${reg.attendance === "online" ? "bg-sky-100 text-sky-700" : "bg-violet-100 text-violet-700"}`}>
                                        {reg.attendance === "online" ? "Online" : "In Person"}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3.5 hidden sm:table-cell text-xs text-muted-foreground">
                                      {new Date(reg.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3.5">
                                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg?.color ?? ""}`}>
                                        {cfg && <cfg.icon className="w-3 h-3" />} {cfg?.label ?? reg.status}
                                      </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-right text-sm font-bold text-foreground">{reg.attendees}</td>
                                  </motion.tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {!regsLoading && registrations.length === 0 && (
                        <div className="py-14 text-center text-muted-foreground">
                          <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                          <p className="font-medium text-sm">No registrations found</p>
                        </div>
                      )}
                      <div className="px-5 py-3.5 border-t border-border bg-muted/20 text-xs text-muted-foreground flex items-center justify-between">
                        <span>Showing {registrations.length} of {regsData?.total ?? 0} registrations</span>
                        {regsLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      </div>
                    </div>

                    {/* Detail Panel */}
                    <AnimatePresence>
                      {selected && (
                        <motion.div key={selected.id}
                          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.22 }}
                          className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-soft p-5 h-fit">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-bold text-foreground">{selected.name}</h3>
                              <p className="text-xs text-muted-foreground capitalize">{selected.attendance} · {selected.attendees} attendee{parseInt(selected.attendees) > 1 ? "s" : ""}</p>
                            </div>
                            <button onClick={() => setSelected(null)}
                              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-2.5 mb-4 text-sm">
                            <div className="flex items-center gap-2.5">
                              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                              <a href={`mailto:${selected.email}`} className="text-blue-dark hover:underline text-sm">{selected.email}</a>
                            </div>
                            {selected.phone && (
                              <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-muted-foreground">{selected.phone}</span>
                              </div>
                            )}
                            {selected.city && (
                              <div className="flex items-center gap-2.5">
                                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-muted-foreground">{selected.city}</span>
                              </div>
                            )}
                            {selected.church && (
                              <div className="flex items-center gap-2.5">
                                <Users className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-muted-foreground">{selected.church}</span>
                              </div>
                            )}
                            {selected.message && (
                              <div className="bg-muted/30 rounded-xl p-3 text-xs text-muted-foreground">
                                <p className="font-semibold text-foreground mb-1">Notes</p>
                                {selected.message}
                              </div>
                            )}
                          </div>

                          <div className="bg-muted/40 rounded-xl p-3 mb-4 text-xs text-muted-foreground">
                            Registered on {new Date(selected.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleRegStatus(selected.id, "confirmed")}
                              disabled={selected.status === "confirmed" || updateRegStatus.isPending}
                              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Confirm
                            </Button>
                            <Button size="sm" onClick={() => handleRegStatus(selected.id, "cancelled")}
                              disabled={selected.status === "cancelled" || updateRegStatus.isPending}
                              variant="outline" className="rounded-xl border-border text-xs gap-1.5">
                              <XCircle className="w-3.5 h-3.5" /> Cancel
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
