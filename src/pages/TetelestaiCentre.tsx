import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Users, UsersRound, HeartHandshake, Bed, Utensils, Trees, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { TestimonialSection } from "@/components/ui/testimonials";
import Footer from "@/components/Footer";

const TetelestaiCentre = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoUrl = isVideoPlaying
    ? "https://www.youtube.com/embed/sSEIOQMtHSc?autoplay=1&mute=1"
    : "https://www.youtube.com/embed/sSEIOQMtHSc";

  const retreatPrograms = [
    {
      icon: Sparkles,
      title: "Spiritual Renewal Retreats",
      description: "Focused on rejuvenating the spirit and deepening one's relationship with God through guided prayer sessions, meditative practices, and scriptural studies.",
      gradient: "from-primary/20 to-accent/20",
    },
    {
      icon: Users,
      title: "Leadership Spiritual Retreats",
      description: "Aimed at church leaders and community influencers, these retreats emphasise skills and insights necessary for effective spiritual guidance and leadership.",
      gradient: "from-accent/20 to-primary/20",
    },
    {
      icon: HeartHandshake,
      title: "Family Retreats",
      description: "Designed to strengthen family bonds through shared worship experiences and family-oriented biblical teachings.",
      gradient: "from-primary/20 to-accent/20",
    },
    {
      icon: UsersRound,
      title: "Youth Retreats",
      description: "Engaging programs tailored for younger participants, focussing on the challenges and spiritual questions pertinent to younger demographics.",
      gradient: "from-accent/20 to-primary/20",
    },
  ];

  const facilities = [
    {
      icon: Bed,
      title: "Accommodations",
      description: "Comfortable lodging options ranging from private rooms to shared dormitories, all designed to provide a restful stay.",
    },
    {
      icon: Utensils,
      title: "Dining Services",
      description: "On-site dining features nutritious meals prepared to nourish the body and soul.",
    },
    {
      icon: Trees,
      title: "Recreational Areas",
      description: "Peaceful gardens, walking paths, and quiet areas for personal reflection and meditation.",
    },
    {
      icon: Building2,
      title: "Conference Rooms",
      description: "Well-equipped spaces for workshops, seminars, and group activities.",
    },
  ];

  const testimonialsData = [
    {
      id: 1,
      quote: "The Tetelestai Centre provided the perfect sanctuary for my spiritual renewal. The peaceful atmosphere and guided sessions helped me reconnect with God in profound ways.",
      name: "Rebecca Thompson",
      role: "Retreat Participant",
      imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 2,
      quote: "As a church leader, the leadership retreat at Tetelestai Centre equipped me with invaluable insights and renewed my passion for ministry. Truly transformative!",
      name: "Pastor David Chen",
      role: "Church Leader",
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 3,
      quote: "Our family retreat brought us closer together and closer to God. The facilities are excellent and the programs are thoughtfully designed for all ages.",
      name: "Maria Santos",
      role: "Family Retreat Attendee",
      imageSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero/Mission Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-background overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1464&auto=format&fit=crop"
            alt="Tetelestai Centre"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <p className="text-lg md:text-xl text-primary font-semibold mb-4 tracking-wider uppercase">
                Our Mission
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white font-sans mb-8">
                Tetelestai Centre
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-white/90"
            >
              <p className="text-xl md:text-2xl leading-relaxed">
                The Tetelestai Centre is a foundational extension of Grace Community Global, dedicated to providing a serene and transformative environment for spiritual growth and renewal.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Located in a peaceful setting, the centre offers a place for individuals and groups to retreat from the daily stresses of life and engage in deep spiritual reflection and communion.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Its purpose is to facilitate personal development, spiritual well-being, and communal harmony through structured retreat programs grounded in Christian teaching.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Full Width Video Section */}
      <section className="relative w-full h-[70vh] bg-background overflow-hidden">
        <div className="absolute inset-0">
          <iframe
            className="w-full h-full"
            src={videoUrl}
            title="Tetelestai Centre Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ pointerEvents: isVideoPlaying ? "auto" : "none" }}
          />
          {!isVideoPlaying && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent to-primary/20 opacity-90 pointer-events-none" />
          )}
        </div>

        {!isVideoPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm group cursor-pointer hover:bg-black/50 transition-all duration-300"
            onClick={() => setIsVideoPlaying(true)}
          >
            <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className="relative">
              <div className="absolute inset-0 bg-primary rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="relative p-8 rounded-full bg-primary text-primary-foreground shadow-2xl">
                <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.div>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVideoPlaying ? 0 : 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center px-4"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white font-sans mb-4 drop-shadow-lg">
              Experience the Transformation
            </h2>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
              Take a virtual tour of our peaceful sanctuary
            </p>
          </motion.div>
        </div>
      </section>

      {/* Retreat Programs Section */}
      <section ref={ref} className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-sans mb-6 text-foreground">
              Retreat Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tetelestai Centre offers a variety of retreat programs designed to cater to different spiritual needs and objectives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {retreatPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${program.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-glow transition-all duration-500 h-full border border-border/50">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <program.icon className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold font-sans mb-4 text-foreground">
                        {program.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities and Amenities Section */}
      <section className="py-16 md:py-24 bg-accent/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-sans mb-6 text-foreground">
              Facilities and Amenities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The Tetelestai Centre boasts amenities that aim to elevate the retreat experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-glow transition-all duration-500 h-full border border-border/50 flex flex-col items-center text-center">
                  <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-6">
                    <facility.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-sans mb-4 text-foreground">
                    {facility.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-sans mb-6 text-foreground">
              Centre Gallery
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover the peaceful surroundings of Tetelestai Centre
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=1473&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1470&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1471&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=1426&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1474&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1470&auto=format&fit=crop",
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-2xl shadow-soft hover:shadow-glow transition-all duration-500"
              >
                <img
                  src={image}
                  alt={`Tetelestai Centre ${index + 1}`}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <TestimonialSection
        title="Transformative Experiences"
        subtitle="Hear from those who have experienced the peace and renewal at Tetelestai Centre"
        testimonials={testimonialsData}
      /> */}

      <Footer />
    </div>
  );
};

export default TetelestaiCentre;
