import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { Globe, BookOpen, Church, Navigation } from "lucide-react";
import { CircularText } from "@/components/Hero";

const HeroImg = "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto/v1774197091/hero_b69llr.png";

// ── Spotify ───────────────────────────────────────────────────────────────────
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1333.33 1333.3" className={className} fill="currentColor">
    <path d="M666.66 0C298.48 0 0 298.47 0 666.65c0 368.19 298.48 666.65 666.66 666.65 368.22 0 666.67-298.45 666.67-666.65C1333.33 298.49 1034.88.03 666.65.03l.01-.04zm305.73 961.51c-11.94 19.58-37.57 25.8-57.16 13.77-156.52-95.61-353.57-117.26-585.63-64.24-22.36 5.09-44.65-8.92-49.75-31.29-5.12-22.37 8.84-44.66 31.26-49.75 253.95-58.02 471.78-33.04 647.51 74.35 19.59 12.02 25.8 37.57 13.77 57.16zm81.6-181.52c-15.05 24.45-47.05 32.17-71.49 17.13-179.2-110.15-452.35-142.05-664.31-77.7-27.49 8.3-56.52-7.19-64.86-34.63-8.28-27.49 7.22-56.46 34.66-64.82 242.11-73.46 543.1-37.88 748.89 88.58 24.44 15.05 32.16 47.05 17.12 71.46V780zm7.01-189.02c-214.87-127.62-569.36-139.35-774.5-77.09-32.94 9.99-67.78-8.6-77.76-41.55-9.98-32.96 8.6-67.77 41.56-77.78 235.49-71.49 626.96-57.68 874.34 89.18 29.69 17.59 39.41 55.85 21.81 85.44-17.52 29.63-55.89 39.4-85.42 21.8h-.03z" />
  </svg>
);

const PODCAST_EPISODES = [
  "658jza0pDhSXjKUkYROQ9h",
  "7HXYJuIEKayFnjnkq2QBG4",
  "2wfrrZlAXQ4kxJEvvJQbLE",
  "3Q5yqEuDPGYlTQjC975mgl",
];

const BUBBLES = [
  { label: "Home", path: "/landing" },
  { label: "About", path: "/about" },
  { label: "Ministry", path: "/ministry" },
  { label: "Media", path: "/media" },
  { label: "Blog", path: "/blog" },
  { label: "Events", path: "/events" },
  { label: "Christ Centre", path: "/christ-centre" },
  { label: "Contact", path: "/contact" },
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

  const [activeEp, setActiveEp] = useState(0);

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
    <div className="min-h-screen bg-gradient-to-br from-[#102931] via-[#142E35] to-[#1D3F48] flex flex-col">
      <section className="relative flex-1 w-full flex flex-col justify-between overflow-hidden">
        {/* Top Header Placeholder mimicking the provided design */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-40 w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between px-4 sm:px-8 py-4 lg:py-5 bg-[#102931]/70 backdrop-blur-md border-b border-white/10"
        >
          <div className="flex flex-col items-center sm:items-start gap-1">
            <h2 className="text-white font-bold text-base sm:text-lg tracking-wider">Welcome to Brother Suresh  Babu ministries</h2>
            <p className="text-white/60 text-xs sm:text-sm">Getting God's Word into people's hearts.</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="px-4 py-2 sm:px-6 sm:py-2.5 bg-white text-black font-bold rounded-lg text-xs sm:text-sm hover:bg-gray-200 transition-colors shadow-lg">Watch latest sermon</button>
            <button className="px-4 py-2 sm:px-6 sm:py-2.5 bg-white/10 text-white font-medium rounded-lg text-xs sm:text-sm border border-white/20 hover:bg-white/20 transition-colors shadow-lg">View more clips</button>
          </div>
        </motion.div>

        {/* Geometric / Grid Background */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 100%, black 10%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 100%, black 10%, transparent 100%)'
          }}
        />

        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0C647F]/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1D3F48]/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />

        {/* Decorative circles — animated radial-gradient bokeh */}
        <div className="bubble-f1 [animation-delay:0s]   absolute top-[8%]   left-[6%]   w-8   h-8   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
        <div className="bubble-f2 [animation-delay:1s]   absolute top-[14%]  left-[18%]  w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)"}} />
        <div className="bubble-f3 [animation-delay:2s]   absolute top-[5%]   left-[32%]  w-12  h-12  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)", boxShadow:"0 0 16px 4px rgba(255,255,255,0.07)"}} />
        <div className="bubble-p  [animation-delay:0.5s] absolute top-[22%]  left-[8%]   w-4   h-4   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.12) 60%, transparent 100%)"}} />
        <div className="bubble-f1 [animation-delay:3s]   absolute top-[35%]  left-[4%]   w-7   h-7   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
        <div className="bubble-f2 [animation-delay:1.5s] absolute top-[50%]  left-[10%]  w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)"}} />
        <div className="bubble-f3 [animation-delay:4s]   absolute top-[65%]  left-[5%]   w-9   h-9   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)", boxShadow:"0 0 14px 3px rgba(255,255,255,0.07)"}} />
        <div className="bubble-p  [animation-delay:2.5s] absolute bottom-[20%] left-[12%] w-6  h-6   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)"}} />
        <div className="bubble-f1 [animation-delay:5s]   absolute bottom-[10%] left-[22%] w-8  h-8   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.44) 0%, rgba(255,255,255,0.07) 55%, transparent 100%)"}} />
        <div className="bubble-f2 [animation-delay:0.8s] absolute bottom-[4%]  left-[36%] w-5  h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)"}} />
        <div className="bubble-f3 [animation-delay:0.3s] absolute top-[10%]  right-[8%]  w-10  h-10  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.08) 55%, transparent 100%)", boxShadow:"0 0 22px 7px rgba(255,255,255,0.10)"}} />
        <div className="bubble-p  [animation-delay:2.2s] absolute top-[20%]  right-[20%] w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)"}} />
        <div className="bubble-f1 [animation-delay:4.5s] absolute top-[6%]   right-[30%] w-7   h-7   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
        <div className="bubble-f2 [animation-delay:1.8s] absolute top-[38%]  right-[6%]  w-6   h-6   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)", boxShadow:"0 0 14px 4px rgba(255,255,255,0.10)"}} />
        <div className="bubble-f3 [animation-delay:3.2s] absolute top-[52%]  right-[14%] w-4   h-4   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.11) 60%, transparent 100%)"}} />
        <div className="bubble-p  [animation-delay:0.6s] absolute top-[68%]  right-[8%]  w-8   h-8   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.46) 0%, rgba(255,255,255,0.07) 55%, transparent 100%)"}} />
        <div className="bubble-f1 [animation-delay:5.5s] absolute bottom-[22%] right-[18%] w-5  h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)"}} />
        <div className="bubble-f2 [animation-delay:2.8s] absolute bottom-[12%] right-[28%] w-7  h-7   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
        <div className="bubble-f3 [animation-delay:0.9s] absolute bottom-[5%]  right-[10%] w-10 h-10  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 28% 28%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.07) 55%, transparent 100%)", boxShadow:"0 0 24px 7px rgba(255,255,255,0.09)"}} />
        <div className="bubble-p  [animation-delay:1.4s] absolute top-[13%]  right-[4%]  w-8   h-8   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.08) 55%, transparent 100%)", boxShadow:"0 0 18px 5px rgba(255,255,255,0.10)"}} />
        <div className="bubble-f1 [animation-delay:3.8s] absolute top-[28%]  right-[12%] w-11  h-11  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 28% 28%, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)", boxShadow:"0 0 28px 9px rgba(255,255,255,0.08)"}} />
        <div className="bubble-f2 [animation-delay:5.2s] absolute top-[44%]  right-[24%] w-6   h-6   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
        <div className="bubble-f3 [animation-delay:1.6s] absolute top-[58%]  right-[4%]  w-9   h-9   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.44) 0%, rgba(255,255,255,0.07) 55%, transparent 100%)", boxShadow:"0 0 22px 6px rgba(255,255,255,0.09)"}} />
        <div className="bubble-p  [animation-delay:4.2s] absolute top-[74%]  right-[20%] w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)"}} />
        <div className="bubble-f1 [animation-delay:2.6s] absolute top-[82%]  right-[6%]  w-7   h-7   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)", boxShadow:"0 0 14px 4px rgba(255,255,255,0.10)"}} />
        <div className="bubble-f2 [animation-delay:1.0s] absolute bottom-[30%] right-[32%] w-4  h-4   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.66) 0%, rgba(255,255,255,0.11) 60%, transparent 100%)"}} />
        <div className="bubble-f3 [animation-delay:6s]   absolute bottom-[18%] right-[4%]  w-12 h-12  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 28% 28%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)", boxShadow:"0 0 32px 10px rgba(255,255,255,0.08)"}} />
        <div className="bubble-p  [animation-delay:3.4s] absolute top-[30%]  left-[45%]  w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)"}} />
        <div className="bubble-f1 [animation-delay:5.8s] absolute top-[72%]  left-[38%]  w-4   h-4   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)"}} />
        <div className="bubble-f2 [animation-delay:2.0s] absolute top-[3%]   left-[55%]  w-8   h-8   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.44) 0%, rgba(255,255,255,0.07) 55%, transparent 100%)"}} />
        <div className="bubble-f3 [animation-delay:4.0s] absolute top-[42%]  left-[25%]  w-10  h-10  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 28% 28%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)"}} />
        <div className="bubble-p  [animation-delay:0.7s] absolute top-[58%]  left-[32%]  w-6   h-6   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
        <div className="bubble-f1 [animation-delay:4.6s] absolute top-[78%]  left-[16%]  w-9   h-9   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.07) 55%, transparent 100%)"}} />
        <div className="bubble-f2 [animation-delay:2.9s] absolute top-[25%]  right-[34%] w-7   h-7   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
        <div className="bubble-f3 [animation-delay:1.1s] absolute top-[48%]  right-[26%] w-5   h-5   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)"}} />
        <div className="bubble-p  [animation-delay:3.9s] absolute bottom-[16%] left-[48%] w-6  h-6   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)"}} />
        <div className="bubble-f1 [animation-delay:5.4s] absolute top-[85%]  left-[8%]   w-11  h-11  rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 28% 28%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)"}} />
        <div className="bubble-f2 [animation-delay:0.2s] absolute top-[2%]   right-[46%] w-6   h-6   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.54) 0%, rgba(255,255,255,0.09) 60%, transparent 100%)"}} />
        <div className="bubble-f3 [animation-delay:4.4s] absolute top-[16%]  left-[42%]  w-4   h-4   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.64) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)"}} />
        <div className="bubble-p  [animation-delay:2.3s] absolute top-[62%]  right-[36%] w-8   h-8   rounded-full pointer-events-none" style={{background:"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.07) 55%, transparent 100%)"}} />

        {/* Main Content Area */}
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 h-full flex-1 flex flex-col items-center justify-center lg:justify-between pt-16 lg:pt-24 pb-8">

          {/* Removed Static Alignment Wrapper */}

          {/* Drag Awareness Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1 }}
            className="absolute left-1/2 lg:left-[5%] xl:left-[10%] top-[20%] lg:top-[30%] -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-white mb-2">Drag to Explore</span>
            <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>

          {/* Half Circle Hub Menu - Draggable Dial */}
          <motion.div
            onPanStart={() => isDragging.current = true}
            onPanEnd={() => isDragging.current = false}
            onPan={(e, info) => {
              // Manual rotation based on Y dragging (swiping down rotates clockwise)
              rotation.set(rotation.get() + info.delta.y * 0.25);
            }}
            className="absolute left-1/2 lg:left-0 top-1/2 -translate-y-1/2 mt-8 lg:mt-0 -translate-x-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] lg:w-[650px] lg:h-[650px] xl:w-[800px] xl:h-[800px] z-30 touch-none cursor-grab active:cursor-grabbing pointer-events-auto"
          >
            {/* The internally rotating rim & bubbles */}
            <motion.div
              style={{ rotate: rotation }}
              className="absolute inset-0 rounded-full border-[2px] border-white/20 sm:border-[4px] sm:border-white/15"
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
                      className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 px-3 py-2 sm:px-5 sm:py-3 rounded-full border border-white/10 bg-[#102931]/95 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:bg-white/10 hover:border-[#0C647F]/50 transition-all group pointer-events-auto relative z-10"
                    >
                      <span className="text-xs sm:text-sm lg:text-base font-semibold text-white/90  transition-colors whitespace-nowrap">
                        {item.label}
                      </span>
                      <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-[#0C647F]/20 flex items-center justify-center group-hover:bg-[#0C647F]/40 transition-colors hidden sm:flex">
                        <Navigation size={12} className="text-[#0C647F] -rotate-45" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Stamp placed inside the Dial Wrapper at the exact top-[10%] (Completely isolated from rotation physics) */}
            <div className="absolute left-[60%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center scale-90 sm:scale-100 z-50 pointer-events-none text-white">
              <CircularText text="33+ YEARS OF MINISTRY • GLOBAL REACH • " radius={45} />
              {/* Central White Navigation Circle */}
              <div className="absolute w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex flex-col items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-black/5 pointer-events-auto cursor-pointer object-cover">
                <Navigation size={16} className="text-black transform rotate-45" strokeWidth={2.5} />
              </div>
            </div>
          </motion.div>

          {/* ── Spotify Episodes Panel — right side ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute right-4 top-0 bottom-0 z-30 w-[260px] sm:w-[290px] pointer-events-auto hidden lg:flex flex-col justify-center gap-3"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 px-1">
              <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center shadow-[0_0_20px_rgba(29,185,84,0.4)] shrink-0">
                <SpotifyIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">Latest Episodes</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">Podcast</p>
              </div>
              <div className="ml-auto flex gap-[2px] items-end h-4">
                {[3, 5, 4, 6, 3].map((h, j) => (
                  <motion.span key={j}
                    className="w-[2px] bg-[#1DB954] rounded-full"
                    animate={{ height: [`${h}px`, `${h + 5}px`, `${h}px`] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: j * 0.1 }}
                  />
                ))}
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-[#1DB954]/40 via-white/10 to-transparent" />

            {/* Episode list */}
            <div className="flex flex-col gap-2">
              {PODCAST_EPISODES.map((_, i) => (
                <motion.button key={i} onClick={() => setActiveEp(i)}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl border text-left transition-all duration-200 group
                    ${activeEp === i
                      ? "bg-[#1DB954]/15 border-[#1DB954]/50 shadow-[0_0_16px_rgba(29,185,84,0.15)]"
                      : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20"
                    }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all
                    ${activeEp === i ? "bg-[#1DB954] shadow-[0_0_10px_rgba(29,185,84,0.5)]" : "bg-white/10 group-hover:bg-white/20"}`}>
                    {activeEp === i ? (
                      <span className="flex gap-[2px] items-end h-3">
                        {[3, 5, 4].map((h, j) => (
                          <motion.span key={j} className="w-[2px] bg-white rounded-full"
                            animate={{ height: [`${h}px`, `${h + 3}px`, `${h}px`] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: j * 0.12 }} />
                        ))}
                      </span>
                    ) : (
                      <svg className="w-3 h-3 text-white/70 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate ${activeEp === i ? "text-[#1DB954]" : "text-white/80 group-hover:text-white"} transition-colors`}>
                      Episode {i + 1}
                    </p>
                    <p className="text-[10px] text-white/35 mt-0.5">Brother Suresh Babu</p>
                  </div>
                  <SpotifyIcon className={`w-3 h-3 shrink-0 ${activeEp === i ? "text-[#1DB954]" : "text-white/20 group-hover:text-white/40"} transition-colors`} />
                </motion.button>
              ))}
            </div>

            {/* Active embed */}
            <motion.div key={activeEp}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl overflow-hidden border border-[#1DB954]/20 shadow-[0_4px_32px_rgba(29,185,84,0.1)]"
            >
              <iframe
                style={{ borderRadius: "12px", display: "block" }}
                src={`https://open.spotify.com/embed/episode/${PODCAST_EPISODES[activeEp]}?utm_source=generator`}
                width="100%" height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Episode ${activeEp + 1}`}
              />
            </motion.div>

            <Link to="/podcast"
              className="flex items-center justify-center gap-2 py-2 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-[#1DB954]/10 hover:border-[#1DB954]/30 transition-all text-white/50 hover:text-[#1DB954] text-xs font-semibold"
            >
              <SpotifyIcon className="w-3 h-3" />
              View all episodes
            </Link>
          </motion.div>

          {/* Portrait Image — centered, no animation */}
          <div className="absolute inset-0 flex justify-center items-end z-10 pointer-events-none overflow-hidden">
            <img
              src={HeroImg}
              className="w-[300px] sm:w-[380px] lg:w-[460px] xl:w-[520px] h-auto object-contain object-top drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              alt="Brother Suresh Babu"
            />
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
            <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 lg:gap-12 text-white/60 text-sm font-medium uppercase tracking-wider">
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
    </div>
  );
}

