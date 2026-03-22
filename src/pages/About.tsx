import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { BookOpen, MapPin, Heart, GraduationCap, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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

  const testimonialsData = [
    {
      id: 1,
      quote:
        "Brother Suresh's ministry completely changed our church. His focus on Gospel truth and practical spiritual transformation brought a new wave of revival to our congregation.",
      name: "Rev. David Smith",
      role: "Senior Pastor",
      imageSrc: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 2,
      quote:
        "The youth camp led by Brother Suresh Babu was the turning point in my life. I encountered God's grace and found my true calling in serving the community.",
      name: "John Mark",
      role: "Youth Leader",
      imageSrc: "https://images.unsplash.com/photo-1690407617542-2f210cf20d7e?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 3,
      quote:
        "Attending the Argentina conference with 1200+ other churches was a glimpse of heaven. The anointing and clarity in his teaching is unparalleled.",
      name: "Carlos Gomez",
      role: "Conference Attendee",
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
            src="https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1400/v1774195168/img-15_gzrz7d.jpg"
            alt="About Brother Suresh Babu"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white font-serif mb-6"
          >
            About Brother Suresh Babu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90"
          >
            A Life Transformed to Transform Lives
          </motion.p>
        </div>
      </section>

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

      {/* Testimonials Section */}
      {/* <TestimonialSection ... /> */}

      <Gallery />
      <Footer />
    </div>
  );
};

export default About;
