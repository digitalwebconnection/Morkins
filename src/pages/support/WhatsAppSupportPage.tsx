import { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ExternalLink
} from 'lucide-react';
import { SupportHero } from './components/SupportHero';

export default function WhatsAppSupportPage() {
  const [selectedTopic, setSelectedTopic] = useState('routine');
  const [customMsg, setCustomMsg] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const WHATSAPP_NUMBER = '919876543210';

  const topics = [
    {
      id: 'routine',
      title: 'Skin Consultation & Regimen Prescription',
      desc: 'Connect with a certified botanical advisor to curate a personalized 3-step lipid restoration routine.',
      defaultText: 'Hello Morkins Sanctuary! I would like a personalized botanical skincare routine recommendation based on my skin profile.',
    },
    {
      id: 'tracking',
      title: 'Order Status & Live Tracking Assistance',
      desc: 'Check live dispatch progress, air cargo updates, or modify delivery gate instructions.',
      defaultText: 'Hi Morkins Support! I need help checking the live status of my recent order.',
    },
    {
      id: 'returns',
      title: 'Return, Refund or Replacement Request',
      desc: 'Schedule a free doorstep courier pickup or notify our lab regarding transit damage.',
      defaultText: 'Hello! I would like to schedule a 7-day doorstep return/replacement for my Morkins order.',
    },
    {
      id: 'ingredients',
      title: 'Ingredient Sensitivity & Allergy Verification',
      desc: 'Verify biocompatibility of extracts before using on reactive or hypersensitive skin.',
      defaultText: 'Hello! I have a question regarding active botanical lipid ingredients in Morkins formulas.',
    },
    {
      id: 'corporate',
      title: 'Corporate Gifting & Wholesale Inquiries',
      desc: 'Bespoke organic gift boxes, wedding favors, and wholesale harvest inquiries.',
      defaultText: 'Hi Morkins Team! I am inquiring about corporate botanical gifting packages and bulk orders.',
    },
  ];

  const currentTopicObj = topics.find(t => t.id === selectedTopic) || topics[0];
  const messageToSend = customMsg.trim() || currentTopicObj.defaultText;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageToSend)}`;

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-neutral-800 pb-20">
      {/* Redesigned Luxury Hero Banner */}
      <SupportHero
        badge="Direct VIP Concierge"
        title="WhatsApp Support"
        subtitle="Experience 1-on-1 personalized skincare assistance with our certified botanical specialists directly inside WhatsApp."
        breadcrumbCurrent="WhatsApp Support"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 relative z-20 space-y-10">
        
        {/* Live Advisor Availability Status Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#184433]/10 shadow-xl shadow-[#184433]/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <div className="w-16 h-16 rounded-3xl bg-[#184433] text-[#AFD971] flex items-center justify-center shadow-lg shadow-[#184433]/25">
                <MessageCircle className="w-8 h-8" />
              </div>
              {/* Online Pulse Status Ping */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#184433]">
                  4 Senior Advisors Active Online
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#184433] font-normal">
                Dedicated WhatsApp Concierge
              </h3>
              <p className="text-neutral-500 text-xs sm:text-sm font-light mt-0.5">
                Typical reply speed: <strong>~2 minutes</strong> • Multilingual in <strong>English, Hindi & Gujarati</strong>
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-[#1EBE5D] transition-all duration-300 shadow-lg shadow-[#25D366]/25 cursor-pointer shrink-0"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Open WhatsApp Chat</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Interactive Topic Selector & Message Launcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Quick Inquiry Topics */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#184433]/10 shadow-xs space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6F8C51]">
                Interactive Topic Selector
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#184433] mt-1">
                Select Your Inquiry Topic
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm font-light mt-1">
                Choose a pre-configured topic below to automatically draft your WhatsApp inquiry.
              </p>
            </div>

            {/* Topic list buttons */}
            <div className="space-y-3">
              {topics.map((t) => {
                const isSelected = selectedTopic === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTopic(t.id);
                      setCustomMsg('');
                    }}
                    className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 cursor-pointer flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'border-[#184433] bg-[#184433]/5 ring-1 ring-[#184433]/20 shadow-xs scale-[1.01]'
                        : 'border-neutral-200/80 hover:border-[#184433]/30 hover:bg-[#FAF9F5]'
                    }`}
                  >
                    <div>
                      <h4 className={`font-sans text-sm font-bold ${isSelected ? 'text-[#184433]' : 'text-neutral-900'}`}>
                        {t.title}
                      </h4>
                      <p className="text-neutral-600 text-xs font-light mt-1 leading-relaxed">
                        {t.desc}
                      </p>
                    </div>
                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                      isSelected ? 'bg-[#184433] text-white' : 'border border-neutral-300'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#AFD971]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom message box */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-[#184433] uppercase tracking-wider mb-2">
                Preview & Customize WhatsApp Message:
              </label>
              <textarea
                rows={3}
                value={customMsg || currentTopicObj.defaultText}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full bg-[#f9faf7] text-neutral-900 text-sm px-4 py-3.5 rounded-2xl border border-[#184433]/15 focus:outline-none focus:border-[#184433] transition-all font-sans shadow-inner"
              />
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-[0.18em] py-4 rounded-2xl hover:bg-[#1EBE5D] transition-all duration-300 shadow-lg shadow-[#25D366]/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Launch Chat on WhatsApp (+91 98765 43210)</span>
            </a>
          </div>

          {/* Right Column: QR Code Scan & Concierge Perks */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* QR Code Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#184433]/10 shadow-xs text-center space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6F8C51]">Desktop to Mobile</span>
              <h4 className="font-serif text-2xl font-normal text-[#184433]">Scan QR to Chat on Mobile</h4>

              {/* QR Code Frame */}
              <div className="w-48 h-48 mx-auto bg-[#FAF9F5] p-4 rounded-3xl border-2 border-dashed border-[#184433]/20 flex items-center justify-center shadow-inner relative group">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(whatsappUrl)}`}
                  alt="WhatsApp Direct QR Code"
                  className="w-40 h-40 rounded-2xl shadow-xs"
                />
              </div>
              <p className="text-neutral-500 text-xs font-light">
                Point your smartphone camera to open instant WhatsApp chat without saving contacts.
              </p>
            </div>

            {/* Concierge Perks Card */}
            <div className="bg-gradient-to-br from-[#184433] via-[#0F3822] to-black text-white rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl space-y-4">
              <h4 className="font-serif text-2xl font-normal text-white">Why WhatsApp with Morkins?</h4>

              <ul className="space-y-3.5 text-xs text-white/85 font-light">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#AFD971] shrink-0 mt-0.5" />
                  <span>Direct consultation with human certified skin specialists, never automated chatbots.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#AFD971] shrink-0 mt-0.5" />
                  <span>Instant photo sharing for damaged parcel replacements or skin routine consultations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#AFD971] shrink-0 mt-0.5" />
                  <span>VIP priority order tracking updates and address modification support.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
