import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Users, Heart, Radio } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Gospel Campaigns",
    description: "Large-scale evangelical crusades reaching thousands with the message of hope and salvation.",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1470&auto=format&fit=crop",
  },
  {
    icon: BookOpen,
    title: "Seminars & Training",
    description: "In-depth teaching programs equipping church leaders and pastors with practical spiritual insights.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1470&auto=format&fit=crop",
  },
  {
    icon: Heart,
    title: "Youth Camps",
    description: "Engaging the next generation in faith, fostering community, and guiding young believers.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1632&auto=format&fit=crop",
  },
  {
    icon: Radio,
    title: "Media Ministry",
    description: "Broadcasting on South American TV reaching 52+ nations, along with international radio programs.",
    image: "https://www.ngu.edu/wp-content/uploads/2021/10/Media-Ministry-Checkerboard-1.png",
  },
];

const DesktopServiceCard = ({ service, index, total, scrollYProgress }: any) => {
  const scale = useTransform(
    scrollYProgress,
    [index / total, 1],
    [1, 1 - (total - 1 - index) * 0.05]
  );

  return (
    <div
      className="sticky w-full max-w-[1400px] mx-auto flex items-center justify-center px-4 lg:px-8"
      style={{
        height: '500px',
        top: `calc(15vh + ${index * 40}px)`,
        marginTop: index === 0 ? '0' : '80vh',
        zIndex: index
      }}
    >
      <motion.div
        style={{ scale }}
        className="relative w-full h-full rounded-[40px] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.1)] origin-top bg-card"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/30 backdrop-blur-md rounded-full border border-primary/40 shadow-glow">
              <service.icon className="w-5 h-5 text-primary-foreground" />
              <span className="text-sm font-bold text-primary-foreground">
                Highlight {index + 1}
              </span>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-white font-serif">
              {service.title}
            </h3>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-sans">
              {service.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="services" className="relative w-full bg-background">
      <div className="text-center pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 px-4 relative z-10 bg-background">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          Ministry Highlights
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Impacting the world through diverse outreach and teaching programs
        </p>
      </div>

      {/* Desktop: Stacking Cards View */}
      <div ref={containerRef} className="hidden lg:block relative pb-[20vh] bg-background">
        {services.map((service, index) => (
          <DesktopServiceCard
            key={service.title}
            service={service}
            index={index}
            total={services.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Mobile & Tablet: Card Grid View */}
      <div className="lg:hidden px-4 pb-16 space-y-6 max-w-2xl mx-auto">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="relative overflow-hidden rounded-[30px] shadow-medium hover:shadow-glow transition-shadow"
          >
            {/* Background Image */}
            <div className="relative h-[400px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/30 backdrop-blur-sm rounded-full border border-primary/30">
                    <service.icon className="w-4 h-4 text-primary-foreground" />
                    <span className="text-sm font-bold text-primary-foreground">
                      Highlight {index + 1}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-white font-serif leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
