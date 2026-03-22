import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Banner images — using ministry photos from Cloudinary
const images = [
  "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1400/v1774195147/img-1_mfnnu1.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1400/v1774195150/img-22_cwjiac.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1400/v1774195155/img-6_ti6qmr.jpg",
  "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1400/v1774195161/img-27_gp8lhj.jpg",
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="py-24 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Optional Section Header if desired, but we'll focus on the frame */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Welcome to Our <span className="text-[#D4A574] italic">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the power of faith and discover God's purpose for your life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black group">
            {/* Image Carousel */}
            <AnimatePresence initial={false}>
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Banner ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Modern Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

            {/* Navigation Controls (Visible on hover) */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-[#D4A574] text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-[#D4A574] text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                    index === currentIndex
                      ? "bg-[#D4A574] w-8"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* CTA Overlay Content inside frame */}
            <div className="absolute bottom-16 left-0 right-0 z-20 flex justify-center px-4 md:px-12 text-center pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                    <a href="#about" className="pointer-events-auto inline-block bg-[#D4A574] hover:bg-[#c09160] text-white font-medium py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                      Discover More
                    </a>
                </motion.div>
            </div>
          </div>

          {/* Decorative elements to match Video.tsx */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
