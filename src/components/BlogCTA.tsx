import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Feather } from "lucide-react";

const BlogCTA = () => {
  return (
    <section className="py-16 px-3">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0B2D3A] via-[#0C4A5E] to-[#071E28] text-white"
      >
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#0C647F]/20 blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 px-8 py-16 md:py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#4AAFCA] text-[10px] font-bold uppercase tracking-widest">
            <Feather size={11} />
            Updated Weekly
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif leading-tight max-w-2xl">
            Words That Transform Lives
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
            Devotionals, sermon notes, and Gospel reflections written to strengthen your faith and deepen your walk with God.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-[#0B2D3A] bg-white hover:bg-gray-100 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.15)] group mt-2"
          >
            Read the Blog
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default BlogCTA;
