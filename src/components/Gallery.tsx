import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const cl = (url: string) => url.replace("/upload/", "/upload/f_auto,q_auto/");

const ALL_IMAGES = [
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195168/img-15_gzrz7d.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195167/img-13_kqw3rc.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195165/img-14_j6nuil.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195165/img-7_yevbv7.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195164/img-30_wuqvhj.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195162/img-11_vqtnsd.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195161/img-12_qjyno3.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195161/img-27_gp8lhj.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195160/img-29_qyhx2w.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195159/img-28_y2gg0a.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195157/img-24_lqtjmx.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195157/img-9_ijhyvp.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195156/img-8_hspdx8.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195155/img-23_qjfc72.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195155/img-6_ti6qmr.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195153/img-26_o3wccz.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195153/img-25_grv02w.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195152/img-5_ycyrf4.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195151/img-4_uymnkt.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195150/img-22_cwjiac.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195150/img-21_nj51uc.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195149/img-3_rxycs8.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195148/img-20_k3gkxr.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195148/img-18_fvlhqj.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195147/img-1_mfnnu1.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195146/img-2_ecf3r5.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195146/img-19_swypkw.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195144/img-17_iun9rm.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195144/img-16_fc53dw.jpg",
].map(cl);

// Portrait/people images — show faces by anchoring to top
const TOP_ANCHORED = new Set([
  "img-7_yevbv7",
  "img-8_hspdx8",
  "img-25_grv02w",
  "img-26_o3wccz",
  "img-20_k3gkxr",
  "img-19_swypkw",
]);

function getObjectPosition(url: string) {
  return [...TOP_ANCHORED].some((id) => url.includes(id)) ? "object-top" : "object-center";
}

// ── Bento grid layout ─────────────────────────────────────────────────────────
type CellSize = "wide" | "tall" | "normal";

const PATTERN: CellSize[] = ["wide", "normal", "tall", "normal", "normal", "wide", "normal"];

function getCellSize(src: string, index: number): CellSize {
  if (src.includes("img-8_hspdx8") || src.includes("img-19_swypkw")) {
    return "tall";
  }
  return PATTERN[index % PATTERN.length];
}

function getCellClass(size: CellSize) {
  if (size === "wide") return "col-span-2 row-span-1";
  if (size === "tall") return "col-span-1 row-span-2";
  return "col-span-1 row-span-1";
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  images, index, onClose, onPrev, onNext,
}: {
  images: string[]; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  const lightboxSrc = (url: string) =>
    url.replace("f_auto,q_auto", "f_auto,q_auto,w_1400");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={0}
    >
      <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
        <X size={22} />
      </button>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm">
        {index + 1} / {images.length}
      </div>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
        <ChevronLeft size={24} />
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={lightboxSrc(images[index])}
          alt={`Gallery image ${index + 1}`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.3 }}
          className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
        <ChevronRight size={24} />
      </button>
    </motion.div>
  );
}

// ── Bento cell ────────────────────────────────────────────────────────────────
function BentoCell({ src, index, size, onClick }: {
  src: string; index: number; size: CellSize; onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const thumbSrc = src.replace("f_auto,q_auto", "f_auto,q_auto,w_600");
  const objectPosition = size === "tall" ? "object-top" : getObjectPosition(src);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: (index % 7) * 0.06 }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      className={`${getCellClass(size)} relative overflow-hidden rounded-2xl cursor-pointer group bg-muted`}
      onClick={onClick}
    >
      <img
        src={thumbSrc}
        alt={`Ministry photo ${index + 1}`}
        className={`w-full h-full object-cover ${objectPosition} transition-transform duration-500 group-hover:scale-110`}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
            <ZoomIn size={20} className="text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Gallery section ───────────────────────────────────────────────────────────
export default function Gallery({ initialCount }: { initialCount?: number }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(initialCount ?? ALL_IMAGES.length);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const isLimited = initialCount !== undefined;
  const visibleImages = ALL_IMAGES.slice(0, visibleCount);
  const hasMore = visibleCount < ALL_IMAGES.length;

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i! - 1 + ALL_IMAGES.length) % ALL_IMAGES.length);
  const next = () => setLightboxIndex((i) => (i! + 1) % ALL_IMAGES.length);

  return (
    <section className="py-20 bg-muted/30">
      <div ref={headerRef} className="container mx-auto px-4 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <ZoomIn size={14} />
            Photo Gallery
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Ministry in Pictures</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Moments captured across nations — crusades, camps, conferences, and communities
            transformed by the Gospel.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-flow-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
          {visibleImages.map((src, i) => (
            <BentoCell
              key={i}
              src={src}
              index={i}
              size={getCellSize(src, i)}
              onClick={() => open(i)}
            />
          ))}
        </div>

        {/* Buttons */}
        {isLimited && (
          <div className="flex items-center justify-center gap-4 mt-10">
            {hasMore && (
              <button
                onClick={() => setVisibleCount((c) => Math.min(c + 8, ALL_IMAGES.length))}
                className="px-6 py-2.5 rounded-full border border-border text-sm font-semibold text-foreground hover:border-[#0C647F] hover:text-[#0C647F] transition-all duration-300"
              >
                Load More
              </button>
            )}
            <a
              href="/about#gallery"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0C647F] text-white text-sm font-bold hover:bg-[#0a5570] transition-all duration-300 shadow-[0_4px_16px_rgba(12,100,127,0.25)] group"
            >
              See Full Gallery
              <ChevronRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={ALL_IMAGES} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </section>
  );
}
