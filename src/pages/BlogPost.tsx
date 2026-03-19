import { motion } from "framer-motion";
import { Calendar, User, ChevronLeft, Tag, Share2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, ChevronRight } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();

  const categories = [
    "Sermons & Teachings",
    "Ministry Updates",
    "Testimonies",
    "Devotionals",
    "Christian Living",
  ];

  // Placeholder post data
  const post = {
    title: "Understanding the Finished Work of the Cross",
    content: `
      <p class="mb-6 text-lg leading-relaxed">The message of grace is not just a theological concept, but a practical reality that transforms our daily lives when we fully rest in what Jesus accomplished. When Christ said "It is finished," He meant every word of it. The veil was torn, the debt was paid, and the way to the Father was opened forever.</p>
      
      <h3 class="text-2xl font-serif font-bold text-foreground mt-10 mb-4">The Depth of His Grace</h3>
      <p class="mb-6 text-lg leading-relaxed">Many Christians today still live under the burden of trying to earn God's favor. They measure their spiritual standing by their performance rather than by Christ's perfection. But the Gospel is good news precisely because it's not about our ability, but His availability.</p>
      
      <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-xl text-muted-foreground">
        "Grace is not permission to sin, it is the power to overcome it. When you realize how much you are loved, sin loses its appeal."
      </blockquote>
      
      <p class="mb-6 text-lg leading-relaxed">Consider the Apostle Paul's words to the Ephesians. He emphatically stated that we are saved by grace through faith, and this is not from ourselves, it is the gift of God. Not by works, so that no one can boast. If our salvation depended even slightly on our own merit, we would have reason to boast. But because it is entirely the work of Christ, all glory goes to Him.</p>
      
      <div class="my-10 rounded-2xl overflow-hidden shadow-medium">
        <img src="https://images.unsplash.com/photo-1544427920-c49ccf08c146?q=80&w=1632&auto=format&fit=crop" alt="Worship and Grace" class="w-full h-auto object-cover" />
      </div>

      <h3 class="text-2xl font-serif font-bold text-foreground mt-10 mb-4">Living from Acceptance, Not for Acceptance</h3>
      <p class="mb-6 text-lg leading-relaxed">The shift from religion to relationship happens when we stop living for God's acceptance and start living from it. You don't have to perform to be loved. You are already loved, therefore you perform with joy. This is the essence of the New Covenant.</p>
      <p class="mb-6 text-lg leading-relaxed">As you walk through your week, meditate on the finished work of the cross. Let the truth of your justification bring peace to your anxious heart. Rest in the assurance that He who began a good work in you will carry it on to completion.</p>
    `,
    date: "October 15, 2023",
    author: "Bro. Suresh Babu",
    category: "Sermons & Teachings",
    image: "https://images.unsplash.com/photo-1490730141103-6cac501b1062?q=80&w=1470&auto=format&fit=crop",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center bg-blue-dark pt-20">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-blue-dark/80 to-blue-dark/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 text-sm font-semibold text-primary mb-6"
          >
            <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> {post.category}</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-serif mb-8 leading-tight text-white"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-6 text-sm text-white/80"
          >
            <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content Area */}
            <div className="w-full lg:w-2/3">
              <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-medium">
                <ChevronLeft className="w-4 h-4" /> Back to all articles
              </Link>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="prose prose-lg max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
                <h4 className="font-serif font-bold text-foreground text-xl">Share this article</h4>
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
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

export default BlogPost;
