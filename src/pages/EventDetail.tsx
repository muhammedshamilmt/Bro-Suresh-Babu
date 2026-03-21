import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Calendar, MapPin, Clock, Users, ArrowLeft, ArrowRight,
  Share2, Heart, CheckCircle2, Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEvent, usePublishedEvents } from "@/hooks/useEvents";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function accentBg(color: string) {
  if (color.includes("emerald")) return "bg-emerald-500";
  if (color.includes("violet")) return "bg-violet-600";
  if (color.includes("amber")) return "bg-amber-500";
  if (color.includes("rose")) return "bg-rose-500";
  if (color.includes("cyan")) return "bg-cyan-500";
  return "bg-blue-600";
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // heroRef must ALWAYS be in the DOM — never return early before this section renders
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { data: event, isLoading, isError } = useEvent(id);
  const { data: allEvents } = usePublishedEvents({ limit: 10 });
  const related = (allEvents?.data ?? []).filter((e) => e.id !== event?.id).slice(0, 2);

  // Not-found state — rendered AFTER the hooks above, no early return before heroRef
  if (!isLoading && (isError || !event)) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
          <Calendar className="w-16 h-16 text-muted-foreground/30" />
          <h1 className="text-2xl font-bold text-foreground">Event not found</h1>
          <p className="text-muted-foreground">This event may have ended or the link is incorrect.</p>
          <Link to="/events" className="mt-2 inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero — heroRef always mounted so useScroll never crashes */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          {event?.image
            ? <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            : <div className={`w-full h-full bg-gradient-to-br ${event?.color ?? "from-blue-600 to-indigo-700"}`} />}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full pb-12 px-4">
          <div className="max-w-5xl mx-auto">
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-white/20 rounded w-24 mb-6" />
                <div className="h-10 bg-white/20 rounded w-2/3" />
                <div className="h-4 bg-white/20 rounded w-1/2 mt-4" />
              </div>
            ) : event ? (
              <>
                <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
                  <button onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Events
                  </button>
                </motion.div>
                <motion.div variants={stagger} initial="hidden" animate="show">
                  <motion.div variants={fadeUp} custom={1} className="flex flex-wrap items-center gap-3 mb-4">
                    {event.type && <span className={`${accentBg(event.color)} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider`}>{event.type}</span>}
                    {event.tag && <span className="bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full">{event.tag}</span>}
                  </motion.div>
                  <motion.h1 variants={fadeUp} custom={2} className="text-4xl md:text-6xl font-bold text-white font-serif leading-tight mb-6 max-w-3xl">
                    {event.title}
                  </motion.h1>
                  <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-5 text-white/80 text-sm">
                    {event.date && <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-white/60" />{event.date}</span>}
                    {event.time && <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-white/60" />{event.time}</span>}
                    {event.location && <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-white/60" />{event.location}</span>}
                  </motion.div>
                </motion.div>
              </>
            ) : null}
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      {isLoading ? (
        <div className="max-w-5xl mx-auto px-4 py-16 space-y-5 animate-pulse">
          <div className="h-6 bg-muted rounded-xl w-2/3" />
          <div className="h-4 bg-muted rounded-xl w-full" />
          <div className="h-4 bg-muted rounded-xl w-5/6" />
          <div className="h-4 bg-muted rounded-xl w-4/6" />
        </div>
      ) : event ? (
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left */}
            <div className="lg:col-span-2 space-y-12">
              {event.longDescription && (
                <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  <motion.h2 variants={fadeUp} className="text-2xl font-bold text-foreground font-serif mb-5">About This Event</motion.h2>
                  {event.longDescription.split("\n\n").map((para, i) => (
                    <motion.p key={i} variants={fadeUp} custom={i} className="text-muted-foreground text-lg leading-relaxed mb-4">{para}</motion.p>
                  ))}
                </motion.section>
              )}

              {event.showHighlights && event.highlights.length > 0 && (
                <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  <motion.h2 variants={fadeUp} className="text-2xl font-bold text-foreground font-serif mb-5">Event Highlights</motion.h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {event.highlights.map((h, i) => (
                      <motion.div key={i} variants={fadeUp} custom={i} className="flex items-start gap-3 bg-muted/40 rounded-xl p-4 border border-border">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground font-medium">{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {event.showSchedule && event.schedule.length > 0 && (
                <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  <motion.h2 variants={fadeUp} className="text-2xl font-bold text-foreground font-serif mb-5">Schedule</motion.h2>
                  <div className="space-y-4">
                    {event.schedule.map((day, di) => (
                      <motion.div key={di} variants={fadeUp} custom={di} className="rounded-2xl border border-border overflow-hidden">
                        <div className={`bg-gradient-to-r ${event.color} px-5 py-3`}>
                          <p className="text-white font-bold text-sm">{day.day}</p>
                        </div>
                        <div className="bg-white divide-y divide-border">
                          {day.sessions.map((session, si) => (
                            <div key={si} className="flex items-center gap-3 px-5 py-3">
                              <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{session}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {event.showSpeakers && event.speakers.length > 0 && (
                <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  <motion.h2 variants={fadeUp} className="text-2xl font-bold text-foreground font-serif mb-5">Speakers</motion.h2>
                  <div className="flex flex-wrap gap-4">
                    {event.speakers.map((speaker, i) => (
                      <motion.div key={i} variants={fadeUp} custom={i}
                        className="flex items-center gap-4 bg-white border border-border rounded-2xl p-4 shadow-soft flex-1 min-w-[200px]">
                        {speaker.image
                          ? <img src={speaker.image} alt={speaker.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0 ring-2 ring-primary/20" />
                          : <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-lg">{speaker.name[0]}</div>}
                        <div>
                          <p className="font-bold text-foreground text-sm">{speaker.name}</p>
                          <p className="text-xs text-muted-foreground">{speaker.role}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl border border-border shadow-soft p-6 sticky top-24"
              >
                <div className={`w-full h-2 rounded-full bg-gradient-to-r ${event.color} mb-5`} />
                <h3 className="font-bold text-foreground text-lg mb-4">Join This Event</h3>

                <div className="space-y-3 mb-6 text-sm">
                  {event.date && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div><p className="font-semibold text-foreground">Date</p><p className="text-muted-foreground">{event.date}</p></div>
                    </div>
                  )}
                  {event.time && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div><p className="font-semibold text-foreground">Time</p><p className="text-muted-foreground">{event.time}</p></div>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div><p className="font-semibold text-foreground">Location</p><p className="text-muted-foreground">{event.location}</p></div>
                    </div>
                  )}
                  {event.type && (
                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div><p className="font-semibold text-foreground">Type</p><p className="text-muted-foreground">{event.type}</p></div>
                    </div>
                  )}
                </div>

                {event.registrationOpen ? (
                  <Link to={`/events/${event.id}/register`}
                    className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r ${event.color} text-white font-bold py-3.5 px-6 rounded-xl hover:opacity-90 transition-opacity shadow-md mb-3`}>
                    Register Now <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="w-full flex items-center justify-center bg-muted text-muted-foreground font-medium py-3.5 px-6 rounded-xl mb-3 text-sm cursor-not-allowed select-none">
                    Registration Closed
                  </div>
                )}

                <button className="w-full flex items-center justify-center gap-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 font-medium py-3 px-6 rounded-xl transition-colors text-sm">
                  <Share2 className="w-4 h-4" /> Share Event
                </button>
                <button className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-red-500 font-medium py-2.5 px-6 rounded-xl transition-colors text-sm mt-1">
                  <Heart className="w-4 h-4" /> Save to Favourites
                </button>
              </motion.div>
            </div>
          </div>

          {related.length > 0 && (
            <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mt-20 pt-12 border-t border-border">
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-foreground font-serif mb-8">Other Events</motion.h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((ev, i) => (
                  <motion.div key={ev.id} variants={fadeUp} custom={i}
                    className="group bg-white rounded-2xl border border-border shadow-soft overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-44 overflow-hidden">
                      {ev.image
                        ? <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        : <div className={`w-full h-full bg-gradient-to-br ${ev.color}`} />}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {ev.type && <span className={`absolute top-3 left-3 ${accentBg(ev.color)} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>{ev.type}</span>}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">{ev.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        {ev.date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{ev.date}</span>}
                        {ev.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{ev.location.split(",")[0]}</span>}
                      </div>
                      <Link to={`/events/${ev.id}`} className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all">
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      ) : null}

      <Footer />
    </div>
  );
}
