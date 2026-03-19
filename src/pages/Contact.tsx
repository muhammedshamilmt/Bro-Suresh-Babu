import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Globe, Facebook, Youtube, Instagram } from "lucide-react";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string().trim().max(20, { message: "Phone must be less than 20 characters" }).optional(),
  type: z.string().min(1, { message: "Inquiry type is required" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" })
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out to Brother Suresh Babu Ministries. We'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        type: "",
        message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: "Validation Error",
          description: "Please check the form and try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "info@brosureshbabu.org",
      link: "mailto:info@brosureshbabu.org"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+91 94471 42358",
      link: "tel:+919447142358"
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: "Christ Centre, Trivandrum, Kerala, India",
      link: "https://maps.google.com/?q=Christ+Centre+Trivandrum"
    },
    {
      icon: Globe,
      title: "Website",
      details: "www.brosureshbabu.org",
      link: "https://brosureshbabu.org"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-blue-dark">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1470&auto=format&fit=crop"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-dark to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-serif mb-6"
          >
            Contact & Booking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Invite Brother Suresh Babu, send prayer requests, or inquire about ministry partnerships.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Information Elements */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8 order-2 lg:order-1"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-blue-dark">
                  Ministry Office
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Get in touch with the official ministry office of Brother Suresh Babu. 
                  We aim to respond to all inquiries within 24-48 hours.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-soft transition-all duration-300 group"
                    >
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1 font-serif text-lg">{info.title}</h3>
                        <p className="text-muted-foreground group-hover:text-primary transition-colors">
                          {info.details}
                        </p>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <div className="pt-8">
                <h3 className="text-xl font-bold font-serif mb-4 text-blue-dark">Connect on Social Media</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-glow border border-border sticky top-24">
                <h2 className="text-2xl md:text-3xl font-bold font-serif mb-2 text-foreground">
                  Send an Inquiry
                </h2>
                <p className="text-muted-foreground mb-8">
                  Use this form to invite Brother Suresh, share a testimony, or request prayer.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-bold text-foreground mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={`w-full bg-background border ${errors.type ? 'border-destructive' : 'border-input'} rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20`}
                    >
                      <option value="">Select an option...</option>
                      <option value="Event Booking/Invitation">Event Booking / Invitation</option>
                      <option value="Prayer Request">Prayer Request</option>
                      <option value="Testimony">Share a Testimony</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Partnership">Ministry Partnership</option>
                    </select>
                    {errors.type && <p className="text-destructive text-sm mt-1">{errors.type}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91..."
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-foreground mb-2">
                      Message / Request *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={formData.type === 'Event Booking/Invitation' ? "Please provide event dates, location, and expected attendance..." : "How can we help you?"}
                      rows={5}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg rounded-xl"
                  >
                    {isSubmitting ? (
                      "Sending Message..."
                    ) : (
                      <>
                        Submit Request
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Graphic Section */}
      <section className="h-64 md:h-96 w-full relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3946.0691516089204!2d76.9405!3d8.5305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzEnNDkuOCJOIDc2wrA1NicyNS44IkU!5e0!3m2!1sen!2sin!4v1633512345678!5m2!1sen!2sin" 
          className="w-full h-full border-0" 
          allowFullScreen={false} 
          loading="lazy"
        />
      </section>

      <Footer />
    </div>
  );
};

export default Contact;