import { motion, useAnimationControls } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Mail, Phone, MapPin, Send, Globe, Youtube,
  Instagram, Facebook, MessageCircle, Send as TelegramIcon,
} from "lucide-react";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSubmitEnquiry } from "@/hooks/useEnquiries";

// ─── Data ─────────────────────────────────────────────────────────────────────

const youtubeChannels = [
  { lang: "Hindi",   handle: "@brothersureshbabuhindi",   url: "https://www.youtube.com/channel/UC-uUoBYSnx_7tC9nC2kvtAQ", flag: "🇮🇳" },
  { lang: "English", handle: "@brothersureshbabuenglish", url: "https://www.youtube.com/channel/UCKv2sCGAxT9rUW880dkJk_Q", flag: "🇬🇧" },
  { lang: "Telugu",  handle: "@brothersureshbabutelugu",  url: "https://www.youtube.com/channel/UCIDI0SBN8hNEOx3tpQ_KzRA", flag: "🇮🇳" },
  { lang: "Tamil",   handle: "@brothersureshbabutamil",   url: "https://www.youtube.com/channel/UCaKa1T5d9V81coLZEKd-FGA", flag: "🇮🇳" },
  { lang: "French",  handle: "@brothersureshbabufrench",  url: "https://www.youtube.com/channel/UCsQRXKzK2MtSwYIjnaTZ-2A", flag: "🇫🇷" },
  { lang: "Spanish", handle: "@brothersureshbabuspanish", url: "https://www.youtube.com/channel/UCNpHTdvVUBmuxmcHtoPwiqw", flag: "🇪🇸" },
];

const socialLinks = [
  { label: "Facebook Page",   icon: Facebook,        url: "https://www.facebook.com/brothersureshbabu/",       color: "bg-blue-600",   hint: "Facebook" },
  { label: "Instagram",       icon: Instagram,       url: "https://www.instagram.com/brothersureshbabu/",      color: "bg-pink-600",   hint: "Instagram" },
  { label: "Facebook Group",  icon: Facebook,        url: "https://m.me/j/AbZf1Y0CTUjIVNZl/",                  color: "bg-blue-500",   hint: "FB Group" },
  { label: "WhatsApp Channel",icon: MessageCircle,   url: "https://bit.ly/3zoESxT",                            color: "bg-green-500",  hint: "WhatsApp" },
  { label: "Telegram",        icon: TelegramIcon,    url: "https://t.me/brothersureshbabutvm",                 color: "bg-sky-500",    hint: "Telegram" },
  { label: "WhatsApp Direct", icon: MessageCircle,   url: "https://wa.me/918111958000",                        color: "bg-green-600",  hint: "WhatsApp" },
];

const contactInfo = [
  { icon: Mail,   title: "Email",          details: "sureshbabu@sureshbabu.org",          link: "mailto:sureshbabu@sureshbabu.org" },
  { icon: Phone,  title: "Phone",          details: "+91 471 272 5273 / 4",               link: "tel:+914712725273" },
  { icon: MapPin, title: "Office Address", details: "Christ Centre, Trivandrum, Kerala",  link: "https://maps.app.goo.gl/iGZT19JoaSkk8v2t5" },
  { icon: Globe,  title: "Website",        details: "www.sureshbabu.org",                 link: "https://sureshbabu.org" },
];

// ─── Schema ───────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name:    z.string().trim().min(1, { message: "Name is required" }).max(100),
  email:   z.string().trim().email({ message: "Invalid email address" }).max(255),
  phone:   z.string().trim().max(20).optional(),
  type:    z.string().min(1, { message: "Inquiry type is required" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000),
});
type ContactFormData = z.infer<typeof contactSchema>;

// ─── Marquee ──────────────────────────────────────────────────────────────────

function ChannelMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const isPausedRef = useRef(false);
  const dragRef = useRef<{ startX: number; startPos: number; active: boolean; moved: boolean }>({
    startX: 0, startPos: 0, active: false, moved: false,
  });
  const speed = 0.6;

  const items = [...youtubeChannels, ...youtubeChannels, ...youtubeChannels];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      if (!isPausedRef.current) {
        const singleWidth = track.scrollWidth / 3;
        posRef.current += speed;
        if (posRef.current >= singleWidth) posRef.current -= singleWidth;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const startDrag = (clientX: number) => {
    dragRef.current = { startX: clientX, startPos: posRef.current, active: true, moved: false };
    isPausedRef.current = true;
  };

  const moveDrag = (clientX: number) => {
    if (!dragRef.current.active) return;
    const dx = dragRef.current.startX - clientX;
    if (Math.abs(dx) > 3) dragRef.current.moved = true;
    posRef.current = dragRef.current.startPos + dx;
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
  };

  const endDrag = () => {
    dragRef.current.active = false;
    isPausedRef.current = false;
  };

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={(e) => startDrag(e.clientX)}
      onMouseMove={(e) => moveDrag(e.clientX)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      onTouchMove={(e) => { e.preventDefault(); moveDrag(e.touches[0].clientX); }}
      onTouchEnd={endDrag}
    >
      <div ref={trackRef} className="flex gap-4 w-max will-change-transform">
        {items.map((ch, i) => (
          <a
            key={i}
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { if (dragRef.current.moved) e.preventDefault(); }}
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-card border border-border hover:border-red-500/50 hover:shadow-md transition-all duration-200 group shrink-0"
          >
            <span className="text-2xl">{ch.flag}</span>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{ch.lang}</p>
              <p className="text-sm font-medium text-foreground group-hover:text-red-500 transition-colors">
                {ch.handle}
              </p>
            </div>
            <Youtube size={16} className="text-red-500 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const Contact = () => {
  const { toast } = useToast();
  const submitEnquiry = useSubmitEnquiry();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "", email: "", phone: "", type: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      await submitEnquiry.mutateAsync(parsed.data as any);
      toast({ title: "Message Sent!", description: "Thank you for reaching out. We'll get back to you soon." });
      setFormData({ name: "", email: "", phone: "", type: "", message: "" });
    } catch (err: any) {
      toast({ title: "Failed to send", description: err?.message ?? "Something went wrong.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-blue-dark">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1470&auto=format&fit=crop"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-dark to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-serif mb-6"
          >
            Contact &amp; Booking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Invite Brother Suresh Babu, send prayer requests, or inquire about ministry partnerships.
          </motion.p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left — info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }} viewport={{ once: true }}
              className="space-y-8 order-2 lg:order-1"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-blue-dark">Ministry Office</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Get in touch with the official ministry office of Brother Suresh Babu.
                  We aim to respond to all inquiries within 24–48 hours.
                </p>
              </div>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}
                  >
                    <a
                      href={info.link}
                      target={info.link.startsWith("http") ? "_blank" : undefined}
                      rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-soft transition-all duration-300 group"
                    >
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1 font-serif text-lg">{info.title}</h3>
                        <p className="text-muted-foreground group-hover:text-primary transition-colors">{info.details}</p>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }} viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-glow border border-border sticky top-24">
                <h2 className="text-2xl md:text-3xl font-bold font-serif mb-2">Send an Inquiry</h2>
                <p className="text-muted-foreground mb-8">
                  Use this form to invite Brother Suresh, share a testimony, or request prayer.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="type" className="block text-sm font-bold text-foreground mb-2">Inquiry Type *</label>
                    <select
                      id="type" name="type" value={formData.type} onChange={handleChange}
                      className={`w-full bg-background border ${errors.type ? "border-destructive" : "border-input"} rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20`}
                    >
                      <option value="">Select an option...</option>
                      <option value="Event Booking/Invitation">Event Booking / Invitation</option>
                      <option value="Prayer Request">Prayer Request</option>
                      <option value="Testimony">Share a Testimony</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Partnership">Ministry Partnership</option>
                    </select>
                    {errors.type && <p className="text-destructive text-sm mt-1">{errors.type}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-foreground mb-2">Full Name *</label>
                      <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="John Doe" className={errors.name ? "border-destructive" : ""} />
                      {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-foreground mb-2">Phone Number</label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91..." className={errors.phone ? "border-destructive" : ""} />
                      {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2">Email Address *</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={errors.email ? "border-destructive" : ""} />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-foreground mb-2">Message / Request *</label>
                    <Textarea
                      id="message" name="message" value={formData.message} onChange={handleChange}
                      placeholder={formData.type === "Event Booking/Invitation" ? "Please provide event dates, location, and expected attendance..." : "How can we help you?"}
                      rows={5} className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                  </div>
                  <Button type="submit" disabled={submitEnquiry.isPending} className="w-full group bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg rounded-xl">
                    {submitEnquiry.isPending ? "Sending Message..." : (<>Submit Request <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>)}
                  </Button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── YouTube Channels Marquee ── */}
      <section className="py-16 bg-muted/40 overflow-hidden">
        <div className="container mx-auto px-4 mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mb-4">
              <Youtube size={14} />
              YouTube Channels
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Watch in Your Language</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Brother Suresh Babu's teachings are available in 6 languages. Drag or scroll to explore — click any card to subscribe.
            </p>
          </motion.div>
        </div>

        {/* Fade edges */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-muted/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-muted/40 to-transparent z-10 pointer-events-none" />
          <div className="px-4">
            <ChannelMarquee />
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">← drag to scroll →</p>
        </div>
      </section>

      {/* ── Social Media & Connect ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Globe size={14} />
              Stay Connected
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Follow the Ministry</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join the community across all platforms and stay updated with messages, events, and testimonies.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {socialLinks.map((s, i) => (
              <motion.a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200 group"
              >
                <div className={`p-2.5 rounded-xl ${s.color} text-white shrink-0`}>
                  <s.icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{s.hint}</p>
                  <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{s.label}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Direct contact pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <a href="tel:+914712725273" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card hover:bg-primary hover:text-white hover:border-primary transition-all text-sm font-medium">
              <Phone size={14} /> +91 471 272 5273
            </a>
            <a href="tel:+914712725274" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card hover:bg-primary hover:text-white hover:border-primary transition-all text-sm font-medium">
              <Phone size={14} /> +91 471 272 5274
            </a>
            <a href="mailto:sureshbabu@sureshbabu.org" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card hover:bg-primary hover:text-white hover:border-primary transition-all text-sm font-medium">
              <Mail size={14} /> sureshbabu@sureshbabu.org
            </a>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="h-64 md:h-96 w-full relative bg-gray-200">
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Map View" />
        <div className="absolute inset-0 flex items-center justify-center">
          <a href="https://maps.app.goo.gl/iGZT19JoaSkk8v2t5" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="bg-white text-blue-dark hover:bg-white/90 shadow-xl font-bold rounded-full">
              <MapPin className="mr-2" size={18} /> Open in Google Maps
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
