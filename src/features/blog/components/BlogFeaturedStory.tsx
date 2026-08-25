import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Bookmark, Sparkles } from 'lucide-react';
import type { BlogPost } from '../../../types/blog';

interface BlogFeaturedStoryProps {
  post: BlogPost;
  isSaved?: boolean;
  onToggleSave?: (id: string, e: React.MouseEvent) => void;
}

export function BlogFeaturedStory({ post, isSaved = false, onToggleSave }: BlogFeaturedStoryProps) {
  return (
    <div className="relative group">
      <Link
        to={`/blog/${post.slug}`}
        className="block bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-xs hover:shadow-xl transition-all duration-400 hover:border-[#184433]/30"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px] lg:min-h-[320px]">
          
          {/* Cover Media Column */}
          <div className="lg:col-span-5 relative h-56 sm:h-64 lg:h-full overflow-hidden bg-neutral-100">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Top Badges Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#184433] text-[#AFD971] px-3.5 py-1 rounded-full border border-white/20 shadow-sm backdrop-blur-md flex items-center gap-1.5 font-sans">
                <Sparkles className="w-3 h-3" />
                Featured Editorial
              </span>
            </div>

            {onToggleSave && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleSave(post.id, e);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/95 text-[#184433] flex items-center justify-center hover:bg-white shadow-md backdrop-blur-md transition-transform hover:scale-110 cursor-pointer z-10"
                title={isSaved ? 'Remove from saved' : 'Save article'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#184433] text-[#184433]' : 'text-neutral-700'}`} />
              </button>
            )}
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-white">
            <div className="space-y-3">
              {/* Category & Read Time */}
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="font-bold text-[#6F8C51] text-[11px] uppercase tracking-wider bg-[#6F8C51]/10 px-2.5 py-0.5 rounded-full font-sans">
                  {post.categoryLabel}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-neutral-500">
                  <Clock className="w-3 h-3 text-[#184433]" />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-[#184433] leading-snug group-hover:text-[#0b2b1b] transition-colors">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 sm:line-clamp-3">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {post.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium bg-[#FAF9F5] text-[#184433] px-2.5 py-0.5 rounded-md border border-[#184433]/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author & Action Bar */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#184433]/20 shadow-xs"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#184433]">{post.author.name}</h4>
                  <p className="text-[10px] text-neutral-400 font-light">{post.publishDate}</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#184433] group-hover:text-[#6F8C51] uppercase tracking-wider transition-colors">
                <span>Read Full Journal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
}
