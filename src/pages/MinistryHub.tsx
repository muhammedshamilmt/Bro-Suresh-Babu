import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { Globe, BookOpen, Church, Navigation } from "lucide-react";
import { CircularText } from "@/components/Hero";

const HeroImg = "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto/v1774197091/hero_b69llr.png";

const BUBBLES = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Ministry", path: "/ministry" },
  { label: "Contact", path: "/contact" },
  { label: "Events", path: "/events" },
  { label: "Christ Centre", path: "/christ-centre" },
  { label: "Give", path: "/give" },
  { label: "Building Fund", path: "/building-fund" },
];

export default function MinistryHub() {
  const [counts, setCounts] = useState({ years: 0, nations: 0, states: 0, churches: 0 });

  useEffect(() => {
    const targets = { years: 33, nations: 25, states: 19, churches: 1200 };
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

  // Dial rotation logic
  const rotation = useMotionValue(0);
  const isDragging = useRef(false);

  // Continuously rotate slowly
  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      rotation.set(rotation.get() + delta * 0.005); // ~ 3 degrees per second
    }
  });

  // Inverse rotation to keep children upright
  const reverseRotation = useTransform(rotation, r => -r);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#061430] via-[#050A14] to-[#241702] flex flex-col">
      <section className="relative flex-1 w-full flex flex-col justify-between overflow-hidden">
        {/* Geometric / Grid Background */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 100%, black 10%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 100%, black 10%, transparent 100%)'
          }}
        />

        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />

        {/* Main Content Area */}
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 h-full flex-1 flex flex-col items-center justify-center lg:justify-between pt-8 lg:pt-12 pb-8">

          {/* Rotating Stamp - Static relative to screen, positioned exactly at the center of the dial
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-center pointer-events-none z-40"
          >
            <CircularText text="33+ YEARS OF MINISTRY • GLOBAL REACH • " radius={45} />
          </motion.div> */}

          {/* Half Circle Hub Menu - Draggable Dial */}
          <motion.div
            style={{ rotate: rotation }}
            onPanStart={() => isDragging.current = true}
            onPanEnd={() => isDragging.current = false}
            onPan={(e, info) => {
              // Manual rotation based on Y dragging (swiping down rotates clockwise)
              rotation.set(rotation.get() + info.delta.y * 0.25);
            }}
            className="absolute left-1/2 lg:left-0 top-1/2 -translate-y-1/2 mt-8 lg:mt-0 -translate-x-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] lg:w-[650px] lg:h-[650px] xl:w-[800px] xl:h-[800px] rounded-full border-[2px] border-white/20 sm:border-[4px] sm:border-white/15 z-30 flex items-center justify-center pointer-events-auto touch-none cursor-grab active:cursor-grabbing"
          >
            {BUBBLES.map((item, index) => {
              const totalItems = BUBBLES.length;
              // spread angles evenly around 360 degrees
              const angleInDeg = index * (360 / totalItems);
              const angleInRad = (angleInDeg * Math.PI) / 180;

              const radius = 50; // 50% radius
              const x = 50 + radius * Math.cos(angleInRad);
              const y = 50 + radius * Math.sin(angleInRad);

              return (
                <motion.div
                  key={item.path}
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    x: "-50%",
                    y: "-50%",
                    rotate: reverseRotation // Counter-rotate to stay upright!
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 120 }}
                >
                  <Link
                    to={item.path}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 px-3 py-2 sm:px-5 sm:py-3 rounded-full border border-white/10 bg-[#061430]/95 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:bg-white/10 hover:border-primary/50 transition-all group pointer-events-auto"
                  >
                    <span className="text-xs sm:text-sm lg:text-base font-semibold text-white/90 group-hover:text-primary transition-colors whitespace-nowrap">
                      {item.label}
                    </span>
                    <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 transition-colors hidden sm:flex">
                      <Navigation size={12} className="text-primary -rotate-45" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column - Portrait Image */}
          <div className="relative w-full flex-1 flex justify-center lg:justify-end lg:absolute lg:bottom-0 lg:right-0 items-end z-10 pointer-events-none pb-12 lg:pb-0 lg:pr-12 xl:pr-24 mt-20 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative flex-shrink-0 w-[300px] sm:w-[350px] lg:w-[400px] xl:w-[450px] pointer-events-auto"
            >
              {/* Backglow for the portrait */}
              <div className="absolute inset-x-0 bottom-0 top-1/4 bg-primary/20 blur-[80px] -z-10 rounded-t-full" />
              <img
                src={HeroImg}
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                alt="Brother Suresh Babu"
                style={{ filter: "brightness(1.1) contrast(1.05)" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar: Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative z-30 w-full border-t border-white/10 bg-[#061430]/60 backdrop-blur-xl"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 lg:gap-12 text-white/60 text-sm font-medium uppercase tracking-wider">
              <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-white/40" />
                <span className="flex items-center gap-1 font-bold text-white"><span className="text-xl sm:text-2xl text-primary">{counts.years}+</span> Years</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-white/40" />
                <span className="flex items-center gap-1 font-bold text-white"><span className="text-xl sm:text-2xl text-primary">{counts.nations}+</span> Nations</span>
              </div>
              <div className="flex items-center gap-3">
                <Navigation size={20} className="text-white/40" />
                <span className="flex items-center gap-1 font-bold text-white"><span className="text-xl sm:text-2xl text-primary">{counts.states}</span> States</span>
              </div>
              <div className="flex items-center gap-3">
                <Church size={20} className="text-white/40" />
                <span className="flex items-center gap-1 font-bold text-white"><span className="text-xl sm:text-2xl text-primary">{counts.churches}+</span> Churches</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

