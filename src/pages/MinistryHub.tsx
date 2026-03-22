import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const BG =
  "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1600/v1774203776/HERO_SEC.jpg_e7oeam.jpg";

// Padding applied via position offsets:
//   left  bubbles: x starts at 14%+ (left padding)
//   right bubbles: x ends at 82%  (right padding)
//   top   bubbles: y starts at 16% (top padding)
//   bottom bubbles: y ends at 78%  (bottom padding, above nav bar)
const BUBBLES = [
  // Left side
  { label: "About",         path: "/about",         x: 14,  y: 16,  size: 100 },
  { label: "Ministry",      path: "/ministry",      x: 22,  y: 42,  size: 120 },
  { label: "Blog",          path: "/blog",          x: 13,  y: 63,  size: 95  },
  { label: "Contact",       path: "/contact",       x: 22,  y: 78,  size: 115 },
  // Right side
  { label: "Events",        path: "/events",        x: 70,  y: 16,  size: 110 },
  { label: "Christ Centre", path: "/christ-centre", x: 80,  y: 34,  size: 145 },
  { label: "Give",          path: "/give",          x: 72,  y: 57,  size: 120 },
  { label: "Building Fund", path: "/building-fund", x: 82,  y: 78,  size: 140 },
];

// ── Single bubble ─────────────────────────────────────────────────────────────
function Bubble({ label, path, x, y, size, index }: {
  label: string; path: string;
  x: number; y: number; size: number; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18 });
  const sy = useSpring(my, { stiffness: 220, damping: 18 });
  const rotX = useTransform(sy, [-0.5, 0.5], [22, -22]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-22, 22]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    mx.set((e.clientX - left) / width - 0.5);
    my.set((e.clientY - top) / height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const floatAmt = index % 2 === 0 ? -10 : 10;

  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, translateX: "-50%", translateY: "-50%" }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.1, type: "spring", stiffness: 160 }}
    >
      {/* Float */}
      <motion.div
        animate={{ y: [0, floatAmt, 0] }}
        transition={{ duration: 3.5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Per-bubble 3-D tilt */}
        <motion.div
          ref={ref}
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 600 }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          whileHover={{ scale: 1.13 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to={path} className="block">
            <div
              className="relative flex items-center justify-center rounded-full cursor-pointer"
              style={{ width: size, height: size }}
            >
              {/* Shell */}
              <div className="absolute inset-0 rounded-full border border-primary/50
                bg-[hsl(220,64%,10%)]/65 backdrop-blur-lg
                shadow-[0_0_30px_hsl(31,55%,64%,0.3),inset_0_1px_0_rgba(255,255,255,0.12)]" />
              {/* Inner accent ring */}
              <div className="absolute rounded-full border border-[hsl(178,48%,32%)]/50"
                style={{ inset: Math.round(size * 0.065) }} />
              {/* Shine */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 right-1/4 h-1/3
                  bg-gradient-to-b from-white/15 to-transparent rounded-full" />
              </div>
              {/* Label */}
              <span
                className="relative z-10 text-center font-bold text-white/90 leading-tight tracking-wide px-3"
                style={{ fontSize: size >= 120 ? 13 : size >= 100 ? 11 : 10 }}
              >
                {label}
              </span>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MinistryHub() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const bgX = useTransform(springX, [0, 1], [20, -20]);
  const bgY = useTransform(springY, [0, 1], [10, -10]);
  const rotateX = useTransform(springY, [0, 1], [5, -5]);
  const rotateY = useTransform(springX, [0, 1], [-5, 5]);
  const bubblesX = useTransform(springX, [0, 1], [-10, 10]);
  const bubblesY = useTransform(springY, [0, 1], [-6, 6]);

  const [particles] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      dur: Math.random() * 6 + 4,
      delay: Math.random() * 4,
    }))
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      mouseX.set((e.clientX - left) / width);
      mouseY.set((e.clientY - top) / height);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ perspective: "1000px" }}
    >
      {/* Background with parallax */}
      <motion.div className="absolute inset-[-40px]" style={{ x: bgX, y: bgY }}>
        <img src={BG} alt="" aria-hidden
          className="w-full h-full object-cover object-top" draggable={false} />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 90% at 50% 50%, transparent 30%, rgba(0,0,0,0.35) 100%)" }} />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div key={p.id}
            className="absolute rounded-full bg-primary/40"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ opacity: [0.15, 0.7, 0.15], y: [0, -16, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* 3-D tilt scene */}
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Bubbles layer */}
        <motion.div
          className="absolute inset-0"
          style={{ x: bubblesX, y: bubblesY, translateZ: 50 } as React.CSSProperties}
        >
          {BUBBLES.map((b, i) => (
            <Bubble key={b.path} {...b} index={i} />
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom nav */}
      <motion.nav
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center
          justify-center gap-8 md:gap-14 py-4 px-6
          bg-black/50 backdrop-blur-md border-t border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        {[
          { label: "Home",    path: "/" },
          { label: "Events",  path: "/events" },
          { label: "Give",    path: "/give" },
          { label: "Contact", path: "/contact" },
        ].map((item) => (
          <Link key={item.path} to={item.path}
            className="text-white/60 hover:text-primary text-xs md:text-sm
              font-semibold tracking-widest uppercase transition-colors duration-200">
            {item.label}
          </Link>
        ))}
      </motion.nav>
    </div>
  );
}
