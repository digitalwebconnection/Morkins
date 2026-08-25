import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  HelpCircle, 
  Package, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  UserCheck, 
  MessageCircle, 
  Mail, 
  ArrowRight
} from 'lucide-react';
import { SupportHero } from './components/SupportHero';

interface FAQItem {
  id: string;
  category: 'orders' | 'products' | 'returns' | 'skin' | 'account' | 'safety';
  question: string;
  answer: string;
  popular?: boolean;
}

const FAQ_DATA: FAQItem[] = [
  // Orders & Shipping
  {
    id: 'ord-1',
    category: 'orders',
    question: 'How long does standard delivery take across India?',
    answer: 'Orders within major metro cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad) typically arrive within 2 to 3 business days. Deliveries to Tier 2 and Tier 3 cities take 3 to 5 business days, while special remote locations may take up to 7 business days. You will receive a live GPS tracking link via SMS, email & WhatsApp as soon as your parcel is dispatched from our cold-storage facility.',
    popular: true
  },
  {
    id: 'ord-2',
    category: 'orders',
    question: 'Do you charge for delivery or express shipping?',
    answer: 'We offer complimentary 100% free standard express shipping on all prepaid and Cash on Delivery (COD) orders across India with zero minimum spend requirement. Every parcel is safely packed in recyclable, temperature-protected botanical honeycomb cartons.',
    popular: true
  },
  {
    id: 'ord-3',
    category: 'orders',
    question: 'Can I modify my delivery address after placing an order?',
    answer: 'Yes, if your order has not yet been processed or dispatched (usually within 2 hours of placement), you can update your shipping address by reaching out to our WhatsApp Concierge or emailing care@morkins.com with your Order Reference ID.',
  },
  {
    id: 'ord-4',
    category: 'orders',
    question: 'Is Cash on Delivery (COD) available in my area?',
    answer: 'Yes, Cash on Delivery is available across 19,000+ PIN codes in India. A one-time verification SMS may be sent to your phone upon dispatch to ensure seamless delivery confirmation.',
  },

  // Products & Botanicals
  {
    id: 'prod-1',
    category: 'products',
    question: 'Are Morkins formulations 100% organic and bio-compatible?',
    answer: 'Yes. Every Morkins formulation is crafted using ethically harvested, wildcrafted botanical lipids and cold-pressed bio-actives. We strictly eliminate synthetic fillers, parabens, sulfates, phthalates, and artificial fragrances. Every ingredient is selected for biological compatibility with human skin lipids.',
    popular: true
  },
  {
    id: 'prod-2',
    category: 'products',
    question: 'How do I determine the right routine for my skin concerns?',
    answer: 'We recommend taking our 60-second interactive AI Skin Diagnosis Quiz on our website. It analyzes your dermal lipid profile, concerns (acne, dehydration, barrier repair, hyperpigmentation), and generates a customized morning and evening 3-step botanical regimen.',
    popular: true
  },
  {
    id: 'prod-3',
    category: 'products',
    question: 'What is the shelf life of Morkins skincare and haircare?',
    answer: 'Because our botanical extracts are cold-pressed and preserved with natural Vitamin E (Tocopherol) and bio-ferments, all unopened products have a shelf life of 24 months from manufacturing. Once opened, we recommend utilizing the formula within 6 to 9 months for peak active potency.',
  },
  {
    id: 'prod-4',
    category: 'products',
    question: 'Can I use your serums if I have sensitive or reactive skin?',
    answer: 'Absolutely. All Morkins products undergo comprehensive dermatological patch testing for reactive and hypersensitive skin. Our Centella Calming Gel Cream and Squalane Radiance Glow Serum are specially formulated to soothe redness and restore fragile barrier lipids.',
  },

  // Returns & Refunds
  {
    id: 'ret-1',
    category: 'returns',
    question: 'What is your 7-Day Botanical Satisfaction Promise?',
    answer: 'We want you to feel complete confidence in your skincare journey. If a formulation does not agree with your skin or arrives damaged, you may request a hassle-free return or replacement within 7 calendar days of delivery. Our courier team will arrange doorstep pickup at zero charge.',
    popular: true
  },
  {
    id: 'ret-2',
    category: 'returns',
    question: 'How soon will my refund be credited?',
    answer: 'Once your returned package reaches our fulfillment hub and passes verification (usually within 24-48 hours of receipt), refunds are processed instantly back to your original payment method (UPI / Card: 3-5 business days; Store Credit: Instant).',
    popular: true
  },
  {
    id: 'ret-3',
    category: 'returns',
    question: 'What if my bottle arrives damaged or leaking in transit?',
    answer: 'Please take a photo of the parcel and share it with us on WhatsApp (+91 98765 43210) or email care@morkins.com within 48 hours of delivery. We will immediately dispatch a fresh replacement bottle at zero cost without waiting for the damaged unit to return.',
  },

  // Skin Quiz & Regimens
  {
    id: 'skin-1',
    category: 'skin',
    question: 'Can I layer multiple Morkins serums together?',
    answer: 'Yes! Follow the rule of molecular density: apply lightest, water-based serums first (Hyaluronic Acid Hydrating Serum, Niacinamide Pore Refiner), followed by active emulsion serums (Bakuchiol Wrinkle Defense), and finish with lipid-rich barrier creams or oils (Squalane Facial Oil) to seal in moisture.',
  },
  {
    id: 'skin-2',
    category: 'skin',
    question: 'Do active botanical ingredients cause skin purging?',
    answer: 'Active resurfacing formulations with AHA/BHA or cellular turnover boosters (like Bakuchiol) may gently accelerate cellular renewal for the first 1-2 weeks. This is a natural clearing process as micro-congestion clears.',
  },

  // Account & Loyalty Rewards
  {
    id: 'acc-1',
    category: 'account',
    question: 'What is the Botanical Circle Club VIP Program?',
    answer: 'Every customer automatically earns 10 loyalty points for every ₹80 / $1 spent. Members enjoy lifetime complimentary greenhouse express shipping, priority access to quarterly limited harvests, and surprise birthday rewards.',
  },
  {
    id: 'acc-2',
    category: 'account',
    question: 'How do I refer a friend to get reward credits?',
    answer: 'Visit your User Profile sanctuary and navigate to the "Refer a Friend" tab. Copy your unique invite link. Your friend receives ₹1,200 / $15 off their first botanical routine, and you automatically receive a matching ₹1,200 / $15 credit in your dashboard once they order.',
  },

  // Safety & Clinical Standards
  {
    id: 'saf-1',
    category: 'safety',
    question: 'Are Morkins products 100% cruelty-free and vegan?',
    answer: '100% cruelty-free and Leaping Bunny compliant. We never test on animals, nor do we source ingredients from suppliers who conduct animal testing. All our formulas are strictly 100% vegan.',
    popular: true
  },
  {
    id: 'saf-2',
    category: 'safety',
    question: 'Are your products safe during pregnancy and nursing?',
    answer: 'Most of our botanical collection is safe for pregnancy. We use Bakuchiol—a gentle, plant-derived botanical alternative to Retinol that is clinically proven and pregnancy-safe. However, for active acid peels, we always suggest consulting your physician.',
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: HelpCircle, count: FAQ_DATA.length },
  { id: 'orders', label: 'Orders & Shipping', icon: Package, count: FAQ_DATA.filter(f => f.category === 'orders').length },
  { id: 'products', label: 'Products & Botanicals', icon: Sparkles, count: FAQ_DATA.filter(f => f.category === 'products').length },
  { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw, count: FAQ_DATA.filter(f => f.category === 'returns').length },
  { id: 'skin', label: 'Skin Regimens', icon: UserCheck, count: FAQ_DATA.filter(f => f.category === 'skin').length },
  { id: 'safety', label: 'Safety & Clinical', icon: ShieldCheck, count: FAQ_DATA.filter(f => f.category === 'safety').length },
];

const SUGGESTED_SEARCHES = [
  'Delivery timeline',
  'Damaged item',
  'Return pickup',
  'Sensitive skin',
  'Cash on Delivery',
  'Pregnancy safe',
  'Bakuchiol'
];

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'ord-1': true,
    'prod-1': true,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFAQs = FAQ_DATA.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-neutral-800 pb-20">
      {/* Redesigned Luxury Hero Banner */}
      <SupportHero
        badge="Botanical Knowledge Sanctuary"
        title="Frequently Asked Questions"
        subtitle="Explore instant, verified answers regarding orders, cold-pressed botanical extractions, transit timelines, and our 7-day guarantee."
        breadcrumbCurrent="FAQs"
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 relative z-20 space-y-12">
        
        {/* Floating Search & Suggested Keyword Pills */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#184433]/5 border border-[#184433]/10 max-w-4xl mx-auto backdrop-blur-md">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-[#184433]/60 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. shipping time, refund, sensitive skin, ingredients)..."
              className="w-full bg-[#f9faf7] text-neutral-900 placeholder:text-neutral-400 text-sm sm:text-base pl-12 pr-20 py-4 rounded-2xl border border-[#184433]/15 focus:outline-none focus:border-[#184433] focus:bg-white transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-semibold text-neutral-400 hover:text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Suggested Search Pills */}
          <div className="mt-4 flex items-center gap-2 flex-wrap text-xs text-neutral-500">
            <span className="font-semibold text-[#184433] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#6F8C51]" /> Popular:
            </span>
            {SUGGESTED_SEARCHES.map((query) => (
              <button
                key={query}
                onClick={() => setSearchQuery(query)}
                className="px-3 py-1 rounded-full bg-[#f4f5f1] hover:bg-[#184433] hover:text-white text-neutral-700 font-medium transition-all duration-200 cursor-pointer border border-[#184433]/5 text-[11px]"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer group ${
                  isActive
                    ? 'bg-[#184433] text-white border-[#184433] shadow-lg shadow-[#184433]/20 scale-[1.03]'
                    : 'bg-white text-neutral-700 border-[#184433]/10 hover:border-[#184433]/30 hover:bg-[#FAF9F5] shadow-xs'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                  isActive ? 'bg-white/15 text-[#AFD971]' : 'bg-[#184433]/5 text-[#184433] group-hover:bg-[#184433]/10'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-sans text-xs font-bold leading-tight line-clamp-1">{cat.label}</span>
                <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-[#AFD971]' : 'text-neutral-400'}`}>
                  {cat.count} FAQs
                </span>
              </button>
            );
          })}
        </div>

        {/* Dual Layout: FAQ Accordion List + Sanctuary Help Desk Sidecard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main FAQ Accordion Column */}
          <div className="lg:col-span-8 space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => {
                const isOpen = !!openItems[faq.id];
                return (
                  <div
                    key={faq.id}
                    className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                      isOpen 
                        ? 'border-[#184433]/30 ring-1 ring-[#184433]/10 shadow-sm' 
                        : 'border-[#184433]/10 hover:border-[#184433]/25'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-3.5">
                        {faq.popular && (
                          <span className="shrink-0 text-[10px] uppercase font-bold tracking-wider bg-[#AFD971]/20 text-[#184433] px-2.5 py-1 rounded-full mt-0.5 border border-[#AFD971]/40">
                            Popular
                          </span>
                        )}
                        <h3 className="font-sans text-base sm:text-lg font-bold text-[#184433] leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <div
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen ? 'bg-[#184433] text-white rotate-180' : 'bg-[#184433]/5 text-[#184433]'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 sm:px-7 pb-7 pt-1 text-sm sm:text-base text-neutral-700 font-light leading-relaxed border-t border-[#184433]/5 bg-[#fcfcfb] animate-slide-up-fade">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#184433]/10 p-8 shadow-xs">
                <HelpCircle className="w-12 h-12 text-[#6F8C51] mx-auto mb-3 opacity-60" />
                <h3 className="font-serif text-2xl font-normal text-[#184433]">No matching answers found</h3>
                <p className="text-neutral-600 text-sm mt-2 max-w-md mx-auto font-light">
                  We couldn't find any FAQs matching "{searchQuery}". Try searching for terms like "shipping", "returns", or "routine".
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="mt-6 inline-flex items-center gap-2 bg-[#184433] text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-full hover:bg-[#0F3822] transition-colors cursor-pointer shadow-md shadow-[#184433]/20"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Right Side Sanctuary Concierge Card */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* VIP Direct Help Desk Card */}
            <div className="bg-gradient-to-br from-[#184433] via-[#0F3822] to-black rounded-3xl p-7 text-white relative overflow-hidden shadow-xl border border-white/10">
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#AFD971]/15 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#AFD971] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  Concierge Desk
                </span>
                
                <h3 className="font-serif text-2xl font-normal text-white leading-tight">
                  Need Personalized Skin Regimen Guidance?
                </h3>
                
                <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
                  Our certified dermal specialists are online Monday – Saturday to review your skin type and recommend custom botanical formulas.
                </p>

                <div className="pt-2 space-y-2.5">
                  <Link
                    to="/whatsapp-support"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#AFD971] text-[#0F3822] font-bold text-xs uppercase tracking-wider py-3.5 rounded-2xl hover:bg-white hover:text-[#184433] transition-all duration-300 shadow-md shadow-[#AFD971]/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Live Advisor</span>
                  </Link>

                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 bg-white/10 text-white font-medium text-xs uppercase tracking-wider py-3.5 rounded-2xl hover:bg-white/20 transition-all border border-white/15"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Inquiry Note</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Policy Links Pill Box */}
            <div className="bg-white rounded-3xl p-6 border border-[#184433]/10 shadow-xs space-y-3">
              <h4 className="font-serif text-lg text-[#184433] font-normal">Related Policies</h4>
              <ul className="space-y-2 text-xs font-medium text-neutral-700">
                <li>
                  <Link to="/return-refund-policy" className="flex items-center justify-between p-2 rounded-xl hover:bg-[#184433]/5 hover:text-[#184433] transition-colors">
                    <span>7-Day Return & Refund Guarantee</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </Link>
                </li>
                <li>
                  <Link to="/shipping-policy" className="flex items-center justify-between p-2 rounded-xl hover:bg-[#184433]/5 hover:text-[#184433] transition-colors">
                    <span>All-India Free Shipping Timelines</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </Link>
                </li>
                <li>
                  <Link to="/track-order" className="flex items-center justify-between p-2 rounded-xl hover:bg-[#184433]/5 hover:text-[#184433] transition-colors">
                    <span>Live GPS Shipment Tracker</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
