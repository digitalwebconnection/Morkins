
export default function HairCareHero() {
  return (
    <div className="relative w-full bg-white select-none overflow-hidden">
      {/* Subtle warm ambient glow behind hero */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-162.5 h-87.5 pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse, rgba(196,154,108,0.2) 0%, rgba(245,238,230,0.05) 50%, transparent 80%)',
        }}
      />

      <div className="relative w-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 pt-10 pb-12 sm:pt-14 sm:pb-16 z-10">

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight tracking-tight text-center"
          style={{ color: '#2C1810' }}
        >
          Men's Hair Care
        </h1>

        <p
          className="mt-3 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-center font-light text-[#5C4F46]"
        >
          Clinically-proven trichology solutions designed to restore density,
          strengthen follicles, and deliver visible results in 90&nbsp;days.
        </p>

        {/* Buttons with micro-interactions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
          <a
            href="#haircare-catalog"
            className="px-10 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(107,58,42,0.3)] active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #6B3A2A 0%, #4A2418 100%)',
              color: '#ffffff',
            }}
          >
            Shop Collection
          </a>
          <a
            href="#haircare-matrix"
            className="px-10 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase border transition-all duration-300 transform hover:-translate-y-0.5 hover:bg-[#FAF5EF] hover:border-[#4A2418] active:scale-95"
            style={{
              borderColor: '#6B3A2A',
              color: '#6B3A2A',
              background: 'transparent',
            }}
          >
            See the Science
          </a>
        </div>

      </div>
    </div>
  );
}
