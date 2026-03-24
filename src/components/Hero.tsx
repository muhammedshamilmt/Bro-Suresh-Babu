import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe, BookOpen, Users, Church, Heart, Navigation } from "lucide-react";

const HeroImg = "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto/v1774197091/hero_b69llr.png";


export const CircularText = ({ text, radius = 50 }: { text: string; radius?: number }) => {
  const characters = text.split("");
  const degree = 360 / characters.length;

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="relative w-32 h-32 flex items-center justify-center"
    >
      <div className="absolute w-8 h-8 bg-[#0C647F] text-white flex items-center justify-center rounded-full z-10">
        <Navigation size={16} className="-rotate-45" />
      </div>
      {characters.map((char, i) => (
        <span
          key={`char-${i}`}
          className="absolute text-[11px] font-bold uppercase tracking-widest text-[#0C647F]/70"
          style={{
            transform: `rotate(${i * degree}deg) translateY(-${radius}px)`,
            transformOrigin: "center center",
          }}
        >
          {char}
        </span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
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

  return (
    <section id="home" className="relative rounded-[40px] min-h-[95vh] w-full flex flex-col justify-between overflow-hidden bg-white">

      {/* Gradient orbs */}
      <div className="absolute left-[10%] top-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#0C647F]/20 to-[#0C647F]/05 blur-[80px] pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 top-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-b from-[#0C647F]/25 to-[#0C647F]/05 blur-[90px] pointer-events-none" />
      <div className="absolute right-[10%] top-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-[#0C647F]/20 to-[#0C647F]/05 blur-[80px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 h-full flex-1 flex flex-col lg:flex-row items-center justify-between pt-28 lg:pt-32 pb-8">

        {/* Left Column */}
        <div className="w-full lg:w-1/3 flex flex-col items-start space-y-8 z-30 pb-8 lg:pb-24">

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#0C647F]/20 bg-[#0C647F]/08 shadow-sm"
          >
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0C647F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0C647F]"></span>
            </div>
            <span className="text-sm font-medium text-[#0C647F]">Accepting Invitations</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-sans tracking-tight text-[#0A1537] leading-[1.1]">
              Gospel <br className="hidden sm:block" /> Preacher & <br className="hidden sm:block" /> Evangelist
            </h1>
          </motion.div>

          {/* Core Focus Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 px-5 py-2.5 rounded-[1.25rem] border border-[#0C647F]/20 bg-[#0C647F]/05"
          >
            <span className="text-sm font-semibold text-[#0C647F]">Core Focus</span>
            <div className="flex -space-x-3">
              {[Globe, Users, BookOpen, Heart].map((Icon, idx) => (
                <div key={idx} className="w-8 h-8 rounded-full bg-white border-2 border-[#0C647F]/20 flex items-center justify-center shadow-sm">
                  <Icon size={14} className="text-[#0C647F]" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Center Column - Portrait Image */}
        <div className="w-full lg:w-auto lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 flex justify-center items-end z-10 mt-8 lg:mt-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative flex-shrink-0 w-[450px] pointer-events-auto"
          >
            {/* Spotlight backglow behind portrait */}
            <div className="absolute inset-x-0 bottom-0 top-1/4 bg-[#0C647F]/15 blur-[80px] -z-10 rounded-t-full" />
            <img
              src={HeroImg}
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(12,100,127,0.2)]"
              alt="Brother Suresh Babu"
            />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/3 flex flex-col items-start lg:items-end space-y-12 z-30 pb-8 lg:pb-32 mt-12 lg:mt-0 text-left lg:text-right">

          {/* Rotating Stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:block pt-8"
          >
            <CircularText text="33+ YEARS OF MINISTRY • GLOBAL REACH • " radius={45} />
          </motion.div>

          {/* Description & Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-sm space-y-6 lg:ml-auto"
          >
            <p className="text-[#0A1537]/65 text-base sm:text-lg leading-relaxed font-sans">
              As a dedicated minister of the Gospel, I rely on God's grace to lead impactful campaigns, seminars, and television broadcasts that transform lives globally.
            </p>

            <a href="/ministry" className="inline-block px-8 py-3.5 bg-[#0C647F] hover:bg-[#0a5570] text-white font-bold rounded-xl transition-colors shadow-md">
              Explore Ministry
            </a>
          </motion.div>
        </div>

      </div>

      {/* Bottom Bar: Stats */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-30 w-full border-t border-[#0C647F]/15 bg-[#0C647F]/05 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 lg:gap-12 text-[#0A1537]/50 text-sm font-medium uppercase tracking-wider">

            <div className="flex items-center gap-3">
              <BookOpen size={20} className="text-[#0C647F]/50" />
              <span className="flex items-center gap-1 font-bold text-[#0A1537]"><span className="text-xl sm:text-2xl text-[#0C647F]">{counts.years}+</span> Years</span>
            </div>

            <div className="flex items-center gap-3">
              <Globe size={20} className="text-[#0C647F]/50" />
              <span className="flex items-center gap-1 font-bold text-[#0A1537]"><span className="text-xl sm:text-2xl text-[#0C647F]">{counts.nations}+</span> Nations</span>
            </div>

            <div className="flex items-center gap-3">
              <Navigation size={20} className="text-[#0C647F]/50" />
              <span className="flex items-center gap-1 font-bold text-[#0A1537]"><span className="text-xl sm:text-2xl text-[#0C647F]">{counts.states}</span> States</span>
            </div>

            <div className="flex items-center gap-3">
              <Church size={20} className="text-[#0C647F]/50" />
              <span className="flex items-center gap-1 font-bold text-[#0A1537]"><span className="text-xl sm:text-2xl text-[#0C647F]">{counts.churches}+</span> Churches</span>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
