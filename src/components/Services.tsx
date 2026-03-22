import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { BookOpen, Users, Heart, Radio } from "lucide-react";

const cl = (url: string) => url.replace("/upload/", "/upload/f_auto,q_auto,w_1200/");

// Distributed across 4 service cards
const serviceImages = [
  // Gospel Campaigns (7)
  [
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195147/img-1_mfnnu1.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195146/img-2_ecf3r5.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195149/img-3_rxycs8.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195151/img-4_uymnkt.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195152/img-5_ycyrf4.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195155/img-6_ti6qmr.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195165/img-7_yevbv7.jpg",
  ],
  // Seminars & Training (7)
  [
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195156/img-8_hspdx8.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195157/img-9_ijhyvp.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195162/img-11_vqtnsd.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195161/img-12_qjyno3.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195167/img-13_kqw3rc.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195165/img-14_j6nuil.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195168/img-15_gzrz7d.jpg",
  ],
  // Youth Camps (7)
  [
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195144/img-16_fc53dw.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195144/img-17_iun9rm.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195148/img-18_fvlhqj.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195146/img-19_swypkw.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195148/img-20_k3gkxr.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195150/img-21_nj51uc.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195150/img-22_cwjiac.jpg",
  ],
  // Media Ministry (8)
  [
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195155/img-23_qjfc72.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195157/img-24_lqtjmx.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195153/img-25_grv02w.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195153/img-26_o3wccz.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195161/img-27_gp8lhj.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195159/img-28_y2gg0a.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195160/img-29_qyhx2w.jpg",
    "https://res.cloudinary.com/dfadqkxbo/image/upload/v1774195164/img-30_wuqvhj.jpg",
  ],
].map((group) => group.map(cl));

const services = [
  {
    icon: Users,
    title: "Gospel Campaigns",
    description: "Large-scale evangelical crusades reaching thousands with the message of hope and salvation.",
  },
  {
    icon: BookOpen,
    title: "Seminars & Training",
    description: "In-depth teaching programs equipping church leaders and pastors with practical spiritual insights.",
  },
  {
    icon: Heart,
    title: "Youth Camps",
    description: "Engaging the next generation in faith, fostering community, and guiding young believers.",
  },
  {
    icon: Radio,
    title: "Media Ministry",
    description: "Broadcasting on South American TV reaching 52+ nations, along with international radio programs.",
  },
];

const TOP_ANCHORED_SERVICES = new Set([
  "img-7_yevbv7", "img-8_hspdx8", "img-25_grv02w",
  "img-26_o3wccz", "img-20_k3gkxr", "img-19_swypkw",
]);

function bgPosition(url: string) {
  return [...TOP_ANCHORED_SERVICES].some((id) => url.includes(id)) ? "bg-top" : "bg-center";
}
function ImageSlideshow({ images, interval = 3500 }: { images: string[]; interval?: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className={`absolute inset-0 bg-cover ${bgPosition(images[current])}`}
          style={{ backgroundImage: `url(${images[current]})` }}
        />
      </AnimatePresence>
      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Desktop stacking card ─────────────────────────────────────────────────────
const DesktopServiceCard = ({ service, images, index, total, scrollYProgress }: any) => {
  const scale = useTransform(
    scrollYProgress,
    [index / total, 1],
    [1, 1 - (total - 1 - index) * 0.05]
  );

  return (
    <div
      className="sticky w-full max-w-[1400px] mx-auto flex items-center justify-center px-4 lg:px-8"
      style={{
        height: "500px",
        top: `calc(15vh + ${index * 40}px)`,
        marginTop: index === 0 ? "0" : "80vh",
        zIndex: index,
      }}
    >
      <motion.div
        style={{ scale }}
        className="relative w-full h-full rounded-[40px] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.1)] origin-top bg-card"
      >
        <ImageSlideshow images={images} interval={3500 + index * 500} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="relative h-full flex flex-col justify-end p-8 md:p-12 pb-14">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/30 backdrop-blur-md rounded-full border border-primary/40 shadow-glow">
              <service.icon className="w-5 h-5 text-primary-foreground" />
              <span className="text-sm font-bold text-primary-foreground">
                Highlight {index + 1}
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white font-serif">
              {service.title}
            </h3>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-sans">
              {service.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="services" className="relative w-full bg-background">
      <div className="text-center pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 px-4 relative z-10 bg-background">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Ministry Highlights</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Impacting the world through diverse outreach and teaching programs
        </p>
      </div>

      {/* Desktop: Stacking Cards */}
      <div ref={containerRef} className="hidden lg:block relative pb-[20vh] bg-background">
        {services.map((service, index) => (
          <DesktopServiceCard
            key={service.title}
            service={service}
            images={serviceImages[index]}
            index={index}
            total={services.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Mobile & Tablet: Card Grid */}
      <div className="lg:hidden px-4 pb-16 space-y-6 max-w-2xl mx-auto">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="relative overflow-hidden rounded-[30px] shadow-medium hover:shadow-glow transition-shadow"
          >
            <div className="relative h-[400px]">
              <ImageSlideshow images={serviceImages[index]} interval={3500 + index * 500} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
              <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 pb-12">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/30 backdrop-blur-sm rounded-full border border-primary/30">
                    <service.icon className="w-4 h-4 text-primary-foreground" />
                    <span className="text-sm font-bold text-primary-foreground">
                      Highlight {index + 1}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white font-serif leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
