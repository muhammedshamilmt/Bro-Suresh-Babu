import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Church, Heart, Gift } from "lucide-react";
import Navbar from "@/components/Navbar";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import { TestimonialSection } from "@/components/ui/testimonials";
import Video from "@/components/Video";
import Footer from "@/components/Footer";
import family from "@/assets/family.png";

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
      title: "Sajith and Reshma",
      desc: "Partnering in ministry and family life",
      url: "https://sajithjoseph.org/wp-content/uploads/2024/08/sajithwife-650x572.jpg",
      span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 2,
      type: "image",
      title: "Joseph Children",
      desc: "Joyful moments with the Joseph family",
      url: "https://sajithjoseph.org/wp-content/uploads/2024/08/sajithkids-650x572.jpg",
      span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 3,
      type: "image",
      title: "Family Gathering",
      desc: "Celebrating faith and togetherness",
      url: "https://sajithjoseph.org/wp-content/uploads/2024/08/sajithfamily1-650x572.jpg",
      span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 4,
      type: "image",
      title: "Grace Community",
      desc: "Standing united in purpose",
      url: "https://sajithjoseph.org/wp-content/uploads/2024/08/sajithfamily-650x572.jpg",
      span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 5,
      type: "image",
      title: "Ministry Moments",
      desc: "Sharing the gospel with passion",
      url: "https://sajithjoseph.org/wp-content/uploads/2024/08/sajith3-650x572.jpg",
      span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 6,
      type: "image",
      title: "Sajith Joseph",
      desc: "A shepherd devoted to the gospel",
      url: "https://sajithjoseph.org/wp-content/uploads/2024/08/sajith-650x572.jpg",
      span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 7,
      type: "image",
      title: "Reshma Joseph",
      desc: "Grace-filled leadership and care",
      url: "https://sajithjoseph.org/wp-content/uploads/2024/08/reshma-650x572.jpg",
      span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 8,
      type: "image",
      title: "GCTV Broadcast",
      desc: "Reaching hearts through media",
      url: "https://sajithjoseph.org/wp-content/uploads/2024/08/gctvcovernew-650x572.jpg",
      span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 9,
      type: "image",
      title: "Broadcast Studio",
      desc: "Preparing messages of hope",
      url: "https://sajithjoseph.org/wp-content/uploads/2024/08/gctvcover-650x572.jpg",
      span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 10,
      type: "image",
      title: "Worship Service",
      desc: "Gathered in praise and worship",
      url: "https://sajithjoseph.org/wp-content/uploads/2024/08/ddd-650x572.jpg",
      span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 11,
      type: "image",
      title: "Ministry Vision",
      desc: "Looking ahead with faith",
      url: "https://sajithjoseph.org/wp-content/uploads/2024/08/coverabout-650x572.jpg",
      span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 12,
      type: "image",
      title: "Grace Initiatives",
      desc: "Serving communities with compassion",
      url: "https://sajithjoseph.org/wp-content/uploads/2024/08/donatecover-650x572.jpg",
      span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 13,
      type: "image",
      title: "Prayer Ministry",
      desc: "Imparting blessings and intercession",
      url: "https://sajithjoseph.org/wp-content/uploads/2024/08/sajithandson.jpg",
      span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
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
                  src="https://sajithjoseph.org/wp-content/uploads/elementor/thumbs/sajith-718x960-1-qsw0wkkus10xqznazer1n06bsm201p1t10511iv53g.jpg"
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
                  src="https://i.ytimg.com/vi/uTEsxMukwis/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAC2v8ce0iwPwQnaIfKVJrijYt4kA"
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
                  src="https://img.freepik.com/free-photo/person-with-books-digital-art-style-education-day_23-2151164365.jpg?t=st=1761665859~exp=1761669459~hmac=6b6e0f3b6a9b77699e9a2a8348023fedfd404acb32b75100d54531dd92973647&w=1480"
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

      <section className="py-16 md:py-24 bg-accent/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-sans mb-4 text-foreground">
              About Sajith Joseph
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A glimpse into the roots and spiritual journey that shaped his calling.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full  rounded-2xl p-8 border border-border/50  transition-shadow duration-300"
          >
            <div className="absolute  pointer-events-none" />
            <div className="relative grid gap-10">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold font-sans text-foreground">
                  Early Life & Background
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sajith Joseph was born and raised in a devout Roman Catholic family in Kerala, India. The Catholic Church immersed him in its teachings and traditions from a young age, nurturing a profound reverence for faith and community.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As he grew older, his quest for deeper spiritual understanding led him to explore various Christian denominations and eventually embrace Pentecostalism, where he felt a compelling call to preach and lead. His early experiences as a pastor were marked by vibrant preaching and an unwavering dedication to spiritual service, laying the groundwork for his future endeavours.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-2  opacity-50 pointer-events-none" />
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={family}
                    alt="Portrait representing Sajith Joseph"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
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
