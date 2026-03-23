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
        <Link to="/landing" className={`flex items-center space-x-2 transition-colors ${!isScrolled ? 'text-white' : 'text-foreground'}`}>
          <span className="text-2xl font-serif font-bold ">
            Brother Suresh Babu
          </span>
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
                    !isScrolled ? 'text-white/90 hover:text-white' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              );
            }
            
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`relative text-sm font-medium transition-smooth group ${
                  isActive 
                    ? "text-primary" 
                    : !isScrolled 
                      ? "text-white/90 hover:text-white" 
                      : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-smooth ${!isScrolled ? 'text-white' : 'text-foreground hover:text-primary'}`}
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
                  className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 transition-smooth"
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
                className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 transition-smooth"
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
