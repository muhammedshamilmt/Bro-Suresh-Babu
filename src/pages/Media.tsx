import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Play, Youtube, Facebook, Instagram, Music, Video, Headphones, ArrowRight, Share2, MessageCircle, Mail, MapPin, Globe, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

// const LATEST_MESSAGES = [
//   {
//     id: 1,
//     title: "The Power of Grace in Modern Times",
//     thumbnail: "https://images.unsplash.com/photo-1519781542704-958ff1dbbf78?q=80&w=1470&auto=format&fit=crop",
//     date: "August 15, 2023",
//     duration: "45:20"
//   },
//   {
//     id: 2,
//     title: "Understanding Your Divine Purpose",
//     thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1473&auto=format&fit=crop",
//     date: "August 8, 2023",
//     duration: "52:10"
//   },
//   {
//     id: 3,
//     title: "Walking in Faith During Uncertainty",
//     thumbnail: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1470&auto=format&fit=crop",
//     date: "August 1, 2023",
//     duration: "38:45"
//   }
// ];

const YOUTUBE_CHANNELS = [
  { lang: "Hindi", handle: "@brothersureshbabuhindi", url: "https://www.youtube.com/channel/UC-uUoBYSnx_7tC9nC2kvtAQ", flag: "🇮🇳" },
  { lang: "English", handle: "@brothersureshbabuenglish", url: "https://www.youtube.com/channel/UCKv2sCGAxT9rUW880dkJk_Q", flag: "🇬🇧" },
  { lang: "Telugu", handle: "@brothersureshbabutelugu", url: "https://www.youtube.com/channel/UCIDI0SBN8hNEOx3tpQ_KzRA", flag: "🇮🇳" },
  { lang: "Tamil", handle: "@brothersureshbabutamil", url: "https://www.youtube.com/channel/UCaKa1T5d9V81coLZEKd-FGA", flag: "🇮🇳" },
  { lang: "French", handle: "@brothersureshbabufrench", url: "https://www.youtube.com/channel/UCsQRXKzK2MtSwYIjnaTZ-2A", flag: "🇫🇷" },
  { lang: "Spanish", handle: "@brothersureshbabuspanish", url: "https://www.youtube.com/channel/UCNpHTdvVUBmuxmcHtoPwiqw", flag: "🇪🇸" },
];

const SOCIAL_LINKS = [
  { label: "Facebook Page", icon: Facebook, url: "https://www.facebook.com/brothersureshbabu/", color: "text-blue-600", bg: "bg-blue-600/10", hint: "Facebook" },
  { label: "Instagram", icon: Instagram, url: "https://www.instagram.com/brothersureshbabu/", color: "text-pink-600", bg: "bg-pink-600/10", hint: "Instagram" },
  { label: "Facebook Group", icon: Facebook, url: "https://m.me/j/AbZf1Y0CTUjIVNZl/", color: "text-blue-500", bg: "bg-blue-500/10", hint: "FB Group" },
  { label: "WhatsApp Channel", icon: MessageCircle, url: "https://whatsapp.com/channel/0029VaBNok3CHDyhbcXhE53o", color: "text-green-500", bg: "bg-green-500/10", hint: "WhatsApp" },
  { label: "Telegram", icon: Send, url: "https://t.me/brothersureshbabutvm", color: "text-sky-500", bg: "bg-sky-500/10", hint: "Telegram" },
  { label: "WhatsApp Direct", icon: MessageCircle, url: "https://wa.me/8111958000", color: "text-green-600", bg: "bg-green-600/10", hint: "WhatsApp" },
];

const CONTACT_INFO = [
  { icon: Mail, title: "Email", details: "support@brothersureshbabu.org", link: "mailto:support@brothersureshbabu.org" },
  { icon: Phone, title: "Phone", details: "+91 8606 222 273 / +91 8113 986 000", link: "tel:+918606222273" },
  { icon: Phone, title: "Landline", details: "+91 471 272 5273 / 5274", link: "tel:+914712725273" },
  { icon: MapPin, title: "Office Address", details: "TC 11/729, PENGG House, Division Office Road, Near PNG, Trivandrum – 695033", link: "https://maps.app.goo.gl/iGZT19JoaSkk8v2t5" },
  { icon: MapPin, title: "Church Address", details: "Ed Heights Building, 6th Floor, Pattom, Thiruvananthapuram", link: "https://maps.app.goo.gl/iGZT19JoaSkk8v2t5" },
  { icon: Globe, title: "Website", details: "www.brothersureshbabu.org", link: "https://brothersureshbabu.org/" },
];

const Media = () => {
  return (
    <div className="min-h-screen p-3 bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full rounded-[40px] h-[60vh] flex items-center justify-center overflow-hidden mt-2">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop"
            alt="Media & Sermons"
            className="w-full h-full object-cover rounded-[40px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B2D3A]/90 via-[#0D3A4A]/80 to-[#071E28]/90 rounded-[40px]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-full mb-6 sm:mb-8 border border-white/20"
          >
            <Video className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Media & Resources
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto font-light"
          >
            Access our latest sermons, worship clips, and transforming messages from anywhere.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        
        {/* Latest Messages Section
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold font-serif text-blue-dark mb-4"
            >
              Latest Messages
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-lg text-muted-foreground"
            >
              Catch up on the word God has been speaking to our congregation in our recent services.
            </motion.p>
          </div>
          <Button variant="outline" className="mt-6 md:mt-0 rounded-full border-blue-dark/20 text-blue-dark hover:bg-blue-dark hover:text-white transition-all">
            View All Sermons <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {LATEST_MESSAGES.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-[30px] overflow-hidden mb-6 shadow-md border border-border">
                <img 
                  src={msg.thumbnail} 
                  alt={msg.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-75">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center pl-1 shadow-xl">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-medium">
                  {msg.duration}
                </div>
              </div>
              <p className="text-sm text-primary font-semibold mb-2">{msg.date}</p>
              <h3 className="text-xl font-bold text-blue-dark leading-tight group-hover:text-primary transition-colors">
                {msg.title}
              </h3>
            </motion.div>
          ))}
        </div> */}

        {/* Regional YouTube Channels */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-accent/30 rounded-[40px] p-8 md:p-12 border border-border mt-16"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center shrink-0">
              <Youtube className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-blue-dark">Global YouTube Network</h2>
              <p className="text-muted-foreground mt-2">Subscribe to our regional channels for content in your native language.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {YOUTUBE_CHANNELS.map((channel, i) => (
              <a href={channel.url} target="_blank" rel="noreferrer" key={i} className="flex flex-col p-5 bg-white rounded-[20px] shadow-sm hover:shadow-md border border-border hover:border-red-500/30 transition-all group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl">{channel.flag}</span>
                  <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-red-500 transition-colors" />
                </div>
                <h4 className="font-bold text-lg text-foreground">{channel.lang}</h4>
                <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">{channel.handle}</p>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Social Media Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-accent/50 rounded-[40px] p-8 md:p-12 border border-border mt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-blue-dark mb-4">Connect With Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow our social channels to get daily devotionals, live stream alerts, and ministry updates straight to your feed.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {SOCIAL_LINKS.map((social, idx) => (
              <motion.a
                href={social.url}
                key={social.label}
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: idx * 0.05 }}
                className="bg-background flex flex-col items-center justify-center p-6 md:p-8 rounded-[30px] shadow-sm border border-border/50 hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${social.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <social.icon className={`w-6 h-6 md:w-8 md:h-8 ${social.color}`} />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-foreground mb-1 text-center">{social.label}</h3>
                <p className="text-xs text-muted-foreground hidden sm:block">{social.hint}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Information Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 mb-8"
        >
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {CONTACT_INFO.map((info, idx) => (
                <a href={info.link} key={idx} className="bg-white p-6 rounded-[30px] border border-border shadow-sm flex flex-col items-center text-center hover:border-primary/50 transition-colors group">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-primary/20 transition-colors">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-1">{info.title}</h4>
                  <p className="text-sm text-muted-foreground">{info.details}</p>
                </a>
             ))}
           </div>
        </motion.div>

        {/* Media Fund Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative rounded-[40px] overflow-hidden bg-gradient-to-r from-amber-950 to-orange-900 shadow-2xl"
        >
          <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 p-8 md:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <Video className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <p className="text-amber-300 text-xs font-bold uppercase tracking-widest mb-1">Support the Vision</p>
                <h3 className="text-white font-bold text-xl md:text-2xl leading-tight">Media Fund</h3>
                <p className="text-white/60 text-sm mt-1 max-w-md">Help us reach more souls by funding professional media equipment and production.</p>
              </div>
            </div>
            <a
              href="/media-fund"
              className="shrink-0 flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-full transition-all shadow-lg text-sm whitespace-nowrap"
            >
              Give to Media Fund
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Podcast Banner */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mt-24 relative rounded-[40px] overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-900 shadow-2xl"
        >
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1374&auto=format&fit=crop" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium border border-white/20 mb-6">
                <Headphones className="w-4 h-4" /> Available on Spotify & Apple
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Listen to the Podcast</h2>
              <p className="text-lg text-white/80 max-w-xl mb-8">
                Take the word with you anywhere. Our weekly audio podcast brings depth and insight to your daily commute or workout routine.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button className="rounded-full bg-white text-blue-900 hover:bg-gray-100 px-8 py-6 font-semibold shadow-lg">
                  <Play className="w-5 h-5 mr-2 fill-blue-900 text-blue-900" /> Listen Now
                </Button>
              </div>
            </div>
            
            <div className="relative w-full md:w-1/3 aspect-square max-w-[300px] shrink-0">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-600 rounded-[30px] rotate-6 opacity-50 blur-lg" />
               <img src="https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_1400/v1774195148/img-20_k3gkxr.jpg" alt="Podcast Cover" className="relative z-10 w-full h-full object-top object-cover rounded-[30px] shadow-2xl border-4 border-white/10" />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Footer Badge */}
      <div className="mt-8 flex justify-center pb-4 z-10 relative">
        <a href="https://heraldgroup.org/" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-foreground/40 hover:text-primary text-sm transition-colors">
          Powered by
          <span className="font-semibold text-foreground/55 hover:text-primary">Herald Group</span>
        </a>
      </div>
    </div>
  );
};

export default Media;
