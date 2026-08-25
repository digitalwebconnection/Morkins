import { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Printer
} from 'lucide-react';
import { SupportHero } from './components/SupportHero';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('acceptance');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'acceptance', label: '1. Acceptance of Terms' },
    { id: 'accounts', label: '2. User Accounts & Security' },
    { id: 'products', label: '3. Products & Medical Disclaimer' },
    { id: 'orders', label: '4. Pricing, Orders & COD' },
    { id: 'ip', label: '5. Intellectual Property' },
    { id: 'reviews', label: '6. User Content & Reviews' },
    { id: 'liability', label: '7. Limitation of Liability' },
    { id: 'law', label: '8. Governing Law & Jurisdiction' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-neutral-800 pb-20">
      {/* Redesigned Luxury Hero Banner */}
      <SupportHero
        badge="Legal & Usage Agreement"
        title="Terms & Conditions"
        subtitle="Please review these terms before purchasing or exploring formulations within the Morkins organic skincare sanctuary."
        breadcrumbCurrent="Terms & Conditions"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 relative z-20 space-y-10">
        
        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-[#184433]/10 shadow-xs hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Transparency</span>
            <h4 className="font-serif text-lg text-[#184433] mt-1 font-normal">Plain English Summaries</h4>
            <p className="text-neutral-600 text-xs font-light mt-1">
              Every major clause includes a plain-language summary for rapid scanning and absolute clarity.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#184433]/10 shadow-xs hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Authenticity</span>
            <h4 className="font-serif text-lg text-[#184433] mt-1 font-normal">100% Genuine Promise</h4>
            <p className="text-neutral-600 text-xs font-light mt-1">
              Genuine cold-pressed botanical formulations prepared under licensed pharmaceutical protocols.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#184433]/10 shadow-xs hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Compliance</span>
            <h4 className="font-serif text-lg text-[#184433] mt-1 font-normal">Consumer Protection</h4>
            <p className="text-neutral-600 text-xs font-light mt-1">
              Fully compliant with the Consumer Protection (E-Commerce) Rules, 2020.
            </p>
          </div>
        </div>

        {/* Layout: Sidebar + Terms Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#184433]/10 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xs font-bold uppercase tracking-widest text-[#6F8C51]">Terms Chapters</span>
                <button
                  onClick={handlePrint}
                  className="text-xs font-semibold text-[#184433] flex items-center gap-1.5 hover:underline cursor-pointer bg-[#184433]/5 px-3 py-1 rounded-full"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>

              <nav className="space-y-1">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`block px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                      activeSection === sec.id
                        ? 'bg-[#184433] text-white shadow-md shadow-[#184433]/20 font-bold'
                        : 'text-neutral-600 hover:text-[#184433] hover:bg-[#184433]/5'
                    }`}
                  >
                    {sec.label}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-neutral-100 text-[11px] text-neutral-500 font-light space-y-1">
                <p><strong>Last Revised:</strong> August 2026</p>
                <p><strong>Jurisdiction:</strong> Mumbai / Ahmedabad, India</p>
              </div>
            </div>
          </div>

          {/* Main Terms Document */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-12 border border-[#184433]/10 shadow-xs space-y-12">
            
            {/* Section 1 */}
            <section id="acceptance" className="scroll-mt-28 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Clause 01</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">1. Acceptance of Terms</h2>
              <div className="bg-[#FAF9F5] border-l-4 border-[#184433] p-4 rounded-r-2xl">
                <p className="text-xs font-semibold text-[#184433] uppercase tracking-wider">In Plain English:</p>
                <p className="text-xs text-neutral-700 font-light mt-0.5">
                  By visiting our website or ordering Morkins skincare, you accept these terms. Please review them carefully.
                </p>
              </div>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("Customer", "User") and Morkins Organic Wellness Private Limited ("Morkins", "we", "us"). By accessing our digital sanctuary, taking the AI skin diagnosis quiz, or placing an order, you confirm you are at least 18 years of age and possess full legal capacity to enter into this contract.
              </p>
            </section>

            {/* Section 2 */}
            <section id="accounts" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Clause 02</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">2. User Accounts & Security</h2>
              <div className="bg-[#FAF9F5] border-l-4 border-[#184433] p-4 rounded-r-2xl">
                <p className="text-xs font-semibold text-[#184433] uppercase tracking-wider">In Plain English:</p>
                <p className="text-xs text-neutral-700 font-light mt-0.5">
                  Keep your login details confidential. Ensure your address and contact phone are accurate for timely courier delivery.
                </p>
              </div>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                When you create a profile in our Botanical Circle Sanctuary, you agree to provide truthful, accurate, and current information. You are solely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. Notify us immediately at care@morkins.com if you suspect unauthorized access.
              </p>
            </section>

            {/* Section 3 */}
            <section id="products" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Clause 03</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">3. Products & Medical Disclaimer</h2>
              <div className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-2xl">
                <p className="text-xs font-semibold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Important Cosmetic Notice:</span>
                </p>
                <p className="text-xs text-amber-800 font-light mt-0.5">
                  Morkins products are cosmetic and dermal wellness formulations. They are not intended to diagnose, cure, mitigate, or treat clinical dermatological diseases. Always perform a patch test before routine application.
                </p>
              </div>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                We make every effort to display the true colors, textures, and ingredient specifications of our skincare bottles. However, because our extracts are derived from natural organic botanicals, minor seasonal variations in natural color or aroma may occur across harvest batches without impacting formula potency.
              </p>
            </section>

            {/* Section 4 */}
            <section id="orders" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Clause 04</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">4. Pricing, Orders & Cash on Delivery</h2>
              <div className="bg-[#FAF9F5] border-l-4 border-[#184433] p-4 rounded-r-2xl">
                <p className="text-xs font-semibold text-[#184433] uppercase tracking-wider">In Plain English:</p>
                <p className="text-xs text-neutral-700 font-light mt-0.5">
                  All listed prices include GST. We reserve the right to cancel suspicious orders. COD orders may require SMS or OTP verification.
                </p>
              </div>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                All prices are listed in Indian Rupees (INR) or converted local currencies and include applicable Goods and Services Tax (GST). We reserve the right to decline or cancel any order in the event of pricing errors, stock depletion, or failed fraud risk checks.
              </p>
            </section>

            {/* Section 5 */}
            <section id="ip" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Clause 05</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">5. Intellectual Property & Trademarks</h2>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                All content on this website, including but not limited to text, graphics, logos, product names, formulation designs, images, and software, is the exclusive intellectual property of Morkins Organic Wellness Pvt. Ltd. and protected under Indian and international copyright and trademark laws. Unauthorized reproduction or commercial use is strictly prohibited.
              </p>
            </section>

            {/* Section 6 */}
            <section id="reviews" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Clause 06</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">6. User Content & Product Reviews</h2>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                By submitting customer reviews, photos, video reels, or feedback on Morkins channels, you grant us a non-exclusive, royalty-free, perpetual license to use, display, and publish the content across our website and social channels. We reserve the right to moderate or delete submissions containing abusive language, spam, or false claims.
              </p>
            </section>

            {/* Section 7 */}
            <section id="liability" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Clause 07</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">7. Limitation of Liability</h2>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                To the maximum extent permitted by applicable Indian laws, Morkins and its founders, officers, and employees shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or services. In all circumstances, Morkins' total aggregate liability is limited to the monetary amount paid by you for the specific product in dispute.
              </p>
            </section>

            {/* Section 8 */}
            <section id="law" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Clause 08</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">8. Governing Law & Jurisdiction</h2>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                These Terms shall be governed by and interpreted in accordance with the laws of India. Any legal dispute, arbitration, or proceeding arising under these terms shall be subject to the exclusive jurisdiction of the competent courts in Mumbai / Ahmedabad, India.
              </p>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}
