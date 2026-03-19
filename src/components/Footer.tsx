import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Ministry", href: "/ministry" },
      { label: "Blog", href: "/blog" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Message */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-primary">
              Bro. Suresh Babu
            </h3>
            <p className="text-background/80 leading-relaxed">
              33 Years of Full-Time Ministry. Touching Lives Across the Globe.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-full bg-background/10 hover:bg-primary text-background hover:text-primary-foreground transition-smooth"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-background">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-smooth"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-background">Stay Updated</h4>
            <p className="text-background/70 mb-4 text-sm">
              Subscribe to our newsletter for monthly prayer updates and event announcements.
            </p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-glow text-primary-foreground py-2 rounded transition-smooth font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-background">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-background/70">
                  Christ Centre<br />
                  Trivandrum, Kerala<br />
                  India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <a href="mailto:contact@sureshbabu.org" className="text-background/70 hover:text-primary transition-smooth">
                  contact@sureshbabu.org
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="text-background/70 hover:text-primary transition-smooth">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm text-center md:text-left">
              © {currentYear} Bro. Suresh Babu Ministries. All Rights Reserved.
            </p>
            <p className="text-background/60 text-sm text-center md:text-right">
              Powered by Faith & Grace
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
