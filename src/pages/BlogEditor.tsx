import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Save,
  Send,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Image,
  Minus,
  LayoutTemplate,
  Calendar,
  User,
  Tag,
  Upload,
  CheckCircle2,
  Columns2,
  Monitor,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateBlog, useUpdateBlog, useBlogPost } from "@/hooks/useBlogs";
import type { BlogPayload } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode = "editor" | "split" | "preview";
type PostStatus = "draft" | "published" | "scheduled";

interface PostMeta {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  coverImage: string;
  status: PostStatus;
  scheduledDate: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Sermons & Teachings",
  "Ministry Updates",
  "Testimonies",
  "Devotionals",
  "Christian Living",
];

const DEFAULT_CONTENT = `<p class="mb-6 text-lg leading-relaxed">Start writing your article here. This editor supports rich HTML content that will render exactly as it appears on the public blog.</p>

<h3 class="text-2xl font-serif font-bold text-foreground mt-10 mb-4">Your First Section</h3>
<p class="mb-6 text-lg leading-relaxed">Add your content here. You can use the toolbar above to format text, add headings, quotes, and more.</p>

<blockquote class="border-l-4 border-primary pl-6 my-8 italic text-xl text-muted-foreground">
  "Add an inspiring quote here that captures the essence of your message."
</blockquote>

<p class="mb-6 text-lg leading-relaxed">Continue writing your article. The live preview on the right shows exactly how it will look to your readers.</p>`;

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function ToolbarButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </button>
  );
}

function EditorToolbar({ onInsert }: { onInsert: (text: string) => void }) {
  return (
    <div className="flex items-center gap-0.5 flex-wrap">
      <ToolbarButton title="Bold" onClick={() => onInsert("<strong>bold text</strong>")}>
        <Bold className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton title="Italic" onClick={() => onInsert("<em>italic text</em>")}>
        <Italic className="w-4 h-4" />
      </ToolbarButton>
      <div className="w-px h-5 bg-border mx-1" />
      <ToolbarButton
        title="Heading 2"
        onClick={() =>
          onInsert('\n<h2 class="text-3xl font-serif font-bold text-foreground mt-12 mb-5">Heading</h2>\n')
        }
      >
        <Heading2 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Heading 3"
        onClick={() =>
          onInsert('\n<h3 class="text-2xl font-serif font-bold text-foreground mt-10 mb-4">Sub-heading</h3>\n')
        }
      >
        <Heading3 className="w-4 h-4" />
      </ToolbarButton>
      <div className="w-px h-5 bg-border mx-1" />
      <ToolbarButton
        title="Paragraph"
        onClick={() =>
          onInsert('\n<p class="mb-6 text-lg leading-relaxed">Your paragraph text here.</p>\n')
        }
      >
        <LayoutTemplate className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Blockquote"
        onClick={() =>
          onInsert(
            '\n<blockquote class="border-l-4 border-primary pl-6 my-8 italic text-xl text-muted-foreground">\n  "Your quote here."\n</blockquote>\n'
          )
        }
      >
        <Quote className="w-4 h-4" />
      </ToolbarButton>
      <div className="w-px h-5 bg-border mx-1" />
      <ToolbarButton
        title="Unordered List"
        onClick={() =>
          onInsert(
            '\n<ul class="list-disc list-inside space-y-2 mb-6 text-lg text-muted-foreground">\n  <li>Item one</li>\n  <li>Item two</li>\n  <li>Item three</li>\n</ul>\n'
          )
        }
      >
        <List className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Ordered List"
        onClick={() =>
          onInsert(
            '\n<ol class="list-decimal list-inside space-y-2 mb-6 text-lg text-muted-foreground">\n  <li>First point</li>\n  <li>Second point</li>\n  <li>Third point</li>\n</ol>\n'
          )
        }
      >
        <ListOrdered className="w-4 h-4" />
      </ToolbarButton>
      <div className="w-px h-5 bg-border mx-1" />
      <ToolbarButton
        title="Image"
        onClick={() =>
          onInsert(
            '\n<div class="my-10 rounded-2xl overflow-hidden shadow-medium">\n  <img src="https://images.unsplash.com/photo-1490730141103-6cac501b1062?q=80&w=1470&auto=format&fit=crop" alt="Image caption" class="w-full h-auto object-cover" />\n</div>\n'
          )
        }
      >
        <Image className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Divider"
        onClick={() => onInsert('\n<hr class="my-10 border-border" />\n')}
      >
        <Minus className="w-4 h-4" />
      </ToolbarButton>
    </div>
  );
}

// ─── Live Preview ─────────────────────────────────────────────────────────────

function LivePreview({ meta, content }: { meta: PostMeta; content: string }) {
  return (
    <div className="min-h-full bg-background font-sans">
      <div className="relative w-full h-64 flex items-end justify-center bg-blue-dark overflow-hidden">
        {meta.coverImage && (
          <img
            src={meta.coverImage}
            alt={meta.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-blue-dark/80 to-blue-dark/40" />
        <div className="relative z-10 text-center px-6 pb-8 w-full">
          {meta.category && (
            <div className="flex items-center justify-center gap-1 text-xs font-semibold text-primary mb-3">
              <Tag className="w-3 h-3" /> {meta.category}
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-white font-serif leading-tight mb-3">
            {meta.title || "Your Post Title"}
          </h1>
          <div className="flex items-center justify-center gap-4 text-xs text-white/70">
            {meta.author && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" /> {meta.author}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-10">
        {meta.excerpt && (
          <p className="text-base text-muted-foreground italic border-l-4 border-primary pl-4 mb-8 leading-relaxed">
            {meta.excerpt}
          </p>
        )}
        <div
          className="prose prose-lg max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: content || "<p class='text-muted-foreground'>Start writing to see the preview...</p>" }}
        />
      </div>
    </div>
  );
}

// ─── Meta Sidebar ─────────────────────────────────────────────────────────────

function MetaSidebar({
  meta,
  onChange,
  onSave,
  onPublish,
  saving,
  isEdit,
}: {
  meta: PostMeta;
  onChange: (updates: Partial<PostMeta>) => void;
  onSave: () => void;
  onPublish: () => void;
  saving: boolean;
  isEdit: boolean;
}) {
  return (
    <div className="w-72 flex-shrink-0 bg-white border-l border-border flex flex-col overflow-y-auto">
      <div className="p-5 border-b border-border">
        <h3 className="font-bold text-foreground text-sm">Post Settings</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Configure metadata and publishing options</p>
      </div>

      <div className="p-5 space-y-5 flex-1">
        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Status</label>
          <div className="flex gap-2">
            {(["draft", "published", "scheduled"] as PostStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => onChange({ status: s })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${
                  meta.status === s
                    ? s === "published"
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : s === "scheduled"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-amber-500 text-white border-amber-500"
                    : "border-border text-muted-foreground hover:border-foreground/30"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Category</label>
          <select
            value={meta.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select category...</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Author */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Author</label>
          <Input
            value={meta.author}
            onChange={(e) => onChange({ author: e.target.value })}
            placeholder="Author name"
            className="text-sm rounded-lg"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Excerpt</label>
          <textarea
            value={meta.excerpt}
            onChange={(e) => onChange({ excerpt: e.target.value })}
            placeholder="Short description shown in blog listing..."
            rows={3}
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Cover Image URL</label>
          <Input
            value={meta.coverImage}
            onChange={(e) => onChange({ coverImage: e.target.value })}
            placeholder="https://..."
            className="text-sm rounded-lg mb-2"
          />
          {meta.coverImage ? (
            <div className="rounded-xl overflow-hidden aspect-video border border-border">
              <img src={meta.coverImage} alt="Cover" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-border aspect-video flex flex-col items-center justify-center text-muted-foreground gap-2">
              <Upload className="w-6 h-6 opacity-40" />
              <span className="text-xs">Paste image URL above</span>
            </div>
          )}
        </div>

        {/* Scheduled Date */}
        {meta.status === "scheduled" && (
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Publish Date</label>
            <Input
              type="datetime-local"
              value={meta.scheduledDate}
              onChange={(e) => onChange({ scheduledDate: e.target.value })}
              className="text-sm rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-5 border-t border-border space-y-2">
        <Button
          onClick={onPublish}
          disabled={saving}
          className="w-full bg-blue-dark hover:bg-blue-dark/90 text-white rounded-xl gap-2 text-sm"
        >
          <Send className="w-4 h-4" />
          {meta.status === "scheduled" ? "Schedule Post" : isEdit ? "Update & Publish" : "Publish Now"}
        </Button>
        <Button
          onClick={onSave}
          variant="outline"
          disabled={saving}
          className="w-full rounded-xl border-border gap-2 text-sm"
        >
          {saving ? (
            <><span className="w-3 h-3 rounded-full border-2 border-foreground/30 border-t-foreground animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4" /> {isEdit ? "Save Changes" : "Save Draft"}</>
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── Main BlogEditor Page ─────────────────────────────────────────────────────

export default function BlogEditor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<PostMeta>({
    title: "",
    excerpt: "",
    category: "",
    author: "Bro. Suresh Babu",
    coverImage: "https://images.unsplash.com/photo-1490730141103-6cac501b1062?q=80&w=1470&auto=format&fit=crop",
    status: "draft",
    scheduledDate: "",
  });

  // Load existing post when editing
  const { data: existingPost, isLoading: loadingPost } = useBlogPost(id);

  useEffect(() => {
    if (existingPost) {
      setMeta({
        title: existingPost.title,
        excerpt: existingPost.excerpt,
        category: existingPost.category,
        author: existingPost.author,
        coverImage: existingPost.coverImage,
        status: existingPost.status,
        scheduledDate: existingPost.scheduledDate ?? "",
      });
      setContent(existingPost.content);
    }
  }, [existingPost]);

  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();

  const updateMeta = (updates: Partial<PostMeta>) => setMeta((prev) => ({ ...prev, ...updates }));

  const insertSnippet = (snippet: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const newContent = content.slice(0, start) + snippet + content.slice(end);
    setContent(newContent);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + snippet.length, start + snippet.length);
    }, 0);
  };

  const buildPayload = (overrideStatus?: PostStatus): BlogPayload => ({
    title: meta.title,
    excerpt: meta.excerpt,
    content,
    category: meta.category,
    author: meta.author,
    coverImage: meta.coverImage,
    status: overrideStatus ?? meta.status,
    scheduledDate: meta.scheduledDate || undefined,
  });

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    try {
      if (isEdit) {
        await updateBlog.mutateAsync({ id: id!, payload: buildPayload() });
      } else {
        await createBlog.mutateAsync(buildPayload());
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      setError(err?.message ?? "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setError(null);
    setSaving(true);
    const publishStatus: PostStatus = meta.status === "scheduled" ? "scheduled" : "published";
    try {
      if (isEdit) {
        await updateBlog.mutateAsync({ id: id!, payload: buildPayload(publishStatus) });
      } else {
        await createBlog.mutateAsync(buildPayload(publishStatus));
      }
      updateMeta({ status: publishStatus });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Failed to publish post");
      setSaving(false);
    }
  };

  const viewModes: { id: ViewMode; icon: React.ElementType; label: string }[] = [
    { id: "editor", icon: Monitor, label: "Editor" },
    { id: "split", icon: Columns2, label: "Split" },
    { id: "preview", icon: Eye, label: "Preview" },
  ];

  if (loadingPost) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F4F6FA]">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <span className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <span className="text-sm">Loading post...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#F4F6FA] overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white border-b border-border flex-shrink-0 z-40">
        <div className="flex items-center justify-between px-4 h-14 gap-4">
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <input
                type="text"
                value={meta.title}
                onChange={(e) => updateMeta({ title: e.target.value })}
                placeholder="Post title..."
                className="bg-transparent text-foreground font-bold text-base outline-none w-full placeholder:text-muted-foreground/50 truncate"
              />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full font-medium ${
                    meta.status === "published"
                      ? "bg-emerald-100 text-emerald-700"
                      : meta.status === "scheduled"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {meta.status}
                </span>
                {meta.category && <span>· {meta.category}</span>}
                {isEdit && <span className="text-muted-foreground/60">· Editing</span>}
              </div>
            </div>
          </div>

          {/* Center — View Mode Toggle */}
          <div className="flex items-center gap-1 bg-muted/60 rounded-xl p-1 flex-shrink-0">
            {viewModes.map((vm) => (
              <button
                key={vm.id}
                onClick={() => setViewMode(vm.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === vm.id
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <vm.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{vm.label}</span>
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 text-red-500 text-xs font-medium max-w-48 truncate"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                </motion.div>
              )}
              {saved && !error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium"
                >
                  <CheckCircle2 className="w-4 h-4" /> Saved
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              onClick={handleSave}
              variant="outline"
              disabled={saving}
              className="rounded-xl border-border gap-1.5 text-sm h-9 px-3"
            >
              {saving ? (
                <span className="w-3 h-3 rounded-full border-2 border-foreground/30 border-t-foreground animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{isEdit ? "Save" : "Save Draft"}</span>
            </Button>
            <Button
              onClick={handlePublish}
              disabled={saving}
              className="bg-blue-dark hover:bg-blue-dark/90 text-white rounded-xl gap-1.5 text-sm h-9 px-3"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEdit ? "Update" : "Publish"}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Editor Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Pane */}
        <AnimatePresence initial={false}>
          {viewMode !== "preview" && (
            <motion.div
              key="editor-pane"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: viewMode === "split" ? "50%" : "100%" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col border-r border-border bg-white overflow-hidden"
              style={{ minWidth: 0 }}
            >
              <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-muted/30 flex-wrap">
                <EditorToolbar onInsert={insertSnippet} />
              </div>
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                spellCheck
                className="flex-1 resize-none outline-none p-6 text-sm font-mono text-foreground bg-white leading-relaxed overflow-y-auto"
                placeholder="Write your HTML content here..."
              />
              <div className="px-4 py-2 border-t border-border bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
                <span>{content.length} characters</span>
                <span>{content.split(/\s+/).filter(Boolean).length} words</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preview Pane */}
        <AnimatePresence initial={false}>
          {viewMode !== "editor" && (
            <motion.div
              key="preview-pane"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto bg-background"
              style={{ minWidth: 0 }}
            >
              <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-border px-4 py-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Eye className="w-3.5 h-3.5" />
                Live Preview — matches public blog post page
              </div>
              <LivePreview meta={meta} content={content} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meta Sidebar */}
        <MetaSidebar
          meta={meta}
          onChange={updateMeta}
          onSave={handleSave}
          onPublish={handlePublish}
          saving={saving}
          isEdit={isEdit}
        />
      </div>
    </div>
  );
}
