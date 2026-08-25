import { BlogCard } from './BlogCard';
import type { BlogPost } from '../../../types/blog';

interface BlogGridProps {
  posts: BlogPost[];
  title?: string;
  savedPosts: Record<string, boolean>;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export function BlogGrid({ posts, title, savedPosts, onToggleSave }: BlogGridProps) {
  return (
    <div className="space-y-6">
      {title && (
        <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#184433]">
              {title}
            </h2>
            <p className="text-neutral-500 text-xs font-light mt-1">
              Showing {posts.length} published scientific papers and rituals
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            isSaved={!!savedPosts[post.id]}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>
    </div>
  );
}
