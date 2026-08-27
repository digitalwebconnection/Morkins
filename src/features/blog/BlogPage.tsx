import { useState, useMemo, useEffect } from 'react';
import { BLOG_POSTS, BLOG_CATEGORIES } from './data/blogData';
import {
  BlogHero,
  BlogGrid,
  BlogEmptyState,
} from './components';
import type { BlogCategoryId } from '../../types/blog';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'readTime'>('latest');
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('morkins_saved_blog_posts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const toggleSavePost = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedPosts((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('morkins_saved_blog_posts', JSON.stringify(updated));
      } catch {
        // ignore localStorage errors
      }
      return updated;
    });
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  // Category counts calculation

  // Filtered & Sorted Posts
  const filteredAndSortedPosts = useMemo(() => {
    let result = BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.categoryLabel.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.views || 0) - (a.views || 0);
      }
      if (sortBy === 'readTime') {
        const timeA = parseInt(a.readTime) || 0;
        const timeB = parseInt(b.readTime) || 0;
        return timeA - timeB;
      }
      // default: latest
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Featured story (cover story)
  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  // Show cover story only when on 'all' category and no active search query
  const showFeaturedHero = selectedCategory === 'all' && !searchQuery;

  // Remaining posts when featured post is displayed
  const regularGridPosts = useMemo(() => {
    if (showFeaturedHero) {
      return filteredAndSortedPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredAndSortedPosts;
  }, [filteredAndSortedPosts, showFeaturedHero, featuredPost.id]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('latest');
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-20">
      {/* ── PART 1: EDITORIAL JOURNAL HERO & SEARCH (BlogHero) ── */}
      {/* Visual title, live article search, popular botanical tag chips, and total publication counter */}
      <BlogHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalPosts={BLOG_POSTS.length}
        onTagClick={handleTagClick}
      />

      {/* ── PART 2: PUBLICATIONS GRID & ARTICLE CARDS CONTAINER ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 sm:space-y-10">
        {/* ── PART 2A: ARTICLE CARDS GRID (BlogGrid & BlogCard) ── */}
        {filteredAndSortedPosts.length > 0 ? (
          <section aria-label="Journal Publications">
            <BlogGrid
              posts={regularGridPosts}
              title={
                selectedCategory === 'all'
                  ? showFeaturedHero
                    ? 'Recent Clinical Investigations'
                    : 'All Publications'
                  : BLOG_CATEGORIES.find((c) => c.id === selectedCategory)?.label
              }
              savedPosts={savedPosts}
              onToggleSave={toggleSavePost}
            />
          </section>
        ) : (
          /* ── PART 2B: EMPTY SEARCH / FILTER STATE (BlogEmptyState) ── */
          <BlogEmptyState
            onReset={handleResetFilters}
            searchQuery={searchQuery}
          />
        )}
      </main>
    </div>
  );
}
