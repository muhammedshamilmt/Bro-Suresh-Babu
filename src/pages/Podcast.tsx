import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Headphones, ExternalLink, Mic } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Spotify SVG icon ──────────────────────────────────────────────────────────

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1333.33 1333.3" className={className} fill="currentColor">
    <path d="M666.66 0C298.48 0 0 298.47 0 666.65c0 368.19 298.48 666.65 666.66 666.65 368.22 0 666.67-298.45 666.67-666.65C1333.33 298.49 1034.88.03 666.65.03l.01-.04zm305.73 961.51c-11.94 19.58-37.57 25.8-57.16 13.77-156.52-95.61-353.57-117.26-585.63-64.24-22.36 5.09-44.65-8.92-49.75-31.29-5.12-22.37 8.84-44.66 31.26-49.75 253.95-58.02 471.78-33.04 647.51 74.35 19.59 12.02 25.8 37.57 13.77 57.16zm81.6-181.52c-15.05 24.45-47.05 32.17-71.49 17.13-179.2-110.15-452.35-142.05-664.31-77.7-27.49 8.3-56.52-7.19-64.86-34.63-8.28-27.49 7.22-56.46 34.66-64.82 242.11-73.46 543.1-37.88 748.89 88.58 24.44 15.05 32.16 47.05 17.12 71.46V780zm7.01-189.02c-214.87-127.62-569.36-139.35-774.5-77.09-32.94 9.99-67.78-8.6-77.76-41.55-9.98-32.96 8.6-67.77 41.56-77.78 235.49-71.49 626.96-57.68 874.34 89.18 29.69 17.59 39.41 55.85 21.81 85.44-17.52 29.63-55.89 39.4-85.42 21.8h-.03z" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const SPOTIFY_SHOW_ID = "3jyo3QkKL97ce38qiV4svX";
const SPOTIFY_URL = "https://open.spotify.com/show/3jyo3QkKL97ce38qiV4svX";

const REAL_EPISODES = [
  "658jza0pDhSXjKUkYROQ9h",
  "7HXYJuIEKayFnjnkq2QBG4",
  "2wfrrZlAXQ4kxJEvvJQbLE",
  "3Q5yqEuDPGYlTQjC975mgl",
];

const STATS = [
  { value: "52+", label: "Nations" },
  { value: "6", label: "Languages" },
  { value: "100+", label: "Episodes" },
  { value: "1M+", label: "Listeners" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// ── Component ─────────────────────────────────────────────────────────────────

const Podcast = () => {
  const episodesRef = useRef(null);
  const episodesInView = useInView(episodesRef, { once: true, amount: 0.1 });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen bg-background p-3">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative w-full rounded-[40px] h-[65vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1600&auto=format&fit=crop"
          alt="Podcast"
          className="absolute inset-0 w-full h-full object-cover rounded-[40px]"
        />
        <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full
              bg-[#1DB954]/20 border border-[#1DB954]/40 mb-6">
            <Headphones size={28} className="text-[#1DB954]" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 leading-tight">
            The Podcast
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-8">
            Spirit-filled messages from Brother Suresh Babu — available wherever you listen.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}>
            <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full
                bg-[#1DB954] hover:bg-[#1DB954]/90 text-white font-semibold text-sm
                transition-all duration-200 shadow-lg">
              <SpotifyIcon className="w-5 h-5 text-white" />
              Listen on Spotify
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-10" ref={statsRef}>
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div key={s.label} custom={i} variants={fadeUp}
                initial="hidden" animate={statsInView ? "visible" : "hidden"}
                className="text-center py-6 px-4 rounded-2xl bg-card border border-border">
                <p className="text-3xl font-serif font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Spotify show embed ── */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-8">
            <p className="text-[#1DB954] text-xs tracking-[0.3em] uppercase font-semibold mb-2">Now Streaming</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Listen on Spotify</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl overflow-hidden border border-[#1DB954]/20
              shadow-[0_0_60px_rgba(29,185,84,0.08)]">
            <iframe
              style={{ borderRadius: "24px", display: "block" }}
              src={`https://open.spotify.com/embed/show/${SPOTIFY_SHOW_ID}?utm_source=generator`}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Brother Suresh Babu Podcast on Spotify"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Listen on Spotify card ── */}
      <section className="py-14 bg-muted/20">
        <div className="container mx-auto px-4 max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-8">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-2">Available On</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Listen Anywhere</h2>
          </motion.div>

          <motion.a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} whileHover={{ y: -4 }}
            className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-[#1DB954]/30
              hover:shadow-[0_8px_40px_rgba(29,185,84,0.15)] transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-[#1DB954] flex items-center justify-center shrink-0 shadow-md">
              <SpotifyIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Listen on</p>
              <p className="font-bold text-lg text-[#1DB954]">Spotify</p>
            </div>
            <ExternalLink size={16} className="ml-auto text-muted-foreground group-hover:text-[#1DB954] transition-colors" />
          </motion.a>
        </div>
      </section>

      {/* ── Episodes ── */}
      <section className="py-20 bg-background" ref={episodesRef}>
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={episodesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="text-center mb-12">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-2">Episodes</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-3">Recent Episodes</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Powerful messages to strengthen your faith, wherever you are.
            </p>
          </motion.div>

          <div className="flex flex-col gap-5">
            {REAL_EPISODES.map((id, i) => (
              <motion.div key={id}
                custom={i} variants={fadeUp} initial="hidden"
                animate={episodesInView ? "visible" : "hidden"}
                className="rounded-2xl overflow-hidden border border-border
                  hover:border-[#1DB954]/40 hover:shadow-[0_4px_32px_rgba(29,185,84,0.1)]
                  transition-all duration-300">
                <iframe
                  style={{ borderRadius: "16px", display: "block" }}
                  src={`https://open.spotify.com/embed/episode/${id}?utm_source=generator`}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`Episode ${i + 1}`}
                />
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={episodesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12">
            <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full
                bg-[#1DB954] hover:bg-[#1DB954]/90 text-white font-semibold text-sm
                transition-all duration-200 shadow-lg">
              <SpotifyIcon className="w-5 h-5 text-white" />
              View All Episodes on Spotify
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Subscribe CTA ── */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 to-indigo-900 p-10 md:p-14 text-center">
            <div className="absolute inset-0 opacity-10">
              <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-full object-cover" alt="" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full
                bg-white/10 border border-white/20 mb-6">
                <Mic size={24} className="text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
                Never Miss an Episode
              </h2>
              <p className="text-white/70 max-w-md mx-auto mb-8">
                Subscribe on Spotify and get notified every time a new message drops.
              </p>
              <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                  bg-[#1DB954] hover:bg-[#1DB954]/90 text-white font-semibold text-sm
                  transition-all duration-200 shadow-lg">
                <SpotifyIcon className="w-5 h-5 text-white" />
                Subscribe on Spotify
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Podcast;
