import { BookOpen, RefreshCw } from 'lucide-react';

interface BlogEmptyStateProps {
  onReset: () => void;
  searchQuery?: string;
}

export function BlogEmptyState({ onReset, searchQuery }: BlogEmptyStateProps) {
  return (
    <div className="text-center py-20 bg-white rounded-3xl border border-[#184433]/10 p-8 shadow-sm space-y-4 max-w-2xl mx-auto">
      <div className="w-16 h-16 rounded-full bg-[#184433]/5 text-[#6F8C51] flex items-center justify-center mx-auto">
        <BookOpen className="w-8 h-8" />
      </div>

      <h3 className="font-serif text-2xl sm:text-3xl text-[#184433]">
        No journal publications found
      </h3>

      <p className="text-neutral-500 text-xs sm:text-sm max-w-md mx-auto font-light leading-relaxed">
        {searchQuery ? (
          <>
            We couldn't find any papers matching <span className="font-semibold text-neutral-800">"{searchQuery}"</span>. Try searching for "Bakuchiol", "Squalane", "TEWL", or "Cica".
          </>
        ) : (
          'There are currently no articles in this specific category.'
        )}
      </p>

      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 bg-[#184433] text-white text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-2xl hover:bg-[#0F3822] shadow-md transition-all cursor-pointer hover:scale-105"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Reset Filters & View All</span>
      </button>
    </div>
  );
}
