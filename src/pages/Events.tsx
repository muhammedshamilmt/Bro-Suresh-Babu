import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, ArrowRight, Loader2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePublishedEvents } from "@/hooks/useEvents";
import type { Event } from "@/lib/api";

// ─── Accent colour helper ─────────────────────────────────────────────────────
function accentBg(color: string) {
  if (color.includes("emerald")) return "bg-emerald-500";
  if (color.includes("violet")) return "bg-violet-600";
  if (color.includes("amber")) return "bg-amber-500";
  if (color.includes("rose")) return "bg-rose-500";
  if (color.includes("cyan")) return "bg-cyan-500";
  return "bg-blue-600";
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
function EventCardSkeleton() {
  return (
    <div className="bg-card w-full rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-start gap-6 border border-border animate-pulse">
      <div className="flex-shrink-0 w-32 h-20 bg-muted rounded-2xl" />
      <div className="flex-grow space-y-3 w-full">
        <div className="h-3 bg-muted rounded w-24" />
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    </div>
  );
}

const EVENT_TYPES = ["All Types", "Major Crusade", "Youth Camp", "Seminar", "International Mission", "Weekly Service", "Conference", "Retreat"];

const Events = () => {
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = usePublishedEvents({
    type: typeFilter === "All Types" ? undefined : typeFilter,
    search: search || undefined,
    limit: 20,
  });

  const events = data?.data ?? [];
  const featuredEvent = events[0];
  const upcomingEvents = events.slice(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <div className="min-h-screen p-3 ">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full rounded-[40px] h-[50vh] flex items-center justify-center bg-blue-dark">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1470&auto=format&fit=crop"
            alt="Events & Calendar"
            className="w-full h-full object-cover rounded-[40px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B2D3A]/90 via-[#0D3A4A]/80 to-[#071E28]/90 rounded-[40px]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white font-serif mb-6"
          >
            Events & Calendar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-8"
          >
            Join us in fellowship, worship, and spiritual growth
          </motion.p>
          {/* Search */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            onSubmit={handleSearch}
            className="flex gap-2 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search events..."
                className="w-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-white/50 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <button type="submit" className="bg-white text-blue-dark font-bold px-5 py-3 rounded-xl text-sm hover:bg-white/90 transition-colors">
              Search
            </button>
          </motion.form>
        </div>
      </section>

      {/* Featured Event Section */}
      {isLoading ? (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="h-[400px] bg-muted rounded-3xl animate-pulse" />
          </div>
        </section>
      ) : featuredEvent ? (
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4 text-blue-dark">Featured Event</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl overflow-hidden shadow-2xl border border-border flex flex-col md:flex-row relative group"
            >
              <div className="md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
                {featuredEvent.image
                  ? <img src={featuredEvent.image} alt={featuredEvent.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  : <div className={`absolute inset-0 bg-gradient-to-br ${featuredEvent.color}`} />}
                {featuredEvent.type && (
                  <div className="absolute top-6 left-6 bg-primary text-white font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    {featuredEvent.type}
                  </div>
                )}
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                <h3 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-foreground">{featuredEvent.title}</h3>
                <div className="space-y-4 mb-8">
                  {featuredEvent.date && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-lg font-medium">{featuredEvent.date}</span>
                    </div>
                  )}
                  {featuredEvent.time && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-lg font-medium">{featuredEvent.time}</span>
                    </div>
                  )}
                  {featuredEvent.location && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-lg font-medium">{featuredEvent.location}</span>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 line-clamp-3">
                  {featuredEvent.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={`/events/${featuredEvent.id}`} className="flex-1 bg-primary text-white font-bold py-4 px-8 rounded-full hover:bg-primary/90 transition-colors shadow-glow text-center">
                    View Details
                  </Link>
                  {featuredEvent.registrationOpen && (
                    <Link to={`/events/${featuredEvent.id}/register`} className="flex-1 border-2 border-primary text-primary font-bold py-4 px-8 rounded-full hover:bg-primary/5 transition-colors text-center">
                      Register Now
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 bg-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-blue-dark mb-4 md:mb-0">
              {search ? `Results for "${search}"` : "Upcoming Events"}
            </h2>
            <div className="flex gap-2 flex-wrap">
              {EVENT_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${typeFilter === t
                      ? "bg-blue-dark text-white shadow-sm"
                      : "bg-white border border-border text-muted-foreground hover:border-blue-dark/40"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <EventCardSkeleton key={i} />)
              : upcomingEvents.length === 0 && !featuredEvent
                ? (
                  <div className="py-20 text-center text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="font-semibold text-lg">No events found</p>
                    <p className="text-sm mt-1">Check back soon for upcoming events.</p>
                  </div>
                )
                : upcomingEvents.map((event, i) => (
                  <EventListCard key={event.id} event={event} index={i} />
                ))}
          </div>

          {!isLoading && events.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-semibold text-lg">No events found</p>
              <p className="text-sm mt-1">Check back soon for upcoming events.</p>
            </div>
          )}
        </div>
      </section>

      {/* Partner CTA */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <Users className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6">Partner With Us</h2>
          <p className="text-xl md:text-2xl opacity-90 mb-10">
            Support the ministry through prayer, volunteering, or financial contributions as we reach the nations.
          </p>
          <Link to="/contact" className="bg-white text-primary font-bold text-lg py-4 px-10 rounded-full hover:bg-white/90 shadow-glow transition-all inline-block">
            Become a Partner
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

function EventListCard({ event, index }: { event: Event; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="bg-card w-full rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-glow border border-border transition-all group"
    >
      {/* Date Block */}
      <div className="flex-shrink-0 text-center lg:w-32 py-4 px-6 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors">
        <span className="block text-primary font-bold text-sm uppercase tracking-wider mb-1">
          {event.date?.split(" ")[0] || "Upcoming"}
        </span>
        <span className="block text-3xl font-bold font-serif text-foreground">
          {event.date?.split(" ")[1]?.replace(/\D/g, "") || "—"}
        </span>
      </div>

      {/* Details */}
      <div className="flex-grow">
        {event.type && (
          <div className="inline-block bg-accent/10 text-accent text-sm font-bold px-3 py-1 rounded-full mb-3">
            {event.type}
          </div>
        )}
        <h3 className="text-2xl font-bold font-serif mb-2 text-foreground group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
          {event.time && <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.time}</span>}
          {event.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>}
        </div>
        {event.description && (
          <p className="text-muted-foreground max-w-2xl line-clamp-2">{event.description}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex flex-col gap-2 w-full lg:w-auto">
        <Link to={`/events/${event.id}`}
          className="flex items-center justify-center gap-2 bg-background border border-border hover:border-primary hover:text-primary font-bold py-3 px-6 rounded-full transition-all text-sm">
          View Details <ArrowRight className="w-4 h-4" />
        </Link>
        {event.registrationOpen && (
          <Link to={`/events/${event.id}/register`}
            className={`flex items-center justify-center gap-2 bg-gradient-to-r ${event.color} text-white font-bold py-3 px-6 rounded-full transition-all text-sm hover:opacity-90`}>
            Register <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default Events;
