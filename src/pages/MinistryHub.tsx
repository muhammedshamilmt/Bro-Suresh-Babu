import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { Globe, BookOpen, Church, Navigation, Volume2, VolumeX } from "lucide-react";
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
  { label: "Grace Community", path: "/grace-community" },
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

  // Dial rotation logic
  const rotation = useMotionValue(0);
  const isDragging = useRef(false);

  // Spotify dial rotation (independent)
  const spotifyRotation = useMotionValue(0);
  const isSpotifyDragging = useRef(false);
  const [activeEp, setActiveEp] = useState(0);
  const [muted, setMuted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Continuously rotate slowly
  useAnimationFrame((_t, delta) => {
    if (!isDragging.current) {
      rotation.set(rotation.get() + delta * 0.005);
    }
    if (!isSpotifyDragging.current) {
      spotifyRotation.set(spotifyRotation.get() - delta * 0.004);
    }
  });

  // Inverse rotation to keep children upright
  const reverseRotation = useTransform(rotation, r => -r);
  const reverseSpotify = useTransform(spotifyRotation, r => -r);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#061430] via-[#050A14] to-[#241702] flex flex-col">
      <section className="relative flex-1 w-full flex flex-col justify-between overflow-hidden">
        {/* Top Header Placeholder mimicking the provided design */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-40 w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between px-4 sm:px-8 py-4 lg:py-5 bg-[#061430]/60 backdrop-blur-md border-b border-white/10"
        >
          <div className="flex flex-col items-center sm:items-start gap-1">
            <h2 className="text-white font-bold text-base sm:text-lg tracking-wider">Welcome to Brother Suresh Babu ministries</h2>
            <p className="text-white/60 text-xs sm:text-sm">Getting God's Word into people's hearts.</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            {/* LIVE badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/20 border border-red-500/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-red-400 text-[10px] font-bold uppercase tracking-widest">Streaming</span>
            </div>
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />

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
                      className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 px-3 py-2 sm:px-5 sm:py-3 rounded-full border border-white/10 bg-[#061430]/95 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:bg-white/10 hover:border-primary/50 transition-all group pointer-events-auto relative z-10"
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

            {/* Stamp placed inside the Dial Wrapper at the exact top-[10%] (Completely isolated from rotation physics) */}
            <div className="absolute left-[60%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center scale-90 sm:scale-100 z-50 pointer-events-none">
              <CircularText text="33+ YEARS OF MINISTRY • GLOBAL REACH • " radius={45} />
              {/* Central White Navigation Circle */}
              <div className="absolute w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex flex-col items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-black/5 pointer-events-auto cursor-pointer object-cover">
                <Navigation size={16} className="text-black transform rotate-45" strokeWidth={2.5} />
              </div>
            </div>
          </motion.div>

          {/* ── Spotify Podcast Dial — half-visible on right edge ── */}
          <motion.div
            onPanStart={() => { isSpotifyDragging.current = true; }}
            onPanEnd={() => { isSpotifyDragging.current = false; }}
            onPan={(_e, info) => {
              spotifyRotation.set(spotifyRotation.get() + info.delta.y * 0.25);
            }}
            className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[720px] xl:h-[720px] z-30 touch-none cursor-grab active:cursor-grabbing pointer-events-auto"
          >
            {/* Rotating rim + episode bubbles */}
            <motion.div
              style={{ rotate: spotifyRotation }}
              className="absolute inset-0 rounded-full border-[4px] border-[#1DB954]/40 sm:border-[6px] sm:border-[#1DB954]/35"
            >
              {PODCAST_EPISODES.map((epId, index) => {
                const angleInDeg = index * (360 / PODCAST_EPISODES.length);
                const angleInRad = (angleInDeg * Math.PI) / 180;
                const radius = 50;
                const x = 50 + radius * Math.cos(angleInRad);
                const y = 50 + radius * Math.sin(angleInRad);
                return (
                  <motion.div
                    key={epId}
                    className="absolute"
                    style={{ left: `${x}%`, top: `${y}%`, x: "-50%", y: "-50%", rotate: reverseSpotify }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ delay: index * 0.12, type: "spring", stiffness: 120 }}
                  >
                    <button
                      onClick={() => setActiveEp(index)}
                      className={`flex items-center gap-1.5 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border backdrop-blur-md transition-all group pointer-events-auto relative z-10 whitespace-nowrap
                        ${activeEp === index
                          ? "bg-[#1DB954] border-[#1DB954] shadow-[0_0_20px_rgba(29,185,84,0.5)]"
                          : "border-white/10 bg-[#061430]/95 hover:bg-[#1DB954]/10 hover:border-[#1DB954]/50"
                        }`}
                    >
                      <SpotifyIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${activeEp === index ? "text-white" : "text-[#1DB954]"}`} />
                      <span className={`text-xs sm:text-sm font-semibold ${activeEp === index ? "text-white" : "text-white/80 group-hover:text-[#1DB954]"} transition-colors`}>
                        EP {index + 1}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Center hub — Spotify icon + custom player card */}
            <div className="absolute left-[25%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 pointer-events-none">

              {/* Spotify hub button */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1DB954] flex items-center justify-center shadow-[0_0_28px_rgba(29,185,84,0.7)] pointer-events-auto cursor-pointer">
                <SpotifyIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              {/* Custom player card — no iframe preview shown */}
              <motion.div
                key={activeEp}
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-auto w-[190px] sm:w-[240px] rounded-2xl overflow-hidden
                  border border-[#1DB954]/30 bg-[#061430]/95 backdrop-blur-md
                  shadow-[0_0_30px_rgba(29,185,84,0.2)] p-3 flex flex-col gap-2"
              >
                {/* Episode label */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#1DB954] flex items-center justify-center shrink-0">
                    <SpotifyIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Episode</p>
                    <p className="text-xs font-bold text-white truncate">EP {activeEp + 1}</p>
                  </div>
                  {/* Mute / Unmute */}
                  <button
                    onClick={() => {
                      const next = !muted;
                      setMuted(next);
                      if (iframeRef.current?.contentWindow) {
                        iframeRef.current.contentWindow.postMessage(
                          JSON.stringify({ command: next ? "pause" : "play" }),
                          "*"
                        );
                      }
                    }}
                    className="ml-auto w-7 h-7 rounded-full bg-white/10 hover:bg-[#1DB954]/30
                      flex items-center justify-center transition-colors shrink-0"
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted
                      ? <VolumeX size={13} className="text-white/60" />
                      : <Volume2 size={13} className="text-[#1DB954]" />
                    }
                  </button>
                </div>

                {/* Animated waveform bars */}
                <div className="flex items-end gap-[3px] h-6 px-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 rounded-full ${muted ? "bg-white/20" : "bg-[#1DB954]"}`}
                      animate={muted ? { height: "4px" } : {
                        height: ["4px", `${8 + Math.random() * 14}px`, "4px"],
                      }}
                      transition={{
                        duration: 0.6 + Math.random() * 0.4,
                        repeat: Infinity,
                        delay: i * 0.07,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Hidden autoplay iframe */}
                <iframe
                  ref={iframeRef}
                  style={{ display: "none" }}
                  src={`https://open.spotify.com/embed/episode/${PODCAST_EPISODES[activeEp]}?utm_source=generator&autoplay=1`}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  title={`Episode ${activeEp + 1}`}
                />

                {/* Open on Spotify link */}
                <a
                  href={`https://open.spotify.com/episode/${PODCAST_EPISODES[activeEp]}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-[10px] text-[#1DB954]/70 hover:text-[#1DB954] text-center transition-colors"
                >
                  Open in Spotify ↗
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Portrait Image — centered */}
          <div className="relative w-full flex-1 flex justify-center items-end z-10 pointer-events-none pb-12 lg:pb-0 mt-20 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative flex-shrink-0 w-[300px] sm:w-[350px] lg:w-[400px] xl:w-[450px] pointer-events-auto"
            >
              {/* Animated Floating Particles Behind the Portrait */}
              <div className="absolute inset-x-[-30%] bottom-0 top-0 -z-20 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]">
                {Array.from({ length: 75 }).map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-primary/70 rounded-full blur-[1px]"
                    initial={{
                      left: `${10 + Math.random() * 80}%`,
                      bottom: `${Math.random() * -20}%`,
                      scale: Math.random() * 1.5 + 0.5,
                      opacity: 0,
                    }}
                    animate={{
                      y: [0, -500 - Math.random() * 400],
                      x: [0, (Math.random() - 0.5) * 150],
                      opacity: [0, 1, 0.8, 0],
                    }}
                    transition={{
                      duration: Math.random() * 8 + 6,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random() * 8,
                    }}
                  />
                ))}
              </div>

              {/* Animated Pulsing Backglow for the portrait */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 bottom-0 top-1/4 bg-primary/30 blur-[60px] sm:blur-[80px] -z-10 rounded-t-full"
              />

              <motion.img
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                src={HeroImg}
                className="w-full h-auto  object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
                alt="Brother Suresh Babu"
                style={{ filter: "brightness(1.1) contrast(1.05)" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar: Stats */}        <motion.div
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

