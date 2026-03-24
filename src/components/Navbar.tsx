import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  
  // Navbar width transforms from 100% to 95% on scroll
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "95%"]);
  const navPadding = useTransform(scrollY, [0, 100], ["1.5rem 2rem", "1rem 2rem"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/landing" },
    { label: "About", href: "/about" },
    { label: "Christ Centre", href: "/christ-centre" },
    { label: "Ministry", href: "/ministry" },
    { label: "Blog", href: "/blog" },
    { label: "Events", href: "/events" },
    { label: "Give", href: "/give" },
    { label: "Media", href: "/media" },
    { label: "Podcast", href: "/podcast" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      style={{ width: navWidth, padding: navPadding }}
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled ? "glass shadow-medium mt-4 rounded-2xl" : "bg-transparent mt-0 rounded-none"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/landing" className="flex items-center gap-3 text-white transition-colors">
          <span className="text-2xl font-serif font-bold">
            Brother Suresh Babu
          </span>
          {/* LIVE badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/20 border border-red-500/40">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </span>
            <span className="text-red-400 text-[9px] font-bold uppercase tracking-widest">Streaming</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isExternal = item.href.startsWith("/#");
            const isActive = location.pathname === item.href ||
                           (item.href === "/landing" && location.pathname === "/landing");
            
            if (isExternal) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative text-sm font-medium transition-smooth group ${
                    !isScrolled ? 'text-white/90 hover:text-white' : 'text-white/80 hover:text-[#0C647F]'
                  }`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0C647F] transition-all duration-300 group-hover:w-full" />
                </a>
              );
            }
            
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`relative text-sm font-medium transition-smooth group ${
                  isActive 
                    ? "text-[#0C647F]" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#0C647F] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-[#0C647F] transition-smooth"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden mt-4 pb-4 glass rounded-lg"
        >
          {navItems.map((item) => {
            const isExternal = item.href.startsWith("/#");
            
            if (isExternal) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-foreground hover:text-[#0C647F] hover:bg-accent/50 transition-smooth"
                >
                  {item.label}
                </a>
              );
            }
            
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-foreground hover:text-[#0C647F] hover:bg-accent/50 transition-smooth"
              >
                {item.label}
              </Link>
            );
          })}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
