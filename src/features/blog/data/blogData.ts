import type { BlogPost, BlogCategory } from '../../../types/blog';

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: 'all', label: 'All Journals', description: 'Complete library of clinical dermal research & botanical rituals' },
  { id: 'science', label: 'Dermal Science', description: 'Cellular pathways, molecular lipid repair, and clinical studies' },
  { id: 'ingredients', label: 'Ingredient Deep Dives', description: 'Active bio-terpenes, botanical extractions, and phytonutrients' },
  { id: 'rituals', label: 'Daily Rituals', description: 'Circadian skincare rhythms and holistic barrier application routines' },
  { id: 'sustainability', label: 'Eco-Ethics & Sourcing', description: 'Zero-waste French harvest mills and carbon-neutral extraction' },
  { id: 'seasonal', label: 'Seasonal Guides', description: 'Regimen adaptations for shifting humidity and temperature extremes' },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Molecular Science of Bakuchiol: Why Botanical Lipids Surpass Synthetic Retinoids',
    slug: 'molecular-science-bakuchiol-vs-retinol',
    category: 'science',
    categoryLabel: 'Dermal Science',
    readTime: '6 min read',
    listenTime: '4 min audio',
    publishDate: 'August 18, 2026',
    author: {
      name: 'Dr. Evelyn Morkin',
      role: 'Chief Medical Officer (M.D., Ph.D.)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      bio: 'Board-certified dermatologist with 15+ years researching plant-derived phyto-actives and cellular longevity at the Bordeaux Botanical Institute.'
    },
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'High-purity crystalline Bakuchiol isolated through supercritical cold CO₂ extraction.',
    excerpt: 'Clinical evidence reveals how cold-extracted plant Bakuchiol stimulates collagen type I and IV synthesis without triggering the classic retinoid dermatitis barrier disruption.',
    tags: ['Bakuchiol', 'Anti-Aging', 'Cellular Turnover', 'Collagen Science', 'Clinical Trial'],
    featured: true,
    trending: true,
    views: 14250,
    claps: 384,
    content: {
      introduction: 'For decades, synthetic retinol has been hailed as the gold standard for cellular renewal. However, for up to 48% of individuals with sensitive dermal profiles, standard retinoids trigger erythema, peeling, and severe transepidermal water loss. In this clinical deep-dive, we examine the molecular pathway of 99% pure French Bakuchiol.',
      takeaways: [
        'Bakuchiol stimulates identical gene expression pathways as retinol without binding to retinoic acid receptors.',
        'Zero photosensitivity: Safe for both morning and evening application in tropical climates.',
        'Clinically proven 20% reduction in fine line depth over 12 weeks with zero barrier disruption.',
        'Maintains stratum corneum lipid membrane fluidity without causing redness or peeling.'
      ],
      sections: [
        {
          heading: '1. Genomic Modulation Without Receptor Irritation',
          body: 'Bakuchiol is a meroterpene phenol isolated from the seeds of Psoralea corylifolia. While its chemical structure differs entirely from retinoids, DNA microarray profiling demonstrates that Bakuchiol upregulates collagen types I, III, and IV in human dermal fibroblasts in a manner strikingly comparable to tretinoin.',
          highlight: 'Unlike tretinoin, Bakuchiol does not trigger pro-inflammatory cytokine cascades (IL-1α and TNF-α), making it exceptionally safe for reactive, eczema-prone, and rosacea-prone skin.'
        },
        {
          heading: '2. Synergistic Lipid Matrix Integration',
          body: 'When encapsulated in biomimetic sugarcane squalane, Bakuchiol penetrates through the stratum corneum with optimal transdermal bioavailability. This lipid vehicle cushions cell membranes, ensuring cellular turnover occurs concurrently with barrier reinforcement.',
          highlight: 'Biomimetic carrier lipids enhance the trans-epidermal flux rate by 340% compared to alcohol-based emulsions.'
        },
        {
          heading: '3. Photostability & Daylight Safety',
          body: 'A persistent challenge with classical retinoids is their chemical photodegradation under UV radiation, producing irritating free-radical intermediates. Bakuchiol possesses inherent antioxidant resonance stabilization, rendering it fully photostable for morning application alongside broad-spectrum SPF.'
        }
      ],
      clinicalSummary: 'In randomized, double-blind clinical trials over 12 weeks with 64 subjects, participants applying a 1% Bakuchiol lipid complex twice daily achieved equivalent wrinkle depth reduction and pigment clarification compared to 0.5% retinol, with zero instances of scaling, dryness, or photosensitivity.',
      recommendedProducts: [
        {
          id: 1,
          name: 'Squalane Radiance Glow Serum',
          price: '$38.00',
          rating: 4.9,
          reviewsCount: 182,
          img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
          link: '/products/botanical-radiance-glow-serum',
          tagline: '100% Plant-derived sugarcane squalane with cold-pressed Bakuchiol'
        },
        {
          id: 2,
          name: 'Bakuchiol Cellular Defense Elixir',
          price: '$46.00',
          rating: 5.0,
          reviewsCount: 94,
          img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=400&q=80',
          link: '/products/bio-active-barrier-repair-cream',
          tagline: 'High-potency 2% botanical retinol alternative with Marula oil'
        }
      ],
      citations: [
        'Chaudhuri RK, Bojanowski K. "Bakuchiol: a retinol-like functional compound revealed by gene expression profiling." Int J Cosmet Sci. 2014;36(3):221-230.',
        'Dhaliwal S, et al. "Prospective, randomized, double-blind assessment of topical bakuchiol and retinol for facial photoageing." Br J Dermatol. 2019;180(2):289-296.'
      ]
    },
    comments: [
      {
        id: 'c1',
        authorName: 'Camille Laurent',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80',
        date: 'August 20, 2026',
        content: 'This breakdown is phenomenal! I had severe retinoid dermatitis for 6 months until switching to the Bakuchiol Elixir. My barrier healed within 2 weeks.',
        likes: 24,
        verified: true
      },
      {
        id: 'c2',
        authorName: 'Marcus Sterling',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
        date: 'August 19, 2026',
        content: 'The explanation regarding photo-stability cleared up my confusion on whether I can apply this in the morning. Great scientific rigor.',
        likes: 11,
        verified: true
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Understanding Transepidermal Water Loss (TEWL) & The 3-Step Barrier Lock',
    slug: 'transepidermal-water-loss-lipid-repair',
    category: 'science',
    categoryLabel: 'Dermal Science',
    readTime: '5 min read',
    listenTime: '3 min audio',
    publishDate: 'August 12, 2026',
    author: {
      name: 'Dr. Adrian Vance',
      role: 'Lead Formulation Biochemist',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&h=200&q=80',
      bio: 'Senior cosmetic chemist specializing in micro-emulsion thermodynamic stability and lipid bilayer repair mechanisms.'
    },
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Cellular moisture barrier cross-section depicting stratum corneum lipid bilayer sealing.',
    excerpt: 'Why applying pure water or humectants without a biomimetic lipid sealant causes moisture to evaporate in under 30 minutes, and how squalane creates an airtight cellular seal.',
    tags: ['TEWL', 'Lipid Barrier', 'Hydration Science', 'Squalane', 'Ceramides'],
    featured: false,
    trending: true,
    views: 9810,
    claps: 295,
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
          body: 'In air-conditioned rooms or dry climates, ambient relative humidity drops below 40%. Under these conditions, free water molecules in the upper epidermis naturally migrate toward the drier air. Without a physiological lipid seal, hyaluronic acid can actually draw moisture out from deeper dermal layers.',
          highlight: 'Never apply pure humectants onto dry skin in low-humidity environments without immediately sealing with a lipid layer.'
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
          rating: 4.9,
          reviewsCount: 182,
          img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
          link: '/products/botanical-radiance-glow-serum',
          tagline: 'Ultralight non-greasy lipid shield for 24-hour hydration lock'
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
    listenTime: '3 min audio',
    publishDate: 'August 06, 2026',
    author: {
      name: 'Clara Dupont',
      role: 'Director of Botanical Sourcing',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      bio: 'Ethno-botanist exploring sustainable wild harvesting across Madagascar and the French Alps.'
    },
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Wild harvested Centella Asiatica leaves undergoing low-temperature extraction.',
    excerpt: 'Exploring the bioactive triterpenoids—madecassoside and asiatic acid—that calm micro-capillary flushing and rebuild fragile skin barriers.',
    tags: ['Centella', 'Cica', 'Calming Care', 'Rosacea', 'Barrier Recovery'],
    featured: false,
    trending: false,
    views: 7420,
    claps: 215,
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
          body: 'Rather than utilizing crude leaf pulps, Morkins utilizes cold sub-critical carbon extraction to concentrate high-potency Madecassoside, Asiaticoside, Madecassic Acid, and Asiatic Acid. These compounds interact directly with dermal fibroblasts to reinforce fragile capillary walls.',
          highlight: 'Pure Madecassoside reduces visible micro-capillary flushing by 48% within 20 minutes of topical application.'
        }
      ],
      clinicalSummary: 'Clinical erythema scoring shows an average 42% reduction in visible skin redness within 30 minutes of applying cold-extracted Centella gel.',
      recommendedProducts: [
        {
          id: 3,
          name: 'Centella Barrier Soothing Cream',
          price: '$42.00',
          rating: 4.8,
          reviewsCount: 119,
          img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
          link: '/products/gentle-clarifying-foaming-wash',
          tagline: 'Cooling peptide cream for instant barrier calming'
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
    listenTime: '5 min audio',
    publishDate: 'July 29, 2026',
    author: {
      name: 'Dr. Evelyn Morkin',
      role: 'Chief Medical Officer (M.D., Ph.D.)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      bio: 'Board-certified dermatologist with 15+ years researching plant-derived phyto-actives and cellular longevity.'
    },
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Nighttime lipid infusion under circadian cellular regeneration window.',
    excerpt: 'How your skin’s biological clock regulates daylight sebum barrier defense and transitions into intense cellular repair during delta-wave sleep cycles.',
    tags: ['Circadian Rhythm', 'Night Routine', 'Cellular Repair', 'Rituals', 'Sleep Skincare'],
    featured: false,
    trending: true,
    views: 11200,
    claps: 412,
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
          body: 'As melatonin levels rise in the evening, epidermal cellular mitosis accelerates. Because stratum corneum permeability is elevated at night, active ingredients like Bakuchiol and Marula Oil penetrate up to 60% deeper.',
          highlight: 'Applying botanical lipid elixirs between 9:00 PM and 11:00 PM synchronizes directly with delta-phase epidermal cellular repair.'
        }
      ],
      clinicalSummary: 'Aligning active ingredient application with nocturnal peak mitosis increased skin elasticity by 31% compared to random application schedules.',
      recommendedProducts: [
        {
          id: 1,
          name: 'Squalane Radiance Glow Serum',
          price: '$38.00',
          rating: 4.9,
          reviewsCount: 182,
          img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
          link: '/products/botanical-radiance-glow-serum',
          tagline: 'Ideal nocturnal lipid foundation for all skin types'
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
    listenTime: '3 min audio',
    publishDate: 'July 21, 2026',
    author: {
      name: 'Clara Dupont',
      role: 'Director of Botanical Sourcing',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      bio: 'Ethno-botanist exploring sustainable wild harvesting across Madagascar and the French Alps.'
    },
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Zero-emission artisanal screw press operating in oxygen-free nitrogen atmosphere in Provence.',
    excerpt: 'Traditional chemical solvent extraction destroys heat-sensitive plant enzymes. Here is how our zero-waste mills in Provence preserve raw botanical life forces.',
    tags: ['Cold-Pressed', 'Zero-Waste', 'Extraction Science', 'Sustainability', 'Provence'],
    featured: false,
    trending: false,
    views: 5930,
    claps: 168,
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
          body: 'Volatile botanical antioxidants such as Tocopherols and Ferulic fractions break down rapidly under thermal stress. Our cold mills utilize slow mechanical screw presses operating in inert nitrogen blankets to eliminate oxidation.',
          highlight: 'Cold-pressed oils retain their natural deep emerald, gold, and ruby hues, indicating rich living chlorophyll and carotenoid complexes.'
        }
      ],
      clinicalSummary: 'Spectrophotometric analysis confirms cold-pressed Marula and Rosehip fractions retain 412% higher active polyphenol content than hot-solvent refined equivalents.',
      recommendedProducts: [
        {
          id: 2,
          name: 'Bakuchiol Cellular Defense Elixir',
          price: '$46.00',
          rating: 5.0,
          reviewsCount: 94,
          img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=400&q=80',
          link: '/products/bio-active-barrier-repair-cream',
          tagline: 'Infused with cold-pressed virgin organic botanicals'
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
    listenTime: '3 min audio',
    publishDate: 'July 14, 2026',
    author: {
      name: 'Dr. Adrian Vance',
      role: 'Lead Formulation Biochemist',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&h=200&q=80',
      bio: 'Senior cosmetic chemist specializing in micro-emulsion thermodynamic stability and lipid bilayer repair mechanisms.'
    },
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Micro-climate variations and their direct impact on skin surface sebum viscosity.',
    excerpt: 'Step-by-step guidance on adjusting your morning and evening lipid ratios when moving between monsoon humidity, dry air-conditioning, and winter winds.',
    tags: ['Seasonal Skincare', 'Humidity', 'Layering Guide', 'Regimen Adjustment', 'Climate Care'],
    featured: false,
    trending: false,
    views: 6410,
    claps: 182,
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
          rating: 4.8,
          reviewsCount: 119,
          img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
          link: '/products/gentle-clarifying-foaming-wash',
          tagline: 'Adaptive botanical moisture buffer for shifting climates'
        }
      ]
    }
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug || post.id === slug);
}

export function getFeaturedBlogPost(): BlogPost {
  return BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0];
}

export function getRelatedBlogPosts(currentId: string, category: string, limit = 3): BlogPost[] {
  const sameCategory = BLOG_POSTS.filter(p => p.id !== currentId && p.category === category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const otherPosts = BLOG_POSTS.filter(p => p.id !== currentId && p.category !== category);
  return [...sameCategory, ...otherPosts].slice(0, limit);
}
