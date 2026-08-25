export default function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-2xl border border-brand-dark/5 shadow-sm">
      <div className="w-24 h-24 mb-6 rounded-full bg-brand-cream flex items-center justify-center">
        <svg className="w-12 h-12 text-brand-dark/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-serif font-bold text-brand-dark mb-3">No Products Found</h3>
      <p className="text-brand-dark/60 max-w-md mb-8">
        We couldn't find any products matching your current filters. Try adjusting your search criteria or clearing filters to see more results.
      </p>
      <button 
        onClick={onClearFilters}
        className="px-8 py-3 bg-brand-dark text-white rounded-full font-semibold tracking-wide hover:bg-brand-dark/90 transition-colors shadow-md hover:shadow-lg"
      >
        Clear All Filters
      </button>
    </div>
  );
}
