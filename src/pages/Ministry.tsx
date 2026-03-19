import { motion } from "framer-motion";
import { Globe2, Users, BookOpen, Heart, Radio, MapPin, Target, MonitorPlay } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { TestimonialSection } from "@/components/ui/testimonials";

const Ministry = () => {
  const focusAreas = [
    {
      icon: Users,
      title: "Gospel Crusades",
      description: "Large-scale evangelical campaigns reaching thousands with messages of salvation, hope, and healing.",
    },
    {
      icon: BookOpen,
      title: "Seminars & Training",
      description: "In-depth teaching and training programs equipping church leaders and pastors worldwide.",
    },
    {
      icon: Heart,
      title: "Youth Camps",
      description: "Engaging the next generation in faith to build a strong, unwavering spiritual foundation.",
    },
    {
      icon: Target,
      title: "Church Leadership",
      description: "Serving as Senior Pastor of Christ Centre, Trivandrum, leading by example in pastoral care.",
    },
  ];

  const mediaOutlets = [
    {
      icon: MonitorPlay,
      title: "Television",
      description: "Broadcasted on South American TV Channels, reaching audiences across 52+ nations.",
    },
    {
      icon: Radio,
      title: "Radio Broadcasts",
      description: "National and international radio programs delivering timely Gospel messages.",
    },
    {
      icon: Globe2,
      title: "Digital Presence",
      description: "An expanding online presence connecting believers and distributing digital sermon notes.",
    },
  ];

  const denominations = [
    "Pentecostal Churches",
    "Charismatic Movements",
    "Church of South India (CSI)",
    "Mainstream Denominations",
    "Non-denominational Fellowships",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center bg-blue-dark">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1474&auto=format&fit=crop"
            alt="Ministry & Work"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-blue-dark/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white font-serif mb-6"
          >
            Ministry & Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90"
          >
            A diverse, global footprint driven by Gospel truth
          </motion.p>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4 text-blue-dark">
              Core Focus Areas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Equipping leaders, reaching the lost, and building up the Church through diverse avenues.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 border border-border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <area.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-serif mb-3 text-foreground">{area.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Reach Section */}
      <section className="py-16 md:py-24 bg-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 text-blue-dark">
                Global Geographic Reach
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Bro. Suresh Babu's ministry breaks geographical boundaries, impacting lives from local 
                villages in India to massive conventions in South America.
              </p>
              
              <div className="space-y-6">
                <div className="bg-card p-6 rounded-xl border border-border flex gap-4 items-start shadow-sm">
                  <MapPin className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">National Reach (India)</h4>
                    <p className="text-muted-foreground text-sm">
                      Active presence in 19 states with a deep emphasis on South India (Kerala, Tamil Nadu) 
                      and rapid expansion into Northern and Eastern regions.
                    </p>
                  </div>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border flex gap-4 items-start shadow-sm">
                  <Globe2 className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">International Reach</h4>
                    <p className="text-muted-foreground text-sm mb-2">
                      Spanning 25+ nations globally, including major footprints in:
                    </p>
                    <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground font-medium">
                      <li>• Argentina (1200+ churches)</li>
                      <li>• Brazil</li>
                      <li>• Uruguay</li>
                      <li>• South America</li>
                      <li>• Europe</li>
                      <li>• 20+ other countries</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-square sm:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1470&auto=format&fit=crop"
                alt="Global Ministry Reach"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-serif font-bold text-2xl">
                  Touching the ends of the Earth.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Media & Denominations */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Media Ministry */}
            <div>
              <h2 className="text-3xl font-bold font-serif mb-8 text-blue-dark">Media Ministry</h2>
              <div className="space-y-6">
                {mediaOutlets.map((media, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <media.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{media.title}</h4>
                      <p className="text-sm text-muted-foreground">{media.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Denominational Acceptance */}
            <div className="bg-card p-8 rounded-3xl border border-border shadow-soft">
              <h2 className="text-3xl font-bold font-serif mb-6 text-blue-dark">Unifying the Church</h2>
              <p className="text-muted-foreground mb-6">
                Bro. Suresh Babu is known for his widespread denominational acceptance, uniting believers 
                from all backgrounds under the banner of Christ.
              </p>
              <ul className="space-y-3">
                {denominations.map((denom, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-lg font-medium"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {denom}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Impact Stats/Testimonials */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6">Real Ministry Impact</h2>
          <p className="text-lg md:text-xl opacity-90 mb-12">
            "Thousands converted to Christianity. Churches revitalized. Leaders trained and mentored. 
            Families restored. Lives transformed."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-8 py-3 bg-white text-primary hover:bg-white/90 rounded-full font-bold transition-colors">
              Invite for Your Event
            </a>
            <a href="/events" className="px-8 py-3 border border-white text-white hover:bg-white/10 rounded-full font-bold transition-colors">
              View Upcoming Events
            </a>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
};

export default Ministry;
