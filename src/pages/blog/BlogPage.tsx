import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  BookOpen, 
  Share2, 
  Check, 
  X, 
  Heart, 
  Tag, 
  Leaf, 
  ShieldCheck, 
  MessageSquare,
  Bookmark,
  ChevronRight,
  Send,
  ExternalLink
} from 'lucide-react';
import { SupportHero } from '../support/components/SupportHero';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'science' | 'ingredients' | 'rituals' | 'sustainability' | 'seasonal';
  categoryLabel: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  excerpt: string;
  tags: string[];
  featured?: boolean;
  content: {
    introduction: string;
    takeaways: string[];
    sections: {
      heading: string;
      body: string;
      highlight?: string;
    }[];
    clinicalSummary: string;
    recommendedProducts: {
      id: number;
      name: string;
      price: string;
      img: string;
      link: string;
    }[];
  };
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Molecular Science of Bakuchiol: Why Botanical Lipids Surpass Synthetic Retinoids',
    slug: 'molecular-science-bakuchiol-vs-retinol',
    category: 'science',
    categoryLabel: 'Dermal Science',
    readTime: '6 min read',
    publishDate: 'August 18, 2026',
    author: {
      name: 'Dr. Evelyn Morkin',
      role: 'Chief Medical Officer (M.D., Ph.D.)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'
    },
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Clinical evidence reveals how cold-extracted plant Bakuchiol stimulates collagen type I and IV synthesis without triggering the classic retinoid dermatitis barrier disruption.',
    tags: ['Bakuchiol', 'Anti-Aging', 'Cellular Turnover', 'Collagen Science'],
    featured: true,
    content: {
      introduction: 'For decades, synthetic retinol has been hailed as the gold standard for cellular renewal. However, for up to 48% of individuals with sensitive dermal profiles, standard retinoids trigger erythema, peeling, and severe transepidermal water loss. In this clinical deep-dive, we examine the molecular pathway of 99% pure French Bakuchiol.',
      takeaways: [
        'Bakuchiol stimulates identical gene expression pathways as retinol without binding to retinoic acid receptors.',
        'Zero photosensitivity: Safe for both morning and evening application in tropical climates.',
        'Clinically proven 20% reduction in fine line depth over 12 weeks with zero barrier disruption.'
      ],
      sections: [
        {
          heading: '1. Genomic Modulation Without Receptor Irritation',
          body: 'Bakuchiol is a meroterpene phenol isolated from the seeds of Psoralea corylifolia. While its chemical structure differs entirely from retinoids, DNA microarray profiling demonstrates that Bakuchiol upregulates collagen types I, III, and IV in human dermal fibroblasts in a manner strikingly comparable to tretinoin.',
          highlight: 'Unlike tretinoin, Bakuchiol does not trigger pro-inflammatory cytokine cascades, making it ideal for reactive and rosacea-prone skin.'
        },
        {
          heading: '2. Synergistic Lipid Matrix Integration',
          body: 'When encapsulated in biomimetic sugarcane squalane, Bakuchiol penetrates through the stratum corneum with optimal transdermal bioavailability. This lipid vehicle cushions cell membranes, ensuring cellular turnover occurs concurrently with barrier reinforcement.'
        }
      ],
      clinicalSummary: 'In randomized, double-blind clinical trials over 12 weeks, participants applying a 1% Bakuchiol lipid complex twice daily achieved equivalent wrinkle depth reduction and pigment clarification compared to 0.5% retinol, with zero instances of scaling or photosensitivity.',
      recommendedProducts: [
        {
          id: 1,
          name: 'Squalane Radiance Glow Serum',
          price: '$38.00',
          img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80',
          link: '/products/1'
        },
        {
          id: 2,
          name: 'Bakuchiol Cellular Defense Elixir',
          price: '$46.00',
          img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=300&q=80',
          link: '/products/2'
        }
      ]
    }
  },
  {
    id: 'post-2',
    title: 'Understanding Transepidermal Water Loss (TEWL) & The 3-Step Barrier Lock',
    slug: 'transepidermal-water-loss-lipid-repair',
    category: 'science',
    categoryLabel: 'Dermal Science',
    readTime: '5 min read',
    publishDate: 'August 12, 2026',
    author: {
      name: 'Dr. Adrian Vance',
      role: 'Lead Formulation Biochemist',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&h=120&q=80'
    },
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Why applying pure water or humectants without a biomimetic lipid sealant causes moisture to evaporate in under 30 minutes, and how squalane creates an airtight cellular seal.',
    tags: ['TEWL', 'Lipid Barrier', 'Hydration Science', 'Squalane'],
    content: {
      introduction: 'Many individuals experiencing chronic dryness apply layers of hydrating essences, only to find their skin tight and flaky hours later. This phenomenon is driven by Transepidermal Water Loss (TEWL), where moisture in the epidermis rapidly diffuses into dry ambient air.',
      takeaways: [
        'Humectants (like Hyaluronic Acid) attract water, but require an occlusive lipid shield to prevent back-evaporation.',
        'The stratum corneum is composed of a "brick and mortar" structure where lipids represent the essential mortar.',
        'Layering from lowest molecular density to highest lipid density reduces TEWL by up to 74%.'
      ],
      sections: [
        {
          heading: '1. The Thermodynamic Vapor Gradient',
          body: 'In air-conditioned rooms or dry climates, ambient relative humidity drops below 40%. Under these conditions, free water molecules in the upper epidermis naturally migrate toward the drier air. Without a physiological lipid seal, hyaluronic acid can actually draw moisture out from deeper dermal layers.'
        },
        {
          heading: '2. The Biomimetic Squalane Shield',
          body: 'Plant-derived squalane possesses an identical branched-chain hydrocarbon structure to squalene produced by human sebaceous glands. When patted gently over water-based toners, it forms a flexible, non-comedogenic breathable mesh that traps hydration in the intercellular spaces.'
        }
      ],
      clinicalSummary: 'Dermal capacitance testing confirms that sealing multi-weight hyaluronic acid with cold-pressed bio-squalane maintains 88% dermal hydration levels at 12 hours post-application.',
      recommendedProducts: [
        {
          id: 1,
          name: 'Squalane Radiance Glow Serum',
          price: '$38.00',
          img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80',
          link: '/products/1'
        }
      ]
    }
  },
  {
    id: 'post-3',
    title: 'Centella Asiatica (Cica): The Ancient Botanical Healer Modernized for Reactive Skin',
    slug: 'centella-asiatica-cica-modern-skincare',
    category: 'ingredients',
    categoryLabel: 'Ingredient Deep Dives',
    readTime: '4 min read',
    publishDate: 'August 06, 2026',
    author: {
      name: 'Clara Dupont',
      role: 'Director of Botanical Sourcing',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'
    },
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Exploring the bioactive triterpenoids—madecassoside and asiatic acid—that calm micro-capillary flushing and rebuild fragile skin barriers.',
    tags: ['Centella', 'Cica', 'Calming Care', 'Rosacea'],
    content: {
      introduction: 'Centella Asiatica (often termed Tiger Grass or Gotu Kola) has been revered in Ayurvedic and Asian traditional pharmacopeias for centuries. Modern molecular extraction now isolates its four primary active triterpenes to deliver instant anti-erythema benefits.',
      takeaways: [
        'Madecassoside actively blocks pro-inflammatory prostaglandins responsible for skin redness.',
        'Asiatic acid accelerates extracellular matrix synthesis, speeding repair of acne micro-tears.',
        'Zero tingling or irritation: clinically safe for post-procedure or barrier-damaged dermal layers.'
      ],
      sections: [
        {
          heading: '1. The 4 Active Triterpene Fractions',
          body: 'Rather than utilizing crude leaf pulps, Morkins utilizes cold sub-critical carbon extraction to concentrate high-potency Madecassoside, Asiaticoside, Madecassic Acid, and Asiatic Acid. These compounds interact directly with dermal fibroblasts to reinforce fragile capillary walls.'
        }
      ],
      clinicalSummary: 'Clinical erythema scoring shows an average 42% reduction in visible skin redness within 30 minutes of applying cold-extracted Centella gel.',
      recommendedProducts: [
        {
          id: 3,
          name: 'Centella Barrier Soothing Cream',
          price: '$42.00',
          img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80',
          link: '/products/3'
        }
      ]
    }
  },
  {
    id: 'post-4',
    title: 'The Circadian Skincare Rhythm: Day Defense vs. Nighttime Lipid Regeneration',
    slug: 'circadian-skincare-rhythm-day-night-routine',
    category: 'rituals',
    categoryLabel: 'Daily Rituals',
    readTime: '7 min read',
    publishDate: 'July 29, 2026',
    author: {
      name: 'Dr. Evelyn Morkin',
      role: 'Chief Medical Officer (M.D., Ph.D.)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'
    },
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80',
    excerpt: 'How your skin’s biological clock regulates daylight sebum barrier defense and transitions into intense cellular repair during delta-wave sleep cycles.',
    tags: ['Circadian Rhythm', 'Night Routine', 'Cellular Repair', 'Rituals'],
    content: {
      introduction: 'Your skin is not a static canvas; it operates under a finely tuned 24-hour circadian rhythm governed by internal CLOCK genes. Understanding this diurnal cycle is the key to unlocking peak active absorption.',
      takeaways: [
        'Morning: Skin blood flow and barrier permeability decrease to maximize antioxidant protection against UV and pollution.',
        'Night: Blood flow surges and cellular mitosis peaks between 11:00 PM and 2:00 AM, opening an optimal window for active peptide absorption.',
        'Nighttime lipid loss is 3x higher, making a rich botanical facial oil crucial before sleep.'
      ],
      sections: [
        {
          heading: '1. The Morning Defense Shield',
          body: 'During daylight hours, the skin faces environmental free radicals from blue light and particulate matter. Formulations rich in Vitamin E, botanical hydrosols, and light lipids create an inert shield against oxidation.'
        },
        {
          heading: '2. The Nocturnal Cellular Renaissance',
          body: 'As melatonin levels rise in the evening, epidermal cellular mitosis accelerates. Because stratum corneum permeability is elevated at night, active ingredients like Bakuchiol and Marula Oil penetrate up to 60% deeper.'
        }
      ],
      clinicalSummary: 'Aligning active ingredient application with nocturnal peak mitosis increased skin elasticity by 31% compared to random application schedules.',
      recommendedProducts: [
        {
          id: 1,
          name: 'Squalane Radiance Glow Serum',
          price: '$38.00',
          img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80',
          link: '/products/1'
        }
      ]
    }
  },
  {
    id: 'post-5',
    title: 'Why Cold-Pressed Mechanical Extraction Retains 400% More Bio-Active Enzymes',
    slug: 'cold-pressed-mechanical-extraction-benefits',
    category: 'sustainability',
    categoryLabel: 'Eco-Ethics & Sustainability',
    readTime: '5 min read',
    publishDate: 'July 21, 2026',
    author: {
      name: 'Clara Dupont',
      role: 'Director of Botanical Sourcing',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'
    },
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Traditional chemical solvent extraction destroys heat-sensitive plant enzymes. Here is how our zero-waste mills in Provence preserve raw botanical life forces.',
    tags: ['Cold-Pressed', 'Zero-Waste', 'Extraction Science', 'Sustainability'],
    content: {
      introduction: 'Most commercial cosmetic oils undergo high-temperature refining (above 200°C) with hexane solvents to maximize commercial yield. This stripping process degrades native carotenoids, polyphenols, and delicate omegas.',
      takeaways: [
        'Mechanical cold pressing never exceeds 38°C, preserving 100% of biological enzyme activity.',
        'Zero chemical solvents means zero trace residues on sensitive skin barriers.',
        '100% of residual seed meal is repurposed into organic agriculture compost in Provence.'
      ],
      sections: [
        {
          heading: '1. Temperature Thresholds & Phytochemical Integrity',
          body: 'Volatile botanical antioxidants such as Tocopherols and Ferulic fractions break down rapidly under thermal stress. Our cold mills utilize slow mechanical screw presses operating in inert nitrogen blankets to eliminate oxidation.'
        }
      ],
      clinicalSummary: 'Spectrophotometric analysis confirms cold-pressed Marula and Rosehip fractions retain 412% higher active polyphenol content than hot-solvent refined equivalents.',
      recommendedProducts: [
        {
          id: 2,
          name: 'Marula Nourishing Face Oil',
          price: '$48.00',
          img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=300&q=80',
          link: '/products/2'
        }
      ]
    }
  },
  {
    id: 'post-6',
    title: 'Seasonal Skin Transition: Restoring Dermal Hydration in Shifting Humidity',
    slug: 'seasonal-skin-transition-humidity-changes',
    category: 'seasonal',
    categoryLabel: 'Seasonal Skincare',
    readTime: '4 min read',
    publishDate: 'July 14, 2026',
    author: {
      name: 'Dr. Adrian Vance',
      role: 'Lead Formulation Biochemist',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&h=120&q=80'
    },
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Step-by-step guidance on adjusting your morning and evening lipid ratios when moving between monsoon humidity, dry air-conditioning, and winter winds.',
    tags: ['Seasonal Skincare', 'Humidity', 'Layering Guide', 'Regimen Adjustment'],
    content: {
      introduction: 'As ambient weather transitions between humid monsoons and dry, crisp winters, skin sebum viscosity changes dramatically. Adapting your molecular layering routine maintains steady barrier equilibrium.',
      takeaways: [
        'High Humidity: Shift toward lightweight multi-molecular hydrosols and gel creams.',
        'Low Humidity / AC: Introduce rich lipid sealants like squalane and barrier oils.',
        'Never skip gentle exfoliation during weather transitions to prevent clogged micro-pores.'
      ],
      sections: [
        {
          heading: '1. The Dynamic Humidity Matrix',
          body: 'In high humidity, heavy occlusives can trap excess sweat and particulate matter. Transitioning to cold-pressed botanical gel creams rich in Centella and Aloe maintains hydration without creating pore congestion.'
        }
      ],
      clinicalSummary: 'Adjusting seasonal lipid ratios stabilized stratum corneum hydration index by 82% throughout seasonal weather changes in clinical subjects.',
      recommendedProducts: [
        {
          id: 3,
          name: 'Centella Barrier Soothing Cream',
          price: '$42.00',
          img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80',
          link: '/products/3'
        }
      ]
    }
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Journals' },
  { id: 'science', label: 'Dermal Science' },
  { id: 'ingredients', label: 'Ingredient Deep Dives' },
  { id: 'rituals', label: 'Daily Rituals' },
  { id: 'sustainability', label: 'Eco-Ethics & Sourcing' },
  { id: 'seasonal', label: 'Seasonal Guides' },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const toggleSavePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
    }
  };

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-neutral-800 pb-24 select-none">
      
      {/* Top Editorial Support Hero Banner */}
      <SupportHero
        badge="Botanical Intelligence Journal"
        title="The Dermal Science Journal"
        subtitle="Explore peer-reviewed dermatological insights, bioactive lipid analyses, and clean formulation science curated by our clinical team."
        breadcrumbCurrent="Blog Journal"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 relative z-20 space-y-14">
        
        {/* Search & Category Filter Navigation Bar */}
        <div className="bg-white/95 rounded-xl p-6 sm:p-7 border border-[#184433]/10 shadow-xl shadow-[#184433]/5 space-y-5 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-[#184433]/60 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search science, ingredients (e.g. Bakuchiol, Cica, TEWL)..."
                className="w-full bg-[#f9faf7] text-neutral-900 placeholder:text-neutral-400 text-xs sm:text-sm pl-11 pr-4 py-3.5 rounded-xl border border-[#184433]/15 focus:outline-none focus:border-[#184433] focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Quick Science Stats */}
            <div className="flex items-center gap-4 text-xs font-semibold text-[#184433] uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#6F8C51]" /> 100% Peer-Reviewed</span>
              <span className="hidden sm:inline-block">•</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#6F8C51]" /> Dermatologist Verified</span>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#184433] text-[#AFD971] shadow-md shadow-[#184433]/20 ring-1 ring-[#184433]'
                      : 'bg-[#FAF9F5] text-neutral-700 hover:bg-[#184433]/5 border border-[#184433]/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Editorial Article Spotlight (Shown when no search/filter active) */}
        {selectedCategory === 'all' && !searchQuery && (
          <div 
            onClick={() => setActiveArticle(featuredPost)}
            className="bg-white rounded-xl overflow-hidden border border-[#184433]/10 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
          >
            {/* Featured Image */}
            <div className="lg:col-span-7 h-72 sm:h-96 lg:h-auto relative overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-[0.2em] bg-[#184433] text-[#AFD971] px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                Featured Cover Story
              </span>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span className="font-bold text-[#6F8C51] uppercase tracking-wider">
                    {featuredPost.categoryLabel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#184433]" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#184433] leading-snug group-hover:text-[#0F3822] transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap pt-2">
                  {featuredPost.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-medium bg-[#FAF9F5] text-[#184433] px-2.5 py-1 rounded-md border border-[#184433]/5">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author & Read Action Bar */}
              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#184433]/20 shadow-xs"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#184433]">{featuredPost.author.name}</h4>
                    <p className="text-[10px] text-neutral-400 font-light">{featuredPost.publishDate}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#184433] group-hover:text-[#6F8C51] uppercase tracking-wider transition-colors">
                  <span>Read Journal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* All Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#184433]">
                {selectedCategory === 'all' ? 'Latest Clinical Publications' : CATEGORIES.find(c => c.id === selectedCategory)?.label}
              </h3>
              <p className="text-neutral-500 text-xs font-light mt-0.5">
                Showing {filteredPosts.length} published scientific papers and rituals
              </p>
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                const isSaved = !!savedPosts[post.id];
                return (
                  <article
                    key={post.id}
                    onClick={() => setActiveArticle(post)}
                    className="bg-white rounded-xl overflow-hidden border border-[#184433]/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:border-[#184433]/25"
                  >
                    <div>
                      {/* Thumbnail Image */}
                      <div className="h-52 w-full overflow-hidden relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#184433] px-3 py-1 rounded-full border border-[#184433]/10 shadow-xs backdrop-blur-md">
                          {post.categoryLabel}
                        </span>

                        <button
                          onClick={(e) => toggleSavePost(post.id, e)}
                          title="Save Article"
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#184433] flex items-center justify-center hover:bg-white shadow-md transition-colors cursor-pointer"
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#184433] text-[#184433]' : 'text-neutral-600'}`} />
                        </button>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-3">
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

                        <h4 className="font-serif text-xl font-normal text-[#184433] leading-snug group-hover:text-[#0F3822] transition-colors line-clamp-2">
                          {post.title}
                        </h4>

                        <p className="text-neutral-600 text-xs font-light leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer Author Bar */}
                    <div className="p-6 pt-0">
                      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-7 h-7 rounded-full object-cover border border-[#184433]/20 shrink-0"
                          />
                          <span className="text-xs font-medium text-neutral-800 truncate">
                            {post.author.name}
                          </span>
                        </div>

                        <span className="text-xs font-bold text-[#184433] group-hover:text-[#6F8C51] flex items-center gap-1 shrink-0 uppercase tracking-wider">
                          <span>Read</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-[#184433]/10 p-8">
              <BookOpen className="w-12 h-12 text-[#6F8C51] mx-auto mb-3 opacity-60" />
              <h4 className="font-serif text-2xl text-[#184433]">No journal articles found</h4>
              <p className="text-neutral-500 text-sm mt-1">Try searching for other terms like "Bakuchiol", "Squalane", or "TEWL".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-5 bg-[#184433] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#0F3822] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Botanical Gazette Newsletter Subscription */}
        <div className="bg-gradient-to-br from-[#184433] via-[#0F3822] to-black text-white rounded-xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#AFD971]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mx-auto text-center relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#AFD971] bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
              <Leaf className="w-3.5 h-3.5 text-[#AFD971]" />
              <span>Bi-Weekly Publication</span>
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              Subscribe to the Botanical Gazette
            </h3>

            <p className="text-white/80 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
              Receive clinical breakthroughs on cellular lipid repair, exclusive early access to harvest batches, and <strong>10% off your next botanical regimen</strong>.
            </p>

            {newsletterSubmitted ? (
              <div className="bg-white/10 border border-[#AFD971]/30 rounded-xl p-6 backdrop-blur-md max-w-md mx-auto animate-fade-in space-y-2">
                <Check className="w-8 h-8 text-[#AFD971] mx-auto" />
                <h4 className="font-serif text-xl text-white">Welcome to the Sanctuary Gazette</h4>
                <p className="text-xs text-white/80 font-light">
                  Check your inbox for your 10% welcome code: <strong className="font-mono text-[#AFD971]">SANCTUARY10</strong>
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-white/10 text-white placeholder:text-white/40 text-xs sm:text-sm px-4 py-3.5 rounded-xl border border-white/20 focus:outline-none focus:border-[#AFD971] transition-all"
                />
                <button
                  type="submit"
                  className="bg-[#AFD971] text-[#0B2E1C] font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-white transition-colors cursor-pointer shrink-0 shadow-lg shadow-[#AFD971]/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
            <p className="text-[10px] text-white/60 font-light">
              Zero spam. Unsubscribe anytime in 1-click.
            </p>
          </div>
        </div>

      </div>

      {/* ────────────────────────────────────────────────────────────
          FULL ARTICLE READING MODAL / DRAWER
         ──────────────────────────────────────────────────────────── */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-neutral-800 rounded-xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl border border-[#184433]/15 my-auto flex flex-col relative animate-slide-up"
          >
            {/* Sticky Header Bar */}
            <div className="sticky top-0 bg-white/95 border-b border-neutral-100 px-6 py-4 flex items-center justify-between z-20 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#184433]/5 text-[#184433] px-2.5 py-1 rounded-full">
                  {activeArticle.categoryLabel}
                </span>
                <span className="text-xs text-neutral-400">• {activeArticle.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 cursor-pointer transition-colors"
                  title="Share Article Link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 cursor-pointer transition-colors"
                  title="Close Article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Article Body */}
            <div className="p-6 sm:p-10 space-y-8">
              
              {/* Title & Author Meta */}
              <div className="space-y-4">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#184433] leading-tight">
                  {activeArticle.title}
                </h1>

                <div className="flex items-center gap-3 pt-2 border-b border-neutral-100 pb-6">
                  <img
                    src={activeArticle.author.avatar}
                    alt={activeArticle.author.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#184433]/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#184433]">{activeArticle.author.name}</h4>
                    <p className="text-xs text-neutral-500 font-light">{activeArticle.author.role} • {activeArticle.publishDate}</p>
                  </div>
                </div>
              </div>

              {/* Cover Hero Image */}
              <div className="rounded-xl overflow-hidden h-72 sm:h-96 w-full shadow-md">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Key Takeaways Callout Card */}
              <div className="bg-[#FAF9F5] border-l-4 border-[#184433] p-6 rounded-r-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#184433] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#6F8C51]" />
                  <span>Clinical Takeaways at a Glance:</span>
                </h4>
                <ul className="space-y-2">
                  {activeArticle.content.takeaways.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-light">
                      <span className="text-[#6F8C51] font-bold">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Text Content */}
              <div className="space-y-6 text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                <p className="text-base sm:text-lg font-normal text-neutral-900 leading-relaxed italic">
                  "{activeArticle.content.introduction}"
                </p>

                {activeArticle.content.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-3 pt-4">
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#184433]">
                      {sec.heading}
                    </h3>
                    <p className="leading-relaxed">
                      {sec.body}
                    </p>
                    {sec.highlight && (
                      <div className="bg-[#184433]/5 p-4 rounded-xl border border-[#184433]/10 text-xs sm:text-sm text-[#184433] font-medium my-3">
                        💡 {sec.highlight}
                      </div>
                    )}
                  </div>
                ))}

                {/* Clinical Verdict Box */}
                <div className="bg-gradient-to-br from-[#184433] to-[#0F3822] text-white p-6 sm:p-8 rounded-xl shadow-lg mt-8 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#AFD971]">
                    Clinical Summary & Verdict
                  </span>
                  <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                    {activeArticle.content.clinicalSummary}
                  </p>
                </div>
              </div>

              {/* Recommended Botanical Formulas */}
              {activeArticle.content.recommendedProducts.length > 0 && (
                <div className="pt-8 border-t border-neutral-100 space-y-4">
                  <h4 className="font-serif text-2xl text-[#184433]">
                    Formulations Mentioned in this Journal
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeArticle.content.recommendedProducts.map((prod) => (
                      <Link
                        key={prod.id}
                        to={prod.link}
                        onClick={() => setActiveArticle(null)}
                        className="bg-[#FAF9F5] p-4 rounded-xl border border-[#184433]/10 hover:border-[#184433]/30 flex items-center justify-between gap-4 transition-all group"
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={prod.img}
                            alt={prod.name}
                            className="w-14 h-14 rounded-lg object-cover border border-neutral-200 shadow-xs"
                          />
                          <div>
                            <h5 className="font-sans text-xs sm:text-sm font-bold text-[#184433] group-hover:underline">
                              {prod.name}
                            </h5>
                            <span className="text-xs font-semibold text-neutral-700">{prod.price}</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#184433] group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer Bar */}
              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="bg-[#184433] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-[#0F3822] transition-colors cursor-pointer"
                >
                  Back to All Journals
                </button>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#184433] hover:underline cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share Journal'}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
