
import { Link } from 'react-router-dom';

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  totalPosts: number;
  onTagClick?: (tag: string) => void;
}

export function BlogHero({  }: BlogHeroProps) {

  return (
    <div className="bg-white border-b border-neutral-200/80 pt-8 pb-8 sm:pt-10 sm:pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        
        {/* Breadcrumb Navigation & Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-neutral-500">
          <Link to="/" className="hover:text-[#184433] transition-colors">Home</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-[#184433] font-semibold">Editorial Journal</span>
          <span className="text-neutral-300">•</span>
       
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#184433] leading-tight">
          The Dermal Science <span className="italic  text-[#6F8C51]">Journal</span>
        </h1>

        {/* Subtitle */}
        <p className="text-neutral-900 text-xs sm:text-sm md:text-base max-w-4xl mx-auto font-light leading-relaxed">
          Peer-reviewed dermatological insights, clinical lipid studies, and botanical formulation breakthroughs curated by our formulation team.
        </p>

      

  

      </div>
    </div>
  );
}
