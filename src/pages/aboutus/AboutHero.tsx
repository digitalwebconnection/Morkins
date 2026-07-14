import hero5 from '../../assets/hero/6.jpg'

export default function AboutHero() {
  return (
    <section className="relative w-full h-[500px] sm:h-screen overflow-hidden">
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
