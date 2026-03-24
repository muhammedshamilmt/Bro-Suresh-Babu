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
          className="absolute text-[11px] font-bold uppercase tracking-widest text-white/70"
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
    <section id="home" className="relative rounded-[40px] min-h-[110vh] lg:min-h-[95vh] w-full flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#102931] via-[#142E35] to-[#1D3F48]">

      {/* Gradient orbs */}
      <div className="absolute left-[10%] top-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#0C647F]/20 to-[#0C647F]/05 blur-[80px] pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 top-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-b from-[#0C647F]/25 to-[#0C647F]/05 blur-[90px] pointer-events-none" />
      <div className="absolute right-[10%] top-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-[#0C647F]/20 to-[#0C647F]/05 blur-[80px] pointer-events-none" />

      {/* Decorative bubbles — animated radial-gradient bokeh */}
      <div className="bubble-f1 [animation-delay:0s]   absolute top-[4%]   left-[4%]   w-8   h-8   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
      <div className="bubble-f2 [animation-delay:1s]   absolute top-[10%]  left-[14%]  w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)"}} />
      <div className="bubble-f3 [animation-delay:2s]   absolute top-[3%]   left-[28%]  w-12  h-12  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)", boxShadow:"0 0 16px 4px rgba(255,255,255,0.07)"}} />
      <div className="bubble-p  [animation-delay:0.5s] absolute top-[18%]  left-[6%]   w-4   h-4   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.12) 60%, transparent 100%)"}} />
      <div className="bubble-f1 [animation-delay:3s]   absolute top-[26%]  left-[2%]   w-7   h-7   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
      <div className="bubble-f2 [animation-delay:1.5s] absolute top-[38%]  left-[7%]   w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)"}} />
      <div className="bubble-f3 [animation-delay:4s]   absolute top-[48%]  left-[2%]   w-10  h-10  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)", boxShadow:"0 0 14px 3px rgba(255,255,255,0.07)"}} />
      <div className="bubble-p  [animation-delay:2.5s] absolute top-[58%]  left-[12%]  w-4   h-4   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.11) 60%, transparent 100%)"}} />
      <div className="bubble-f1 [animation-delay:5s]   absolute top-[66%]  left-[4%]   w-7   h-7   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
      <div className="bubble-f2 [animation-delay:0.8s] absolute bottom-[18%] left-[9%]  w-6   h-6   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)"}} />
      <div className="bubble-f3 [animation-delay:3.5s] absolute bottom-[8%]  left-[20%] w-9   h-9   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.07) 55%, transparent 100%)", boxShadow:"0 0 12px 3px rgba(255,255,255,0.07)"}} />
      <div className="bubble-p  [animation-delay:1.2s] absolute bottom-[4%]  left-[35%] w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)"}} />
      <div className="bubble-f1 [animation-delay:0.3s] absolute top-[7%]   right-[6%]  w-12  h-12  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.08) 55%, transparent 100%)", boxShadow:"0 0 20px 6px rgba(255,255,255,0.10)"}} />
      <div className="bubble-f2 [animation-delay:2.2s] absolute top-[15%]  right-[18%] w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)"}} />
      <div className="bubble-f3 [animation-delay:4.5s] absolute top-[4%]   right-[28%] w-7   h-7   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
      <div className="bubble-p  [animation-delay:1.8s] absolute top-[24%]  right-[4%]  w-6   h-6   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)", boxShadow:"0 0 14px 4px rgba(255,255,255,0.10)"}} />
      <div className="bubble-f1 [animation-delay:3.2s] absolute top-[34%]  right-[14%] w-4   h-4   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.12) 60%, transparent 100%)"}} />
      <div className="bubble-f2 [animation-delay:0.6s] absolute top-[44%]  right-[5%]  w-9   h-9   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.07) 55%, transparent 100%)", boxShadow:"0 0 22px 7px rgba(255,255,255,0.09)"}} />
      <div className="bubble-f3 [animation-delay:5.5s] absolute top-[54%]  right-[16%] w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)"}} />
      <div className="bubble-p  [animation-delay:2.8s] absolute top-[62%]  right-[6%]  w-7   h-7   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
      <div className="bubble-f1 [animation-delay:1.4s] absolute bottom-[20%] right-[12%] w-6  h-6   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)", boxShadow:"0 0 14px 4px rgba(255,255,255,0.10)"}} />
      <div className="bubble-f2 [animation-delay:3.8s] absolute bottom-[10%] right-[24%] w-4  h-4   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.11) 60%, transparent 100%)"}} />
      <div className="bubble-f3 [animation-delay:0.9s] absolute bottom-[5%]  right-[8%]  w-10 h-10  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.07) 55%, transparent 100%)", boxShadow:"0 0 24px 7px rgba(255,255,255,0.09)"}} />
      <div className="bubble-p  [animation-delay:4.2s] absolute top-[11%]  right-[10%] w-4   h-4   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.11) 60%, transparent 100%)"}} />
      <div className="bubble-f1 [animation-delay:2.6s] absolute top-[19%]  right-[3%]  w-8   h-8   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.08) 55%, transparent 100%)", boxShadow:"0 0 18px 5px rgba(255,255,255,0.10)"}} />
      <div className="bubble-f2 [animation-delay:5.2s] absolute top-[29%]  right-[22%] w-6   h-6   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
      <div className="bubble-f3 [animation-delay:1.6s] absolute top-[39%]  right-[10%] w-11  h-11  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 28% 28%, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)", boxShadow:"0 0 26px 9px rgba(255,255,255,0.08)"}} />
      <div className="bubble-p  [animation-delay:3.6s] absolute top-[49%]  right-[26%] w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)"}} />
      <div className="bubble-f1 [animation-delay:0.4s] absolute top-[57%]  right-[4%]  w-7   h-7   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)", boxShadow:"0 0 16px 5px rgba(255,255,255,0.10)"}} />
      <div className="bubble-f2 [animation-delay:4.8s] absolute top-[72%]  right-[18%] w-9   h-9   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.07) 55%, transparent 100%)"}} />
      <div className="bubble-f3 [animation-delay:2.4s] absolute top-[80%]  right-[6%]  w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)", boxShadow:"0 0 12px 3px rgba(255,255,255,0.11)"}} />
      <div className="bubble-p  [animation-delay:1.0s] absolute bottom-[28%] right-[30%] w-4  h-4   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.66) 0%, rgba(255,255,255,0.11) 60%, transparent 100%)"}} />
      <div className="bubble-f1 [animation-delay:6s]   absolute bottom-[15%] right-[4%]  w-12 h-12  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 28% 28%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)", boxShadow:"0 0 30px 10px rgba(255,255,255,0.08)"}} />
      <div className="bubble-f2 [animation-delay:2.0s] absolute top-[20%]  left-[42%]  w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)"}} />
      <div className="bubble-f3 [animation-delay:4.0s] absolute top-[45%]  left-[48%]  w-3   h-3   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.11) 60%, transparent 100%)"}} />
      <div className="bubble-p  [animation-delay:5.8s] absolute top-[70%]  left-[36%]  w-6   h-6   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
      <div className="bubble-f1 [animation-delay:3.4s] absolute top-[80%]  left-[52%]  w-4   h-4   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)"}} />
      <div className="bubble-f2 [animation-delay:1.6s] absolute top-[12%]  left-[52%]  w-8   h-8   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.44) 0%, rgba(255,255,255,0.07) 55%, transparent 100%)"}} />
      <div className="bubble-f3 [animation-delay:5.0s] absolute top-[32%]  left-[22%]  w-10  h-10  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 28% 28%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)"}} />
      <div className="bubble-p  [animation-delay:0.7s] absolute top-[55%]  left-[30%]  w-6   h-6   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
      <div className="bubble-f1 [animation-delay:4.6s] absolute top-[75%]  left-[18%]  w-8   h-8   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.44) 0%, rgba(255,255,255,0.07) 55%, transparent 100%)"}} />
      <div className="bubble-f2 [animation-delay:2.9s] absolute top-[8%]   left-[60%]  w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)"}} />
      <div className="bubble-f3 [animation-delay:1.1s] absolute top-[28%]  right-[32%] w-9   h-9   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 28% 28%, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)"}} />
      <div className="bubble-p  [animation-delay:3.9s] absolute top-[50%]  right-[28%] w-4   h-4   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)"}} />
      <div className="bubble-f1 [animation-delay:5.4s] absolute bottom-[14%] left-[44%] w-7  h-7   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
      <div className="bubble-f2 [animation-delay:2.3s] absolute bottom-[6%]  right-[40%] w-5  h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)"}} />
      <div className="bubble-f3 [animation-delay:0.2s] absolute top-[88%]  left-[8%]   w-11  h-11  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 28% 28%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)"}} />
      <div className="bubble-p  [animation-delay:4.4s] absolute top-[2%]   right-[44%] w-6   h-6   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />

      {/* Main Content Area */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 h-full flex-1 flex flex-col lg:flex-row items-center justify-between pt-28 lg:pt-32 pb-0 lg:pb-8">

        {/* Left Column */}
        <div className="w-full lg:w-1/3 flex flex-col items-start space-y-8 z-30 pb-4 lg:pb-24 order-1">

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#0C647F]/30 bg-[#0C647F]/10 shadow-sm"
          >
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0C647F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0C647F]"></span>
            </div>
            <span className="text-sm font-medium text-[#4AAFCA]">Accepting Invitations</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-sans tracking-tight text-white leading-[1.1]">
              Gospel <br className="hidden sm:block" /> Preacher & <br className="hidden sm:block" /> Evangelist
            </h1>
          </motion.div>

          {/* Core Focus Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 px-5 py-2.5 rounded-[1.25rem] border border-[#0C647F]/30 bg-[#0C647F]/10"
          >
            <span className="text-sm font-semibold text-[#4AAFCA]">Core Focus</span>
            <div className="flex -space-x-3">
              {[Globe, Users, BookOpen, Heart].map((Icon, idx) => (
                <div key={idx} className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#0C647F]/30 flex items-center justify-center shadow-sm">
                  <Icon size={14} className="text-[#4AAFCA]" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column — order-2 on mobile, order-3 on desktop */}
        <div className="w-full lg:w-1/3 flex flex-col items-start lg:items-end space-y-8 lg:space-y-12 z-30 pb-4 lg:pb-32 mt-4 lg:mt-0 text-left lg:text-right order-2 lg:order-3">

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
            <p className="text-white/65 text-base sm:text-lg leading-relaxed font-sans">
              As a dedicated minister of the Gospel, I rely on God's grace to lead impactful campaigns, seminars, and television broadcasts that transform lives globally.
            </p>

            <a href="/ministry" className="inline-block px-8 py-3.5 bg-[#0C647F] hover:bg-[#0a5570] text-white font-bold rounded-xl transition-colors shadow-md">
              Explore Ministry
            </a>
          </motion.div>
        </div>

        {/* Center Column - Portrait Image — order-3 on mobile (bottom), order-2 on desktop (center) */}
        <div className="w-full lg:w-auto lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 flex justify-center items-end z-10 mt-2 lg:mt-0 pointer-events-none order-3 lg:order-2 mb-0 pb-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative flex-shrink-0 w-[95vw] sm:w-[480px] lg:w-[450px] pointer-events-auto"
          >
            {/* Spotlight backglow behind portrait */}
            <div className="absolute inset-x-0 bottom-0 top-1/4 bg-[#0C647F]/15 blur-[80px] -z-10 rounded-t-full" />
            <img
              src={HeroImg}
              className="w-full h-auto object-contain block"
              style={{ marginBottom: '-8%' }}
              alt="Brother Suresh Babu"
            />
          </motion.div>
        </div>

      </div>

      {/* Bottom Bar: Stats */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-30 w-full border-t border-white/10 bg-[#102931]/70 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 lg:gap-12 text-white/50 text-sm font-medium uppercase tracking-wider">

            <div className="flex items-center gap-3">
              <BookOpen size={20} className="text-white/40" />
              <span className="flex items-center gap-1 font-bold text-white"><span className="text-xl sm:text-2xl text-[#0C647F]">{counts.years}+</span> Years</span>
            </div>

            <div className="flex items-center gap-3">
              <Globe size={20} className="text-white/40" />
              <span className="flex items-center gap-1 font-bold text-white"><span className="text-xl sm:text-2xl text-[#0C647F]">{counts.nations}+</span> Nations</span>
            </div>

            <div className="flex items-center gap-3">
              <Navigation size={20} className="text-white/40" />
              <span className="flex items-center gap-1 font-bold text-white"><span className="text-xl sm:text-2xl text-[#0C647F]">{counts.states}</span> States</span>
            </div>

            <div className="flex items-center gap-3">
              <Church size={20} className="text-white/40" />
              <span className="flex items-center gap-1 font-bold text-white"><span className="text-xl sm:text-2xl text-[#0C647F]">{counts.churches}+</span> Churches</span>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
