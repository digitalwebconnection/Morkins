import heroBanner from "../../assets/images/hero/11.jpg";

export default function BestSellersHero() {
  return (
    <section className="relative overflow-hidden select-none">
      {/* ── Banner Poster Image ── */}
      <img
        src={heroBanner}
        alt="Best Sellers Banner"
        className="w-full h-[450px] object-cover"
      />
    </section>
  );
}
