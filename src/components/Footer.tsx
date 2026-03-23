import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, Send, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const ctaBackground =
  "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1600/v1774196451/cta-background_wqv5n9.jpg";

const MINISTRY = [
  { label: "About",          href: "/about" },
  { label: "Ministry",       href: "/ministry" },
  { label: "Events",         href: "/events" },
  { label: "Blog",           href: "/blog" },
  { label: "Christ Centre",  href: "/christ-centre" },
];

const GIVE = [
  { label: "Give Online",     href: "/give" },
  { label: "Building Fund",   href: "/building-fund" },
  { label: "Contact Us",      href: "/contact" },
];

const SOCIAL = [
  { icon: Facebook,  href: "https://www.facebook.com/brothersureshbabu/",               label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/brothersureshbabu/",              label: "Instagram" },
  { icon: Youtube,   href: "https://www.youtube.com/channel/UC-uUoBYSnx_7tC9nC2kvtAQ", label: "YouTube" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <footer className="bg-white text-foreground rounded-[40px] mb-4 shadow-[0_-4px_24px_rgba(0,5,24,0.08)]">

      {/* ── CTA card — sits at the top of the footer ── */}
      <div className="px-4 md:px-10 pt-16 pb-0" ref={ctaRef}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl min-h-[300px] flex items-center"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${ctaBackground})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />

          <div className="relative z-10 w-full px-8 md:px-16 py-14 flex flex-col md:flex-row
            items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">
                Join the Mission
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-3">
                Find Out How, Where &<br />When We Worship.
              </h2>
              <p className="text-white/70 text-base">
                We hope to see you soon — come experience the grace of God with us.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                  bg-primary hover:bg-primary/90 text-white font-semibold text-sm
                  transition-all duration-200 shadow-lg">
                Join Us <ArrowRight size={15} />
              </Link>
              <Link to="/events"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                  border border-white/30 hover:border-white/60 text-white font-semibold text-sm
                  backdrop-blur-sm transition-all duration-200">
                View Events
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="container mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Col 1 — Brand */}
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-serif font-bold text-primary leading-tight">
                Brother Suresh Babu
              </h3>
              <p className="text-foreground/40 text-xs mt-1 tracking-wide uppercase">
                Ministries
              </p>
            </div>
            <p className="text-foreground/60 text-sm leading-relaxed max-w-xs">
              33 years of full-time ministry — touching lives across 25+ nations through
              the power of the Gospel.
            </p>
            <div className="flex gap-3 pt-1">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center
                    bg-foreground/8 border border-border hover:bg-primary hover:border-primary
                    text-foreground/60 hover:text-white transition-all duration-200">
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Ministry */}
          <div>
            <h4 className="text-foreground text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              Ministry
            </h4>
            <ul className="space-y-3">
              {MINISTRY.map((l) => (
                <li key={l.label}>
                  <Link to={l.href}
                    className="text-foreground/55 hover:text-primary text-sm transition-colors duration-150">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Give & Connect */}
          <div>
            <h4 className="text-foreground text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              Give & Connect
            </h4>
            <ul className="space-y-3">
              {GIVE.map((l) => (
                <li key={l.label}>
                  <Link to={l.href}
                    className="text-foreground/55 hover:text-primary text-sm transition-colors duration-150">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact + Newsletter */}
          <div className="space-y-7">
            <div>
              <h4 className="text-foreground text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/60 text-sm leading-snug">
                    TC 11/729, PENGG House,<br />Division Office Road, Near PNG,<br />Trivandrum – 695033
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/60 text-sm leading-snug">
                    Ed Heights Building, 6th Floor,<br />Pattom, Thiruvananthapuram
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={15} className="text-primary flex-shrink-0" />
                  <div className="flex flex-col gap-0.5">
                    <a href="tel:+918606222273" className="text-foreground/60 hover:text-primary text-sm transition-colors">+91 8606 222 273</a>
                    <a href="tel:+918113986000" className="text-foreground/60 hover:text-primary text-sm transition-colors">+91 8113 986 000</a>
                    <a href="tel:+914712725273" className="text-foreground/60 hover:text-primary text-sm transition-colors">+91 471 272 5273 / 5274</a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={15} className="text-primary flex-shrink-0" />
                  <a href="mailto:support@brothersureshbabu.org"
                    className="text-foreground/60 hover:text-primary text-sm transition-colors">
                    support@brothersureshbabu.org
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Stay Updated
              </h4>
              <form onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2 bg-muted rounded-full px-4 py-2
                  border border-border focus-within:border-primary/50 transition-colors">
                <input type="email" placeholder="Your email" required
                  className="flex-1 bg-transparent text-sm text-foreground
                    placeholder:text-foreground/40 outline-none min-w-0" />
                <button type="submit"
                  className="w-7 h-7 rounded-full bg-primary flex items-center justify-center
                    flex-shrink-0 hover:bg-primary/80 transition-colors">
                  <Send size={13} className="text-white" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row
          items-center justify-between gap-3">
          <p className="text-foreground/40 text-xs">
            © {year} Brother Suresh Babu Ministries. All rights reserved.
          </p>
          <a href="https://heraldgroup.org/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground/40 hover:text-primary text-xs transition-colors">
            Powered by
            <span className="font-semibold text-foreground/55 hover:text-primary">Herald Group</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
