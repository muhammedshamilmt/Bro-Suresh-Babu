import { motion } from "framer-motion";
import { Calendar, User, ChevronRight, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Blog = () => {
  const categories = [
    "Sermons & Teachings",
    "Ministry Updates",
    "Testimonies",
    "Devotionals",
    "Christian Living",
  ];

  const featuredPost = {
    title: "Understanding the Finished Work of the Cross",
    excerpt: "The message of grace is not just a theological concept, but a practical reality that transforms our daily lives when we fully rest in what Jesus accomplished.",
    date: "October 15, 2023",
    author: "Bro. Suresh Babu",
    category: "Sermons & Teachings",
    image: "https://images.unsplash.com/photo-1490730141103-6cac501b1062?q=80&w=1470&auto=format&fit=crop",
  };

  const recentPosts = [
    {
      id: 1,
      title: "How to Overcome Fear with Faith",
      excerpt: "In times of uncertainty, our anchor is the unshakeable truth of God's Word. Learn how to replace anxiety with divine peace.",
      date: "October 10, 2023",
      category: "Christian Living",
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Highlights from the Argentina Convention",
      excerpt: "Over 1200 churches gathered for an outpouring of the Holy Spirit. See the testimonies and impact from our latest crusade.",
      date: "September 28, 2023",
      category: "Ministry Updates",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "The Power of Unity in the Church",
      excerpt: "Breaking down denominational walls to build a stronger, united body of Christ. An exploration of Ephesians 4.",
      date: "September 15, 2023",
      category: "Sermons & Teachings",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1632&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Restoring Broken Families",
      excerpt: "God's grace extends to our homes. Practical wisdom on healing relationships and fostering love in the family.",
      date: "September 02, 2023",
      category: "Devotionals",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1470&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] flex items-center justify-center bg-blue-dark">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1470&auto=format&fit=crop"
            alt="Blog & Articles"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-blue-dark/50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white font-serif mb-6"
          >
            Blog & Articles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90"
          >
            Insights, Updates, and Transformative Teachings
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content Area */}
            <div className="w-full lg:w-2/3">
              
              {/* Featured Post */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16 group cursor-pointer"
              >
                <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-6 shadow-glow">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Featured
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                  <span className="flex items-center gap-1"><User className="w-4 h-4" /> {featuredPost.author}</span>
                  <span className="flex items-center gap-1"><Tag className="w-4 h-4 text-primary" /> {featuredPost.category}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-foreground group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <a href="/blog/1" className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                  Read Full Article <ChevronRight className="w-5 h-5" />
                </a>
              </motion.div>

              <hr className="border-border mb-12" />

              {/* Recent Posts Grid */}
              <h3 className="text-2xl font-bold font-serif mb-8 text-foreground">Recent Articles</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {recentPosts.map((post, i) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="text-primary font-medium">{post.category}</span>
                    </div>
                    <h4 className="text-xl font-bold font-serif mb-2 text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <a href={`/blog/${post.id}`} className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ChevronRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                ))}
              </div>
              
              {/* Pagination Placeholder */}
              <div className="mt-16 flex justify-center gap-2">
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors">1</button>
                <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">2</button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors">3</button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><ChevronRight className="w-5 h-5" /></button>
              </div>

            </div>

            {/* Sticky Sidebar Area */}
            <div className="w-full lg:w-1/3 lg:sticky lg:top-24 h-max">
              
              {/* Search Widget */}
              <div className="bg-card p-6 rounded-2xl shadow-soft border border-border mb-8">
                <h4 className="font-bold font-serif text-lg mb-4 text-foreground">Search Articles</h4>
                <div className="flex bg-background rounded-full border border-border overflow-hidden p-1">
                  <input 
                    type="text" 
                    placeholder="Search keywords..." 
                    className="w-full bg-transparent px-4 py-2 outline-none text-sm"
                  />
                  <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors">
                    Search
                  </button>
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-card p-6 rounded-2xl shadow-soft border border-border mb-8">
                <h4 className="font-bold font-serif text-lg mb-4 text-foreground">Categories</h4>
                <ul className="space-y-2">
                  {categories.map((category, i) => (
                    <li key={i}>
                      <a href="#" className="flex items-center justify-between text-muted-foreground hover:text-primary transition-colors group">
                        <span className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-border group-hover:text-primary transition-colors" />
                          {category}
                        </span>
                        <span className="bg-accent/10 text-accent text-xs font-bold py-1 px-2 rounded-full">
                          {Math.floor(Math.random() * 20) + 5}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Widget */}
              <div className="bg-primary p-6 rounded-2xl shadow-glow text-primary-foreground text-center">
                <Mail className="w-10 h-10 mx-auto mb-4 opacity-80" />
                <h4 className="font-bold font-serif text-xl mb-2">Subscribe for Updates</h4>
                <p className="text-sm opacity-90 mb-6">
                  Get the latest sermons, news, and testimonies directly in your inbox.
                </p>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/20 transition-all mb-4"
                />
                <button className="w-full bg-white text-primary font-bold py-3 rounded-full hover:bg-white/90 transition-colors">
                  Subscribe Now
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Placeholder icon for newsletter
import { Mail } from "lucide-react";

export default Blog;
