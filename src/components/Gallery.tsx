import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// ── All images from assets/images ────────────────────────────────────────────
import img1  from "@/assets/images/img-1.jpeg";
import img2  from "@/assets/images/img-2.jpeg";
import img3  from "@/assets/images/img-3.jpeg";
import img4  from "@/assets/images/img-4.jpeg";
import img5  from "@/assets/images/img-5.jpeg";
import img6  from "@/assets/images/img-6.jpeg";
import img7  from "@/assets/images/img-7.jpeg";
import img8  from "@/assets/images/img-8.jpeg";
import img9  from "@/assets/images/img-9.jpeg";
import img10 from "@/assets/images/img-10.jpeg";
import img11 from "@/assets/images/img-11.jpeg";
import img12 from "@/assets/images/img-12.jpeg";
import img13 from "@/assets/images/img-13.jpeg";
import img14 from "@/assets/images/img-14.jpeg";
import img15 from "@/assets/images/img-15.jpeg";
import img16 from "@/assets/images/img-16.jpeg";
import img17 from "@/assets/images/img-17.jpeg";
import img18 from "@/assets/images/img-18.jpeg";
import img19 from "@/assets/images/img-19.jpeg";
import img20 from "@/assets/images/img-20.jpeg";
import img21 from "@/assets/images/img-21.jpeg";
import img22 from "@/assets/images/img-22.jpeg";
import img23 from "@/assets/images/img-23.jpeg";
import img24 from "@/assets/images/img-24.jpeg";
import img25 from "@/assets/images/img-25.jpeg";
import img26 from "@/assets/images/img-26.jpeg";
import img27 from "@/assets/images/img-27.jpeg";
import img28 from "@/assets/images/img-28.jpeg";
import img29 from "@/assets/images/img-29.jpeg";
import img30 from "@/assets/images/img-30.jpeg";

const ALL_IMAGES = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
];

// Bento layout pattern — repeats every 7 items
// span-2 = wide, tall = tall, normal = 1x1
type CellSize = "wide" | "tall" | "normal";
const PATTERN: CellSize[] = ["wide", "normal", "tall", "normal", "normal", "wide", "normal"];

function getCellClass(size: CellSize) {
  if (size === "wide") return "col-span-2 row-span-1";
  if (size === "tall") return "col-span-1 row-span-2";
  return "col-span-1 row-span-1";
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // Keyboard nav
  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={0}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
      >
        <X size={22} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm">
        {index + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Gallery image ${index + 1}`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.3 }}
          className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
      >
        <ChevronRight size={24} />
      </button>
    </motion.div>
  );
}

// ── Bento cell ────────────────────────────────────────────────────────────────
function BentoCell({
  src,
  index,
  size,
  onClick,
}: {
  src: string;
  index: number;
  size: CellSize;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

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
        src={src}
        alt={`Ministry photo ${index + 1}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
            <ZoomIn size={20} className="text-white" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Gallery section ───────────────────────────────────────────────────────────
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i! - 1 + ALL_IMAGES.length) % ALL_IMAGES.length);
  const next = () => setLightboxIndex((i) => (i! + 1) % ALL_IMAGES.length);

  return (
    <section className="py-20 bg-muted/30">
      {/* Header */}
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
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Ministry in Pictures
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Moments captured across nations — crusades, camps, conferences, and communities
            transformed by the Gospel.
          </p>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="container mx-auto px-4">
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3"
        >
          {ALL_IMAGES.map((src, i) => (
            <BentoCell
              key={i}
              src={src}
              index={i}
              size={PATTERN[i % PATTERN.length]}
              onClick={() => open(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={ALL_IMAGES}
            index={lightboxIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
