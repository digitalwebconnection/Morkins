import hero5 from '../../assets/hero/ab.jpeg'

export default function AboutHero() {
  return (
    <section className="relative w-full h-100 sm:h-150 overflow-hidden">
      {/* Full-bleed Background Image */}
      <img
        src={hero5}
        alt="About Morkins Heritage"
        className="absolute inset-0 w-full h-full object-fill"
      />

      {/* Dark Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 z-1" />

    </section>
  )
}
