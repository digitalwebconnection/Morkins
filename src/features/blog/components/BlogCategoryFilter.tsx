import { SlidersHorizontal } from 'lucide-react';
import type { BlogCategory, BlogCategoryId } from '../../../types/blog';

interface BlogCategoryFilterProps {
  categories: BlogCategory[];
  selectedCategory: BlogCategoryId;
  onSelectCategory: (id: BlogCategoryId) => void;
  sortBy: 'latest' | 'popular' | 'readTime';
  onSortChange: (sort: 'latest' | 'popular' | 'readTime') => void;
  categoryCounts: Record<string, number>;
}

export function BlogCategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  categoryCounts,
}: BlogCategoryFilterProps) {
  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-neutral-200/90 shadow-xs space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#184433] text-white shadow-xs'
                    : 'bg-[#FAF9F5] text-neutral-700 hover:bg-[#184433]/5 border border-neutral-200/60 hover:text-[#184433]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full transition-colors ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-neutral-200 text-neutral-600 group-hover:bg-[#184433]/10'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-2.5 md:pt-0 border-neutral-100">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#184433]/70" />
          <span className="text-xs text-neutral-500 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'latest' | 'popular' | 'readTime')}
            className="bg-[#FAF9F5] text-xs font-semibold text-[#184433] px-3 py-1.5 rounded-xl border border-neutral-200/80 outline-none focus:border-[#184433] cursor-pointer"
          >
            <option value="latest">Latest First</option>
            <option value="popular">Most Popular</option>
            <option value="readTime">Quick Reads</option>
          </select>
        </div>

      </div>
    </div>
  );
}
