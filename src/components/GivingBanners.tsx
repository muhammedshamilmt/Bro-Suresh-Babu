import { motion } from "framer-motion";
import { Heart, Building2, Radio, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const GivingBanners = () => {
  return (
    <section className="py-16 px-3">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0C647F]/30 bg-[#0C647F]/10 text-[#0C647F] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={12} />
            Ways to Partner
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-3">
            Invest in Eternity
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every contribution advances the Gospel and transforms lives across the globe.
          </p>
        </motion.div>

        {/* Bento Grid — Give large left, two stacked right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 max-w-5xl mx-auto">

          {/* ── GIVE — large 2×2 ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative lg:col-span-2 lg:row-span-2 rounded-[28px] overflow-hidden bg-gradient-to-br from-[#0B2D3A] via-[#0C4A5E] to-[#071E28] p-8 flex flex-col justify-between min-h-[300px] lg:min-h-[440px] border border-white/[0.06]"
          >
            {/* Glow orbs */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[90px] opacity-25 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none bg-[#0C647F]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-[80px] opacity-15 pointer-events-none bg-[#4AAFCA]" />
            {/* Grid texture */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage:"linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)", backgroundSize:"40px 40px" }} />

            {/* Top */}
            <div className="relative z-10 flex items-start justify-between">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[#0C647F]/25 border border-[#0C647F]/30">
                <Heart size={20} className="text-[#4AAFCA]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#0C647F]/20 text-[#4AAFCA]">
                General Giving
              </span>
            </div>

            {/* Stat */}
            <div className="relative z-10">
              <div className="mb-4">
                <span className="text-5xl font-bold text-[#4AAFCA]">25+</span>
                <span className="text-white/40 text-sm font-medium ml-2">Nations Reached</span>
              </div>
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-1">Support the Gospel</p>
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-3">Give</h3>
              <p className="text-white/55 text-base leading-relaxed max-w-sm">
                Fuel evangelism campaigns, crusades, and life-changing ministry across nations. Every gift makes an eternal difference.
              </p>
              <Link
                to="/give"
                className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 rounded-full font-bold text-sm text-white bg-[#0C647F] hover:bg-[#0a5570] transition-all duration-300 group-hover:gap-3 shadow-[0_4px_20px_rgba(12,100,127,0.35)]"
              >
                Give Now <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* ── BUILDING FUND ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="group relative lg:col-span-1 lg:row-span-1 rounded-[24px] overflow-hidden bg-gradient-to-br from-[#1a1000] via-[#6b4c18] to-[#1a1000] p-6 flex flex-col justify-between min-h-[210px] border border-white/[0.06]"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[70px] opacity-25 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none bg-[#D4A574]" />
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage:"linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)", backgroundSize:"32px 32px" }} />

            <div className="relative z-10 flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#D4A574]/20 border border-[#D4A574]/25">
                <Building2 size={18} className="text-[#D4A574]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#D4A574]/15 text-[#D4A574]">
                Infrastructure
              </span>
            </div>

            <div className="relative z-10">
              <div className="mb-2">
                <span className="text-2xl font-bold text-[#D4A574]">18+</span>
                <span className="text-white/40 text-xs ml-2">Years of Ministry</span>
              </div>
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-1">Build God's House</p>
              <h3 className="text-xl font-bold text-white mb-1.5">Building Fund</h3>
              <p className="text-white/50 text-xs leading-relaxed mb-3">
                Help construct a permanent home for worship and discipleship in Trivandrum.
              </p>
              <Link
                to="/building-fund"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs text-white transition-all duration-300 group-hover:gap-2.5"
                style={{ background:"#D4A574", boxShadow:"0 4px 16px rgba(212,165,116,0.30)" }}
              >
                Give Now <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* ── MEDIA FUND ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="group relative lg:col-span-1 lg:row-span-1 rounded-[24px] overflow-hidden bg-gradient-to-br from-[#071828] via-[#0e2e42] to-[#071828] p-6 flex flex-col justify-between min-h-[210px] border border-white/[0.06]"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[70px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none bg-[#4AAFCA]" />
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage:"linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)", backgroundSize:"32px 32px" }} />

            <div className="relative z-10 flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#4AAFCA]/15 border border-[#4AAFCA]/25">
                <Radio size={18} className="text-[#4AAFCA]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#4AAFCA]/12 text-[#4AAFCA]">
                Media Ministry
              </span>
            </div>

            <div className="relative z-10">
              <div className="mb-2">
                <span className="text-2xl font-bold text-[#4AAFCA]">1200+</span>
                <span className="text-white/40 text-xs ml-2">Churches</span>
              </div>
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-1">Broadcast the Word</p>
              <h3 className="text-xl font-bold text-white mb-1.5">Media Fund</h3>
              <p className="text-white/50 text-xs leading-relaxed mb-3">
                Support TV broadcasts and online streaming carrying the Gospel to millions.
              </p>
              <Link
                to="/media-fund"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs text-white transition-all duration-300 group-hover:gap-2.5 bg-[#4AAFCA] hover:bg-[#3a9ab8]"
                style={{ boxShadow:"0 4px 16px rgba(74,175,202,0.28)" }}
              >
                Give Now <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default GivingBanners;
