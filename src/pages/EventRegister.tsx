import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft, Calendar, MapPin, Clock, CheckCircle2,
  User, Mail, Phone, Users, MessageSquare, Send, Sparkles, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useEvent, useRegisterForEvent } from "@/hooks/useEvents";

// ─── Schema ───────────────────────────────────────────────────────────────────

type FormData = {
  name: string;
  email: string;
  phone: string;
  attendees: string;
  church: string;
  city: string;
  message: string;
};

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Attendance" },
  { id: 3, label: "Confirm" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputClass = (err?: string) =>
  `w-full bg-white border ${err ? "border-destructive ring-1 ring-destructive/30" : "border-input"} rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50`;

const labelClass = "block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2";

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EventRegister() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: event, isLoading: eventLoading } = useEvent(id);
  const registerMutation = useRegisterForEvent(id!);

  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<Partial<FormData>>({ attendees: "1" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  if (eventLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
          <Calendar className="w-16 h-16 text-muted-foreground/30" />
          <h1 className="text-2xl font-bold">Event not found</h1>
          <Link to="/events" className="text-primary font-semibold hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Check if registration is closed
  if (!event.registrationOpen) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Calendar className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <h1 className="text-2xl font-bold">Registration Closed</h1>
          <p className="text-muted-foreground max-w-sm">Registration for this event is currently closed. Please check back later or contact us for more information.</p>
          <Link to={`/events/${event.id}`} className="text-primary font-semibold hover:underline flex items-center gap-2 mt-2">
            <ArrowLeft className="w-4 h-4" /> Back to Event
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const accentColor = event.color.includes("emerald") ? "bg-emerald-500"
    : event.color.includes("violet") ? "bg-violet-600"
    : event.color.includes("amber") ? "bg-amber-500"
    : event.color.includes("rose") ? "bg-rose-500"
    : event.color.includes("cyan") ? "bg-cyan-500"
    : "bg-blue-600";

  const set = (key: keyof FormData, val: string) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validateStep = (s: number) => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (s === 1) {
      if (!form.name?.trim()) errs.name = "Full name is required";
      if (!form.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
      if (!form.phone?.trim()) errs.phone = "Phone number is required";
      if (!form.city?.trim()) errs.city = "City is required";
    }
    if (s === 2) {
      if (!form.attendees) errs.attendees = "Select number of attendees";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep((s) => s + 1); };
  const back = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    try {
      await registerMutation.mutateAsync({
        name: form.name!,
        email: form.email!,
        phone: form.phone,
        city: form.city!,
        church: form.church,
        attendees: form.attendees!,
        attendance: "in-person",
        message: form.message,
      });
      setDone(true);
    } catch (err: any) {
      toast({
        title: "Registration failed",
        description: err?.message ?? "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  // ── Success Screen ──
  if (done) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-white rounded-3xl shadow-xl border border-border p-10 max-w-lg w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground mb-2">You're Registered!</h2>
            <p className="text-muted-foreground mb-1">
              Thank you, <span className="font-semibold text-foreground">{form.name}</span>.
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              A confirmation will be sent to <span className="font-medium">{form.email}</span>. We look forward to seeing you at <span className="font-semibold text-foreground">{event.title}</span>.
            </p>

            <div className={`bg-gradient-to-r ${event.color} rounded-2xl p-4 text-white text-sm mb-8 space-y-1.5`}>
              <p className="flex items-center justify-center gap-2"><Calendar className="w-4 h-4" /> {event.date}</p>
              <p className="flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> {event.time}</p>
              <p className="flex items-center justify-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={`/events/${event.id}`} className="flex-1 border border-border text-foreground font-semibold py-3 rounded-xl hover:bg-muted transition-colors text-sm text-center">
                Back to Event
              </Link>
              <Link to="/events" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity text-sm text-center">
                Browse Events
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      <Navbar />

      {/* ── Hero Banner ── */}
      <div className="relative h-52 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071E28]/90 via-[#0B2D3A]/60 to-[#0D3A4A]/30" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-8 max-w-3xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <button
              onClick={() => navigate(`/events/${event.id}`)}
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-medium mb-3 transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to Event
            </button>
            <span className={`${accentColor} text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mr-2`}>{event.type}</span>
            <h1 className="text-xl md:text-2xl font-bold text-white font-serif mt-2 leading-tight">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-white/70 text-xs mt-2">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    background: step > s.id
                      ? "linear-gradient(135deg,#10b981,#059669)"
                      : step === s.id
                      ? `linear-gradient(135deg,var(--color-primary),#6366f1)`
                      : "transparent",
                    borderColor: step >= s.id ? "transparent" : "#e2e8f0",
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    step > s.id ? "text-white" : step === s.id ? "text-white" : "text-muted-foreground"
                  }`}
                  style={{
                    background: step > s.id
                      ? "linear-gradient(135deg,#10b981,#059669)"
                      : step === s.id
                      ? "linear-gradient(135deg,#3b82f6,#6366f1)"
                      : "white",
                    border: step >= s.id ? "none" : "2px solid #e2e8f0",
                  }}
                >
                  {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                </motion.div>
                <span className={`text-xs mt-1.5 font-medium ${step === s.id ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 rounded-full transition-colors ${step > s.id ? "bg-emerald-400" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-border shadow-soft overflow-hidden">
          <div className={`h-1.5 bg-gradient-to-r ${event.color}`} />

          <AnimatePresence mode="wait">
            {/* ── Step 1: Personal Info ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground text-lg">Personal Information</h2>
                    <p className="text-xs text-muted-foreground">Tell us a bit about yourself</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input
                          value={form.name ?? ""}
                          onChange={(e) => set("name", e.target.value)}
                          placeholder="John Doe"
                          className={`${inputClass(errors.name)} pl-10`}
                        />
                      </div>
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input
                          type="email"
                          value={form.email ?? ""}
                          onChange={(e) => set("email", e.target.value)}
                          placeholder="john@example.com"
                          className={`${inputClass(errors.email)} pl-10`}
                        />
                      </div>
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input
                          type="tel"
                          value={form.phone ?? ""}
                          onChange={(e) => set("phone", e.target.value)}
                          placeholder="+91 ..."
                          className={`${inputClass(errors.phone)} pl-10`}
                        />
                      </div>
                      {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>City / Country *</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input
                          value={form.city ?? ""}
                          onChange={(e) => set("city", e.target.value)}
                          placeholder="Trivandrum, India"
                          className={`${inputClass(errors.city)} pl-10`}
                        />
                      </div>
                      {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Church / Organisation (optional)</label>
                    <input
                      value={form.church ?? ""}
                      onChange={(e) => set("church", e.target.value)}
                      placeholder="Your church or organisation name"
                      className={inputClass()}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Attendance ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                    <Users className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground text-lg">Attendance Details</h2>
                    <p className="text-xs text-muted-foreground">How many people are attending?</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Number of attendees */}
                  <div>
                    <label className={labelClass}>Number of Attendees *</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => set("attendees", n)}
                          className={`py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                            form.attendees === n
                              ? "border-primary bg-primary text-white shadow-sm"
                              : "border-border hover:border-primary/40 text-foreground"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    {errors.attendees && <p className="text-destructive text-xs mt-1">{errors.attendees}</p>}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className={labelClass}>Additional Notes (optional)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground/50" />
                      <textarea
                        value={form.message ?? ""}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder="Any special requirements, accessibility needs, or questions..."
                        rows={3}
                        className={`${inputClass()} pl-10 resize-none`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Confirm ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground text-lg">Confirm Registration</h2>
                    <p className="text-xs text-muted-foreground">Review your details before submitting</p>
                  </div>
                </div>

                {/* Event summary */}
                <div className={`bg-gradient-to-r ${event.color} rounded-2xl p-5 text-white mb-6`}>
                  <p className="font-bold text-base mb-3">{event.title}</p>
                  <div className="space-y-1.5 text-sm text-white/90">
                    <p className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {event.date}</p>
                    <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> {event.time}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</p>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { label: "Name", value: form.name },
                    { label: "Email", value: form.email },
                    { label: "Phone", value: form.phone },
                    { label: "City", value: form.city },
                    { label: "Attendees", value: form.attendees },
                    ...(form.church ? [{ label: "Church", value: form.church }] : []),
                    ...(form.message ? [{ label: "Notes", value: form.message }] : []),
                  ].map((row) => (
                    <div key={row.label} className="bg-muted/40 rounded-xl px-4 py-3">
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">{row.label}</p>
                      <p className="text-sm text-foreground font-medium">{row.value}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  By registering you agree to receive event updates at the email provided. Registration is free.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Footer Actions ── */}
          <div className="px-8 pb-8 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                onClick={back}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <Link
                to={`/events/${event.id}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Cancel
              </Link>
            )}

            {step < 3 ? (
              <Button
                onClick={next}
                className={`bg-gradient-to-r ${event.color} text-white rounded-xl px-8 h-11 font-bold shadow-md hover:opacity-90 transition-opacity`}
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={registerMutation.isPending}
                className={`bg-gradient-to-r ${event.color} text-white rounded-xl px-8 h-11 font-bold shadow-md hover:opacity-90 transition-opacity gap-2`}
              >
                {registerMutation.isPending ? (
                  <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Registering...</>
                ) : (
                  <><Send className="w-4 h-4" /> Complete Registration</>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-muted-foreground"
        >
          {["Free Registration", "Instant Confirmation", "All Are Welcome"].map((badge) => (
            <span key={badge} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {badge}
            </span>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
