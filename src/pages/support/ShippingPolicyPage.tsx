import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  ThermometerSnowflake
} from 'lucide-react';
import { SupportHero } from './components/SupportHero';

export default function ShippingPolicyPage() {
  const [pincode, setPincode] = useState('');
  const [estimateResult, setEstimateResult] = useState<{
    city: string;
    days: string;
    expressAvailable: boolean;
    codAvailable: boolean;
  } | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length < 6) return;

    const code = pincode.trim();
    if (code.startsWith('400') || code.startsWith('110') || code.startsWith('560') || code.startsWith('500') || code.startsWith('600') || code.startsWith('700') || code.startsWith('380')) {
      setEstimateResult({
        city: 'Tier 1 Metro Hub',
        days: '2 – 3 Business Days (Air Express)',
        expressAvailable: true,
        codAvailable: true,
      });
    } else if (code.startsWith('3') || code.startsWith('4') || code.startsWith('2') || code.startsWith('5')) {
      setEstimateResult({
        city: 'Tier 2 / Tier 3 City',
        days: '3 – 4 Business Days',
        expressAvailable: true,
        codAvailable: true,
      });
    } else {
      setEstimateResult({
        city: 'Regional / Special Postal Hub',
        days: '5 – 7 Business Days',
        expressAvailable: false,
        codAvailable: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-neutral-800 pb-20">
      {/* Redesigned Luxury Hero Banner */}
      <SupportHero
        badge="All-India Free Express Logistics"
        title="Shipping & Delivery Policy"
        subtitle="Every Morkins botanical creation is freshly packaged in temperature-protected eco-cartons and delivered swiftly to your doorstep."
        breadcrumbCurrent="Shipping Policy"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 relative z-20 space-y-12">
        
        {/* Value Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-[#184433]/10 shadow-xs flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#184433]/5 text-[#184433] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-[#6F8C51]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Zero Charges</span>
              <h4 className="font-sans text-base font-bold text-[#184433] mt-0.5">100% Free Shipping</h4>
              <p className="text-neutral-500 text-xs font-light mt-0.5">Across all 19,000+ PINs</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#184433]/10 shadow-xs flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#184433]/5 text-[#184433] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-[#6F8C51]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Same-Day</span>
              <h4 className="font-sans text-base font-bold text-[#184433] mt-0.5">Dispatched by 2 PM</h4>
              <p className="text-neutral-500 text-xs font-light mt-0.5">Leaves cold hub same day</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#184433]/10 shadow-xs flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#184433]/5 text-[#184433] flex items-center justify-center shrink-0">
              <ThermometerSnowflake className="w-6 h-6 text-[#6F8C51]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Cold Chain</span>
              <h4 className="font-sans text-base font-bold text-[#184433] mt-0.5">Thermal Insulation</h4>
              <p className="text-neutral-500 text-xs font-light mt-0.5">Preserves raw plant lipids</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#184433]/10 shadow-xs flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#184433]/5 text-[#184433] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#6F8C51]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">100% Insured</span>
              <h4 className="font-sans text-base font-bold text-[#184433] mt-0.5">Transit Guarantee</h4>
              <p className="text-neutral-500 text-xs font-light mt-0.5">Complete damage cover</p>
            </div>
          </div>
        </div>

        {/* PIN Code Delivery Estimator Widget */}
        <div className="bg-linear-to-br from-[#184433] via-[#0F3822] to-black text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#AFD971] bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
              Live Transit Radar
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mt-3">
              Check Expected Delivery for Your PIN Code
            </h2>
            <p className="text-white/80 text-sm font-light mt-2 max-w-xl mx-auto">
              Enter your 6-digit postal code to check express air transit time and Cash on Delivery availability.
            </p>

            <form onSubmit={handlePincodeCheck} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <MapPin className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit PIN (e.g. 400001)"
                  className="w-full bg-white/10 text-white placeholder:text-white/40 text-sm pl-12 pr-4 py-4 rounded-2xl border border-white/20 focus:outline-none focus:border-[#AFD971] transition-all font-mono"
                />
              </div>
              <button
                type="submit"
                className="bg-[#AFD971] text-[#0F3822] font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-2xl hover:bg-white transition-colors cursor-pointer shrink-0 shadow-lg shadow-[#AFD971]/20"
              >
                Check Speed
              </button>
            </form>

            {estimateResult && (
              <div className="mt-8 bg-white/10 border border-[#AFD971]/30 rounded-3xl p-6 sm:p-7 text-left backdrop-blur-md animate-fade-in max-w-lg mx-auto space-y-3">
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <span className="text-xs text-white/80 font-medium">{estimateResult.city} (PIN {pincode})</span>
                  <span className="text-xs font-bold text-[#AFD971] bg-[#AFD971]/20 px-3 py-0.5 rounded-full border border-[#AFD971]/30">
                    ✓ Verified Deliverable
                  </span>
                </div>
                <div className="space-y-2.5 text-sm text-white/90">
                  <p className="flex items-center justify-between">
                    <span className="text-white/70">Estimated Delivery:</span>
                    <strong className="text-white font-bold">{estimateResult.days}</strong>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-white/70">Complimentary Shipping:</span>
                    <span className="text-[#AFD971] font-semibold">✓ ₹0 (Free)</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-white/70">Cash on Delivery (COD):</span>
                    <span className="text-[#AFD971] font-semibold">✓ Available</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pan-India Delivery Matrix Table */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#184433]/10 shadow-xs space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6F8C51]">
              Logistics Network
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#184433] mt-1">
              Pan-India Express Transit Matrix
            </h3>
            <p className="text-neutral-600 text-sm font-light mt-1">
              All shipments are handled by India's top Tier-1 express air carriers with real-time GPS tracking:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#184433]/10 bg-[#f9faf7]">
                  <th className="py-4 px-5 font-bold text-[#184433]">Delivery Zone</th>
                  <th className="py-4 px-5 font-bold text-[#184433]">Key Cities Included</th>
                  <th className="py-4 px-5 font-bold text-[#184433]">Expected Air Transit</th>
                  <th className="py-4 px-5 font-bold text-[#184433]">Delivery Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700 font-light">
                <tr>
                  <td className="py-4 px-5 font-medium text-neutral-900">Metro Cities (Tier 1)</td>
                  <td className="py-4 px-5">Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad, Pune</td>
                  <td className="py-4 px-5 text-[#184433] font-bold">2 – 3 Business Days</td>
                  <td className="py-4 px-5 text-[#6F8C51] font-bold">FREE (₹0)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-neutral-900">Tier 2 & Capital Cities</td>
                  <td className="py-4 px-5">Jaipur, Chandigarh, Lucknow, Kochi, Indore, Surat, Nagpur, Bhopal, Patna</td>
                  <td className="py-4 px-5 text-[#184433] font-bold">3 – 4 Business Days</td>
                  <td className="py-4 px-5 text-[#6F8C51] font-bold">FREE (₹0)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-neutral-900">Tier 3 & Regional Towns</td>
                  <td className="py-4 px-5">All other registered district headquarters and postal hubs</td>
                  <td className="py-4 px-5 text-[#184433] font-bold">4 – 5 Business Days</td>
                  <td className="py-4 px-5 text-[#6F8C51] font-bold">FREE (₹0)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-neutral-900">North-East & Island Zones</td>
                  <td className="py-4 px-5">Assam, Meghalaya, Sikkim, Jammu & Kashmir, Andaman & Nicobar</td>
                  <td className="py-4 px-5 text-[#184433] font-bold">5 – 7 Business Days</td>
                  <td className="py-4 px-5 text-[#6F8C51] font-bold">FREE (₹0)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Courier & Eco-Packaging Protocols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#184433]/10 shadow-xs space-y-4">
            <h4 className="font-serif text-2xl text-[#184433] font-normal">Our Express Courier Partners</h4>
            <p className="text-neutral-600 text-sm font-light leading-relaxed">
              We partner exclusively with verified logistics leaders equipped with tamper-proof security tracking:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {['BlueDart Express', 'Delhivery Air', 'ExpressBees', 'DTDC Prime'].map((partner, i) => (
                <div key={i} className="bg-[#FAF9F5] rounded-2xl p-3.5 text-center border border-[#184433]/5">
                  <span className="text-xs font-bold text-[#184433]">{partner}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-500 font-light pt-2">
              You will receive live tracking numbers via SMS, Email, and WhatsApp as soon as the courier scans your barcode.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#184433]/10 shadow-xs space-y-4">
            <h4 className="font-serif text-2xl text-[#184433] font-normal">100% Sustainable Bio-Cushioning</h4>
            <p className="text-neutral-600 text-sm font-light leading-relaxed">
              In keeping with our planetary mission, Morkins does not use plastic bubble wraps or polystyrene foam. Every glass serum bottle is cushioned in recycled honeycomb paper and sealed with natural water-activated kraft tape.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-[#184433] font-bold">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#6F8C51]" /> 100% Recyclable</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#6F8C51]" /> Plastic Neutral</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#6F8C51]" /> Cold Protected</span>
            </div>
          </div>
        </div>

        {/* Quick Track Order CTA */}
        <div className="bg-linear-to-br from-[#184433] to-[#0F3822] text-white rounded-3xl p-8 sm:p-10 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#AFD971]">Live Radar</span>
            <h4 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">Have an order currently in transit?</h4>
            <p className="text-white/80 text-sm font-light mt-1">
              Check real-time milestone logs, carrier details, and estimated delivery dates on our dedicated tracker.
            </p>
          </div>
          <Link
            to="/track-order"
            className="inline-flex items-center gap-2 bg-[#AFD971] text-[#0F3822] font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white transition-colors cursor-pointer shrink-0 shadow-lg shadow-[#AFD971]/20"
          >
            <span>Track My Order Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
