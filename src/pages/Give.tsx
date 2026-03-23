import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Copy, CheckCheck, Building2, CreditCard, Radio, ArrowRight } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const paymentImg = "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto/v1774196942/payment_pyahj5.png";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

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
      <button
        onClick={copy}
        className="shrink-0 p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
        aria-label={`Copy ${label}`}
      >
        {copied ? <CheckCheck size={16} className="text-green-500" /> : <Copy size={16} />}
      </button>
    </div>
  );
}

function BankCard({
  title,
  fields,
  delay,
}: {
  title: string;
  fields: { label: string; value: string }[];
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Building2 size={20} className="text-primary" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      {fields.map((f) => (
        <CopyField key={f.label} label={f.label} value={f.value} />
      ))}
    </motion.div>
  );
}

const Give = () => {
  const qrRef = useRef(null);
  const qrInView = useInView(qrRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-background p-3">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full rounded-[40px] h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1400/v1774196451/cta-background_wqv5n9.jpg"
            alt="Give & Support"
            className="w-full h-full object-cover object-center rounded-[40px] "
          />
          <div className="absolute inset-0 bg-black/60 rounded-[40px] " />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 border border-primary/40 mb-5"
          >
            <Heart size={26} className="text-primary" fill="currentColor" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-4"
          >
            Give &amp; Support
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Your generosity fuels the Gospel mission — reaching lives, building communities,
            and spreading the love of Christ across the nations.
          </motion.p>
        </div>
      </section>

      {/* Quick nav cards */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/building-fund"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card
                hover:border-primary/50 hover:shadow-[0_0_30px_hsl(31,55%,64%,0.15)]
                transition-all duration-300 p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center
                group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <Building2 size={22} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Also Support</p>
                <p className="font-serif font-bold text-foreground text-lg leading-tight
                  group-hover:text-primary transition-colors">Building Fund</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  Help build a house of worship
                </p>
              </div>
              <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary
                group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>

            <Link
              to="/media-fund"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card
                hover:border-primary/50 hover:shadow-[0_0_30px_hsl(31,55%,64%,0.15)]
                transition-all duration-300 p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center
                group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <Radio size={22} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Explore</p>
                <p className="font-serif font-bold text-foreground text-lg leading-tight
                  group-hover:text-primary transition-colors">Media Fund</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  Equip broadcast &amp; media outreach
                </p>
              </div>
              <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary
                group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bank Details */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <CreditCard size={14} />
              Bank Transfer
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Account Details</h2>
            <p className="text-muted-foreground mt-3">
              Transfer directly to either account below. Tap any field to copy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <BankCard
              title="Christ Centre Gospel Foundation"
              delay={0}
              fields={[
                { label: "Account Number", value: "17450200001988" },
                { label: "IFSC Code", value: "FDRL0001736" },
                { label: "Bank", value: "Federal Bank" },
                { label: "Branch", value: "Kaniyapuram" },
              ]}
            />
            <BankCard
              title="Suresh Babu B"
              delay={1}
              fields={[
                { label: "Account Number", value: "67303058291" },
                { label: "IFSC Code", value: "SBIN0070020" },
                { label: "Bank", value: "State Bank of India" },
                { label: "Branch", value: "Kowdiar" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* QR Code */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-sm text-center" ref={qrRef}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={qrInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-serif font-bold mb-2">Scan &amp; Pay</h2>
            <p className="text-muted-foreground text-sm mb-8">
              Use any UPI app to scan and send your offering instantly.
            </p>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl scale-110 -z-10" />
              <img
                src={paymentImg}
                alt="Payment QR Code"
                className="w-64 h-64 object-contain rounded-2xl border border-border shadow-xl mx-auto"
              />
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Google Pay · PhonePe · Paytm · Any UPI app
            </p>
          </motion.div>
        </div>
      </section>

      {/* Note */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <Heart size={24} className="text-primary mx-auto mb-4" />
            <p className="text-muted-foreground leading-relaxed">
              Every contribution — big or small — makes an eternal difference. If you have any
              questions about giving or would like a receipt, please{" "}
              <a href="/contact" className="text-primary underline underline-offset-4">
                contact us
              </a>
              .
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Give;
