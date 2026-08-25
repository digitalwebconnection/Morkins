const features = [
  { icon: '🌿', label: 'Clean Ingredients' },
  { icon: '🔬', label: 'Dermatologist Tested' },
  { icon: '🐰', label: 'Cruelty-Free' },
  { icon: '♻️', label: 'Eco Packaging' },
]

export default function HeroSection() {
  return (
    <section className="bg-brand-cream py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Trust badges strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          {features.map(f => (
            <div key={f.label} className="flex items-center gap-2 text-brand-dark/70">
              <span className="text-xl">{f.icon}</span>
              <span className="text-sm font-semibold tracking-wide">{f.label}</span>
            </div>
          ))}
        </div>

        {/* Hero headline block */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark/40 mb-3">Welcome to Morkins</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-dark font-normal leading-tight mb-5">
            Skincare Rooted in<br />
            <span className="text-brand-light italic">Science & Nature</span>
          </h1>
          <p className="text-brand-dark/60 text-base max-w-xl mx-auto leading-relaxed">
            Premium, clinically tested skincare formulated for every skin type.
            From serums to sunscreens — discover your perfect routine.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <a href="#products"
              className="px-8 py-3.5 rounded-full bg-brand-dark text-brand-cream text-sm font-bold tracking-wide hover:bg-brand-light transition-colors duration-300">
              Explore Products
            </a>
            <a href="#quiz"
              className="px-8 py-3.5 rounded-full border border-brand-dark/30 text-brand-dark text-sm font-semibold hover:border-brand-dark transition-colors duration-300">
              Take Skin Quiz
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-brand-dark/10 pt-10">
          {[
            { num: '50K+', label: 'Happy Customers' },
            { num: '120+', label: 'Products' },
            { num: '4.8★', label: 'Average Rating' },
            { num: '100%', label: 'Authentic & Safe' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-3xl text-brand-dark font-normal">{stat.num}</p>
              <p className="text-xs text-brand-dark/50 mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
