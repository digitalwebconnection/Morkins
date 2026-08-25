import { useState, useEffect } from 'react';
import { 
  Lock, 
  Eye, 
  Printer, 
  Mail, 
  Check, 
  GlobeLock
} from 'lucide-react';
import { SupportHero } from './components/SupportHero';

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('collection');
  const [copiedDpo, setCopiedDpo] = useState(false);
  

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('privacy@morkins.com');
    setCopiedDpo(true);
    setTimeout(() => setCopiedDpo(false), 3000);
  };

  const sections = [
    { id: 'collection', label: '1. Information We Collect' },
    { id: 'usage', label: '2. How We Use Your Data' },
    { id: 'cookies', label: '3. Cookies & Tracking' },
    { id: 'security', label: '4. Payment Security & Encryption' },
    { id: 'sharing', label: '5. Third-Party Disclosures' },
    { id: 'rights', label: '6. Your Privacy Rights' },
    { id: 'retention', label: '7. Data Retention & Storage' },
    { id: 'contact', label: '8. Data Protection Officer' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-neutral-800 pb-20">
      {/* Redesigned Luxury Hero Banner */}
      <SupportHero
        badge="Data Protection & Privacy"
        title="Privacy Policy"
        subtitle="Your trust is sacred to us. Learn how Morkins protects, manages, and honors your personal and diagnostic skin information."
        breadcrumbCurrent="Privacy Policy"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 relative z-20 space-y-10">
        
        {/* Trust Badges Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-[#184433]/10 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#184433]/5 text-[#184433] flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-[#6F8C51]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#184433]">256-Bit SSL Encryption</h4>
              <p className="text-neutral-500 text-xs font-light mt-0.5">Bank-grade end-to-end security</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#184433]/10 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#184433]/5 text-[#184433] flex items-center justify-center shrink-0">
              <Eye className="w-6 h-6 text-[#6F8C51]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#184433]">Zero Data Selling</h4>
              <p className="text-neutral-500 text-xs font-light mt-0.5">Your records are never monetized</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#184433]/10 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#184433]/5 text-[#184433] flex items-center justify-center shrink-0">
              <GlobeLock className="w-6 h-6 text-[#6F8C51]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#184433]">DPDP & GDPR Compliant</h4>
              <p className="text-neutral-500 text-xs font-light mt-0.5">Complies with Indian & global norms</p>
            </div>
          </div>
        </div>

        {/* Layout: Sticky Navigation + Editorial Policy Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sticky Sidebar Table of Contents */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#184433]/10 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xs font-bold uppercase tracking-widest text-[#6F8C51]">Table of Contents</span>
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
                <p><strong>Effective Date:</strong> August 1, 2026</p>
                <p><strong>Version:</strong> 3.4 (DPDP Act Ready)</p>
                <p><strong>Legal Entity:</strong> Morkins Organic Wellness Pvt. Ltd.</p>
              </div>
            </div>
          </div>

          {/* Legal Policy Content */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-12 border border-[#184433]/10 shadow-xs space-y-12">
            
            {/* Section 1 */}
            <section id="collection" className="scroll-mt-28 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Chapter 01</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">1. Information We Collect</h2>
              <div className="bg-[#FAF9F5] border-l-4 border-[#184433] p-4 rounded-r-2xl">
                <p className="text-xs font-semibold text-[#184433] uppercase tracking-wider">Executive Summary:</p>
                <p className="text-xs text-neutral-700 font-light mt-0.5">
                  We collect your contact details, order records, and voluntary skin quiz diagnostic responses to formulate and deliver your skincare orders.
                </p>
              </div>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                When you interact with the Morkins sanctuary, we collect information that allows us to fulfill orders, personalize your botanical routines, and maintain superior customer service:
              </p>
              <ul className="list-disc pl-5 text-sm text-neutral-700 font-light space-y-2.5">
                <li><strong>Identity & Contact Details:</strong> Full name, delivery shipping address, billing address, email, and mobile phone number for delivery confirmation.</li>
                <li><strong>Diagnostic Skin Profile:</strong> Skin type (dry, oily, sensitive, dull), primary concerns, and diagnostic answers voluntarily provided during our interactive AI Skin Quiz.</li>
                <li><strong>Transaction Records:</strong> Order IDs, purchased products, payment transaction statuses (processed securely via encrypted gateways). We never store raw debit/credit card CVV or PIN numbers.</li>
                <li><strong>Technical & Device Data:</strong> IP address, browser type, device identifiers, and page interaction timestamps collected via secure telemetry.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section id="usage" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Chapter 02</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">2. How We Use Your Data</h2>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                Your data is processed strictly to deliver an exceptional, biologically customized skincare experience:
              </p>
              <ul className="list-disc pl-5 text-sm text-neutral-700 font-light space-y-2.5">
                <li>Processing, packing in temperature-controlled facilities, and dispatching your orders.</li>
                <li>Generating customized 3-step botanical skincare regimens based on your skin profile.</li>
                <li>Sending transactional order status updates, delivery notifications, and OTPs via SMS/WhatsApp.</li>
                <li>Managing your Botanical Circle Club VIP loyalty points and referral rewards.</li>
                <li>Preventing fraudulent transactions and ensuring overall platform cybersecurity.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="cookies" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Chapter 03</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">3. Cookies & Tracking Technologies</h2>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                We use strictly essential cookies and analytical tokens to maintain your shopping cart sessions, remember preferred language choices (English, Hindi, Gujarati), and diagnose site performance bottlenecks. You can manage or disable cookie preferences directly in your browser settings at any time without losing core browsing capability.
              </p>
            </section>

            {/* Section 4 */}
            <section id="security" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Chapter 04</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">4. Payment Security & Encryption</h2>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                All financial transactions on Morkins are facilitated through PCI-DSS Level 1 certified payment gateways (Razorpay, Cashfree, UPI, Stripe). Communication between your browser and our servers is secured using 256-bit Transport Layer Security (TLS/SSL) encryption. Morkins employees do not have access to your bank passwords or full credit card details.
              </p>
            </section>

            {/* Section 5 */}
            <section id="sharing" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Chapter 05</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">5. Third-Party Disclosures</h2>
              <div className="bg-[#184433]/5 p-5 rounded-2xl border border-[#184433]/15">
                <p className="text-sm font-bold text-[#184433]">Our Ironclad Promise:</p>
                <p className="text-xs text-neutral-700 font-light mt-1">
                  We do NOT sell, rent, or trade your personal data to external data brokers or marketers under any circumstance.
                </p>
              </div>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                We share necessary information only with vetted partners who assist in our business operations:
              </p>
              <ul className="list-disc pl-5 text-sm text-neutral-700 font-light space-y-2.5">
                <li><strong>Logistics Carriers:</strong> BlueDart, Delhivery, ExpressBees, DTDC (only name, phone, and address are provided to courier personnel for delivery).</li>
                <li><strong>Communication Infrastructure:</strong> Transactional SMS & WhatsApp notification providers for shipping alerts.</li>
                <li><strong>Statutory & Legal Obligations:</strong> When strictly mandated by Indian law enforcement or court order.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="rights" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Chapter 06</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">6. Your Privacy Rights</h2>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                Under the Digital Personal Data Protection Act (DPDP) and global regulations, you have full sovereignty over your information:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#184433]/5">
                  <h4 className="font-bold text-xs text-[#184433] uppercase">Right to Access</h4>
                  <p className="text-neutral-600 text-xs mt-1 font-light">Request an export of all personal data held in your account.</p>
                </div>
                <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#184433]/5">
                  <h4 className="font-bold text-xs text-[#184433] uppercase">Right to Erasure</h4>
                  <p className="text-neutral-600 text-xs mt-1 font-light">Request complete deletion of your profile and diagnostic records.</p>
                </div>
                <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#184433]/5">
                  <h4 className="font-bold text-xs text-[#184433] uppercase">Right to Correction</h4>
                  <p className="text-neutral-600 text-xs mt-1 font-light">Instantly correct outdated contact details or shipping addresses.</p>
                </div>
                <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#184433]/5">
                  <h4 className="font-bold text-xs text-[#184433] uppercase">Opt-out of Newsletters</h4>
                  <p className="text-neutral-600 text-xs mt-1 font-light">Unsubscribe from non-essential promotional emails in 1-click.</p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="retention" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Chapter 07</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">7. Data Retention & Storage</h2>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                We retain your account records for as long as your Morkins profile remains active. Transactional invoices are retained for the legally required period under Indian tax laws (GST). Non-active customer diagnostic records are purged after 24 months of account inactivity.
              </p>
            </section>

            {/* Section 8 */}
            <section id="contact" className="scroll-mt-28 space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F8C51]">Chapter 08</span>
              <h2 className="font-serif text-3xl font-normal text-[#184433]">8. Data Protection Officer (DPO)</h2>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                If you wish to exercise any of your statutory rights, submit a data deletion request, or file an inquiry regarding our privacy safeguards, our dedicated Data Privacy Team is at your service:
              </p>

              <div className="bg-[#184433]/5 rounded-3xl p-7 border border-[#184433]/15 mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <h4 className="font-bold text-base text-[#184433]">Grievance & Privacy Redressal Officer</h4>
                  <p className="text-xs text-neutral-600 font-light mt-0.5">Morkins Organic Wellness Lab Pvt. Ltd.</p>
                  <p className="text-xs text-neutral-600 font-light">Email: privacy@morkins.com</p>
                </div>

                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 bg-[#184433] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full hover:bg-[#0F3822] transition-colors cursor-pointer shrink-0 shadow-md shadow-[#184433]/20"
                >
                  {copiedDpo ? <Check className="w-3.5 h-3.5 text-[#AFD971]" /> : <Mail className="w-3.5 h-3.5" />}
                  <span>{copiedDpo ? 'Email Copied!' : 'Copy DPO Email'}</span>
                </button>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}
