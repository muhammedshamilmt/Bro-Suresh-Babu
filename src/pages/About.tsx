import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Play, BookOpen, MapPin, Heart, GraduationCap, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";

const AboutVideo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (isInView && !src) {
      // Small delay lets the browser settle before injecting autoplay iframe
      const t = setTimeout(() => {
        setSrc(
          "https://www.youtube.com/embed/YfDEbDLrpN4?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
        );
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isInView, src]);

  return (
    <section ref={ref} className="py-16 px-3">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#0C647F]/15 border border-[#0C647F]/30 flex items-center justify-center">
              <Play size={14} className="text-[#0C647F] ml-0.5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0C647F]">See Youtube Channel</span>
          </div>

          <div className="relative rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-black/[0.08] aspect-video bg-black w-full">
            {src && (
              <iframe
                key={src}
                className="absolute inset-0 w-full h-full"
                src={src}
                title="Brother Suresh Babu Ministry"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-4">
            A glimpse into the life and ministry of Brother Suresh Babu
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const location = useLocation();

  // Scroll to #gallery when navigated from Landing "See Full Gallery"
  useEffect(() => {
    if (location.hash === "#gallery") {
      const el = document.getElementById("gallery");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
      }
    }
  }, [location.hash]);

  const [counts, setCounts] = useState({
    years: 0,
    nations: 0,
    states: 0,
    churches: 0,
  });

  useEffect(() => {
    const targets = {
      years: 33,
      nations: 25,
      states: 19,
      churches: 1200,
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        years: Math.floor(targets.years * progress),
        nations: Math.floor(targets.nations * progress),
        states: Math.floor(targets.states * progress),
        churches: Math.floor(targets.churches * progress),
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
      year: "1975-1976",
      title: "Early Preaching",
      description: "Began preaching in small gatherings around South India at 18.",
    },
    {
      year: "1990",
      title: "Recognizing the Calling",
      description: "Completed engineering degree and officially started as a full-time evangelist.",
    },
    {
      year: "1990s-2000s",
      title: "Regional Expansion",
      description: "Expanded ministry efforts intensely across Kerala and Tamil Nadu.",
    },
    {
      year: "2000s-Present",
      title: "Global Reach",
      description: "Achieved national recognition and expanded into international conventions reaching 25+ nations.",
    },
    {
      year: "2007-Present",
      title: "Senior Pastor",
      description: "Serving as Senior Pastor of Christ Centre, Trivandrum for over 18 years.",
    },
  ];

  return (
    <div className="min-h-screen p-3">
      <Navbar />

      {/* Hero Section — MinistryHub style */}
      <section className="relative w-full rounded-[40px] min-h-[80vh] flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#102931] via-[#142E35] to-[#1D3F48]">

        {/* Grid background */}
        <div
          className="absolute inset-0 rounded-[40px] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 100%, black 10%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 100%, black 10%, transparent 100%)'
          }}
        />

        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0C647F]/20 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1D3F48]/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        {/* Hero image with teal overlay */}
        <div className="absolute inset-0 rounded-[40px] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1400/v1774195167/img-13_kqw3rc.jpg"
            alt="About Brother Suresh Babu"
            className="w-full h-full object-cover object-top opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B2D3A]/30 via-[#0D3A4A]/50 to-[#071E28]/40 rounded-[40px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0C647F]/40 bg-[#0C647F]/10 text-[#4AAFCA] text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0C647F] animate-pulse" />
            Ministry Profile
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-serif mb-4 leading-tight"
          >
            About Brother<br className="hidden sm:block" /> Suresh Babu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-8"
          >
            A Life Transformed to Transform Lives
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <a href="/contact" className="px-6 py-2.5 bg-[#0C647F] hover:bg-[#0a5570] text-white font-bold rounded-full text-sm transition-colors shadow-lg">
              Invite for Event
            </a>
            <a href="/ministry" className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full text-sm border border-white/20 transition-colors">
              View Ministry
            </a>
          </motion.div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 w-full border-t border-white/10 bg-[#102931]/70 backdrop-blur-xl rounded-b-[40px]"
        >
          <div className="container mx-auto px-4 py-5">
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-16">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#0C647F]">{counts.years}+</span>
                <span className="text-white/70 font-semibold text-sm uppercase tracking-wider">Years</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#0C647F]">{counts.nations}+</span>
                <span className="text-white/70 font-semibold text-sm uppercase tracking-wider">Nations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#0C647F]">{counts.states}</span>
                <span className="text-white/70 font-semibold text-sm uppercase tracking-wider">States</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#0C647F]">{counts.churches}+</span>
                <span className="text-white/70 font-semibold text-sm uppercase tracking-wider">Churches</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Autoplay Video Section */}
      <AboutVideo />

      {/* From Despair to Destiny Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-blue-dark">
                From Despair to Destiny
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  At the young age of 17, facing overwhelming suicidal thoughts and despair,
                  Brother Suresh Babu encountered the unconditional love and compassion of Jesus Christ.
                  This pivotal moment led to a complete and miraculous life transformation.
                </p>
                <p>
                  The darkness was immediately replaced with an unshakeable faith and purpose.
                  Almost immediately, he began to testify and witness about the saving grace of Jesus,
                  igniting a spark that would eventually reach countless lives across the globe.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden w-96 h-96  shadow-2xl"
            >
              <img
                src="https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1400/v1774195148/img-20_k3gkxr.jpg"
                alt="Brother Suresh Babu Speaking"
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section ref={ref} className="py-16 md:py-24 bg-accent/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-serif mb-12 text-center text-blue-dark"
          >
            Ministry Journey Timeline
          </motion.h2>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-12 pl-16 md:pl-0" : "md:pl-12 pl-16"}`}>
                  <div className="bg-card p-6 rounded-xl shadow-soft border border-border/50 hover:border-primary/50 transition-colors">
                    <div className="text-primary text-xl font-bold mb-2 font-sans">{milestone.year}</div>
                    <h3 className="text-xl font-bold mb-2 font-serif text-foreground">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy, Family, Credentials */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 bg-card rounded-2xl shadow-soft border border-border"
            >
              <Heart className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4 text-blue-dark">Ministry Philosophy</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  Non-denominational approach (accepted by all)
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  Gospel-centered Biblical teaching
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  Practical spiritual transformation
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  Strong community and family focus
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 bg-card rounded-2xl shadow-soft border border-border"
            >
              <Users className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4 text-blue-dark">Family Background</h3>
              <p className="text-muted-foreground mb-4">
                As the firstborn in his family, Brother Suresh was raised with a Father from a Hindu background and a Mother who was a nominal Christian.
              </p>
              <p className="text-muted-foreground">
                Today, his entire family has been touched by God's grace, remarkably standing as a
                living example of Acts 16:31: <br /> <br />
                <em>"Believe in the Lord Jesus, and you will be saved—you and your household."</em>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-8 bg-card rounded-2xl shadow-soft border border-border"
            >
              <GraduationCap className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4 text-blue-dark">Education & Roles</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li><strong>CMM Theology</strong> <br /> (Master's Degree)</li>
                <li><strong>Ordained Minister</strong> <br /> 33+ years of practical ministry experience</li>
                <li><strong>Senior Pastor</strong> <br /> Christ Centre, Trivandrum</li>
                <li><strong>International Speaker</strong> <br /> Media ministry & Gospel gatherings</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-dark/10" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2 font-sans">
                {counts.years}+
              </div>
              <div className="text-lg md:text-xl font-medium opacity-90">Years in Ministry</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2 font-sans">
                {counts.nations}+
              </div>
              <div className="text-lg md:text-xl font-medium opacity-90">Nations Reached</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2 font-sans">
                {counts.states}
              </div>
              <div className="text-lg md:text-xl font-medium opacity-90">Indian States</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2 font-sans">
                {counts.churches}+
              </div>
              <div className="text-lg md:text-xl font-medium opacity-90">Churches Connected</div>
            </div>
          </motion.div>
        </div>
      </section>

      <div id="gallery">
        <Gallery />
      </div>
      <Footer />
    </div>
  );
};

export default About;
