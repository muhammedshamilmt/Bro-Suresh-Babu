import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ctaBackground =
  "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1600/v1774196451/cta-background_wqv5n9.jpg";

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-background px-4 md:px-10 pt-20 pb-0" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl min-h-[320px] flex items-center"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ctaBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />

        {/* Content */}
        <div className="relative z-10 w-full px-8 md:px-16 py-16 flex flex-col md:flex-row
          items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Join the Mission
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-4">
              Find Out How, Where &<br />When We Worship.
            </h2>
            <p className="text-white/70 text-base md:text-lg">
              We hope to see you soon — come experience the grace of God with us.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                bg-primary hover:bg-primary/90 text-white font-semibold text-sm
                transition-all duration-200 shadow-lg hover:shadow-primary/30"
            >
              Join Us <ArrowRight size={16} />
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                border border-white/30 hover:border-white/60 text-white font-semibold text-sm
                backdrop-blur-sm transition-all duration-200"
            >
              View Events
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
