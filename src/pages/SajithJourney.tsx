import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown } from "lucide-react";

const SajithJourney = () => {
  const journeySteps = [
    {
      id: 1,
      title: "Return to Catholicism",
      year: "1999",
      description: "A profound spiritual journey led Sajith Joseph back to his Catholic roots after exploring various Christian denominations. This return was marked by a deep personal transformation and renewed commitment to his faith.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1470&auto=format&fit=crop",
      align: "left"
    },
    {
      id: 2,
      title: "Grace Community Global was founded",
      year: "2011",
      description: "Born out of a vision to create a platform that could unite various Christian denominations under a common goal of spiritual renewal and ecumenical unity. The organization was established to foster greater understanding and collaboration among believers.",
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1473&auto=format&fit=crop",
      align: "right"
    },
    {
      id: 3,
      title: "Establishment of the Tetelestai Centre",
      year: "2015",
      description: "The Tetelestai Centre was established as a hub for spiritual growth, community gathering, and religious education. The centre serves as a physical manifestation of the mission to bring people together in faith and understanding.",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1474&auto=format&fit=crop",
      align: "left"
    },
    {
      id: 4,
      title: "Global Outreach Initiatives",
      year: "2018",
      description: "Expansion of ministry through international retreats, missions, and digital outreach programs. Leveraging technology to spread the message globally and connect believers across continents through online sermons and interactive sessions.",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1470&auto=format&fit=crop",
      align: "right"
    },
    {
      id: 5,
      title: "Ecumenical Engagements",
      year: "Present",
      description: "Active participation in global ecumenical movements, interfaith dialogues, and collaborative initiatives that seek to heal divisions within the Christian church and promote a unified approach to worship, service, and community building.",
      image: "https://images.unsplash.com/photo-1509909756405-be0199881695?q=80&w=1470&auto=format&fit=crop",
      align: "left"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1470&auto=format&fit=crop"
            alt="Sajith Joseph"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20 shadow-glow">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1470&auto=format&fit=crop"
                alt="Sajith Joseph"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-sans mb-6"
          >
            Sajith's Journey
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            A life transformed by faith, dedicated to uniting believers across denominational boundaries and fostering spiritual renewal through grace and understanding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12"
          >
            <ChevronDown className="w-8 h-8 text-white/70 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-sans mb-6 text-foreground">
              A Path of Faith & Purpose
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              From personal spiritual transformation to founding a global movement of unity and renewal, 
              Sajith Joseph's journey reflects a deep commitment to bringing believers together in the 
              transformative message of Christ's love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 md:py-24 bg-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-sans text-foreground mb-4">
              Key Moments
            </h2>
            <p className="text-xl text-muted-foreground">
              Milestones that shaped a ministry of unity and grace
            </p>
          </motion.div>

          <div className="space-y-24 md:space-y-32">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col ${
                  step.align === "right" ? "md:flex-row-reverse" : "md:flex-row"
                } gap-8 md:gap-12 items-center`}
              >
                {/* Image Circle */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white shadow-glow">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0, x: step.align === "right" ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
                      <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                        {step.year}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-sans text-foreground mb-4">
                      {step.id}. {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-sans mb-6 text-foreground">
              Join the Journey
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              Be part of a community dedicated to spiritual unity, renewal, and the transformative 
              power of faith. Together, we can bridge denominational divides and celebrate Christ's love.
            </p>
            <motion.a
              href="/grace-community"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full shadow-glow hover:shadow-2xl transition-all duration-300"
            >
              Learn More About Grace Community
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SajithJourney;