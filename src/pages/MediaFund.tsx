import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Radio, Copy, CheckCheck, Tv, Mic2, Camera, Wifi, Monitor, ArrowRight, Lightbulb, Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const paymentImg = "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto/v1774196942/payment_pyahj5.png";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Equipment needs
const EQUIPMENT = [
  {
    icon: Camera,
    label: "4K Broadcast Camera",
    desc: "Professional cinema-grade cameras for high-quality recording of crusades, services, and studio productions.",
    cost: "₹2,50,000",
    raised: 60,
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Mic2,
    label: "Wireless Mic System",
    desc: "Multi-channel wireless microphone setup for large outdoor crusade events and stage productions.",
    cost: "₹80,000",
    raised: 45,
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Monitor,
    label: "Video Editing Station",
    desc: "High-performance workstation for editing multilingual content across 6 language channels.",
    cost: "₹1,20,000",
    raised: 75,
    img: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Tv,
    label: "LED Broadcast Screen",
    desc: "Large LED display panels for outdoor crusade venues reaching thousands of attendees.",
    cost: "₹3,50,000",
    raised: 30,
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Wifi,
    label: "Live Streaming Setup",
    desc: "Encoder, switcher and internet uplink for live broadcasts reaching 52+ nations simultaneously.",
    cost: "₹95,000",
    raised: 55,
    img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Lightbulb,
    label: "Studio Lighting Kit",
    desc: "Professional lighting rig for studio-quality video production and on-location shoots.",
    cost: "₹60,000",
    raised: 80,
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
  },
];

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-border/50 last:border-0">
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
        <p className="font-mono font-semibold text-foreground">{value}</p>
      </div>
      <button onClick={copy}
        className="shrink-0 p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
        aria-label={`Copy ${label}`}>
        {copied ? <CheckCheck size={16} className="text-green-500" /> : <Copy size={16} />}
      </button>
    </div>
  );
}

function BankCard({ title, fields, delay }: { title: string; fields: { label: string; value: string }[]; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div ref={ref} custom={delay} variants={fadeUp} initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-card rounded-2xl border border-border p-6 shadow-soft">
      <h3 className="font-serif font-bold text-lg mb-4 text-foreground">{title}</h3>
      {fields.map((f) => <CopyField key={f.label} {...f} />)}
    </motion.div>
  );
}

const MediaFund = () => {
  const qrRef = useRef(null);
  const qrInView = useInView(qrRef, { once: true, amount: 0.2 });
  const equipRef = useRef(null);
  const equipInView = useInView(equipRef, { once: true, amount: 0.1 });

  return (
    <div className="min-h-screen bg-background p-3">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full rounded-[40px] h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1400/v1774195157/img-24_lqtjmx.jpg"
            alt="Media Fund"
            className="w-full rounded-[40px] h-full object-cover object-center"
          />
          <div className="absolute rounded-[40px] inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 border border-primary/40 mb-5">
            <Radio size={26} className="text-primary" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
            Media Fund
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Equip the ministry with broadcast-grade tools to reach millions across 52+ nations
            through TV, radio, and digital platforms.
          </motion.p>
        </div>
      </section>

      {/* Quick nav */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/give"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card
                hover:border-primary/50 hover:shadow-[0_0_30px_hsl(31,55%,64%,0.15)]
                transition-all duration-300 p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center
                group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <ArrowRight size={20} className="text-primary rotate-180" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Also Support</p>
                <p className="font-serif font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">Give & Support</p>
                <p className="text-xs text-muted-foreground mt-0.5">General ministry giving</p>
              </div>
              <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
            <Link to="/building-fund"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card
                hover:border-primary/50 hover:shadow-[0_0_30px_hsl(31,55%,64%,0.15)]
                transition-all duration-300 p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center
                group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <Monitor size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Also Support</p>
                <p className="font-serif font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">Building Fund</p>
                <p className="text-xs text-muted-foreground mt-0.5">Help build a house of worship</p>
              </div>
              <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Scripture
      <section className="py-10 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-lg md:text-2xl font-serif italic max-w-3xl mx-auto leading-relaxed">
            "Go into all the world and preach the gospel to every creature."
            <span className="block mt-2 text-sm not-italic font-semibold opacity-80">— Mark 16:15</span>
          </motion.p>
        </div>
      </section> */}

      {/* Equipment Needs */}
      <section className="py-20 bg-background" ref={equipRef}>
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={equipInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="text-center mb-6">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">Equipment Needs</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">What We Need</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Your contribution directly funds broadcast-grade equipment that carries the Gospel
              to millions who cannot attend in person.
            </p>
          </motion.div>

          {/* Total cost banner */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={equipInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-14 py-5 px-8
              bg-primary/5 border border-primary/20 rounded-2xl max-w-2xl mx-auto">
            {[
              { label: "Total Target", value: "₹9,55,000" },
              { label: "Equipment Items", value: "6 Units" },
              { label: "Nations Reached", value: "52+" },
            ].map((s) => (
              <div key={s.label} className="text-center px-4">
                <p className="text-2xl font-serif font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EQUIPMENT.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 32 }}
                animate={equipInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                className="group rounded-2xl overflow-hidden border border-border bg-card
                  hover:border-primary/40 hover:shadow-[0_8px_40px_hsl(31,55%,64%,0.15)]
                  transition-all duration-300 flex flex-col">

                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img src={item.img} alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Icon badge */}
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-primary/90 backdrop-blur-sm
                    flex items-center justify-center shadow-lg">
                    <item.icon size={17} className="text-white" />
                  </div>
                  {/* Cost badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm
                    text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                    Est. {item.cost}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-serif font-bold text-foreground text-base mb-1.5">{item.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.desc}</p>

                  {/* Progress */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-muted-foreground">Funding progress</span>
                      <span className="text-xs font-bold text-primary">{item.raised}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={equipInView ? { width: `${item.raised}%` } : {}}
                        transition={{ duration: 0.9, delay: 0.3 + i * 0.09, ease: "easeOut" }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bank Details */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">Bank Transfer</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Send Your Gift</h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm">
              Transfer directly to either account below. Every rupee goes toward expanding the media reach of the Gospel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BankCard title="Christ Centre Gospel Foundation" delay={0} fields={[
              { label: "Account Number", value: "17450200001988" },
              { label: "IFSC Code",      value: "FDRL0001736" },
              { label: "Bank",           value: "Federal Bank, Kaniyapuram" },
            ]} />
            <BankCard title="Suresh Babu B" delay={1} fields={[
              { label: "Account Number", value: "67303058291" },
              { label: "IFSC Code",      value: "SBIN0070020" },
              { label: "Bank",           value: "SBI Kowdiar" },
            ]} />
          </div>
        </div>
      </section>

      {/* QR Code */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-sm text-center" ref={qrRef}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={qrInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}>
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">Scan & Pay</p>
            <h3 className="text-2xl font-serif font-bold mb-6">UPI / QR Code</h3>
            <div className="inline-block p-4 bg-white rounded-2xl shadow-medium border border-border">
              <img src={paymentImg} alt="Payment QR Code" className="w-48 h-48 object-contain" />
            </div>
            <p className="text-sm text-muted-foreground mt-4">Scan with any UPI app to give instantly</p>
          </motion.div>
        </div>
      </section>

      {/* Note */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
            <Radio size={28} className="text-primary mx-auto mb-4" />
            <p className="text-muted-foreground leading-relaxed">
              For international transfers or large donations, please{" "}
              <a href="/contact" className="text-primary font-semibold hover:underline">contact us</a>{" "}
              directly. All contributions are used exclusively for media ministry and equipment procurement.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MediaFund;
