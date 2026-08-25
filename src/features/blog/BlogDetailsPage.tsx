import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Calendar,
  Share2,
  Bookmark,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Check,
  Headphones,
  Eye,
  MessageSquare,
  ThumbsUp,
  Send,
  ShieldCheck,
  Star,
  ShoppingBag,
  Copy,
  Volume2
} from 'lucide-react';
import { getBlogPostBySlug, getRelatedBlogPosts, BLOG_POSTS } from './data/blogData';
import { BlogCard } from './components/BlogCard';

export default function BlogDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = useMemo(() => {
    return slug ? getBlogPostBySlug(slug) : undefined;
  }, [slug]);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  // Reading progress state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [clapsCount, setClapsCount] = useState(() => (post ? (post.claps || 120) : 120));
  const [hasClapped, setHasClapped] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Comments state
  const [commentsList, setCommentsList] = useState(() => post?.comments || []);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Saved status from local storage
  useEffect(() => {
    if (post) {
      try {
        const saved = localStorage.getItem('morkins_saved_blog_posts');
        if (saved) {
          const parsed = JSON.parse(saved);
          setIsSaved(!!parsed[post.id]);
        }
      } catch {
        // ignore
      }
      setCommentsList(post.comments || []);
      setClapsCount(post.claps || 120);
    }
  }, [post]);

  // Track window scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const currentProgress = (totalScroll / windowHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSave = () => {
    if (!post) return;
    const newSaved = !isSaved;
    setIsSaved(newSaved);
    try {
      const saved = localStorage.getItem('morkins_saved_blog_posts');
      const parsed = saved ? JSON.parse(saved) : {};
      parsed[post.id] = newSaved;
      localStorage.setItem('morkins_saved_blog_posts', JSON.stringify(parsed));
    } catch {
      // ignore
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleClap = () => {
    setClapsCount((prev) => prev + 1);
    setHasClapped(true);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      authorName: commentName.trim(),
      date: 'Just now',
      content: commentText.trim(),
      likes: 1,
      verified: true,
    };

    setCommentsList((prev) => [newComment, ...prev]);
    setCommentName('');
    setCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  // Find prev and next post for pagination
  const { prevPost, nextPost } = useMemo(() => {
    if (!post) return { prevPost: null, nextPost: null };
    const currentIndex = BLOG_POSTS.findIndex((p) => p.id === post.id);
    const prev = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
    const next = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;
    return { prevPost: prev, nextPost: next };
  }, [post]);

  const relatedPosts = useMemo(() => {
    return post ? getRelatedBlogPosts(post.id, post.category, 3) : [];
  }, [post]);

  // Fallback if post not found
  if (!post) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center px-4 py-24">
        <div className="bg-white rounded-3xl p-10 max-w-lg text-center space-y-5 border border-[#184433]/15 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#184433]/10 text-[#184433] flex items-center justify-center mx-auto text-2xl font-serif">
            📜
          </div>
          <h2 className="font-serif text-3xl text-[#184433]">Journal Publication Not Found</h2>
          <p className="text-neutral-600 text-sm font-light">
            The article you are looking for might have been moved, updated, or archived.
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 bg-[#184433] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-2xl hover:bg-[#0F3822] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Journals</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-24 selection:bg-[#AFD971]/30">

      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-neutral-200/60 z-50">
        <div
          className="h-full bg-linear-to-r from-[#184433] via-[#6F8C51] to-[#AFD971] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Article Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-8 sm:space-y-10">

        {/* Top Breadcrumb & Metadata Bar */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500">
              <Link to="/" className="hover:text-[#184433] transition-colors">Home</Link>
              <span className="text-neutral-300">/</span>
              <Link to="/blog" className="hover:text-[#184433] transition-colors">Editorial Journal</Link>
              <span className="text-neutral-300">/</span>
              <span className="text-[#184433] font-semibold">{post.categoryLabel}</span>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSave}
                className="p-2 rounded-xl bg-[#FAF9F5] hover:bg-neutral-100 text-[#184433] transition-colors cursor-pointer border border-neutral-200"
                title={isSaved ? 'Remove from Saved' : 'Save Article'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#184433] text-[#184433]' : 'text-neutral-700'}`} />
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF9F5] hover:bg-neutral-100 text-[#184433] text-xs font-semibold transition-colors cursor-pointer border border-neutral-200"
                title="Share Journal"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Category Chip, Read Time & Audio Listen */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-[#184433] text-[#AFD971] px-3.5 py-1 rounded-full font-sans">
              {post.categoryLabel}
            </span>
            <span className="text-xs text-neutral-600 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#184433]" />
              {post.readTime}
            </span>
            {post.listenTime && (
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="inline-flex items-center gap-1.5 text-xs text-[#184433] bg-[#184433]/5 hover:bg-[#184433]/10 px-3 py-1 rounded-full border border-[#184433]/10 transition-colors cursor-pointer"
              >
                {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 text-[#6F8C51] animate-pulse" /> : <Headphones className="w-3.5 h-3.5 text-[#6F8C51]" />}
                <span>{isPlayingAudio ? 'Playing Audio' : `Listen (${post.listenTime})`}</span>
              </button>
            )}
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.2] text-[#184433]">
            {post.title}
          </h1>

          {/* Author & Publication Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 pb-2 border-b border-neutral-200/80 text-xs text-neutral-500">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-[#184433]/20 shadow-xs"
              />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#184433]">{post.author.name}</h3>
                <p className="text-neutral-500 text-[11px] font-light">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-neutral-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#6F8C51]" />
                {post.publishDate}
              </span>
              {post.views && (
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#6F8C51]" />
                  {post.views.toLocaleString()} Reads
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Audio Player Box (when active) */}
        {isPlayingAudio && (
          <div className="bg-[#FAF9F5] rounded-2xl p-4 sm:p-5 border border-[#184433]/15 shadow-sm flex items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#184433] text-[#AFD971] flex items-center justify-center shrink-0 animate-pulse">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#184433]">Audio Narration Active</h4>
                <p className="text-[11px] text-neutral-500 font-light">Narrated by AI Botanical Synthesis Engine • {post.listenTime}</p>
              </div>
            </div>
            <button
              onClick={() => setIsPlayingAudio(false)}
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-300 bg-white"
            >
              Stop Audio
            </button>
          </div>
        )}

        {/* Upper Featured Blog Image Banner */}
        <div className=" overflow-hidden ">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-72 sm:h-96 md:h-115 object-cover"
          />
          {post.imageCaption && (
            <div className="bg-[#FAF9F5] px-6 py-3 border-t border-neutral-200/80 text-xs text-neutral-500 font-light italic">
              📸 {post.imageCaption}
            </div>
          )}
        </div>

        {/* 2-Column Article Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 pt-4">

          {/* Left Sidebar: Table of Contents, Author Spotlight, Quick Share */}
          <aside className="lg:col-span-4 space-y-8 order-2 lg:order-1">
            <div className="sticky top-20 space-y-6">

              {/* Table of Contents Box */}
              <div className="bg-white rounded-2xl p-6 border border-[#184433]/10 shadow-sm space-y-4">
                <h4 className="font-serif text-lg text-[#184433] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#6F8C51]" />
                  <span>Journal Outline</span>
                </h4>
                <nav className="space-y-2">
                  <a
                    href="#takeaways"
                    className="block text-xs font-semibold text-[#184433] hover:text-[#6F8C51] transition-colors py-1 border-l-2 border-[#184433] pl-3"
                  >
                    Clinical Takeaways at a Glance
                  </a>
                  {post.content.sections.map((sec, idx) => (
                    <a
                      key={idx}
                      href={`#sec-${idx}`}
                      className="block text-xs text-neutral-600 hover:text-[#184433] hover:font-medium transition-colors py-1 border-l-2 border-transparent hover:border-[#6F8C51] pl-3 truncate"
                    >
                      {sec.heading}
                    </a>
                  ))}
                  <a
                    href="#verdict"
                    className="block text-xs text-neutral-600 hover:text-[#184433] transition-colors py-1 border-l-2 border-transparent hover:border-[#6F8C51] pl-3"
                  >
                    Clinical Verdict & Summary
                  </a>
                  {post.content.recommendedProducts.length > 0 && (
                    <a
                      href="#products"
                      className="block text-xs text-neutral-600 hover:text-[#184433] transition-colors py-1 border-l-2 border-transparent hover:border-[#6F8C51] pl-3"
                    >
                      Formulations Mentioned
                    </a>
                  )}
                  <a
                    href="#discussion"
                    className="block text-xs text-neutral-600 hover:text-[#184433] transition-colors py-1 border-l-2 border-transparent hover:border-[#6F8C51] pl-3"
                  >
                    Reader Discussion ({commentsList.length})
                  </a>
                </nav>
              </div>

              {/* Author Bio Card */}
              <div className="bg-white rounded-2xl p-6 border border-[#184433]/10 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#184433]/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#184433]">{post.author.name}</h4>
                    <p className="text-[11px] text-neutral-500 font-light">{post.author.role}</p>
                  </div>
                </div>
                {post.author.bio && (
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {post.author.bio}
                  </p>
                )}
                <div className="pt-2 border-t border-neutral-100 flex items-center gap-2 text-[11px] text-[#6F8C51] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Clinical Contributor</span>
                </div>
              </div>

              {/* Tags Cloud */}
              <div className="bg-white rounded-2xl p-6 border border-[#184433]/10 shadow-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#184433]">
                  Topic Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium bg-[#F9F8F5] text-[#184433] px-3 py-1 rounded-lg border border-[#184433]/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Right Main Article Body */}
          <article className="lg:col-span-8 space-y-10 order-1 lg:order-2">

            {/* Opening Lead Paragraph / Quote */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-l-4 border-[#184433] border shadow-sm">
              <p className="text-base sm:text-lg text-neutral-800 font-serif italic leading-relaxed">
                "{post.content.introduction}"
              </p>
            </div>

            {/* Key Clinical Takeaways Callout Card */}
            <section id="takeaways" className="bg-[#FAF9F5] border border-[#184433]/15 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#184433] flex items-center gap-2 font-sans">
                <Sparkles className="w-4 h-4 text-[#6F8C51]" />
                <span>Key Clinical Takeaways:</span>
              </h3>
              <ul className="space-y-3">
                {post.content.takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-800 font-light leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-[#184433] text-[#AFD971] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Article Body Sections */}
            <div className="space-y-10 text-neutral-800 text-sm sm:text-base font-light leading-relaxed">
              {post.content.sections.map((section, idx) => (
                <section key={idx} id={`sec-${idx}`} className="space-y-4 pt-2">
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#184433] leading-snug">
                    {section.heading}
                  </h2>
                  <p className="leading-relaxed text-neutral-700">
                    {section.body}
                  </p>
                  {section.highlight && (
                    <div className="bg-[#184433]/5 p-5 rounded-2xl border border-[#184433]/15 text-xs sm:text-sm text-[#184433] font-medium my-4 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">
                        💡 Formulation Note
                      </div>
                      <p className="text-neutral-800 font-normal">
                        {section.highlight}
                      </p>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Clinical Verdict & Summary Card */}
            <section id="verdict" className="bg-linear-to-br from-[#0c261b] to-[#184433] text-white p-7 sm:p-10 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#AFD971]/10 rounded-full blur-2xl pointer-events-none" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#AFD971] bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
                Clinical Verdict & Summary
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                The Formulation Conclusion
              </h3>
              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                {post.content.clinicalSummary}
              </p>
            </section>

            {/* Citations & Peer-Reviewed References */}
            {post.content.citations && post.content.citations.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-[#184433]/10 space-y-2 text-xs text-neutral-500">
                <h4 className="font-bold text-[#184433] uppercase tracking-wider text-[11px]">
                  Scientific References & PubMed Citations:
                </h4>
                <ol className="list-decimal list-inside space-y-1 font-mono text-[11px] text-neutral-600">
                  {post.content.citations.map((cite, idx) => (
                    <li key={idx}>{cite}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Formulations Mentioned in this Journal */}
            {post.content.recommendedProducts.length > 0 && (
              <section id="products" className="pt-8 border-t border-neutral-200/80 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#184433]">
                      Formulations Mentioned in this Journal
                    </h3>
                    <p className="text-xs text-neutral-500 font-light mt-1">
                      Clinically formulated to deliver the exact bioactive lipid benefits documented above.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.content.recommendedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white p-5 rounded-2xl border border-[#184433]/15 hover:border-[#184433]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={prod.img}
                          alt={prod.name}
                          className="w-20 h-20 rounded-xl object-cover border border-neutral-100 shadow-xs shrink-0"
                        />
                        <div className="space-y-1">
                          {prod.tagline && (
                            <span className="text-[10px] font-bold text-[#6F8C51] uppercase tracking-wider">
                              {prod.tagline}
                            </span>
                          )}
                          <h4 className="font-sans text-sm font-bold text-[#184433] group-hover:text-[#6F8C51] transition-colors leading-snug">
                            {prod.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-neutral-900">{prod.price}</span>
                            {prod.rating && (
                              <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                                <Star className="w-3 h-3 fill-amber-400" />
                                <span>{prod.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                        <Link
                          to={prod.link}
                          className="text-xs font-bold text-[#184433] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Explore Formula</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          to={prod.link}
                          className="bg-[#184433] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#0F3822] transition-colors inline-flex items-center gap-1.5 shadow-xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>View Product</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Engagement & Reaction Bar */}
            <div className="pt-8 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Claps button */}
                <button
                  onClick={handleClap}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm ${hasClapped
                      ? 'bg-[#184433] text-[#AFD971] shadow-lg shadow-[#184433]/20 scale-105'
                      : 'bg-white text-[#184433] border border-[#184433]/15 hover:bg-[#184433]/5'
                    }`}
                >
                  <span className="text-base">👏</span>
                  <span>{clapsCount} Claps</span>
                </button>

                {/* Bookmark button */}
                <button
                  onClick={handleToggleSave}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm ${isSaved
                      ? 'bg-[#184433] text-[#AFD971]'
                      : 'bg-white text-neutral-700 border border-[#184433]/15 hover:bg-[#184433]/5'
                    }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#AFD971]' : ''}`} />
                  <span>{isSaved ? 'Saved in Library' : 'Save Article'}</span>
                </button>
              </div>

              {/* Share links */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 font-medium">Share Journal:</span>
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
                  title="Copy link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Reader Discussion / Comments Section */}
            <section id="discussion" className="pt-10 border-t border-neutral-200/80 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#184433] flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-[#6F8C51]" />
                  <span>Reader Discussion & Peer Q&A ({commentsList.length})</span>
                </h3>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="bg-white rounded-2xl p-6 border border-[#184433]/15 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#184433]">
                  Join the Clinical Discussion
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="Your Name (e.g. Dr. Sarah L.)"
                    className="w-full bg-[#F9F8F5] text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#184433]"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your clinical experience, formulation question, or feedback on this study..."
                  className="w-full bg-[#F9F8F5] text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#184433]"
                />
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-neutral-400">
                    Comments are moderated by our dermal review board.
                  </p>
                  <button
                    type="submit"
                    className="bg-[#184433] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#0F3822] transition-colors cursor-pointer shadow-md inline-flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Comment</span>
                  </button>
                </div>
                {commentSubmitted && (
                  <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                    ✓ Thank you! Your comment has been published to the discussion.
                  </p>
                )}
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {commentsList.map((comm) => (
                  <div key={comm.id} className="bg-white rounded-2xl p-6 border border-[#184433]/10 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={comm.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'}
                          alt={comm.authorName}
                          className="w-9 h-9 rounded-full object-cover border border-[#184433]/20"
                        />
                        <div>
                          <h5 className="text-xs font-bold text-[#184433] flex items-center gap-1.5">
                            <span>{comm.authorName}</span>
                            {comm.verified && (
                              <span className="text-[10px] text-[#6F8C51] bg-[#6F8C51]/10 px-2 py-0.5 rounded-full font-semibold">
                                Verified Reader
                              </span>
                            )}
                          </h5>
                          <p className="text-[10px] text-neutral-400">{comm.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-neutral-500 font-medium">
                        <ThumbsUp className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{comm.likes}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed pl-12">
                      {comm.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </article>
        </div>

        {/* Previous & Next Article Navigation Footer */}
        <div className="max-w-7xl mx-auto pt-10 border-t border-neutral-200/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="bg-white p-6 rounded-2xl border border-[#184433]/10 hover:border-[#184433]/30 shadow-xs hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#184433]/5 text-[#184433] flex items-center justify-center shrink-0 group-hover:bg-[#184433] group-hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Previous Publication
                  </span>
                  <h4 className="font-serif text-sm sm:text-base text-[#184433] group-hover:text-[#6F8C51] truncate transition-colors">
                    {prevPost.title}
                  </h4>
                </div>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="bg-white p-6 rounded-2xl border border-[#184433]/10 hover:border-[#184433]/30 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4 group text-right"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Next Publication
                  </span>
                  <h4 className="font-serif text-sm sm:text-base text-[#184433] group-hover:text-[#6F8C51] truncate transition-colors">
                    {nextPost.title}
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#184433]/5 text-[#184433] flex items-center justify-center shrink-0 group-hover:bg-[#184433] group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>

        {/* Related Scientific Publications */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto space-y-6 pt-6">
            <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#184433]">
                  Related Clinical Investigations
                </h3>
                <p className="text-neutral-500 text-xs font-light mt-1">
                  Continue exploring research from our botanical intelligence archives.
                </p>
              </div>
              <Link
                to="/blog"
                className="text-xs font-bold text-[#184433] hover:text-[#6F8C51] flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relPost) => (
                <BlogCard key={relPost.id} post={relPost} />
              ))}
            </div>
          </section>
        )}

     

      </main>
    </div>
  );
}
