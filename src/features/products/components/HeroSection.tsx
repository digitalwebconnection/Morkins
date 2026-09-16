import heroBanner from '../../../assets/images/hero/14.jpg';


export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* ── Banner Poster Image like Best Sellers Page ── */}
      <section className="relative overflow-hidden select-none mb-8">
        <img
          src={heroBanner}
          alt="Products Banner"
          className="w-full h-[450px] object-fill"
        />
      </section>
    </div>
  );
}