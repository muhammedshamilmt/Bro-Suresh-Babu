import { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ChevronLeft, Tag, Share2, Mail, ChevronRight, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlogPost, useBlogs } from "@/hooks/useBlogs";
import { blogsApi } from "@/lib/api";

const CATEGORIES = [
  "Sermons & Teachings",
  "Ministry Updates",
  "Testimonies",
  "Devotionals",
  "Christian Living",
];

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, isError } = useBlogPost(id);

  const { data: relatedData } = useBlogs({
    status: "published",
    category: post?.category,
    limit: 3,
  });
  const related = (relatedData?.data ?? []).filter((p) => p.id !== id).slice(0, 2);

  useEffect(() => {
    if (id) blogsApi.incrementViews(id).catch(() => {});
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="text-muted-foreground text-lg">Post not found.</p>
          <Link to="/blog" className="text-primary font-medium hover:underline flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[60vh] flex items-center justify-center bg-blue-dark pt-20">
        <div className="absolute inset-0">
          <img
            src={post.coverImage || "https://images.unsplash.com/photo-1490730141103-6cac501b1062?q=80&w=1470&auto=format&fit=crop"}
            alt={post.title}
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-blue-dark/80 to-blue-dark/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
          {post.category && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-sm font-semibold text-primary mb-6"
            >
              <Tag className="w-4 h-4" /> {post.category}
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-8 leading-tight"
          >
            {post.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-6 text-sm text-white/80"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {formattedDate}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Content */}
            <div className="w-full lg:w-2/3">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-medium"
              >
                <ChevronLeft className="w-4 h-4" /> Back to all articles
              </Link>

              {post.excerpt && (
                <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-5 mb-10 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="prose prose-lg max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
                <h4 className="font-serif font-bold text-foreground text-xl">Share this article</h4>
                <button className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="mt-16">
                  <h3 className="text-2xl font-bold font-serif mb-8 text-foreground">Related Articles</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {related.map((p) => (
                      <Link key={p.id} to={`/blog/${p.id}`} className="group">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                          <img
                            src={p.coverImage || "https://images.unsplash.com/photo-1490730141103-6cac501b1062?q=80&w=800&auto=format&fit=crop"}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <p className="text-xs text-primary font-medium mb-1">{p.category}</p>
                        <h5 className="font-bold font-serif text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {p.title}
                        </h5>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3 lg:sticky lg:top-24 h-max space-y-8">

              {/* Search */}
              <div className="bg-card p-6 rounded-2xl shadow-soft border border-border">
                <h4 className="font-bold font-serif text-lg mb-4 text-foreground">Search Articles</h4>
                <div className="flex bg-background rounded-full border border-border overflow-hidden p-1">
                  <input
                    type="text"
                    placeholder="Search keywords..."
                    className="w-full bg-transparent px-4 py-2 outline-none text-sm"
                  />
                  <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors">
                    Go
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-card p-6 rounded-2xl shadow-soft border border-border">
                <h4 className="font-bold font-serif text-lg mb-4 text-foreground">Categories</h4>
                <ul className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <Link
                        to={`/blog?category=${encodeURIComponent(cat)}`}
                        className="flex items-center justify-between text-muted-foreground hover:text-primary transition-colors group"
                      >
                        <span className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-border group-hover:text-primary transition-colors" />
                          {cat}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
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
}
