import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ChevronRight, Tag, Search, Mail, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlogs } from "@/hooks/useBlogs";

const CATEGORIES = [
  "All",
  "Sermons & Teachings",
  "Ministry Updates",
  "Testimonies",
  "Devotionals",
  "Christian Living",
];

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/3] rounded-2xl bg-muted mb-4" />
      <div className="h-3 bg-muted rounded w-1/2 mb-3" />
      <div className="h-5 bg-muted rounded w-full mb-2" />
      <div className="h-4 bg-muted rounded w-3/4" />
    </div>
  );
}

export default function Blog() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleSearch = (val: string) => {
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => { setDebouncedSearch(val); setPage(1); }, 400);
  };

  const filters = {
    status: "published",
    category: activeCategory === "All" ? undefined : activeCategory,
    search: debouncedSearch || undefined,
    page,
    limit: 7,
  };

  const { data, isLoading, isFetching, isError } = useBlogs(filters);

  const posts = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 7);

  const featured = posts[0];
  const recent = posts.slice(1);

  return (
    <div className="min-h-screen p-3">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full rounded-[40px] h-[50vh] flex items-center justify-center bg-blue-dark">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1470&auto=format&fit=crop"
            alt="Blog"
            className="w-full h-full object-cover rounded-[40px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B2D3A]/90 via-[#0D3A4A]/80 to-[#071E28]/90 rounded-[40px]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white font-serif mb-6"
          >
            Blog & Articles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90"
          >
            Insights, Updates, and Transformative Teachings
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Main */}
            <div className="w-full lg:w-2/3">

              {/* Category filter pills */}
              <div className="flex gap-2 flex-wrap mb-10">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setPage(1); }}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${activeCategory === cat
                        ? "bg-blue-dark text-white border-blue-dark shadow-sm"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-white"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
                {isFetching && !isLoading && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground ml-2">
                    <Loader2 className="w-3 h-3 animate-spin" /> Updating...
                  </span>
                )}
              </div>

              {/* Error */}
              {isError && (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="font-medium">Failed to load posts. Please try again.</p>
                </div>
              )}

              {/* Featured post */}
              {isLoading ? (
                <div className="mb-16 animate-pulse">
                  <div className="aspect-[21/9] rounded-3xl bg-muted mb-6" />
                  <div className="h-4 bg-muted rounded w-1/3 mb-4" />
                  <div className="h-8 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              ) : featured ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                  className="mb-16 group"
                >
                  <Link to={`/blog/${featured.id}`}>
                    <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-6 shadow-glow">
                      <img
                        src={featured.coverImage || "https://images.unsplash.com/photo-1490730141103-6cac501b1062?q=80&w=1470&auto=format&fit=crop"}
                        alt={featured.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Featured
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />
                        {new Date(featured.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1"><User className="w-4 h-4" /> {featured.author}</span>
                      {featured.category && <span className="flex items-center gap-1"><Tag className="w-4 h-4 text-primary" /> {featured.category}</span>}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-foreground group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed line-clamp-3">{featured.excerpt}</p>
                    <span className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                      Read Full Article <ChevronRight className="w-5 h-5" />
                    </span>
                  </Link>
                </motion.div>
              ) : !isLoading && posts.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="font-medium">No posts found.</p>
                </div>
              ) : null}

              {/* Recent grid */}
              {recent.length > 0 && (
                <>
                  <hr className="border-border mb-12" />
                  <h3 className="text-2xl font-bold font-serif mb-8 text-foreground">Recent Articles</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {isLoading
                      ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                      : recent.map((post, i) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                          className="group"
                        >
                          <Link to={`/blog/${post.id}`}>
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm">
                              <img
                                src={post.coverImage || "https://images.unsplash.com/photo-1490730141103-6cac501b1062?q=80&w=800&auto=format&fit=crop"}
                                alt={post.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </span>
                              {post.category && <span className="text-primary font-medium">{post.category}</span>}
                            </div>
                            <h4 className="text-xl font-bold font-serif mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                            <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                              Read More <ChevronRight className="w-4 h-4" />
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                  </div>
                </>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-full text-sm font-medium transition-colors border ${p === page
                          ? "bg-primary text-white border-primary shadow-lg"
                          : "border-border hover:bg-primary hover:text-white"
                        }`}
                    >
                      {p}
                    </button>
                  ))}
                  {page < totalPages && (
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
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
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search keywords..."
                    className="w-full bg-transparent px-4 py-2 outline-none text-sm"
                  />
                  <button className="bg-primary text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors flex items-center gap-1">
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-card p-6 rounded-2xl shadow-soft border border-border">
                <h4 className="font-bold font-serif text-lg mb-4 text-foreground">Categories</h4>
                <ul className="space-y-2">
                  {CATEGORIES.filter((c) => c !== "All").map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => { setActiveCategory(category); setPage(1); }}
                        className="w-full flex items-center justify-between text-muted-foreground hover:text-primary transition-colors group text-left"
                      >
                        <span className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-border group-hover:text-primary transition-colors" />
                          {category}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-primary p-6 rounded-2xl shadow-glow text-primary-foreground text-center">
                <Mail className="w-10 h-10 mx-auto mb-4 opacity-80" />
                <h4 className="font-bold font-serif text-xl mb-2">Subscribe for Updates</h4>
                <p className="text-sm opacity-90 mb-6">Get the latest sermons, news, and testimonies directly in your inbox.</p>
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
