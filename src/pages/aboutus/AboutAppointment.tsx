import { useEffect, useRef, useState } from 'react';
import { Phone, ClipboardList, MapPin } from 'lucide-react';

const STEPS = [
  {
    icon: <Phone size={20} strokeWidth={1.5} />,
    title: 'Make Appointment',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    icon: <ClipboardList size={20} strokeWidth={1.5} />,
    title: 'Get Schedule',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    icon: <MapPin size={20} strokeWidth={1.5} />,
    title: 'Visit Us',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export default function AboutAppointment() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes apptFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes apptFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .appt-fade-up   { opacity: 0; animation: apptFadeUp 0.7s ease forwards; }
        .appt-fade-in   { opacity: 0; animation: apptFadeIn 0.6s ease forwards; }
        .appt-d1 { animation-delay: 0.1s; }
        .appt-d2 { animation-delay: 0.25s; }
        .appt-d3 { animation-delay: 0.4s; }
        .appt-d4 { animation-delay: 0.55s; }
        .appt-d5 { animation-delay: 0.65s; }
      `}</style>

      <div ref={sectionRef} className="relative w-full overflow-hidden bg-white">

        {/* ── Section band with parallax background ── */}
        <section
          className="relative w-full flex items-center justify-center overflow-hidden"
          style={{
            minHeight: '420px',
            /* Parallax: image is fixed to the viewport, section scrolls over it */
            backgroundImage: 'url("https://img.magnific.com/free-photo/woman-home-applying-cream-mask_1303-24618.jpg?semt=ais_hybrid&w=740&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
          }}
        >
          {/* Peach tint overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: '#5c7886', opacity: 0.70 }} />

          {/* TOP white arch mask */}
          <div
            className="absolute top-0 left-0 right-0 w-full pointer-events-none select-none"
            style={{ height: '46%', zIndex: 4 }}
          >
            <svg className="w-full h-full" viewBox="0 0 1440 480" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,0 L0,300 C480,480 960,480 1440,300 L1440,0 Z" fill="#ffffff" />
            </svg>
          </div>

          {/* BOTTOM white arch mask */}
          <div
            className="absolute bottom-0 left-0 right-0 w-full pointer-events-none select-none"
            style={{ height: '0%', zIndex: 4 }}
          >
            <svg className="w-full h-full" viewBox="0 0 1440 480" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,480 L0,180 C480,0 960,0 1440,180 L1440,480 Z" fill="#ffffff" />
            </svg>
          </div>

          {/* Content — above both arch masks */}
          <div className="relative w-full max-w-6xl mx-auto px-8 sm:px-12 py-12 text-center" style={{ zIndex: 10 }}>

            {/* Title */}
            <h2
              className={`font-serif font-medium leading-tight mb-20 text-3xl sm:text-[2.2rem] md:text-[2.6rem]
                ${visible ? 'appt-fade-up appt-d1' : 'opacity-0'}`}
              style={{ color: '#4A2B2B' }}
            >
              How To Make An Appointment
            </h2>

            {/* Steps row */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-2">
              {STEPS.map((step, idx) => (
                <div key={idx} className="flex md:flex-row items-center flex-1 max-w-5xl">

                  {/* Step card */}
                  <div
                    className={`flex items-start gap-4 text-left
                      ${visible ? `appt-fade-up appt-d${idx + 2}` : 'opacity-0'}`}
                  >
                    {/* Icon badge — white rounded square matching reference */}
                    <div
                      className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: 'rgba(255,255,255,0.82)', color: '#7a4545' }}
                    >
                      {step.icon}
                    </div>

                    {/* Text block */}
                    <div className="pt-0.5">
                      <h3 className="font-semibold text-xl leading-snug mb-1" style={{ color: '#ffffff' }}>
                        {step.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed font-light" style={{ color: '#ffffff' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
 
                  {/* Connector arrow */}
                  {idx < 2 && (
                    <div className={`hidden md:flex items-center shrink-0 px-4 ${visible ? 'appt-fade-in appt-d5' : 'opacity-0'}`}>
                      <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
                        <line x1="0" y1="7" x2="21" y2="7" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" />
                        <polyline points="15,1 23,7 15,13" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}

                  {/* Mobile down-arrow */}
                  {idx < 2 && (
                    <div className={`md:hidden flex w-full justify-center py-3 ${visible ? 'appt-fade-in appt-d5' : 'opacity-0'}`}>
                      <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
                        <line x1="7" y1="0" x2="7" y2="18" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" />
                        <polyline points="1,12 7,20 13,12" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>
      </div>
    </>
  );
}
