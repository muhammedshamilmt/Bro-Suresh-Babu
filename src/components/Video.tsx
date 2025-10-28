import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";

const Video = () => {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const videoUrl = isPlaying
    ? "https://www.youtube.com/embed/ULqPQxoha64?autoplay=1&mute=1"
    : "https://www.youtube.com/embed/ULqPQxoha64";

  return (
    <section className="py-24 bg-gradient-warm" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Experience the{" "}
            <span>Message</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch inspiring sermons and teachings that bring hope and transformation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm group cursor-pointer hover:bg-black/40 transition-all duration-300"
                onClick={() => setIsPlaying(true)}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-primary rounded-full blur-2xl opacity-50 animate-glow" />
                  <div className="relative p-8 rounded-full bg-primary text-primary-foreground shadow-2xl">
                    <Play size={48} fill="currentColor" />
                  </div>
                </motion.div>
              </div>
            )}

            <iframe
              className="w-full h-full"
              src={videoUrl}
              title="Ministry Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Video;
