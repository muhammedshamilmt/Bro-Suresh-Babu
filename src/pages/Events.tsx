import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

const Events = () => {
  const featuredEvent = {
    title: "Global Grace Convention 2024",
    date: "November 15-18, 2024",
    time: "9:00 AM - 9:00 PM Daily",
    location: "Trivandrum International Stadium, Kerala",
    description: "Join us for four days of powerful worship, transformative teaching, and miraculous healing. Bro. Suresh Babu will be sharing deep revelations on the finished work of the cross, alongside international guest speakers. This convention is expected to gather over 50,000 believers from across India and around the globe.",
    image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1474&auto=format&fit=crop",
    type: "Major Crusade",
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "Youth Empowerment Camp",
      date: "December 5-7, 2024",
      time: "10:00 AM",
      location: "Grace Retreat Centre, Munnar",
      type: "Youth Camp",
      description: "A three-day intensive spiritual retreat for young adults focusing on purpose, purity, and passion for Christ.",
    },
    {
      id: 2,
      title: "Pastors & Leaders Seminar",
      date: "January 12, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Christ Centre, Trivandrum",
      type: "Seminar",
      description: "Equipping church leaders with Biblical tools for effective ministry, counseling, and church growth in the modern era.",
    },
    {
      id: 3,
      title: "South American Gospel Tour",
      date: "March 1-15, 2025",
      time: "Multi-city Tour",
      location: "Argentina & Brazil",
      type: "International Mission",
      description: "A two-week tour across major South American cities, partnering with local churches for city-wide gospel crusades.",
    },
    {
      id: 4,
      title: "Sunday Healing Service",
      date: "Every Sunday",
      time: "9:00 AM & 11:30 AM",
      location: "Christ Centre, Trivandrum",
      type: "Weekly Service",
      description: "Weekly gathering featuring powerful worship, anointed preaching by Bro. Suresh Babu, and a special time for prayer and healing.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] flex items-center justify-center bg-blue-dark">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1470&auto=format&fit=crop"
            alt="Events & Calendar"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-dark to-blue-dark/50" />
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
            className="text-xl md:text-2xl text-white/90"
          >
            Join us in fellowship, worship, and spiritual growth
          </motion.p>
        </div>
      </section>

      {/* Featured Event Section */}
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
              <img 
                src={featuredEvent.image} 
                alt={featuredEvent.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 bg-primary text-white font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                {featuredEvent.type}
              </div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
              <h3 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-foreground">{featuredEvent.title}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-medium">{featuredEvent.date}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-medium">{featuredEvent.time}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-medium">{featuredEvent.location}</span>
                </div>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {featuredEvent.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-primary text-white font-bold py-4 px-8 rounded-full hover:bg-primary/90 transition-colors shadow-glow text-center">
                  Register Now
                </button>
                <button className="flex-1 border-2 border-primary text-primary font-bold py-4 px-8 rounded-full hover:bg-primary/5 transition-colors text-center">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Calendar */}
      <section className="py-16 md:py-24 bg-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-blue-dark mb-4 md:mb-0">
              Upcoming Events Calendar
            </h2>
            <div className="flex gap-2">
              <select className="bg-white border border-border rounded-lg px-4 py-2 outline-none cursor-pointer">
                <option>All Types</option>
                <option>Crusades</option>
                <option>Seminars</option>
                <option>Camps</option>
                <option>Services</option>
              </select>
              <select className="bg-white border border-border rounded-lg px-4 py-2 outline-none cursor-pointer">
                <option>All Locations</option>
                <option>India</option>
                <option>International</option>
                <option>Online</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card w-full rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-glow border border-border transition-all group"
              >
                {/* Date Block */}
                <div className="flex-shrink-0 text-center lg:w-32 py-4 px-6 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors">
                  <span className="block text-primary font-bold text-sm uppercase tracking-wider mb-1">
                    {event.date.split(" ")[0] || "Every"}
                  </span>
                  <span className="block text-3xl font-bold font-serif text-foreground">
                    {event.date.split(" ")[1]?.replace(/\D/g,'') || "Sun"}
                  </span>
                </div>

                {/* Event Details */}
                <div className="flex-grow">
                  <div className="inline-block bg-accent/10 text-accent text-sm font-bold px-3 py-1 rounded-full mb-3">
                    {event.type}
                  </div>
                  <h3 className="text-2xl font-bold font-serif mb-2 text-foreground group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
                  </div>
                  <p className="text-muted-foreground max-w-2xl line-clamp-2">
                    {event.description}
                  </p>
                </div>

                {/* Keep Arrow aligned */}
                <div className="flex-shrink-0 w-full lg:w-auto mt-4 lg:mt-0">
                  <button className="w-full lg:w-auto flex items-center justify-center gap-2 bg-background border border-border hover:border-primary hover:text-primary font-bold py-3 px-6 rounded-full transition-all group-hover:shadow-sm">
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="text-primary font-bold text-lg hover:underline underline-offset-4">
              Load More Events...
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <Users className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6">Partner With Us</h2>
          <p className="text-xl md:text-2xl opacity-90 mb-10">
            Support the ministry through prayer, volunteering, or financial contributions as we reach the nations.
          </p>
          <button className="bg-white text-primary font-bold text-lg py-4 px-10 rounded-full hover:bg-white/90 shadow-glow transition-all">
            Become a Partner
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
