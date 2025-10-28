import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import introCommunity from "@/assets/intro-community.jpg";

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
              Welcome to{" "}
              <span>
                Sajith Joseph's Journey!
              </span>
            </h2>

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                This is the extraordinary journey of faith, uniting diverse Christian traditions 
                toward true spiritual renewal. Sajith Joseph has been passionately sharing the 
                Gospel of grace throughout his life.
              </p>
              
              <p>
                His teachings emphasize living a life centered on Christ's finished work on the 
                Cross — encouraging believers to embrace grace and walk in unity. Through Grace 
                Community Global and the Tetelestai Centre, Sajith has touched thousands, bringing 
                revival and hope to communities across nations.
              </p>
              
              <p>
                Join us as we continue to experience God's love, deepen our understanding of His 
                word, and strengthen our faith through community and service.
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow transition-smooth"
              >
                About Me
              </Button>
              <p className="text-sm text-muted-foreground italic">
                Praying and Learning His Holy Word
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
