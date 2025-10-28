import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Church, Heart, Gift, Mountain, Globe2, Wifi } from "lucide-react";
import Navbar from "@/components/Navbar";
import Video from "@/components/Video";
import Footer from "@/components/Footer";

const GraceCommunity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] flex items-center justify-center bg-background">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1473&auto=format&fit=crop"
            alt="Grace Community Global"
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
            Grace Community Global
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90"
          >
            Uniting believers across denominational boundaries
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
                  src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1474&auto=format&fit=crop"
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

      {/* Featured Image Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative overflow-hidden rounded-3xl shadow-glow">
              <img
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1470&auto=format&fit=crop"
                alt="Community Gathering"
                className="w-full h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white font-sans mb-4">
                  Building Communities of Faith
                </h3>
                <p className="text-lg text-white/90 max-w-2xl">
                  United in purpose, diverse in expression, grounded in grace
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section ref={ref} className="py-16 md:py-24 bg-accent/10">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      <Footer />
    </div>
  );
};

export default GraceCommunity;
