import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  CreditCard, 
  Truck, 
  FileText, 
  Send,
  PackageCheck,
  Gift,
  Sparkles,
  RefreshCw,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Camera
} from 'lucide-react';
import { SupportHero } from './components/SupportHero';

export default function ReturnPolicyPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resolution, setResolution] = useState<'wallet' | 'refund' | 'exchange'>('wallet');
  const [returnReason, setReturnReason] = useState('damaged');
  const [pickupSlot, setPickupSlot] = useState('morning');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setTicketNumber(`MK-RET-${Math.floor(10000 + Math.random() * 90000)}`);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-neutral-800 pb-20">
      {/* Redesigned Luxury Hero Banner */}
      <SupportHero
        badge="Botanical Satisfaction Promise"
        title="Return & Refund Policy"
        subtitle="Experience complete peace of mind with our 7-day hassle-free doorstep return, exchange, and direct refund guarantee."
        breadcrumbCurrent="Return & Refund"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 relative z-20 space-y-12">
        
        {/* 4 Pillars Stats Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border border-[#184433]/10 shadow-xs flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#184433]/5 text-[#184433] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-[#6F8C51]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Duration</span>
              <h4 className="font-sans text-base font-bold text-[#184433] mt-0.5">7-Day Return Window</h4>
              <p className="text-neutral-500 text-xs font-light mt-0.5">From delivery date</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#184433]/10 shadow-xs flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#184433]/5 text-[#184433] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-[#6F8C51]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Logistics</span>
              <h4 className="font-sans text-base font-bold text-[#184433] mt-0.5">Free Doorstep Pickup</h4>
              <p className="text-neutral-500 text-xs font-light mt-0.5">Zero pickup charges</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#184433]/10 shadow-xs flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#184433]/5 text-[#184433] flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6 text-[#6F8C51]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Source Transfer</span>
              <h4 className="font-sans text-base font-bold text-[#184433] mt-0.5">100% Direct Refund</h4>
              <p className="text-neutral-500 text-xs font-light mt-0.5">UPI, Cards, Net Banking</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#184433]/10 shadow-xs flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#184433]/5 text-[#184433] flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6 text-[#6F8C51]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Store Credit</span>
              <h4 className="font-sans text-base font-bold text-[#184433] mt-0.5">+5% Extra Bonus</h4>
              <p className="text-neutral-500 text-xs font-light mt-0.5">Instant Wallet Credit</p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Return Process Workflow */}
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-[#184433]/10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6F8C51]">
              Seamless Workflow
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#184433] mt-1">
              How the Doorstep Return Works
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-light mt-2">
              We handle every step with utmost care so you can experience clean botanicals risk-free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Initiate Request',
                desc: 'Fill out our self-service form below or send a quick WhatsApp note with your Order ID.',
                icon: FileText,
              },
              {
                step: '02',
                title: 'Doorstep Pickup',
                desc: 'A verified courier executive arrives at your address within 24-48 hours to collect the parcel.',
                icon: Truck,
              },
              {
                step: '03',
                title: 'Botanical Lab Check',
                desc: 'Once received at our hub, our quality team inspects and approves the item within 24 hours.',
                icon: PackageCheck,
              },
              {
                step: '04',
                title: 'Instant Refund',
                desc: 'Funds are credited directly to your bank account / UPI or credited to your Morkins wallet.',
                icon: RotateCcw,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-[#FAF9F5] rounded-xl p-6 sm:p-7 border border-[#184433]/5 text-center flex flex-col items-center hover:border-[#184433]/20 transition-all">
                  <span className="text-[11px] font-bold font-serif text-[#184433] bg-[#184433]/10 px-3.5 py-1 rounded-full mb-4">
                    STEP {item.step}
                  </span>
                  <div className="w-14 h-14 rounded-xl bg-[#184433] text-[#AFD971] flex items-center justify-center mb-4 shadow-md shadow-[#184433]/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans text-base font-bold text-[#184433] mb-2">{item.title}</h4>
                  <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Return Eligibility Comparison: Eligible vs Non-Eligible */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Eligible Items Card */}
          <div className="bg-[#184433]/5 border border-[#184433]/20 rounded-xl p-8 sm:p-10 shadow-xs">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#184433] text-white flex items-center justify-center shrink-0 shadow-md">
                <CheckCircle2 className="w-6 h-6 text-[#AFD971]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-normal text-[#184433]">Items Eligible for Return</h3>
                <p className="text-neutral-600 text-xs font-light">100% full refund or free replacement</p>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                'Product arrived broken, cracked, or leaking during transit.',
                'Incorrect product variant, size, or formulation received.',
                'Skin adverse reaction (accompanied by simple photo verification).',
                'Unopened product returned in original box within 7 calendar days.',
                'Products with missing droppers, dispenser pumps, or seal defects.',
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-800 font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#184433] shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Non-Eligible Items Card */}
          <div className="bg-white border border-neutral-200 rounded-xl p-8 sm:p-10 shadow-xs">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-normal text-neutral-900">Non-Eligible Conditions</h3>
                <p className="text-neutral-500 text-xs font-light">Hygiene and biological safety exceptions</p>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                'Return requests submitted after 7 calendar days from delivery.',
                'Bottles that have been depleted by more than 25% volume.',
                'Complimentary sample vials, gifts with purchase, and vault clearance.',
                'Items damaged due to direct sunlight exposure or extreme heat negligence.',
                'Products missing barcode tags or modified batch tracking codes.',
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-600 font-light">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Refund Processing Matrix Table */}
        <div className="bg-white rounded-xl p-8 sm:p-10 border border-[#184433]/10 shadow-xs">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6F8C51]">
              Financial Transparency
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#184433] mt-1">
              Refund Processing Timelines
            </h3>
            <p className="text-neutral-600 text-sm font-light mt-1">
              Once inspection is approved at our hub, payments are returned via your original route:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#184433]/10 bg-[#f9faf7]">
                  <th className="py-4 px-5 font-bold text-[#184433]">Original Payment Mode</th>
                  <th className="py-4 px-5 font-bold text-[#184433]">Refund Method</th>
                  <th className="py-4 px-5 font-bold text-[#184433]">Credit Timeline</th>
                  <th className="py-4 px-5 font-bold text-[#184433]">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700 font-light">
                <tr>
                  <td className="py-4 px-5 font-medium text-neutral-900">UPI (GPay / PhonePe / Paytm / BHIM)</td>
                  <td className="py-4 px-5">Instant VPA Transfer</td>
                  <td className="py-4 px-5 text-[#184433] font-bold">24 – 48 Hours</td>
                  <td className="py-4 px-5 text-[#6F8C51] font-semibold">₹0 (Free)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-neutral-900">Credit / Debit Cards (Visa, Mastercard, RuPay)</td>
                  <td className="py-4 px-5">Direct reversal to Bank Card</td>
                  <td className="py-4 px-5 text-[#184433] font-bold">3 – 5 Business Days</td>
                  <td className="py-4 px-5 text-[#6F8C51] font-semibold">₹0 (Free)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-neutral-900">Net Banking (All Indian Banks)</td>
                  <td className="py-4 px-5">NEFT / RTGS Bank Transfer</td>
                  <td className="py-4 px-5 text-[#184433] font-bold">3 – 5 Business Days</td>
                  <td className="py-4 px-5 text-[#6F8C51] font-semibold">₹0 (Free)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-neutral-900">Cash on Delivery (COD)</td>
                  <td className="py-4 px-5">Bank Transfer via UPI or NEFT</td>
                  <td className="py-4 px-5 text-[#184433] font-bold">2 – 3 Business Days</td>
                  <td className="py-4 px-5 text-[#6F8C51] font-semibold">₹0 (Free)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-neutral-900">Morkins Sanctuary Wallet Credit</td>
                  <td className="py-4 px-5">Digital Store Credit (+5% Extra Bonus)</td>
                  <td className="py-4 px-5 text-[#184433] font-bold">Instant (Within 10 Mins)</td>
                  <td className="py-4 px-5 text-[#6F8C51] font-semibold">₹0 (Free)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Return Request Portal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Sanctuary Concierge Guarantee Card */}
          <div className="lg:col-span-5 bg-linear-to-br from-[#0B2E1C] via-[#124228] to-[#184433] text-white rounded-xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#AFD971]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#082013]/60 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#AFD971_1px,transparent_1px)] bg-size-[24px_24px] opacity-5 pointer-events-none" />

            <div className="relative z-10 space-y-8">
              {/* Header Badge */}
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#AFD971] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AFD971] animate-pulse" />
                  <span>Self-Service Portal</span>
                </span>
                
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white leading-tight">
                  Doorstep Return & Exchange Sanctuary
                </h2>

                <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
                  Every order is protected by our 7-Day Satisfaction Promise. Schedule a complimentary courier pickup with zero shipping deduction.
                </p>
              </div>

              {/* Guarantee Pillars */}
              <div className="space-y-4 pt-2 border-t border-white/15">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#AFD971] flex items-center justify-center shrink-0 border border-white/15">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Free Doorstep Pickup</h4>
                    <p className="text-xs text-white/70 font-light mt-0.5">
                      Verified BlueDart / Delhivery courier collects right from your doorstep with sealed tamper bags.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#AFD971] flex items-center justify-center shrink-0 border border-white/15">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">+5% Wallet Bonus</h4>
                    <p className="text-xs text-white/70 font-light mt-0.5">
                      Opt for store credit to receive an extra 5% shopping credit added directly to your account immediately.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#AFD971] flex items-center justify-center shrink-0 border border-white/15">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Zero Depreciation</h4>
                    <p className="text-xs text-white/70 font-light mt-0.5">
                      100% money back guarantee with no restocking fees or convenience deductions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Help Button */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/15">
              <Link
                to="/whatsapp-support"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#AFD971] text-[#0B2E1C] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl hover:bg-white transition-all duration-300 shadow-lg shadow-[#AFD971]/20 group"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Need Instant Help? WhatsApp Desk</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Modern Interactive Return Form */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 border border-[#184433]/10 shadow-sm flex flex-col justify-between">
            {submitted ? (
              <div className="bg-[#184433]/5 border border-[#184433]/20 rounded-xl p-8 sm:p-12 text-center animate-fade-in space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#184433] text-[#AFD971] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6F8C51]">
                    Return Request Registered
                  </span>
                  <h3 className="font-serif text-3xl text-[#184433] font-normal mt-1">
                    Pickup Scheduled Successfully
                  </h3>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-[#184433]/10 max-w-md mx-auto space-y-2 text-left text-xs">
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500">Return Reference:</span>
                    <strong className="font-mono text-[#184433] text-sm">{ticketNumber}</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500">Order ID:</span>
                    <strong className="font-mono text-neutral-800">{orderId}</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500">Selected Resolution:</span>
                    <strong className="text-[#184433] capitalize">
                      {resolution === 'wallet' ? 'Store Credit (+5% Bonus)' : resolution === 'refund' ? '100% Direct Bank Refund' : 'Fresh Replacement Bottle'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Pickup Slot:</span>
                    <strong className="text-neutral-800 capitalize">
                      {pickupSlot === 'morning' ? 'Morning (9:00 AM – 1:00 PM)' : 'Afternoon (2:00 PM – 7:00 PM)'}
                    </strong>
                  </div>
                </div>

                <p className="text-neutral-600 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed">
                  A verification confirmation has been dispatched to <span className="underline font-medium text-neutral-900">{email}</span>. A courier executive will contact you at <span className="font-medium text-neutral-900">{phone || 'your registered number'}</span> prior to arrival.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setOrderId('');
                      setEmail('');
                      setPhone('');
                      setAdditionalNotes('');
                      setPhotoFileName('');
                      setTicketNumber('');
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#184433] text-white font-bold text-xs uppercase tracking-widest px-7 py-3.5 rounded-xl hover:bg-[#0F3822] transition-colors cursor-pointer shadow-md"
                  >
                    Register Another Return
                  </button>
                  <Link
                    to="/whatsapp-support"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#184433]/5 text-[#184433] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-[#184433]/10 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Track on WhatsApp</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReturnSubmit} className="space-y-6">
                
                {/* Step 1: Resolution Preference Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-bold text-[#184433] uppercase tracking-wider block">
                      1. Preferred Resolution Option *
                    </label>
                    <span className="text-[11px] text-[#6F8C51] font-medium">Select 1 of 3</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: 'wallet',
                        badge: '★ +5% Extra Bonus',
                        title: 'Wallet Credit',
                        desc: 'Instant store credit + 5% bonus',
                        icon: Sparkles,
                        isBonus: true
                      },
                      {
                        id: 'refund',
                        badge: 'Direct Reversal',
                        title: 'Bank Refund',
                        desc: '100% back to UPI/Card (24-48h)',
                        icon: CreditCard,
                        isBonus: false
                      },
                      {
                        id: 'exchange',
                        badge: 'Zero Delay',
                        title: 'Replacement',
                        desc: 'Fresh bottle dispatched in 24h',
                        icon: RefreshCw,
                        isBonus: false
                      }
                    ].map((opt) => {
                      const isSelected = resolution === opt.id;
                      const Icon = opt.icon;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setResolution(opt.id as any)}
                          className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${
                            isSelected
                              ? 'bg-[#184433] text-white border-[#184433] shadow-md shadow-[#184433]/20 ring-2 ring-[#184433]/20 scale-[1.02]'
                              : 'bg-[#FAF9F5] text-neutral-800 border-[#184433]/10 hover:border-[#184433]/30 hover:bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                isSelected
                                  ? opt.isBonus ? 'bg-[#AFD971] text-[#0B2E1C]' : 'bg-white/20 text-white'
                                  : opt.isBonus ? 'bg-[#AFD971]/30 text-[#184433] font-bold' : 'bg-neutral-200/70 text-neutral-600'
                              }`}>
                                {opt.badge}
                              </span>
                              <Icon className={`w-4 h-4 ${isSelected ? 'text-[#AFD971]' : 'text-[#6F8C51]'}`} />
                            </div>
                            <h4 className="font-sans text-xs sm:text-sm font-bold">{opt.title}</h4>
                            <p className={`text-[11px] font-light mt-1 leading-snug ${isSelected ? 'text-white/80' : 'text-neutral-500'}`}>
                              {opt.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Reason for Return Chips */}
                <div>
                  <label className="text-xs font-bold text-[#184433] uppercase tracking-wider mb-2.5 block">
                    2. Primary Reason for Return *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'damaged', label: '📦 Transit Damage / Leaking' },
                      { id: 'wrong_item', label: '🔄 Incorrect Product / Variant' },
                      { id: 'skin_reaction', label: '🌿 Skin Sensitivity / Reaction' },
                      { id: 'texture', label: '🧪 Texture / Dropper Defect' },
                      { id: 'unopened', label: '✨ Changed Mind (Within 7 Days)' },
                    ].map((r) => {
                      const isSelected = returnReason === r.id;
                      return (
                        <button
                          type="button"
                          key={r.id}
                          onClick={() => setReturnReason(r.id)}
                          className={`p-3 rounded-xl text-xs font-semibold text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#184433] text-[#AFD971] shadow-xs ring-1 ring-[#184433]'
                              : 'bg-[#FAF9F5] text-neutral-700 hover:bg-[#184433]/5 border border-[#184433]/5'
                          }`}
                        >
                          <span>{r.label}</span>
                          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
                            isSelected ? 'bg-[#AFD971] text-[#0B2E1C] font-bold' : 'border border-neutral-300'
                          }`}>
                            {isSelected ? '✓' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Customer & Order Reference Info */}
                <div className="space-y-4 pt-2 border-t border-neutral-100">
                  <label className="text-xs font-bold text-[#184433] uppercase tracking-wider block">
                    3. Order & Contact Details *
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                        Order ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="e.g. MK-98211"
                        className="w-full bg-[#FAF9F5] text-neutral-900 placeholder:text-neutral-400 text-sm px-4 py-3 rounded-xl border border-[#184433]/15 focus:outline-none focus:border-[#184433] focus:bg-white transition-all font-mono shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                        Registered Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full bg-[#FAF9F5] text-neutral-900 placeholder:text-neutral-400 text-sm px-4 py-3 rounded-xl border border-[#184433]/15 focus:outline-none focus:border-[#184433] focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                        Contact Mobile (For Courier OTP)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FAF9F5] text-neutral-900 placeholder:text-neutral-400 text-sm px-4 py-3 rounded-xl border border-[#184433]/15 focus:outline-none focus:border-[#184433] focus:bg-white transition-all shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                        Preferred Pickup Window
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'morning', label: 'Morning (9AM-1PM)' },
                          { id: 'evening', label: 'Afternoon (2PM-7PM)' }
                        ].map((s) => (
                          <button
                            type="button"
                            key={s.id}
                            onClick={() => setPickupSlot(s.id)}
                            className={`px-2.5 py-3 rounded-xl text-[11px] font-semibold transition-all cursor-pointer truncate ${
                              pickupSlot === s.id
                                ? 'bg-[#184433] text-white shadow-xs'
                                : 'bg-[#FAF9F5] text-neutral-700 hover:bg-[#184433]/5 border border-[#184433]/10'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Photo / Batch Notes Optional Section */}
                <div className="space-y-3 pt-2 border-t border-neutral-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#184433] uppercase tracking-wider block">
                      4. Batch Info & Photo Attachment (Optional)
                    </label>
                    <span className="text-[11px] text-neutral-400 font-light">Speeds up approval</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-7">
                      <input
                        type="text"
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        placeholder="Batch code printed on bottom or special notes..."
                        className="w-full bg-[#FAF9F5] text-neutral-900 placeholder:text-neutral-400 text-xs px-4 py-3 rounded-xl border border-[#184433]/15 focus:outline-none focus:border-[#184433] focus:bg-white transition-all shadow-inner"
                      />
                    </div>

                    <div className="sm:col-span-5">
                      <label className="w-full flex items-center justify-center gap-2 bg-[#FAF9F5] hover:bg-[#184433]/5 text-[#184433] text-xs font-semibold px-4 py-3 rounded-xl border border-dashed border-[#184433]/30 cursor-pointer transition-colors truncate">
                        <Camera className="w-4 h-4 text-[#6F8C51] shrink-0" />
                        <span className="truncate">{photoFileName ? photoFileName : 'Attach Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#184433] text-white font-bold text-xs uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-[#0F3822] transition-all duration-300 shadow-lg shadow-[#184433]/20 cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <Send className="w-4 h-4 text-[#AFD971]" />
                  <span>{isSubmitting ? 'Scheduling Doorstep Pickup...' : 'Schedule Complimentary Pickup'}</span>
                </button>

                <p className="text-[11px] text-center text-neutral-500 font-light">
                  🔒 By submitting, you authorize our verified courier partner to coordinate doorstep pickup within 24–48 hours.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
