import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Foundations", href: "#foundations" },
      { label: "Testimonials", href: "#testimonials" },
    ],
    resources: [
      { label: "Sermons", href: "#" },
      { label: "Bible Studies", href: "#" },
      { label: "Prayer Requests", href: "#" },
      { label: "Events", href: "#" },
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
            <h3 className="text-2xl font-serif font-bold">
              Sajith Joseph
            </h3>
            <p className="text-background/80 leading-relaxed">
              Spreading the message of God's grace and love, uniting believers in Christ through faith, hope, and spiritual renewal.
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

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-background">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
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

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-background">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-background/70">
                  Grace Community Global
                  <br />
                  Tetelestai Centre
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <a href="mailto:info@gracecommunity.org" className="text-background/70 hover:text-primary transition-smooth">
                  info@gracecommunity.org
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <a href="tel:+1234567890" className="text-background/70 hover:text-primary transition-smooth">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm text-center md:text-left">
              © {currentYear} Grace Community Global. All Rights Reserved.
            </p>
            <p className="text-background/60 text-sm text-center md:text-right">
              Living in the fullness of God's grace
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
