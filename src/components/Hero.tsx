import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import heroPortrait from "@/assets/hero-portrait.jpg";

const Hero = () => {
  const [counts, setCounts] = useState({ sermons: 0, lives: 0, countries: 0 });

  useEffect(() => {
    const targets = { sermons: 100, lives: 2000, countries: 6 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounts({
        sermons: Math.floor(targets.sermons * progress),
        lives: Math.floor(targets.lives * progress),
        countries: Math.floor(targets.countries * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 pb-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/10 to-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 lg:space-y-8 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20"
            >
              <span className="text-sm font-semibold text-primary">Welcome to Grace Community Global</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
              A Journey of{" "}
              <span className="relative inline-block">
                <span className="">
                  Faith and Unity
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-glow rounded-full origin-left"
                />
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Dive into the inspiring journey of Brother Sajith Joseph — a leader who inspires 
              Christian communities through steadfast faith and spiritual growth. Discover the 
              story that led to Grace Community Global's founding and how it continues to impact 
              lives worldwide.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 lg:pt-8 max-w-xl mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 sm:p-6 hover:shadow-glow transition-all">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    {counts.sermons}+
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 font-medium">Sermons</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 sm:p-6 hover:shadow-glow transition-all">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    {counts.lives}+
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 font-medium">Lives Touched</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 sm:p-6 hover:shadow-glow transition-all">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    {counts.countries}+
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 font-medium">Countries</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative order-first lg:order-last"
          >
            <div className="relative aspect-[4/5] max-w-sm sm:max-w-md mx-auto lg:max-w-none">
              {/* Glow Effect */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 blur-3xl rounded-full"
              />
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 border-4 border-primary/30 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-4 border-primary-glow/20 rounded-full" />
              
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={heroPortrait}
                  alt="Brother Sajith Joseph - Spiritual Leader at Grace Community Global"
                  className="relative object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
