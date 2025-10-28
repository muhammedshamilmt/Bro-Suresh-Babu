import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Church, Heart, Gift, Mountain, Globe2, Wifi } from "lucide-react";
import Navbar from "@/components/Navbar";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import { TestimonialSection } from "@/components/ui/testimonials";
import Video from "@/components/Video";
import Footer from "@/components/Footer";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Count-up animation for stats
  const [counts, setCounts] = useState({
    people: 0,
    sessions: 0,
    years: 0,
    countries: 0,
  });

  useEffect(() => {
    const targets = {
      people: 100,
      sessions: 1000,
      years: 15,
      countries: 6,
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        people: Math.floor(targets.people * progress),
        sessions: Math.floor(targets.sessions * progress),
        years: Math.floor(targets.years * progress),
        countries: Math.floor(targets.countries * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const milestones = [
    {
      year: "2010",
      title: "Ministry Begins",
      description: "Started spreading the gospel with humble beginnings",
    },
    {
      year: "2013",
      title: "First International Mission",
      description: "Expanded ministry to neighboring countries",
    },
    {
      year: "2018",
      title: "Grace Community Global Established",
      description: "Officially founded the global ministry network",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Reached thousands through online platforms",
    },
    {
      year: "2023",
      title: "Tetelestai Centre Opens",
      description: "Opened our first dedicated ministry center",
    },
  ];

  const mediaItems = [
    {
      id: 1,
      type: "image",
      title: "Community Gathering",
      desc: "United in faith and fellowship",
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1470&auto=format&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 2,
      type: "image",
      title: "Worship Service",
      desc: "Praising together in spirit",
      url: "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=1470&auto=format&fit=crop",
      span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 3,
      type: "image",
      title: "Prayer Meeting",
      desc: "Seeking God's presence together",
      url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1470&auto=format&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 4,
      type: "image",
      title: "Youth Ministry",
      desc: "Empowering the next generation",
      url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1469&auto=format&fit=crop",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 5,
      type: "image",
      title: "Community Outreach",
      desc: "Serving with love and compassion",
      url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1470&auto=format&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 6,
      type: "image",
      title: "Mission Trip",
      desc: "Spreading the gospel worldwide",
      url: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1470&auto=format&fit=crop",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
  ];

  const testimonialsData = [
    {
      id: 1,
      quote:
        "Brother Sajith's teachings have transformed my understanding of God's grace. His messages bring clarity and hope to my spiritual journey.",
      name: "Sarah Johnson",
      role: "Community Leader",
      imageSrc: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 2,
      quote:
        "The ministry's focus on unity and grace has helped our church community grow closer to Christ and to each other. Truly life-changing!",
      name: "Michael Chen",
      role: "Pastor",
      imageSrc: "https://images.unsplash.com/photo-1690407617542-2f210cf20d7e?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 3,
      quote:
        "Through Sajith's mentorship, I've discovered my purpose in serving God's kingdom. His wisdom and compassion inspire me daily.",
      name: "Emily Rodriguez",
      role: "Youth Minister",
      imageSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1470&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] flex items-center justify-center bg-background">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1470&auto=format&fit=crop"
            alt="About Grace Community Global"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white font-sans mb-6"
          >
            About Grace Community Global
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90"
          >
            Spreading God's grace and love across the nations
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-glow">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1470&auto=format&fit=crop"
                  alt="Sajith Joseph - Grace Community Global"
                  className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-sans mb-6 text-foreground">
                Mission & Vision
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                The mission of Grace Community Global is to promote spiritual unity and renewal among Christians from diverse backgrounds. We aim to bridge denominational divides and foster a deeper understanding of faith through shared teachings and communal experiences.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our vision is to establish a Christian community that is cohesive and supportive, surpassing traditional boundaries, where we celebrate and embody the core message of Christ's love and the transformative power of the gospel.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History & Founding Section */}
      <section className="py-16 md:py-24 bg-accent/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-sans mb-6 text-foreground">
                History & Founding
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Brother Sajith Joseph founded Grace Community Global in 2011 after a significant personal and spiritual transformation that reaffirmed his commitment to his Catholic roots.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The organisation was born out of a vision to create a platform that could unite various Christian denominations under a common goal of spiritual renewal and ecumenical unity. Inspired by the fragmentation he observed within the Christian faith, Sajith established this community to foster greater understanding and collaboration among believers.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group order-1 md:order-2"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-accent/30 to-primary/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-glow">
                <img
                  src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1473&auto=format&fit=crop"
                  alt="Grace Community Global Founding"
                  className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <Video />

      {/* Sajith's Journey and Vision Section */}
      <section id="journey" className="py-16 md:py-24 bg-accent/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-sans mb-12 text-center text-foreground"
          >
            Sajith's Journey and Vision for Global Unity
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-accent/30 to-primary/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-glow">
                <img
                  src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1474&auto=format&fit=crop"
                  alt="Sajith Joseph's Journey"
                  className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold font-sans mb-6 text-foreground">
                A Journey of Faith
              </h3>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Brother Sajith Joseph's ministry journey began with a profound encounter with God's grace. Called to preach the gospel at a young age, he has dedicated his life to helping believers understand the depth of God's love and the power of living in grace.
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Through years of ministry, Sajith has witnessed countless lives transformed by the gospel. His teaching emphasizes the three foundational pillars: the Cross of Christ, the Grace of God, and the Unity of believers.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                His vision for global unity is rooted in Ephesians 4:3 - "Make every effort to keep the unity of the Spirit through the bond of peace." He believes that when believers walk in grace and unity, the world will see the authentic love of Christ.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section ref={ref} className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-sans mb-12 text-center text-foreground"
          >
            Ministry Milestones
          </motion.h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="bg-card p-6 rounded-xl shadow-soft hover:shadow-glow transition-shadow duration-300 border border-border/50">
                    <div className="text-primary text-xl font-bold mb-2 font-sans">{milestone.year}</div>
                    <h3 className="text-xl font-bold mb-2 font-sans text-foreground">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2 font-sans">
                {counts.people}+
              </div>
              <div className="text-lg md:text-xl text-primary-foreground/80">People</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2 font-sans">
                {counts.sessions}+
              </div>
              <div className="text-lg md:text-xl text-primary-foreground/80">Sessions</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2 font-sans">
                {counts.years}+
              </div>
              <div className="text-lg md:text-xl text-primary-foreground/80">Years</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2 font-sans">
                {counts.countries}+
              </div>
              <div className="text-lg md:text-xl text-primary-foreground/80">Countries</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-sans mb-4 text-foreground">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive ministry programs designed to nurture faith and build community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Church,
                title: "Weekly Services",
                description: "Regular worship services that blend traditional and contemporary Christian practices to cater to a diverse congregation.",
              },
              {
                icon: Heart,
                title: "Community Outreach",
                description: "Various outreach programs that address social, educational, and spiritual needs within local communities, including food drives, educational workshops, and counselling services.",
              },
              {
                icon: Gift,
                title: "Special Events",
                description: "Frequent events such as seminars, conferences, and retreats that focus on theological education, spiritual growth, and community building.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-card rounded-2xl p-8 border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-glow"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-2xl bg-primary/10">
                    <service.icon className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold font-sans text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-16 md:py-24 bg-accent/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-sans mb-4 text-foreground">
              Global Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Grace Community Global has extended its reach beyond local communities to have a profound global impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Mountain,
                title: "Retreats and Missions",
                description: "The organization conducts retreats that offer spiritual renewal and personal growth, as well as missions that provide aid and spiritual support in underserved regions around the world.",
              },
              {
                icon: Globe2,
                title: "Ecumenical Initiatives",
                description: "Active participation in global ecumenical movements that seek to heal divisions within the Christian church and promote a unified approach to worship and service.",
              },
              {
                icon: Wifi,
                title: "Digital Outreach",
                description: "Leveraging technology to spread its message through online sermons, teachings, and interactive sessions that connect individuals globally, fostering a worldwide community of faith.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-card rounded-2xl p-8 border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-glow"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-2xl bg-primary/10">
                    <service.icon className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold font-sans text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-background">
        <InteractiveBentoGallery
          mediaItems={mediaItems}
          title="Ministry Gallery"
          description="Moments that capture our journey of faith and unity"
        />
      </section>

      {/* Testimonials Section */}
      <TestimonialSection
        title="See What All the Talk Is About!"
        subtitle="Transformative experiences from believers around the globe"
        testimonials={testimonialsData}
      />

      <Footer />
    </div>
  );
};

export default About;
