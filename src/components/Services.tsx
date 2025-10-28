import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Users, Heart } from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Biblical Teaching",
    description: "Deep, grace-centered teachings that illuminate God's Word and strengthen your faith journey through Christ's finished work.",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1470&auto=format&fit=crop",
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Uniting believers across denominations to create vibrant communities centered on love, grace, and spiritual growth.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1470&auto=format&fit=crop",
  },
  {
    icon: Heart,
    title: "Spiritual Mentorship",
    description: "Personalized guidance and support to help you deepen your relationship with Christ and discover your divine purpose.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1632&auto=format&fit=crop",
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Our Ministry
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering believers to live in the fullness of God's grace
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-500 p-4"
            >
              <div className="flex flex-col h-full gap-4">
                {/* Image Section - Separate div */}
                <div className="relative h-64 overflow-hidden rounded-xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Icon */}
                  <div className="absolute top-4 left-4 p-3 rounded-xl bg-primary text-primary-foreground shadow-medium">
                    <service.icon size={24} />
                  </div>
                </div>

                {/* Content Section - Separate div */}
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-serif font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
