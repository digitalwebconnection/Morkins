import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ArrowRight,
  ChevronDown,
  Compass
} from 'lucide-react';
import { SupportHero } from './components/SupportHero';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'routine',
    orderId: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const categories = [
    { id: 'routine', label: '🌿 Custom Routine Advice' },
    { id: 'order', label: '📦 Order & Shipment Tracking' },
    { id: 'returns', label: '🔄 7-Day Return / Refund' },
    { id: 'ingredients', label: '✨ Ingredient Bio-Compatibility' },
    { id: 'wholesale', label: '🎁 Corporate & Bulk Gifting' },
  ];

  const quickFaqs = [
    {
      q: 'How fast will a skin specialist reply to my message?',
      a: 'During standard customer service hours (Monday through Saturday, 9:00 AM – 8:00 PM IST), we respond to all digital inquiries and email tickets within 2 business hours. For immediate 1-on-1 assistance, reach out via our WhatsApp Concierge.'
    },
    {
      q: 'Can I visit a Morkins Experience Lounge without an appointment?',
      a: 'Yes! Walk-ins are always welcomed at our Mumbai (Kala Ghoda & BKC), Delhi (Khan Market), and Bengaluru (Indiranagar) lounges for complimentary dermal hydration scanning and cold-pressed botanical sampling.'
    },
    {
      q: 'How do I submit photos for damaged items or allergy verification?',
      a: 'You can attach photos directly when contacting our WhatsApp concierge (+91 98765 43210) or reply directly to your order confirmation email with the image attached.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-neutral-800 pb-24">
      {/* Clean Luxury Hero Banner */}
      <SupportHero
        badge="Direct Customer Care"
        title="Contact Our Sanctuary"
        subtitle="Have a question about bioactive ingredients, personalized regimens, or order deliveries? Our certified skin advisors are here to assist you."
        breadcrumbCurrent="Contact Us"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 relative z-20 space-y-16">
        
        {/* Main Split Section: Left Sanctuary Touchpoints & Right Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Luxury Botanical Touchpoints Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B2E1C] via-[#124228] to-[#184433] text-white rounded-xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Glows & Watermark */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#AFD971]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#082013]/60 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#AFD971_1px,transparent_1px)] bg-size-[24px_24px] opacity-5 pointer-events-none" />

            <div className="relative z-10 space-y-8">
              {/* Header Badge */}
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#AFD971] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AFD971] animate-pulse" />
                  <span>Sanctuary Concierge</span>
                </span>
                
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white leading-tight">
                  Always Here to Restore Your Glow
                </h2>

                <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
                  Connect with our dermal specialists for formulation advice, order assistance, or wholesale inquiries.
                </p>
              </div>

              {/* Direct Touchpoint Channels */}
              <div className="space-y-5 pt-2 border-t border-white/15">
                
                {/* Channel 1: Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#AFD971] flex items-center justify-center shrink-0 border border-white/15 shadow-inner">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 block">Toll-Free Helpline</span>
                    <a href="tel:18006675467" className="text-base font-bold text-white hover:text-[#AFD971] transition-colors font-sans block mt-0.5">
                      +91 1800-667-5467
                    </a>
                    <span className="text-[11px] text-white/70 font-light block mt-0.5">Mon–Sat: 9:00 AM – 8:00 PM IST</span>
                  </div>
                </div>

                {/* Channel 2: Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#AFD971] flex items-center justify-center shrink-0 border border-white/15 shadow-inner">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 block">Direct Care Email</span>
                    <a href="mailto:care@morkins.com" className="text-base font-bold text-white hover:text-[#AFD971] transition-colors font-sans block mt-0.5">
                      care@morkins.com
                    </a>
                    <span className="text-[11px] text-[#AFD971] font-medium block mt-0.5">✓ Typical reply within 2 hours</span>
                  </div>
                </div>

                {/* Channel 3: HQ Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#AFD971] flex items-center justify-center shrink-0 border border-white/15 shadow-inner">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 block">Flagship Research Lab</span>
                    <p className="text-sm font-semibold text-white mt-0.5">Morkins Botanical Sanctuary</p>
                    <p className="text-xs text-white/75 font-light leading-snug mt-0.5">
                      Tower B, 7th Floor, BKC, Mumbai, Maharashtra 400051
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Instant WhatsApp Button */}
            <div className="relative z-10 pt-8 mt-8 border-t border-white/15">
              <Link
                to="/whatsapp-support"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#AFD971] text-[#0B2E1C] font-bold text-xs uppercase tracking-wider py-4 rounded-2xl hover:bg-white transition-all duration-300 shadow-lg shadow-[#AFD971]/20 group"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open Instant WhatsApp Chat</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Ultra-Clean Inquiry & Consultation Form */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 border border-[#184433]/10 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6F8C51]">
                  Self-Service Desk
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#184433] mt-1">
                  Send Us a Note
                </h2>
                <p className="text-neutral-600 text-sm font-light mt-1.5">
                  Select your inquiry category below and our senior skincare advisor will get back to you promptly.
                </p>
              </div>

              {submitted ? (
                <div className="bg-[#184433]/5 border border-[#184433]/20 rounded-3xl p-8 sm:p-12 text-center animate-fade-in space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#184433] text-[#AFD971] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#184433] font-normal">Inquiry Received, {formData.name}</h3>
                  <p className="text-neutral-600 text-sm font-light max-w-md mx-auto leading-relaxed">
                    Your request for <strong>{categories.find(c => c.id === formData.category)?.label}</strong> has been logged under Reference <span className="font-mono font-bold text-[#184433]">#MK-{Math.floor(10000 + Math.random() * 90000)}</span>. A dedicated specialist will reach out to <span className="underline font-medium text-neutral-900">{formData.email}</span> within 2 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        category: 'routine',
                        orderId: '',
                        message: '',
                      });
                    }}
                    className="mt-6 inline-flex items-center gap-2 bg-[#184433] text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-[#0F3822] transition-colors cursor-pointer shadow-md"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category Selector Chips */}
                  <div>
                    <label className="block text-xs font-bold text-[#184433] uppercase tracking-wider mb-2.5">
                      1. Select Inquiry Topic *
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {categories.map((c) => {
                        const isSelected = formData.category === c.id;
                        return (
                          <button
                            type="button"
                            key={c.id}
                            onClick={() => setFormData(prev => ({ ...prev, category: c.id }))}
                            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-[#184433] text-[#AFD971] shadow-md shadow-[#184433]/20 ring-2 ring-[#184433]/20 scale-[1.02]'
                                : 'bg-[#FAF9F5] text-neutral-700 hover:bg-[#184433]/10 border border-[#184433]/5'
                            }`}
                          >
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#184433] uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ananya Sharma"
                        className="w-full bg-[#FAF9F5] text-neutral-900 placeholder:text-neutral-400 text-sm px-4 py-3.5 rounded-2xl border border-[#184433]/15 focus:outline-none focus:border-[#184433] focus:bg-white transition-all shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#184433] uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ananya@example.com"
                        className="w-full bg-[#FAF9F5] text-neutral-900 placeholder:text-neutral-400 text-sm px-4 py-3.5 rounded-2xl border border-[#184433]/15 focus:outline-none focus:border-[#184433] focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Phone & Order ID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#184433] uppercase tracking-wider mb-1.5">
                        Mobile Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FAF9F5] text-neutral-900 placeholder:text-neutral-400 text-sm px-4 py-3.5 rounded-2xl border border-[#184433]/15 focus:outline-none focus:border-[#184433] focus:bg-white transition-all shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#184433] uppercase tracking-wider mb-1.5">
                        Order Reference ID (Optional)
                      </label>
                      <input
                        type="text"
                        name="orderId"
                        value={formData.orderId}
                        onChange={handleChange}
                        placeholder="e.g. MK-98211"
                        className="w-full bg-[#FAF9F5] text-neutral-900 placeholder:text-neutral-400 text-sm px-4 py-3.5 rounded-2xl border border-[#184433]/15 focus:outline-none focus:border-[#184433] focus:bg-white transition-all font-mono shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-[#184433] uppercase tracking-wider mb-1.5">
                      Your Message / Skin Concerns *
                    </label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your skin goals, questions on active botanical extracts, or how we can assist you..."
                      className="w-full bg-[#FAF9F5] text-neutral-900 placeholder:text-neutral-400 text-sm px-4 py-3.5 rounded-2xl border border-[#184433]/15 focus:outline-none focus:border-[#184433] focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#184433] text-white font-bold text-xs uppercase tracking-[0.2em] py-4 rounded-2xl hover:bg-[#0F3822] transition-all duration-300 shadow-lg shadow-[#184433]/20 cursor-pointer flex items-center justify-center gap-2.5"
                  >
                    <Send className="w-4 h-4 text-[#AFD971]" />
                    <span>{isSubmitting ? 'Transmitting Note...' : 'Send Message to Sanctuary'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* 3 Physical Experience Lounges Section */}
        <div className="  space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6F8C51]">
                Physical Sanctuaries
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#184433] mt-1">
                Visit Our Experience Lounges
              </h3>
              <p className="text-neutral-600 text-sm font-light mt-1">
                Experience personalized dermal scanning and complimentary botanical harvests at our flagship lounges.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#184433] bg-[#184433]/5 px-4 py-2 rounded-full">
              <Compass className="w-4 h-4 text-[#6F8C51]" />
              <span>Walk-ins Welcome</span>
            </span>
          </div>

          {/* 3 Location Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                city: 'Mumbai Flagship Sanctuary',
                area: 'Kala Ghoda & BKC Mall Level 2',
                address: 'Unit 14, Heritage Arcade, Kala Ghoda, Fort, Mumbai 400001',
                phone: '+91 22-6890-4411',
                time: '10:30 AM – 9:00 PM (Daily)',
                img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'
              },
              {
                city: 'Delhi NCR Botanical Lounge',
                area: 'Khan Market & Ambience Vasant Kunj',
                address: 'Shop 42-B, Middle Lane, Khan Market, New Delhi 110003',
                phone: '+91 11-4560-8822',
                time: '10:30 AM – 9:00 PM (Daily)',
                img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80'
              },
              {
                city: 'Bengaluru Sensory Lounge',
                area: 'Indiranagar 100ft Road & Lavelle Rd',
                address: '742, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
                phone: '+91 80-4920-5577',
                time: '10:30 AM – 9:00 PM (Daily)',
                img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80'
              }
            ].map((lounge, idx) => (
              <div key={idx} className="bg-[#FAF9F5] rounded-xl overflow-hidden border border-[#184433]/5 hover:border-[#184433]/20 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div className="h-44 w-full overflow-hidden relative">
                  <img
                    src={lounge.img}
                    alt={lounge.city}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-white font-serif text-lg font-normal">
                    {lounge.city}
                  </span>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-[#184433] font-bold">{lounge.area}</p>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed">{lounge.address}</p>
                  </div>

                  <div className="pt-3 border-t border-[#184433]/10 text-xs text-neutral-500 space-y-1">
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#6F8C51]" />
                      <span>{lounge.time}</span>
                    </p>
                    <p className="flex items-center gap-1.5 font-medium text-neutral-800">
                      <Phone className="w-3.5 h-3.5 text-[#6F8C51]" />
                      <span>{lounge.phone}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Contact FAQs Accordion Section */}
        <div className=" space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6F8C51]">
                Quick Help
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#184433] mt-1">
                Frequently Asked Contact Questions
              </h3>
            </div>
            <Link
              to="/faqs"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#184433] hover:text-[#0F3822] transition-colors"
            >
              <span>View Full FAQ Sanctuary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {quickFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'bg-[#FAF9F5] border-[#184433]/30' : 'bg-white border-[#184433]/10'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <h4 className="font-sans text-sm sm:text-base font-bold text-[#184433]">
                      {faq.q}
                    </h4>
                    <ChevronDown className={`w-4 h-4 text-[#184433] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed border-t border-[#184433]/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
