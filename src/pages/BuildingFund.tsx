import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Hammer, Copy, CheckCheck, Building2, CreditCard, Church } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import paymentImg from "@/assets/payment/payment.png";

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

const milestones = [
  { label: "Foundation", desc: "Land secured and foundation laid for the new worship centre" },
  { label: "Structure", desc: "Main hall construction — walls, columns, and roof framework" },
  { label: "Interior", desc: "Flooring, seating, sound system, and lighting installation" },
  { label: "Completion", desc: "Dedication and opening of the completed building to the congregation" },
];

const BuildingFund = () => {
  const qrRef = useRef(null);
  const qrInView = useInView(qrRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-amber-500/5 via-background to-primary/10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 mb-6"
          >
            <Church size={28} className="text-amber-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-5"
          >
            Building Fund
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Help us build a house of worship where generations will encounter God, grow in faith,
            and be sent out to transform the world.
          </motion.p>
        </div>
      </section>

      {/* Scripture */}
      <section className="py-10 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-lg md:text-xl italic font-serif max-w-3xl mx-auto"
          >
            "Unless the Lord builds the house, the builders labour in vain."
          </motion.p>
          <p className="mt-3 text-white/70 text-sm">— Psalm 127:1</p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-sm font-medium mb-4">
              <Hammer size={14} />
              The Vision
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Building for His Glory</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are believing God for a dedicated worship centre that will serve as a hub for
              discipleship, prayer, community outreach, and Gospel proclamation for years to come.
              Every brick laid is a testimony of faith.
            </p>
          </motion.div>

          {/* Milestones */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="md:w-1/2" />
                  {/* dot */}
                  <div className="absolute left-6 md:left-1/2 top-3 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 border-4 border-background shadow" />
                  <div className={`pl-14 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-10" : "md:pr-10 md:text-right"}`}>
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-semibold mb-2">
                      Phase {i + 1}
                    </span>
                    <h3 className="font-bold text-lg mb-1">{m.label}</h3>
                    <p className="text-muted-foreground text-sm">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bank Details */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            variants={fadeUp}
            custom={0}
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
              Send your building fund contribution directly. Tap any field to copy.
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
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-sm text-center" ref={qrRef}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={qrInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-serif font-bold mb-2">Scan &amp; Pay</h2>
            <p className="text-muted-foreground text-sm mb-8">
              Use any UPI app to scan and contribute to the building fund instantly.
            </p>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-amber-500/20 rounded-3xl blur-2xl scale-110 -z-10" />
              <img
                src={paymentImg}
                alt="Building Fund Payment QR Code"
                className="w-64 h-64 object-contain rounded-2xl border border-border shadow-xl mx-auto"
              />
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Google Pay · PhonePe · Paytm · Any UPI app
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA note */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <Church size={24} className="text-amber-600 mx-auto mb-4" />
            <p className="text-muted-foreground leading-relaxed">
              Your gift to the building fund is an investment in the Kingdom of God. For
              questions, receipts, or to give in another way, please{" "}
              <a href="/contact" className="text-primary underline underline-offset-4">
                reach out to us
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

export default BuildingFund;
