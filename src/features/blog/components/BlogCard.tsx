import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Bookmark } from 'lucide-react';
import type { BlogPost } from '../../../types/blog';

interface BlogCardProps {
  post: BlogPost;
  isSaved?: boolean;
  onToggleSave?: (id: string, e: React.MouseEvent) => void;
}

export function BlogCard({ post, isSaved = false, onToggleSave }: BlogCardProps) {
  return (
    <article className="group h-full flex flex-col">
      <Link
        to={`/blog/${post.slug}`}
        className="bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-md hover:shadow-2xl shadow-black  transition-all duration-300 flex flex-col justify-between h-full hover:border-[#184433]/30"
      >
        <div>
          {/* Card Thumbnail Image */}
          <div className="h-52 w-full overflow-hidden relative bg-neutral-100">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Category Tag */}
            <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#184433] px-3 py-1 rounded-full border border-neutral-200/80 shadow-xs backdrop-blur-md">
              {post.categoryLabel}
            </span>

            {/* Bookmark Toggle */}
            {onToggleSave && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleSave(post.id, e);
                }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#184433] flex items-center justify-center hover:bg-white shadow-md transition-transform hover:scale-110 cursor-pointer z-10"
                title={isSaved ? 'Remove from saved' : 'Save article'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#184433] text-[#184433]' : 'text-neutral-700'}`} />
              </button>
            )}
          </div>

          {/* Card Content */}
          <div className="p-5 sm:p-6 space-y-2.5">
            {/* Date & Read Time */}
            <div className="flex items-center justify-between text-[11px] text-neutral-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#6F8C51]" />
                {post.publishDate}
              </span>
              <span className="flex items-center gap-1 text-neutral-600 font-medium">
                <Clock className="w-3 h-3 text-[#184433]" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-lg sm:text-xl font-normal text-[#184433] leading-snug group-hover:text-[#0b2b1b] transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-neutral-600 text-xs font-light leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Card Footer Author Bar */}
        <div className="p-5 sm:p-6 pt-0">
          <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-7 h-7 rounded-full object-cover border border-[#184433]/20 shrink-0"
              />
              <span className="text-xs font-medium text-neutral-800 truncate">
                {post.author.name}
              </span>
            </div>

            <span className="text-xs font-bold text-[#184433] group-hover:text-[#6F8C51] flex items-center gap-1 shrink-0 uppercase tracking-wider transition-colors">
              <span>Read</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
