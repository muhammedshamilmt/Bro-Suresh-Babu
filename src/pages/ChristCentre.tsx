import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Christcenter = "https://res.cloudinary.com/dfadqkxbo/image/upload/f_auto,q_auto,w_900/v1774196461/about_gsr3vz.png";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin, Clock, Phone, Users, BookOpen, Heart, Globe,
  UserCheck, Shield, ChevronRight, Church, Flame, HandHeart
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const ChristCentre = () => {
  return (
    <div className="min-h-screen p-3 bg-[#F8F6F1] font-sans selection:bg-[#0C647F] selection:text-white">
      <Navbar />

      {/* SECTION 1: HERO BANNER */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br rounded-[40px] from-[#0B2D3A]/92 via-[#0D3A4A]/85 to-[#071E28]/95 z-10" />
          <img
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
            alt="Worship Service"
            className="w-full h-full object-cover rounded-[40px]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2D3A]/90 via-[#0D3A4A]/80 to-[#071E28]/90 rounded-[40px]" />
        <div className="container relative z-20 text-center px-4 mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 drop-shadow-lg">
              Christ <span className="text-[#4AAFCA]">Centre</span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-200 mb-2 font-light">
              A Dynamic Non-Denominational Church
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Transforming Lives Through the Gospel in Trivandrum, Kerala
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-[#0C647F] hover:bg-[#0a5570] text-white px-8 py-6 text-lg rounded-full shadow-xl transition-all hover:scale-105">
                Visit Us This Sunday
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all bg-transparent">
                Learn More About Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: WELCOME MESSAGE */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F8F6F1] rounded-bl-[100px] -z-0"></div>
        <div className="container max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-[#0B2D3A]/5 rounded-2xl transform -rotate-3"></div>
              <img
                src={Christcenter}
                alt="Brother Suresh Babu"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl relative z-10"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#0C647F] mb-2">
                <Heart size={24} />
                <span className="font-semibold tracking-wider uppercase text-sm">Welcome Home</span>
              </div>
              <h2 className="text-4xl font-playfair font-bold text-[#0B2D3A]">A Message From Our Senior Pastor</h2>

              <div className="text-gray-600 space-y-4 text-lg/relaxed">
                <p>
                  "Welcome to Christ Centre! We are a fast-growing, non-denominational church dedicated to reaching, teaching, and transforming lives through the Gospel of Jesus Christ. For over 18 years, Christ Centre has been a place where people encounter the living God, experience His love, and discover their purpose."
                </p>
                <p>
                  "Our mission is simple: to help people know Jesus Christ, grow in their faith, and go out to impact the world. Whether you're a long-time believer or just beginning your spiritual journey, you'll find a warm, welcoming community here."
                </p>
                <p className="font-medium text-[#0B2D3A]">Join us as we worship, learn, and serve together!</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="font-playfair text-2xl font-bold text-[#0B2D3A]">Brother Suresh Babu</p>
                <p className="text-[#4AAFCA] font-medium">Senior Pastor</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: INFO AT A GLANCE */}
      <section className="py-16 bg-gradient-to-br from-[#102931] via-[#142E35] to-[#1D3F48] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Church, title: "Established", value: "2007" },
              { icon: MapPin, title: "Location", value: "Trivandrum" },
              { icon: Users, title: "Community", value: "Fast-Growing" },
              { icon: Globe, title: "Church Type", value: "Non-Denominational" }
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeIn} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 mx-auto bg-[#4AAFCA]/20 rounded-full flex items-center justify-center mb-4 text-[#4AAFCA]">
                  <stat.icon size={32} />
                </div>
                <h3 className="text-gray-300 text-sm uppercase tracking-wider mb-2">{stat.title}</h3>
                <p className="text-2xl font-bold font-playfair text-white">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: ABOUT & CORE VALUES */}
      <section className="py-24 px-4 bg-[#F8F6F1]">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#0B2D3A] mb-4">Who We Are</h2>
            <div className="w-24 h-1 bg-[#0C647F] mx-auto mb-8"></div>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12 mb-20"
          >
            <motion.div variants={fadeIn} className="bg-white p-10 rounded-[2rem] shadow-xl border-t-4 border-[#0B2D3A]">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#0B2D3A]/10 rounded-xl text-[#0B2D3A]"><Globe size={28} /></div>
                <h3 className="text-3xl font-playfair font-bold text-[#0B2D3A]">Our Vision</h3>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed font-light italic">
                "To be a beacon of God's light in Trivandrum, reaching the lost, strengthening believers, and sending out disciples who transform their communities with the Gospel."
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-10 rounded-[2rem] shadow-xl border-t-4 border-[#0C647F]">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#0C647F]/10 rounded-xl text-[#0C647F]"><BookOpen size={28} /></div>
                <h3 className="text-3xl font-playfair font-bold text-[#0B2D3A]">Our Mission</h3>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed font-light italic">
                "Reaching people with the Gospel, teaching them God's Word, and transforming them into Christ-like disciples who impact the world."
              </p>
            </motion.div>
          </motion.div>

          <h3 className="text-3xl font-playfair font-bold text-center text-[#0B2D3A] mb-12">Our Core Values</h3>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: BookOpen, title: "Gospel-Centered", desc: "Everything we do is rooted in the Gospel. The Word of God is our foundation and guide." },
              { icon: Flame, title: "Holy Spirit Empowered", desc: "We believe in the supernatural work of the Holy Spirit, embracing His gifts and miracles." },
              { icon: Users, title: "Community-Focused", desc: "We are a family. Small groups and cell groups are the heartbeat of our church." },
              { icon: Globe, title: "Mission-Driven", desc: "Passionate about reaching the lost locally and globally. Every believer is a witness." },
              { icon: Church, title: "Non-Denominational", desc: "Welcoming believers from all backgrounds. Unity in Christ is our ultimate emphasis." },
            ].map((value, idx) => (
              <motion.div key={idx} variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 bg-[#0C647F]/10 text-[#0C647F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-[#0B2D3A] mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: SUNDAY WORSHIP SERVICES */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="md:w-1/2 space-y-8"
            >
              <div>
                <span className="text-[#0C647F] font-semibold tracking-wider uppercase text-sm">Join Us</span>
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#0B2D3A] mt-2 mb-6">Worship Services</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Experience dynamic worship, powerful teaching, and a welcoming community. There's a place for you here.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Main Service", time: "Sunday, 10:00 AM - 12:00 PM", desc: "Worship, preaching, prayer, and ministry." },
                  { title: "Youth Service", time: "Sunday, 3:00 PM - 4:30 PM", desc: "Contemporary worship & relevant messages for ages 13-25." },
                  { title: "Evening Prayer", time: "Wednesday, 7:00 PM - 8:00 PM", desc: "Focused prayer, intimate worship, and Bible study." }
                ].map((svc, idx) => (
                  <div key={idx} className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:border-[#0C647F]/40 hover:shadow-lg transition-all bg-[#F8F6F1]/50">
                    <div className="p-3 bg-white rounded-lg shadow-sm h-fit text-[#0B2D3A]">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#0B2D3A]">{svc.title}</h4>
                      <p className="text-[#0C647F] font-medium my-1">{svc.time}</p>
                      <p className="text-gray-600 text-sm mt-1">{svc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="md:w-1/2 relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=1470&auto=format&fit=crop" className="rounded-2xl h-64 object-cover w-full shadow-lg" alt="Worship" />
                <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop" className="rounded-2xl h-64 object-cover w-full shadow-lg mt-8" alt="Prayer" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-2xl">
                <h4 className="font-bold text-[#0B2D3A] mb-2 flex items-center gap-2"><MapPin size={20} className="text-[#0C647F]" /> Easy Access</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Free parking available</li>
                  <li>✓ Wheelchair accessible</li>
                  <li>✓ Nursery & kids care</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6: MINISTRIES */}
      <section className="py-24 bg-gradient-to-br from-[#102931] via-[#142E35] to-[#1D3F48] text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Programs & Ministries</h2>
            <div className="w-24 h-1 bg-[#0C647F] mx-auto mb-6"></div>
            <p className="text-cyan-100 max-w-2xl mx-auto text-lg">Find your community and your calling through our diverse ministries designed for every age and season of life.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Small Groups", icon: Users, tags: ["Fellowship", "Bible Study"], desc: "Neighborhood-based groups meeting in homes for discipleship and community." },
              { title: "Youth Ministry", icon: Flame, tags: ["Ages 13-25", "Sunday 3PM"], desc: "Developing young leaders with contemporary worship and relevant messages." },
              { title: "Children's Ministry", icon: Heart, tags: ["Ages 0-12", "Sunday School"], desc: "Age-appropriate worship, Sunday School, and character development." },
              { title: "Women's Ministry", icon: UserCheck, tags: ["Prayer", "Mentorship"], desc: "Fellowship, prayer circles, and mentorship programs for women of all ages." },
              { title: "Men's Ministry", icon: Shield, tags: ["Breakfast", "Service"], desc: "Monthly focus on fellowship, teaching, and serving the community." },
              { title: "Missions & Outreach", icon: Globe, tags: ["Local", "Global"], desc: "Impacting the world through street evangelism, prison ministry and more." },
              { title: "Healing & Deliverance", icon: HandHeart, tags: ["Prayer", "Counseling"], desc: "Prayer for the sick, deliverance ministry, and pastoral counseling." },
              { title: "Marriage & Family", icon: Church, tags: ["Counseling", "Retreats"], desc: "Strengthening marriages through workshops, classes, and retreats." },
              { title: "Discipleship", icon: BookOpen, tags: ["Training", "Foundations"], desc: "From new believers to advanced leadership training." },
            ].map((min, idx) => (
              <motion.div
                key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-[#0C647F] rounded-lg text-white">
                    <min.icon size={24} />
                  </div>
                  <div className="flex gap-2">
                    {min.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider bg-white/10 px-2 py-1 rounded-full text-cyan-100">{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#4AAFCA] transition-colors">{min.title}</h3>
                <p className="text-cyan-100 text-sm leading-relaxed">{min.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: GIVING & TITHES */}
      <section className="py-24 bg-[#F8F6F1]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-5/12 bg-gradient-to-br from-[#0B2D3A] via-[#0C4A5E] to-[#071E28] p-12 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3 text-white">
                <Heart size={300} />
              </div>
              <h2 className="text-4xl font-playfair font-bold mb-6 relative z-10">Giving & Tithes</h2>
              <p className="text-white/90 text-lg mb-8 relative z-10">
                Your generosity supports the church ministry, enables outreach programs, funds community service, and supports missions globally.
              </p>
              <Button size="lg" className="bg-white text-[#0C647F] hover:bg-gray-100 w-fit rounded-full px-8 py-6 shadow-lg relative z-10 text-lg">
                Give Online Now
              </Button>
            </div>

            <div className="md:w-7/12 p-12 lg:p-16">
              <h3 className="text-2xl font-bold text-[#0B2D3A] mb-8">Ways to Give</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "In-Church Offering", desc: "During standard Sunday services" },
                  { title: "Bank Transfer", desc: "Via online banking to our main account" },
                  { title: "Online Giving", desc: "Secure website donation platform" },
                  { title: "Envelope System", desc: "Special offerings designated by envelopes" }
                ].map((way, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full bg-[#0B2D3A]/10 text-[#0B2D3A] flex items-center justify-center shrink-0">
                      <ChevronRight size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{way.title}</h4>
                      <p className="text-sm text-gray-500">{way.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: FAQ & LOCATION (Grid) */}
      <section className="py-24 bg-[#F8F6F1]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* FAQ Area */}
            <div>
              <h2 className="text-3xl font-playfair font-bold text-[#0B2D3A] mb-8 border-l-4 border-[#0C647F] pl-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full bg-white p-6 rounded-2xl shadow-sm">
                {[
                  { q: "What denomination are you?", a: "We are non-denominational but welcome believers from all Christian traditions." },
                  { q: "Do you speak in tongues?", a: "Yes, we embrace the gifts of the Holy Spirit including speaking in tongues, prophecy, and healing." },
                  { q: "What is your dress code?", a: "Come as you are! We emphasize the heart over outward appearance." },
                  { q: "Do you have children's programs?", a: "Yes! We have programs for all ages from nursery to youth concurrent with the main service." },
                  { q: "How do I become a member?", a: "Attend services, go through our membership class, and make a commitment." }
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-semibold text-[#0B2D3A] hover:text-[#4AAFCA]">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-base leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* LOCATION Area */}
            <div>
              <h2 className="text-3xl font-playfair font-bold text-[#0B2D3A] mb-8 border-l-4 border-[#0C647F] pl-4">Visit Us</h2>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full flex flex-col">
                <div className="h-64 bg-gray-200 w-full relative">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Map View" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a href="https://maps.app.goo.gl/iGZT19JoaSkk8v2t5" target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary" className="bg-white text-[#0B2D3A] hover:bg-white/90 shadow-xl font-bold rounded-full">
                        <MapPin className="mr-2" size={18} /> Open Google Maps
                      </Button>
                    </a>
                  </div>
                </div>
                <div className="p-8 flex-1 grid sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-[#0B2D3A] mb-3 flex items-center gap-2"><MapPin size={18} className="text-[#0C647F]" /> Address</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Christ Centre<br />
                      Main Road, City Center<br />
                      Trivandrum, Kerala 695014<br />
                      India
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B2D3A] mb-3 flex items-center gap-2"><Phone size={18} className="text-[#0C647F]" /> Contact Info</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Phone: +91-XXXX-XXXX-XX<br />
                      Email: info@christcentre.in<br />
                      Hours: Mon-Fri, 10 AM - 5 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChristCentre;
