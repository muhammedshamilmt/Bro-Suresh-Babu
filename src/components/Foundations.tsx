import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const foundationGrace = "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1400/v1774196440/foundation-grace_gyxv94.jpg";
const foundationCross = "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1400/v1774196443/foundation-cross_uk68fm.jpg";
const foundationUnity = "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1400/v1774196449/foundation-unity_yw12or.jpg";

const foundations = [
  {
    title: "The Grace of God",
    description: "Living in the fullness of God's unmerited favor through Christ's finished work",
    image: foundationGrace,
  },
  {
    title: "The Cross of Christ",
    description: "Finding hope, redemption, and eternal life through Jesus' sacrifice",
    image: foundationCross,
  },
  {
    title: "Unity in Faith",
    description: "Bringing believers together in love, grace, and spiritual communion",
    image: foundationUnity,
  },
];

const DesktopFoundationCard = ({ foundation, index, total, scrollYProgress }: any) => {
  const scale = useTransform(
    scrollYProgress,
    [index / total, 1],
    [1, 1 - (total - 1 - index) * 0.05]
  );

  return (
    <div 
      className="sticky w-full max-w-[1400px] mx-auto flex items-center justify-center px-4 lg:px-8"
      style={{ 
        height: '600px',
        top: `calc(15vh + ${index * 40}px)`, 
        marginTop: index === 0 ? '0' : '80vh', 
        zIndex: index 
      }}
    >
      <motion.div 
        style={{ scale }}
        className="relative w-full h-full rounded-[40px] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.1)] origin-top bg-background"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${foundation.image})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-12">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full">
              <span className="text-sm font-bold text-primary-foreground">
                Foundation {index + 1}
              </span>
            </div>
            
            <h3 className="text-5xl font-bold text-white">
              {foundation.title}
            </h3>
            
            <p className="text-xl text-white/90 max-w-2xl">
              {foundation.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Foundations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="foundations" className="relative w-full bg-background">
      <div className="text-center pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 px-4 relative z-10 bg-background">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          Our <span>Foundations</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Core principles that guide our ministry and inspire transformation
        </p>
      </div>

      {/* Desktop: Stacking Cards View */}
      <div ref={containerRef} className="hidden lg:block relative pb-[20vh] bg-background">
        {foundations.map((foundation, index) => (
          <DesktopFoundationCard 
            key={foundation.title} 
            foundation={foundation} 
            index={index} 
            total={foundations.length} 
            scrollYProgress={scrollYProgress} 
          />
        ))}
      </div>

      {/* Mobile & Tablet: Card Grid View */}
      <div className="lg:hidden px-4 pb-16 space-y-6">
        {foundations.map((foundation, index) => (
          <div
            key={foundation.title}
            className="relative overflow-hidden rounded-2xl shadow-medium hover:shadow-glow transition-shadow"
          >
            {/* Background Image */}
            <div className="relative h-[400px] sm:h-[450px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${foundation.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                    <span className="text-xs sm:text-sm font-bold text-primary-foreground">
                      Foundation {index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {foundation.title}
                  </h3>
                  
                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                    {foundation.description}
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

export default Foundations;
