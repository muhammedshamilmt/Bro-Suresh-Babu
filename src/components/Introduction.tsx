import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const introCommunity = "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_900/v1774195150/img-21_nj51uc.jpg";

const Introduction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-24 bg-gradient-warm" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <motion.img
                src={introCommunity}
                alt="Grace Community Global"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              From Despair to{" "}
              <span>
                Destiny
              </span>
            </h2>

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                At 17, facing suicidal thoughts, Brother Suresh Babu encountered Jesus's love and compassion, 
                leading to a complete life transformation. This divine intervention sparked a lifelong 
                testimony and passion for witnessing.
              </p>
              
              <p>
                Since 1990, he has been officially serving as a full-time evangelist, starting from small 
                gatherings in South India to reaching over 25 nations and 19 Indian states today.
              </p>
              
              <p>
                His non-denominational approach and Gospel-centered teaching has touched countless lives, 
                bringing practical spiritual transformation and restoring families globally.
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <Button 
                size="lg" 
                onClick={() => window.location.href='/about'}
                className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow transition-smooth"
              >
                Read Full Biography
              </Button>
              <p className="text-sm text-muted-foreground italic">
                A Living Example of Acts 16:31
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
