import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const cl = (url: string) =>
  url.replace("/upload/", "/upload/f_auto,q_auto,w_800/");

const ITEMS = [
  {
    title: "Gospel Campaigns",
    description:
      "Large-scale evangelical crusades reaching thousands with the message of hope and salvation across nations.",
    sub: [
      { label: "Open-air Crusades",      img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195147/img-1_mfnnu1.jpg") },
      { label: "City-wide Outreach",     img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195146/img-2_ecf3r5.jpg") },
      { label: "Healing Meetings",       img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195149/img-3_rxycs8.jpg") },
      { label: "Altar Calls",            img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195151/img-4_uymnkt.jpg") },
      { label: "Follow-up Discipleship", img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195152/img-5_ycyrf4.jpg") },
    ],
  },
  {
    title: "Seminars & Training",
    description:
      "In-depth teaching programs equipping church leaders and pastors with practical spiritual insights.",
    sub: [
      { label: "Pastoral Training",    img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195162/img-11_vqtnsd.jpg") },
      { label: "Leadership Seminars",  img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195161/img-12_qjyno3.jpg") },
      { label: "Bible Conferences",    img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195167/img-13_kqw3rc.jpg") },
      { label: "Church Planting",      img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195165/img-14_j6nuil.jpg") },
      { label: "Theological Equipping",img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195168/img-15_gzrz7d.jpg") },
    ],
  },
  {
    title: "Youth Camps",
    description:
      "Engaging the next generation in faith, fostering community, and guiding young believers into purpose.",
    sub: [
      { label: "Summer Camps",        img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195144/img-16_fc53dw.jpg") },
      { label: "Youth Retreats",      img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195144/img-17_iun9rm.jpg") },
      { label: "Worship Nights",      img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195148/img-18_fvlhqj.jpg") },
      { label: "Mentorship Programs", img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195150/img-21_nj51uc.jpg") },
      { label: "Teen Discipleship",   img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195150/img-22_cwjiac.jpg") },
    ],
  },
  {
    title: "Media Ministry",
    description:
      "Broadcasting on South American TV reaching 52+ nations, along with international radio programs.",
    sub: [
      { label: "TV Broadcasts",       img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195155/img-23_qjfc72.jpg") },
      { label: "YouTube Channels",    img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195157/img-24_lqtjmx.jpg") },
      { label: "Radio Programs",      img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195161/img-27_gp8lhj.jpg") },
      { label: "Multilingual Content",img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195159/img-28_y2gg0a.jpg") },
      { label: "Online Outreach",     img: cl("https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195164/img-30_wuqvhj.jpg") },
    ],
  },
];

// ── Sub-item list (right column) ──────────────────────────────────────────────
function SubList({
  items,
  onHoverImg,
}: {
  items: (typeof ITEMS)[0]["sub"];
  onHoverImg: (img: string | null) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="flex flex-col divide-y divide-border/40">
      {items.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
          onMouseEnter={() => onHoverImg(s.img)}
          onMouseLeave={() => onHoverImg(null)}
          className="group flex items-center gap-3 py-4 cursor-default"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors flex-shrink-0" />
          <span className="text-lg md:text-xl font-bold font-serif text-foreground/60
            group-hover:text-foreground transition-colors duration-150 leading-tight">
            {s.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Single accordion row ──────────────────────────────────────────────────────
function AccordionRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof ITEMS)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [hoverImg, setHoverImg] = useState<string | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`border-b border-border/50 transition-colors duration-300 ${isOpen ? "bg-muted/20" : ""}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── Left: number + title + description ── */}
        <div className="px-8 md:px-14 py-10 lg:border-r border-border/40">
          <button onClick={onToggle} className="w-full text-left group flex items-start gap-5 mb-5">
            <span className="text-primary/40 text-xs font-mono mt-2 select-none flex-shrink-0">
              0{index + 1}
            </span>

            {/* Title — hover image floats here */}
            <div ref={titleRef} className="relative">
              <h3 className={`font-serif font-bold leading-tight transition-colors duration-200
                ${isOpen
                  ? "text-primary text-4xl md:text-5xl"
                  : "text-foreground text-3xl md:text-4xl group-hover:text-primary"
                }`}>
                {item.title}.
              </h3>

              {/* Hover image — appears over the title area, clips up from bottom */}
              <AnimatePresence>
                {hoverImg && (
                  <motion.div
                    key={hoverImg}
                    className="absolute top-0 md:-right-48  w-48 h-64 rounded-xl overflow-hidden shadow-2xl z-20 pointer-events-none"
                    initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0.8 }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
                    exit={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <img
                      src={hoverImg}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>

          <p className="text-muted-foreground text-base leading-relaxed pl-10 max-w-sm">
            {item.description}
          </p>
        </div>

        {/* ── Right: sub-items slide in from left on scroll ── */}
        <div className="px-8 md:px-14 py-10 flex flex-col justify-center">
          <SubList items={item.sub} onHoverImg={setHoverImg} />
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function MinistryAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background">
      {/* Header */}
      <div className="px-8 md:px-14 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            What We Do
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight max-w-xl">
            Ministry at a Glance.
          </h2>
        </motion.div>
      </div>

      <div className="border-t border-border/60" />

      {ITEMS.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
        >
          <AccordionRow
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        </motion.div>
      ))}
    </section>
  );
}
